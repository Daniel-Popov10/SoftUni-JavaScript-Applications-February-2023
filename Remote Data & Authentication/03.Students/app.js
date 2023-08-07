function submitStudents() {
    const table = document.querySelector('#results tbody');
    const url = ` http://localhost:3030/jsonstore/collections/students`;
    const submitBtn = document.getElementById('submit');

    submitBtn.addEventListener('click', addStudent)
    const form = document.getElementById('form');

    function addStudent(event) {
        event.preventDefault();
        const formData = new FormData(form);

        const studentObj = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            facultyNumber: (formData.get('facultyNumber')),
            grade: (formData.get('grade')),
        };

        fetch(url, {
            method: 'POST',

            headers: {
                'content-type': 'application/json'
            },

            body: JSON.stringify(studentObj),

        });

        const tr = document.createElement('tr');

        const firstName = studentObj.firstName;
        const lastName = studentObj.lastName;
        const facultyNumber = studentObj.facultyNumber;
        const grade = studentObj.grade;

        const tdFirstName = tr.insertCell();
        tdFirstName.textContent = firstName;

        const tdLastName = tr.insertCell();
        tdLastName.textContent = lastName;

        const tdFacultyNumber = tr.insertCell();
        tdFacultyNumber.textContent = facultyNumber;

        const tdGrade = tr.insertCell();
        tdGrade.textContent = Number(grade);

        table.appendChild(tr);
    }



    fetch(url)
        .then(res => res.json())
        .then(data => {

            const dataArray = Object.values(data);

            dataArray.forEach(student => {
                console.log(student);
                const firstName = student.firstName;
                const lastName = student.lastName;
                const facultyNumber = (student.facultyNumber);
                const grade = (student.grade);

                const tr = document.createElement('tr');

                const firstNameCell = tr.insertCell();
                firstNameCell.textContent = firstName;

                const lastNameCell = tr.insertCell();
                lastNameCell.textContent = lastName;

                const facultyNumberCell = tr.insertCell();
                facultyNumberCell.textContent = facultyNumber;

                const gradeCell = tr.insertCell();
                gradeCell.textContent = grade;

                table.appendChild(tr);
            })

        });



}


submitStudents();