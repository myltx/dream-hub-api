<template>
  <div
    class="
    flex
    items-center
    justify-between
    static
    top-0
    h-14
    shadow-md
    dark:shadow-white-500
    50
    backdrop-blur
    dark:bg-transparent
    transition-all
    py-3
    px-4
    "
  >
    <div class="logo flex items-center">
      <img
        src="~/assets/images/logo.gif"
        class="h-6 w-6 rounded-full mr-2"
        alt=""
      >
      handy website
    </div>
    <div class="flex items-center">
      <UDropdown
        :items="showItems"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
      >
        <!-- <UAvatar :src="user?.user?.avatar" />
        <template #account="{ item }">
          <div
            class="text-left"
          >
            <p v-if="!isAuthenticated()">
              请先登录
            </p>
            <p>
              {{ user?.user?.nikeName }}
            </p>
            <p>
              {{ user?.email }}
            </p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
          </div>
        </template> -->

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
import { signOut, isAuthenticated, signIn } from '~/server/auth'
// import { useUserStore } from '~/store/user'

const router = useRouter()
// const { user } = useUserStore()
console.log(isAuthenticated() , 'isAuthenticated')
type DropdownItem = {
  label: string
  icon?: string
  disabled?: boolean
  key?: string
  show?: boolean
}
const items = [
  [{
    label: '',
    slot: 'account',
    disabled: true,
    // show: isAuthenticated(),
    show: true,
  }],
  [
    {
      label: '后台管理',
      key: 'admin',
      icon: 'i-heroicons-book-open',
      show: isAuthenticated() && localStorage.getItem('role') === 'admin',
    },
  ],
  [{
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
] as DropdownItem[][]
const showItems = ref<DropdownItem[][]>([])
watchEffect(() => {
  showItems.value = items.map(subArr => subArr.filter(item => item.show)).filter(item => item.length)
})
const handleDropdownItemClick = (item: DropdownItem) => {
  console.log('handleDropdownItemClick', item)
  if (item.key === 'admin') {
    router.push('/admin/home')
  }
  else if (item.key === 'signOut') {
    signOut()
  }
  else if (item.key === 'signIn') {
    signIn()
  }
}
</script>

<style scoped>

</style>
