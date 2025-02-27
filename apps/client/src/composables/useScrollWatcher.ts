// composables/useScrollWatcher.ts
import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useScrollWatcher() {
  const selectedAnchor = ref(''); // 当前选中的锚点
  const thresholdDistance = 100; // 设置标题距离顶部的最小距离（单位：px），可以根据需求调整
  const headerHeight = ref(0); // 页面上方固定元素的高度

  // 获取页面上方固定元素的高度
  const setHeaderHeight = () => {
    const header = document.querySelector('.page-header'); // 假设页面上方固定的元素类名为 `.page-header`
    if (header) {
      headerHeight.value = header.clientHeight;
    }
  };

  // 使用 IntersectionObserver 来监听元素是否进入视口
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const rect = entry.target.getBoundingClientRect();

        // 判断目标 title 元素与视口顶部的距离
        if (rect.top <= headerHeight.value + thresholdDistance) {
          // 如果标题元素距离顶部小于等于阈值并考虑了上方元素的高度
          selectedAnchor.value = entry.target.id;
        }
      });
    },
    {
      threshold: 0.1, // 设置最低阈值，当元素至少显示 10% 时才会触发
    }
  );

  onMounted(() => {
    setHeaderHeight(); // 在组件挂载时获取上方元素的高度
    const titles = document.querySelectorAll('.anchor-title'); // 假设每个锚点标题使用了 .anchor-title 类
    titles.forEach((title) => observer.observe(title)); // 观察所有的标题元素
  });

  onBeforeUnmount(() => {
    observer.disconnect(); // 销毁时断开监听
  });

  // 手动滚动到指定锚点
  const scrollToSection = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      selectedAnchor.value = sectionId; // 更新选中的锚点
    }
  };

  return { selectedAnchor, scrollToSection };
}
