'use strict'

let stop = false

setTimeout(() => {
    stop = true
}, 1000)

while(!stop)
    console.log('running...')
