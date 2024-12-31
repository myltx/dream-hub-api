<template>
  <div class="flex items-center justify-between h-12 shadow mb-2 px-2 rounded-2">
    <div>handy website 后台管理</div>
    <div class="flex items-center">
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

        <template #account="{ item }">
          <div class="text-left">
            <p>
              Signed in as
            </p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
          </div>
        </template>

        <template
          #item="{ item }"
        >
          <div
            class="w-100% flex items-center justify-between"
            @click="handleDropdownItemClick(item)"
          >
            <span
              class="truncate"
            >{{ item.label }}</span>

            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </div>
        </template>
      </UDropdown>
      <ColorMode class="mx-2" />
      <Icon
        name="uil:github"
        class="text-2xl cursor-pointer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

type DropdownItem = {
  label: string
  icon?: string
  disabled?: boolean
  key?: string
}
const items = [
  [{
    label: 'ben@example.com',
    slot: 'account',
    disabled: true,
  }], [{
    label: '看看效果',
    key: 'frontend',
    icon: 'i-heroicons-book-open',
  }], [{
    label: 'Sign out',
    icon: 'i-heroicons-arrow-left-on-rectangle',
  }],
] as DropdownItem[][]
const handleDropdownItemClick = (item: DropdownItem) => {
  console.log('handleDropdownItemClick', item)
  if (item.key === 'frontend') {
    router.push('/')
  }
}
</script>

<style scoped>

</style>
