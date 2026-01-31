import { fetchJson } from './api.js';

document.getElementById('load-btn').addEventListener('click', async function() {
    const res = await fetchJson("https://jsonplaceholder.typicode.com/posts?userId=1");
    const container = document.getElementById('nav-home').firstElementChild;
    console.log(container);

    res.forEach(element => {
        let new_element = `<a href="#" class="list-group-item list-group-item-action" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <div class="d-flex w-100">
                        <h5 class="mb-1">${element.title}</h5>
                    </div>
                    <p class="mb-1">${element.body}</p>
                </a>`;

        
        container.insertAdjacentHTML('beforeend', new_element);
    });
})