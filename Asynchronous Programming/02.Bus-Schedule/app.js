function solve() {
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let spanInfo = document.querySelector('.info');

    let currObj = {
        next: 'depot',
    };

    function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${currObj.next}`;
        fetch(url)
            .then(res => res.json())
            .then(obj => {
                currObj.name = obj.name;
                currObj.next = obj.next;
                spanInfo.textContent = `Next stop ${obj.name}`;

                departBtn.disabled = true;
                arriveBtn.disabled = false;
            })
            .catch(err => {
                spanInfo.textContent = `Error`;
                departBtn.disabled = true;
                arriveBtn.disabled = true;
            });
    }

    function arrive() {
        spanInfo.textContent = `Arriving at ${currObj.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive,
    };
}

let result = solve();