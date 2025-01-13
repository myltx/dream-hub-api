<script setup lang="ts">
import type { FormError } from '#ui/types';
import { getTag, createTag, delTag, updateTag, getTagQuery } from '~/api/tag';
import { useDialog } from '~/components/BasicDialog';
import { columns } from './tag.data';

definePageMeta({
  layout: 'admin',
});

const formData = ref({
  name: '',
  id: '',
});
const form = ref();
const openEditModal = ref(false);

const limit = ref(0);
const total = ref(0);
const searchParams = ref<any>(
  initPageQueryParams({
    name: '',
  })
);

watchEffect(() => {
  if (!openEditModal.value) {
    form.value?.clear();
    formData.value.name = '';
    formData.value.id = '';
  }
});

const { openDialog } = useDialog();
const loading = ref(true);
const dataList = ref([]);

// 这里获取列表数据
onMounted(() => {
  getList();
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: 'name', message: '请输入分类名称' });
  return errors;
};

const openEditModalFn = () => {
  openEditModal.value = true;
};

const closeEditModalFn = () => {
  form.value?.clear();
  openEditModal.value = false;
};

async function onSubmit() {
  const toast = useToast();
  const submitData = await form.value.validate();
  try {
    if (formData.value.id) {
      await updateTag(formData.value.id, submitData);
    } else {
      delete submitData.id;
      await createTag(submitData);
    }
    toast.add({
      description: `${formData.value?.id ? '编辑' : '添加'}成功`,
      icon: 'success',
      timeout: 2000,
    });
    closeEditModalFn();
    getList();
  } catch (err) {
    console.log(err);
  }
}
const reset = () => {
  loading.value = true;
  dataList.value = [];
  searchParams.value.name = '';
  getList();
};

const fetch = () => {
  loading.value = true;
  dataList.value = [];
  getList();
};
// 切换分页时调用
const handlePageChange = async (page: number) => {
  searchParams.value.page = page;
  fetch();
};

const getList = async () => {
  loading.value = true;
  try {
    const data = await getTagQuery(searchParams.value);
    if (data.code === 200) {
      dataList.value = data.data.list;
      limit.value = data.data?.limit;
      total.value = data.data?.total;
    }
    loading.value = false;
  } catch (err) {
    loading.value = false;
  }
};

const deleteFn = (id: string) => {
  openDialog({
    title: '提示',
    content: '确定要删除吗？',
    type: 'warning',
    onConfirm: async () => {
      try {
        await delTag(id);
        const toast = useToast();
        toast.add({
          description: '删除成功',
          icon: 'success',
          timeout: 2000,
        });
        getList();
      } catch (err) {}
    },
  });
};

const editFn = async (data: any) => {
  try {
    formData.value.name = data.name;
    formData.value.id = data.id;
    openEditModal.value = true;
  } catch (err) {}
};
</script>

<template>
  <div class="h-full">
    <div
      class="shadow p-2 rounded-2"
      :class="$colorMode.value === 'dark' ? 'bg-black' : 'bg-white'"
    >
      <div class="flex items-center">
        <div>
          <UInput
            v-model="searchParams.name"
            placeholder="请输入名称"
            class="mr-4"
          />
        </div>
        <div>
          <UButton color="gray" @click="reset"> 重置 </UButton>
          <UButton class="mx-2" @click="fetch"> 查询 </UButton>
          <UButton @click="openEditModalFn"> 新增 </UButton>
        </div>
      </div>
    </div>
    <div
      class="shadow p-2 rounded-2 mt-2 h-84%"
      :class="$colorMode.value === 'dark' ? 'bg-black' : 'bg-white'"
    >
      <UTable :rows="dataList" :columns="columns" :loading="loading">
        <template #actions-data="{ row }">
          <div>
            <UButton
              icon="tabler:edit"
              size="2xs"
              color="primary"
              square
              variant="solid"
              class="mr-2"
              @click="editFn(row)"
            />
            <UButton
              icon="tabler:trash-filled"
              size="2xs"
              color="red"
              square
              variant="solid"
              @click="deleteFn(row?.id)"
            />
          </div>
        </template>
      </UTable>
    </div>
    <div
      class="shadow p-2 rounded-2 mt-4 flex items-center justify-end"
      :class="$colorMode.value === 'dark' ? 'bg-black' : 'bg-white'"
    >
      <div class="mr-2 text-gray-700 text-xs">共 {{ total }} 条</div>
      <UPagination
        v-model="searchParams.page"
        :page-count="limit"
        :total="total"
        :active-button="{ variant: 'outline' }"
        :inactive-button="{ color: 'gray' }"
        @update:modelValue="handlePageChange"
      />
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
        <UForm
          ref="form"
          :validate="validate"
          :state="formData"
          class="space-y-4"
        >
          <UFormGroup label="分类名称" name="name">
            <UInput v-model="formData.name" placeholder="请输入分类名称" />
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

<style scoped></style>
