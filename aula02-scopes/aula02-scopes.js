'use strict'

function foo(nr) {
    const str = 'ola'
    console.log(str)
    for (let index = 0; index < nr; index++) {
        console.log(index)
    }
    // console.log(index) // ERRO acesso ao index fora do scope 
}

foo(4)

const str = 'super'
console.log(str)

const msg = 'ola'