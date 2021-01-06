import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import smoothscroll from 'smoothscroll-polyfill';
 
smoothscroll.polyfill();

Vue.config.productionTip = false;

export const EventBus = new Vue();

new Vue({
    vuetify,
    render: (h) => h(App)
}).$mount('#app');
