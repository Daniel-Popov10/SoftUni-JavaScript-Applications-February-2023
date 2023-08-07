import { createIdea } from "../api/data.js";

const createPage = document.getElementById('createPage');

let ctx = null;
export function showCreate(context) {
    ctx = context;
    context.showSection(createPage);
}



const form = document.getElementById('createForm');
form.addEventListener('submit', addIdea);

async function addIdea(e) {

    e.preventDefault();
    const data = new FormData(form);
    const title = data.get('title');
    const description = data.get('description');
    const img = data.get('imageURL');

    if (title.length < 6) {
        alert('Title length must be be more than 6 characters!');
    } else if (description.length < 10) {
        alert('Description length must be more than 10 characters!');
    } else if (img.length < 5) {
        alert('Image length must be more than 5 characters!');
    } else {
        await createIdea({ title, description, img });
        form.reset();
        ctx.goto('/dashboard');
    }


}