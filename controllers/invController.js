const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

// Creates an empty object in the invCont variable.
const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
// Creates an asynchronous, anonymous function which accepts the request and response objects, along with the Express next function as parameters. 
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.renderManagementView = async function (req, res, next) {
  try {
    let nav = await utilities.getNav(); 

    // Render the management view with the nav and flash message
    res.render('inventory/management', {
      title: 'Inventory Management',
      h1: 'Inventory Management',
      nav,
      message: req.flash('message')
    });
  } catch (error) {
    console.error("Error rendering management view:", error);
    next(error); // Pass the error to the next middleware/handler
  }
};

invCont.renderAddClassificationView = async function (req, res, next) {
  try {
    let nav = await utilities.getNav(); 
    res.render('./inventory/add-classification', {
      title: 'Add Classification',
      h1: 'Add Classification',
      nav,
      message: req.flash('message')
    });
  } catch (error) {
    console.error("Error rendering management view:", error);
    next(error); // Pass the error to the next middleware/handler
  }
};

invCont.addClassification = async function (req, res, next) {
  const { classificationName } = req.body;
  try {
    await invModel.insertClassification(classificationName);
    req.flash('success', 'Classification added successfully.');
    res.redirect('inv/');
  } catch (error) {
    req.flash('fail', 'Failed to add classification.');
    res.redirect('inv/add-classification');
    next(error); // Pass the error to the next middleware/handler
  }
};

module.exports = invCont