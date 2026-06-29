const overlay = document.querySelector('.chat-takeover');
const askButton = document.querySelector('.search-button');
const inputBar = document.querySelector('.navigation-bar');
const backButton = document.querySelector('.return-button');
const askAIButton = document.querySelector('.ai-search-button');
const aiChatBotInput = document.querySelector('.chat-input');
const messages = document.getElementById('messages');

const conversationHistory = [];

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

function addMessage(text, sender) {
    const container = document.createElement('div');
    container.className = `message-container ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    container.appendChild(bubble);
    messages.appendChild(container);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
}

askAIButton.addEventListener('click', async () => {
    const message = aiChatBotInput.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    conversationHistory.push({ role: 'user', content: message })
    aiChatBotInput.value = '';

    try {
        const response = await fetch('http://localhost:5501/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, history:conversationHistory })
        });
        if (!response.ok) throw new Error(`Server returned ${response.status}`);
        const data = await response.json();

        addMessage(data.reply, 'bot');
        conversationHistory.push({ role: 'assistant', content: data.reply });
    } catch (err) {askButton.disabled = true;
    aiChatBotInput.disabled = true;
        addMessage('Sorry I could not reach the server. Please try again.', 'bot');
        console.log(err);
    } 
});

openChat();
addMessage(text, sender);