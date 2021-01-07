'use strict'

const express = require('express')
const sitemap = require('express-sitemap-html')
const bodyParser = require('body-parser')
const passport = require('passport')
let server

function init(usersPath, done) {
    if(usersPath)
        require('./repo/users').init(usersPath)
    const app = express()
    app.set('view engine', 'hbs')
    app.set('views', './lib/views')
    /**
     * ROUTES util
     */
    app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
    app.use(express.static('public'))
    app.use(require('cookie-parser')())
    app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
    app.use(require('connect-flash')())
    /**
     * req.login(User): User ---> User Id ---> Session State
     * req.logout(): Delete User Id from the Session State
     * Through serializeUser
     */
    app.use(passport.initialize())
    /**
     * Keep User Id in session state.
     * User Id ---> User ---> req.user
     * Through deserializeUser
     */
    app.use(passport.session())
    /**
     * ROUTES domain
     */
    app.use(require('./routes/routes-vinyl-auth'))
    app.use('/api', require('./routes/routes-vinyl-api'))
    app.use(require('./routes/routes-vinyl-web'))
    app.get('/sitemap', sitemap(app))
    sitemap.swagger('Vinyl', app)
    /**
     * ERROR HAndler
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
    server = app.listen(8000, () => {
        console.log('Listening for HTTP requests on port 8000')
        if (done) done()
    })   
}

function close() {
    server.close()
}

module.exports = { init, close }