# Deployment & Shareable URL Guide

This document explains how to ensure your Valentine app deploys successfully and generates a working shareable URL.

## Quick Checklist

After deploying, verify these items to ensure your app is accessible:

### 1. ✅ Canister ID Resolution

The app needs a valid backend canister ID to function. This ID can come from two sources:

- **`/env.json`** (generated during deployment) - preferred for production
- **Environment variables** (`VITE_BACKEND_CANISTER_ID` or `VITE_CANISTER_ID_BACKEND`) - fallback

**How to verify:**
1. Open browser DevTools Console
2. Look for one of these messages:
   - ✅ `"Loaded backend canister ID from env.json: <canister-id>"`
   - ✅ `"Loaded backend canister ID from environment variables: <canister-id>"`
   - ❌ `"Backend canister ID not found!"` - **deployment failed**

### 2. 🌐 Shareable URL Format

A valid Internet Computer URL must include the full canister ID:

