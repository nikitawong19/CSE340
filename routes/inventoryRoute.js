// Needed Resources 
const express = require("express")
// Uses Express to create a new Router object. 
// Remember in lesson 2 that using separate router files for specific elements of the application would keep the server.js file smaller and more manageable? That's what we're doing.

const router = new express.Router() 

// Brings the inventory controller into this router document's scope to be used.
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// "get" indicates that the route will listen for the GET method within the request (typically a clicked link or the URL itself).
// "/type/:classificationId" the route being watched for (note that the inv element of the route is missing, but it will be accounted for later).
// "invController.buildByClassification" indicates the buildByClassification function within the invController will be used to fulfill the request sent by the route.

router.get('/management', invController.renderManagementView);

router.get('/add-classification', invController.renderAddClassificationView);
router.post('/add-classification', invController.addClassification);

module.exports = router;
// exports the router object for use elsewhere.
