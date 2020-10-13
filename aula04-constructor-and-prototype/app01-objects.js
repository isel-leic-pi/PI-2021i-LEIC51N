'use strict'

function Student(name, n) { // <=> a um Construtor em Java ou .Net => não retorna nada => é usado com o new
    this.name = name
    this.nr = n
    this.toString = function() { return `nr = ${this.nr} name = ${this.name}`}
}

function Account(balance, id) {
    this.id = id
    this.balance = balance
}


function Point(x, y) {
    this.x = x
    this.y = y
}
Point.prototype.module = function() { 
    return Math.sqrt(this.x*this.x + this.y*this.y) 
}

// <=>
/*
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    module() { 
        return Math.sqrt(this.x*this.x + this.y*this.y) 
    }   
}*/

function inspect(obj) {
    for(let property in obj) {
        const propVal = obj[property]
        if (typeof(propVal) === 'function') {
            if (propVal.length === 0)
                console.log(`${property}() = ${obj[property]()}`)
        } else {
            console.log(`${property} = ${propVal}`)
        }
    }
    console.log("\n")
}
const std1 = new Student('Maria Papoila',76546)
const std2 = new Student('Antonio Maria', null)
const acc1 = new Account(9800, 'ABC')
const acc2 = new Account(7700, 'JKY')
const p1 = new Point(5,7)
const p2 = new Point(9,3)

inspect(std1)
inspect(std2)
inspect(acc1)
inspect(acc2)
inspect(p1)
inspect(p2)
console.log(p1.module())