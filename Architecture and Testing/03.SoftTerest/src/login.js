import { login } from '../api/users.js';


const loginPage = document.getElementById('loginPage');

let ctx = null;

export function showLogin(context) {
    ctx = context;
    context.showSection(loginPage);
}


const form = document.querySelector('#loginForm');
form.addEventListener('submit', loginApp);

async function loginApp(e) {

    e.preventDefault();

    const data = new FormData(form);
    const email = data.get('email');
    const password = data.get('password');

    await login(email, password);
    form.reset();
    ctx.goto('/');
}

