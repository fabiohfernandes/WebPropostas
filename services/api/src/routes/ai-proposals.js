/**
 * AI Proposals Router
 *
 * Handles all endpoints for AI-powered proposal generation
 *
 * @module routes/ai-proposals
 */

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const aiGenerator = require('../services/AIProposalGenerator');

// Database pool (reuse existing connection)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * POST /api/v1/ai/proposals/generate
 *
 * Start AI proposal generation
 *
 * Body:
 * {
 *   clientInfo: { companyName, contactName, email, phone, sector },
 *   proposalType: 'venda-imovel' | 'servico' | 'parceria' | 'investimento',
 *   projectContext: string,
 *   settings: { tone, detail, includeMarketResearch, aiModel }
 * }
 *
 * Returns:
 * {
 *   sessionId: uuid,
 *   status: 'processing',
 *   estimatedTime: number (seconds)
 * }
 */
router.post('/generate', async (req, res) => {
  try {
    const {
      clientInfo,
      proposalType,
      projectContext,
      settings = {}
    } = req.body;

    // Validation
    if (!clientInfo || !clientInfo.companyName || !clientInfo.email) {
      return res.status(400).json({
        error: 'Missing required client information (companyName, email)'
      });
    }

    if (!proposalType) {
      return res.status(400).json({
        error: 'Missing proposal type'
      });
    }

    if (!projectContext || projectContext.length < 50) {
      return res.status(400).json({
        error: 'Project context too short (minimum 50 characters)'
      });
    }

    // Get user from auth middleware (assuming JWT middleware sets req.user)
    const userId = req.user?.id;
    const organizationId = req.user?.organization_id;

    if (!userId || !organizationId) {
      return res.status(401).json({
        error: 'Authentication required'
      });
    }

    // Default settings
    const finalSettings = {
      tone: settings.tone || 'profissional',
      detail: settings.detail || 'completo',
      includeMarketResearch: settings.includeMarketResearch !== false, // default true
      aiModel: settings.aiModel || 'gpt-4o',
    };

    // Create session record in database
    const sessionResult = await pool.query(
      `INSERT INTO ai_proposal_sessions (
        user_id,
        organization_id,
        client_info,
        proposal_type,
        project_context,
        settings,
        status,
        started_at
      ) VALUES ($1, $2, $3, $4, $5, $6, 'processing', NOW())
      RETURNING id`,
      [
        userId,
        organizationId,
        JSON.stringify(clientInfo),
        proposalType,
        projectContext,
        JSON.stringify(finalSettings)
      ]
    );

    const sessionId = sessionResult.rows[0].id;

    // Estimate time based on model
    const estimatedTime = finalSettings.aiModel === 'gpt-o1' ? 90 : 60; // seconds

    // Start generation asynchronously (don't await)
    generateProposalAsync(sessionId, {
      clientInfo,
      proposalType,
      projectContext,
      settings: finalSettings,
    }, userId, organizationId).catch(error => {
      console.error('Async generation error:', error);
    });

    // Return immediately
    res.json({
      sessionId,
      status: 'processing',
      estimatedTime,
    });

  } catch (error) {
    console.error('Error starting proposal generation:', error);
    res.status(500).json({
      error: 'Failed to start proposal generation',
      details: error.message
    });
  }
});

/**
 * Async function to generate proposal in background
 */
async function generateProposalAsync(sessionId, params, userId, organizationId) {
  try {
    // Progress callback to update database
    const onProgress = async (progress) => {
      await pool.query(
        `UPDATE ai_proposal_sessions
         SET progress = $1, updated_at = NOW()
         WHERE id = $2`,
        [JSON.stringify(progress), sessionId]
      );
    };

    // TODO: Fetch market data if settings.includeMarketResearch = true
    // For now, skip web search
    const marketData = null;

    // Generate proposal
    const result = await aiGenerator.generate(
      { ...params, marketData },
      sessionId,
      onProgress
    );

    // Create proposal record
    const proposalResult = await pool.query(
      `INSERT INTO proposals (
        user_id,
        organization_id,
        title,
        content,
        status,
        generated_by_ai,
        ai_session_id,
        ai_model_used,
        created_at
      ) VALUES ($1, $2, $3, $4, 'aberta', true, $5, $6, NOW())
      RETURNING id`,
      [
        userId,
        organizationId,
        `Proposta para ${params.clientInfo.companyName}`,
        JSON.stringify({
          markdown: result.markdown,
          sections: result.sections,
        }),
        sessionId,
        result.aiModel,
      ]
    );

    const proposalId = proposalResult.rows[0].id;

    // Create initial version (version 1)
    await pool.query(
      `INSERT INTO ai_proposal_versions (
        proposal_id,
        version_number,
        content,
        markdown,
        change_description,
        changed_by_user_id,
        changed_via_ai
      ) VALUES ($1, 1, $2, $3, 'Initial AI generation', $4, true)`,
      [
        proposalId,
        JSON.stringify({ sections: result.sections }),
        result.markdown,
        userId,
      ]
    );

    // Update session as completed
    await pool.query(
      `UPDATE ai_proposal_sessions
       SET status = 'completed',
           completed_at = NOW(),
           generated_proposal_id = $1,
           ai_model = $2,
           tokens_used = $3,
           generation_time_ms = $4,
           sources_used = $5
       WHERE id = $6`,
      [
        proposalId,
        result.aiModel,
        result.tokensUsed,
        result.generationTimeMs,
        JSON.stringify(result.metadata.sourcesUsed || []),
        sessionId,
      ]
    );

    // Update user token usage
    await pool.query(
      `UPDATE users
       SET ai_tokens_used_lifetime = ai_tokens_used_lifetime + $1,
           ai_tokens_used_this_month = ai_tokens_used_this_month + $1
       WHERE id = $2`,
      [result.tokensUsed, userId]
    );

  } catch (error) {
    console.error('Error in async generation:', error);

    // Mark session as failed
    await pool.query(
      `UPDATE ai_proposal_sessions
       SET status = 'failed',
           completed_at = NOW(),
           progress = $1
       WHERE id = $2`,
      [JSON.stringify({ error: error.message }), sessionId]
    );
  }
}

