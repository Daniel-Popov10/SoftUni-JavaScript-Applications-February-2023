const views = [...document.querySelectorAll('.view-section')];

function hideAll() {
    views.forEach(v => v.style.display = 'none');
}

export function showView(section) {
    hideAll();
    section.style.display = 'block';
}

export function displayLoading() {
    const element = document.createElement('p');
    element.innerHTML = 'Loading...';
    return element;
}

const userNav = document.querySelectorAll('.nav-item.user');
const guestNav = document.querySelectorAll('.nav-item.guest');

export function updateNav() {
    const user = JSON.parse(localStorage.getItem('user'));
    const msgContainer = document.getElementById('welcome-msg');
    const addMovieBtn = document.getElementById('add-movie-button');
    if (user) {
        guestNav.forEach(x => x.style.display = 'none');
        userNav.forEach(x => x.style.display = 'block');
        msgContainer.textContent = `Welcome, ${user.email}`;
        addMovieBtn.style.display = 'block';
    } else {
        guestNav.forEach(x => x.style.display = 'block');
        userNav.forEach(x => x.style.display = 'none');
        msgContainer.textContent = '';
        addMovieBtn.style.display = 'none';
    }
}


