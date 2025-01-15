<script setup lang="ts">
import { getRanking } from '~/api/website';

interface Ranking {
  title: string;
  url: string;
  visitCount: number;
  id: string;
}
const rankingList = ref<Ranking[]>([]);

const isOpen = ref(false);
const showModal = async () => {
  await getRankingList();
  isOpen.value = true;
};
const getRankingList = async () => {
  try {
    const { data } = await getRanking();
    rankingList.value = data || [];
  } catch (err) {}
};
</script>

<template>
  <UTooltip
    class="cursor-pointer flex items-center justify-center rounded-md p-1.5 text-gray-700 hover:bg-gray-100"
    text="点击查看热门站点"
  >
    <Icon name="mynaui:chart-bar-two" class="text-2xl" @click="showModal" />
  </UTooltip>
  <UModal v-model="isOpen">
    <!--  justify-end -->
    <div class="p-4">
      <div>
        <h2 class="text-lg font-bold">热门站点</h2>
        <div class="text-3 text-gray-500">根据站点点击量统计</div>
        <ul class="mt-2">
          <li
            v-for="(rank, index) in rankingList"
            :key="rank.id"
            class="flex items-center gap-2 py-1"
          >
            <Icon
              name="noto:1st-place-medal"
              class="text-2xl"
              v-if="index === 0"
            />
            <Icon
              name="noto:2nd-place-medal"
              class="text-2xl"
              v-else-if="index === 1"
            />
            <Icon
              name="noto:3rd-place-medal"
              class="text-2xl"
              v-else-if="index === 2"
            />
            <span
              v-else
              class="text-4 text-gray-500"
              :class="index < 9 ? ' px-1.5' : 'px-0.7'"
            >
              {{ index + 1 }}
            </span>
            <a class="text-gray-700 font-bold" :href="rank.url" target="_blank">
              {{ rank.title }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </UModal>
</template>
<style scoped></style>
