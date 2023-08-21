const mongoose = require('mongoose')

const Article = mongoose.model('Article', {
    title: { type: String },
    authorId: { type: String },
    description: { type: String },
    content: { type: String },
    date: { type: String },
    image: { type: String },
    tags: { type: Array },
})

module.exports = Article