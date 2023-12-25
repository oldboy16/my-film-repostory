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
    if (val >= 20) {
        elHeader.style.boxShadow = `0px 0px 10px 0px black`
    }
})

// let partMovies = movies.slice(0, 21)  // slice ma'lumotni qirqib beradi
// let elMovlist = document.querySelector(".movies__list")

// partMovies.forEach((item) => {
//     console.log(item);
//     let newli = document.createElement("li")
//     newli.innerHTML = `
//     <div class="card card__item" style="width: 18rem;">
//     <img src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg?" class="card-img-top" alt="...">
//     <div class="card-body bg-black">
//       <h5 class="card-title">${item.Title}</h5>
//       <p class="card-text">${item.Categories}
//       <p class="card-text">${item.movie_year}</p>
//       <p class="card-text">${item.imdb_rating}</p>
//       <a href="https://www.youtube.com/watch?v=${item.ytid}" class="btn btn-success target="_blank">Watch movie</a>
//     </div>
//     </div>
//     `
//     elMovlist.appendChild(newli)
// });


let partMovies = movies.slice(0,21)
let elMovlist = document.querySelector(".movies__list")


partMovies.forEach((item) => {
    let newli = document.createElement("li")
    newli.innerHTML = `
    <div class="hero__card">
    <img class="hero__img" src="https://i.ytimg.com/vi/${item.ytid}/hqdefault.jpg?" class="card-img-top" alt="...">
    <p>${item.Categories}</p>
    <h5 class="card__title">${item.Title}</h5>
    <p class="card__year">${item.movie_year}-year</p>
    <p class="card__rate">${item.imdb_rating}</p>
    <a href="https://www.youtube.com/watch?v=${item.ytid}" class="btn btn-success target="_blank">Watch movie</a>
</div>
    `
    elMovlist.appendChild(newli)
});