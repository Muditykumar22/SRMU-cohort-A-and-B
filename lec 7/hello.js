// let x ={
//     "full Name": "Ankit",
//     id:123456,
//     age: 20,
//     address: {
//         street:"123mainroad",
//         city:"kharar",
//         state:"chandigardh",
//         zip:240612,
//         country:"INDIA"
//     }
// }
// console.log(x["address"]["city"]);
// var x = 90;
//         {let x=94;
//             console.log(x);
//             {
//                 console.log(x);
//                 let x = 91;
//                 console.log(x);
//             }
//             console.log(x);
//         }
//         console.log(x);
// let x=90;
// console.log(x);//90
// {
//     console.log(x);//90
//     let x=20;//error
//     console.log(x);//print ni krega
// }
// var a = 10;
// {
//     var a = 20;
//     console.log(a);
// }
// console.log(a);
// var x = 5;
// let y = 6;
// {
//     var x = 15;
//     y = 16;
//     {
//         console.log(x, y);
//         var x = 25;
//         y = 26;
//         console.log(x, y);
//     }
//     console.log(x, y);
// }
// console.log(x, y);
var m = 100;
{
    let m =200;
    console.log(m);

    {

        const m = 300;
        console.log(m);
    }
    console.log(m);
}
console.log(m);
