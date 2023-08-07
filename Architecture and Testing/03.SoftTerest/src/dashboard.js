import { getAllIdeas } from "../api/data.js";
import { getIdeaDetails } from "../api/data.js";


const dashboardPage = document.getElementById('dashboard-holder');

dashboardPage.addEventListener('click', onSelect);

let ctx = null;

export async function showDashboard(context) {
    ctx = context;
    context.showSection(dashboardPage);
    const ideas = await getAllIdeas();
    if (ideas.length == 0) {
        dashboardPage.innerHTML = '<h1>No ideas yet! Be the first one :)</h1>'
    } else {
        dashboardPage.replaceChildren(...ideas.map(createIdeaCards));
    }
}

function createIdeaCards(card) {
    const element = document.createElement('div');
    element.className = 'card overflow-hidden current-card details';
    element.style = 'width: 20rem; height: 18rem;';
    element.id = card._id;
    element.innerHTML = `<div class="card-body">
    <p class="card-text">${card.title}</p>
</div>
<img class="card-image" src="${card.img}" alt="Card image cap">
<a class="btn" href="/details">Details</a>`
    return element;
}

async function onSelect(e) {
    debugger;
    if (e.target.tagName === 'A') {
        const ideaId = e.target.parentElement.id;
        e.preventDefault();
        const ideaInfo = await getIdeaDetails(ideaId);
        ctx.goto('/details', ideaInfo);
    }
}