// console.log("hello");
// console.log(window);
// window.alert("thank you");
// alert("hii everyone");
var a=90;
console.log(a)
console.log(window.a)
console.log(window)

let profile = {
    "name": "saurabh",
    "age": 20,
    "display": function display() {
        console.log("hello 1");
        console.log("hello 2");
    },
    "status": "mingle",
    "address": {
        "state": "bihar",
        "dist": "patna",
        "pincide": 292398,
        "village": "kharar"
    }
}
console.log(profile.display);
profile.display();