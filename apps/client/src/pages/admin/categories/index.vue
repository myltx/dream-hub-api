<template>
  <div class="h-full">
    <div
      class="shadow p-2 rounded-2"
      :class="$colorMode.value === 'dark' ? 'bg-black' : 'bg-white'"
    >
      <div class="flex items-center">
        <div>
          <UInput v-model="value" placeholder="请输入名称" class="mr-4" />
        </div>
        <div>
          <UButton color="gray"> 重置 </UButton>
          <UButton class="mx-2"> 查询 </UButton>
          <UButton @click="openEditModalFn"> 新增 </UButton>
        </div>
      </div>
    </div>
    <div
      class="shadow p-2 rounded-2 mt-2 h-84%"
      :class="$colorMode.value === 'dark' ? 'bg-black' : 'bg-white'"
    >
      <UTable :rows="people" :columns="columns" :loading="loading" />
    </div>
    <div
      class="shadow p-2 rounded-2 mt-2"
      :class="$colorMode.value === 'dark' ? 'bg-black' : 'bg-white'"
    >
      <UPagination v-model="page" :page-count="5" :total="items.length" />
    </div>
    <!-- 提交表单 -->
    <USlideover v-model="openEditModal">
      <div class="flex items-center justify-between mb-4">
        <h3
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          编辑
        </h3>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="closeEditModalFn"
        />
      </div>

      <div class="h-90%">
        <UForm ref="form" :validate="validate" :state="state" class="space-y-4">
          <UFormGroup label="分类名称" name="name">
            <UInput v-model="state.name" placeholder="请输入分类名称" />
          </UFormGroup>

          <UFormGroup label="描述" name="description">
            <UTextarea v-model="state.description" placeholder="请输入描述" />
          </UFormGroup>
        </UForm>
      </div>
      <div class="flex items-center justify-end mt-4 b-t-1 b-gray/50 p-t-2">
        <UButton class="mr-2" color="gray" @click="closeEditModalFn">
          取消
        </UButton>
        <UButton @click="onSubmit"> 提交 </UButton>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import type { FormError } from '#ui/types';
import { createCategory, getCategory } from '~/api/category';

definePageMeta({
  layout: 'admin',
});
const value = ref('');
const form = ref();
const page = ref(1);
const items = ref(Array(55));
const openEditModal = ref(false);

const openEditModalFn = () => {
  openEditModal.value = true;
};
const closeEditModalFn = () => {
  form.value?.clear();
  openEditModal.value = false;
};

const loading = ref(true);
const people = ref([]);
const columns = ref([
  {
    key: 'name',
    label: '分类名称',
  },
  {
    key: 'description',
    label: '描述',
  },
  {
    key: 'created_at',
    label: '创建时间',
    render(h) {
      return 123;
    },
  },
  {
    key: 'updated_at',
    label: '更新时间',
  },
  {
    key: 'action',
    label: '操作',
    width: 100,
    align: 'center',
  },
]);

const state = reactive({
  name: undefined,
  description: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: 'name', message: '请输入分类名称' });
  if (!state.description)
    errors.push({ path: 'description', message: '请输入描述' });
  return errors;
};

async function onSubmit() {
  // Do something with data
  const submitData = await form.value.validate();
  const data = await createCategory(submitData);
  console.log(data);
  closeEditModalFn();
  getList();
}

// 这里获取列表数据
onMounted(() => {
  getList();
});

const getList = async () => {
  loading.value = true;
  try {
    const data = await getCategory({});
    if (data.code === 200) {
      people.value = data.data;
    }
    loading.value = false;
  } catch (err) {
    loading.value = false;
  }
};
</script>

<style scoped></style>
