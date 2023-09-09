module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'plugin:prettier/recommended', 'vue-global-api'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-undef': 'off', //允许存在未定义的词
    'no-unused-vars': 'error', //不允许存在未使用的值
    'no-console': 'off', //允许使用console
    'no-debugger': 'off', //允许使用debugger
    'prettier/prettier': 'error', //prettier格式不对 直接抛异常
    'vue/no-v-html': 'off', //允许使用v-html
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'any',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/multi-word-component-names': 'off', // 多字组件名称
    'vue/attribute-hyphenation': 'warn', //属性连字符
    // Vue属性排序
    'vue/attributes-order': [
      'warn',
      {
        order: ['DEFINITION', 'LIST_RENDERING', 'CONDITIONALS', 'RENDER_MODIFIERS', 'GLOBAL', 'UNIQUE', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'OTHER_ATTR', 'EVENTS', 'CONTENT'],
        alphabetical: true //字母顺序
      }
    ]
  }
}
