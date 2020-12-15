'use strict'

const fetch = require('node-fetch')

const LASTFM_HOST = 'http://ws.audioscrobbler.com/2.0/'
const LASTFM_KEY = '79b2506be8ce86d852882e1774f1f2e8'
const LASTFM_TOP_TRACKS = `?method=artist.gettoptracks&format=json&api_key=${LASTFM_KEY}&artist=`
const LASTFM_SEARCH = `?method=artist.search&format=json&api_key=${LASTFM_KEY}&artist=`

/**
 * @param {String} artist Name of the band or artist.
 * @returns {Promise<Array>} Returns an array with tracks names or Error if not succeeded
 */
function getTopTracks(artist) {
    const path = LASTFM_HOST + LASTFM_TOP_TRACKS + artist
    return fetch(path)
        .then(res => res.json())
        .then(obj => obj.toptracks.track.map(t => t.name))
}

/**
 * @param {String} artist Artist name
 * @return {Promise<Array>} An array of Artist objects with given name or 
 * an Error if there is no Artist with given name.
 */
function searchArtist(artist) {
    const path = LASTFM_HOST + LASTFM_SEARCH + artist
    return fetch(path)
        .then(res => res.json())
        .then(obj => obj.results.artistmatches.artist)
}


module.exports = {
    getTopTracks,
    searchArtist
}