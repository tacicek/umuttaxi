# UmutTaxi - Premium Taxiservice Zürich-Schwerzenbach

Eine moderne, responsive Website für UmutTaxi, einen professionellen Taxiservice in Zürich-Schwerzenbach.

## 🚗 Über das Projekt

UmutTaxi bietet zuverlässige Transportdienstleistungen in Zürich-Schwerzenbach:

- **Flughafentransfer** - Pünktlich und stressfrei zum oder vom Flughafen Zürich
- **Limousinenservice** - Elegante Fahrten für Geschäftskunden oder besondere Anlässe
- **Schülertransport** - Sicherer Service für Schulkinder
- **Hoteltransfer** - Fahrten von/zum Hotel für Ihre Gäste

## 🛠 Technischer Stack

- **Astro** - Schnelle, statische Website-Generierung
- **Tailwind CSS** - Responsive Design-System
- **Markdown Content** - Einfache Content-Verwaltung
- **Google Maps Embed** - Interaktive Karten für Standortanzeige

## 🗺️ Google Maps Integration

Das Projekt integriert Google Maps für die Standortanzeige:

### Konfiguration
- **API Key**: Erforderlich für Google Maps JavaScript API
- **Client ID**: `691118319740-v6ppj9irerj6q6o5aa658muaapqp5mqf.apps.googleusercontent.com`
- **Standort**: Zürich-Schwarztenbach (47.3769, 8.5417)
- **Standort**: Zürich-Schwerzenbach (47.3769, 8.5417)

### Google Maps API Key einrichten

