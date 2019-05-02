import Vue from 'vue';
import App from './app.vue';
import './assets/style.css';
//import 'bootstrap/dist/css/bootstrap.min.css'
// import 'promise-polyfill/src/polyfill';
// very useful, recommended!
//import 'ts-polyfill/lib/es2015-core';
import 'ts-polyfill/lib/es2015-promise';
//import 'ts-polyfill/lib/es2015-collection';
//import 'ts-polyfill/lib/es2016-array-include';
//import 'ts-polyfill/lib/es2017-string';
//import 'ts-polyfill/lib/es2017-object';
//import 'ts-polyfill/lib/es2018-promise';

// can be useful for certain apps...
//import 'ts-polyfill/lib/es2015-reflect';
//import 'ts-polyfill/lib/es2017-typed-arrays';


import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
let vm = new Vue(
    {
        el: '#app',
        render: function(h:any){ return h(App)}
    }
);