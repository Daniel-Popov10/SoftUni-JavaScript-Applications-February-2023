import { displayHome } from "./home.js";
import { showView, displayLoading } from "./utils.js";


const displayEdit = document.getElementById('edit-movie');
const detailsPage = document.getElementById('movie-example');

export function displayDetails(id) {
    showView(detailsPage);
    displayMovie(id);
}

async function displayMovie(id) {
    detailsPage.replaceChildren(displayLoading());

    const user = JSON.parse(localStorage.getItem('user'));

    const [movie, likes, ownLike] = await Promise.all([
        getMovie(id),
        getLikes(id),
        getOwnLike(id, user),
    ]);
    detailsPage.replaceChildren(createMovieInfo(movie, user, likes, ownLike));
}


async function getMovie(id) {
    const res = await fetch(`http://localhost:3030/data/movies/${id}`);
    const movie = res.json();
    return movie;
}

function createMovieInfo(movie, user, likes, ownLike) {
    const element = document.createElement('div');
    element.className = 'container';
    element.innerHTML = '';
    element.innerHTML = `     <div class="row bg-light text-dark">
    <h1>Movie title: ${movie.title}</h1>

    <div class="col-md-8" data-id="${movie._id}">
      <img class="img-thumbnail" src="${movie.img}"
        alt="Movie" />
    </div>
    <div class="col-md-4 text-center">
      <h3 class="my-3">Movie Description</h3>
      <p>
       ${movie.description}
      </p>
      ${createButtons(movie, user, ownLike)}
      <span class="enrolled-span">Liked ${likes}</span>
    </div>
  </div>`;

    const likeBtn = element.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', (e) => likeMovie(e, movie._id));
    }


    return element;
}


function createButtons(movie, user, ownLike) {
    const isOwner = user && user._id === movie._ownerId;

    const controls = [];

    if (isOwner) {
        controls.push('<a id="delete-btn" class="btn btn-danger" href="#">Delete</a>',
            '<a id="edit-btn" class="btn btn-warning" href="#">Edit</a>')
    } else if (user && ownLike === false) {
        controls.push('<a class="btn btn-primary like-btn" href="#">Like</a>');
    }
    controls.push();
    return controls.join('');
}

async function getLikes(id) {
    const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    const likes = await res.json();
    return likes;
}


async function getOwnLike(movieId, user) {
    if (!user) {
        return false;
    } else {
        const userId = user._id
        const res = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        const ownLike = await res.json();
        return ownLike.length > 0;
    }

}


async function likeMovie(e, movieId) {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));

    await fetch('http://localhost:3030/data/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({
            movieId
        })
    });

    displayMovie(movieId);
}




detailsPage.addEventListener('click', getEditForm);

function getEditForm(e) {
    const movieId = detailsPage.querySelector('.col-md-8').dataset.id;
    const movieToDelete = document.querySelector(`#movie ul #${movieId}`);
    const user = JSON.parse(localStorage.getItem('user'));

    if (e.target.id === 'edit-btn') {
        e.preventDefault();
        showView(displayEdit);
    } else if (e.target.id === 'delete-btn') {
        e.preventDefault();
        deleteMovie(movieId, user);
        movieToDelete.remove();
        displayHome();
    }



    const form = displayEdit.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const title = data.get('title');
        const description = data.get('description');
        const img = data.get('img');
        editMovie(title, description, img, movieId, user);
    });
}




async function editMovie(title, description, img, movieId, user) {

    await fetch(`http://localhost:3030/data/movies/${movieId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken,
        },
        body: JSON.stringify({ title, description, img })
    });
    displayMovie(movieId);
}




async function deleteMovie(movieId, user) {
    await fetch(`http://localhost:3030/data/movies/${movieId}`, {
        method: 'DELETE',

        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken,
        },
    })
}