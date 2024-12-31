<template>
  <div>
    <!-- 当正在处理中 -->
    <p v-if="isLoading">
      正在登录中...
    </p>
  </div>
</template>

<script setup lang="ts">
import { useHandleSignInCallback } from '@logto/vue'
// import getUserInfo from '~/api/user'
import { fetchUserInfo } from '~/server/auth'
// import { useUserStore } from '~/store/user'

definePageMeta({
  layout: false,
})

// const userStore = useUserStore()

const { isLoading } = useHandleSignInCallback(async () => {
  console.log('回调')
  // 完成后执行某些操作，例如重定向到主页
  const res = await fetchUserInfo()
  const { data } = await useFetch('/api/user/getToken', {
    method: 'post',
    body: {
      userId: res?.sub,
    },
  })
  // const user = await getUserInfo({ userId: res?.sub })
  // console.log(user, 'user')
  // userStore.initUser({
  //   ...res,
  //   user,
  //   ...data?.value?.data,
  // })

  navigateTo('/')
})
</script>

<style scoped>

</style>