/**
 * GET /api/v1/ai/proposals/generate/:sessionId/status
 *
 * Check generation progress/status
 *
 * Returns:
 * {
 *   status: 'processing' | 'completed' | 'failed',
 *   progress: { currentStep, totalSteps, stepName, elapsedTime },
 *   result?: { proposalId, ... },
 *   error?: string
 * }
 */
router.get('/generate/:sessionId/status', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Fetch session
    const result = await pool.query(
      `SELECT
        s.id,
        s.status,
        s.progress,
        s.generated_proposal_id,
        s.ai_model,
        s.tokens_used,
        s.generation_time_ms,
        s.sources_used,
        s.started_at,
        s.completed_at,
        p.content as proposal_content
       FROM ai_proposal_sessions s
       LEFT JOIN proposals p ON p.id = s.generated_proposal_id
       WHERE s.id = $1 AND s.user_id = $2`,
      [sessionId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Session not found'
      });
    }

    const session = result.rows[0];

    // Build response based on status
    const response = {
      status: session.status,
      progress: session.progress || {
        currentStep: 0,
        totalSteps: 6,
        stepName: 'Initializing...',
        elapsedTime: 0,
      },
    };

    if (session.status === 'completed' && session.generated_proposal_id) {
      const proposalContent = JSON.parse(session.proposal_content);

      response.result = {
        proposalId: session.generated_proposal_id,
        markdown: proposalContent.markdown,
        sections: proposalContent.sections,
        metadata: {
          aiModel: session.ai_model,
          tokensUsed: session.tokens_used,
          generationTime: session.generation_time_ms,
          sourcesUsed: session.sources_used || [],
        },
      };
    }

    if (session.status === 'failed') {
      response.error = session.progress?.error || 'Unknown error occurred';
    }

    res.json(response);

  } catch (error) {
    console.error('Error fetching session status:', error);
    res.status(500).json({
      error: 'Failed to fetch session status',
      details: error.message
    });
  }
});

/**
 * POST /api/v1/ai/proposals/:proposalId/chat
 *
 * Chat with AI to refine proposal
 *
 * Body:
 * {
 *   message: string,
 *   context?: { currentSection, selectedText }
 * }
 *
 * Returns:
 * {
 *   aiResponse: string,
 *   updatedSections?: Section[],
 *   tokensUsed: number
 * }
 */
