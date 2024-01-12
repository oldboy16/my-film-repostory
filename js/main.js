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
window.addEventListener("scroll", (a) => {
    let val = Math.floor(window.scrollY)
    if (val >= 580) {
        elHeader.style.boxShadow = `0px 0px 50px 0px black`
    }else{
        elHeader.style.boxShadow = `0px 0px 0px 0px black`
    }
})




let partMovies = movies.slice(0,51)
let elMovlist = document.querySelector(".movies__list")

fnRender(partMovies)
function fnRender(data){
    elMovlist.innerHTML = ''
    data.forEach((a)=>{
        let newLi = document.createElement("li")
        newLi.innerHTML = `
        <div class="hero__card">
                <img class="hero__img" src="https://i.ytimg.com/vi/${a.ytid}/hqdefault.jpg" class="card-img-top" alt="...">
                <h5 class="card__title">${a.Title}</h5>
                <p>${a.Categories}</p>
                <p class="card__year">${a.movie_year}-year</p>
                <p class="card__rate">${a.imdb_rating} ⭐</p>
                <a href="https://www.youtube.com/watch?v=${a.ytid}" class="btn btn-warning">Watch movie</a>
            </div>
        `
        elMovlist.appendChild(newLi)
    })
}



function fnYear(value){
    if(value == 'new'){
        fnRender(partMovies.sort((a,b)=> b.movie_year - a.movie_year))
    }else if(value == 'old'){
        fnRender(partMovies.sort((a,b)=> a.movie_year - b.movie_year))
    }
}


function fnRanting(value){
    if(value == 'max'){
        fnRender(partMovies.sort((a,b)=> b.imdb_rating - a.imdb_rating))
    }else if(value == 'min'){
        fnRender(partMovies.sort((a,b)=> a.imdb_rating - b.imdb_rating))
    }
}



let elSel = document.querySelector(".sel__category")
let arrCategory = []
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


function fnSearch(event){
    let val = event.target.search.value 
    event.preventDefault()
   fnRender(partMovies.filter((item)=> item.Title.toString().toLowerCase().includes(val.toLowerCase())))
}
function fnReset(value){
    if(value == ''){
        fnRender(partMovies)
    }
}

function fnPagenation(count){
    fnRender(partMovies.slice((count-1)*10), count*10)
}