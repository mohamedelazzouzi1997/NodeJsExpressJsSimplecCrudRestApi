const express = require('express')
const ArticleApiRoutes = require('./routes/article')
require('./config/connect')

const app = express()
const PORT = 3000

app.use('/article', ArticleApiRoutes)
app.use('/getimage', express.static('./uploads'))
app.listen(PORT, () => {
    console.log('listen to ' + PORT)
})