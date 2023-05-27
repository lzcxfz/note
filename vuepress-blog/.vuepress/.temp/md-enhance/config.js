import { defineClientConfig } from "@vuepress/client";
    import { defineAsyncComponent } from "vue";
import FlowChart from "D:/lzc-sync/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/FlowChart";
import Presentation from "D:/lzc-sync/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/Presentation";
import "D:/lzc-sync/note/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("FlowChart", FlowChart);
    app.component("Presentation", Presentation);
    
  }
});