'use strict'

function makeStudent(name, nr) {
    return {
        'name': name,
        'nr': nr,
        'toString': function() { return `nr = ${this.nr} name = ${this.name}`}
    }
}

function Student(name, n) { // <=> a um Construtor em Java ou .Net => não retorna nada => é usado com o new
    this.name = name
    this.nr = n
    this.toString = function() { return `nr = ${this.nr} name = ${this.name}`}
}
function Account(balance, id) {
    // ...
}

function print(std) {
    // console.log(typeof(std) + ": " + std.toString())
    console.log(std.constructor.prototype + ": " + std.toString())
}


const std1 = makeStudent('Ze Manel',61524)
const std2 = new Student('Maria Papoila',76546)
const std3 = new Student('Antonio Maria', 90583)

/*
std2.print = function() { console.log(typeof(this) + ": " + this.toString()) }
std3.print = function() { console.log(typeof(this) + ": " + this.toString()) }
*/
// std2.constructor.prototype.print = function() { console.log(typeof(this) + ": " + this.toString()) }
Student.prototype.print = function() { 
    console.log(this.constructor.prototype + ": " + this.toString()) 
}

const std4 = new Student('Joana Raimunda', 82673)

print(std1)
std2.print()
std3.print()
std4.print()

console.log('std1 is Student = ' + (std1 instanceof Student))
console.log('std2 is Student = ' + (std2 instanceof Student))
console.log('std3 is Student = ' + (std3 instanceof Student))

function inspect(obj) {
    
}




