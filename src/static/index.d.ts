import * as lxhbyUtils from './lxhby-utils.umd'

import { App, DefineComponent } from 'vue'

export type ViteSign = DefineComponent<{}, {}, any>
type LxhbyUtils = {
  install: (app: App<Element>) => void
}
export default LxhbyUtils;

