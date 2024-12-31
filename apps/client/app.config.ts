export default defineAppConfig({
  ui: {
    primary: "green",
    gray: "cool",
    tooltip: {
      default: {
        openDelay: 500,
      },
    },
  },
  // pageTransition: {
  //   name: 'page',
  //   mode: 'out-in',
  // },
  layoutTransition: {
    name: "layout",
    mode: "out-in",
  },
});
