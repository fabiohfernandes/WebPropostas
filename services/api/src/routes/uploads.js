/**
 * File Upload API Routes
 * WebPropostas V2.0 MVP - File Upload System
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    const ext = path.extname(file.originalname);
    const filename = `${uniqueId}${ext}`;
    cb(null, filename);
  }
});

// File filter - allow images, PDFs, and documents
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

/**
 * @route   POST /api/v1/uploads
 * @desc    Upload a file
 * @access  Private
 */
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    const userId = req.user.userId;
    const { proposal_id, description } = req.body;

    // Save file metadata to database
    const result = await req.app.locals.pool.query(
      `INSERT INTO file_uploads (
        user_id, proposal_id, filename, original_filename,
        storage_url, file_size, file_type
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [
        userId,
        proposal_id || null,
        req.file.filename,
        req.file.originalname,
        `/uploads/${req.file.filename}`,
        req.file.size,
        req.file.mimetype
      ]
    );

    // Log activity
    await req.app.locals.pool.query(
      `INSERT INTO activity_log (user_id, action, entity_type, entity_id, changes)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        userId,
        'upload',
        'file',
        result.rows[0].id,
        JSON.stringify({
          filename: req.file.originalname,
          size: req.file.size,
          proposal_id
        })
      ]
    );

    res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        file: {
          id: result.rows[0].id,
          filename: result.rows[0].filename,
          original_filename: result.rows[0].original_filename,
          storage_url: result.rows[0].storage_url,
          file_size: result.rows[0].file_size,
          file_type: result.rows[0].file_type,
          url: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
        }
      }
    });
  } catch (error) {
    console.error('File upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload file'
    });
  }
});

/**
 * @route   POST /api/v1/uploads/multiple
 * @desc    Upload multiple files
 * @access  Private
 */
router.post('/multiple', upload.array('files', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No files uploaded'
      });
    }

    const userId = req.user.userId;
    const { proposal_id } = req.body;

    const uploadedFiles = [];

    for (const file of req.files) {
      const result = await req.app.locals.pool.query(
        `INSERT INTO file_uploads (
          user_id, proposal_id, filename, original_filename,
          storage_url, file_size, file_type
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [
          userId,
          proposal_id || null,
          file.filename,
          file.originalname,
          `/uploads/${file.filename}`,
          file.size,
          file.mimetype
        ]
      );

      uploadedFiles.push({
        id: result.rows[0].id,
        filename: result.rows[0].filename,
        original_filename: result.rows[0].original_filename,
        storage_url: result.rows[0].storage_url,
        file_size: result.rows[0].file_size,
        file_type: result.rows[0].file_type,
        url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      });
    }

    // Log activity
    await req.app.locals.pool.query(
      `INSERT INTO activity_log (user_id, action, entity_type, entity_id, changes)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        userId,
        'upload_multiple',
        'files',
        null,
        JSON.stringify({
          count: req.files.length,
          total_size: req.files.reduce((sum, f) => sum + f.size, 0),
          proposal_id
        })
      ]
    );

    res.status(201).json({
      success: true,
      message: `${uploadedFiles.length} files uploaded successfully`,
      data: {
        files: uploadedFiles
      }
    });
  } catch (error) {
    console.error('Multiple file upload error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to upload files'
    });
  }
});

/**
 * @route   GET /api/v1/uploads
 * @desc    Get user's uploaded files
 * @access  Private
 */
router.get('/', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { proposal_id, limit = 50, offset = 0 } = req.query;

    let query = `
      SELECT * FROM file_uploads
      WHERE user_id = $1
    `;
    const params = [userId];

    if (proposal_id) {
      params.push(proposal_id);
      query += ` AND proposal_id = $${params.length}`;
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit), parseInt(offset));

    const result = await req.app.locals.pool.query(query, params);

    // Add full URL to each file
    const files = result.rows.map(file => ({
      ...file,
      url: `${req.protocol}://${req.get('host')}${file.storage_url}`
    }));

    res.json({
      success: true,
      data: {
        files,
        count: files.length
      }
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch files'
    });
  }
});

/**
 * @route   GET /api/v1/uploads/:id
 * @desc    Get file by ID
 * @access  Private
 */
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const result = await req.app.locals.pool.query(
      'SELECT * FROM file_uploads WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }

    const file = result.rows[0];
    file.url = `${req.protocol}://${req.get('host')}${file.storage_url}`;

    res.json({
      success: true,
      data: { file }
    });
  } catch (error) {
    console.error('Get file error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch file'
    });
  }
});

/**
 * @route   DELETE /api/v1/uploads/:id
 * @desc    Delete a file
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    // Get file info
    const fileResult = await req.app.locals.pool.query(
      'SELECT * FROM file_uploads WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (fileResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'File not found'
      });
    }

    const file = fileResult.rows[0];

    // Delete from database
    await req.app.locals.pool.query(
      'DELETE FROM file_uploads WHERE id = $1',
      [id]
    );

    // Delete physical file
    const filePath = path.join(uploadsDir, file.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Log activity
    await req.app.locals.pool.query(
      `INSERT INTO activity_log (user_id, action, entity_type, entity_id, changes)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        userId,
        'delete',
        'file',
        id,
        JSON.stringify({ filename: file.original_filename })
      ]
    );

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete file'
    });
  }
});

module.exports = router;
