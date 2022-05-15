const mainContainer = document.querySelector(".main-container");

// Get favorite from localStorage
const getFavorite = () => {
  const favorite = localStorage.getItem("favorite");
  if (favorite) {
    const favoriteData = JSON.parse(favorite);
    console.log(favoriteData);
    mainContainer.innerHTML = "";
    favoriteData.map((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("col-md-4");
      movieElement.innerHTML = `
      <div class="card my-2">
        <img style="height: 500px" src="${movie.Poster}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${movie.Year}</h6>
          <p class="pointer" onclick="navigatePage('${movie.imdbID}')">See Detail</p>
        </div>
      </div>
      `;
      mainContainer.appendChild(movieElement);
    });
  } else {
    mainContainer.innerHTML = `<p>No favorite found</p>`;
  }
};

getFavorite();


// Navigate to detail page

const navigatePage = (id) => {
  //  Navigate page window
  window.location.href = `movie.html?id=${id}`;
};
