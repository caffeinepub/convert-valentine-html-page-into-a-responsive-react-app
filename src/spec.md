# Specification

## Summary
**Goal:** Restore a working, shareable Internet Computer deployment by creating a fresh canister and ensuring the frontend reliably targets the newly deployed backend canister ID.

**Planned changes:**
- Create a brand-new IC canister (do not reuse the broken/invalid canister ID) and redeploy the full app so the public URL resolves without ICP gateway “Canister ID Not Resolved” / Error 400.
- Fix frontend canister ID resolution logic so it compiles and runs correctly (no `await` in non-async functions) and reads the backend canister ID from `/env.json` when available, otherwise falls back to Vite env variables.
- Add graceful failure behavior when no canister ID is available (clear console output instead of a hard crash).

**User-visible outcome:** A new shareable `https://<canister-id>.icp0.io/` link loads successfully on other devices/networks and the app connects to the newly deployed backend without canister-ID resolution errors.
