function registerInterest() {
    const emailField = document.getElementById('email-field');
    const nameField = document.getElementById('name-field');
    const coursesField = document.getElementById('courses');
    const detailsField = document.getElementById('details-field');
    const eopFormContainer = document.getElementById('eopFormContainer');
    const registerButton = document.querySelector('.eop-submit-button');
    const emailError = document.getElementById('emailError');
    const nameError = document.getElementById('nameError');
    const coursesError = document.getElementById('courses-error');
    const detailsError = document.getElementById('detailsError');
    const resultText = document.getElementById('result-text');
    const successMessage = document.getElementById('successMessageTab');
    const successTitle = document.getElementById('allSetTitle');

    registerButton.addEventListener('click', async () => {
        // form values
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const courses = coursesField.value.trim();
        const details = detailsField.value.trim();

        let hasError = false;

        if (name === "") {
            nameField.classList.add('error');
            nameError.classList.add('show');
            hasError = true;
        } else {
            nameField.classList.remove('error');
            nameError.classList.remove('show');
        }

        if (email === "") {
            emailField.classList.add('error');
            emailError.classList.add('show');
            hasError = true;
        } else {
            emailField.classList.remove('error');
            emailError.classList.remove('show');
        }

        if (courses === "") {
            coursesField.classList.add('error');
            coursesError.classList.add('show');
            hasError = true;
        } else {
            coursesField.classList.remove('error');
            coursesError.classList.remove('show');
        }

        if (details === "") {
            detailsField.classList.add('error');
            detailsError.classList.add('show');
            hasError = true;
        } else {
            detailsField.classList.remove('error');
            detailsError.classList.remove('show');
        }

        if (hasError) {
            return;
        }
        const res = await fetch("http://localhost:5501/api/eoi/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name, email, courses, details })
        });

        const data = await res.json();
        if (res.ok) {
            eopFormContainer.classList.add('closed');
            successMessage.classList.add('open');

            function registerInterestSuccess(name) {
            successTitle.textContent = `You're all set, ${name}`;
        }
        registerInterestSuccess(name);

        } else {
            alert('There was an issue sending your form, please try again');
            console.log("Server Error:", data);
        }
    });
}

registerInterest();