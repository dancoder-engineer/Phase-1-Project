leftPage = 1
rightPage = 1

function init() {
    getData(leftPage, populateLeft)
    getData(rightPage, populateRight)
    
}


function getData(page, func) {
    let url = `https://rickandmortyapi.com/api/character/?page=${page}`
    fetch(url)
    .then ( res => res.json() )
    .then ( data => func(data) )
}

function populateLeft(data) {
    let left = document.getElementById("leftSelect")
    left.innerHTML = ""
    let num = 0
    for (i of data.results) { 
        num++
        //console.log(i.name)
        let choice = `<option value=${num}>${i.name}</option>`
        left.innerHTML += choice
       
     }
     changeFighter(0)
    //left.innerHTML = ""
}

function populateRight(data) {
    let right = document.getElementById("rightSelect")
    right.innerHTML = ""
    let num = 0
    for (i of data.results) { 
        num++
        let choice = `<option value=${num}>${i.name}</option>`
        right.innerHTML += choice
     }
     changeFighter(1)
}

function changeFighter(dir) {
    let elem
    let url
    let dropDown

    document.getElementById("leftP").innerText = leftPage
    document.getElementById("rightP").innerText = rightPage

    if (dir === 0) { 
        dropDown =  document.getElementById("leftSelect")
        elem = document.querySelector("#leftImg")
        let chrNo = (leftPage - 1) * 20 + parseInt(dropDown.value)
        console.log(parseInt(dropDown.value))
        url =  `https://rickandmortyapi.com/api/character/${chrNo}` }

    if (dir === 1) { 
        dropDown =  document.getElementById("rightSelect")
        elem = document.querySelector("#rightImg")
        let chrNo = (rightPage - 1) * 20 + parseInt(dropDown.value)
        url =  `https://rickandmortyapi.com/api/character/${chrNo}` }

    fetch(url)
    .then ( res => res.json() )
    .then ( data => elem.src = data.image ) //data => console.log(data)




}

document.addEventListener("DOMContentLoaded", init)
document.querySelector("#leftSelect").addEventListener("click", function() { changeFighter(0) })
document.querySelector("#rightSelect").addEventListener("click", function() { changeFighter(1) })


document.querySelector("#leftBack").addEventListener("click", function() {  
    leftPage -= 1
    if (leftPage === 0) { leftPage = 1 }
    getData(leftPage, populateLeft)
 })

document.querySelector("#leftForward").addEventListener("click", function() { 
    leftPage += 1
    if (leftPage === 35) { leftPage = 34 }
    getData(leftPage, populateLeft)
 })


document.querySelector("#rightBack").addEventListener("click", function() {     
    rightPage -= 1
    if (rightPage === 0) { rightPage = 1 }
    getData(rightPage, populateRight)
 })

document.querySelector("#rightForward").addEventListener("click", function() {     
    rightPage += 1
    if (rightPage === 35) { rightPage = 34 }
    getData(rightPage, populateRight)
 })
