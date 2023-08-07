import { html, render } from "../node_modules/lit-html/lit-html.js";

const form = document.querySelector('form');
form.addEventListener('submit', getTownNames);

const main = document.getElementById('root');

function getTownNames(e) {
    e.preventDefault();
    const data = new FormData(form);
    let townsList = data.get('towns');

    townsList = townsList.split(', ')

    const townsTemplate = (townsList) => html`
<ul>
${townsList.map((town) => html`<li>${town}</li>`)}
</ul>
`;


    render(townsTemplate(townsList), main);
}

