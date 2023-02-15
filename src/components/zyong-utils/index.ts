import { App, DefineComponent } from 'vue'
import viteSign from "./vite-sign/index.vue";

const ViteSign: DefineComponent<{}, {}, any[]> = viteSign as DefineComponent<{}, {}, any[]>
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