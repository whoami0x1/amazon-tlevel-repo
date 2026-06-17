const menuIcon = document.querySelector('.fa-bars');
const dropdownMenu = document.getElementById('dropdownMenu');
const overlay = document.getElementById('overlay');

menuIcon.addEventListener('click', () => {
    dropdownMenu.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

overlay.addEventListener('click', () => {
    dropdownMenu.classList.remove('open');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
});

function amazonAIPopup() {
    const amazonAIButton = document.getElementById('amazonAI-button');
    const aiDropdown = document.querySelector('.amazon-ai-chat-wrapper');
    const crossIcon = document.querySelector('.cross-icon');
    
    amazonAIButton.addEventListener('click', (event) => {
        aiDropdown.classList.toggle('open');
        
        crossIcon.addEventListener('click', (event) => {
            aiDropdown.classList.remove('open');
        })

        document.addEventListener('click', (event) => {
            if (!aiDropdown.contains(event.target) && (!amazonAIButton.contains(event.target))) {
                aiDropdown.classList.remove('open');
            };
        })
    });
}

amazonAIPopup();