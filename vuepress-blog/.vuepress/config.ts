import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { blog } from "vuepress-theme-hope";

export default defineUserConfig({
  lang: "zh-CN",
  title: "赖卓成的笔记",
  description: "路虽远，行则将至。",
  base: "/",
  theme,

  plugins: [
    prismjsPlugin({
      // 配置项
    }),
  ],
  
});
