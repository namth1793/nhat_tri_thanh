const db = require('../db/database');

function parseProduct(p) {
  if (!p) return null;
  return {
    ...p,
    specifications: JSON.parse(p.specifications || '{}'),
    images: JSON.parse(p.images || '[]'),
    is_active: Boolean(p.is_active),
  };
}

exports.getProducts = (req, res) => {
  try {
    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (req.query.category_id) {
      query += ' AND p.category_id = ?';
      params.push(req.query.category_id);
    }
    if (req.query.active !== undefined) {
      query += ' AND p.is_active = ?';
      params.push(req.query.active === 'true' ? 1 : 0);
    }
    query += ' ORDER BY p.id DESC';

    const products = db.prepare(query).all(...params).map(parseProduct);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = (req, res) => {
  try {
    const row = db.prepare(`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `).get(req.params.id);
    if (!row) return res.status(404).json({ message: 'Product not found' });
    res.json(parseProduct(row));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = (req, res) => {
  try {
    const { name, category_id, description, specifications, images } = req.body;
    const result = db.prepare(
      'INSERT INTO products (name, category_id, description, specifications, images) VALUES (?, ?, ?, ?, ?)'
    ).run(
      name, category_id, description,
      JSON.stringify(specifications || {}),
      JSON.stringify(images || [])
    );
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(parseProduct(product));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProduct = (req, res) => {
  try {
    const { name, category_id, description, specifications, images, is_active } = req.body;
    const existing = db.prepare('SELECT id FROM products WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Product not found' });

    db.prepare(`
      UPDATE products SET
        name = COALESCE(?, name),
        category_id = COALESCE(?, category_id),
        description = COALESCE(?, description),
        specifications = COALESCE(?, specifications),
        images = COALESCE(?, images),
        is_active = COALESCE(?, is_active)
      WHERE id = ?
    `).run(
      name, category_id, description,
      specifications ? JSON.stringify(specifications) : null,
      images ? JSON.stringify(images) : null,
      is_active !== undefined ? (is_active ? 1 : 0) : null,
      req.params.id
    );

    const updated = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    res.json(parseProduct(updated));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = (req, res) => {
  try {
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    if (result.changes === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
