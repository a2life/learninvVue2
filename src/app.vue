<template>
    <div class="container">

            <h2 class="card-header">Astronomy Picture of the Day. {{date}}</h2>
            <img v-if="urlIsImage" :src="url" class="img-fluid" :title="title">
        <iframe v-else width="100%" height="315"  :src="url" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <h3 class="card-footer">from NASA.gov, {{date}}</h3>
    </div>
</template>

<script lang="ts">

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
                    let apiKey = 'DEMO_KEY'; //replace with real apikey. demo key is for limited use only
                    let url = 'https://api.nasa.gov/planetary/apod?api_key=' + apiKey;
                    axios.get(url)
                        .then((res) => {
                           this.url=res.data.url;
                           this.title=res.data.title;
                            this.date=res.data.date;
                        })
                }

            },
            computed: {
                urlisImage: function():boolean {
                    return (this.url.includes('.jpg'))//APOD api sometimes return youtube Video. Need to address this
                }
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