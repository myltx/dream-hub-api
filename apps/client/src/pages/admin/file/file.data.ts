export const columns = ref([
  {
    key: 'fileName',
    label: '文件名称',
  },
  {
    key: 'publicUrl',
    label: '访问地址',
  },
  {
    key: 'bucket',
    label: '存储桶',
  },
  {
    key: 'path',
    label: '存储地址',
  },
  {
    key: 'fileType',
    label: '文件类型',
  },
  {
    key: 'createdAt',
    label: '创建时间',
  },
  {
    key: 'actions',
    label: '操作',
    width: 100,
    align: 'center',
  },
]);
