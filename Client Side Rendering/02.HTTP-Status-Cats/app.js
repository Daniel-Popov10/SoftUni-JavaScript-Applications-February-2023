import { html, render } from '../node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const main = document.querySelector('#allCats');


const catCardTemplate = (cats) => html`
<ul>
${cats.map((cat) => html`
<li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn" @click=${statusMsgControl}>Show status code</button>
                    <div class="status" style="display: none" id="${cat.id}">
                        <h4 class="card-title">Status Code: ${cat.statusCode}</h4>
                        <p class="card-text">${cat.statusMessage}</p>
                    </div>
                </div>
            </li>
`)}
</ul > `;

function statusMsgControl(e) {
    const div = e.target.parentElement.children[1];

    div.style.display === 'none' ? div.style.display = 'inline-block' : div.style.display = 'none';
}


render(catCardTemplate(cats), main);


