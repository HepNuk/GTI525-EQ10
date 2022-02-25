import { createRouter, createWebHistory } from 'vue-router';
import BikeCounterView from './views/BikeCounterView.vue';
import FountainView from './views/FountainView.vue';
import BikeRepairView from './views/BikeRepairView.vue';
import AddIntPointView from './views/AddIntPointView.vue';

export const routes = [
  {
    path: '/',
    name: 'BikeCounter',
    component: BikeCounterView
  },
  {
    path: '/fountain',
    name: 'Fountain',
    component: FountainView
  },
  {
    path: '/bike_repair',
    name: 'BikeRepair',
    component: BikeRepairView
  },
  {
    path: '/add_poi',
    name: 'AddIntPoint',
    component: AddIntPointView
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;