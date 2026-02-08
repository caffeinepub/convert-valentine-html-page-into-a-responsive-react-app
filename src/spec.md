# Specification

## Summary
**Goal:** Fix Valentine flow screens with non-loading GIFs by updating their GIF URLs to the user-provided Tenor links.

**Planned changes:**
- Update the configured GIF URL for screen 1 (welcome) to the provided Tenor URL.
- Update the configured GIF URL for screen 3 (congratulations) to the provided Tenor URL.
- Set a dedicated GIF URL for screen 4 (gifts / ChooseYourGiftScreen) to the provided Tenor URL (separate from screen 3).
- Update the configured GIF URLs for screen 6 (gift2 / kissGif), screen 7 (gift3 / gift3Gif), and the last screen (finalSurprise / finalSurpriseGif) to the provided Tenor URLs.
- Keep the existing ValentineGif error-handling behavior and keep flow order/navigation unchanged.

**User-visible outcome:** The previously broken GIFs on the specified Valentine flow screens load and display correctly (with the existing fallback behavior if a GIF fails to load).