1. **Google Cloud Console öffnen**:
   - Gehen Sie zu [Google Cloud Console](https://console.cloud.google.com/)
   - Melden Sie sich mit Ihrem Google-Konto an

2. **Neues Projekt erstellen** (falls noch nicht vorhanden):
   - Klicken Sie auf "Projekt auswählen" → "Neues Projekt"
   - Geben Sie einen Projektnamen ein (z.B. "UmutTaxi")
   - Klicken Sie auf "Erstellen"

3. **Google Maps JavaScript API aktivieren**:
   - Gehen Sie zu "APIs & Services" → "Bibliothek"
   - Suchen Sie nach "Maps JavaScript API"
   - Klicken Sie darauf und dann auf "Aktivieren"

4. **API Key erstellen**:
   - Gehen Sie zu "APIs & Services" → "Anmeldedaten"
   - Klicken Sie auf "+ ANMELDEDATEN ERSTELLEN" → "API-Schlüssel"
   - Kopieren Sie den generierten API-Schlüssel

5. **API Key konfigurieren**:
   - Öffnen Sie `src/config/google-maps.js`
   - Ersetzen Sie `YOUR_GOOGLE_MAPS_API_KEY_HERE` mit Ihrem API-Schlüssel:

```javascript
export const GOOGLE_MAPS_CONFIG = {
  apiKey: 'IHRE_ECHTE_API_KEY_HIER', // Hier Ihren API-Schlüssel einfügen
  clientId: '691118319740-v6ppj9irerj6q6o5aa658muaapqp5mqf.apps.googleusercontent.com',
  defaultLocation: {
    lat: 47.3769,
    lng: 8.5417,
    zoom: 13
  }
};
```

6. **API Key einschränken** (empfohlen):
   - Gehen Sie zurück zu "Anmeldedaten"
   - Klicken Sie auf Ihren API-Schlüssel
   - Unter "Anwendungseinschränkungen" wählen Sie "HTTP-Verweise"
   - Fügen Sie Ihre Domain hinzu (z.B. `localhost:4321`, `umuttaxi.ch`)

### Verwendung
Die Google Maps Integration ist in folgenden Komponenten verfügbar:
- `src/components/GoogleMaps.astro` - Wiederverwendbare Maps-Komponente
- Service-Seiten (Sidebar)
- Kontakt-Seite
- Homepage (Standort-Sektion)

### Features
- Interaktive Karte mit benutzerdefiniertem Marker
- Info-Window mit Firmeninformationen
- Responsive Design
- Optimierte Performance
- Fallback-Anzeige wenn API Key nicht konfiguriert ist

## 🚀 Installation und Entwicklung

### Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn

### Installation

1. Repository klonen:
```bash
git clone <repository-url>
cd umuttaxi
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Entwicklungsserver starten:
```bash
npm run dev
```

4. Browser öffnen und zu `http://localhost:4321` navigieren

### Build für Produktion

```bash
npm run build
```

### Preview des Builds

```bash
npm run preview
```

## 📁 Projektstruktur

```
umuttaxi/
├── src/
│   ├── components/
│   │   └── GoogleMaps.astro        # Google Maps Komponente
│   ├── config/
│   │   └── google-maps.js          # Google Maps Konfiguration
│   ├── content/
│   │   └── projects/
│   │       └── umuttaxi.md          # Projektbeschreibung
│   ├── layouts/
│   │   ├── BaseLayout.astro         # Basis-Layout
│   │   └── ServicePage.astro        # Layout für Service-Seiten
│   ├── pages/
│   │   ├── index.astro              # Startseite
│   │   ├── ueber-uns.astro          # Über uns
│   │   ├── kontakt.astro            # Kontakt
│   │   ├── flughafentransfer.astro  # Flughafentransfer
│   │   ├── limousinenservice.astro  # Limousinenservice
│   │   ├── schuelertransport.astro  # Schülertransport
│   │   └── hoteltransfer.astro      # Hoteltransfer
│   └── styles/
│       └── global.css               # Globale Styles
├── public/
│   ├── images/                      # Bilder und Assets
│   └── favicon.svg                  # Favicon
├── astro.config.mjs                 # Astro Konfiguration
├── tailwind.config.mjs              # Tailwind CSS Konfiguration
└── package.json                     # Projektabhängigkeiten
```

## 🎨 Design-Features

### Persistente Site-Sektion
- **Sticky Header** mit "Jetzt anrufen" und "Angebot anfordern" Buttons
- **Mobile-First Design** - besonders prominent auf mobilen Geräten
- **Kontaktformular** mit allen erforderlichen Feldern

### Service-Seiten Layout
- **Linke Seite**: Hauptinhalt mit Servicebeschreibungen
- **Rechte Seite**: Sidebar mit Kontaktinformationen und Formular
- **Responsive Design** für alle Bildschirmgrößen

### Kontaktformular
Das umfassende Kontaktformular enthält:
- Abholadresse (Abholadresse)
- Zieladresse (Zieladresse)
- Datum und Uhrzeit (Datum und Uhrzeit)
- Name (Name)
- Telefonnummer (Telefonnummer)

## 🌐 Seiten

1. **Startseite** (`/`) - Übersicht aller Services + Standort-Karte
2. **Über uns** (`/ueber-uns`) - Firmengeschichte und Team
3. **Kontakt** (`/kontakt`) - Kontaktformular, Informationen und Karte
4. **Flughafentransfer** (`/flughafentransfer`) - Airport Transfer Service
5. **Limousinenservice** (`/limousinenservice`) - Limousine Service
6. **Schülertransport** (`/schuelertransport`) - School Transport
7. **Hoteltransfer** (`/hoteltransfer`) - Hotel Transfer Service

## 🎯 SEO-Optimierung

- **Meta-Tags** für alle Seiten
- **Open Graph** und **Twitter Cards** Support
- **Strukturierte Daten** für bessere Suchmaschinen-Indexierung
- **Sitemap** automatisch generiert
- **Robots.txt** für Suchmaschinen-Crawler

## 📱 Responsive Design

- **Mobile-First** Ansatz
- **Tablet** und **Desktop** optimiert
- **Touch-friendly** Interface
- **Fast Loading** durch Astro's statische Generierung

## 🔧 Konfiguration

### Tailwind CSS
Das Design-System verwendet eine angepasste Farbpalette:
- **Primary**: Blau-Töne (#3b82f6 bis #1e3a8a)
- **Gray**: Neutral-Grau-Töne
- **Custom Fonts**: Inter Font Family

### Astro Konfiguration
- **Site URL**: https://umuttaxi.ch
- **Base Path**: /
- **Build Output**: Static
- **Trailing Slash**: Never

### Google Maps
- **API Key**: Konfiguriert in `src/config/google-maps.js`
- **Default Location**: Zürich-Schwarztenbach
- **Custom Marker**: UmutTaxi Branding
- **Info Windows**: Firmeninformationen

## 📞 Kontakt

**UmutTaxi**
- Telefon: +41 44 123 45 67
- Email: info@umuttaxi.ch
- Adresse: Zürich-Schwerzenbach, Schweiz
- Verfügbarkeit: 24/7

## 📄 Lizenz

Dieses Projekt ist für UmutTaxi entwickelt und alle Rechte vorbehalten.

---

**Entwickelt mit ❤️ für UmutTaxi**
