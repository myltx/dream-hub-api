<template>
  <!-- 首页加载全屏动画 -->
  <FullLoading v-if="status === 'pending'" />
  <NuxtLayout>
    <!-- 在页面导航之间显示一个进度条 -->
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
  <UModals />
</template>

<script setup lang="ts">
import { getUserInfoByUserId } from '~/api/user';
import { getIdTokenClaims, isAuthenticated } from './services/auth';
import { useUserStore } from './store/user';

const userStore = useUserStore();
const { status } = useAsyncData('initApplication', async () => {
  if (isAuthenticated()) {
    const res = await getIdTokenClaims();
    const { data } = await getUserInfoByUserId({ userId: res?.sub as string });
    userStore.initUser({
      ...res,
      userInfo: data,
    });
  }
});
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
