'use strict'
const urllib = require('urllib')

const urls = [
    'http://example.com',
    'https://dzone.com/',
    'https://stackoverflow.com/'
]

function printBodyLength(url) {
    urllib.request(url, (err, body) => {
        if(err) console.log(err)
        else {
            const data = body.toString()
            console.log(`${url} body size = ${data.length}`)
        }
    })
}

urls.forEach(url => {
    console.log('Requesting ' + url)
    printBodyLength(url)
})
