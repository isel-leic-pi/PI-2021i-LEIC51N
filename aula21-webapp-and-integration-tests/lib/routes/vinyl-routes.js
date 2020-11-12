'use strict'

const users = require('./../repo/users')
const vinyl = require('./../repo/vinyl')

function getUserTopTracks(username, cb) {
    vinyl.getTopTracks(username, 5, (err, tracks) => {
        if(err) return cb({
            'status': 500,
            'msg': err.toString()
        })
        cb(null, tracks)
    })
}

function getUserDetails(username, cb) {
    users.getUser(username, (err, user) => {
        if(err) return cb({
            'status': 500,
            'msg': err.toString()
        })
        if(!user) return cb({
            'status': 404,
            'msg': 'There is no user with username ' + username
        })
        cb(null, user)
    })

}

function getUsers(req, cb) {
    users.getUsers( (err, users) => {
        if(err) return cb({
            'status': 500,
            'msg': err.toString()
        })
        const basePath = req.headers.host        
        users.forEach(user => {
            user.details = 'http://' + basePath + '/vinyl/users/' + user.username,
            user.toptracks = 'http://' + basePath + '/vinyl/users/' + user.username + '/toptracks'
        })
        cb(null, users)
    })
}

module.exports = {
    getUserTopTracks,
    getUserDetails,
    getUsers,
}