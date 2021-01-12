'use strict'

const vinyl = require('../repo/vinyl')
const users = require('../repo/users').init()
const Router = require('express').Router
const router = Router()

module.exports = router

router.get('/vinyl/users/:username/toptracks', handlerTopTracks)
router.delete('/vinyl/users/:username/artists/:artist', handlerUserRemoveArtist)
router.get('/vinyl/users/:username', handlerUserDetails)
router.put('/vinyl/users/:username', handlerUserDetailsUpdate)
router.get('/vinyl/users', handlerUsersList)

function handlerTopTracks (req, resp, next) {
    const limit = req.query.limit | 3
    const username = req.params.username
    vinyl
        .getTopTracks(username, limit)
        .then(tracks => resp.json(tracks))
        .catch(next)
}

function handlerUserRemoveArtist(req, resp, next) {
    const username = req.params.username
    const artist = req.params.artist
    users
        .removeArtist(username, artist)
        .then(() => resp.send())
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
            resp.json(user)
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
        .then(users => resp.json(users.map(user => {
            user.details = `http://${host}/vinyl/users/${user.username}`
            user.toptracks = `http://${host}/vinyl/users/${user.username}/toptracks`
            return user
        })))
        .catch(next)
}
