class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="pages-footer">
            <div class="footer-container">
                    <div class="footer-brand">
                        <img class="amazon-logo-footer" src="amazon-images/amazon-logo-1.png">
                        <p class="amazon-tlevel-team-logo-bottom">
                            T-Level Team
                        </p>
                    </div>
                    <div class="bottom-footer-copyright">
                        <p class="amazon-copyright-mark">Amazon | © 1996-2025 Amazon.com, Inc. or its affiliates</p>
                    </div>
                <div class="social-icons-column">
                    <div class="social-icons-container">
                        <button class="facebook-social-icon"><a href="https://www.facebook.com/AmazonUK/"><img src="amazon-images/facebook-logo.png" alt="Facebook"></a></button>
                        <button class="instagram-social-icon"><a href="https://www.instagram.com/amazon/"><img src="amazon-images/instagram-logo.png" alt="Instagram"></a></button>
                        <button class="social-icons"><a href="https://www.linkedin.com/company/amazon/"><img src="amazon-images/linkedin-logo.png" alt="LinkedIn"></a></button>
                        <button class="twitter-social-icon"><a href="https://x.com/amazon"><img src="amazon-images/twitter-logo.png" alt="Twitter"></a></button>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}

customElements.define('page-footer', Footer);