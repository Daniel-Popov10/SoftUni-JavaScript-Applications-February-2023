import { register } from '../api/users.js';

let ctx = null;

const registerPage = document.getElementById('registerPage');

export function showRegister(context) {
    ctx = context;
    context.showSection(registerPage);
}




const form = document.querySelector('#registerForm');
form.addEventListener('submit', registerUser);

async function registerUser(e) {

    e.preventDefault();

    const data = new FormData(form);
    const email = data.get('email');
    const password = data.get('password');
    const repeatPassowrd = data.get('repeatPassword');

    if (email.length < 3) {
        alert('Email must contain more than 3 characters!')
    } else if (password.length < 3) {
        alert('Password must contain more than three characters')
    } else if (password !== repeatPassowrd) {
        alert('Passowrd and Repeat Password must match!')
    } else {
        await register(email, password);
        form.reset();
        ctx.goto('/');
    }

}

