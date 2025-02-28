<script setup lang="ts">
import { getCategoryList } from '~/api/category';
import { createFavorites, removeFavorites } from '~/api/favorites';
import { createWebsiteAccessLog } from '~/api/log';
import { getWebsiteQueryAllGroup, websiteVisit } from '~/api/website';
import { useDialog } from '~/components/BasicDialog';
import { isAuthenticated, signIn } from '~/services/auth';

import { useScrollWatcher } from '@/composables/useScrollWatcher';

const { selectedAnchor, scrollToSection, observeTitles } = useScrollWatcher();

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
const categoriesKey = 'categories-';

const { openDialog } = useDialog();

const onChangeTab = (id: number, type: string = 'manual') => {
  // loading.value = true;
  activeTab.value = id;
  // 滚动到当前 Tab 的可见区域
  const tabElement = document.querySelector(`.tab[data-id="${id}"]`);
  if (tabElement) {
    tabElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }
  type === 'manual' && scrollToSection(`${categoriesKey}${id}`);
  // getWebSites();
};
watchEffect(() => {
  if (isMobile()) {
    const id = Number(selectedAnchor.value.replace(categoriesKey, ''));
    onChangeTab(id, 'auto');
  }
});

const getSelectData = async () => {
  const { data: categorysData } = await getCategoryList();
  categorys.value = categorysData.map((item: Category) => {
    return {
      ...item,
      label: item.name,
      value: item.id,
    };
  });
  // categorys.value.unshift({
  //   id: -1,
  //   name: '全部',
  // });
  if (categorys.value.length) {
    activeTab.value = categorys.value[0]?.id;
  }
  getWebSites();
};

const goLink = (data: any) => {
  // 创建访问日志
  createWebsiteAccessLog({ websiteId: data.id });

  // 增加访问计数
  websiteVisit(data.id);

  // 打开目标链接
  window.open(data.url, '_blank');
};
const getWebSites = () => {
  getWebsiteQueryAllGroup().then((res) => {
    websites.value = res.data.groupedData;
    categorys.value = res.data.groupedData.map((item: any) => item.categories);
    loading.value = false;
    observeTitles();
  });
};
// 收藏
const handleCollect = async (website: any) => {
  if (!isAuthenticated()) {
    openDialog({
      title: '登录',
      content: '登录后才能收藏',
      onConfirm: async () => {
        signIn();
      },
    });
    return;
  }
  const toast = useToast();
  if (!website.isFavorited) {
    await createFavorites({
      contentId: website.id,
      contentType: 'website',
    });
    toast.add({
      title: 'Success',
      description: '收藏成功',
      color: 'green',
    });
    getWebSites();
  } else {
    // 取消收藏
    openDialog({
      title: '取消收藏',
      content: '确定取消收藏吗？',
      onConfirm: async () => {
        // 取消收藏
        await removeFavorites(website.favoriteId);
        toast.add({
          title: 'Success',
          description: '取消收藏成功',
          color: 'green',
        });
        getWebSites();
      },
    });
  }
};

onMounted(async () => {
  getSelectData();
});
</script>

