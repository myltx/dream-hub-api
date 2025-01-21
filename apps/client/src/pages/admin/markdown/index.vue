<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { getFileDetails } from '~/api/file';

// Markdown-it 配置
const md = new MarkdownIt({
  highlight: (code: string, lang: string): string => {
    let highlightedCode = '';
    if (lang && hljs.getLanguage(lang)) {
      try {
        highlightedCode = hljs.highlight(code, { language: lang }).value;
      } catch (error) {
        console.error('Highlight.js error:', error);
      }
    } else {
      highlightedCode = md.utils.escapeHtml(code);
    }
    const languageClass = lang ? `language-${lang}` : '';
    return `<pre class="hljs ${languageClass}"><code>${highlightedCode}</code></pre>`;
  },
});

// Markdown-it 插件：为代码块添加复制按钮
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const code = token.content.trim();
  const lang = token.info ? `language-${token.info.trim()}` : '';
  const highlightedCode = options.highlight
    ? options.highlight(code, token.info, 'hljs')
    : md.utils.escapeHtml(code);

  // 返回带复制按钮的 HTML
  return `
    <div class="code-block-wrapper rounded-lg my-4 b-order-2 border-2">
     <div class="flex items-center justify-between mb-2 p-2 light:bg-white dark:bg-#101726 rounded-t-lg">
      ${token.info.trim()}
       <button class="copy-icon" data-code="${encodeURIComponent(code)}" onclick="copyCode(this)">
        Copy
      </button>
     </div>
      <pre class="hljs ${lang} p-2"><code>${highlightedCode}</code></pre>
    </div>
  `;
};

// 为复制按钮定义 JS 函数
if (typeof window !== 'undefined') {
  window.copyCode = (button: HTMLButtonElement) => {
    const code = decodeURIComponent(button.getAttribute('data-code') || '');
    navigator.clipboard.writeText(code).then(() => {
      button.textContent = 'Copied';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000);
    });
  };
}

definePageMeta({
  layout: 'admin',
});

const { data } = await getFileDetails({
  id: '12',
  type: 'markdown',
});

const htmlContent = computed(() => (data ? md.render(data?.content) : ''));
</script>

<template>
  <div>
    <div v-if="htmlContent" v-html="htmlContent"></div>
  </div>
</template>

<style scoped>
/* 代码块容器 */
.code-block-wrapper {
  position: relative;
  /* margin-bottom: 1em; */
}

/* 复制按钮 */
.copy-icon {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
  font-size: 0.8em;
  cursor: pointer;
  z-index: 10;
  transition:
    background-color 0.2s,
    opacity 0.2s;
}

.copy-icon:hover {
  background: #0056b3;
}
</style>
