'use strict'

const vinyl = require('../repo/vinyl')
const users = require('../repo/users').init()
const Router = require('express').Router
const router = Router()

module.exports = router

router.get('/vinyl/users/:username/toptracks', isAuthenticated, handlerTopTracks)
router.post('/vinyl/users/:username', isAuthenticated, handlerUserAddArtist)
router.get('/vinyl/users/:username', isAuthenticated, handlerUserDetails)
router.put('/vinyl/users/:username', isAuthenticated, handlerUserDetailsUpdate)
router.get('/vinyl/users', handlerUsersList)

function isAuthenticated(req, res, next) {
    if(req.user) next()
    else res.redirect('/vinyl/login')
}

function handlerTopTracks (req, resp, next) {
    const limit = req.query.limit | 3
    const username = req.params.username
    vinyl
        .getTopTracks(username, limit)
        .then(tracks => resp.json(tracks))
        .catch(next)
}

function handlerUserAddArtist(req, resp, next) {
    const username = req.params.username
    vinyl
        .addArtist(username, req.body.artist)
        .then(() => resp.redirect('/vinyl/users/' + username))
        .catch(next)
}

function handlerUserDetails (req, resp, next) {
    const username = req.params.username
    users
        .getUser(username)
        .then(user => {
            if(!user) {
                const err = new Error('There is no user with username: ' + username)
                err.status = 404
                return next(err)
            }
            resp.render('userDetails', user)
        })
        .catch(next)
}

function handlerUserDetailsUpdate (req, resp, next) {
    next()
}

function handlerUsersList (req, resp, next) {
    const host = req.headers.host
    users
        .getUsers()
        .then(users => {
            const arr = users.map(user => {
                user.details = `http://${host}/vinyl/users/${user.username}`
                user.toptracks = `http://${host}/vinyl/users/${user.username}/toptracks`
                return user
            })
            resp.render('usersList', { 'users': arr })
        })
        .catch(next)
}
