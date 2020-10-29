'use strict'

const vinyl = require('./lib/vinyl')

vinyl.getTopTracks('gamboa', 3, (err, tracks) => {
    if(err) console.log(err)
    else
        tracks.forEach(t => console.log(t))   
})

/*
lastfm.getTopTracks('franz ferdinand', (err, tracks) => {
    if(err) console.log(err)
    else tracks.forEach(t => console.log(t))
})*/
/*
users.getUser('gamboa', (err, user) => {
    if(err) console.log(err)
    else
        user.artists.forEach(art => console.log(art))
})

users.getUser('kaskdh', (err, user) => {
    if(err) console.log(err)
    else
        user.artists.forEach(art => console.log(art))
})
*/