const express = require('express')
const router = new express.Router()
const searchController = require('../controllers/searchController')

// Define the search route
router.get('/searchResults', searchController.handleSearch)

module.exports = router