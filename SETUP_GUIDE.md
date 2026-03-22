# 🛡️ Amal Joseph — Complete Portfolio Setup Guide
### From Zero to Deployed: Git → GitHub → CI/CD → GitHub Pages → Render.com

---

## 📦 WHAT YOU'VE BEEN GIVEN

Your portfolio project folder contains:
```
portfolio/
├── index.html              ← Your portfolio website
├── style.css               ← Dark cybersecurity theme
├── script.js               ← Matrix rain, animations, contact form
├── .gitignore              ← Tells Git what to ignore
├── .github/
│   └── workflows/
│       └── deploy.yml      ← GitHub Actions CI/CD pipeline
└── backend/
    ├── server.js           ← Node.js + Express API
    └── package.json        ← Node.js project config
```

---

## STEP 1 — INSTALL GIT ON WINDOWS

1. Go to: **https://git-scm.com/download/windows**
2. Download the installer and run it
3. Click **Next** through all screens (defaults are fine)
4. After installing, open **Command Prompt** (press `Win + R`, type `cmd`, press Enter)
5. Type this to verify Git installed:
   ```
   git --version
   ```
   You should see something like: `git version 2.43.0.windows.1`

---

## STEP 2 — CONFIGURE GIT WITH YOUR NAME & EMAIL

In Command Prompt, type these (replace with YOUR name and email):
```
git config --global user.name "Amal Joseph"
git config --global user.email "your@email.com"
```

Verify it worked:
```
git config --list
```
You should see your name and email in the output.

---

## STEP 3 — INSTALL NODE.JS

1. Go to: **https://nodejs.org**
2. Download the **LTS version** (the green button)
3. Run the installer — click Next through everything
4. After installing, in a NEW Command Prompt window type:
   ```
   node --version
   npm --version
   ```
   You should see version numbers for both.

---

## STEP 4 — SET UP YOUR PROJECT IN VS CODE

1. Open VS Code
2. Go to **File → Open Folder**
3. Navigate to your `portfolio` folder and click **Select Folder**
4. Open the built-in terminal: press **Ctrl + `** (backtick key)

---

## STEP 5 — CREATE A GITHUB ACCOUNT & REPOSITORY

### 5A — Create Account
1. Go to **https://github.com**
2. Click **Sign Up** and create a free account
3. Choose a username like `amal-joseph` or `amaljoseph-cyber`

### 5B — Create a New Repository
1. After logging in, click the **+** button (top right) → **New repository**
2. Fill in:
   - **Repository name:** `portfolio` (exactly this, lowercase)
   - **Description:** `My cybersecurity portfolio — HTML, CSS, JS, Node.js, PostgreSQL`
   - **Public** ✅ (must be Public for free GitHub Pages)
   - Do NOT check "Add README" or any other options
3. Click **Create repository**
4. GitHub will show you a page with setup commands — **keep this page open**

---

## STEP 6 — INITIALIZE GIT & PUSH TO GITHUB

In VS Code terminal (make sure you're in the `portfolio` folder):

```bash
# Step 1: Initialize a new Git repository
git init

# Step 2: Add ALL your files to staging
git add .

# Step 3: Make your first commit
git commit -m "Initial commit: portfolio website"

# Step 4: Rename branch to 'main'
git branch -M main

# Step 5: Connect to GitHub (REPLACE with YOUR GitHub username!)
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git

# Step 6: Push your code to GitHub
git push -u origin main
```

✅ Go to `https://github.com/YOUR-USERNAME/portfolio` — you should see all your files!

---

## STEP 7 — ENABLE GITHUB PAGES

1. In your GitHub repository, click **Settings** (top tab)
2. In the left sidebar, click **Pages**
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

That's it! Now every time you push code, GitHub Actions will automatically:
1. Run the CI tests (check your files exist)
2. Deploy to GitHub Pages

### Trigger your first deployment:
Make a small edit to your README or any file, then push:
```bash
git add .
git commit -m "Trigger first deployment"
git push
```

Go to: **Actions tab** in GitHub → watch your pipeline run!

After ~2 minutes, your site will be live at:
```
https://YOUR-USERNAME.github.io/portfolio
```

---

## STEP 8 — SET UP THE BACKEND (Node.js + PostgreSQL)

### 8A — Install backend dependencies
In VS Code terminal:
```bash
# Go into the backend folder
cd backend

# Install Node.js packages
npm install

# Go back to root
cd ..
```

### 8B — Create a FREE PostgreSQL database on Neon.tech
1. Go to **https://neon.tech** (free PostgreSQL hosting)
2. Sign up with GitHub
3. Click **New Project**
4. Name it: `portfolio-db`
5. Choose region: **AWS / Asia Pacific (Mumbai)**
6. Click **Create Project**
7. Copy the **Connection string** — it looks like:
   ```
   postgresql://user:password@ep-xxx.ap-south-1.aws.neon.tech/neondb?sslmode=require
   ```

### 8C — Test the backend locally
Create a file called `.env` inside the `backend` folder:
```
DATABASE_URL=postgresql://user:password@ep-xxx.../neondb?sslmode=require
ADMIN_KEY=mysecretkey123
NODE_ENV=development
```

