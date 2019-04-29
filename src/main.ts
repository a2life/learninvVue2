import Vue from 'vue';
import App from './app.vue';
import './assets/style.css';
//import 'bootstrap/dist/css/bootstrap.min.css'
import 'promise-polyfill/src/polyfill';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
let vm = new Vue(
    {
        el: '#app',
        render: function(h:any){ return h(App)}
    }
);