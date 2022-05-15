// Main

const mainContainer = document.querySelector("#list-movie");
const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");

searchInput.addEventListener("keyup", function (e) {
  if (e.which === 13) {
    searchMovies();
  }
});

searchButton.addEventListener("click", function () {
  if (searchInput.value === "") {
    return alert("Please enter a movie name");
  }
  searchMovies();
});

async function searchMovies() {
  mainContainer.innerHTML = `<p>Loading...</p>`;
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=bd3bc37a&s=${searchInput.value}`
  );
  const data = await response.json();
  console.log(data);
  if (data.Response === "True") {
    mainContainer.innerHTML = "";
    data.Search.map((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("col-md-4");
      movieElement.innerHTML = `
      <div class="card my-2">
        <img src="${movie.Poster}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
          <p class="pointer btn btn-primary" onclick="navigatePage('${movie.imdbID}')">See Detail</p>
        </div>
      </div>
      `;
      mainContainer.appendChild(movieElement);
    });
  } else {
    mainContainer.innerHTML = `
    <div class="col">
      <h1 class="text-center">${data.Error}</h1>
    </div>
    `;
  }
}


// Navigate to detail page
const navigatePage = (id) => {
  //  Navigate page window
  window.location.href = `movie.html?id=${id}`;
};
