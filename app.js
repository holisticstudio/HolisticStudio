const express = require ('express');
const app = express ('app');
require("dotenv").config();
const path = require ('path');
const contactRouter = require('./controllers/contact');
require ('dotenv').config();
const cors = require ('cors');
const expressStaticGzip = require('express-static-gzip');
const giftRouter = require('./controllers/giftcards');

app.use(cors());

app.use(express.json())
app.use('/api/contact', contactRouter);
app.use('/api/giftcards', giftRouter);


app.use(expressStaticGzip(path.join(__dirname, 'dist')));
app.get('/*', function(request, response) {
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

module.exports = app;