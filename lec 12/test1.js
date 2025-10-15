// function fetchData(callback){
//     // callback = function(result){
//     //     return result
//     // }
//     console.log("Hello Ma'am")
//     setTimeout(()=> {
//         callback(10);
//         console.log(callback);
//         callback(function(x){
//             console.log("hello Data")
//         })
//     })
// }
// fetchData(function(result){
//     console.log(result);
// });
// asyncFunc1((result)=>{
//     asyncFunc2(result1, (result2)=>{
//         asyncFunc3(result2, (result3)=>{
//             console.log("hello")
//         })
//     })
// })
const promise = new Promise((resolve, reject)=>{
    let success = true; 
    if(success)
        resolve("success");
    else{
        reject("error");
    }
});
promise
.then((data)=> {
    console.log(data);
})
    .catch((err) => console.error(err));

console.log(promise);           
console.log(typeof promise);     
let x = new Promise((resolve, reject)=>{
    setTimeout(() => {
        let ans = 75;
        resolve(ans);
    }, 3000);
});

x.then((roll) => {
    console.log(roll);
    let head = document.getElementsByTagName("h1");
    if (head.length > 0) {
        head[0].innerHTML = roll;   // Will change <h1> text if present
    }
})
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("session completed");
    });


let a = new Promise((resolve, reject) => {
    setTimeout(() => {
        let ans = 75;
        resolve(ans);
    }, 3000);
});

let b = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise B done");
    }, 2000);
});

let c = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Promise C failed");
    }, 1000);
});
Promise.all([a, b])
    .then((values) => {
        console.log("Promise.all resolved:", values);
    })
    .catch((error) => {
        console.log("Promise.all rejected:", error);
    });
Promise.any([a, c])
    .then((firstResolved) => {
        console.log("Promise.any resolved first:", firstResolved);
    })
    .catch((error) => {
        console.log("Promise.any rejected:", error);
    });
Promise.race([a, b, c])
    .then((firstCompleted) => {
        console.log("Promise.race completed first:", firstCompleted);
    })
    .catch((error) => {
        console.log("Promise.race rejected first:", error);
    });