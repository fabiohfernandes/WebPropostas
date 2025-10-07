const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/v1/dashboard/stats
 * @desc    Get dashboard statistics for authenticated user
 * @access  Private
 */
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user.userId;
    const pool = req.app.locals.pool;

    // Get proposal statistics
    const proposalStatsQuery = await pool.query(
      `SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status IN ('draft', 'sent', 'viewed', 'commented', 'changes_requested')) as open,
        COUNT(*) FILTER (WHERE status IN ('accepted')) as closed,
        COUNT(*) FILTER (WHERE status IN ('rejected', 'archived')) as archived
      FROM proposals
      WHERE user_id = $1`,
      [userId]
    );

    const proposalStats = proposalStatsQuery.rows[0];

    // Get revenue statistics
    const revenueQuery = await pool.query(
      `SELECT
        COALESCE(SUM(total_value), 0) as total,
        COALESCE(SUM(total_value) FILTER (WHERE status IN ('accepted', 'closed')), 0) as closed
      FROM proposals
      WHERE user_id = $1`,
      [userId]
    );

    const revenue = revenueQuery.rows[0];

    // Get activity statistics (views, unique visitors)
    const activityQuery = await pool.query(
      `SELECT
        COALESCE(SUM(view_count), 0) as total_views,
        COUNT(DISTINCT id) FILTER (WHERE view_count > 0) as unique_visitors
      FROM proposals
      WHERE user_id = $1`,
      [userId]
    );

    const activity = activityQuery.rows[0];

    // Calculate conversion rate (accepted proposals / total sent proposals)
    const conversionQuery = await pool.query(
      `SELECT
        COUNT(*) FILTER (WHERE status IN ('accepted', 'closed')) as accepted,
        COUNT(*) FILTER (WHERE sent_at IS NOT NULL) as sent
      FROM proposals
      WHERE user_id = $1`,
      [userId]
    );

    const conversionData = conversionQuery.rows[0];
    const conversionRate = conversionData.sent > 0
      ? (parseFloat(conversionData.accepted) / parseFloat(conversionData.sent)) * 100
      : 0;

    // Get recent comments (last 5)
    const commentsQuery = await pool.query(
      `SELECT
        c.content as comment_text,
        c.created_at,
        p.title as proposal_name,
        COALESCE(cl.name, c.author_name) as client_name
      FROM comments c
      JOIN proposals p ON c.proposal_id = p.id
      LEFT JOIN clients cl ON p.client_id = cl.id
      WHERE p.user_id = $1
      ORDER BY c.created_at DESC
      LIMIT 5`,
      [userId]
    );

    const recentComments = commentsQuery.rows;

    res.json({
      success: true,
      data: {
        stats: {
          proposals: {
            total: parseInt(proposalStats.total),
            open: parseInt(proposalStats.open),
            closed: parseInt(proposalStats.closed),
            archived: parseInt(proposalStats.archived)
          },
          revenue: {
            total: parseFloat(revenue.total),
            closed: parseFloat(revenue.closed)
          },
          activity: {
            views: parseInt(activity.total_views),
            uniqueVisitors: parseInt(activity.unique_visitors),
            conversionRate: parseFloat(conversionRate.toFixed(1))
          },
          recentComments
        }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get dashboard statistics'
    });
  }
});

module.exports = router;
