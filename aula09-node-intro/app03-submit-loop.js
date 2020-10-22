'use strict'

let stop = false

setTimeout(() => {
    stop = true
    console.log('STOP!')
}, 000)

function loop() {
    if(stop) return
    console.log('running...')
    setTimeout(() => loop())
}

loop()