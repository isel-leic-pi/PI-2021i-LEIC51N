'use strict'

function Point(x, y) {
    this.x = x
    this.y = y
    this.print = function () { console.log(`Point: ${this.x}, ${this.y}`) } // this é o target
}

const p1 = new Point(2,3);
const p2 = new Point(5,7);

// p1.print()
// p2.print()

const other = p1.print

// other() // TypeError: Cannot read property 'x' of undefined

other.apply(p1)
p1.print.apply(p2)

