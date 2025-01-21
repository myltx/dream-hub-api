<script setup lang="ts">
import type { FormError } from '#ui/types';
import { uploadFile, delFile, getFileQuery } from '~/api/file';
import { useDialog } from '~/components/BasicDialog/index';
import { columns } from './file.data';

definePageMeta({
  layout: 'admin',
});
const { openDialog } = useDialog();
const form = ref();
const limit = ref(0);
const total = ref(0);
const searchParams = ref<any>(
  initPageQueryParams({
    name: '',
  })
);

const fileTypeOptions = [
  {
    name: 'image',
    value: 'image',
  },
  {
    name: 'markdown',
    value: 'markdown',
  },
];
const acceptMap: Record<'image' | 'markdown', string> = {
  image: 'image/*',
  markdown: '.md',
};

const openEditModal = ref(false);

const loading = ref(true);
const dataList = ref([]);

const formData = ref<{ type: 'image' | 'markdown'; file: File | undefined }>({
  type: 'image',
  file: undefined,
});

watchEffect(() => {
  if (!openEditModal.value) {
    form.value?.clear();
    formData.value.file = undefined;
    formData.value.type = 'image';
  }
});

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

const openEditModalFn = () => {
  openEditModal.value = true;
};
const closeEditModalFn = () => {
  form.value?.clear();
  formData.value.file = undefined;
  formData.value.type = 'image';
  openEditModal.value = false;
};
const validate = (state: any): FormError[] => {
  const errors = [];
  if (!formData.value.file)
    errors.push({ path: 'file', message: '请选择文件' });
  if (!formData.value.type)
    errors.push({ path: 'type', message: '请选择文件类型' });
  return errors;
};

const onFileChange = (e: any) => {
  console.log(e);
  if (!e?.length) return;
  formData.value.file = e[0];
};

async function onSubmit() {
  const submitData = await form.value.validate();
  console.log(submitData);
  const toast = useToast();
  try {
    await uploadFile(submitData);
    toast.add({
      description: `添加成功`,
      icon: 'success',
      timeout: 2000,
    });
    closeEditModalFn();
    getList();
  } catch (err) {
    console.log(err);
  }
}

const deleteFn = (id: string) => {
  openDialog({
    title: '提示',
    content: '确定要删除吗？',
    type: 'warning',
    onConfirm: async () => {
      try {
        await delFile(id);
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

// 这里获取列表数据
onMounted(() => {
  getList();
});

const getList = async () => {
  loading.value = true;
  try {
    const data = await getFileQuery(searchParams.value);
    if (data.code === 200) {
      dataList.value = data.data?.list;
      limit.value = data.data?.limit;
      total.value = data.data?.total;
    }
    loading.value = false;
  } catch (err) {
    loading.value = false;
  }
};
const showFile = (url: string) => {
  window.open(url, '_blank');
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
        <div class="flex items-cente">
          <UButton color="gray" @click="reset"> 重置 </UButton>
          <UButton class="mx-2" @click="fetch"> 查询 </UButton>
          <UButton @click="openEditModalFn">
            <Icon name="line-md:upload-outline-loop" class="text-xl" />
            文件上传
          </UButton>
        </div>
      </div>
    </div>
    <div
      class="shadow p-2 rounded-2 mt-2 h-84%"
      :class="$colorMode.value === 'dark' ? 'bg-black' : 'bg-white'"
    >
      <UTable
        :rows="dataList"
        :columns="columns"
        :loading="loading"
        class="w-full"
        :ui="{
          td: { base: 'max-w-[0] truncate' },
        }"
      >
        <template #publicUrl-data="{ row }">
          <img
            :src="row.publicUrl"
            class="w-10 h-10"
            v-if="row.fileType.includes('image')"
          />
          <div v-else @click="showFile(row.publicUrl)" class="cursor-pointer">
            {{ row.publicUrl }}
          </div>
        </template>

        <template #actions-data="{ row }">
          <div>
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
          文件上传
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
          <UFormGroup label="文件类型" name="type">
            <USelect
              v-model="formData.type"
              placeholder="请选择文件类型"
              :options="fileTypeOptions"
              option-attribute="name"
            />
          </UFormGroup>

          <UFormGroup label="文件" name="description">
            <UInput
              type="file"
              size="sm"
              icon="i-heroicons-folder"
              :accept="formData.type ? acceptMap[formData.type] : '*/*'"
              @change="onFileChange"
            />
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
