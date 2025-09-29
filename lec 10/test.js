console.log(document)
console.log(document.head)
console.log(document.body)
document.body.style.color="red";
let ans = document.getElementsByTagName("h1");
console.log(ans);
ans[0].style.color="blue";
ans[1].style.backgroundColor="aqua";
ans[2].style.border="5px solid black";
for(let i=0;i<ans.length;i++){
    ans[i].style.color="black";
}
console.log(ans);
let ans=document.getElementsByClassName("singer");
console.log(ans);
ans[0].innerHTML="sonu nigam";
ans[1].style.color="green";


let ans=document.getElementById("rbu");
console.log(ans);
ans.style.backgroundColor="green";

ans.innerHTML="cohort a and b sudhar jao";