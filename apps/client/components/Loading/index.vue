<template>
  <div
    class="loading-container flex items-center justify-center z-[99] bg-white/50 absolute top-0 left-0 w-full h-full"
  >
    <div
      class="loading-spinner w-10 h-10 border-2 border-blue-300 border-t-transparent rounded-full animate-spin"
    />
  </div>
</template>

<style scoped>
.loading-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
