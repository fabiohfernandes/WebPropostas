/**
 * Proposals API Routes
 * WebPropostas V2.0 MVP - Using new schema with proposal_templates
 */

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const router = express.Router();

/**
 * @swagger
 * /api/v1/proposals:
 *   get:
 *     summary: Get all proposals for authenticated user
 *     tags: [Proposals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, sent, viewed, commented, accepted, rejected]
 *         description: Filter by status
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Number of results
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Pagination offset
 *     responses:
 *       200:
 *         description: List of proposals
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { status, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT
        p.*,
        p.title as proposal_name,
        p.description as job_name,
        p.total_value as proposal_value,
        c.name as client_name,
        c.email as client_email,
        c.company as client_company,
        t.name as template_name
      FROM proposals p
      LEFT JOIN clients c ON p.client_id = c.id
      LEFT JOIN proposal_templates t ON p.template_id = t.id
      WHERE p.user_id = $1
    `;
    const params = [userId];

    if (status) {
      params.push(status);
      query += ` AND p.status = $${params.length}`;
    }

    query += ` ORDER BY p.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit), parseInt(offset));

    const result = await req.app.locals.pool.query(query, params);

    // Map statuses for dashboard compatibility
    const proposals = result.rows.map(proposal => {
      let mappedStatus = 'open';
      if (proposal.status === 'accepted') {
        mappedStatus = 'closed';
      } else if (['rejected', 'archived'].includes(proposal.status)) {
        mappedStatus = 'archived';
      }
      return {
        ...proposal,
        status: mappedStatus,
        original_status: proposal.status  // Keep original for reference
      };
    });

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM proposals WHERE user_id = $1';
    const countParams = [userId];
    if (status) {
      countParams.push(status);
      countQuery += ' AND status = $2';
    }
    const countResult = await req.app.locals.pool.query(countQuery, countParams);

    res.json({
      success: true,
      data: {
        proposals: proposals,
        pagination: {
          total: parseInt(countResult.rows[0].count),
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      }
    });
  } catch (error) {
    console.error('Get proposals error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch proposals'
    });
  }
});

/**
 * @swagger
 * /api/v1/proposals/{id}:
 *   get:
 *     summary: Get proposal by ID
 *     tags: [Proposals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Proposal ID
 *     responses:
 *       200:
 *         description: Proposal details
 */
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const result = await req.app.locals.pool.query(
      `SELECT
        p.*,
        c.name as client_name,
        c.email as client_email,
        c.company as client_company,
        c.phone as client_phone,
        t.name as template_name,
        t.content as template_content
      FROM proposals p
      LEFT JOIN clients c ON p.client_id = c.id
      LEFT JOIN proposal_templates t ON p.template_id = t.id
      WHERE p.id = $1 AND p.user_id = $2`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Proposal not found'
      });
    }

    // Get proposal sections
    const sectionsResult = await req.app.locals.pool.query(
      `SELECT * FROM proposal_sections
       WHERE proposal_id = $1
       ORDER BY sort_order ASC`,
      [id]
    );

    // Get proposal items
    const itemsResult = await req.app.locals.pool.query(
      `SELECT * FROM proposal_items
       WHERE proposal_id = $1
       ORDER BY sort_order ASC`,
      [id]
    );

    // Get comments
    const commentsResult = await req.app.locals.pool.query(
      `SELECT * FROM comments
       WHERE proposal_id = $1
       ORDER BY created_at DESC`,
      [id]
    );

    const proposal = result.rows[0];
    proposal.sections = sectionsResult.rows;
    proposal.items = itemsResult.rows;
    proposal.comments = commentsResult.rows;

    res.json({
      success: true,
      data: { proposal }
    });
  } catch (error) {
    console.error('Get proposal error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch proposal'
    });
  }
});

/**
 * @swagger
 * /api/v1/proposals:
 *   post:
 *     summary: Create new proposal
 *     tags: [Proposals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - client_id
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               client_id:
 *                 type: string
 *                 format: uuid
 *               template_id:
 *                 type: integer
 *               content:
 *                 type: object
 *               total_value:
 *                 type: number
 *               valid_until:
 *                 type: string
 *                 format: date
 *               presentation_url:
 *                 type: string
 *               commercial_proposal_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proposal created
 */
