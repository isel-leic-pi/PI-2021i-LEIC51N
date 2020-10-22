'use strict'

const req = require('sync-request')

const urls = [
    'http://example.com',
    'https://dzone.com/',
    'https://stackoverflow.com/'
]

function printBodyLength(url) {
    const res = req('GET', url)
    const body = res.getBody().toString()
    console.log(`url body size = ${body.length}`)
}

urls.forEach(url => {
    console.log('Requesting ' + url)
    printBodyLength(url)
})
