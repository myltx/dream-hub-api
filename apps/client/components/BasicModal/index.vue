<template>
  <UModal v-model="isOpen">
    <div class="p-4">
      <Placeholder class="h-48" />
    </div>
  </UModal>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const props = defineProps({
  open: Boolean,
})

watch(() => props.open, (value) => {
  isOpen.value = value
})
</script>

<style scoped>

</style>
