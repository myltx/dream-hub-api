<script setup lang="ts">
const aiRef = ref();

const showAiSlideover = () => {
  aiRef.value.showModal();
};
onMounted(() => {
  useEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'e') {
      showAiSlideover();
    }
  });
});
</script>

<template>
  <UTooltip
    class="cursor-pointer flex items-center justify-center rounded-md p-1.5 text-gray-700 hover:bg-gray-100"
    text="点击打开Dream-hub 助手"
  >
    <template #text>
      <div>
        <!-- :shortcuts="['⌘', 'K']" -->
        <div class="flex items-center justify-between">
          <span class="text-gray-500">
            点击打开Dream-hub 助手 ·
            <UKbd size="xs">⌘</UKbd>
            +
            <UKbd size="xs">E</UKbd>
          </span>
        </div>
      </div>
    </template>
    <Icon
      name="streamline-emojis:2"
      class="text-2xl cursor-pointer"
      @click="showAiSlideover"
    />
  </UTooltip>
  <Ai ref="aiRef" />
</template>

<style scoped></style>