router.post('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      title,
      description,
      client_id,
      template_id,
      content,
      total_value,
      valid_until,
      presentation_url,
      commercial_proposal_url
    } = req.body;

    // Validate required fields
    if (!title || !client_id) {
      return res.status(400).json({
        success: false,
        error: 'Title and client_id are required'
      });
    }

    // Verify client belongs to user
    const clientCheck = await req.app.locals.pool.query(
      'SELECT id FROM clients WHERE id = $1 AND user_id = $2',
      [client_id, userId]
    );

    if (clientCheck.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid client_id'
      });
    }

    // Generate public token and access code
    const publicToken = uuidv4();
    const clientAccessCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

    // Generate client password (8 chars)
    const clientPassword = Math.random().toString(36).slice(-8);
    const clientPasswordHash = await bcrypt.hash(clientPassword, 10);

    // Insert proposal
    const result = await req.app.locals.pool.query(
      `INSERT INTO proposals (
        user_id, client_id, template_id, title, description,
        content, total_value, valid_until, presentation_url,
        commercial_proposal_url, public_token, client_access_code,
        client_password_hash, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`,
      [
        userId,
        client_id,
        template_id || null,
        title,
        description || null,
        content || null,
        total_value || null,
        valid_until || null,
        presentation_url || null,
        commercial_proposal_url || null,
        publicToken,
        clientAccessCode,
        clientPasswordHash,
        'draft'
      ]
    );

    const proposal = result.rows[0];

    // Log activity
    await req.app.locals.pool.query(
      `INSERT INTO activity_log (user_id, action, entity_type, entity_id, changes)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, "create", "proposal", proposal.id, JSON.stringify({ title })]
    );

    res.status(201).json({
      success: true,
      message: 'Proposal created successfully',
      data: {
        proposal: {
          ...proposal,
          client_password: clientPassword, // Return once for user to save
          client_access_url: `${process.env.FRONTEND_URL || 'http://localhost:3001'}/proposal/${publicToken}`
        }
      }
    });
  } catch (error) {
    console.error('Create proposal error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create proposal'
    });
  }
});

/**
 * @swagger
 * /api/v1/proposals/{id}:
 *   put:
 *     summary: Update proposal
 *     tags: [Proposals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Proposal updated
 */
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const {
      title,
      description,
      content,
      total_value,
      valid_until,
      presentation_url,
      commercial_proposal_url,
      status
    } = req.body;

    // Verify ownership
    const checkResult = await req.app.locals.pool.query(
      'SELECT id FROM proposals WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Proposal not found'
      });
    }

    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (title !== undefined) {
      updates.push(`title = $${paramCount++}`);
      values.push(title);
    }
    if (description !== undefined) {
      updates.push(`description = $${paramCount++}`);
      values.push(description);
    }
    if (content !== undefined) {
      updates.push(`content = $${paramCount++}`);
      values.push(content);
    }
    if (total_value !== undefined) {
      updates.push(`total_value = $${paramCount++}`);
      values.push(total_value);
    }
    if (valid_until !== undefined) {
      updates.push(`valid_until = $${paramCount++}`);
      values.push(valid_until);
    }
    if (presentation_url !== undefined) {
      updates.push(`presentation_url = $${paramCount++}`);
      values.push(presentation_url);
    }
    if (commercial_proposal_url !== undefined) {
      updates.push(`commercial_proposal_url = $${paramCount++}`);
      values.push(commercial_proposal_url);
    }
    if (status !== undefined) {
      updates.push(`status = $${paramCount++}`);
      values.push(status);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No fields to update'
      });
    }

    values.push(id, userId);
    const result = await req.app.locals.pool.query(
      `UPDATE proposals
       SET ${updates.join(', ')}
       WHERE id = $${paramCount++} AND user_id = $${paramCount++}
       RETURNING *`,
      values
    );

    // Log activity
    await req.app.locals.pool.query(
      `INSERT INTO activity_log (user_id, action, entity_type, entity_id, changes)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, 'update', 'proposal', id, JSON.stringify({ updates: Object.keys(req.body) })]
    );

    res.json({
      success: true,
      message: 'Proposal updated successfully',
      data: { proposal: result.rows[0] }
    });
  } catch (error) {
    console.error('Update proposal error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update proposal'
    });
  }
});

/**
 * @swagger
 * /api/v1/proposals/{id}:
 *   delete:
 *     summary: Delete proposal
 *     tags: [Proposals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proposal deleted
 */
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Verify ownership
    const checkResult = await req.app.locals.pool.query(
      'SELECT id, title FROM proposals WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Proposal not found'
      });
    }

    // Delete (CASCADE will handle related records)
    await req.app.locals.pool.query(
      'DELETE FROM proposals WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    // Log activity
    await req.app.locals.pool.query(
      `INSERT INTO activity_log (user_id, action, entity_type, entity_id, changes)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, 'delete', 'proposal', id, JSON.stringify({ title: checkResult.rows[0].title })]
    );

    res.json({
      success: true,
      message: 'Proposal deleted successfully'
    });
  } catch (error) {
    console.error('Delete proposal error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete proposal'
    });
  }
});

/**
 * @swagger
 * /api/v1/proposals/{id}/send:
 *   post:
 *     summary: Send proposal to client
 *     tags: [Proposals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proposal sent
 */
router.post('/:id/send', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Verify ownership
    const checkResult = await req.app.locals.pool.query(
      'SELECT id, status FROM proposals WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Proposal not found'
      });
    }

    // Update status to 'sent'
    const result = await req.app.locals.pool.query(
      `UPDATE proposals
       SET status = 'sent', sent_at = CURRENT_TIMESTAMP
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, userId]
    );

    // TODO: Send email notification to client

    // Log activity
    await req.app.locals.pool.query(
      `INSERT INTO activity_log (user_id, action, entity_type, entity_id, changes)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, 'send', 'proposal', id, JSON.stringify({ status: 'sent' })]
    );

    res.json({
      success: true,
      message: 'Proposal sent successfully',
      data: { proposal: result.rows[0] }
    });
  } catch (error) {
    console.error('Send proposal error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send proposal'
    });
  }
});

module.exports = router;
