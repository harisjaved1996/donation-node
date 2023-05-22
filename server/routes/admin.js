const express = require("express");
const router  = express.Router();
const adminFoundationController = require("../controllers/admin/foundations");
const adminBrandController = require("../controllers/admin/brands");

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Foundations Routes XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// Create a new foundation
router.post('/add_foundation',adminFoundationController.postAddFoundation);

// Get all foundations
router.get('/get_foundations',adminFoundationController.getFoundations);

// Get a single foundation by ID
router.get('/get_foundation',adminFoundationController.getFoundation);

// update a foundation
router.put('/update_foundation',adminFoundationController.updateFoundation);

// Delete a foundation
router.delete('/delete_foundation',adminFoundationController.deleteFoundation);

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX Brands Routes XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// Create a new brand
router.post('/add_brand',adminBrandController.postAddBrand);

// Get all brands
router.get('/get_brands',adminBrandController.getBrands);

// Get a single brand by ID
router.get('/get_brand',adminBrandController.getBrand);

// update a brand
router.put('/update_brand',adminBrandController.updateBrand);

// Delete a brand
router.delete('/delete_brand',adminBrandController.deleteBrand);

module.exports = router;