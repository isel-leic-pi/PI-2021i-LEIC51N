'use strict'

const users = require('./../repo/users').init()
const { session } = require('passport')
const passport = require('passport')
const router = require('express').Router()

module.exports = router

router.get('/vinyl/login', (req, res) => {
    const msg = req.flash('userError')
    if(msg) {
        res.render('login', {
            'messages': {
                'error': msg
            }
        })
    }
    else res.render('login')
})

router.post('/vinyl/login', (req, res, next) => {
    const username =  req.body.username
    const password = req.body.password
    users
        .getUser(username)
        .then(user => {
            if(!user) {
                req.flash('userError', `There is no user with username ${username}`)
                return res.redirect('/vinyl/login') // -> `There is no user with username ${username}`
            } 
            if(user.password != password) {
                req.flash('userError', 'Invalid credentials!')
                return res.redirect('/vinyl/login') // -> `There is no user with username ${username}`
            }
            /**
             * serializeUser --> User Id ---> Session State
             */
            req.logIn(user, err => {
                if(err) next(err)
                else res.redirect('/sitemap')
            })
            
        })
        .catch(next) 
})


passport.serializeUser(function(user, done) {
    done(null, user.username)
})

passport.deserializeUser(function(username, done) {
    users
        .getUser(username)
        .then(user => done(null, user))
        .catch(done)
})