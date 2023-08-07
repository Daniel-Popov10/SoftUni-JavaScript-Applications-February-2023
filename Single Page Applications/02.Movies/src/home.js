import { showView, displayLoading } from "./utils.js";
import { displayDetails } from "./details.js";


const homePage = document.getElementById('home-page');
const getMovieDetails = homePage.querySelector('#movies-list');
getMovieDetails.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.preventDefault();
        const id = e.target.dataset.id;
        displayDetails(id);
    }
});

export function displayHome() {
    showView(homePage);
    displayMovies();
}

const movieList = homePage.querySelector('#movie #movies-list');

async function getMovies() {
    const res = await fetch('http://localhost:3030/data/movies');
    const data = await res.json();
    return data;

}


async function displayMovies() {
    movieList.replaceChildren(displayLoading());
    const movies = await getMovies();
    movieList.replaceChildren(...movies.map(createMovieCard));
}

function createMovieCard(movie) {
    const element = document.createElement('div');
    element.innerHTML = '';
    element.id = movie._id;
    element.innerHTML = `
    <div class="card mb-4">
        <img class="card-img-top" src="${movie.img}"
             alt="Card image cap" width="400">
        <div class="card-body">
            <h4 class="card-title">${movie.title}</h4>
        </div>
        <div class="card-footer">
            <a href="/details/${movie._id}">
                <button data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
            </a>
        </div>

    </div>`;

    return element;

}