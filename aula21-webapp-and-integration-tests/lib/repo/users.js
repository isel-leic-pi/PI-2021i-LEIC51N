'use strict'

const fs = require('fs')
const PATH_USERS = './data/users.json'

/**
 * @typedef User
 * @property {String} username
 * @property {Array} artists
 */

/**
 * @param {String} username 
 * @param {function(Error, User)} cb 
 */
function getUser(username, cb) {
    fs.readFile(PATH_USERS, (err, buffer) => {
        if(err) return cb(err)
        const arr = JSON.parse(buffer)
        const users = arr.filter(user => user.username == username)
        if(users.length == 0) return cb(null, null)
        cb(null, users[0])
    })
}

/**
 * @param {function(Error, Array)} cb 
 */
function getUsers(cb) {
    fs.readFile(PATH_USERS, (err, buffer) => {
        if(err) return cb(err)
        const arr = JSON.parse(buffer)
        cb(null, arr)
    })
}


/**
 * Add a new User object with given username if it does not exist yet.
 * Returns an Error if that username already exist.
 * @param {String} username 
 * @param {function(Error)}
 */
function addUser(username, cb) {
    // Ler ficheiro
    // JSON.parse
    // Modificar...
    // JSON.stringify
    // writeFile
}

/**
 * Adds a new artist name to the array of artists of the User with 
 * given username.
 * I does not verify repetitions among artists.
 * 
 * @param {String} username 
 * @param {String} artist 
 * @param {function(Error, User)} cb 
 */
function addArtist(username, artist, cb) {

}

module.exports = {
    getUser,
    getUsers,
    addArtist,
    addUser
}
