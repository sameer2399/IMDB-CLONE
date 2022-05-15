const mainContainer = document.querySelector(".main-container");

// Get url parameter from window.location
const urlParams = new URLSearchParams(window.location.search).get("id");

const getMovie = async () => {
  mainContainer.innerHTML += `<p>Loading...</p>`;
  const movie = await fetch(
    `https://omdbapi.com/?apikey=bd3bc37a&i=${urlParams}`
  );
  const movieData = await movie.json();
  if (movieData.Response === "True") {
    const isExistInFavorite = localStorage.getItem("favorite");
    const favoriteDatas = JSON.parse(isExistInFavorite);
    const ifExist = favoriteDatas
      ? favoriteDatas.some((data) => data.imdbID === urlParams)
      : false;
    console.log(ifExist);
    if (favoriteDatas !== null && ifExist) {
      const movieHTML = `
    <div class="row">
      <div class="col-md-4">
        <img src="${movieData.Poster}" class="img-fluid">
      </div>
      <div class="col-md-8">
        <ul class="list-group">
          <li class="list-group-item"><h3>${movieData.Title}</h3></li>
          <li class="list-group-item">Released : ${movieData.Released}</li>
          <li class="list-group-item">Runtime : ${movieData.Runtime}</li>
          <li class="list-group-item">Genre : ${movieData.Genre}</li>
          <li class="list-group-item">Writer : ${movieData.Writer}</li>
          <li class="list-group-item">Actors : ${movieData.Actors}</li>
          <li class="list-group-item">Country : ${movieData.Country}</li>
        </ul>
        <button class="btn btn-danger" onclick="removeFromFavorite('${encodeURIComponent(
          JSON.stringify(movieData)
        )}')">Remove from Favourite</button>
      </div>
    </div>
    <br>
    <div class="row">
       <div class="col-md-12">
        <p>${movieData.Plot}</p>
       </div>
    </div>
    `;
      mainContainer.innerHTML = movieHTML;
    } else {
      const movieHTML = `
      <div class="row">
        <div class="col-md-4">
          <img src="${movieData.Poster}" class="img-fluid">
        </div>
        <div class="col-md-8">
          <ul class="list-group">
            <li class="list-group-item"><h3>${movieData.Title}</h3></li>
            <li class="list-group-item">Released : ${movieData.Released}</li>
            <li class="list-group-item">Runtime : ${movieData.Runtime}</li>
            <li class="list-group-item">Genre : ${movieData.Genre}</li>
            <li class="list-group-item">Writer : ${movieData.Writer}</li>
            <li class="list-group-item">Actors : ${movieData.Actors}</li>
            <li class="list-group-item">Country : ${movieData.Country}</li>
          </ul>
          <button class="btn btn-primary" onclick="addToFavorite('${encodeURIComponent(
            JSON.stringify(movieData)
          )}')">Add to favorite</button>
          
        </div>
      </div>
      <br>
      <div class="row">
         <div class="col-md-12">
          <p>${movieData.Plot}</p>
         </div>
      </div>
      `;
      mainContainer.innerHTML = movieHTML;
    }
  } else {
    mainContainer.innerHTML = `<p>No movie found</p>`;
  }
};

getMovie();


// Add to Favourites
const addToFavorite = (movie) => {
  const movieData = decodeURIComponent(JSON.stringify(movie));
  const movieDataWithoutQuotes = movieData.replace(/^"(.*)"$/, "$1");
  const favorite = localStorage.getItem("favorite");
  console.log(favorite);
  const favoriteDatas = JSON.parse(favorite);
  if (favoriteDatas !== null) {
    const ifExist = favoriteDatas.find((data) => {
      return data.imdbID === movieDataWithoutQuotes.imdbID;
    });
    if (ifExist) {
      return alert("Movie already exist in favorite");
    }
    favoriteDatas.push(JSON.parse(movieDataWithoutQuotes));
    localStorage.setItem("favorite", JSON.stringify(favoriteDatas));
  } else {
    const favoriteData = [JSON.parse(movieDataWithoutQuotes)];
    localStorage.setItem("favorite", JSON.stringify(favoriteData));
    
  }
  alert("Movie added to favorite");
};


// Remove from Favourites
const removeFromFavorite = (id) => {
  const decodedId = decodeURIComponent(JSON.stringify(id));
  const ids = JSON.parse(decodedId.replace(/^"(.*)"$/, "$1"));
  const favorite = localStorage.getItem("favorite");
  const favoriteParsed = JSON.parse(favorite);
  const newFavorite = favoriteParsed.filter((data) => {
    return data.imdbID !== ids.imdbID;
  });
  localStorage.setItem("favorite", JSON.stringify(newFavorite));
  alert("Movie removed from favorite");
 
};


