# Nginx Host Reverse Proxy Setup for athoscollagen.com

Follow these commands on your Linux server to replace the existing Nginx configuration file for `athoscollagen.com` with the new Docker proxy setup pointing to port `8091`.

---

## 🛠️ Step-by-Step Server Commands

### Step 1: Remove the old configuration file
```bash
sudo rm -f /etc/nginx/sites-enabled/athoscollagen.com
sudo rm -f /etc/nginx/sites-available/athoscollagen.com
# OR if stored in conf.d:
# sudo rm -f /etc/nginx/conf.d/athoscollagen.conf
```

### Step 2: Create the new Nginx configuration file
```bash
sudo nano /etc/nginx/sites-available/athoscollagen.com
```

Paste the following configuration into the file:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name athoscollagen.com www.athoscollagen.com;

    location / {
        proxy_pass http://127.0.0.1:8091;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 3: Enable the site & test Nginx configuration
```bash
sudo ln -sf /etc/nginx/sites-available/athoscollagen.com /etc/nginx/sites-enabled/
sudo nginx -t
```

### Step 4: Reload Nginx
```bash
sudo systemctl reload nginx
```

---

## 🔒 Optional: SSL (HTTPS) setup with Certbot
If you want to secure `https://athoscollagen.com/` with a free Let's Encrypt SSL certificate:

```bash
sudo certbot --nginx -d athoscollagen.com -d www.athoscollagen.com
```
Certbot will automatically update the Nginx file to handle SSL certificates and HTTP $\rightarrow$ HTTPS redirects.
