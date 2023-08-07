import { html, render } from '../node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const main = document.getElementById('towns');

const townsTemplate = (towns) => html`
<ul>
   ${towns.map((town) => html`<li>${town}</li>`)}
</ul>`;

render(townsTemplate(towns), main);

const btn = document.querySelector('button');
btn.addEventListener('click', search);
const result = document.getElementById('result');

function search() {
   const matchArray = [];

   const getTowns = document.getElementById('searchText').value;
   const towns = [...document.querySelectorAll('li')];

   towns.forEach((town) => {
      town.className === 'active' ? town.className = '' : null;
      town.textContent.includes(getTowns) ? town.className = 'active' : null;
      town.className === 'active' ? matchArray.push(town) : null;
      result.textContent = `${matchArray.length} matches found`;

   });







}

