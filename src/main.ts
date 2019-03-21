import Vue from 'vue';
import App from './app.vue';
import './assets/style.css';
let vm = new Vue(
    {
        el: '#app',
        render: function(h:any){ return h(App)}
    }
);