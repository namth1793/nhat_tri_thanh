const db = require('../db/database');

exports.getCategories = (req, res) => {
  try {
    const categories = db.prepare('SELECT * FROM categories ORDER BY id ASC').all();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCategoryBySlug = (req, res) => {
  try {
    const category = db.prepare('SELECT * FROM categories WHERE slug = ?').get(req.params.slug);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCategory = (req, res) => {
  try {
    const { name, slug, description, image } = req.body;
    const result = db.prepare(
      'INSERT INTO categories (name, slug, description, image) VALUES (?, ?, ?, ?)'
    ).run(name, slug, description, image);
    const category = db.prepare('SELECT * FROM categories WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
