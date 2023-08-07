import { showView } from "./utils.js";
import { displayHome } from "./home.js";

const registerPage = document.getElementById('form-sign-up');

export function displayRegister() {
    showView(registerPage);
}

const registerForm = registerPage.querySelector('#register-form');



registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const loginData = new FormData(registerForm);
    const email = loginData.get('email');
    const password = loginData.get('password');
    const repeatPassword = loginData.get('repeatPassword');

    let userData = { email, password };


    if (!email || !password || !repeatPassword) {
        alert(new Error('Please fill out all of the required fields!'));
    } else if (password.length < 6) {
        alert(new Error('Password must be at least 6 characters long!'));
    } else if (password.length !== repeatPassword.length) {
        alert(new Error('Password and confirm password fields must match!'))
    } else {
        fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(userData),
        }).catch(err => alert(err))
        displayHome();
        registerForm.reset();
    }

});