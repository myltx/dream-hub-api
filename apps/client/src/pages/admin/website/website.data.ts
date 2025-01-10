import type { FormError } from '#ui/types';
export const columns = ref([
  {
    key: 'title',
    label: '分类名称',
  },
  {
    key: 'url',
    label: '地址',
  },
  {
    key: 'description',
    label: '描述',
  },
  {
    key: 'categories',
    label: '分类',
  },
  {
    key: 'websiteTags',
    label: '标签',
  },
  {
    key: 'actions',
    label: '操作',
    width: 100,
    align: 'center',
  },
]);

export const defaultFormData = {
  title: undefined,
  url: undefined,
  description: undefined,
  image: undefined,
  categoryId: undefined,
  logo: undefined,
  tags: undefined,
  id: '',
};

export const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.title) errors.push({ path: 'title', message: '请输入站点名称' });
  if (!state.categoryId)
    errors.push({ path: 'categoryId', message: '请选择分类' });
  if (!state.tags) errors.push({ path: 'tags', message: '请选择标签' });
  if (!state.url) errors.push({ path: 'url', message: '请输入站点地址' });
  if (!state.description)
    errors.push({ path: 'description', message: '请输入描述' });
  if (!state.image) errors.push({ path: 'image', message: '请上传图片' });
  return errors;
};
