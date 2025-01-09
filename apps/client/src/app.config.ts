export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool',
    tooltip: {
      default: {
        openDelay: 500,
      },
    },
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 bottom-[unset]',
      width: 'w-200',
      color: 'green',
    },
    slideover: {
      padding: 'p-4',
    },
    modal: {
      width: 'w-full sm:max-w-lg',
      height: '',
      fullscreen: 'w-screen h-screen',
      container: 'items-center',
    },
  },
  // pageTransition: {
  //   name: 'page',
  //   mode: 'out-in',
  // },
  layoutTransition: {
    name: 'layout',
    mode: 'out-in',
  },
});
