function registerInterest() {
    const emailField = document.getElementById('email-field');
    const nameField = document.getElementById('name-field');
    const registerButton = document.querySelector('.eop-submit-button');
    const emailError = document.getElementById('emailError');
    const nameError = document.getElementById('nameError');

    registerButton.addEventListener('click', () => {
        if (nameField.value.trim() === "") {
            nameField.classList.add('error');
            nameError.classList.add('show');
        } else {
            nameField.classList.remove('error');
            nameError.classList.remove('show');
        }

        if (emailField.value.trim() === "") {
            emailField.classList.add('error');
            emailError.classList.add('show');
        } else {
            emailField.classList.remove('error');
            emailError.classList.remove('show');
        }
    })
}

registerInterest();