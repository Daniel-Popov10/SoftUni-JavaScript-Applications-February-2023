function attachEvents() {

    const phoneList = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');
    const getPerson = document.getElementById('person');
    const getPhone = document.getElementById('phone');
    let url = `http://localhost:3030/jsonstore/phonebook`;


    loadBtn.addEventListener('click', loadContacts)

    function loadContacts() {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const dataArr = Object.values(data);

                dataArr.forEach(phonebookEntry => {
                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Delete';
                    const li = document.createElement('li');
                    const personInfo = `${phonebookEntry.person}: ${phonebookEntry.phone}`
                    li.id = phonebookEntry._id;
                    li.textContent = personInfo;
                    li.appendChild(deleteBtn);
                    phoneList.appendChild(li);

                    deleteBtn.addEventListener('click', (e) => {
                        const deleteEntryURL = `http://localhost:3030/jsonstore/phonebook/${e.currentTarget.parentElement.id}`;
                        e.currentTarget.parentElement.remove();
                        fetch(deleteEntryURL, {

                            method: 'DELETE',

                        });
                    });
                });

            }).catch(err => { throw new Error(err) });
    }



    createBtn.addEventListener('click', (e) => {
        const personObject = {
            person: getPerson.value,
            phone: getPhone.value,
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },

            body: JSON.stringify(personObject),
        });

        getPerson.value = '';
        getPhone.value = '';
        loadContacts();

    });
}

attachEvents();

