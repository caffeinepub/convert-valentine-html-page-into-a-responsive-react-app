/**
 * Candid interface definition for the backend canister.
 * This file exports the IDL factory used to create the actor.
 */

export const idlFactory = ({ IDL }: any) => {
  return IDL.Service({});
};
