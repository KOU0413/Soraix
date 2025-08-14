# Soraix HQ Homepage (JA & EN)

This package includes a production-ready, stylish landing site for **soraix.cc** with Japanese and English pages and a modal Formspree form.

## Files
- `index.html` — Japanese landing page (link to `index-en.html`)
- `index-en.html` — English landing page (link back to `index.html`)

## Deploy (EC2 + Nginx)
```bash
sudo mkdir -p /var/www/soraix
sudo cp index.html index-en.html /var/www/soraix/
sudo nginx -t && sudo systemctl reload nginx
```
HTTPS (Let's Encrypt):
```bash
sudo certbot --nginx -d soraix.cc -d www.soraix.cc
```

Form endpoint currently uses `https://formspree.io/f/xanoalzn`. Update both files if needed.
