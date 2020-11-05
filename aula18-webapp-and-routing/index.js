'use strict'

const http = require('http')
const URL = require('url').URL

const VINYL_USERS = '/vinyl/users'
const VINYL_USER_DETAILS = /\/vinyl\/users\/(.*)/
const VINYL_USER_TOPTRACKS = /\/vinyl\/users\/(.*)\/toptracks/

const server = http.createServer((req, resp) => {

    // From the information in req (IncomingMessage) such as url, HTTP method
    // choose the ROUTE.
    // new URL(url)
    if(req.url.match(VINYL_USER_TOPTRACKS)) {
    } else if(req.url.match(VINYL_USER_DETAILS)) {
    }

    resp.end('Hello World')
})

server.listen(8000)