function processLibrary() {
    //todo: get button that loads all books and attach event listener on click
    const loadAllBtn = document.getElementById('loadBooks');
    loadAllBtn.addEventListener('click', getAllBooks);
    const url = `http://localhost:3030/jsonstore/collections/books`;
    const table = document.querySelector('body tbody');
    const firstEditBtns = document.querySelectorAll('td :nth-child(1)');
    const firstDeleteBtns = document.querySelectorAll('td :nth-child(2)');


    firstEditBtns.forEach(button => {
        button.addEventListener('click', editBook);
    });

    firstDeleteBtns.forEach(button => {
        button.addEventListener('click', deleteBook);
    });

    function getAllBooks() {
        //! Extract all books from server, create td for each book and append elements to dom.
        fetch(url)
            .then(res => res.json())
            .then(data => {

                const bookData = Object.entries(data);

                bookData.forEach(book => {

                    const editBtn = document.createElement('button');
                    editBtn.textContent = 'Edit';

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';

                    const tr = document.createElement('tr');
                    const insertTitle = tr.insertCell();
                    insertTitle.textContent = book[1].title;
                    tr.id = book[0];

                    const insertAuthor = tr.insertCell();
                    insertAuthor.textContent = book[1].author;

                    const insertButtons = tr.insertCell();
                    insertButtons.appendChild(editBtn);
                    insertButtons.appendChild(deleteBtn);

                    table.appendChild(tr);

                    editBtn.addEventListener('click', editBook);
                    deleteBtn.addEventListener('click', deleteBook);
                });
            }).catch(err => { throw new Error('Error!') });

    }

    //todo: get form element and extract form data from it in an object.


    const form = document.querySelector('form');
    //todo: get submit button and remove default reloading behaviour.
    const submitBtn = document.querySelector('form :nth-child(6)');
    //todo: attach event listener to submit button and create functionality for creating a book.

    submitBtn.addEventListener('click', addBook);

    function addBook(e) {
        e.preventDefault();
        //! extract data from form, transfer it to an object and make a post request to server with the data.
        const data = new FormData(form);

        const bookTitle = data.get('title');
        const bookAuthor = data.get('author');

        const bookObj = {
            author: bookAuthor,
            title: bookTitle,
        }

        //! make validation for fields, throw alert if fields are empty.

        if (bookTitle && bookAuthor) {
            //! create dom elements for new book and add book to list.
            const tr = document.createElement('tr');
            const insertTitle = tr.insertCell();
            insertTitle.textContent = bookTitle;
            const insertAuthor = tr.insertCell();
            insertAuthor.textContent = bookAuthor;

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';

            const insertButtons = tr.insertCell();
            insertButtons.appendChild(editBtn);
            insertButtons.appendChild(deleteBtn);

            table.appendChild(tr);
            //! add event listener to edin button that puts the document into edit mode.
            editBtn.addEventListener('click', editBook);
            deleteBtn.addEventListener('click', deleteBook);
            //! make POST request for adding the new book
            fetch(url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },

                body: JSON.stringify(bookObj),
            }).then(res => res.json())
                .then(newBookData => { tr.id = newBookData._id; })
                .catch(err => alert(err));

        } else {
            alert('Please fill out fields!');
        }

    }


    //! create function to transform document into edit mode.
    function editBook(e) {
        const getID = e.currentTarget.parentElement.parentElement.id;

        const getH3 = document.querySelector('h3');
        getH3.textContent = 'Edit FORM'

        const getTitle = e.currentTarget.parentElement.parentElement.children[0];
        const getAuthor = e.currentTarget.parentElement.parentElement.children[1];
        console.log(getTitle);
        let titleField = document.querySelector('form :nth-child(3)');
        titleField.value = getTitle.textContent;
        let authorField = document.querySelector('form :nth-child(5)');
        authorField.value = getAuthor.textContent;

        const saveBtn = document.createElement('button');
        saveBtn.textContent = 'Save';
        form.appendChild(saveBtn);


        saveBtn.addEventListener('click', modifyBook);
        //! function to save the changes to the book and update it in the server and DOM.
        function modifyBook(e) {
            e.preventDefault();

            const updateBookObj = {
                author: authorField.value,
                title: titleField.value,
            }
            console.log(updateBookObj);
            fetch(`${url}/${getID}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },

                body: JSON.stringify(updateBookObj),
            }).catch(err => alert(err));

            getTitle.textContent = updateBookObj.title;
            getAuthor.textContent = updateBookObj.author;
            authorField.value = '';
            titleField.value = '';
            saveBtn.remove();
        }

    }
    //! function to delete book from server and DOM.
    function deleteBook(e) {
        const getID = e.currentTarget.parentElement.parentElement.id;
        const tr = e.currentTarget.parentElement.parentElement;
        tr.remove();

        fetch(`${url}/${getID}`, {
            method: 'DELETE',
        }).catch(err => alert(err));
    }

}


processLibrary();