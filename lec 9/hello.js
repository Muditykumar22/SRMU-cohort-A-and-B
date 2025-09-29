// let x = 90;
// x= true;
// x= "ankit"
// console.log("hello world")
// //anonymous function
// x = function (a,b,c){
//     console.log("hello")
//     return a+b+c;
// }
// // x = 20;
// const ans = x(15,16,4)
// console.log(ans);


// // // callback- functions that takes another functions as a callback
// // let greet = function(callback){
// //     console.log("start")
// //     callback();
// //     console.log("End")
// // };
// // let sayHello = function(){
// //     console.log("hello students")
// // };
// // greet(sayHello);

// // //functions that returns another function (closure)
// // let multiplier = function(m){
// //     return function(n){
// //         return m*n;
// //     };
// // };
// // let double = multiplier(2);
// // console.log(double(5));


// function ravinder(ravinder){
//     ravinder();
//     console.log("hello rbu");
//     console.log(ravinder);
//     ravinder();
//     console.log(typeof(ravinder));
//     ravinder();
// }
//  let x=()=>{
//      console.log("hi");
//      console.log("bye");
//  };
//  ravinder(x);

// let x = () => {
//     console.log("callback function");
// };
// nitin(x);
// function nitin(callback) {
//     console.log("hii kashmir");  
//     console.log(callback);       
//     callback();                  
// }

// nitin(() => {
//     console.log("callback function");
// });
// function student(name) {
// function greet(teacher) {
// console.log(`hello ${teacher}, I am ${name}.`);
// }
// greet("Mudity Sir");
// }

// student("Ankit");

function teacherResponse(teacherName) {
    console.log(`${teacherName} says: Hello, nice to see you!`);
}
const student = {
    name: "Ankit",
    greet: function(teacherName, callback) {
        console.log(`${this.name} says: Hello ${teacherName}!`);
        callback(teacherName); 
    }
};

student.greet("Nitin Sir", teacherResponse);