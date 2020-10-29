'use strict'

const lastfm = require('./lib/lastfm')

lastfm.getTopTracks('franz ferdinand', (err, tracks) => {
    if(err) console.log(err)
    else tracks.forEach(t => console.log(t))
})