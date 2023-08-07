function getInfo() {
    const getStopId = document.getElementById('stopId').value;
    const stopName = document.getElementById('stopName');
    const busList = document.getElementById('buses');

    fetch(`http://localhost:3030/jsonstore/bus/businfo/${getStopId}`)
        .then((res) => res.json())
        .then((data) => Object.entries(data.buses).forEach((bus) => {
            stopName.textContent = data.name
            let newLi = document.createElement('li');
            newLi.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
            busList.appendChild(newLi);
        }))
        .catch((error) => stopName.textContent = 'Error');

}


module.exports = getInfo;


