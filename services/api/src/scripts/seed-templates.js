// Seed Proposal Templates Script
// Populates database with professional proposal templates

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://webpropostas_user:webpropostas_password@localhost:5432/webpropostas',
});

// Create templates table if not exists
const createTemplatesTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS proposal_templates (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      sector VARCHAR(100) NOT NULL,
      description TEXT,
      thumbnail VARCHAR(500),
      fields JSONB NOT NULL,
      content_template JSONB NOT NULL,
      is_active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_templates_category ON proposal_templates(category);
    CREATE INDEX IF NOT EXISTS idx_templates_sector ON proposal_templates(sector);
    CREATE INDEX IF NOT EXISTS idx_templates_active ON proposal_templates(is_active);
  `;

  await pool.query(query);
  console.log('✅ Templates table created/verified');
};

// Load templates from JSON file
const loadTemplates = () => {
  const templatesPath = path.join(__dirname, '../data/proposal-templates.json');
  const templatesData = fs.readFileSync(templatesPath, 'utf8');
  return JSON.parse(templatesData);
};

// Seed templates into database
const seedTemplates = async () => {
  try {
    console.log('🌱 Starting template seeding...\n');

    // Create table
    await createTemplatesTable();

    // Load templates
    const templates = loadTemplates();
    console.log(`📦 Loaded ${templates.length} templates from file\n`);

    // Insert each template
    for (const template of templates) {
      const query = `
        INSERT INTO proposal_templates (
          id, name, category, sector, description, thumbnail, fields, content_template
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          category = EXCLUDED.category,
          sector = EXCLUDED.sector,
          description = EXCLUDED.description,
          thumbnail = EXCLUDED.thumbnail,
          fields = EXCLUDED.fields,
          content_template = EXCLUDED.content_template,
          updated_at = CURRENT_TIMESTAMP
      `;

      const values = [
        template.id,
        template.name,
        template.category,
        template.sector,
        template.description,
        template.thumbnail,
        JSON.stringify(template.fields),
        JSON.stringify(template.content_template),
      ];

      await pool.query(query, values);
      console.log(`✅ Seeded: ${template.name} (${template.category})`);
    }

    console.log(`\n🎉 Successfully seeded ${templates.length} templates!`);

    // Show summary
    const summaryQuery = `
      SELECT category, COUNT(*) as count
      FROM proposal_templates
      WHERE is_active = true
      GROUP BY category
      ORDER BY count DESC
    `;

    const result = await pool.query(summaryQuery);
    console.log('\n📊 Templates by Category:');
    result.rows.forEach(row => {
      console.log(`   ${row.category}: ${row.count} template(s)`);
    });

  } catch (error) {
    console.error('❌ Error seeding templates:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

// Run seeding
if (require.main === module) {
  seedTemplates()
    .then(() => {
      console.log('\n✨ Template seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Template seeding failed:', error);
      process.exit(1);
    });
}

module.exports = { seedTemplates, createTemplatesTable };
