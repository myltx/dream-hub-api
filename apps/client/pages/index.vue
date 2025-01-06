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
const categorys = ref<Category[]>([]);
const activeTab = ref(-1);
const websites = ref<Website[]>([]);

const onChangeTab = (id: number) => {
  activeTab.value = id;
  getWebSites();
};

const getSelectData = async () => {
  const { data: categorysData } = await getCategoryList();
  console.log(categorysData, 'categorysData');
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

const goLink = (url: string) => {
  window.open(url, '_blank');
};
const getWebSites = () => {
  getWebsiteQuery({
    categoryId: activeTab.value,
  }).then((res) => {
    websites.value = res.data;
  });
};
onMounted(async () => {
  getSelectData();
});
</script>

<template>
  <div class="mt-2">
    <div class="b-b-1 b-#eee py-5 flex items-center my-2 mx-2">
      <div
        v-for="tab in categorys"
        :key="tab.id"
        class="p-5 cursor-pointer h-10 rounded-5 flex items-center justify-center mr-3 shadow hover:text-blue hover:font-500"
        :class="[
          tab.id == activeTab
            ? 'text-blue-500 border-blue-500 font-500'
            : 'text-gray-500 border-gray-500',
          $colorMode.value === 'dark' ? 'b-1 b-#fff' : '',
        ]"
        @click="onChangeTab(tab.id)"
      >
        {{ tab.name }}
      </div>
    </div>
    <div class="mt-5">
      <div
        class="grid gap-5 w-full justify-center"
        style="grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr))"
      >
        <div
          v-for="item in websites"
          :key="item.id"
          class="cursor-pointer item"
          @click="goLink(item.url)"
        >
          <div class="p-2">
            <div
              class="rounded-lg shadow overflow-hidden"
              :class="[$colorMode.value === 'dark' ? 'b-1 b-gray-500' : '']"
            >
              <div class="p-4 h-30">
                <div class="flex items-center">
                  <img
                    :src="item.logo"
                    alt=""
                    class="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h2 class="text-4 font-bold mb-1">
                      {{ item.title }}
                    </h2>
                    <div class="text-gray-500 text-3">
                      {{
                        item.websiteTags
                          ?.map((item: any) => item.tags)
                          .map((item: any) => item.name)
                          .join('、')
                      }}
                    </div>
                  </div>
                </div>
                <div>
                  <p
                    class="text-slate-500 text-3 mt-2 font-500 tracking-1px overflow-hidden line-clamp-2"
                  >
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
