<template>
    <div class="container">
        <div class="card mt-5">
            <h2 class="card-header">Near-Earth Objects</h2>

            <table class="table" v-cloak>
                <thead class="thead-light">
                <th>#</th>
                <th>Name</th>
                <th>Close Approach Date</th>
                <th>Miss Distance</th>
                </thead>
                <tbody>
                <tr v-for="(a,index) in asteroids">
                    <td>{{index+1}}</td>
                    <td>{{a.name}}</td>
                    <td>{{getCloseApproachDate(a)}}</td>
                    <td>
                        <ul v-if="a.close_approach_data.length>0">
                            <li v-for="(value,key) in a.close_approach_data[0].miss_distance">
                                {{key}}:{{value}}
                            </li>
                        </ul>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
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
                    asteroids: [] as any
                }
            },
            methods: {
                fetchAsteroids: function () {
                    let apiKey = 'DEMO_KEY'; //replace with real apikey. demo key is for limited use only
                    let url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=' + apiKey;
                    axios.get(url)
                        .then((res) => {
                            this.asteroids = res.data.near_earth_objects.slice(0, 10);
                        })
                },
                getCloseApproachDate: function(a:any){
                    if (a.close_approach_data.length>0){
                        return a.close_approach_data[0].close_approach_date
                    }
                    return 'N/A'

                }
            },
            created: function () {
                this.fetchAsteroids();
            }


        }
    )
</script>

<style scoped>
    [v-cloak] {display:none}
</style>