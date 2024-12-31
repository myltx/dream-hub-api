<template>
  <!-- 首页加载全屏动画 -->
  <FullLoading v-if="status === 'pending'" />
  <NuxtLayout>
    <!-- 在页面导航之间显示一个进度条 -->
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// import getUserInfo from './api/user'
import { getIdTokenClaims, isAuthenticated } from './server/auth'
// import { useUserStore } from './store/user'

// const userStore = useUserStore()
const { status } = useAsyncData('initApplication', async () => {
  if (isAuthenticated()) {
    const res = await getIdTokenClaims()
    const { data } = await useFetch('/api/user/getToken', {
      method: 'post',
      body: {
        userId: res?.sub,
      },
    })

    // const user = await getUserInfo({ userId: res?.sub })
    // userStore.initUser({
    //   ...res,
    //   user,
    //   ...data?.value?.data,
    // })
  }
})
</script>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
