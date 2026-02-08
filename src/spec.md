# Specification

## Summary
**Goal:** Add a new Welcome screen at the start of the Valentine flow and set the default GIFs to the provided Tenor URLs for the Valentine question and Gift 2 screens.

**Planned changes:**
- Add a new initial Welcome screen (title, short welcome message, Rose GIF placeholder area, Continue button) that navigates to the existing “Will You Be My Valentine?” screen without a full reload.
- Update ValentineFlow navigation/state to include Welcome -> Valentine question -> Gifts -> Gift screens -> Success while preserving existing animations (falling hearts) and background music behavior across all screens.
- Set the Valentine question screen’s default GIF to the Tenor Hug GIF URL (unless previously customized via the existing Change GIF UI).
- Add/display the Tenor Kiss GIF on the Gift 2 message screen above the message content, with a graceful fallback if the GIF fails to load.

**User-visible outcome:** On load, users see a Welcome screen and can tap Continue to reach the Valentine question; the Valentine question shows the Hug GIF by default and Gift 2 shows the Kiss GIF, with hearts/music continuing to work as before.
