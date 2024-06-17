import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import './index.css'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice';


const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
}).use(ToastService).mount('#electron-app');
