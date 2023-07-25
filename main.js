const inputSearch = document.querySelector(".search-container input");
const button = document.querySelector('.search-container button');
const movieList = document.getElementById("movie-lists");

function fetchMovies(title) {
    fetch(`http://www.omdbapi.com/?s=${title}&apikey=1a7c33d6`)
        .then(response => response.json())
        .then(data => {
            let dataMovies = data.Search
            for (let movie of dataMovies) {
                let movieId = movie.imdbID
                moviesCollection(movieId)
            }
        })
        .catch(error => {
            movieList.innerHTML = `<h2>Something went wrong, Please try refreshing the page<h2/>`
        });
}


function moviesCollection(movieId) {
    fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=1a7c33d6`)
        .then(response => response.json())
        .then(data => {
            // const { Poster, Title, imdbRating, imdbID, Genre, Runtime, Plot } = data;
             
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
                        <button id="${data.imdbID}"><i class="fa-solid fa-circle-plus"></i> WatchList</button>
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

            // function addToWatchlist(movieId) {
            //     const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
                
            //     // Check if the movie is already in the watchlist
            //     const movieInWatchlist = watchlist.find(item => item.imdbID === movieId);
                
            //     if (!movieInWatchlist) {
            //       watchlist.push({ imdbID: movieId });
            //       localStorage.setItem('watchlist', JSON.stringify(watchlist));
            //       alert("Added to Watchlist!");
            //     } else {
            //       alert("This movie is already in your Watchlist.");
            //     }
            //   }

        })
        .catch(error => {
            console.log("This is an error message", error);
        });
}

// moviesCollection()

button.addEventListener("click", function () {
    fetchMovies(inputSearch.value);
    inputSearch.value = "";
});
