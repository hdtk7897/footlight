/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./src/**/*.{ts,tsx}"
  ],
  darkMode: "class",  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
  /** 下記の不具合対応
   *  https://github.com/crxjs/chrome-extension-tools/issues/671 */
  safelist: process.env.NODE_ENV === 'development' ?
  [
    {
      // colors 
      pattern: /\b((bg|text)-[\w-]+)/,
    },
    {
      // padding and margin
      pattern: /\b((p|px|py|my|mx|spacing-x|spacing-y)-\d+)/,
    },
    {
      // width, high, and size
      pattern: /\b((w|h|s)-\d+)/,
    },
  ] : [],
}

