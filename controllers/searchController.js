const utilities = require('../utilities/')
const pool = require('../database/')

// Handle search request
async function handleSearch(req, res, next) {
  try {
    let nav = await utilities.getNav()
    const query = req.query.q
    const results = await performSearch(query)
    
    res.render('searchResults', {
      title: 'Search Results',
      nav,
      query,
      results,
    })
  } catch (err) {
    next(err)
  }
}

// Create search logic
async function performSearch(query) {
    try {
      const client = await pool.connect()
      const sql = `
        SELECT inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color
        FROM inventory
        WHERE inv_make ILIKE $1 
        OR inv_model ILIKE $1 
        OR inv_description ILIKE $1
      `
      const values = [`%${query}%`]
      const result = await client.query(sql, values)
      client.release()
      return result.rows
    } catch (err) {
      console.error('Error performing search', err.stack)
      return []
    }
}
  
module.exports = {handleSearch, performSearch}