import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import './index.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import ToastService from 'primevue/toastservice';


const app = createApp(App)

app.use(PrimeVue).use(ToastService).mount('#electron-app');
