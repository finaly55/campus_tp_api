const db = require("../models/index.js")
const mongoose = require('mongoose')

/**
 * Toute les requetes disponibles pour l'url '/authors'
 */

// Récupération de tous les auteurs
exports.getAllAuthors = async (req, res) => {
    db.Author.
        find({}).
        exec(function (err, authors) {
            if (err) {
                return res.send(err);
            }
            res.json(authors)
        })
}

// Création d'un auteur
exports.createAuthor = async (req, res) => {
    const author = new db.Author({
        _id: new mongoose.Types.ObjectId(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        country: req.body.country,
        books: req.body.books
    })
    author.save(function (err) {
        if (err) {
            return res.send(err);
        } else {
            res.json(author)
        }
    })
}

//Modification d'un auteur
exports.updateAuthor = async (req, res) => {
    db.Author.findById(req.body._id, function (err, author) {
        if (err) {
            return res.send(err);
        } else {
            // Si le champs n'est pas renseigné alors on prend la valeur précédente
            req.body.hasOwnProperty('books') && (author.books = req.body.books)
            req.body.hasOwnProperty('firstname') && (author.firstname = req.body.firstname)
            req.body.hasOwnProperty('lastname') && (author.lastname = req.body.lastname)
            req.body.hasOwnProperty('country') && (author.civility = req.body.civility)

            author.save(function (err) {
                if (err) {
                    return res.send(err);
                } else {
                    res.json(author)
                }
            })
        }
    })
}

/**
 * Routes liées aux id
 */
// Récupération d'un auteur par id
exports.getAuthorById = async (req, res) => {
    db.Author.findById(req.params.id).then(function (author) {
        res.send(author)
    })
}

// Suppression d'un auteur par id
exports.deleteAuthorById = function (req, res) {
    db.Author.remove({
        _id: req.params.id
    }, function (err) {
        if (err) {
            return res.send(err);
        }
        res.json({
            message: "Author delete"
        })
    })
}

/**
 * Données récupérées via le nom ou prénom
 */
// Récupération d'auteurs via nom ou prénom
exports.getAuthorsByName = async (req, res) => {
    db.Author.find({
        $or: [{
            firstname: new RegExp(req.params.name, "i")
        },
        {
            lastname: new RegExp(req.params.name, "i")
        }
        ]
    },
        function (err, authors) {
            if (err) {
                return res.send(err);
            }
            res.send(authors)
        })
}