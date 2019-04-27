<template>
    <div class="container">

            <h2 class="card-header">Astronomy Picture of the Day. {{date}}</h2>
            <img :src="url" class="img-fluid" :title="title">
            <h3 class="card-footer">from NASA.gov</h3>
    </div>
</template>

<script lang="ts">
    /**
     * Use of getter and setter to computed value to simplify two way conversion of temperature.
     */
    import Vue from 'vue';
    import axios from 'axios';

    export default Vue.extend(
        {
            data() {
                return {
                    url:"",
                    title:"",
                    date:""
                }
            },
            methods: {
                fetchAPOD : function () {
                 //   let apiKey = 'DEMO_KEY'; //replace with real apikey. demo key is for limited use only
                    let apiKey = '7mUh8iioKZFlbIvludFrzdeUauQeReg35rNZUqyE' //nasa.gov api key for dutch@adachis.info
                    let url = 'https://api.nasa.gov/planetary/apod?api_key=' + apiKey;
                    axios.get(url)
                        .then((res) => {
                           this.url=res.data.url;
                           this.title=res.data.title;
                            this.date=res.data.date;
                        })
                },

            },

            created: function () {
                this.fetchAPOD();
            }

        }
    )
</script>

<style scoped>
    [v-cloak] {display:none}
</style>