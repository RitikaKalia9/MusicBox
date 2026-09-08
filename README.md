# 🎵 Music Box

A browser-based music visualizer. Pick a song, enter a theme (e.g. "cat", "space", "party"), and the page plays the track while flashing theme-matched GIFs in time with the beat, detected live from the audio.

## Features

- **Song picker** – choose from a small built-in playlist (`songs.json`)
- **Beat-reactive visuals** – uses [dancer.js](https://github.com/jsantell/dancer.js) to analyze the audio's frequency spectrum and detect kicks in real time
- **Theme-based GIFs** – enter any word/phrase as a "theme"; matching GIFs are pulled from a small local Flask API and swapped in on every detected kick
- **Play / pause control** with icon toggle

## How it works

| Piece | Role |
|---|---|
| `index.html` | Page structure and script loading order |
| `style.css` | Base layout (course-provided, not meant to be edited) |
| `musicbox-style.css` | Custom styling |
| `script.js` | Main app logic: loads `songs.json`, wires up the form, plays songs, fetches GIFs, swaps GIFs on each kick |
| `audio-player.js` | `AudioPlayer` class — wraps a `Dancer()` instance, exposes `play()`/`pause()`/`setKickCallback()` |
| `lib/dancer.min.js` | Third-party audio-analysis library (MIT licensed) used for beat detection |
| `lib/fetch.js` | `fetch()` polyfill for older browsers |
| `songs.json` | The song list shown in the dropdown (title, artist, hosted MP3 URL) |
| `api.py` | Small local Flask server exposing `GET /api/gifs?theme=<word>`, returning a hard-coded list of Giphy URLs per theme |
| `images/` | Play/pause icons and favicons |

### Files not currently wired up

`index.html` also loads `gif-display.js`, `menu-screen.js`, `music-screen.js`, `play-button.js`, and `visualizer.js`. These reference DOM elements/API routes (`#setThemeButton`, `.music-screen`, `/api/songs`) that don't exist in the current `index.html`/`api.py`. They appear to be leftover scaffolding or an earlier alternate approach — the app's actual behavior is driven entirely by `script.js` + `audio-player.js`. You can safely leave them (they fail silently in the console) or remove the `<script>` tags for them to clean things up.

## Running it locally

You need two things running at once:

**1. The GIF API (Python/Flask)**

```bash
pip install flask flask-cors
python api.py
```

This starts a server at `http://127.0.0.1:5000`.

**2. The front end**

Because the page uses `fetch()` to load `songs.json`, it needs to be served over HTTP (opening `index.html` directly via `file://` will fail). From the project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Known limitations

- The GIF API's data is a small hard-coded dictionary (`nature`, `party`, `excited`, `cat`, `dog`, `space`) — any other theme returns an empty list and the page shows an error message.
- `api.py` runs with `debug=True`, which is fine for local development but should never be used as-is in a production deployment.
- Song audio is streamed from external URLs (`yayinternet.github.io`) rather than hosted in this repo — if that source ever goes down, playback will break.
- No build step / dependency manager for the JS side — everything is plain `<script>` tags.

## License

`lib/dancer.min.js` is MIT-licensed ([source](https://github.com/jsantell/dancer.js)). `lib/fetch.js` is a standard open-source `fetch()` polyfill.
