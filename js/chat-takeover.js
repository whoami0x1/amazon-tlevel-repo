const overlay = document.querySelector('.chat-takeover');
const askButton = document.querySelector('.search-button');
const inputBar = document.querySelector('.navigation-bar');
const backButton = document.querySelector('.return-button');
const askAIButton = document.querySelector('.ai-search-button');

function openChat() {
    inputBar.addEventListener('click', () => {
        overlay.hidden = false;
        requestAnimationFrame(() => overlay.classList.add('open'));
    });

    backButton.addEventListener('click', () => {
        overlay.hidden = true;
        requestAnimationFrame(() => overlay.classList.remove('open'));
    });
    
    askButton.addEventListener('click', () => {
        overlay.hidden = false;
        requestAnimationFrame(() => overlay.classList.add('open'));
    });
}

openChat();