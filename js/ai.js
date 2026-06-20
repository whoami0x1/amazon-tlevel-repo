class AmazonAI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = this.getTemplate();
        this.initLogic();
    }

    getTemplate() {
        return `
        <div class="amazon-ai-wrapper">
            <button id="amazonAI-button" class="amazon-ai-button"><img class="amazon-ai-button-logo" src="amazon-images/amazon-logo-1.png"></button>
        </div>

        <div class="amazon-ai-chat-wrapper">
            <div class="amazon-ai-heading-content">
                <p class="amazon-ai-title">Ask Amazon</p>
                <img class="three-dots-icon" src="amazon-images/more.png">
                <img class="cross-icon" src="amazon-images/cross.png">
            </div>
                <hr class="orange-line">
                <hr class="grey-line">
                <div class="ai-input-wrapper">
                    <input class="amazon-ai-input" type="text" placeholder="Ask a question" id="amazonAI-input">
                    <img class="right-arrow-submit" src="amazon-images/right.png">
                </div>
        </div>
        `
    }

    initLogic() {
        const amazonAIButton = document.getElementById('amazonAI-button');
        const aiDropdown = document.querySelector('.amazon-ai-chat-wrapper');
        const crossIcon = document.querySelector('.cross-icon');

        amazonAIButton.addEventListener('click', () => {
            aiDropdown.classList.toggle('open');
        });

        crossIcon.addEventListener('click', () => {
            aiDropdown.classList.remove('open');
        });

        document.addEventListener('click', (event) => {
            if (!aiDropdown.contains(event.target) && !amazonAIButton.contains(event.target)) {
                aiDropdown.classList.remove('open');
            }
        });
    }
}



customElements.define('amazon-ai', AmazonAI);