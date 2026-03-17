const express = require('express');
const router = express.Router();
const { getCategories, getCategoryBySlug, createCategory } = require('../controllers/categoryController');

router.get('/', getCategories);
router.post('/', createCategory);
router.get('/:slug', getCategoryBySlug);

module.exports = router;