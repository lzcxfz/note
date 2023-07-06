import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "JavaSE",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "个人学习",
        icon: "edit",
        prefix: "个人学习/javase",
        children: [
          { text: "面向对象", icon: "edit", link: "IO流" },
          { text: "文章 2", icon: "edit", link: "article2" },
        ],
      }
    ],
  },
]);
