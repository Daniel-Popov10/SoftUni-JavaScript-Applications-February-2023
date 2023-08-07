import { showView } from "./utils.js";
import { displayHome } from "./home.js";

const createPage = document.getElementById('add-movie');

export function displayCreate() {
    showView(createPage);

}


const form = createPage.querySelector('form');
form.addEventListener('submit', createMovie);


async function createMovie(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const formData = new FormData(form);
    const title = formData.get('title');
    const description = formData.get('description');
    const img = formData.get('img');

    const movieData = { title, description, img };

    try {
        if (title && description && img) {
            const res = await fetch('http://localhost:3030/data/movies', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-Authorization': user.accessToken
                },
                body: JSON.stringify(movieData),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message);
            }

            displayHome();
            form.reset();
        } else {
            throw new Error(alert('Please fill out all fields!'))
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }



} 