const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000

app
    .use(express.static(path.join(__dirname, 'storybook-static')))
    .set('storybook-static', path.join(__dirname, 'storybook-static'))
    .get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))