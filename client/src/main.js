import { createApp } from 'vue';
import App from './App.vue';
import MyButton from './component/shared/MyButton.vue';
import MyTable from './component/shared/MyTable.vue';
import FontAwesomeIcon from './fortawesome-icons';
import router from './router';

const app = createApp(App);

// app.use(VuePapaParse);
app.component("fa", FontAwesomeIcon);
app.component("MyButton", MyButton);
app.component("MyTable", MyTable);
app.use(router);
app.mount('#app');
