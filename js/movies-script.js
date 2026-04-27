"use strict";

const movies = [
  {
    id: 1,
    title: "Inception",
    genre: "science fiction",
    year: "2010",
    duration: "2.28",
    image: "img/inception.webp",
    url: "https://www.imdb.com/title/tt1375666/",
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "action",
    year: "2008",
    duration: "2.32",
    image: "img/the-dark-knight.webp",
    url: "https://www.imdb.com/title/tt0468569/",
  },
  {
    id: 3,
    title: "Forest Gump",
    genre: "drama",
    year: "1994",
    duration: "2.22",
    image: "img/forrest-gump.webp",
    url: "https://www.imdb.com/title/tt0109830/",
  },
  {
    id: 4,
    title: "Superbad",
    genre: "comedy",
    year: "2007",
    duration: "1.53",
    image: "img/superbad.webp",
    url: "https://www.imdb.com/title/tt0829482/",
  },
  {
    id: 5,
    title: "It",
    genre: "horror",
    year: "2017",
    duration: "2.15",
    image: "img/it.webp",
    url: "https://www.imdb.com/title/tt1396484/",
  },
  {
    id: 6,
    title: "The hangover",
    genre: "comedy",
    year: "2009",
    duration: "1.4",
    image: "img/the-hangover.webp",
    url: "https://www.imdb.com/title/tt1119646/",
  },
  {
    id: 7,
    title: "The Conjuring",
    genre: "horror",
    year: "2013",
    duration: "1.52",
    image: "img/the-conjuring.webp",
    url: "https://www.imdb.com/title/tt1457767/",
  },
  {
    id: 8,
    title: "Interstellar",
    genre: "science fiction",
    year: "2014",
    duration: "2.55",
    image: "img/interstellar.webp",
    url: "https://www.imdb.com/title/tt0816692/",
  },
  {
    id: 9,
    title: "The Matrix",
    genre: "science fiction",
    year: "1999",
    duration: "3.02",
    image: "img/the-matrix.webp",
    url: "https://www.imdb.com/title/tt0133093/",
  },
  {
    id: 10,
    title: "Pulp Fiction",
    genre: "drama",
    year: "1994",
    duration: "1.39",
    image: "img/pulp-fiction.webp",
    url: "https://www.imdb.com/title/tt0110912/",
  },
];

const moviesContainer = document.querySelector("#movies-container");
const selectedCategory = document.querySelector("#category-select");
const searchInput = document.querySelector("#gsearch");
const form = document.querySelector("form");

let favoriteMovieIds = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

function isFavoriteMovie(id) {
  return favoriteMovieIds.includes(id);
}

function displayMovies(movieList) {
  const html = movieList
    .map((movie) => {
      let star;

      if (isFavoriteMovie(movie.id)) {
        star = "★";
      } else {
        star = "☆";
      }

      return `
      <article>
        <button class="favorite-btn" data-id="${movie.id}">
      ${star}
        </button>
        <h2>${movie.title}</h2>
        <ul>
          <li>Genre: ${movie.genre}</li>
          <li>År: ${movie.year}</li>
          <li>Varighed: ${movie.duration}</li>
        </ul>
        <figure>
          <a href="${movie.url}" target="_blank" rel="noopener noreferrer">
            <img src="${movie.image}" alt="${movie.title}">
          </a>
          <figcaption>Læs mere på IMDB</figcaption>
        </figure>
      </article>
    `;
    })
    .join("");

  moviesContainer.innerHTML = html;

  const favoriteButtons = document.querySelectorAll(".favorite-btn");

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const movieId = Number(button.dataset.id);
      toggleFavoriteMovie(movieId);
    });
  });
}

function filterMovies() {
  const selectedValue = selectedCategory.value;
  const searchTerm = searchInput.value.toLowerCase().trim();

  let filteredMovies = movies;

  // kategori
  if (selectedValue !== "Alle") {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.genre.toLowerCase() === selectedValue.toLowerCase(),
    );
  }

  // søgning
  if (searchTerm !== "") {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm),
    );
  }

  displayMovies(filteredMovies);
}

function toggleFavoriteMovie(id) {
  if (favoriteMovieIds.includes(id)) {
    favoriteMovieIds = favoriteMovieIds.filter((favId) => favId !== id);
  } else {
    favoriteMovieIds.push(id);
  }

  localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovieIds));

  filterMovies();
}

selectedCategory.addEventListener("change", filterMovies);
searchInput.addEventListener("input", filterMovies);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  filterMovies();
});

displayMovies(movies);
