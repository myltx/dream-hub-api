module.exports = {
  // 语言选择
  subjectLanguage: process.env.COMMIT_LANGUAGE || 'en', // 默认英文，可通过环境变量切换语言
  types: [
    {
      value: 'feat',
      name: '✨ 新功能 | feat: A new feature',
      name_en: '✨ New Feature | feat: A new feature',
    },
    {
      value: 'fix',
      name: '🐛 修复 | fix: A bug fix',
      name_en: '🐛 Bug Fix | fix: A bug fix',
    },
    {
      value: 'docs',
      name: '📚 文档 | docs: Documentation only changes',
      name_en: '📚 Documentation | docs: Documentation only changes',
    },
    {
      value: 'style',
      name: '🎨 格式 | style: Changes that do not affect the code',
      name_en: '🎨 Style | style: Formatting changes',
    },
    {
      value: 'refactor',
      name: '🔧 重构 | refactor: A code change that neither fixes a bug nor adds a feature',
      name_en: '🔧 Refactor | refactor: A code change',
    },
    {
      value: 'test',
      name: '✅ 测试 | test: Adding missing tests',
      name_en: '✅ Test | test: Adding missing tests',
    },
    {
      value: 'chore',
      name: '🔨 工具 | chore: Changes to the build process or auxiliary tools',
      name_en: '🔨 Chore | chore: Tooling changes',
    },
  ],
  messages: (subjectLanguage) => ({
    type:
      subjectLanguage === 'zh'
        ? '选择你要提交的类型：'
        : 'Select the type of change you are committing:',
    customScope:
      subjectLanguage === 'zh'
        ? '请输入修改范围（可选）：'
        : 'Enter the scope of this change (optional):',
    subject:
      subjectLanguage === 'zh'
        ? '写一个简短描述（必填）：'
        : 'Write a short description (required):',
    body:
      subjectLanguage === 'zh'
        ? '详细描述（可选）：'
        : 'Provide a longer description (optional):',
    footer:
      subjectLanguage === 'zh'
        ? '列出任何问题关闭情况（可选）：'
        : 'List any issues closed (optional):',
    confirmCommit:
      subjectLanguage === 'zh'
        ? '确定提交吗？'
        : 'Are you sure you want to proceed with the commit?',
  }),
};
