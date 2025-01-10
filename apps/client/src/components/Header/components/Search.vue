<script setup lang="ts">
import { getCategoryList } from '~/api/category';
import { getWebsiteQuery } from '~/api/website';
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
  getWebsiteQuery({
    categoryId: '-1',
  }).then((res) => {
    websites.value = res.data;
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
    console.log(websiteList.value, 'websiteList.value');
  });
};
const onSelect = (option: Website) => {
  console.log(option);
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

  document.addEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'k') {
      showModal();
    }
  });
});
const showModal = () => {
  isOpen.value = true;
};
</script>
<template>
  <UTooltip
    text="Search"
    :shortcuts="['⌘', 'K']"
    class="cursor-pointer flex items-center justify-center rounded-md p-1.5 text-gray-700 hover:bg-gray-100"
  >
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
      @close="isOpen = false"
      @update:model-value="onSelect"
    >
    </UCommandPalette>
  </UModal>
</template>

<style scoped></style>
