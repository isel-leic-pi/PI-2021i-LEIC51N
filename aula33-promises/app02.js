'use strict'

const ok = delay(2000, true)
const err = delay(2000, false)

function delay(ms, success) {
    return new Promise((resolve, reject) => {
        if(success) setTimeout(() => resolve('ok'), ms)    
        else setTimeout(() => reject(Error('Promise REJECTED')), ms)    
    })
}

forward(ok)
forward(err)
console.log('FINISHED')

function forward(prm) {
    prm
        .then(val => console.log(val))
        .catch(err => console.log('!!! ERROR: ' +  err.message))
}