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

// Build management view
invCont.renderManagementView = async function (req, res, next) {
  try {
    let nav = await utilities.getNav(); 
    // Render the management view with the nav and flash message
    res.render('./inventory/management', {
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

// Build add-classification view
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

// Add new classification
invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body
  // Server-side validation
  if (!classification_name || classification_name.trim() === "") {
    req.flash("error", "Classification name is required.")
    res.redirect("/inv/add-classification")
    return
  }
  // Add classification to database
  try {
    await invModel.addClassification(classification_name)
    req.flash("success", "Classification added successfully.")
    res.redirect("/inv")
  } catch (error) {
    req.flash("error", "Failed to add classification.")
    res.redirect("/inv/add-classification")
  }
}

// Build add inventory view
invCont.buildAddInventory = async function (req, res, next) {
  try {
    let nav = await utilities.getNav()
    let classificationOptions = await utilities.buildClassificationList()
    res.render("./inventory/add-inventory", {
      title: "Add New Inventory",
      nav,
      classificationOptions,
    })
  } catch (error) {
    console.error("Error rendering inventory view:", error);
    next(error); // Pass the error to the next middleware/handler
  }
}

// Add new inventory item
invCont.addInventory = async function (req, res, next) {
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body
  // Server-side validation
  if (!inv_make || !inv_model || !inv_year || !inv_description || inv_image || !inv_thumbnail || !inv_price || !inv_miles || !inv_color || !classification_id) {
    req.flash("error", "All fields are required.")
    res.redirect("/inv/add-inventory")
    return
  }
  // Add inventory item to database
  try {
    await invModel.addInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
    req.flash("success", "Inventory item added successfully.")
    res.redirect("/inv")
  } catch (error) {
    req.flash("error", "Failed to add inventory item.")
    res.redirect("/inv/add-inventory")
  }
}

module.exports = invCont