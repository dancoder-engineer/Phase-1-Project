let leftPage = 1
let rightPage = 1
let round = 0
let leftChar
let rightChar
let lChrNo 
let rChrNo 
let howChosen = [0,0,"", ""]

function init() {
    placeFightButton()
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

function changeFighter(dir, url="no") {
    let elem
    let dropDown
    let chrNo

    leftChar = document.querySelector("#leftSelect").value
    rightChar = document.querySelector("#rightSelect").value

    document.getElementById("leftP").innerText = `Pg. ${leftPage}`
    document.getElementById("rightP").innerText = `Pg. ${rightPage}`

    
    
    if (dir === 0) { 
        dropDown =  document.getElementById("leftSelect")
        elem = document.querySelector("#leftImg")
        chrNo = (leftPage - 1) * 20 + parseInt(dropDown.value)
        lChrNo = chrNo 
    }

    if (dir === 1) { 
        dropDown =  document.getElementById("rightSelect")
        elem = document.querySelector("#rightImg")
        chrNo = (rightPage - 1) * 20 + parseInt(dropDown.value)
        rChrNo = chrNo}

   if (url === "no") { url =  `https://rickandmortyapi.com/api/character/${chrNo}` }
    fetch(url)
    .then ( res => res.json() )
    .then ( data => elem.src = data.image ) //data => console.log(data)

    




}



function fight() {
    let lPic = document.querySelector("#leftImg")
    let rPic = document.querySelector("#rightImg")
    let lPos = 0
    let rPos = 0
    let cloudSize = 82
    let cloud = document.querySelector("#cloud")
    let moved = 0
    
    document.querySelector("#leftSelect").disabled = true
    document.querySelector("#rightSelect").disabled = true

    document.querySelector("#leftBack").disabled = true
    document.querySelector("#leftForward").disabled = true
    document.querySelector("#rightBack").disabled = true
    document.querySelector("#rightForward").disabled = true
    
    let inter = setInterval(() => move(), 75);
  

    function move() {
        lPos += 10
        rPos -= 10
        lPic.style.left=`${lPos}px`
        rPic.style.left=`${rPos}px`
        moved++

        if (moved === 20) {
            cloud.width = `${cloudSize}`
            cloud.height = `${cloudSize}`
            cloud.src="cloud.jpg"
        }

        if (moved > 20) {
            cloudSize += 41
            cloud.width = `${cloudSize}`
            cloud.height = `${cloudSize}`
        }

        if (moved === 35) { 
            lPic.style.left=`0px`
            rPic.style.left=`0px`
            cloud.width = `0`
            cloud.height = `0`
            clearTimeout(inter) 
            finishFight()
        }

    }
}

function finishFight() {
    let left = 0
    let right = 0
    let winner
    let res = document.querySelector("#results") 

    while (left === right) {
        left = Math.floor(Math.random() * 10 )
        right = Math.floor(Math.random() * 10 )
    }
    round++

    if (left > right) {winner = getNames()[0] }
    else {winner = getNames()[1] }

    
    res.innerHTML += `<p>Round ${round}: <span class="lSpan" id="l${lChrNo}">${getNames()[0]}</span> vs. <span class="rSpan" id="r${rChrNo}">${getNames()[1]}</span><br> Winner: ${winner}!`

 

    document.querySelector("#leftSelect").disabled = false
    document.querySelector("#rightSelect").disabled = false
    document.querySelector("#leftBack").disabled = false
    document.querySelector("#leftForward").disabled = false
    document.querySelector("#rightBack").disabled = false
    document.querySelector("#rightForward").disabled = false

    let span1 = document.querySelectorAll(`.lSpan`)
    let span2 = document.querySelectorAll(`.rSpan`)
    //console.log(span1)
    for (i of span1) {

    i.addEventListener("click", function(e) {
       howChosen[0] = 1
       let url = `https://rickandmortyapi.com/api/character/${e.target.id.slice(1,)}`
        howChosen[2] = e.target.innerText
         changeFighter(0, url)
    }) }

    for (i of span2) {
        i.addEventListener("click", function(e) {
            howChosen[1] = 1
            let url = `https://rickandmortyapi.com/api/character/${e.target.id.slice(1,)}`
            howChosen[3] = e.target.innerText
          changeFighter(1,url)
        }) }




}


function getNames() {
    let left
    let right

    if(howChosen[0] === 0) { left = document.getElementById("leftSelect").children[leftChar-1].innerText }
    if(howChosen[0] === 1) { left = howChosen[2] }
    if(howChosen[1] === 0) { right = document.getElementById("rightSelect").children[rightChar-1].innerText }
    if(howChosen[1] === 1) { right = howChosen[3] }
    
    return [left, right]

}


function placeFightButton() {
    let butn = document.createElement("button")
    butn.id="fight"
    butn.className="centered"
    butn.innerText="Fight!"
    butn.addEventListener("click", fight)
    document.querySelector("#fightButton").appendChild(butn)


}




document.addEventListener("DOMContentLoaded", init)
document.querySelector("#leftSelect").addEventListener("change", function() { 
    howChosen[0] = 0
    changeFighter(0) })

document.querySelector("#rightSelect").addEventListener("change", function() { 
    howChosen[1] = 0
    changeFighter(1) })






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





 document.querySelector("#leftImg").addEventListener("click", fight)
