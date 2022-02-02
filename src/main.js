import { createApp } from 'vue';
import App from './App.vue';
import VuePapaParse from 'vue-papa-parse';
import VueCsvLoader from "vue-csv-loader";
import MyButton from './component/shared/MyButton.vue';
import MyTable from './component/shared/MyTable.vue';

const app = createApp(App);

app.use(VueCsvLoader);
app.use(VuePapaParse);
app.component("MyButton", MyButton);
app.component("MyTable", MyTable);
app.mount('#app');
