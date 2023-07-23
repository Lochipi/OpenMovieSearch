const inputSearch = document.querySelector(".search-container input");
const button = document.querySelector('.search-container button');
const movieList = document.getElementById("movie-lists");

function fetchMovies(title) {
    fetch(`http://www.omdbapi.com/?s=${title}&apikey=1a7c33d6`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let dataMovies = data.Search
            for (let movie of dataMovies) {
                let movieId = movie.imdbID
                collectMovies(movieId)
            }
        })
        .catch(error => {
            console.log("This is an error message", error);
        });
}


function collectMovies(movieId) {
    fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=1a7c33d6`)
        .then(response => response.json())
        .then(data => {
            movieList.innerHTML += `
            <div class="movie-lists">
                <div class="movie-img">
                    <img src="${data.Poster}" alt="${data.Title}" />
                </div>
                <div class="desc">
                    <h2>${data.Title}<span>🌟 ${data.imdbRating}</span></h2>
                    <div class="movie-desc">
                        <p>${data.Runtime}</p>
                        <p>${data.Genre}</p>
                        <button><i class="fa-solid fa-circle-plus"></i> WatchList</button>
                    </div>
                    <div>
                        <p><span class="actors">Cast: </span> ${data.Actors}</p>
                        <p><span class="director">Director: </span>${data.Director}</p>
                        <p>${data.Plot}</p>
                    </div>
                </div>
            </div>
            <hr />
            `;
        })
        .catch(error => {
            console.log("This is an error message", error);
        });
}

collectMovies()

button.addEventListener("click", function () {
    fetchMovies(inputSearch.value);
});

