<script setup lang="ts">
import { useLogto } from '@logto/vue'

const { signIn, signOut, isAuthenticated } = useLogto()
console.log(isAuthenticated, 'useLogto')

const onClickSignIn = () => {
  signIn('http://localhost:3000/auth/callBack')
}
const onClickSignOut = () => signOut('http://localhost:3000')
console.log(useLogto())
</script>

<template>
  <button
    v-if="!isAuthenticated"
    @click="onClickSignIn"
  >
    登录1
  </button>
  <button
    v-else
    @click="onClickSignOut"
  >
    登出
  </button>
</template>
