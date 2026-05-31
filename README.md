# Amazon T-Level Project

Built for the AWS Amazon T-Level placement programme.

# Viewing the site

No server or install needed. Just open `landing-page.html` in your browser:
- Windows/Mac: double-click the file
- VS Code: install the Live Server extension: (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) then right-click `landing-page.html` Open with Live server (the page will auto-refresh as you save changes)

# Getting started (setup)

1. Clone the repository

Open a terminal and run:

git clone https://github.com/whoami0x1/amazon-tlevel-repo.git

2. Open the project

Open the amazon-project folder in VS Code (or any editor you prefer).

# Making changes and working with Branches

Always work on your own branch, never commit directly to master. This helps ensure that we avoid conflicts when making changes, and ensuring 
maintenance efficiently. Once you make changes to the project, push your branch to create a pull request such that I can merge them into master.

For those of you unfamiliar with working with branches and pull requests, I have layed out what you have to do:

1. Make sure you have the latest code

git checkout master
git pull

2. Create a new branch for your work

Name it something that describes what you're doing:

git checkout -b feature/your-feature-name

For example: feature/navbar or fix/footer-layout

3. Make your changes

Edit files in your editor as normal.

4. Stage and commit your changes

git add <filename> or git add . to add all your changes # stage a specific file, e.g. git add landing-page.html
git commit -m "Short description of what you changed"

5. Push your branch to GitHub

git push origin feature/your-feature-name

6. Open a Pull Request

- Go to the GitHub repo in your browser
- You'll see a prompt to open a Pull Request for your branch. Click it
- Add a short description of what you changed and why
- Request a review if needed, then submit

Once the PR is reviewed and approved, I will merge it into master.

# Fonts/Typography packages

The fonts/ folder contains the Amazon Ember typefaces used by the site. These are included in the repo, so they will work automatically after cloning. Shouldn't have any extra downloads needed.

---

