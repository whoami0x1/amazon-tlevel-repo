const menuIcon = document.querySelector('.fa-bars');
const dropdownMenu = document.getElementById('dropdownMenu');
const overlay = document.getElementById('overlay');

menuIcon.addEventListener('click', () => {
    dropdownMenu.classList.toggle('open');
    overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
    dropdownMenu.classList.remove('open');
    overlay.classList.remove('active');
});

const tlevelOptionsIcon = document.querySelector('.tlevels-info');
const tleveldropdownMenu = document.querySelector('#t-level-dropdownMenu');

tlevelOptionsIcon.addEventListener('click', () => {
    tleveldropdownMenu.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    if (
        !tleveldropdownMenu.contains(event.target) &&
        !tlevelOptionsIcon.contains(event.target)
    ) {
        tleveldropdownMenu.classList.remove('open');
    }
});
