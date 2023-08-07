import { get, post } from "./api.js";

const endpoints = {
    'getIdeas': '/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc',
    'createIdeas': '/data/ideas',
    'details': `/data/ideas/`,
}


export async function getAllIdeas() {
    return get(endpoints.getIdeas);
}

export async function createIdea(data) {
    return post(endpoints.createIdeas, data);
}

export async function getIdeaDetails(id) {
    return get(endpoints.details + id)
}