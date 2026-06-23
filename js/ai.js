import OpenAI from "openai";
import { getBearerTokenProvider, DefaultAzureCredential } from "@azure/identity";

const endpoint = "https://amazon-ai-chatbot-resource.services.ai.azure.com/openai/v1";
const deploymentName = "gpt-4.1-mini";
const tokenProvider = getBearerTokenProvider(
    new DefaultAzureCredential(),
    'https://ai.azure.com/.default');

const openai = new OpenAI({
    baseURL: process.env.FOUNDRY_ENDPOINT,
    apiKey: process.env.FOUNDRY_API_KEY,
    defaultHeaders: {
        'api-key': process.env.FOUNDRY_API_KEY
    }
});

async function main() {
  const runner = openai.responses
    .stream({
      model: deploymentName,
      input: 'solve 8x + 31 = 2', // changes in accordance with model task
    })
    .on('event', (event) => console.log(event))
    .on('response.output_text.delta', (diff) => process.stdout.write(diff.delta));

  for await (const event of runner) {
    console.log('event', event);
  }

  const result = await runner.finalResponse();
  console.log(result);
}

main();

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