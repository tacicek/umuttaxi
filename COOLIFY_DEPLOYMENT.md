# Coolify Deployment – UmutTaxi

Diese Seite läuft als **Astro (hybrid) + Node** App in einem Docker-Container.
Alle Seiten sind statisch vorgerendert; nur `/api/submit` läuft auf dem Node-Server
und verschickt die Formular-E-Mails über Resend.

## Voraussetzungen
- Ein Coolify-Server (self-hosted) mit einer Quelle (GitHub/GitLab Repo oder Git URL).
- Ein Resend-Account mit API-Key und verifizierter Absender-Domain (`RESEND_FROM_EMAIL`).

## 1. Anwendung in Coolify anlegen
1. **Projects → New Resource → Application**.
2. Quelle wählen: dieses Git-Repository, Branch `main`.
3. **Build Pack: `Dockerfile`** auswählen (das Repo enthält bereits ein `Dockerfile`).
   - Coolify erkennt das Dockerfile automatisch; kein Build-/Start-Command nötig.
4. **Port**: `4321` (der Container lauscht auf `0.0.0.0:4321`).

## 2. Environment Variables setzen
Unter **Environment Variables** folgende Werte anlegen (als *Production*):

| Name                | Wert (Beispiel)                     | Pflicht |
|---------------------|-------------------------------------|---------|
| `RESEND_API_KEY`    | `re_xxxxxxxx…`                     | ✅ ja   |
| `RESEND_FROM_EMAIL` | `UmutTaxi <noreply@umuttaxi.ch>`  | empfohlen |
| `SITE_URL`          | `https://taxiumut.ch`             | empfohlen |
| `NODE_ENV`          | `production`                      | optional (im Dockerfile gesetzt) |

- Die Absender-Domain in `RESEND_FROM_EMAIL` muss in Resend unter **Domains**
  verifiziert sein (SPF/DKIM), sonst lehnt Resend den Versand ab. Ohne eigene
  Domain kann zum Testen `onboarding@resend.dev` als Absender genutzt werden.
- `SITE_URL` wird für die absolute Site-URL (SEO / Sitemap) genutzt.
  Setze sie auf deine finale Coolify-Domain.

## 3. Domain & SSL
1. Unter **Domains** die gewünschte Domain eintragen, z. B. `https://taxiumut.ch`.
2. DNS `A`-Record auf die IP des Coolify-Servers zeigen lassen.
3. Coolify stellt automatisch ein Let's-Encrypt-Zertifikat aus (Traefik/Caddy).

## 4. Deploy
- **Deploy** klicken. Coolify baut das Docker-Image (Multi-Stage: `npm ci` →
  `npm run build`) und startet den Container mit `node ./dist/server/entry.mjs`.
- Bei jedem Push auf `main` kann Auto-Deploy aktiviert werden (Webhook in Coolify).

## 5. Nach dem Deploy testen
1. Startseite öffnen → lädt normal (statisch).
2. **Buchungsformular** (Startseite) und **Kontaktformular** (`/kontakt`) sowie das
   **Schnelle-Anfrage-Formular** (Service-Seiten) absenden → Weiterleitung auf `/danke`.
3. Prüfen, dass die E-Mail bei `tuncaycicek@outlook.com`
   (CC `adem.polat03@hotmail.com`) ankommt.

Falls keine Mail ankommt: In Coolify die **Container-Logs** ansehen. Bei fehlendem
Key erscheint dort `RESEND_API_KEY is not set`; bei Resend-Fehlern die
Antwort-Details des API-Calls.

## Architektur-Notiz (Migration von Netlify)
Die frühere Lösung nutzte **Netlify Forms** + `netlify/functions/submission-created.js`.
Beides ist Netlify-spezifisch und funktioniert auf Coolify nicht. Ersetzt durch:
- `src/pages/api/submit.js` – Astro-Server-Endpoint, identische E-Mail-Templates, Versand über Resend.
- Formulare posten jetzt per `fetch` an `/api/submit` (statt an `/`).
- `astro.config.mjs` – `output: 'hybrid'` + `@astrojs/node` (standalone) Adapter.

Die Dateien `netlify.toml`, `netlify/` und `vercel.json` sind für Coolify nicht nötig
(im `.dockerignore` ausgeschlossen), können aber als Referenz im Repo bleiben.

## Lokal testen wie in Produktion
```bash
npm ci
npm run build
RESEND_API_KEY=re_xxx "RESEND_FROM_EMAIL=UmutTaxi <noreply@umuttaxi.ch>" \
  HOST=0.0.0.0 PORT=4321 npm run serve
# -> http://localhost:4321
```

Oder direkt mit Docker:
```bash
docker build -t umuttaxi .
docker run -p 4321:4321 \
  -e RESEND_API_KEY=re_xxx \
  -e "RESEND_FROM_EMAIL=UmutTaxi <noreply@umuttaxi.ch>" \
  -e SITE_URL=https://taxiumut.ch \
  umuttaxi
```
