// Brings the express into this router document's scope to be used.
const express = require("express")

// Uses Express to create a new Router object. 
const router = new express.Router() 

// Brings the inventory controller into this router document's scope to be used.
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route for management view
router.get('/management', invController.renderManagementView);

// Route for add-classification view
router.get('/add-classification', invController.renderAddClassificationView);

// Route to handle adding a new classification
router.post('/add-classification', invController.addClassification);

// Route for add-inventory view
router.get("/add-inventory", invController.buildAddInventory);

// Route to handle adding a new inventory item
router.post("/add-inventory", invController.addInventory);

// exports the router object for use elsewhere.
module.exports = router;