In VS Code terminal:
```bash
cd backend
npm run dev
```

You should see:
```
✅ Database table ready
🚀 Server running on port 3000
```

Open your browser and go to: `http://localhost:3000`
You should see: `{"status":"online","message":"Amal Joseph Portfolio API is running!"}`

Press **Ctrl + C** to stop the server.

---

## STEP 9 — CREATE A SEPARATE GITHUB REPO FOR THE BACKEND

The frontend (GitHub Pages) and backend (Render.com) need separate repos.

```bash
# Go into backend folder
cd backend

# Initialize Git
git init
git add .
git commit -m "Initial backend: Node.js + Express + PostgreSQL"
git branch -M main

# Create a new repo on GitHub called 'portfolio-backend'
# Then connect and push:
git remote add origin https://github.com/YOUR-USERNAME/portfolio-backend.git
git push -u origin main
```

---

## STEP 10 — DEPLOY BACKEND ON RENDER.COM

1. Go to **https://render.com** and sign up with GitHub
2. Click **New** → **Web Service**
3. Connect your GitHub account and select **portfolio-backend** repo
4. Fill in settings:
   - **Name:** `amal-portfolio-backend`
   - **Region:** `Singapore (Southeast Asia)`
   - **Branch:** `main`
   - **Root Directory:** (leave blank)
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** **Free**
5. Under **Environment Variables**, add:
   ```
   DATABASE_URL    = postgresql://your-neon-connection-string
   ADMIN_KEY       = mysecretkey123
   NODE_ENV        = production
   ```
6. Click **Create Web Service**

Render will deploy your backend. After ~3 minutes you'll get a URL like:
```
https://amal-portfolio-backend.onrender.com
```

Test it: open that URL in browser — you should see the API response!

---

## STEP 11 — CONNECT FRONTEND TO BACKEND

Open `script.js` in VS Code and find this line near the bottom:
```javascript
const BACKEND_URL = 'https://YOUR-BACKEND.onrender.com/api/contact';
```

Replace `YOUR-BACKEND` with your actual Render.com subdomain:
```javascript
const BACKEND_URL = 'https://amal-portfolio-backend.onrender.com/api/contact';
```

Also open `backend/server.js` and update the CORS origin:
```javascript
origin: [
  'https://YOUR-USERNAME.github.io',   // ← change YOUR-USERNAME
  'http://localhost:3000',
  'http://127.0.0.1:5500'
],
```

Then push both changes:
```bash
# Push frontend changes
git add .
git commit -m "Connect contact form to backend"
git push

# Push backend changes
cd backend
git add .
git commit -m "Update CORS for GitHub Pages"
git push
```

---

## STEP 12 — PERSONALISE YOUR PORTFOLIO

Open `index.html` and update these sections:

### Your Photo
Place your photo file (named `photo.jpg`) in the portfolio root folder.
The `<img>` tag in the About section will automatically show it.

### Links
Search for and replace:
- `your@email.com` → your real email
- `yourusername` in GitHub link → your GitHub username
- `yourusername` in LinkedIn link → your LinkedIn username

### Projects
Update the 4 project cards with YOUR actual projects.

### Skills
Adjust the skill percentages in style.css and the certifications list.

---

## STEP 13 — YOUR WORKFLOW IN ACTION

Every time you make changes:
```bash
# 1. Save your files in VS Code
# 2. Stage changes
git add .

# 3. Commit with a meaningful message
git commit -m "Update skills section with new certification"

# 4. Push to GitHub
git push
```

GitHub Actions will automatically:
- ✅ Run CI checks (test files exist, check for TODOs)
- 🚀 Deploy to GitHub Pages if all checks pass

Watch it happen: go to your repo → **Actions tab**!

---

## 🏁 FINAL CHECKLIST

| Item | Status |
|------|--------|
| Portfolio website (HTML/CSS/JS) | ✅ Created |
| Git installed & configured | Do it |
| GitHub repository created | Do it |
| Code pushed to GitHub | Do it |
| GitHub Actions CI/CD pipeline | ✅ Created (auto-runs) |
| GitHub Pages live | Happens automatically |
| Node.js backend created | ✅ Created |
| PostgreSQL database (Neon.tech) | Do it |
| Backend deployed on Render.com | Do it |
| Contact form connected to backend | Update URL |
| Portfolio personalised | Update content |

---

## 🛠️ TROUBLESHOOTING

**Git push asks for password:**
→ Use a GitHub Personal Access Token instead. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Generate new token (classic). Use the token as your password.

**GitHub Pages shows 404:**
→ Wait 2-3 minutes. Check the Actions tab for errors.

**Render backend shows "Service Unavailable":**
→ Free tier sleeps after 15 mins of inactivity. First request takes ~30 seconds to wake up.

**Contact form shows "Backend not connected":**
→ Make sure you updated the BACKEND_URL in script.js with your real Render URL.

**CORS error in browser console:**
→ Make sure your GitHub Pages URL is in the `origin` array in `backend/server.js`.

---

*Built by Amal Joseph · BCA Cybersecurity · Modern Web Development Workflow*
