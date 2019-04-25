import Vue from 'vue';
import App from './app.vue';
import './assets/style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
let vm = new Vue(
    {
        el: '#app',
        render: function(h:any){ return h(App)}
    }
);