import { createApp } from 'vue';
import App from './App.vue';
import ZyUtils from '@/components/zy-utils'

const app = createApp(App);

app.use(ZyUtils)
app.mount('#app');
