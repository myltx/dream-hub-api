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
      <UTable :rows="people" :columns="columns" :loading="loading">
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
            <UInput v-model="formData.name" placeholder="请输入分类名称" />
          </UFormGroup>

          <UFormGroup label="描述" name="description">
            <UTextarea
              v-model="formData.description"
              placeholder="请输入描述"
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

<script setup lang="ts">
import type { FormError } from '#ui/types';
import {
  createCategory,
  delCategory,
  getCategory,
  updateCategory,
} from '~/api/category';
import { useDialog } from '~/components/BasicDialog/index';

definePageMeta({
  layout: 'admin',
});
const { openDialog } = useDialog();
const value = ref('');
const form = ref();
const page = ref(1);
const items = ref(Array(55));
const openEditModal = ref(false);

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
    key: 'createdAt',
    label: '创建时间',
  },
  {
    key: 'updatedAt',
    label: '更新时间',
  },
  {
    key: 'actions',
    label: '操作',
    width: 100,
    align: 'center',
  },
]);

const formData = ref({
  id: '',
  name: undefined,
  description: undefined,
});

watchEffect(() => {
  if (!openEditModal.value) {
    form.value?.clear();
    formData.value.name = undefined;
    formData.value.description = undefined;
    formData.value.id = '';
  }
});

const openEditModalFn = () => {
  openEditModal.value = true;
};
const closeEditModalFn = () => {
  form.value?.clear();
  formData.value.name = undefined;
  formData.value.description = undefined;
  openEditModal.value = false;
};
const validate = (state: any): FormError[] => {
  const errors = [];
  if (!formData.value.name)
    errors.push({ path: 'name', message: '请输入分类名称' });
  if (!formData.value.description)
    errors.push({ path: 'description', message: '请输入描述' });
  return errors;
};

async function onSubmit() {
  const submitData = await form.value.validate();
  const toast = useToast();
  try {
    if (formData.value?.id) {
      await updateCategory(formData.value?.id, formData.value);
    } else {
      await createCategory({
        name: formData.value?.name,
        description: formData.value?.description,
      });
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
    // toast.add({
    //   title: '添加成功',
    //   description: '添加成功',
    //   icon: 'success',
    //   timeout: 2000,
    // });
  }
}

const deleteFn = (id: string) => {
  openDialog({
    title: '提示',
    content: '确定要删除吗？',
    type: 'warning',
    onConfirm: async () => {
      try {
        await delCategory(id);
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
    console.log(data);
    formData.value.name = data.name;
    formData.value.description = data.description;
    formData.value.id = data.id;
    openEditModal.value = true;
  } catch (err) {}
};

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
