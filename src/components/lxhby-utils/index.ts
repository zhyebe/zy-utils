import { App, DefineComponent } from 'vue'
import ViteSign from "./vite-sign/index.vue";

export { ViteSign }

const component: DefineComponent<{}, {}, any>[] = [ViteSign]

const LxhbyUtils = {
  install(app: App<Element>) {
    component.forEach((item) => {
      app.component(item.name, ViteSign);
    });
  }
}

export default LxhbyUtils;