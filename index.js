let pages = {left: 1, right: 1}
let round = 0
let fighterID = {left: 1, right: 1}
let howFighterWasChosen = {leftMethod: 'optionBox', rightMethod: 'optionBox', leftFighterName: "", rightFightername: ""}
let firstPage = 1
let lastPage = 0 //It's actually 34, this will be added from the API itself in init()

function init() {

    fetch('https://rickandmortyapi.com/api/character/')
    .then ( res => res.json() )
    .then ( data => lastPage = data.info.pages )

    showFightButton(true)
    getData('left')
    getData('right')
    
}


function getData(side) {
    let url = `https://rickandmortyapi.com/api/character/?page=${pages[side]}`
    fetch(url)
    .then ( res => res.json() )
    .then ( data => populateFighter(side, data) )
}




function populateFighter(side, data) {
     elem = document.getElementById(`${side}Select`)
     elem.innerHTML = ""
    let num = 0
    for (i of data.results) { 
        num++
        let choice = `<option value=${num}>${i.name}</option>`
        elem.innerHTML += choice
     }

     changeFighter(side)
}





function changeFighter(side, url="no") {
    let elem
    let dropDown


    sideChar = document.querySelector(`#${side}Select`).value

    document.getElementById(`${side}P`).innerText = `Pg. ${pages[side]}`

    dropDown =  document.getElementById(`${side}Select`)
    elem = document.querySelector(`#${side}Img`)
    fighterID[side] = (pages[side] - 1) * 20 + parseInt(dropDown.value)
    
    

   if (url === "no") { url =  `https://rickandmortyapi.com/api/character/${fighterID[side]}` }
    fetch(url)
    .then ( res => res.json() )
    .then ( data => elem.src = data.image )

    




}



function fight() {
    let lPic = document.querySelector("#leftImg")
    let rPic = document.querySelector("#rightImg")
    let lPos = 0
    let rPos = 0
    let cloudSize = 82
    let cloud = document.querySelector("#cloud")
    let moved = 0
    
    
    toggleButtons()
    
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

    if (left > right) {winner = getNames()['left'] }
    else {winner = getNames()['right'] }

    
    res.innerHTML += `<p>Round ${round}: <span class="lSpan" id="l${fighterID['left']}">${getNames()['left']}</span> vs. <span class="rSpan" id="r${fighterID['right']}">${getNames()['right']}</span><br> Winner: ${winner}!`

 

    toggleButtons()

    let span1 = document.querySelectorAll(`.lSpan`)
    let span2 = document.querySelectorAll(`.rSpan`)
    //console.log(span1)
    for (i of span1) {

    i.addEventListener("click", function(e) {
       if (document.querySelector("#leftSelect").disabled === true) { return 1 }
       howFighterWasChosen['leftMethod'] = 'listenerAtBottom'
       let url = `https://rickandmortyapi.com/api/character/${e.target.id.slice(1,)}`
        howFighterWasChosen['leftFighterName'] = e.target.innerText
         changeFighter('left', url)
    }) }

    for (i of span2) {
        i.addEventListener("click", function(e) {
            if (document.querySelector("#leftSelect").disabled === true) { return 1 }
            howFighterWasChosen['rightMethod'] = 'listenerAtBottom'
            let url = `https://rickandmortyapi.com/api/character/${e.target.id.slice(1,)}`
            howFighterWasChosen['rightFightername'] = e.target.innerText
          changeFighter('right',url)
        }) }




}


function toggleButtons() {
    let truth = document.querySelector("#leftSelect").disabled
    truth = !truth
    document.querySelector("#leftSelect").disabled = truth
    document.querySelector("#rightSelect").disabled = truth
    document.querySelector("#leftBack").disabled = truth
    document.querySelector("#leftForward").disabled = truth
    document.querySelector("#rightBack").disabled = truth
    document.querySelector("#rightForward").disabled = truth

    showFightButton(!truth)
}


function getNames() {
    let ob = {left: "", right: ""}
    if(howFighterWasChosen['leftMethod'] === 'optionBox') { ob['left'] = document.getElementById("leftSelect").children[(fighterID['left']-1)%20].innerText }
    if(howFighterWasChosen['leftMethod'] === 'listenerAtBottom') { ob['left'] = howFighterWasChosen['leftFighterName'] }
    if(howFighterWasChosen['rightMethod'] === 'optionBox') { ob['right'] = document.getElementById("rightSelect").children[(fighterID['right']-1)%20].innerText }
    if(howFighterWasChosen['rightMethod'] === 'listenerAtBottom') { ob['right'] = howFighterWasChosen['rightFightername'] }
    return ob
}


function showFightButton(truth) {

    if (truth === true) {
    let butn = document.createElement("button")
    butn.id="fight"
    butn.className="centered"
    butn.innerText="Fight!"
    butn.addEventListener("click", fight)
    document.querySelector("#fightButton").appendChild(butn)
    }

    if (truth === false) { document.querySelector('#fight').remove() }


}




document.addEventListener("DOMContentLoaded", init)
document.querySelector("#leftSelect").addEventListener("change", function() { 
    howFighterWasChosen['leftMethod'] = 'optionBox'
    changeFighter('left') })

document.querySelector("#rightSelect").addEventListener("change", function() { 
    howFighterWasChosen['rightMethod'] = 'optionBox'
    changeFighter('right') })






document.querySelector("#leftBack").addEventListener("click", function() {  
    pages['left'] -= 1
    if (pages['left'] < firstPage) { pages['left'] = firstPage }
    getData('left')
 })

document.querySelector("#leftForward").addEventListener("click", function() { 
    pages['left'] += 1
    if (pages['left'] > lastPage) { pages['left'] = lastPage }
    getData('left')
 })


document.querySelector("#rightBack").addEventListener("click", function() {    
    pages['right'] -= 1
    if (pages['right'] < firstPage) { pages['right']  = firstPage}
    getData('right')
 })

document.querySelector("#rightForward").addEventListener("click", function() {   
    pages['right']  += 1
    if (pages['right'] > lastPage) { pages['right']  = lastPage }
    getData('right')
 })





 document.querySelector("#leftImg").addEventListener("click", fight)
