<script setup lang="ts">
import { getCategory } from '~/api/category';
import { getTag } from '~/api/tag';
import {
  createWebsite,
  delWebSite,
  getWebsiteQuery,
  updateWebsite,
} from '~/api/website';
import { useDialog } from '~/components/BasicDialog';
import {
  columns,
  defaultFormData,
  validate,
  radioGroupOptions,
} from './website.data';

definePageMeta({
  layout: 'admin',
});
const { openDialog } = useDialog();
const form = ref();
const limit = ref(0);
const total = ref(0);
const openEditModal = ref(false);
const categorys = ref([]);
const tags = ref([]);
const toast = useToast();

const loading = ref(true);
const dataList = ref([]);

const formData = ref(JSON.parse(JSON.stringify(defaultFormData)));
const searchParams = ref<any>(
  initPageQueryParams({
    title: '',
  })
);

watchEffect(() => {
  if (!openEditModal.value) {
    formData.value = JSON.parse(JSON.stringify(defaultFormData));
    form.value?.clear();
  }
});
onMounted(() => {
  useEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      fetch();
    }
  });
});

const reset = () => {
  loading.value = true;
  dataList.value = [];
  searchParams.value.title = '';
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
  openEditModal.value = false;
};
async function onSubmit() {
  // Do something with data
  const submitData = await form.value.validate();
  try {
    if (formData.value.id) {
      await updateWebsite(formData.value.id, submitData);
    } else {
      delete submitData.id;
      await createWebsite(submitData);
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

// 这里获取列表数据
onMounted(() => {
  getList();
  getSelectData();
});

const getList = async () => {
  loading.value = true;
  try {
    const data = await getWebsiteQuery(searchParams.value);
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
const getSelectData = () => {
  getCategory().then((res) => {
    categorys.value = res.data;
  });
  getTag().then((res) => {
    tags.value = res.data;
  });
};
const deleteFn = (id: string) => {
  openDialog({
    title: '提示',
    content: '确定要删除吗？',
    type: 'warning',
    onConfirm: async () => {
      try {
        await delWebSite(id);
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
  if (data.websiteTags && data.websiteTags.length) {
    data.tags = data.websiteTags.map((item: any) => item.tagId);
  }
  Object.assign(formData.value, data);
  openEditModal.value = true;
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
            v-model="searchParams.title"
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
      <UTable
        :rows="dataList"
        :columns="columns"
        :loading="loading"
        class="w-full"
        :ui="{
          td: { base: 'max-w-[0] truncate' },
        }"
      >
        <template #categories-data="{ row }">
          <div>{{ row?.categories?.name }}</div>
        </template>
        <template #websiteTags-data="{ row }">
          <div>
            {{
              row?.websiteTags
                ?.map((item) => item.tags)
                .map((item) => item.name)
                .join('、')
            }}
          </div>
        </template>
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
    <USlideover v-model="openEditModal" prevent-close>
      <div class="flex items-center justify-between">
        <h3
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          {{ formData.id ? '编辑' : '新增' }}站点
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
          <UFormGroup label="站点名称" name="title">
            <UInput v-model="formData.title" placeholder="请输入站点名称" />
          </UFormGroup>

          <UFormGroup label="站点地址" name="url">
            <UInput v-model="formData.url" placeholder="请输入站点地址" />
          </UFormGroup>

          <UFormGroup label="站点分类" name="categoryId">
            <USelectMenu
              v-model="formData.categoryId"
              :options="categorys"
              value-attribute="id"
              option-attribute="name"
              placeholder="请选择分类"
            />
          </UFormGroup>

          <UFormGroup label="站点标签" name="tags">
            <USelectMenu
              v-model="formData.tags"
              :options="tags"
              value-attribute="id"
              option-attribute="name"
              placeholder="请选择标签"
              multiple
            />
          </UFormGroup>

          <UFormGroup label="站点Logo" name="logo">
            <UInput
              v-model="formData.logo"
              placeholder="请输入图片地址或者上传图片"
            />
          </UFormGroup>

          <UFormGroup label="站点图片" name="image">
            <UInput
              v-model="formData.image"
              placeholder="请输入图片地址或者上传图片"
            />
          </UFormGroup>

          <UFormGroup label="是否公开" name="isPublic">
            <UToggle
              v-model="formData.isPublic"
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
            />
          </UFormGroup>

          <UFormGroup label="是否推荐" name="isRecommended">
            <UToggle
              v-model="formData.isRecommended"
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
            />
          </UFormGroup>

          <UFormGroup label="是否置顶" name="isTop">
            <UToggle
              v-model="formData.isTop"
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
            />
          </UFormGroup>

          <UFormGroup label="是否发布" name="status">
            <UToggle
              v-model="formData.status"
              on-icon="i-heroicons-check-20-solid"
              off-icon="i-heroicons-x-mark-20-solid"
            />
          </UFormGroup>

          <UFormGroup label="排序" name="sortOrder">
            <UInput v-model="formData.sortOrder" placeholder="请输入排序" />
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

<style scoped>
fieldset {
  display: flex;
}
</style>
