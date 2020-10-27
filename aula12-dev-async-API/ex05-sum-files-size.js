'use strict'

const fs = require('fs')

const files = [
    'The-Wizard-by-Rider-Haggard.txt',
    'Metamorphosis-by-Franz-Kafka.txt', 
    'The-History-of-Tom-Thumb-and-Others.txt'
]

/**
 * @param {*} path Path to the file
 * @param {(Error, Number) => void} cb Callback function that will receive the result of fileSize, or error otherwise.
 */
function fileSize(path, cb) {
    console.log('Reading ' + path)
    fs.readFile(path, (err, buffer) => {
        if(err)  return cb(err)
        const size = buffer.toString().length
        cb(null, size)
    })
}

function sumFilesSize(paths, cb) {
    let sum = 0
    let count = 0
    paths.forEach(file => {
        fileSize(file, (err, size) => {
            count++
            if(err) return cb(err)
            sum += size
            if(count == paths.length)
                cb(null, sum)
        })
    })
}

sumFilesSize(files, (err, sum) => {
    if(err) console.log(err)
    else console.log('Total files size = ' + sum)
})