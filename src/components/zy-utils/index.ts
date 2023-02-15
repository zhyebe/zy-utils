import ViteSign from "./vite-sign/index.vue";

export { ViteSign }

const component = [ViteSign]

const ZyUtils = {
  install(App: any) {
    component.forEach((item) => {
      App.component(item.name, ViteSign);
    });
  }
}

export default ZyUtils;