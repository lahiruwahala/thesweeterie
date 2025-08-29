# The Sweeterie – Website (Next.js on Vercel)

This folder is ready to deploy. No coding tools needed.

## What you will do (high level)
1) Create a **GitHub** account and upload this folder.
2) Create a **Vercel** account and import the GitHub project.
3) Click **Deploy**. You get a live website link (with SSL).
4) Point your **custom domain** (optional).

---

## Step-by-step (non-technical)

### 1) Get the files ready
- Unzip the file you downloaded so you have a folder called `the-sweeterie`.

### 2) Put the site on GitHub (free)
1. Go to https://github.com and **Sign up** (or Sign in).
2. Click **+** (top-right) → **New repository**.
3. Name it `the-sweeterie` → keep it **Public** → click **Create repository**.
4. On the new repo page, click **“Uploading an existing file”** (or **Add file → Upload files**).
5. Drag the **contents of the folder** (everything inside `the-sweeterie`, not the folder itself) into GitHub.
6. Scroll down → **Commit changes**.

### 3) Deploy to Vercel (free)
1. Go to https://vercel.com and **Sign up** with your GitHub account.
2. Click **Add New… → Project** (or **New Project**).
3. Find `the-sweeterie` → click **Import**.
4. Vercel will auto-detect **Next.js**. Keep defaults → click **Deploy**.
5. After the build finishes, click the link it shows (e.g. `https://the-sweeterie.vercel.app`) — your site is live!

### 4) Update your email address (so orders go to you)
1. In GitHub, open **app/page.tsx**.
2. Click the ✏️ (edit) icon.
3. Find: `const OWNER_EMAIL = "orders@example.com.au"` and change to your email.
4. Scroll down → **Commit changes**. Vercel redeploys automatically.

### 5) Connect your domain (optional)
1. In Vercel, open your project → **Settings → Domains** → **Add**.
2. Type your domain (e.g. `thesweeterie.com.au`) → **Add**.
3. Vercel shows DNS records. Copy these into your domain provider’s DNS settings.
4. Wait a few minutes — Vercel will issue SSL automatically.

### 6) Edit text, images, prices
- Edit the file **app/page.tsx** on GitHub (click ✏️), then **Commit**. Each change makes a new deployment.
- Replace gallery images by updating the `GALLERY` list in `app/page.tsx`.
- Change prices in the `CAKES` list.

---

## Optional (send emails without opening the mail app)
Right now, checkout opens a pre-filled email. For a more professional flow, later you can add a serverless function using a provider like Resend or SendGrid.

---

## Support notes
- If you see a build error on Vercel, click **View Build Logs**. Most issues are a typo in `page.tsx` — use **Undo** if unsure.
- You can always revert to a previous version from the **Deployments** tab in Vercel.
