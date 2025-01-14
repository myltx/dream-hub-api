<script setup lang="ts">
import { getCategoryList } from '~/api/category';
import { getWebsiteQueryAll } from '~/api/website';
interface Category {
  id: number;
  name: string;
}
interface Website {
  [key: string]: any;
}
const router = useRouter();
const isOpen = ref(false);
const categorys = ref<Category[]>([]);
const websites = ref<Website[]>([]);
const websiteList = ref<any[]>([]);

const getSelectData = async () => {
  const { data: categorysData } = await getCategoryList();
  categorys.value = categorysData.map((item: Category) => {
    return {
      ...item,
      label: item.name,
      value: item.id,
    };
  });
};
const getWebSites = () => {
  getWebsiteQueryAll({
    categoryId: '-1',
    limit: 10,
  }).then((res) => {
    websites.value = res.data.list;
    categorys.value.forEach((item) => {
      const commands = websites.value
        .filter((website) => website.categoryId === item.id)
        .map((website) => {
          return {
            label: website.title,
            description: website.description,
            ...website,
            inactive: 'Command',
          };
        });
      websiteList.value.push({
        key: item.name,
        label: item.name,
        inactive: item.name,
        commands,
      });
    });
  });
};
const onSelect = (option: Website) => {
  if (option.click) {
    option.click();
  } else if (option.to) {
    router.push(option.to);
  } else if (option.url) {
    window.open(option.url, '_blank');
  }
  isOpen.value = false;
};

// 键盘事件 ⌘ + K
onMounted(async () => {
  await getSelectData();
  await getWebSites();

  useEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'k') {
      showModal();
    }
  });
});
const showModal = () => {
  isOpen.value = true;
};
const ui = {
  wrapper:
    'flex flex-col flex-1 min-h-0 divide-y divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-800',
  container:
    'relative flex-1 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 scroll-py-2',
  input: {
    base: 'w-full h-14 px-4 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-0 text-gray-900 dark:text-white focus:ring-0 focus:outline-none',
  },
  group: {
    label: 'px-2 my-2 text-xs font-semibold text-gray-500 dark:text-gray-400',
    command: {
      base: 'flex justify-between select-none cursor-default items-center rounded-md px-2 py-2 gap-2 relative',
      active: 'bg-gray-200 dark:bg-gray-700/50 text-gray-900 dark:text-white',
      container: 'flex items-center gap-3 min-w-0',
      icon: {
        base: 'flex-shrink-0 w-5 h-5',
        active: 'text-gray-900 dark:text-white',
        inactive: 'text-gray-400 dark:text-gray-500',
      },
      avatar: {
        size: '2xs',
      },
    },
  },
};
</script>
<template>
  <UTooltip
    class="cursor-pointer flex items-center justify-center rounded-md p-1.5 text-gray-700 hover:bg-gray-100"
  >
    <template #text>
      <div>
        <!-- :shortcuts="['⌘', 'K']" -->
        <div class="flex items-center justify-between">
          <span class="text-gray-500">
            search ·
            <UKbd size="xs">⌘</UKbd>
            +
            <UKbd size="xs">K</UKbd>
          </span>
        </div>
      </div>
    </template>
    <Icon
      name="eva:search-outline"
      class="text-2xl cursor-pointer text-gray-700"
      @click="showModal"
    />
  </UTooltip>
  <UModal
    v-model="isOpen"
    :ui="{
      height: '200',
    }"
  >
    <UCommandPalette
      :autoselect="false"
      :groups="websiteList"
      placeholder="请输入搜索内容"
      :close-button="{
        icon: 'i-heroicons-x-mark-20-solid',
        color: 'gray',
        variant: 'link',
        padded: false,
      }"
      class="overflow-y-auto h-80%"
      :ui="ui"
      @close="isOpen = false"
      @update:model-value="onSelect"
    >
    </UCommandPalette>
  </UModal>
</template>

<style scoped></style>