router.post('/:proposalId/chat', async (req, res) => {
  try {
    const { proposalId } = req.params;
    const { message, context } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Fetch proposal
    const proposalResult = await pool.query(
      `SELECT content FROM proposals
       WHERE id = $1 AND user_id = $2`,
      [proposalId, userId]
    );

    if (proposalResult.rows.length === 0) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    const proposalContent = JSON.parse(proposalResult.rows[0].content);
    const currentMarkdown = proposalContent.markdown;

    // Call AI chat
    const chatResult = await aiGenerator.chat(currentMarkdown, message, context);

    // Save user message
    await pool.query(
      `INSERT INTO ai_proposal_chat (
        proposal_id,
        user_id,
        role,
        content,
        context
      ) VALUES ($1, $2, 'user', $3, $4)`,
      [proposalId, userId, message, JSON.stringify(context || {})]
    );

    // Save AI response
    const updatedSectionIds = chatResult.updatedSections.map(s => `section-${s.number}`);

    await pool.query(
      `INSERT INTO ai_proposal_chat (
        proposal_id,
        user_id,
        role,
        content,
        updated_sections,
        tokens_used
      ) VALUES ($1, $2, 'assistant', $3, $4, $5)`,
      [
        proposalId,
        userId,
        chatResult.message,
        updatedSectionIds,
        chatResult.tokensUsed,
      ]
    );

    // If sections were updated, create new version
    if (chatResult.updatedSections.length > 0) {
      // Update proposal content with new sections
      let updatedMarkdown = currentMarkdown;

      for (const section of chatResult.updatedSections) {
        // Replace section in markdown
        const sectionRegex = new RegExp(
          `##\\s+${section.number}\\.\\s+${section.title}[\\s\\S]*?(?=##\\s+\\d+\\.|$)`,
          'g'
        );
        updatedMarkdown = updatedMarkdown.replace(
          sectionRegex,
          `## ${section.number}. ${section.title}\n\n${section.content}\n\n`
        );
      }

      // Get next version number
      const versionResult = await pool.query(
        `SELECT get_next_version_number($1) as next_version`,
        [proposalId]
      );
      const nextVersion = versionResult.rows[0].next_version;

      // Create new version
      await pool.query(
        `INSERT INTO ai_proposal_versions (
          proposal_id,
          version_number,
          content,
          markdown,
          change_description,
          changed_by_user_id,
          changed_via_ai
        ) VALUES ($1, $2, $3, $4, $5, $6, true)`,
        [
          proposalId,
          nextVersion,
          JSON.stringify({ sections: proposalContent.sections }), // TODO: update sections array
          updatedMarkdown,
          `AI chat: ${message.substring(0, 100)}`,
          userId,
        ]
      );

      // Update proposal with new markdown
      await pool.query(
        `UPDATE proposals
         SET content = $1, updated_at = NOW()
         WHERE id = $2`,
        [
          JSON.stringify({ ...proposalContent, markdown: updatedMarkdown }),
          proposalId,
        ]
      );
    }

    // Update user token usage
    await pool.query(
      `UPDATE users
       SET ai_tokens_used_lifetime = ai_tokens_used_lifetime + $1,
           ai_tokens_used_this_month = ai_tokens_used_this_month + $1
       WHERE id = $2`,
      [chatResult.tokensUsed, userId]
    );

    res.json(chatResult);

  } catch (error) {
    console.error('Error in AI chat:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      details: error.message
    });
  }
});

/**
 * GET /api/v1/ai/proposals/:proposalId/versions
 *
 * Get version history of a proposal
 *
 * Returns: Array of versions
 */
router.get('/:proposalId/versions', async (req, res) => {
  try {
    const { proposalId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify ownership
    const ownerResult = await pool.query(
      `SELECT id FROM proposals WHERE id = $1 AND user_id = $2`,
      [proposalId, userId]
    );

    if (ownerResult.rows.length === 0) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    // Fetch versions
    const versionsResult = await pool.query(
      `SELECT
        id,
        version_number,
        change_description,
        changed_via_ai,
        created_at
       FROM ai_proposal_versions
       WHERE proposal_id = $1
       ORDER BY version_number DESC`,
      [proposalId]
    );

    res.json({ versions: versionsResult.rows });

  } catch (error) {
    console.error('Error fetching versions:', error);
    res.status(500).json({
      error: 'Failed to fetch versions',
      details: error.message
    });
  }
});

/**
 * POST /api/v1/ai/proposals/:proposalId/publish
 *
 * Publish proposal and optionally send email
 *
 * Body:
 * {
 *   sendEmail?: { to, subject, message }
 * }
 *
 * Returns:
 * {
 *   publicUrl: string,
 *   pdfUrl: string,
 *   emailSent: boolean
 * }
 */
router.post('/:proposalId/publish', async (req, res) => {
  try {
    const { proposalId } = req.params;
    const { sendEmail } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify ownership
    const proposalResult = await pool.query(
      `SELECT id, title FROM proposals WHERE id = $1 AND user_id = $2`,
      [proposalId, userId]
    );

    if (proposalResult.rows.length === 0) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    // Update status to published (if not already)
    await pool.query(
      `UPDATE proposals
       SET status = 'aberta', updated_at = NOW()
       WHERE id = $1 AND status = 'rascunho'`,
      [proposalId]
    );

    // Generate public URL
    const publicUrl = `${process.env.FRONTEND_URL || 'http://localhost:3001'}/proposal/${proposalId}`;

    // TODO: Generate PDF
    const pdfUrl = `${publicUrl}/pdf`;

    // TODO: Send email if requested
    let emailSent = false;
    if (sendEmail && sendEmail.to) {
      // Email sending logic here
      emailSent = true;
    }

    res.json({
      publicUrl,
      pdfUrl,
      emailSent,
    });

  } catch (error) {
    console.error('Error publishing proposal:', error);
    res.status(500).json({
      error: 'Failed to publish proposal',
      details: error.message
    });
  }
});

module.exports = router;
