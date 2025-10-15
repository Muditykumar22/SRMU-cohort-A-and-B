function dommanipulation(data){
    let main = document.getElementsByTagName("main")[0];
    data.map((Element)=>{
        let a =`
        <div>
        <p>ID=${Element.userId}</p>
        <p>name=${Element.id}</p>
        <p>title=${Element.title}</p>
        <p>email=${Element.completed}</p>
        </div>`;
        console.log(a);
        let section = document.createElement("section");
        section.innerHTML=a;
        main.appendChild(section);

    })

}
async function getData(){
    try{
        let response = await fetch("https://jsonplaceholder.typicode.com/todos");
        let data = await response.json();
        console.log(data);
        dommanipulation(data);
    }
    catch (error){
        console.log("something went wrong")

    }
}