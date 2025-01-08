<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '提示',
  },
  content: {
    type: String,
    default: '',
  },
  confirmText: {
    type: String,
    default: '确定',
  },
  cancelText: {
    type: String,
    default: '取消',
  },
  type: {
    type: String,
    default: 'info',
  },
  onConfirm: {
    type: Function,
    default: () => {},
  },
  onCancel: {
    type: Function,
    default: () => {},
  },
});

function confirm() {
  props.onConfirm?.();
}
const close = () => {
  props.onCancel?.();
};
</script>

<template>
  <UModal prevent-close>
    <UCard>
      <div class="space-y-2">
        <p>{{ title }}</p>
        <div>
          {{ content }}
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-end space-x-2">
          <UButton color="gray" variant="solid" @click="close">
            {{ cancelText }}
          </UButton>
          <UButton @click="confirm">{{ confirmText }}</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
