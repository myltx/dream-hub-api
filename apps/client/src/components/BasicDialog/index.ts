import DialogComponent from './components/index.vue';
export interface DialogConfig {
  title: string;
  content: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'info' | 'warning' | 'error';
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const useDialog = () => {
  const modal = useModal();
  const openDialog = (dialogConfig: DialogConfig | any) => {
    const { title, content, confirmText, cancelText, type } = dialogConfig;
    modal.open(DialogComponent, {
      title,
      content,
      confirmText,
      cancelText,
      type,
      onConfirm: () => {
        dialogConfig.onConfirm?.();
        modal.close();
      },
      onCancel: () => {
        dialogConfig.onCancel?.();
        modal.close();
      },
    });
  };

  return {
    openDialog,
  };
};
