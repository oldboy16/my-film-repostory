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

let saveLocData = []
if(window.localStorage.getItem('saveData')){
    saveLocData = JSON.parse(window.localStorage.getItem('saveData'))
}

console.log(saveLocData.includes('jwD04NsnLLg'));
fnRender(partMovies)
function fnRender(data){
    elMovlist.innerHTML = ''
    data.forEach((a,index)=>{
        let newLi = document.createElement('li')
        newLi.innerHTML = `
        <div class="hero__card">
          <img class="hero__img" src="https://i.ytimg.com/vi/${a.ytid}/hqdefault.jpg" class="card-img-top" alt="...">
          <h5 class="card__title">${a.Title}</h5>
          <p>${a.Categories}</p>
          <p class="card__year">${a.movie_year}-year</p>
          <p class="card__rate">${a.imdb_rating} ⭐</p>
        <div class="d-flex justify-content-between align-items-center color-white">
            <a href="https://www.youtube.com/watch?v=${a.ytid}" 
            class="btn btn-warning">Watch movie</a>
            <i onclick="setFavourite('${a.ytid}')" 
            class="${JSON.parse(window.localStorage.getItem('saveData'))?.find(k=> k.ytid == a.ytid)? 'bi bi-heart-fill': 'bi bi-heart'}"></i>
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

let saveData = []
function setFavourite(id){
    if(window.localStorage.getItem('saveData')){
        saveData = JSON.parse(window.localStorage.getItem('saveData'))
    }
    if(saveData.find(k=> k.ytid == id)){
        window.localStorage.setItem('saveData', JSON.stringify(saveData.filter(item=> item.ytid != id)))
    }else{
        saveData.push(partMovies.find(k=> k.ytid == id))
        window.localStorage.setItem('saveData', JSON.stringify(saveData))
    }
    console.log(partMovies.find(k=> k.ytid == id));
    fnRender(partMovies)
}


function fnMapLoc(){
    let data = JSON.parse(window.localStorage.getItem('saveData'))
    data.map((item)=>{
        elOfclist.innerHTML = ''
        let newLi = document.createElement('li')
        newLi.style.height = '40px'
        newLi.innerHTML = `
        <a href="https://www.youtube.com/watch?v=${item.ytid}" target="_blank" class="a__off d-flex justify-content-between align-items-center w-100 h-100 border">
        <img class="h-100" src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg" alt="">
        <h3 class="pe-4">${item.Title.toString().slice(0,10)}</h3>
       </a> 
        `
        elOfclist.appendChild(newLi)
    })
}

