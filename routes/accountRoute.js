/* ***********************
 * Account routes
 * ************************/
// Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController") 
const utilities = require("../utilities")
const regValidate = require("../utilities/account-validation")

/* ***********************
 * Login routes
 * ************************/
router.get("/login", utilities.handleErrors(accountController.buildLogin))

/* ***********************
 * Deliver Registration routes
 * ************************/
router.get("/register", utilities.handleErrors(accountController.buildRegister))

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

/* ***********************
 * Process registration
 * ************************/
// router.post("/register", utilities.handleErrors(accountController.registerAccount))

module.exports = router