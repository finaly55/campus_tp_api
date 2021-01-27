const express = require('express')
const router = express.Router()
const authorController = require('../controllers/authorController')

// sans parametre
router.get('/', authorController.getAllAuthors)
router.post('/', authorController.createAuthor)
router.put('/', authorController.updateAuthor)

// par id
router.get('/:id', authorController.getAuthorById)
router.delete('/:id', authorController.deleteAuthorById)

// par nom ou prénom
router.get('/name/:name', authorController.getAuthorsByName)

module.exports = router
