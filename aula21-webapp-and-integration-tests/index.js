'use strict'

const http = require('http')
const routes = require('./lib/routes/vinyl-routes')

const VINYL_USERS = '/vinyl/users'
const VINYL_USER_DETAILS = /\/vinyl\/users\/(.*)/
const VINYL_USER_TOPTRACKS = /\/vinyl\/users\/(.*)\/toptracks/

const server = http.createServer((req, resp) => {
    let path
    // From the information in req (IncomingMessage) such as url
    // choose the ROUTE.
    if((path = req.url.match(VINYL_USER_TOPTRACKS))) {
        routes.getUserTopTracks(path[1], (err, user) => send(resp, err, user))
    }
    else if((path = req.url.match(VINYL_USER_DETAILS))) {
        routes.getUserDetails(path[1], (err, user) => send(resp, err, user))
    }
    else if(req.url.match(VINYL_USERS)){
        routes.getUsers(req, (err, user) => send(resp, err, user))
    }
    else {
        resp.writeHead(404, 'Resource not found!!!!!')
        resp.end()
    }
})

function send(resp, err, payload) {
    if(err) {
        resp.writeHead(err.status)
        resp.end(err.msg)
    }
    else {
        const json = JSON.stringify(payload)
        resp.writeHead(200, {
            'content-type': 'application/json'
        })
        resp.end(json)
    }
}
server.listen(8000, () => console.log('Listening on port 8000'))