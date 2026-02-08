# Specification

## Summary
**Goal:** Add consistent Back/Next navigation and ensure a GIF appears on every screen in the Valentine flow.

**Planned changes:**
- Add persistent “Back” and “Next” controls below the main content on every Valentine flow screen (Welcome, Will You Be My Valentine, Choose Your Gift, Gift 1 Quiz, Gift 2 Message, Gift 3 Images, Success) and wire them to the sequential flow order.
- Centralize new user-facing strings (Back/Next labels and any GIF fallback text) in `frontend/src/features/valentine/content/strings.ts` and reference them via `STRINGS`.
- Ensure every flow screen renders at least one GIF, using existing assets/URLs where available, and add safe fallback behavior/alt text so failed GIF loads don’t break layout.

**User-visible outcome:** Users can move forward/backward through the Valentine screens using consistent controls on every page, and each page shows a GIF with graceful fallback if it can’t load.
