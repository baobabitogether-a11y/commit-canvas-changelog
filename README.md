# Minimal Supabase Page

A one-page site that reads rows from a Supabase table.

## Setup: GitHub Actions + Vercel + Supabase

1. **Supabase** — create a project at https://supabase.com/ and run the SQL migrations from `supabase/migrations/` in the SQL editor. Copy your project URL and publishable (anon) key from **Settings → API**.

2. **GitHub** — push this repo to GitHub. In **Settings → Secrets and variables → Actions**, add:
   - `SUPABASE_URL` — your project URL
   - `SUPABASE_PUBLISHABLE_KEY` — your publishable key

3. **GitHub Actions** — create `.github/workflows/ci.yml`:

   ```yaml
   name: CI
   on: [push]
   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm ci
         - run: npm run build
           env:
             VITE_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
             VITE_SUPABASE_PUBLISHABLE_KEY: ${{ secrets.SUPABASE_PUBLISHABLE_KEY }}
   ```

4. **Vercel** — at https://vercel.com/ click **Add New → Project** and import the GitHub repo. In **Settings → Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`

   Click **Deploy**. Vercel now deploys automatically on every commit you push.

5. **Database** — if you use Lovable Cloud instead, no Supabase account is needed; the keys below already work.

## Local development

```sh
npm i
npm run dev
```

