import { createApp } from 'vue';
import DashboardComponent from './components/Dashboard.vue';

const mount = (el) => {
  const app = createApp(DashboardComponent);
  app.mount(el);
};

if (process.env.NODE_ENV === 'development') {
  const el = document.getElementById('_dashboard-dev-root');
  if (el) {
    mount(el);
  }
}

export { mount };
