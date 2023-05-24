const express = require("express");
const router  = express.Router();
const adminFoundationController = require("../controllers/admin/foundations");
const adminBrandController = require("../controllers/admin/brands");
const isAuth = require('../middleware/is-auth');
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Foundations Routes XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// Create a new foundation
router.post('/add_foundation', isAuth, adminFoundationController.postAddFoundation);

// Get all foundations
router.get('/get_foundations', isAuth, adminFoundationController.getFoundations);

// Get a single foundation by ID
router.get('/get_foundation', isAuth, adminFoundationController.getFoundation);

// update a foundation
router.put('/update_foundation', isAuth, adminFoundationController.updateFoundation);

// Delete a foundation
router.delete('/delete_foundation', isAuth, adminFoundationController.deleteFoundation);

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Brands Routes XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// Create a new brand
router.post('/add_brand', isAuth, adminBrandController.postAddBrand);

// Get all brands
router.get('/get_brands', isAuth, adminBrandController.getBrands);

// Get a single brand by ID
router.get('/get_brand', isAuth, adminBrandController.getBrand);

// update a brand
router.put('/update_brand', isAuth, adminBrandController.updateBrand);

// Delete a brand
router.delete('/delete_brand', isAuth, adminBrandController.deleteBrand);

module.exports = router;