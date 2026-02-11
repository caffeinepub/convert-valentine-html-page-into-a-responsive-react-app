# Specification

## Summary
**Goal:** Make the scratch-to-reveal interaction fully functional (with a threshold-based final reveal), enhance Gift 2’s letter experience, add Gift 4 with the same scratch reveal, and update the Spin Wheel rewards/copy plus a 5-spin final summary—without changing anything else.

**Planned changes:**
- Fix the scratch-to-reveal canvas so scratching visibly erases the overlay and reliably reveals content on mouse + touch, including correct behavior across devicePixelRatio and resize/orientation changes.
- Add scratch completion detection (percentage threshold) that transitions to a final reveal state and disables/removes the overlay once completed.
- Update scratch reveal visuals/content to: a large pulsing heart, bursts of 💋 kiss particles floating upward, and the exact message text “Love you cutie 🥰😘”.
- Gift 2: Add a click-to-unfold (envelope opening) animation and start a typing animation for the letter content only after the unfold completes.
- Gift 4: Add a new Gift 4 screen after Gift 3 that uses the same scratch-to-reveal behavior and final reveal content (pulsing heart, floating kisses, “Love you cutie 🥰😘”).
- Spin Wheel: Add the exact pre-spin note text before the wheel/controls; enforce a strict limit of 5 spins.
- Spin Wheel: Replace rewards with exactly the provided 11 reward labels/emojis and their exact messages; remove Date Night, Massage, and Movie Night everywhere.
- After the 5th spin, transition to a final summary page listing all 5 won rewards and showing the exact provided sweet message text.

**User-visible outcome:** Users can successfully scratch to reveal content (and trigger a final heart/kisses reveal after scratching enough), open Gift 2’s letter with an unfold + typing effect, proceed to a new Gift 4 scratch page after Gift 3, and spin the wheel up to 5 times with updated rewards—ending on a final page summarizing all 5 rewards and the provided message.
