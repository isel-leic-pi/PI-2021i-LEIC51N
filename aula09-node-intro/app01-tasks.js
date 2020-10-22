'use strict'

function submit(label, timeout) {
    setTimeout(() => {
        console.log('Dispatched ' + label)
    }, timeout)
}

console.log('Program start')
submit('Hello!', 1000)
console.log('task subimtted!')
submit('Super!', 500)