import { defineClientConfig } from "@vuepress/client";
    import { defineAsyncComponent } from "vue";
import FlowChart from "D:/blog/blog/node_modules/vuepress-plugin-md-enhance/lib/client/components/FlowChart";
import Presentation from "D:/blog/blog/node_modules/vuepress-plugin-md-enhance/lib/client/components/Presentation";
import "D:/blog/blog/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("FlowChart", FlowChart);
    app.component("Presentation", Presentation);
    
  }
});