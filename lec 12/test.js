console.log("arjun")
console.log("ridhika")
setTimeout(()=>{
    console.log("ankit")
    console.log("aniket")
},0)
console.log("Deepak")
fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then((data) => {
    console.log(data);
    let head=document.getElementsByTagName("h1")
    head[0].innerHTML=data[1].name;
})
