# Quran MP3 Web-Anwendung

Eine Web-Anwendung zum Hören und Lesen des Heiligen Quran mit verschiedenen Funktionen.

## Funktionen

- Quran Audio-Player mit verschiedenen Rezitatoren
- Live-Übertragung islamischer Kanäle
- PDF Quran-Viewer mit Tajweed-Regeln
- Quran Radio
- Tafseer (Interpretation) des Quran

## Technologien

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- PDF.js für PDF-Anzeige
- HLS.js für Live-Streaming

## Installation

1. Repository klonen:

```sh
git clone https://github.com/username/quraanmp3.git
```

2. In das Projektverzeichnis wechseln:

```sh
cd quraanmp3
```

3. Einen lokalen Server starten, z.B. mit VS Code Live Server Extension

## API

Die Anwendung nutzt die MP3Quran.net API v3 für:

- Rezitator-Liste
- Quran Audio-Dateien
- Surah-Informationen

## Struktur

```
quraanmp3/
├── index.html           # Hauptseite mit Audio-Player
├── quraanPDF.html      # PDF Viewer
├── quranRadio.html     # Radio-Streaming
├── tafseer.html        # Tafseer-Seite
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── webfonts/
├── vendor/             # 3rd Party Libraries
└── pdfjs/             # PDF.js Bibliothek
```

## Lizenz

MIT

## Autor

Amru Abd
