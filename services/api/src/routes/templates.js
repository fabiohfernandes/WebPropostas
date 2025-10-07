// Templates API Routes
// Handles proposal template operations

const express = require('express');
const router = express.Router();

// Note: Database pool is accessed via req.app.locals.pool (set in index.js)
// Note: Authentication middleware is applied in index.js when mounting routes

/**
 * @swagger
 * /api/v1/templates:
 *   get:
 *     tags:
 *       - Templates
 *     summary: List all proposal templates
 *     description: Retrieve all active templates with optional filtering by category, sector, or search term
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by template category
 *         example: "Desenvolvimento Web"
 *       - in: query
 *         name: sector
 *         schema:
 *           type: string
 *         description: Filter by market sector
 *         example: "Tecnologia"
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in template name or description
 *         example: "website"
 *     responses:
 *       200:
 *         description: Templates retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     templates:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Template'
 *                     total:
 *                       type: integer
 *                       example: 12
 *       500:
 *         description: Internal server error
 */
router.get('/', async (req, res) => {
  try {
    const { category, sector, search } = req.query;

    let query = `
      SELECT
        id, name, category, sector, description, thumbnail,
        fields, content_template, created_at
      FROM proposal_templates
      WHERE is_active = true
    `;

    const params = [];
    let paramCount = 1;

    if (category) {
      query += ` AND category = $${paramCount}`;
      params.push(category);
      paramCount++;
    }

    if (sector) {
      query += ` AND sector = $${paramCount}`;
      params.push(sector);
      paramCount++;
    }

    if (search) {
      query += ` AND (name ILIKE $${paramCount} OR description ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    query += ' ORDER BY category, name';

    const result = await req.app.locals.pool.query(query, params);

    res.json({
      success: true,
      data: {
        templates: result.rows,
        total: result.rows.length
      }
    });

  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar templates',
      error: error.message
    });
  }
});

/**
 * @swagger
 * /api/v1/templates/categories:
 *   get:
 *     tags:
 *       - Templates
 *     summary: Get all template categories
 *     description: Retrieve list of unique template categories with counts
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           category:
 *                             type: string
 *                             example: "Desenvolvimento Web"
 *                           count:
 *                             type: integer
 *                             example: 5
 *       500:
 *         description: Internal server error
 */
router.get('/categories', async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT category, COUNT(*) as count
      FROM proposal_templates
      WHERE is_active = true
      GROUP BY category
      ORDER BY category
    `;

    const result = await req.app.locals.pool.query(query);

    res.json({
      success: true,
      data: {
        categories: result.rows
      }
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar categorias'
    });
  }
});

/**
 * @swagger
 * /api/v1/templates/sectors:
 *   get:
 *     tags:
 *       - Templates
 *     summary: Get all template sectors
 *     description: Retrieve list of unique market sectors with counts
 *     responses:
 *       200:
 *         description: Sectors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     sectors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           sector:
 *                             type: string
 *                             example: "Tecnologia"
 *                           count:
 *                             type: integer
 *                             example: 8
 *       500:
 *         description: Internal server error
 */
router.get('/sectors', async (req, res) => {
  try {
    const query = `
      SELECT DISTINCT sector, COUNT(*) as count
      FROM proposal_templates
      WHERE is_active = true
      GROUP BY sector
      ORDER BY sector
    `;

    const result = await req.app.locals.pool.query(query);

    res.json({
      success: true,
      data: {
        sectors: result.rows
      }
    });

  } catch (error) {
    console.error('Error fetching sectors:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar setores'
    });
  }
});

/**
 * @swagger
 * /api/v1/templates/{id}:
 *   get:
 *     tags:
 *       - Templates
 *     summary: Get specific template by ID
 *     description: Retrieve detailed information about a single template
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Template ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Template retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     template:
 *                       $ref: '#/components/schemas/Template'
 *       404:
 *         description: Template not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT *
      FROM proposal_templates
      WHERE id = $1 AND is_active = true
    `;

    const result = await req.app.locals.pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Template não encontrado'
      });
    }

    res.json({
      success: true,
      data: {
        template: result.rows[0]
      }
    });

  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar template'
    });
  }
});

/**
 * @swagger
 * /api/v1/templates/{id}/use:
 *   post:
 *     tags:
 *       - Templates
 *     summary: Create proposal from template
 *     description: Generate a new proposal using a template with custom field values
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Template ID to use
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - field_values
 *               - client_id
 *             properties:
 *               field_values:
 *                 type: object
 *                 description: Key-value pairs for template placeholders
 *                 example:
 *                   company_name: "Empresa ABC Ltda"
 *                   project_name: "Website Corporativo"
 *                   deadline: "60 dias"
 *                   value: "R$ 15.000,00"
 *               client_id:
 *                 type: integer
 *                 description: Client ID for the proposal
 *                 example: 1
 *     responses:
 *       200:
 *         description: Proposal created successfully from template
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     processed_content:
 *                       type: object
 *                     proposal_data:
 *                       type: object
 *       404:
 *         description: Template not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/:id/use', async (req, res) => {
  try {
    const { id } = req.params;
    const { field_values, client_id } = req.body;

    // Get template
    const templateQuery = `
      SELECT * FROM proposal_templates
      WHERE id = $1 AND is_active = true
    `;
    const templateResult = await req.app.locals.pool.query(templateQuery, [id]);

    if (templateResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Template não encontrado'
      });
    }

    const template = templateResult.rows[0];

    // Process template with field values
    const processedContent = processTemplate(template.content_template, field_values);

    // Create proposal (you'll need to implement this based on your proposals table)
    const proposalData = {
      title: processedContent.title,
      sections: processedContent.sections,
      client_id: client_id,
      template_id: id,
      field_values: field_values
    };

    res.json({
      success: true,
      data: {
        processed_content: processedContent,
        proposal_data: proposalData
      }
    });

  } catch (error) {
    console.error('Error using template:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao usar template'
    });
  }
});

/**
 * Helper function to process template with field values
 */
function processTemplate(contentTemplate, fieldValues) {
  let processedTitle = contentTemplate.title;
  let processedSections = JSON.parse(JSON.stringify(contentTemplate.sections));

  // Replace placeholders with actual values
  Object.keys(fieldValues).forEach(key => {
    const placeholder = new RegExp(`{{${key}}}`, 'g');
    const value = fieldValues[key];

    processedTitle = processedTitle.replace(placeholder, value);

    processedSections = processedSections.map(section => ({
      ...section,
      content: section.content.replace(placeholder, value)
    }));
  });

  return {
    title: processedTitle,
    sections: processedSections
  };
}

module.exports = router;
