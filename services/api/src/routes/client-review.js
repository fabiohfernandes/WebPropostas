/**
 * Client Review API Routes
 * WebPropostas V2.0 MVP - Client-facing proposal review system
 * Allows clients to view, comment, and respond to proposals
 */

const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

/**
 * @swagger
 * /api/v1/client/proposal/access:
 *   post:
 *     summary: Client login to access proposal
 *     tags: [Client Review]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - access_code
 *               - password
 *             properties:
 *               access_code:
 *                 type: string
 *                 description: 6-digit access code
 *               password:
 *                 type: string
 *                 description: Client password
 *     responses:
 *       200:
 *         description: Access granted, returns proposal token
 *       401:
 *         description: Invalid credentials
 */
router.post('/proposal/access', async (req, res) => {
  try {
    const { access_code, password } = req.body;

    if (!access_code || !password) {
      return res.status(400).json({
        success: false,
        error: 'Access code and password are required'
      });
    }

    // Find proposal by access code
    const result = await req.app.locals.pool.query(
      `SELECT p.id, p.public_token, p.client_password_hash, p.status, p.title,
              c.name as client_name, c.email as client_email
       FROM proposals p
       LEFT JOIN clients c ON p.client_id = c.id
       WHERE p.client_access_code = $1`,
      [access_code]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        error: 'Invalid access code or password'
      });
    }

    const proposal = result.rows[0];

    // Verify password
    const isValid = await bcrypt.compare(password, proposal.client_password_hash);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid access code or password'
      });
    }

    // Update first/last viewed timestamps
    const now = new Date().toISOString();
    const updateQuery = proposal.first_viewed_at
      ? 'UPDATE proposals SET last_viewed_at = $1, view_count = view_count + 1 WHERE id = $2'
      : 'UPDATE proposals SET first_viewed_at = $1, last_viewed_at = $1, view_count = 1 WHERE id = $2';

    await req.app.locals.pool.query(updateQuery, [now, proposal.id]);

    // Log analytics
    await req.app.locals.pool.query(
      `INSERT INTO proposal_analytics (proposal_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [proposal.id, 'view', JSON.stringify({ access_code, timestamp: now })]
    );

    // Update status to 'viewed' if it was 'sent'
    if (proposal.status === 'sent') {
      await req.app.locals.pool.query(
        'UPDATE proposals SET status = $1 WHERE id = $2',
        ['viewed', proposal.id]
      );
    }

    res.json({
      success: true,
      message: 'Access granted',
      data: {
        public_token: proposal.public_token,
        proposal_id: proposal.id,
        title: proposal.title,
        client_name: proposal.client_name
      }
    });
  } catch (error) {
    console.error('Client access error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to access proposal'
    });
  }
});

/**
 * @swagger
 * /api/v1/client/proposal/{token}:
 *   get:
 *     summary: Get proposal by public token
 *     tags: [Client Review]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Proposal public token
 *     responses:
 *       200:
 *         description: Proposal details
 *       404:
 *         description: Proposal not found
 */
router.get('/proposal/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Get proposal
    const result = await req.app.locals.pool.query(
      `SELECT
         p.*,
         c.name as client_name,
         c.email as client_email,
         c.company as client_company,
         c.phone as client_phone,
         u.name as user_name,
         u.company_name as user_company
       FROM proposals p
       LEFT JOIN clients c ON p.client_id = c.id
       LEFT JOIN users u ON p.user_id = u.id
       WHERE p.public_token = $1`,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Proposal not found'
      });
    }

    const proposal = result.rows[0];

    // Get sections
    const sectionsResult = await req.app.locals.pool.query(
      `SELECT * FROM proposal_sections
       WHERE proposal_id = $1
       ORDER BY sort_order ASC`,
      [proposal.id]
    );

    // Get items
    const itemsResult = await req.app.locals.pool.query(
      `SELECT * FROM proposal_items
       WHERE proposal_id = $1
       ORDER BY sort_order ASC`,
      [proposal.id]
    );

    // Get comments
    const commentsResult = await req.app.locals.pool.query(
      `SELECT * FROM comments
       WHERE proposal_id = $1
       ORDER BY created_at DESC`,
      [proposal.id]
    );

    // Remove sensitive data
    delete proposal.client_password_hash;
    delete proposal.user_id;

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
 * /api/v1/client/proposal/{token}/comment:
 *   post:
 *     summary: Add comment to proposal
 *     tags: [Client Review]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *               section:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added
 */
router.post('/proposal/:token/comment', async (req, res) => {
  try {
    const { token } = req.params;
    const { content, section } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Comment content is required'
      });
    }

    // Get proposal
    const proposalResult = await req.app.locals.pool.query(
      'SELECT id, title, status FROM proposals WHERE public_token = $1',
      [token]
    );

    if (proposalResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Proposal not found'
      });
    }

    const proposal = proposalResult.rows[0];

    // Insert comment from client
    const result = await req.app.locals.pool.query(
      `INSERT INTO comments (proposal_id, author_name, content)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [proposal.id, 'Client', content.trim()]
    );

    // Update proposal status to 'commented'
    if (proposal.status === 'viewed' || proposal.status === 'sent' || proposal.status === 'draft') {
      await req.app.locals.pool.query(
        'UPDATE proposals SET status = $1 WHERE id = $2',
        ['commented', proposal.id]
      );
    }

    // Log analytics
    await req.app.locals.pool.query(
      `INSERT INTO proposal_analytics (proposal_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [proposal.id, 'comment', JSON.stringify({ section, timestamp: new Date().toISOString() })]
    );

    // Create notification for proposal owner
    await req.app.locals.pool.query(
      `INSERT INTO notifications (user_id, proposal_id, type, title, message)
       SELECT p.user_id, p.id, $1, $2, $3
       FROM proposals p
       WHERE p.id = $4`,
      ['comment', 'New Comment', `Client added a comment to "${proposal.title}"`, proposal.id]
    );

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: { comment: result.rows[0] }
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add comment'
    });
  }
});

/**
 * @swagger
 * /api/v1/client/proposal/{token}/accept:
 *   post:
 *     summary: Accept proposal
 *     tags: [Client Review]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Proposal accepted
 */
router.post('/proposal/:token/accept', async (req, res) => {
  try {
    const { token } = req.params;

    // Get proposal
    const proposalResult = await req.app.locals.pool.query(
      'SELECT id, title, status, user_id FROM proposals WHERE public_token = $1',
      [token]
    );

    if (proposalResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Proposal not found'
      });
    }

    const proposal = proposalResult.rows[0];

    // Check if already accepted or rejected
    if (proposal.status === 'accepted') {
      return res.status(400).json({
        success: false,
        error: 'Proposal already accepted'
      });
    }

    if (proposal.status === 'rejected') {
      return res.status(400).json({
        success: false,
        error: 'Cannot accept rejected proposal'
      });
    }

    // Update proposal
    await req.app.locals.pool.query(
      `UPDATE proposals
       SET status = $1, accepted_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      ['accepted', proposal.id]
    );

    // Log analytics
    await req.app.locals.pool.query(
      `INSERT INTO proposal_analytics (proposal_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [proposal.id, 'accept', JSON.stringify({ timestamp: new Date().toISOString() })]
    );

    // Create notification
    await req.app.locals.pool.query(
      `INSERT INTO notifications (user_id, proposal_id, type, title, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [proposal.user_id, proposal.id, 'acceptance', 'Proposal Accepted! 🎉', `Client accepted the proposal: "${proposal.title}"`]
    );

    res.json({
      success: true,
      message: 'Proposal accepted successfully'
    });
  } catch (error) {
    console.error('Accept proposal error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to accept proposal'
    });
  }
});

