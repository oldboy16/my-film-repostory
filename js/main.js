let elCanvas = document.querySelector(".off__canvas");
let elShadow = document.querySelector(".shadow");
let elOfclist = document.querySelector('.offcanvas__list')

function openCanvas() {
  elCanvas.classList.add("open__off");
  elShadow.style.display = "block";
}
function closeCanvas() {
  elCanvas.classList.remove("open__off");
  elShadow.style.display = "none";
}

let elHeader = document.querySelector(".header");
window.addEventListener("scroll", (a) => {
  let val = Math.floor(window.scrollY);
  if (val >= 580) {
    elHeader.style.boxShadow = `0px 0px 50px 0px black`;
  } else {
    elHeader.style.boxShadow = `0px 0px 0px 0px black`;
  }
});



const partMovies = movies.slice(0,51)
const elMovlist = document.querySelector('.movies__list')



fnRender(partMovies)
function fnRender(data){
    elMovlist.innerHTML = ''
    data.forEach((a,index)=>{
        let newLi = document.createElement('li')
        newLi.innerHTML = `
        <div>
        <div class="hero__card">
          <img class="hero__img" src="https://i.ytimg.com/vi/${a.ytid}/hqdefault.jpg" class="card-img-top" alt="...">
          <h5 class="card__title">${a.Title}</h5>
          <p>${a.Categories}</p>
          <p class="card__year">${a.movie_year}-year</p>
          <p class="card__rate">${a.imdb_rating} ⭐</p>
        <div class="d-flex justify-content-between align-items-center color-white">
            <button onclick = "setId('${a.ytid}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">more<i class="bi bi-arrow-right"></i></button>
            <i onclick="setFavourite('${a.ytid}')" class="${JSON.parse(window.localStorage.getItem('saveData'))?.find(k=> k.ytid == a.ytid)? 'bi bi-heart-fill heart__fill': 'bi bi-heart heart__fill'}"></i>
        </div>
    </div>
    </div>
        `
        elMovlist.appendChild(newLi)
    })
}

//YEAR
function fnYear(value){
    if(value == 'new'){
        fnRender(partMovies.sort((a,b)=> b.movie_year - a.movie_year))
    }else{
        fnRender(partMovies.sort((a,b)=> a.movie_year - b.movie_year))
    }
}

//RANTING
function fnRanting(value){
    if(value == 'max'){
        fnRender(partMovies.sort((a,b)=> b.imdb_rating - a.imdb_rating))
    }else{
        fnRender(partMovies.sort((a,b)=> a.imdb_rating - b.imdb_rating))
    }
}

//CATEGORIES

const elSel = document.querySelector('.sel__category')
const arrCategory = []

partMovies.forEach((item)=>{
    if(!arrCategory.includes(item.Categories)){
        arrCategory.push(item.Categories)
    }
})

arrCategory.forEach((item)=>{
    let newOption = document.createElement('option')
    newOption.textContent = item
    elSel.appendChild(newOption)
})

function fnCategory(value){
    fnRender(partMovies.filter((item)=> item.Categories == value))
}


//Search
function fnSearch(event){
    let val = event.target.search.value 
    event.preventDefault()
    fnRender(partMovies.filter((item)=> item.Title.toString().toLowerCase().includes(val.toLowerCase())))
}

//PAGENATION
const elPagenation = document.querySelectorAll('.page__link')
function fnPagenation(count){
    fnRender(partMovies.slice((count-1)*10, count *10))
}

//HEART
let saveData = []

function setFavourite(id){
    if(window.localStorage.getItem('saveData')){
        saveData = JSON.parse(window.localStorage.getItem('saveData'))
    }

    if(saveData.find(k=> k.ytid == id)){
        window.localStorage.setItem('saveData', 
        JSON.stringify(saveData.filter(item=> item.ytid != id)))
    }else{
        saveData.push(partMovies.find(k=> k.ytid == id))
        window.localStorage.setItem('saveData', JSON.stringify(saveData))
    }
    console.log(partMovies.find(k=> k.ytid == id));
    fnRender(partMovies)
}

//OFFCANVAS
function fnMapLoc(){
    elOfclist.innerHTML = ''
    let data = JSON.parse(window.localStorage.getItem('saveData'))
    data.map((item)=>{
        let newLi = document.createElement('li')
        newLi.style.height = '40px'
        newLi.innerHTML = `
        <a href="https://www.youtube.com/watch?v=${item.ytid}" target="_blank" class="a__off d-flex justify-content-between align-items-center w-100 h-100 border">
            <img class="h-100" src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg" alt="">
            <h3 class="pe-3">${item.Title.toString().slice(0,10)}</h3>
        </a>
        `
        elOfclist.appendChild(newLi)
    })
}

//MODAL

let elModContent = document.querySelector('.modal-content')

function setId(id){
    let item = partMovies.find((i)=> i.ytid == id)
    elModContent.innerHTML = `
    <div class="modal-header">
    <h2 class="modal-title fs-5" id="exampleModalLabel">${item.Title}</h2>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
  <iframe width="100%" height="300" src="https://www.youtube.com/embed/${item.ytid}" title="${item.Title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    <h2>${item.Categories}</h2>
    <p>${item.summary}</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <a href="https://www.youtube.com/watch?v=${item.ytid}" target="_blank" class="btn btn-primary">watch movie</a>
  </div>
    `
}