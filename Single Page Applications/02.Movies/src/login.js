import { showView, updateNav } from "./utils.js";
import { displayHome } from "./home.js";

const loginPage = document.getElementById('form-login');
const loginForm = loginPage.querySelector('form');


export function displayLogin() {
    showView(loginPage);
}

loginForm.addEventListener('submit', onSubmit);



async function onSubmit(e) {
    e.preventDefault();
    const loginData = new FormData(loginForm);
    const email = loginData.get('email');
    const password = loginData.get('password');


    await login(email, password);
    displayHome();
    loginForm.reset();
    updateNav();
}

async function login(email, password) {
    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message);
        }
        const user = await res.json();

        localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
        alert(err.message);
        throw err;
    }
}
