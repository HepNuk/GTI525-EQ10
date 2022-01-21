import { createApp } from 'vue';
import App from './App.vue';

import MyButton from './component/shared/MyButton.vue';
import MyTable from './component/shared/MyTable.vue';

const app = createApp(App);

app.component("MyButton", MyButton);
app.component("MyTable", MyTable);
app.mount('#app');
