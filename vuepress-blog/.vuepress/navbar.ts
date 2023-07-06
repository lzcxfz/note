import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/home",
  {
    text: "JavaSE",
    icon: "edit",
    prefix: "/posts/",
    children: [
      {
        text: "文章 1-4",
        icon: "edit",
        prefix: "article/",
        children: [
          { text: "文章 1", icon: "edit", link: "article1" },
          { text: "文章 2", icon: "edit", link: "article2" },
        ],
      }
    ],
  },
]);
