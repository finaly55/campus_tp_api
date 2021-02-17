const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookController')

// sans parametre
router.get('/', bookController.getAllBooks)
router.post('/', bookController.createBook)
router.put('/', bookController.updateBook)

// par id
router.get('/:id', bookController.getBookById)
router.delete('/:id', bookController.deleteBookById)

// get by label
router.get('/label/:label', bookController.getBooksByLabel)


module.exports = router
