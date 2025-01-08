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
    },
    slideover: {
      padding: 'p-4',
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
