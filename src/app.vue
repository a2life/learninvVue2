<template>
    <div class="container">
        <div class="card mt-5">
            <h2 class="card-header">Near-Earth Objects</h2>
            <div class="m-3" v-cloak v-if="numAsteroids>0">
                <p>Showing {{numAsteroids}} items</p>
            </div>

            <table class="table" v-cloak>

                <thead class="thead-light">
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Close Approach Date</th>
                <th>Miss Distance</th>
                <th>Remove</th>
                </tr>`
                </thead>
                <tbody>
                <tr v-for="(a,index) in asteroids" :key="a.neo_reference_id">
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
                    <td><button @click="remove(index)" class="bton btn-warning">remove</button></td>
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
                fetchAsteroids : function () {
                    let apiKey = 'DEMO_KEY'; //replace with real apikey. demo key is for limited use only

                    let url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=' + apiKey;
                    axios.get(url)
                        .then((res) => {
                            (this as any).asteroids = res.data.near_earth_objects.slice(0, 15);
                        })
                },
                 getCloseApproachDate: function(a:any){
                    if (a.close_approach_data.length>0){
                        return a.close_approach_data[0].close_approach_date
                    }
                    return 'N/A'

                },
                remove: function(index:number){
                    (this as any).asteroids.splice(index,1)
                }
            },

            created: function () {
                (this as any).fetchAsteroids();
            },
            computed: {
                numAsteroids: function(){
                    return ((this as any).asteroids.length as number)
                }
            }

        }
    )
</script>

<style scoped>
    [v-cloak] {display:none}
</style>