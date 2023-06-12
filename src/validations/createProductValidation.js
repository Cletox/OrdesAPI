const { body, validationResult } = require('express-validator');
const Product = require('../db/productsModel');

const validateCreateProduct = [
  body('name').notEmpty().withMessage('Name is required'),
  body('model').notEmpty().withMessage('Model is required'),
  body('brand').notEmpty().withMessage('Brand is required'),
  body('categoryId').notEmpty().withMessage('Category ID is required'),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Perform additional asynchronous validation tasks
    try {
      const { name, model } = req.body;
      const existingProduct = await Product.findOne({ name, model });

      if (existingProduct) {
        return res.status(400).json({ error: 'Product already exists' });
      }

      // Additional validation logic...

      // If all validation checks pass, proceed to the next middleware/route handler
      next();
    } catch (error) {
      console.error('Error during validation:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
];

module.exports = {
  validateCreateProduct
};