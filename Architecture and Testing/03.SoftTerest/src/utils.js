const userNav = [...document.querySelectorAll('#user-nav')];
const guestNav = [...document.querySelectorAll('#guest-nav')];


export function updateNav() {
    const user = localStorage.getItem('user');
    if (user) {
        userNav.forEach(el => el.style.display = 'inline-block');
        guestNav.forEach(el => el.style.display = 'none');
    } else {
        userNav.forEach(el => el.style.display = 'none');
        guestNav.forEach(el => el.style.display = 'inline-block');
    }
}