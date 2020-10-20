'use strict'

function foo() {
    console.log('I am foo')
}

const bar = function () {
    console.log('I am bar')
}

const zas =  () => console.log('I am zas')

// console.log(foo.name)
// console.log(bar.name)
// console.log(zas.name)

const other = foo
other()
console.log(other.name)