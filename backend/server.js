const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Init DB (creates tables if not exist)
const db = require('./db/database');

// Auto-seed if DB is empty
const count = db.prepare('SELECT COUNT(*) as n FROM categories').get();
if (count.n === 0) {
  console.log('DB empty — running seed...');
  require('./db/seed');
}

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/categories', require('./routes/categories'));
app.use('/api/products', require('./routes/products'));

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
