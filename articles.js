const express = require('express');
const router = express.Router();
const pool = require('../db');

// Create a new article
router.post('/', async (req, res) => {
  try {
    const { title, description, author, status, rating } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required' });
    }
    const [result] = await pool.query(
      'INSERT INTO articles (title, description, author, status, rating) VALUES (?, ?, ?, ?, ?)',
      [title, description || '', author, status || 'draft', rating || 0]
    );
    res.status(201).json({ id: result.insertId, title, description, author, status, rating });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all articles
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM articles');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get article by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM articles WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update article's rating and/or status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, status } = req.body;

    if (rating === undefined && status === undefined) {
      return res.status(400).json({ message: 'Please provide rating or status to update' });
    }

    // Check if article exists
    const [existing] = await pool.query('SELECT * FROM articles WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Build update query dynamically based on provided fields
    let query = 'UPDATE articles SET ';
    const params = [];
    if (rating !== undefined) {
      query += 'rating = ?';
      params.push(rating);
    }
    if (status !== undefined) {
      if (params.length > 0) query += ', ';
      query += 'status = ?';
      params.push(status);
    }
    query += ' WHERE id = ?';
    params.push(id);

    await pool.query(query, params);

    res.json({ message: 'Article updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an article
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM articles WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
