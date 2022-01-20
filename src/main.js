import { createApp } from 'vue';
import App from './App.vue';

import GTIButton from './component/shared/GTIButton.vue';
import GTITable from './component/shared/GTITable.vue';

const app = createApp(App);

app.component("GTIButton", GTIButton);
app.component("GTITable", GTITable);
app.mount('#app');
