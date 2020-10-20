'use strict'

function enclosing(label) {
    return function() {
        console.log('I am ' + label)
    }
}

const f = enclosing('ISEL')
f()

const b = enclosing('bar')
b()