<template>
  <div class="h-100% flex justify-between w-full">
    <div class="bg-bgColor px-4 w-60" v-if="!isMobile()">
      <div
        class="cursor-pointer py-2 flex items-center gap-2 hover:text-#0066FF"
        :class="{
          'text-#0066FF font-heavy':
            selectedAnchor === `${categoriesKey}${link.id}`,
        }"
        @click="scrollToSection(`${categoriesKey}${link.id}`)"
        v-for="link in categorys"
        :key="link.id"
      >
        <UIcon name="i-heroicons-light-bulb" class="w-5 h-5" /> {{ link.name }}
      </div>
    </div>
    <div class="flex-grow-1 h-100%">
      <!-- 内容区顶部 -->
      <!-- web端选择器样式 -->
      <div
        class="h-48 bg-bgColor py-4 b-l-1 b-solid b-bColor page-header shadow dark:shadow-otherBgColor 100 backdrop-blur shadow-"
        v-if="!isMobile()"
      >
        <div class="px-30 flex gap-10">
          <div
            class="flex-1 rounded-4 color-textColor h-26 font-zk-qfy text-15 flex items-center justify-center cursor-pointer item"
            style="
              background: #12c2e9;
              background: linear-gradient(to bottom, #3161fa, #87bffc);
            "
          >
            文章
          </div>
          <div
            class="flex-1 rounded-4 color-textColor h-26 font-zk-qfy text-15 flex items-center justify-center cursor-pointer item"
            style="
              background: #12c2e9;
              background: linear-gradient(to bottom, #00b8c1, #89e7db);
            "
          >
            热点
          </div>
          <div
            class="flex-1 rounded-4 color-textColor h-26 font-zk-qfy text-15 flex items-center justify-center cursor-pointer item"
            style="
              background: #12c2e9;
              background: linear-gradient(to bottom, #ff7631, #ffc786);
            "
          >
            AI
          </div>
          <div
            class="flex-1 rounded-4 color-textColor h-26 font-zk-qfy text-15 flex items-center justify-center cursor-pointer item"
            style="
              background: #12c2e9;
              background: linear-gradient(to bottom, #ff4943, #ffb09d);
            "
          >
            工具
          </div>
        </div>
      </div>
      <!-- 移动端选择器样式 -->
      <div
        class="px-2 mt-2 h-auto shadow-md rounded-lg w-100vw overflow-x-hidden"
        v-else
      >
        <div
          class="w-99% flex items-center whitespace-nowrap overflow-x-auto h-100% py-2"
        >
          <div
            v-for="tab in categorys"
            :key="tab.id"
            :data-id="tab.id"
            class="tab p-5 cursor-pointer text-4 h-10 rounded-5 flex items-center justify-center mr-3 bg-bgColor shadow hover:text-blue hover:font-500"
            :class="[
              activeTab === tab.id
                ? 'text-blue-500 border-blue-500 font-500'
                : 'text-gray-500 border-gray-500',
            ]"
            @click="onChangeTab(tab.id)"
          >
            {{ tab.name }}
          </div>
        </div>
      </div>
      <div
        class="overflow-y-auto bg-otherBgColor pb-5"
        :class="isMobile() ? 'h-92%  px-8' : 'h-77.7% px-30'"
      >
        <div
          class=""
          v-for="categories in websites"
          :key="categories?.categories?.id"
        >
          <div
            class="anchor-title text-6 font-zk-syht-bold py-4"
            :id="`${categoriesKey}${categories?.categories?.id}`"
          >
            {{ categories?.categories?.name }}
          </div>
          <div
            class="grid gap-6 w-full justify-center"
            style="grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr))"
          >
            <div
              v-for="website in categories.list"
              :key="website.id"
              @click="goLink(website)"
              class="bg-bgColor rounded-4 p-5 cursor-pointer item"
            >
              <div class="">
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
                    <!-- 👀 -->
                    <Icon name="line-md:watch" class="text-xl mr-1" />
                    {{ website.visitCount }}
                  </span>
                  <div class="flex items-center">
                    <Icon
                      :name="`${website.isFavorited ? 'line-md:star-alt-filled' : 'line-md:star'}`"
                      class="text-xl"
                      :class="`${website.isFavorited ? 'color-yellow-500' : ''}`"
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

  <!-- <div class="h-100%">
  
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
                      :name="`${website.isFavorited ? 'line-md:star-alt-filled' : 'line-md:star'}`"
                      class="text-xl"
                      :class="`${website.isFavorited ? 'color-yellow-500' : ''}`"
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
  </div> -->
  <Loading v-if="loading" />
</template>

<style scoped>
body {
  background-color: var(--background-color);
  color: rgba(0, 0, 0, 0.8);
}

.dark-mode body {
  background-color: var(--background-color);
  color: #ebf4f1;
}

.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}

.item {
  transition:
    transform 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
}

.item:hover {
  transform: scale(1.05);
  opacity: 0.95;
  /* 添加透明度变化，使放大的效果更自然 */
}
</style>
