// let x = 90;
//         {
//             let x=9;
//             console.log(x);
//             {
//                 let x = 20;
//                 console.log(x);
//                 x = 91;
//                 console.log(x);


//             }
//             console.log(x);
//         }
//         console.log(x);
// let x=34;
//         if(x%2==0){
//             console.log("even No");
//         }
//         else{
//             console.log("odd no");
            
//         }
//    for(let i=0;i<100;i++){
//             let x = i%2==0;
//             console.log(x);
            
//         }
// for (let i = 2; i <= 100; i += 2) {
// console.log(i);
// }
// // 
// function fact(n){
//     if(n==0){
//         return 1;
//     }
//     return n*fact(n-1);
// }
// let ans = fact(12);
// console.log(ans);

//assignment - ARMSTRONG
// let num = 153;
// let str = num + "";
// let n = str.length;
// let sum = 0;

// for (let d of str) {
//   sum += d ** n;
// }

// if (sum === num) {
//   console.log(num + " is an Armstrong number");
// } else {
//   console.log(num + " is NOT an Armstrong number");
// }
// function checkAndPrintArmstrong(num) {
// const numAsString = String(num);
// const numberOfDigits = numAsString.length;
// let sum = 0;

// for (let i = 0; i < numAsString.length; i++) {
// const digit = Number(numAsString[i]);
// sum += Math.pow(digit, numberOfDigits);
// }

// if (sum === num) {
// console.log(`${num} is an Armstrong number.`);
// }
// else{
// console.log(`${num} is not an Armstrong number.`);
// }
// }

//ananomus function
// checkAndPrintArmstrong(153); 
// checkAndPrintArmstrong(371); 
// checkAndPrintArmstrong(123);

// let x = 30;
// x= true;
// x= "aniket"
// x = function add(a,b,c){
//     console.log("adding")
//     let sum = a+b+c;
//     return sum;
// }
// let ans = x(2,3,4);

// console.log(ans)
let add = (a,b)=>{
    return a+b
}
let ans = add(3,4);
console.log(ans)
console.log(typeof(add))
console.log(add);
