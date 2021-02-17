const db = require("../models/index.js")
const mongoose = require('mongoose')

/**
 * Toute les requetes disponibles pour l'url '/books'
 */

// Récupération de tous les books
exports.getAllBooks = async (req, res) => {
    db.Book.
        find({}).
        exec(function (err, books) {
            if (err) {
                return res.send(err);
            }
            res.json(books)
        })
}

// Création d'un books
exports.createBook = async (req, res) => {
    const book = new db.Book({
        _id: new mongoose.Types.ObjectId(),
        label: req.body.label,
        author_id: req.body.author_id
    })
    book.save(function (err) {
        if (err) {
            return res.send(err);
        } else {
            res.json(book)
        }
    })
}

//Modification d'un book
exports.updateBook = async (req, res) => {
    db.Book.findById(req.body._id, function (err, book) {
        if (err) {
            return res.send(err);
        } else {
            // Si le champs n'est pas renseigné alors on prend la valeur précédente
            req.body.hasOwnProperty('label') && (book.label = req.body.label)
            req.body.hasOwnProperty('author_id') && (book.author_id = req.body.author_id)

            book.save(function (err) {
                if (err) {
                    return res.send(err);
                } else {
                    res.json(book)
                }
            })
        }
    })
}

/**
 * Routes liées aux id
 */
// Récupération d'un book par id
exports.getBookById = async (req, res) => {
    db.Book.findById(req.params.id).then(function (book) {
        res.send(book)
    })
}

// Suppression d'un book par id
exports.deleteBookById = function (req, res) {
    db.Book.remove({
        _id: req.params.id
    }, function (err) {
        if (err) {
            return res.send(err);
        }
        res.json({
            message: "Book delete"
        })
    })
}

/**
 * Données récupérées via le libelle
 */
exports.getBooksByLabel = async (req, res) => {
    db.Book.find({
        $or: [{
            label: new RegExp(req.params.label, "i")
        }
        ]
    },
        function (err, books) {
            if (err) {
                return res.send(err);
            }
            res.send(books)
        })
}