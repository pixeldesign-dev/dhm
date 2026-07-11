# DHM — Dirt Hunter Molecules Website

A 4-page corporate product website (Home, About Us, Products, Contact) built from the brochure sitemap, as static HTML/CSS/JS — no build step required.

## Structure
```
dhm-site/
├── index.html        Home
├── about.html         About Us
├── products.html       Products (search, category filter, detail modal)
├── contact.html        Contact (inquiry form, map placeholder, FAQ)
├── css/style.css       Design system + all page styles
└── js/
    ├── main.js         Shared behaviour + product data (DHM_PRODUCTS)
    └── products.js      Product grid render, search/filter, modal
```

## Backend (PHP)
The contact form and the newsletter form (in every footer) post to real PHP scripts in `/php`:

- `php/send-inquiry.php` — validates the contact form, emails it to the address set in `$toEmail` (uses PHP's built-in `mail()`), logs a copy to `php/inquiries.log`, then redirects back to `contact.html?status=success` or `?status=error`.
- `php/subscribe.php` — validates the newsletter email, appends it to `php/subscribers.csv`, then redirects back to whichever page the form was on with `?newsletter=success` or `?newsletter=error`.

### To go live
1. Upload the whole `dhm-site` folder to any PHP host (shared hosting, cPanel, etc. — no special setup needed since it only uses core PHP, no Composer packages required).
2. Open `php/send-inquiry.php` and change `$toEmail` to the inbox that should receive inquiries.
3. Make sure `php/` is writable by PHP (for `inquiries.log` and `subscribers.csv`) — default permissions are usually fine.
4. If your host's `mail()` doesn't work (common on local dev servers like XAMPP), swap in PHPMailer + SMTP — instructions are commented at the bottom of `send-inquiry.php`.

### Local testing
PHP needs its own server (a plain `python3 -m http.server` won't execute `.php` files):
```
cd dhm-site
php -S localhost:8000
```
Then visit http://localhost:8000

## Run it (static preview only, no form submission)
No server required for browsing the pages — open `index.html` directly in a browser. Form submissions only work once served through PHP (see above).


## Backend (PHP)
The contact form and newsletter signup post to real PHP scripts — no JavaScript fetch/AJAX needed, plain HTML `<form action="..." method="POST">`:

- `php/send-inquiry.php` — handles the contact page inquiry form. Validates input, emails the inquiry to `dhm84898@gmail.com` (edit `$toEmail` at the top of the file), and saves a backup copy to `php/inquiries.log`. Redirects back to `contact.html?status=success` or `?status=error`, which the page reads to show the confirmation/error banner. Includes a honeypot field (`name="website"`, hidden via CSS) for basic spam protection.
- `php/subscribe.php` — handles the footer newsletter form on every page. Saves the email to `php/subscribers.csv` and redirects back to whichever page the form was submitted from with `?newsletter=success` or `?newsletter=error`.

**To go live**: upload the whole folder to any PHP-enabled host (cPanel, Hostinger, GoDaddy, etc.). PHP's built-in `mail()` function needs a configured mail server, which most shared hosting provides out of the box. If your host blocks `mail()` (common on local dev), swap the "SEND EMAIL" section in `send-inquiry.php` for SMTP/PHPMailer — instructions are in a comment at the bottom of that file. Either way, submissions are never lost: they're always written to `inquiries.log` / `subscribers.csv` first.

To test locally with PHP installed:
```
cd dhm-site
php -S localhost:8000
```
then visit http://localhost:8000

## Customize
- **Products**: edit the `DHM_PRODUCTS` array in `js/main.js`. Every product card and detail modal on the Products page is generated from this list, so adding/removing a product only requires editing one object.
- **Colors / type**: all design tokens (colors, fonts, radius) are CSS variables at the top of `css/style.css` under `:root`.
- **Contact form / newsletter**: forms currently show a front-end "submitted" confirmation only (no backend). Wire `js/main.js`'s `form[data-demo-form]` submit handler to your endpoint (e.g. Formspree, or your own API) to actually receive submissions.
- **Real photography**: product "bottle" shapes and the hero/about imagery are CSS-built placeholders so the site works without external assets. Swap the `.shot`, `.swatch`, `.split-media` backgrounds for real `<img>` photography when available.
- **Map**: the contact page map is a placeholder. Replace `.map-box` with a Google Maps embed `<iframe>` once you have an API key/place ID.

## Design notes
Palette is deep petrol/teal (`--ink`) with a hazard-yellow accent (`--accent`), echoing chemical-drum signage — product cards and section eyebrows use a monospace "spec label" device (REF codes, batch-style tags) as the visual signature, tying the UI back to the subject matter (industrial chemical manufacturing).
