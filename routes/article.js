const express = require('express')
const router = express.Router()
const Article = require('../models/article')
const multer = require('multer')


filename = ''

const myStorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect) => {
        let date = Date.now()
        console.log('file', file.mimetype)
        let fl = date + '.' + file.mimetype.split('/')[1]
        redirect(null, fl)
        filename = fl
    }
})

const upload = multer({ storage: myStorage })

router.post('/add', upload.any('image'), (req, res) => {
    let data = req.body

    let article = new Article(data)
    article.date = new Date()
    article.image = filename
    article.tags = data.tags.split(',')

    article.save().then(saved => {
        filename = ''
        res.status(200).send(saved)
    }).then(err => {
        res.status(400).send(err)
    })


})
router.get('/all', (req, res) => {
    Article.find({})
        .then(articles => res.status(200).send(articles))
        .catch(err => res.status(400).send(err))
})
router.get('/:id', (req, res) => {

    let id = req.params.id
    Article.findOne({ _id: id })
        .then(articles => res.status(200).send(articles))
        .catch(err => res.status(400).send(err))
})
router.get('/author/:id', (req, res) => {
    let authorId = req.params.id
    Article.findOne({ authorId: authorId })
        .then(articles => res.status(200).send(articles))
        .catch(err => res.status(400).send(err))
})
router.delete('/delete/:id', (req, res) => {
    let id = req.params.id
    Article.deleteOne({ _id: id })
        .then(article => res.status(200).send(article))
        .catch(err => res.status(400).send(err))
})
router.put('edit/articl/:id', upload.any('image'), (req, res) => {
    let data = req.body
    let id = req.params.id

    if (filename.length > 0) {
        data.image = filename
    }

    Article.findByIdAndUpdate({ _id: id }, data)
        .then(article => {
            filename = ''
            res.status(200).send(article)
        })
        .catch(err => res.status(400).send(err))
})

module.exports = router