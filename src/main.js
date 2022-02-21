import { createApp } from 'vue';
import App from './App.vue';
// import VuePapaParse from 'vue-papa-parse';
import MyButton from './component/shared/MyButton.vue';
import MyTable from './component/shared/MyTable.vue';
import FontAwesomeIcon from './fortawesome-icons';

const app = createApp(App);

// app.use(VuePapaParse);
app.component("fa", FontAwesomeIcon);
app.component("MyButton", MyButton);
app.component("MyTable", MyTable);
app.mount('#app');
