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

module.exports = router
