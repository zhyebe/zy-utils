/// <reference types="lxhby-utils" />

declare module 'lxhby-utils/*' {
  import { App, DefineComponent } from 'vue'
  export type ViteSign = DefineComponent<{}, {}, any>
  type ZyUtils = {
    install: (app: App<Element>) => void
  }
  export default ZyUtils;
}

