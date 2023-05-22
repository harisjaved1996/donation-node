const express = require("express");
const router  = express.Router();
const adminController = require("../controllers/admin");

// Create a new foundation
router.post('/add_foundation',adminController.postAddFoundation);

// Get all foundations
router.get('/get_foundations',adminController.getFoundations);

// Get a single foundation by ID
router.get('/get_foundation',adminController.getFoundation);

// update a foundation
router.put('/update_foundation',adminController.updateFoundation);

// Delete a foundation
router.delete('/delete_foundation',adminController.deleteFoundation);



module.exports = router;