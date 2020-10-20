'use strict'

function makePoint(x, y) { // Qual o this ???
    return {
        'x': x,
        'y': y,
        'print': () => console.log(`Point: ${this.x}, ${this.y}`)
    }
}

makePoint(5, 7) // this undefined

const p1 = makePoint(5,7) // O print captura this com undefined

p1.print() // TypeError: Cannot read property 'x' of undefined