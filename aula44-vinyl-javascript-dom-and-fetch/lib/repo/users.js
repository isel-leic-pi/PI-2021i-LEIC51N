'use strict'

const fs = require('fs').promises

let usersPath = './data/users.json'

function getUsers() {
    return fs
        .readFile(usersPath)
        .then(buffer => JSON.parse(buffer))
}

/**
 * @typedef User
 * @property {String} username
 * @property {String} password
 * @property {Array} artists Array of strings with artists names.
 */
/**
 * @param {String} username 
 * @returns {Promise<User>}
 */
function getUser(username) {
    return fs
        .readFile(usersPath)
        .then(buffer => {
            const arr = JSON.parse(buffer)
            const selected = arr.filter(user => user.username == username)
            return selected.length == 0 ? null : selected[0]
        })
}

/**
 * Add a new User object with given username if it does not exist yet.
 * Returns an Error if that username already exist.
 * @param {String} username 
 */
function addUser(username) {
}

/**
 * Adds a new artist name to the array of artists of the User with 
 * given username.
 * It does not verify repetitions among artists.
 * 
 * @param {String} username 
 * @param {String} artist 
 */
function addArtist(username, artist) {
    return fs
        .readFile(usersPath)
        .then(buffer => {
            const arr = JSON.parse(buffer)
            const selected = arr.filter(user => user.username == username)
            if(selected.length == 0) throw new Error('There is no user ' + username)
            const user =  selected[0]
            user.artists[digest(artist)] = artist
            return fs.writeFile(usersPath, JSON.stringify(arr, null, 4))
        })
}

function digest(word){
    var hash = 0
    for (var i = 0; i < word.length; i++) {
        var character = word.charCodeAt(i)
        hash = ((hash<<5)-hash)+character
        hash = hash & hash // Convert to 32bit integer
    }
    return hash
        .toString()    // convert number to string
        .split('')     // convert string to array of characters
        .map(Number)   // parse characters as numbers
        .map(n => (n || 10) + 64)   // convert to char code, correcting for J
        .map(c => String.fromCharCode(c))   // convert char codes to strings
        .join('')     // join values together
}

/**
 * Removes artist name from the array of artists of the User with 
 * given username.
 * 
 * @param {String} username 
 * @param {String} artist Id of the artist
 * @returns {Promise<Void>}
 */
function removeArtist(username, artist) {
    return fs
        .readFile(usersPath)
        .then(buffer => {
            const arr = JSON.parse(buffer)
            const selected = arr.filter(user => user.username == username)
            if(selected.length == 0) throw UserError(404, 'There is no user ' + username)
            const user =  selected[0]
            if(!user.artists[artist]) throw UserError(404, 'There is no artist ' + artist)
            delete user.artists[artist]
            return fs.writeFile(usersPath, JSON.stringify(arr, null, 4))
        })
}

function UserError(status, message) {
    const err = Error(message)
    err.status = status
    return err
}

function init(path) {
    if(path) usersPath = path
    return {
        getUser,
        getUsers,
        removeArtist,
        addArtist,
        addUser
    }
}

module.exports = { init }