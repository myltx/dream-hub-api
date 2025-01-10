<script setup lang="ts">
import { signOut, isAuthenticated, signIn } from '~/services/auth';
import { useUserStore } from '~/store/user';
import { storeToRefs } from 'pinia';

const router = useRouter();
const { user } = storeToRefs(useUserStore());
const props = defineProps({
  type: {
    type: String,
    default: 'frontend',
  },
});

type DropdownItem = {
  label: string;
  icon?: string;
  disabled?: boolean;
  key?: string;
  show?: boolean;
};
const items = [
  [
    {
      label: '',
      slot: 'account',
      disabled: true,
      show: true,
    },
  ],
  [
    {
      label: '后台管理',
      key: 'admin',
      icon: 'i-heroicons-book-open',
      show: isAuthenticated() && props.type === 'frontend',
    },

    {
      label: '看看效果',
      key: 'frontend',
      icon: 'i-heroicons-book-open',
      show: props.type === 'admin',
    },
  ],
  [
    {
      label: '退出登录',
      key: 'signOut',
      show: isAuthenticated(),
      icon: 'i-heroicons-arrow-left-on-rectangle',
    },
    {
      label: '登录',
      key: 'signIn',
      show: !isAuthenticated(),
      icon: 'i-heroicons-arrow-right-on-rectangle',
    },
  ],
] as DropdownItem[][];
const showItems = ref<DropdownItem[][]>([]);
watchEffect(() => {
  showItems.value = items
    .map((subArr) =>
      subArr.filter((item) => {
        if (
          item.key === 'admin' &&
          item.show &&
          user.value?.userInfo?.roles?.includes('admin')
        ) {
          return true;
        } else {
          return item.show;
        }
      })
    )
    .filter((item) => item.length);
});
const handleDropdownItemClick = (item: DropdownItem) => {
  switch (item.key) {
    case 'admin':
      router.push('/admin');
      return;
    case 'signOut':
      signOut();
      return;
    case 'signIn':
      signIn();
      return;
    case 'frontend':
      router.push('/');
      return;
    default:
      return;
  }
};
</script>

<template>
  <UDropdown
    :items="showItems"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
  >
    <UAvatar :src="user?.userInfo?.avatar" />
    <template #account="{ item }">
      <div class="text-left">
        <p v-if="!isAuthenticated()">请先登录</p>
        <p>
          {{ user?.userInfo?.nikeName }}
        </p>
        <p>
          {{ user?.email }}
        </p>
        <p class="truncate font-medium text-gray-900 dark:text-white">
          {{ item.label }}
        </p>
      </div>
    </template>

    <template #item="{ item }">
      <div
        class="w-100% flex items-center justify-between"
        @click="handleDropdownItemClick(item)"
      >
        <span class="truncate">{{ item.label }}</span>

        <UIcon
          :name="item.icon"
          class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
        />
      </div>
    </template>
  </UDropdown>
</template>
<style scoped></style>
