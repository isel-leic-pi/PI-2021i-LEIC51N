'use strict'

const fetch = require('node-fetch')


function delay(ms, success) {
    return new Promise((resolve, reject) => {
        if(success) setTimeout(() => resolve('ok'), ms)    
        else setTimeout(() => reject(Error('Promise REJECTED')), ms)    
    })
}

/**
 * @param {String} url 
 * @returns {Promise}
 */
async function checkStatsCodeIsOk(url) {
    const res = await  fetch(url)
    if(res.status >= 200 && res.status < 300) return res.status
    else throw new Error('Status not OK: ' + res.status)
}

pipeline(1000, 'https://www.npmjs.com/package/node-fetch')
pipeline(1000, 'https://www.npmjs.com/package/kahfkjadh')

/**
 * @param {Number} ms 
 * @param {String} url 
 */
function pipeline(ms, url) {
    delay(ms, true)                             // Promise<String>
        .then(() => url)                        // Promise<String>
        .then(url => checkStatsCodeIsOk(url))   // Promise<Promise<Number>> !!!!
        .then(status => console.log(status))
        .catch(err => console.log(err.message))    
}