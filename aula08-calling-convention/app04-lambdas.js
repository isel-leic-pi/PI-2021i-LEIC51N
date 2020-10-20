'use strict'

function Point(x, y) {
    this.x = x
    this.y = y
    this.print = () => console.log(`Point: ${this.x}, ${this.y}`)
}

const p1 = new Point(2,3) // Função construtora recebe this do novo objecto => Closure de print que captura o p1
const p2 = new Point(5,7) // Função construtora recebe this do novo objecto => Closure de print que captura o p2

p1.print()
p1.print.call(p2) // target é p2 => é ignorado

const other = p1.print
other()         // target é undefined 
other.call(p2)  // target é p2 => mas é ignorado 

p1.x = 11
p1.print()