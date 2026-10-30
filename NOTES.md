# FocusFix website notes

## Matching the app setup - October 21, 2026

- I updated the privacy page for the app's move from Accessibility to Input Monitoring. If the app isn't listed in Settings, the instructions now explain how to locate the exact running copy and add it manually.

- I changed the storage explanation to the app's private sandbox, with Sessions → Show in Finder and export as the ways to reach recordings. I also made clear that custom break labels are saved.

- I'm using GitHub Issues for general support. Those issues are public, so I added a warning not to post recordings, enrollment credentials or personal information. The page also links to the GPL-licensed app source.

- I checked the local page links and kept the download disabled. This is still a local draft, not a published website or an approved study page. I need the final signed and notarized app, tested requirements, hosting privacy details and another release review before enabling downloads.


### Following the simpler app setup

- I committed the existing website changes one file at a time before the next edit. I haven't pushed them.

- I updated the privacy page again to match the app's single Enable Input Monitoring button. It requests access and opens Settings, where I still have to turn the permission on. The page no longer tells people to look for the removed Finder button. This follow-up is still uncommitted, and the download stays disabled.

- I saved this follow-up and its notes in separate commits, one per file. Nothing was pushed or published, and the download is still disabled.

## Artistic design refresh — October 30, 2026

- Preserved the small landing-page structure, FocusFix icon, “Make time for a break” message, disabled download, tutorial placeholder, written guide placeholder and privacy links.
- Added a warm paper background, expressive serif headline, teal line art, an orbit illustration around the app icon and a restrained footer. System fonts and local assets keep the page independent of external services.
- Added subtle icon/orbit motion, tutorial waves, guide detail animation and section reveals. Pause/Resume motion controls the animations. The operating system's reduced-motion preference disables animation and reveals content immediately. Content remains visible without JavaScript.
- Browser checks passed at 375px and 1280px widths, with no horizontal overflow. Checked the tutorial and guide at phone width, the privacy-page link and layout, the disabled download and the motion toggle. A browser connection timeout interrupted one check; a fresh preview completed the desktop check.
- JavaScript syntax, motion-control initialization/toggling and reduced-motion behavior, local link/asset existence and whitespace checks passed. No dependencies or build step were added.
- Saved each implementation file in its own commit, followed by this separate notes commit. The website remains a local draft; nothing was pushed or published.

## Product messaging and session motion — October 30, 2026

- Removed the extra lifestyle slogans, decorative orbit, tutorial waves and ornamental guide motion. Retained “Make time for a break” as the single headline, with a factual description of work sessions, break reminders and daily progress.
- Switched to consistent system typography, a neutral background and restrained teal accents. Tutorial and guide placeholders are now compact resources rather than separate promotional messages.
- Added an illustrative Focus → Break → Return session animation. Work time advances, holds at 25:00 during a break countdown, then resumes with one completed break. The timeline, reminder, pause symbol and softened work context explain the transition. Example timings are clearly labeled as condensed, not a product recording or fatigue prediction.
- Stage buttons hold a selected stage for inspection; Play resumes it. Playback pauses offscreen and in hidden tabs. Reduced Motion starts with a static view and still permits manual stage selection. Without JavaScript, the initial example and explanatory fallback remain readable.
- Browser verification covered 320px, 375px and 1280px widths with no horizontal overflow, the break and return states, keyboard stage activation and the disabled download. No browser warnings or errors were reported. Saved a full-page preview outside the repository.
- Deterministic motion checks passed for a full cycle, held work time during breaks, resumed progress, manual stages, pause/resume, visibility suspension, Reduced Motion and IntersectionObserver fallback. JavaScript syntax, local asset/link and whitespace checks passed.
- Committed every changed file separately for the main iteration and again for the visual/accessibility corrections. This notes update has its own commit. Nothing was pushed or published.
