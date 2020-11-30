const input_text = document.querySelector("#Addnew")
const list = document.getElementById("List")

let Value, id
let data = localStorage.getItem("ITEMS")
if (data) {
    Value = JSON.parse(data)
    id = Value.length;
    showList(Value)
}
else {
    Value = []
    id = 0
}
function showList(Value) {
    Value.forEach(function (item) {
        Adding(item.task, item.id, item.deleted)
    })
}
//console.log(data)

function Adding(info, id, deleted) {
    if (deleted) {
        return
    }
    const item = `
    <li class = "item mb-3"> 
     <input class = "border-top-0 border-right-0 border-left-0 border-info bg-white  " type ="text" id ="s${id}" placeholder ="${info}" disabled>
        <button class = "rounded-circle p-3 bg-danger font-weight-bold text-white" type = "button" job = "delete" id= "${id}">Delete</button>
        <button class = "rounded-circle p-3 bg-success font-weight-bold text-white" type = "button" job = "update" id= "${id}">Update</button> 
    </li>
    `
    list.insertAdjacentHTML("beforeend", item)

}

function Add() {
    let value = input_text.value
    if (value) {
        Adding(input_text.value, id, false)
    }
    Value.push({ id: id, task: value, deleted: false })
    localStorage.setItem("ITEMS", JSON.stringify(Value))
    id++
    input_text.value = ""
}
function Del(child) {

    child.parentNode.parentNode.removeChild(child.parentNode)

    Value[child.id].deleted = true
}

let change = false
function Update(child) {
    let a = document.querySelector("#s" + child.id)
    if (change == false) {
        change = true
        a.disabled = false;
        a.placeholder = ""
    }
    else{
        
        Value[child.id].task = a.value
        change = false
        a.disabled = true
        console.log(Value)
    }
}

list.addEventListener("click", function (ToDo) {
    const child = ToDo.target
    const job = child.attributes.job.value;
    
    if (job == "delete") {
        Del(child)
    }
    else {
        Update(child)
    }

    localStorage.setItem("ITEMS", JSON.stringify(Value))
})
function Del_all() {
    document.getElementById("List").innerHTML = ""
    id = 0
    Value = []
    localStorage.clear()
}

