console.log("hello");
let heading =  document.getElementsByTagName("h1")
var i= 0;
// function display(){
//     console.log("hii")
//     i++;
//     console.log(i);
//     heading[0].innerHTML =i;
//     let div = document.getElementsByTagName("div");
//     div[0].classList.toggle("green");
// }
let btn=document.getElementsByTagName("button");
var i = 0; 
btn[0].addEventListener("click", (e)=>{
    let div = document.getElementsByTagName("div");
    div[0].classList.toggle("green");
let heading = document.getElementsByTagName("h1");
i++;
heading[0].innerHTML=i;
})
function display(){
    let input = document.getElementsByTagName("input");
    let heading= document.getElementsByTagName("h1");
    heading[0].innerHTML=input[0].value;
}