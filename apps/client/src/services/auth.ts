import { useLogto } from '@logto/vue';

let logto: ReturnType<typeof useLogto>;
let runtimeConfig: ReturnType<typeof useRuntimeConfig>;
export async function setupAuth() {
  logto = useLogto();
  runtimeConfig = useRuntimeConfig();
}

export async function signIn() {
  logto.signIn(runtimeConfig.public.signInRedirectURI);
}

export function signOut() {
  return logto.signOut(runtimeConfig.public.signOutRedirectURI);
}

export function isAuthenticated() {
  return logto.isAuthenticated.value;
}

export async function getToken() {
  const accessToken = await logto.getAccessToken(
    runtimeConfig?.public.backendEndpoint
  );
  return accessToken;
}
export function fetchUserInfo() {
  return logto.fetchUserInfo();
}

export async function getIdTokenClaims() {
  return await logto.getIdTokenClaims();
}
