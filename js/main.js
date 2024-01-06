let elCanvas = document.querySelector(".off__canvas")
let elShadow = document.querySelector(".shadow")
function openCanvas() {
    elCanvas.classList.add("open__off")
    elShadow.style.display = "block"
}
function closeCanvas() {
    elCanvas.classList.remove("open__off")
    elShadow.style.display = "none"
}

let elHeader = document.querySelector(".header")
window.addEventListener("scrollY", (a) => {
    let val = Math.floor(window.scrollY)
    if (val >= 90) {
        elHeader.style.boxShadow = `0px 0px 100px 0px black`
    }else{
        elHeader.style.boxShadow = `0px 0px 0px 0px black`
    }
    console.log(val);
})


let partMovies = movies.slice(0,21)    //slice ni vazifasi qirqib olish
let elMovlist = document.querySelector(".movies__list")

fnRender(partMovies)
function fnRender(data){
    elMovlist.innerHTML = ''
    data.forEach((item) => {
        let newli = document.createElement("li")
        newli.innerHTML = `
        <div class="hero__card">
        <img class="hero__img" src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg?" class="card-img-top" alt="...">
        <h5 class="card__title">${item.Title}</h5>
        <p>${item.Categories}</p>
        <p class="card__year">${item.movie_year}-year</p>
        <p class="card__rate">${item.imdb_rating} ⭐</p>
        <a href="https://www.youtube.com/watch?v=${item.ytid}" class="btn btn-warning target="_blank">Watch movie</a>
    </div>
        `
        elMovlist.appendChild(newli)
    });
}

function fnYear(value){
    if(value == "new"){
        fnRender(partMovies.sort((a,b)=> b.movie_year - a.movie_year));
    }else if(value == "old"){
        fnRender(partMovies.sort((a,b)=> a.movie_year - b.movie_year));
    }
}

function fnRanting(value){
    if(value == "max"){
        fnRender(partMovies.sort((a,b)=> b.imdb_rating - a.imdb_rating));
    }else if(value == "min"){
        fnRender(partMovies.sort((a,b)=> a.imdb_rating - b.imdb_rating));
    }
}

let elSel = document.querySelector(".select__category")

let arrCategory = []
partMovies.forEach((item)=>{
    if(!arrCategory.includes(item.Categories)){
        arrCategory.push(item.Categories)
    }
})

arrCategory.forEach((item)=>{
    let newOption = document.createElement("option")
    newOption.textContent = item
    elSel.appendChild(newOption)
})

function fnCategory(value){
    fnRender(partMovies.filter((item)=> item.Categories == value));
}