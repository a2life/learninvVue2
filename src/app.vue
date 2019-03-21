<template>
<div class="main">{{message}}</div>
</template>

<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend(
        {
            name: 'MainApp',
            data(){
                return {
                    message: 'Hello World,  told from the point of vue!'
                }
            }
        }
    )
</script>

<style scoped>
 .main {
     color:green;
 }
</style>