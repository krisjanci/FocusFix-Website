# FocusFix Website

## What it is

This is the website for my FocusFix macOS app. I want it to be simple: the logo, one slogan, a download button and instructions underneath. I don't need a big marketing page for one app.

For now it's just local. The download button gives me the cat placeholder, not the app installer.

## How to run it

From the `FocusFix-Website` folder, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Then open http://127.0.0.1:8000 in my browser. Control-C in the terminal stops it.

I can also open `dist/index.html` directly in a browser for a quick look. No packages need installing. This runs the website, not the macOS app.

## What I want to add later

- Replace the cat download with the actual app once it's tested, signed and notarized.
- Put a tutorial video directly under the download button to show how to set up and use FocusFix.
- Add a written manual below the video. I'm leaving space for it, but not writing it until the app is more complete.
- Add the release version, supported Macs and the permission/privacy information people need before installing.
- Publish the website when the download and instructions are ready. If I use it for the study, I'll get the participant-facing material reviewed first.
