fetch("https://jsonplaceholder.typicode.com/todos/1")
.then((response)=>{
    console.log(response);
    return response.json();
})
.then((data)=> {
    console.log(data);
    let para=document.getElementsByTagName("p");
    para[0].innerHTML=data.userId;
    para[1].innerHTML=data.id;
    para[2].innerHTML=data.title;
    para[3].innerHTML=data.completed;
})
.catch((error)=>{
    console.log("network problem")
})