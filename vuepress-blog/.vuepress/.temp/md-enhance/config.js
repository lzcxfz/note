import { defineClientConfig } from "@vuepress/client";
    import { defineAsyncComponent } from "vue";
import FlowChart from "/home/runner/work/note/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/FlowChart";
import Presentation from "/home/runner/work/note/note/node_modules/vuepress-plugin-md-enhance/lib/client/components/Presentation";
import "/home/runner/work/note/note/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("FlowChart", FlowChart);
    app.component("Presentation", Presentation);
    
  }
});