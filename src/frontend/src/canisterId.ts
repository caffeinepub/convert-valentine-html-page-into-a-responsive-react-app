/**
 * Centralized canister ID resolution for the backend canister.
 * Resolves the canister ID from build-time environment variables with safe fallbacks.
 */

/**
 * Synchronously get the backend canister ID from environment variables.
 * This function reads from Vite environment variables available at build time.
 * 
 * @returns The backend canister ID, or an empty string if not found
 */
export function getBackendCanisterId(): string {
  const backendCanisterId = 
    import.meta.env.VITE_BACKEND_CANISTER_ID || 
    import.meta.env.VITE_CANISTER_ID_BACKEND;

  if (!backendCanisterId) {
    console.warn(
      '⚠️ Backend canister ID not found in environment variables.\n' +
      'Expected: VITE_BACKEND_CANISTER_ID or VITE_CANISTER_ID_BACKEND'
    );
    return '';
  }

  return backendCanisterId;
}

/**
 * Get the host URL for the Internet Computer network.
 * Defaults to mainnet unless explicitly configured otherwise.
 * 
 * @returns The host URL for the IC network
 */
export function getHost(): string {
  // Check for explicit host configuration
  const host = import.meta.env.VITE_HOST || import.meta.env.VITE_DFX_NETWORK;
  
  if (host) {
    // If running locally, use localhost
    if (host === 'local' || host.includes('localhost')) {
      return 'http://localhost:4943';
    }
    return host;
  }

  // Default to IC mainnet
  return 'https://icp-api.io';
}
