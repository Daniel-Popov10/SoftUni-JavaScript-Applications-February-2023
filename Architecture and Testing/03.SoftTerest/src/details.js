import { del } from '../api/api.js';

const detailsPage = document.getElementById('ideaDetails');

let ctx = null;

export function showDetails(context, idea) {
    ctx = context;
    context.showSection(detailsPage);
    debugger;
    detailsPage.replaceChildren(...createIdeaDetails(idea));
}

function createIdeaDetails(idea) {
    const user = JSON.parse(localStorage.getItem('user'));
    const img = document.createElement('img');
    img.className = 'det-img';
    img.src = idea.img;
    const div = document.createElement('div');
    div.className = 'desc';
    div.innerHTML = ` <div class="desc">
    <h2 class="display-5">${idea.title}</h2>
    <p class="infoType">Description:</p>
    <p class="idea-description">${idea.description}</p>
</div>`

    if (user) {
        if (user._id === idea._ownerId) {
            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'text-center';
            buttonDiv.innerHTML = `<a id="${idea._id}" class="btn detb" href="/delete">Delete</a>`;
            return [img, div, buttonDiv]
        }
    } else {
        return [img, div];
    }

}


detailsPage.addEventListener('click', deleteIdea);

async function deleteIdea(e) {

    if (e.target.tagName == 'A') {
        e.preventDefault();
        await del(`/data/ideas/${e.target.id}`);
        detailsPage.remove();
        ctx.goto('/dashboard');
    }
}

