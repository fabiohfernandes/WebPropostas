/**
 * Clients API Routes
 * WebPropostas V2.0 MVP
 */

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/v1/clients:
 *   get:
 *     summary: Get all clients for authenticated user
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by name, email, or company
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: List of clients
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { search, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT c.*,
        COUNT(p.id) as proposal_count
      FROM clients c
      LEFT JOIN proposals p ON c.id = p.client_id
      WHERE c.user_id = $1
    `;
    const params = [userId];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND (c.name ILIKE $${params.length} OR c.email ILIKE $${params.length} OR c.company ILIKE $${params.length})`;
    }

    query += ` GROUP BY c.id ORDER BY c.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit), parseInt(offset));

    const result = await req.app.locals.pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM clients WHERE user_id = $1';
    const countParams = [userId];
    if (search) {
      countParams.push(`%${search}%`);
      countQuery += ' AND (name ILIKE $2 OR email ILIKE $2 OR company ILIKE $2)';
    }
    const countResult = await req.app.locals.pool.query(countQuery, countParams);

    res.json({
      success: true,
      data: {
        clients: result.rows,
        pagination: {
          total: parseInt(countResult.rows[0].count),
          limit: parseInt(limit),
          offset: parseInt(offset)
        }
      }
    });
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch clients'
    });
  }
});

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   get:
 *     summary: Get client by ID
 *     tags: [Clients]
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
 *         description: Client details
 */
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const result = await req.app.locals.pool.query(
      `SELECT c.*,
        COUNT(p.id) as proposal_count
       FROM clients c
       LEFT JOIN proposals p ON c.id = p.client_id
       WHERE c.id = $1 AND c.user_id = $2
       GROUP BY c.id`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }

    // Get client's proposals
    const proposalsResult = await req.app.locals.pool.query(
      `SELECT id, title, status, total_value, created_at, updated_at
       FROM proposals
       WHERE client_id = $1
       ORDER BY created_at DESC`,
      [id]
    );

    const client = result.rows[0];
    client.proposals = proposalsResult.rows;

    res.json({
      success: true,
      data: { client }
    });
  } catch (error) {
    console.error('Get client error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch client'
    });
  }
});

/**
 * @swagger
 * /api/v1/clients:
 *   post:
 *     summary: Create new client
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               company:
 *                 type: string
 *               phone:
 *                 type: string
 *               document:
 *                 type: string
 *               document_type:
 *                 type: string
 *                 enum: [cpf, cnpj]
 *     responses:
 *       201:
 *         description: Client created
 */
router.post('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      name,
      email,
      company,
      phone,
      document,
      document_type
    } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
    }

    // Check if client with same email already exists for this user
    const existingClient = await req.app.locals.pool.query(
      'SELECT id FROM clients WHERE user_id = $1 AND email = $2',
      [userId, email.toLowerCase()]
    );

    if (existingClient.rows.length > 0) {
      return res.status(409).json({
        success: false,
        error: 'Client with this email already exists'
      });
    }

    // Insert client
    const result = await req.app.locals.pool.query(
      `INSERT INTO clients (
        user_id, name, email, company, phone,
        document, document_type
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        userId,
        name,
        email.toLowerCase(),
        company || null,
        phone || null,
        document || null,
        document_type || null
      ]
    );

    const client = result.rows[0];

    // Log activity
    await req.app.locals.pool.query(
      `INSERT INTO activity_log (user_id, action, entity_type, entity_id, changes)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, 'create', 'client', client.id, JSON.stringify({ name, email })]
    );

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: { client }
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create client'
    });
  }
});

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   put:
 *     summary: Update client
 *     tags: [Clients]
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
 *         description: Client updated
 */
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const {
      name,
      email,
      company,
      phone,
      document,
      document_type
    } = req.body;

    // Verify ownership
    const checkResult = await req.app.locals.pool.query(
      'SELECT id FROM clients WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }

    // Build dynamic update query
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount++}`);
      values.push(name);
    }
    if (email !== undefined) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid email format'
        });
      }
      updates.push(`email = $${paramCount++}`);
      values.push(email.toLowerCase());
    }
    if (company !== undefined) {
      updates.push(`company = $${paramCount++}`);
      values.push(company);
    }
    if (phone !== undefined) {
      updates.push(`phone = $${paramCount++}`);
      values.push(phone);
    }
    if (document !== undefined) {
      updates.push(`document = $${paramCount++}`);
      values.push(document);
    }
    if (document_type !== undefined) {
      updates.push(`document_type = $${paramCount++}`);
      values.push(document_type);
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No fields to update'
      });
    }

    values.push(id, userId);
    const result = await req.app.locals.pool.query(
      `UPDATE clients
       SET ${updates.join(', ')}
       WHERE id = $${paramCount++} AND user_id = $${paramCount++}
       RETURNING *`,
      values
    );

    // Log activity
    await req.app.locals.pool.query(
      `INSERT INTO activity_log (user_id, action, entity_type, entity_id, changes)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, 'update', 'client', id, JSON.stringify({ updates: Object.keys(req.body) })]
    );

    res.json({
      success: true,
      message: 'Client updated successfully',
      data: { client: result.rows[0] }
    });
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update client'
    });
  }
});

/**
 * @swagger
 * /api/v1/clients/{id}:
 *   delete:
 *     summary: Delete client
 *     tags: [Clients]
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
 *         description: Client deleted
 */
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Verify ownership
    const checkResult = await req.app.locals.pool.query(
      'SELECT id, name FROM clients WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }

    // Check if client has proposals
    const proposalsCheck = await req.app.locals.pool.query(
      'SELECT COUNT(*) FROM proposals WHERE client_id = $1',
      [id]
    );

    if (parseInt(proposalsCheck.rows[0].count) > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete client with existing proposals. Delete proposals first or set client_id to NULL.'
      });
    }

    // Delete client
    await req.app.locals.pool.query(
      'DELETE FROM clients WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    // Log activity
    await req.app.locals.pool.query(
      `INSERT INTO activity_log (user_id, action, entity_type, entity_id, changes)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, 'delete', 'client', id, JSON.stringify({ name: checkResult.rows[0].name })]
    );

    res.json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete client'
    });
  }
});

module.exports = router;
