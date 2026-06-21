# Halal Scan Korea — Setup Guide (zero coding experience required)

This guide assumes you've never used a terminal before. Follow it top to
bottom, in order. Each step says exactly what to click or type.

---

## Part 0 — Install two free programs on your computer

You only need to do this once, ever.

1. **Node.js** (lets your computer run this project)
   - Go to https://nodejs.org
   - Download the version labeled **LTS**
   - Run the installer, click Next through everything (defaults are fine)

2. **Git** (lets you upload code to GitHub)
   - Go to https://git-scm.com/downloads
   - Download for your OS, run the installer, defaults are fine

3. **A code editor** (optional, but nice for peeking at things) — install
   **VS Code**: https://code.visualstudio.com

4. Restart your computer after installing these (avoids path issues).

### Open a terminal

- **Windows**: press the Windows key, type `cmd`, press Enter
- **Mac**: press Cmd+Space, type `Terminal`, press Enter

You'll paste commands into this window throughout. To paste: right-click,
or Cmd+V / Ctrl+V.

---

## Part 1 — Get the project onto your computer

I've already built the full project for you. Download the zip I shared,
then:

1. Unzip it somewhere easy to find, e.g. your Desktop. You should end up
   with a folder called `halal-scanner`.
2. In your terminal, navigate into it. Example (adjust the path):
   ```
   cd Desktop/halal-scanner
   ```
3. Install the project's dependencies (downloads the building blocks the
   app needs — only takes a minute):
   ```
   npm install
   ```

---

## Part 2 — Create your Supabase project (the database)

1. Go to https://supabase.com and log into your account.
2. Click **New Project**.
3. Fill in:
   - **Name**: `halal-scanner` (or anything)
   - **Database password**: click "Generate a password" and **save it
     somewhere safe** (a notes app). You won't need to type it manually,
     but keep it just in case.
   - **Region**: pick the one closest to Korea (e.g. Northeast Asia /
     Seoul if available, otherwise Singapore or Tokyo)
4. Click **Create new project**. Wait ~2 minutes for it to provision.

### Run the database schema

1. In the left sidebar of your new Supabase project, click the **SQL
   Editor** icon (looks like a terminal/code symbol).
2. Click **New query**.
3. Open the file `supabase/schema.sql` from the project folder (in VS
   Code, or any text editor) — select all the text, copy it.
4. Paste it into the Supabase SQL editor.
5. Click **Run** (bottom right, or Ctrl+Enter).
6. You should see "Success. No rows returned." That means your tables
   (`products`, `moderators`, `haram_keywords`, `ambiguous_keywords`) were
   created, pre-loaded with a starter list of haram/ambiguous ingredients.

### Get your API keys

1. In the left sidebar, click the **gear icon → Project Settings**, then
   **API** (or **API Keys**, depending on Supabase's current layout).
2. You'll see three values you need:
   - **Project URL** → looks like `https://xxxxx.supabase.co`
   - **anon / public key** → a long string
   - **service_role key** → another long string, click "Reveal" to see it.
     **Keep this one secret** — never put it in anything public.

### Put the keys into your project

1. In the `halal-scanner` folder, find the file `.env.local.example`.
2. Make a copy of it and rename the copy to exactly `.env.local`
   (no `.example` at the end).
3. Open `.env.local` in a text editor and fill in the three values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your anon key...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...your service role key...
   ```
4. Save the file.

### Test it locally (optional but recommended)

In your terminal, inside the project folder:
```
npm run dev
```
Then open http://localhost:3000 in your browser. You should see the
"Halal Scan Korea" homepage. (Camera scanning may not work over
`localhost` in some browsers — that's normal, it'll work once deployed
with HTTPS on Vercel.) Press Ctrl+C in the terminal to stop it.

---

## Part 3 — Create yourself as a moderator

1. Back in Supabase, left sidebar → **Authentication** → **Users**.
2. Click **Add user** → **Create new user**.
3. Enter your email and a password you'll remember. Click **Create user**.
4. Copy the new user's **UID** (shown in the users list — a long string
   like `a1b2c3d4-...`).
5. Go to **SQL Editor → New query**, paste this (replace the values):
   ```sql
   insert into moderators (id, email, role)
   values ('PASTE-THE-UID-HERE', 'your-email@example.com', 'admin');
   ```
6. Click **Run**.

Repeat steps 2–6 for each trusted moderator you want to add (use
`'moderator'` as the role instead of `'admin'` for non-admins — both can
certify products in this version).

---

## Part 4 — Put the code on GitHub

1. Go to https://github.com and log in.
2. Click the **+** icon (top right) → **New repository**.
3. Name it `halal-scanner`. Leave it **Private** (recommended, since your
   code will reference your project structure) or Public, your choice.
   **Do not** check "Add a README" (you already have one).
4. Click **Create repository**.
5. GitHub will show you commands. Back in your terminal, inside the
   `halal-scanner` folder, run these one at a time:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/halal-scanner.git
   git push -u origin main
   ```
   Replace `YOUR-USERNAME` with your actual GitHub username. It may open
   a browser window asking you to log into GitHub — do that.
6. Refresh your GitHub repo page — your code should now be there.

   Note: `.env.local` (your secret keys) will **not** be uploaded — that's
   intentional and safe, it's excluded automatically.

---

## Part 5 — Deploy to Vercel

1. Go to https://vercel.com and log in (use "Continue with GitHub" if
   possible, it's the easiest).
2. Click **Add New… → Project**.
3. Find your `halal-scanner` repo in the list and click **Import**.
4. Before clicking Deploy, expand **Environment Variables** and add the
   same three values from your `.env.local`:
   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | your service role key |
5. Click **Deploy**. Wait 1–2 minutes.
6. You'll get a live URL like `halal-scanner-yourname.vercel.app` —
   that's your real, working website. Open it on your phone and try
   scanning a real product barcode.

From now on, every time you `git push` new changes, Vercel redeploys
automatically.

---

## Part 6 — Try it end to end

1. Open your Vercel URL on your phone.
2. Allow camera access when prompted.
3. Scan a barcode from any packaged food.
4. You should land on a product page with a stamp: Haram / Not Certified
   / Halal Certified.
5. Go to `/admin` on your site, sign in with the moderator account you
   created in Part 3, and try certifying a product with a note.

---

## Troubleshooting

- **Camera doesn't open**: most mobile browsers require HTTPS for camera
  access — this works on the Vercel URL but not always on `localhost`.
  Also check your phone's browser site settings allow camera access.
- **"Not authorized" on /admin**: double check you ran the `insert into
  moderators` SQL with the correct UID from Authentication → Users.
- **Blank/error page after deploy**: check Vercel → your project →
  Settings → Environment Variables — make sure all three are filled in
  exactly, then redeploy (Vercel → Deployments → ⋯ → Redeploy).
- **Want to edit the haram keyword list later**: Supabase → Table Editor
  → `haram_keywords` or `ambiguous_keywords` — add/remove rows directly,
  no code needed. New scans will use the updated list immediately;
  already-scanned products keep their existing result until rescanned.

---

## What's intentionally NOT built yet (possible next steps)

- A way to force-rescan a product already in the cache (currently each
  barcode is only analyzed once, the first time anyone scans it)
- Search/browse without scanning
- Korean-language UI translation (the ingredient text itself shows in
  Korean when available, but buttons/labels are in English)
- Public moderator sign-up (by design — you add moderators manually)

Ask me for any of these and I can build them next.
