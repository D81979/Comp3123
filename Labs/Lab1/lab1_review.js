/* 
Purpose: Review JS concepts
Prototypes VS Classes
Regular function, anonymos finctions, arrow functions
Callabck functions
MERN: N stands for NOde.js
*/

// var is global vs. let is local

var globalVariable = 100
let localVarialbe = 200
function functionName(){
    let varInFunc = "local"
}

// console.log(varInFunc) // WILL FAIL

// Prototype - one time use object from a prototype
const oneTimeUseObj = {
    prop1:"Disha",
    prop2:"comp3123",
    method1: function(param1){
        console.log(param1)
    }
}

// const oneTimeUseObj = new Object()

console.log(oneTimeUseObj)
console.log(oneTimeUseObj.prop1)
console.log(oneTimeUseObj.prop2)
oneTimeUseObj.method1("pizza")

//Prototype - using a constructor
function Student(student_name_p, course_p, lunch_p){
    this.student_name = student_name_p
    this.course = course_p
    this.lunch = lunch_p
    this.method1 = function(param1){
        return param1
    }
} 

const morning_student = new Student("Disha", "Comp3123", "noodles")
console.log(morning_student)
console.log(morning_student.student_name)
console.log(morning_student.course)
console.log(morning_student.method1(morning_student.lunch))

// Classes - always have constructors
class Prof {
    constructor(prof_name_p){
        this.prof_name = prof_name_p
    }
    method1(){
        console.log("lunch")
    }
}

const morning_prof = new Prof("Laily")
console.log(morning_prof.prof_name)
morning_prof.method1("burger")

// Optional homewrok: Practice a callback
// function using an array and the .map()
// function