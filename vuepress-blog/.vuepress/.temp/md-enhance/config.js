import { defineClientConfig } from "@vuepress/client";
    import { defineAsyncComponent } from "vue";
import FlowChart from "C:/Users/Admin/Desktop/lzc-sync/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/FlowChart";
import Presentation from "C:/Users/Admin/Desktop/lzc-sync/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/Presentation";
import "C:/Users/Admin/Desktop/lzc-sync/note/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("FlowChart", FlowChart);
    app.component("Presentation", Presentation);
    
  }
});