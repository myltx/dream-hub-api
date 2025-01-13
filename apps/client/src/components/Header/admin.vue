<script setup lang="ts">
const router = useRouter();

type DropdownItem = {
  label: string;
  icon?: string;
  disabled?: boolean;
  key?: string;
};
const items = [
  [
    {
      label: 'ben@example.com',
      slot: 'account',
      disabled: true,
    },
  ],
  [
    {
      label: '看看效果',
      key: 'frontend',
      icon: 'i-heroicons-book-open',
    },
  ],
  [
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
    },
  ],
] as DropdownItem[][];
const handleDropdownItemClick = (item: DropdownItem) => {
  if (item.key === 'frontend') {
    router.push('/');
  }
};
</script>
<template>
  <div
    class="flex items-center justify-between h-12 shadow mb-2 px-2 rounded-2"
  >
    <div
      class="cursor-pointer flex items-center"
      @click="router.push('/admin')"
    >
      <img
        src="~/assets/images/logo.gif"
        class="h-6 w-6 rounded-full mr-2"
        alt=""
      />
      {{ $config.public.projectName }} 后台管理
    </div>
    <div class="flex items-center">
      <ColorMode />
      <HeaderComponentsGithub />
      <HeaderComponentsUser :type="'admin'" class="ml-2" />
    </div>
  </div>
</template>

<style scoped></style>
