# CineBuddy USA Website

Static website for CineBuddy USA, a request-based discounted Regal movie ticket assistance service.

## Deploy To GitHub Pages

1. Create a GitHub repository, for example `Cinebuddy_website`.
2. Push this folder to that repository.
3. In GitHub, open the repository settings.
4. Go to **Pages**.
5. Under **Build and deployment**, select:
   - Source: **Deploy from a branch**
   - Branch: **master**
   - Folder: **/ root**
6. Save.

The public website URL will look like:

```text
https://YOUR_GITHUB_USERNAME.github.io/Cinebuddy_website/
```

If the repository is named exactly `YOUR_GITHUB_USERNAME.github.io`, the URL will be:

```text
https://YOUR_GITHUB_USERNAME.github.io/
```

## Customer Flow

Customers fill the ticket request form on the website. On submit, WhatsApp opens with a pre-filled request message addressed to the CineBuddy number.

The community WhatsApp button opens the CineBuddy WhatsApp group invite.

## Updating Movie Details

Movie releases, poster URLs, pricing examples, customer feedback, and update sections are currently edited directly in:

- `index.html`
- `styles.css`
- `script.js`

For regular updates, ask Codex to:

1. Check the latest Indian movies showing at Regal.
2. Update the release cards, poster URLs, and source note.
3. Update community/review/box office text if needed.
4. Run a quick local consistency check.
5. Commit and push the changes.

Recommended update frequency:

- Every 3 to 4 days for movie releases and poster freshness.
- Once per week for feedback, pricing examples, and community content.

## Useful Git Commands

```powershell
git status
git add .
git commit -m "Update CineBuddy website"
git push
```
