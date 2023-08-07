function attachEvents() {
    const sendBtn = document.getElementById('submit');
    const authorName = document.querySelector('input[name="author"]');
    const messageText = document.querySelector('input[name="content"]');
    const url = 'http://localhost:3030/jsonstore/messenger';
    const textArea = document.querySelector('textarea');
    const refreshBtn = document.getElementById('refresh');

    sendBtn.addEventListener('click', sendMessage);

    function sendMessage() {

        const messageObj = {
            author: authorName.value,
            content: messageText.value,
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(messageObj),


        }).catch(err => console.log(err));

        authorName.value = '';
        messageText.value = '';
    }

    refreshBtn.addEventListener('click', () => {
        fetch(url)
            .then(res => res.json())
            .then(messageData => {
                const dataArray = Object.values(messageData);

                textArea.value = dataArray.map(({ author, content }) => `${author}: ${content}`).join('\n')


            }).catch(error => console.log(error));

    });
}

attachEvents();