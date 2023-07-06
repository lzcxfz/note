import { defineClientConfig } from "@vuepress/client";
    import { defineAsyncComponent } from "vue";
import FlowChart from "D:/dev/lzc-sync/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/FlowChart";
import Presentation from "D:/dev/lzc-sync/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/Presentation";
import "D:/dev/lzc-sync/note/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("FlowChart", FlowChart);
    app.component("Presentation", Presentation);
    
  }
});