# FocusFix Website

This repository contains the website for FocusFix, an independently developed macOS app for recording computer activity, labeling work time, and taking breaks. The public app is separate from my N-of-1 study. It will not recruit study participants or collect data for that study.

GitHub Pages publishes the site from `docs/` on the `main` branch. The download points to the latest GitHub Release asset named `FocusFix-macOS.zip`. The current website build is signed and Apple notarized; see `docs/testing.html` for installation steps. The privacy page describes local recording and the planned optional development-sharing feature.

## Preview locally

From this repository, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1 --directory docs
```

Open <http://127.0.0.1:8000/> in a browser. No packages or build step are required.
