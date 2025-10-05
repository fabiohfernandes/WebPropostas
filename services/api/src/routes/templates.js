// Templates API Routes
// Handles proposal template operations

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://webpropostas_user:webpropostas_password@localhost:5432/orcamentos',
});

// Authentication middleware (simplified - use your actual auth middleware)
const authenticateUser = (req, res, next) => {
  // Add your JWT authentication logic here
  // For now, just pass through
  next();
};

/**
 * GET /api/v1/templates
 * List all templates with optional filtering
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

    const result = await pool.query(query, params);

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
 * GET /api/v1/templates/categories
 * Get all unique categories
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

    const result = await pool.query(query);

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
 * GET /api/v1/templates/sectors
 * Get all unique sectors
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

    const result = await pool.query(query);

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
 * GET /api/v1/templates/:id
 * Get a specific template by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT *
      FROM proposal_templates
      WHERE id = $1 AND is_active = true
    `;

    const result = await pool.query(query, [id]);

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
 * POST /api/v1/templates/:id/use
 * Create a proposal from a template
 */
router.post('/:id/use', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const { field_values, client_id } = req.body;

    // Get template
    const templateQuery = `
      SELECT * FROM proposal_templates
      WHERE id = $1 AND is_active = true
    `;
    const templateResult = await pool.query(templateQuery, [id]);

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
