'use strict'

/**
 * then() returns a new Promise fulfiled with 'ok'
 */
const ok = Promise.resolve().then(() => 'ok')
/**
 * then() returns a new Promise rejected.
 */
const err = Promise.resolve().then(() => { throw new Error('Promise REJECTED')})

forward(ok)
forward(err)

function forward(prm) {
    /*
    prm.then(
        val => console.log(val),
        err => console.log('!!! ERROR: ' +  err.message)
    )*/
    prm
        .then(val => console.log(val))
        .catch(err => console.log('!!! ERROR: ' +  err.message))
}