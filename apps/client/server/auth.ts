import { useLogto } from '@logto/vue'

let logto: ReturnType<typeof useLogto>
let runtimeConfig: ReturnType<typeof useRuntimeConfig>
export async function setupAuth() {
  logto = useLogto()
  runtimeConfig = useRuntimeConfig()
}

export async function signIn(callback?: string) {
  // callback && setSignInCallback(callback)
  logto.signIn(runtimeConfig.public.signInRedirectURI)
}

export function signOut() {
  return logto.signOut(runtimeConfig.public.signOutRedirectURI)
}

export function isAuthenticated() {
  return logto.isAuthenticated.value
}

export function getToken() {
  // console.log(userStore.user, 'user')
  return ''
}
export function fetchUserInfo() {
  return logto.fetchUserInfo()
}

export async function getIdTokenClaims() {
  return await logto.getIdTokenClaims()
}

// export function getSignInCallback() {
//   const callback = sessionStorage.getItem('callback')
//   if (callback) {
//     sessionStorage.removeItem('callback')
//     return callback
//   }
//   else {
//     return '/'
//   }
// }

// function setSignInCallback(callback: string) {
//   sessionStorage.setItem('callback', callback)
// }
