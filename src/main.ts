import { createApp } from 'vue';
import App from './App.vue';
import LxhbyUtils from '@/components/lxhby-utils'

const app = createApp(App);

app.use(LxhbyUtils)
app.mount('#app');
