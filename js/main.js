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