# Junye Zhou — portfolio site

Static portfolio published with **GitHub Pages**.

## Live URL (no `/website/` in the path)

**https://moonlitjaderabbit.github.io/**

That URL works when this repo is named **`MoonlitJadeRabbit.github.io`** (see setup below).

## One-time GitHub setup (required)

### 1. Rename the repository (removes `/website/` from the URL)

1. Open [github.com/MoonlitJadeRabbit/website/settings](https://github.com/MoonlitJadeRabbit/website/settings)
2. Under **Repository name**, change `website` → **`MoonlitJadeRabbit.github.io`**
3. Click **Rename**

Then update your local clone:

```powershell
git -c safe.directory="D:/Junye Website" remote set-url origin https://github.com/MoonlitJadeRabbit/MoonlitJadeRabbit.github.io.git
```

### 2. Turn on GitHub Pages

1. Open **Settings → Pages** on the renamed repo
2. **Build and deployment → Source:** choose **Deploy from a branch**
3. **Branch:** `gh-pages` · **Folder:** `/ (root)` · **Save**
4. Wait 1–3 minutes, then open **https://moonlitjaderabbit.github.io/**

The workflow `.github/workflows/pages.yml` updates the `gh-pages` branch whenever you push to `main`.

### Custom domain (`junyezhou.com`)

In **Settings → Pages**, add your domain, then set DNS at your registrar to the records GitHub shows.

## Local preview

```bash
npx --yes serve .
```

## Deploy updates

```powershell
git -c safe.directory="D:/Junye Website" add -A
git -c safe.directory="D:/Junye Website" commit -m "Describe your change"
git -c safe.directory="D:/Junye Website" push
```
