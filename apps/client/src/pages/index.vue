<script setup lang="ts">
import { getCategoryList } from '~/api/category';
import { createWebsiteAccessLog } from '~/api/log';
import { getWebsiteQueryAll, websiteVisit } from '~/api/website';

interface Category {
  id: number;
  name: string;
}
interface Website {
  [key: string]: any;
}
const categorys = ref<Category[]>([]);
const activeTab = ref(-1);
const websites = ref<Website[]>([]);
const loading = ref(true);

const onChangeTab = (id: number) => {
  loading.value = true;
  activeTab.value = id;
  // 滚动到当前 Tab 的可见区域
  const tabElement = document.querySelector(`.tab[data-id="${id}"]`);
  console.log(tabElement, 'tabElement');
  if (tabElement) {
    tabElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }
  getWebSites();
};

const getSelectData = async () => {
  const { data: categorysData } = await getCategoryList();
  categorys.value = categorysData.map((item: Category) => {
    return {
      ...item,
      label: item.name,
      value: item.id,
    };
  });
  categorys.value.unshift({
    id: -1,
    name: '全部',
  });
  if (categorys.value.length) {
    activeTab.value = categorys.value[0]?.id;
  }
  getWebSites();
};

const goLink = async (data: { id: string; url: string }) => {
  try {
    // 创建访问日志
    await createWebsiteAccessLog({ websiteId: data.id });

    // 增加访问计数
    await websiteVisit(data.id);
  } catch (error) {
    console.error('Error logging website access or visiting:', error);
  } finally {
  }
  // 打开目标链接
  window.open(data.url, '_blank');
};
const getWebSites = () => {
  getWebsiteQueryAll({
    categoryId: activeTab.value === -1 ? '' : activeTab.value,
  }).then((res) => {
    websites.value = res.data.list;
    loading.value = false;
  });
};
// 收藏
const handleCollect = (website: any) => {
  console.log(website, 'website');
};
onMounted(async () => {
  getSelectData();
});
</script>

<template>
  <div class="h-100%">
    <div
      class="px-2 mt-2 h-auto mx-2 shadow-md rounded-lg w-100% overflow-x-hidden"
    >
      <div
        class="w-99% flex items-center whitespace-nowrap overflow-x-auto h-100% py-2"
      >
        <div
          v-for="tab in categorys"
          :key="tab.id"
          :data-id="tab.id"
          class="tab p-5 cursor-pointer text-4 h-10 rounded-5 flex items-center justify-center mr-3 shadow hover:text-blue hover:font-500"
          :class="[
            tab.id == activeTab
              ? 'text-blue-500 border-blue-500 font-500'
              : 'text-gray-500 border-gray-500',
            $colorMode.value === 'dark' ? 'bg-gray-800' : '',
          ]"
          @click="onChangeTab(tab.id)"
        >
          {{ tab.name }}
        </div>
      </div>
    </div>
    <div class="mt-5 overflow-y-auto h-89%">
      <div
        class="grid gap-5 w-full justify-center"
        style="grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr))"
      >
        <div
          v-for="website in websites"
          :key="website.id"
          class="cursor-pointer item"
          @click="goLink(website)"
        >
          <div class="p-2">
            <div
              class="rounded-lg shadow overflow-hidden"
              :class="[$colorMode.value === 'dark' ? 'b-1 b-gray-500' : '']"
            >
              <div class="p-4 h-36">
                <div class="flex items-center">
                  <UAvatar
                    :src="website.logo"
                    :alt="website.title"
                    class="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h2 class="text-4 font-bold mb-1 flex items-center">
                      {{ website.title }}
                      <Icon
                        name="line-md:thumbs-up-filled"
                        class="text-xl color-red-500 ml-1"
                        v-if="website.isRecommended"
                      />
                    </h2>
                    <div class="text-gray-500 text-3">
                      {{
                        website.websiteTags
                          ?.map((item: any) => item.tags)
                          .map((item: any) => item.name)
                          .join('、')
                      }}
                    </div>
                  </div>
                </div>
                <p
                  class="text-slate-500 text-3 mt-2 font-500 tracking-1px overflow-hidden line-clamp-2 h-9"
                >
                  {{ website.description }}
                </p>
                <div
                  class="mt-2 text-2 text-gray-500 flex items-center justify-between"
                >
                  <span class="mr-2 text-sm flex items-center">
                    👀
                    {{ website.visitCount }}
                  </span>
                  <div class="flex items-center">
                    <Icon
                      name="line-md:star-alt"
                      class="text-xl"
                      @click.stop="handleCollect(website)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loading v-if="loading" />
</template>

<style scoped>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
.item:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}
</style>