/**
 * @swagger
 * /api/v1/client/proposal/{token}/reject:
 *   post:
 *     summary: Reject proposal
 *     tags: [Client Review]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proposal rejected
 */
router.post('/proposal/:token/reject', async (req, res) => {
  try {
    const { token } = req.params;
    const { reason } = req.body;

    // Get proposal
    const proposalResult = await req.app.locals.pool.query(
      'SELECT id, title, status, user_id FROM proposals WHERE public_token = $1',
      [token]
    );

    if (proposalResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Proposal not found'
      });
    }

    const proposal = proposalResult.rows[0];

    // Check if already rejected or accepted
    if (proposal.status === 'rejected') {
      return res.status(400).json({
        success: false,
        error: 'Proposal already rejected'
      });
    }

    if (proposal.status === 'accepted') {
      return res.status(400).json({
        success: false,
        error: 'Cannot reject accepted proposal'
      });
    }

    // Update proposal
    await req.app.locals.pool.query(
      `UPDATE proposals
       SET status = $1, rejected_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      ['rejected', proposal.id]
    );

    // Add rejection reason as comment if provided
    if (reason && reason.trim().length > 0) {
      await req.app.locals.pool.query(
        `INSERT INTO comments (proposal_id, author_name, content)
         VALUES ($1, $2, $3)`,
        [proposal.id, 'Client', `Rejection reason: ${reason.trim()}`]
      );
    }

    // Log analytics
    await req.app.locals.pool.query(
      `INSERT INTO proposal_analytics (proposal_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [proposal.id, 'reject', JSON.stringify({ reason, timestamp: new Date().toISOString() })]
    );

    // Create notification
    await req.app.locals.pool.query(
      `INSERT INTO notifications (user_id, proposal_id, type, title, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [proposal.user_id, proposal.id, 'rejection', 'Proposal Rejected', `Client rejected the proposal: "${proposal.title}"${reason ? ` - Reason: ${reason}` : ''}`]
    );

    res.json({
      success: true,
      message: 'Proposal rejected successfully'
    });
  } catch (error) {
    console.error('Reject proposal error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reject proposal'
    });
  }
});

/**
 * @swagger
 * /api/v1/client/proposal/{token}/request-changes:
 *   post:
 *     summary: Request changes to proposal
 *     tags: [Client Review]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - changes
 *             properties:
 *               changes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Changes requested
 */
router.post('/proposal/:token/request-changes', async (req, res) => {
  try {
    const { token } = req.params;
    const { changes } = req.body;

    if (!changes || changes.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Change request details are required'
      });
    }

    // Get proposal
    const proposalResult = await req.app.locals.pool.query(
      'SELECT id, title, status, user_id FROM proposals WHERE public_token = $1',
      [token]
    );

    if (proposalResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Proposal not found'
      });
    }

    const proposal = proposalResult.rows[0];

    // Update proposal status
    await req.app.locals.pool.query(
      'UPDATE proposals SET status = $1 WHERE id = $2',
      ['changes_requested', proposal.id]
    );

    // Add changes as comment
    await req.app.locals.pool.query(
      `INSERT INTO comments (proposal_id, author_name, content)
       VALUES ($1, $2, $3)`,
      [proposal.id, 'Client', `Changes requested: ${changes.trim()}`]
    );

    // Log analytics
    await req.app.locals.pool.query(
      `INSERT INTO proposal_analytics (proposal_id, event_type, event_data)
       VALUES ($1, $2, $3)`,
      [proposal.id, 'request_changes', JSON.stringify({ timestamp: new Date().toISOString() })]
    );

    // Create notification
    await req.app.locals.pool.query(
      `INSERT INTO notifications (user_id, proposal_id, type, title, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [proposal.user_id, proposal.id, 'changes_requested', 'Changes Requested', `Client requested changes to: "${proposal.title}"`]
    );

    res.json({
      success: true,
      message: 'Changes requested successfully'
    });
  } catch (error) {
    console.error('Request changes error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to request changes'
    });
  }
});

module.exports = router;
