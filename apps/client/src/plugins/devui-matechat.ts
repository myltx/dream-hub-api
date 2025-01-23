// /plugins/devui-matechat.ts
import { defineNuxtPlugin } from '#app';
import DevUI from 'vue-devui';
import MateChat from '@matechat/core';
// 这样会全局引入样式，导致原本页面的样式出问题
// import 'vue-devui/style.css';
// import '@devui-design/icons/icomoon/devui-icon.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(DevUI); // 注册 DevUI
  nuxtApp.vueApp.use(MateChat); // 注册 MateChat
});
