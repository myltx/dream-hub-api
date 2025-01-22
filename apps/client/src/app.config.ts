export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool',
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 bottom-[unset]',
      width: 'w-auto',
      color: 'green',
    },
    slideover: {
      padding: 'p-4',
    },
    modal: {
      // width: 'w-full sm:max-w-lg',
      // height: '',
      // fullscreen: 'w-screen h-screen',
      container: 'items-center',
    },
    tooltip: {
      wrapper: 'relative inline-flex',
      container: 'z-20 group',
      width: 'max-w-xs',
      background: 'bg-white dark:bg-gray-900',
      color: 'text-gray-900 dark:text-white',
      shadow: 'shadow',
      rounded: 'rounded',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
      base: '[@media(pointer:coarse)]:hidden h-6 px-2 py-1 text-xs font-normal truncate relative',
      shortcuts: 'hidden md:inline-flex flex-shrink-0 gap-0.5',
      middot: 'mx-1 text-gray-700 dark:text-gray-200',
      transition: {
        enterActiveClass: 'transition ease-out duration-200',
        enterFromClass: 'opacity-0 translate-y-1',
        enterToClass: 'opacity-100 translate-y-0',
        leaveActiveClass: 'transition ease-in duration-150',
        leaveFromClass: 'opacity-100 translate-y-0',
        leaveToClass: 'opacity-0 translate-y-1',
      },
      popper: {
        strategy: 'fixed',
      },
      default: {
        openDelay: 0,
        closeDelay: 0,
      },
      arrow: {
        base: '[@media(pointer:coarse)]:hidden invisible before:visible before:block before:rotate-45 before:z-[-1] before:w-2 before:h-2',
        ring: 'before:ring-1 before:ring-gray-200 dark:before:ring-gray-800',
        rounded: 'before:rounded-sm',
        background: 'before:bg-gray-200 dark:before:bg-gray-800',
        shadow: 'before:shadow',
        placement:
          "group-data-[popper-placement*='right']:-left-1 group-data-[popper-placement*='left']:-right-1 group-data-[popper-placement*='top']:-bottom-1 group-data-[popper-placement*='bottom']:-top-1",
      },
    },
    commandPalette: {
      input: {
        wrapper: 'pl-8',
      },
      container:
        'relative flex-initial overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 scroll-py-2',
      group: {
        wrapper: 'p-2',
        label:
          'px-2.5 my-2 text-xs font-semibold text-gray-900 dark:text-white',
        container: 'ftext-sm text-gray-700 dark:text-gray-200',
        active: 'flex-shrink-0 text-gray-500 dark:text-gray-400',
        inactive: 'flex-shrink-0 text-gray-500 dark:text-gray-400',
      },
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
