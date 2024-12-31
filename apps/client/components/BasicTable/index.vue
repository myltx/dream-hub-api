<template>
  <div class="h-full">
    <div
      class="shadow p-2 rounded-2 bg-white"
      :class="$colorMode.value === 'dark' ? 'bg-black' : 'bg-white'"
    >
      <div class="flex items-center">
        <div>
          <UInput
            v-model="value"
            placeholder="请输入名称"
            class="mr-4"
          />
        </div>
        <div>
          <UButton
            color="gray"
            class="mr-2"
          >
            重置
          </UButton>
          <UButton>查询</UButton>
        </div>
      </div>
      <div class="mt-2 flex items-center justify-end b-t-1 pt-2">
        <UButton @click="openAdd">
          新增
        </UButton>
      </div>
    </div>
    <div
      class="shadow p-2 rounded-2 mt-2 h-81% bg-white"
      :class="$colorMode.value === 'dark' ? 'bg-black' : 'bg-white'"
    >
      <UTable :rows="people" />
    </div>
    <div
      class="shadow p-2 rounded-2 mt-2 bg-white"
      :class="$colorMode.value === 'dark' ? 'bg-black' : 'bg-white'"
    >
      <UPagination
        v-model="page"
        :page-count="5"
        :total="items.length"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const value = ref('')
const page = ref(1)
const items = ref(Array(55))
const emits = defineEmits(['add'])

const openAdd = () => {
  emits('add')
}

const people = [{
  id: 1,
  name: 'Lindsay Walton',
  title: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member',
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin',
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member',
}, {
  id: 4,
  name: 'Whitney Francis',
  title: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin',
}, {
  id: 5,
  name: 'Leonard Krasner',
  title: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner',
}, {
  id: 6,
  name: 'Floyd Miles',
  title: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member',
}]
</script>

<style scoped>

</style>
