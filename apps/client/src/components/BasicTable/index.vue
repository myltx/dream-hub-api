<script setup lang="ts">
defineProps({
  rows: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <UTable
    :rows="rows"
    :columns="columns"
    :loading="loading"
    class="w-full"
    :ui="{
      td: { base: 'max-w-[0] truncate' },
    }"
  >
    <template #actions-data="{ row }">
      <slot name="actions-data" :row="row"></slot>
    </template>
  </UTable>
</template>
<style scoped></style>
