function solution() {

    const main = document.getElementById('main');
    const articlesURL = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const firstDiv = document.createElement('div');
    main.appendChild(firstDiv);

    fetch(articlesURL)
        .then(res => res.json())
        .then(data => data.map(article => {

            const firstDiv = document.createElement('div');
            firstDiv.className = 'accordion'
            main.appendChild(firstDiv);

            const secondDiv = document.createElement('div');
            secondDiv.className = 'head';
            firstDiv.appendChild(secondDiv);

            const titleSpan = document.createElement('span');
            titleSpan.textContent = article.title;
            secondDiv.appendChild(titleSpan);

            const button = document.createElement('button');
            button.className = 'button';
            button.textContent = 'More';
            button.id = article._id;
            secondDiv.appendChild(button);

            const infoURL = `http://localhost:3030/jsonstore/advanced/articles/details/${article._id}`;

            const thirdDiv = document.createElement('div');
            thirdDiv.className = 'extra';
            const p = document.createElement('p');
            thirdDiv.appendChild(p);
            firstDiv.appendChild(thirdDiv);

            button.addEventListener('click', (e) => {



                fetch(infoURL)
                    .then(res => res.json())
                    .then(data => {

                        if (e.target.textContent === 'More') {

                            p.textContent = data.content;
                            thirdDiv.style.display = 'inline-block'
                            e.target.textContent = 'Less';

                        } else if (e.target.textContent === 'Less') {
                            e.target.textContent = 'More';
                            thirdDiv.style.display = 'none';
                        }

                    })
                    .catch(err => console.log(err));
            });


        })


        ).catch(err => console.log(err))


}


