'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
/**
 * ROUTES
 */
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(express.static('public'))
// app.use(require('cookie-parser')()) 
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use((req, res, next) => {
    // console.log(req.cookies)
    console.log(req.session)
    next()
})
app.get('/hello/:bro', (req, res) => {
    /*
    res.cookie('boss', 'gamboa')
    res.cookie('bro', req.params.bro, {
        'expires': new Date(Date.now())
    })
    */
    req.session.boss = 'gamboa'
    req.session.bro = req.params.bro
    res.send('Hello!')
})
/**
 * ERROR Handler
 */
app.use((err, req, resp, next) => {
    if(err.status) resp.status(err.status)
    else (resp.status(500))
    resp.send(JSON.stringify(err, Object.getOwnPropertyNames(err)))
    console.log(err)
})
/**
 * RUN
 */
app.listen(8000, () => {
    console.log('Listening for HTTP requests on port 8000')
})   
