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
      threshold: 0, // 设置最低阈值，当元素至少显示 10% 时才会触发
    }
  );

  // 延迟观察新渲染的元素
  // 定义一个函数，用于观察锚点标题
  const observeTitles = () => {
    // 使用nextTick函数，在下一个事件循环中执行
    nextTick(() => {
      // 获取所有的锚点标题
      const newTitles = document.querySelectorAll('.anchor-title');
      // 遍历所有的锚点标题
      newTitles.forEach((title) => observer.observe(title));
    });
  };

  onMounted(() => {
    setHeaderHeight(); // 在组件挂载时获取上方元素的高度
    observeTitles();
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

  return { selectedAnchor, scrollToSection, observeTitles };
}
