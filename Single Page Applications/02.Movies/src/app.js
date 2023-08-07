import { displayHome } from "./home.js";
import { displayLogin } from "./login.js";
import { displayRegister } from "./register.js";
import { displayCreate } from "./create.js";
import { updateNav } from "./utils.js";

const nav = document.querySelector('nav');

nav.addEventListener('click', onNavigate);

const routes = {
    '/home': displayHome,
    '/login': displayLogin,
    '/register': displayRegister,
    '/create': displayCreate,
    '/logout': logout,
}

function onNavigate(e) {
    if (e.target.tagName === 'A' && e.target.href) {
        e.preventDefault();
        const url = new URL(e.target.href);
        const view = routes[url.pathname];

        if (typeof view === 'function') {
            view();
        }

    }
}


async function logout() {

    const user = JSON.parse(localStorage.getItem('user'));


    await fetch('http://localhost:3030/users/logout', {
        headers: {
            'X-Authorization': user.accessToken,
        }
    });

    localStorage.clear();
    updateNav();
    displayHome();
}


const addMoviePage = document.getElementById('add-movie-button');
addMoviePage.addEventListener('click', onNavigate);
//! Load home section on app load
displayHome();
updateNav();
