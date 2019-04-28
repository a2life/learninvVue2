<template>
    <div class="container">
        <div class="card mt-5">
            <h2 class="card-header">Near-Earth Objects</h2>
            <div class="m-3">
                <p>Showing {{numAsteroids}} items</p>
                <p>{{closestObject.name}} has the shortest missing distance of {{closestObject.miles}} miles </p>
            </div>

            <table class="table" v-cloak>

                <thead class="thead-light">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Close Approach Date</th>
                    <th>Miss Distance</th>
                    <th>Remove</th>
                </tr>
                `
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
                    <td>
                        <button @click="remove(index)" class="bton btn-warning">remove</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">

    interface simpleNeo {
        name:string;
        miles:number;
    }
    import Vue from 'vue';
    import axios from 'axios';

    export default Vue.extend(
        {
            data() {
                return {
                    asteroids: [] as any
                }
            },
            computed: {
                numAsteroids():number { //without type annotation, Typescript will complain about missing type of 'this'
                    return this.asteroids.length;
                },
                closestObject():simpleNeo {
                    let neoWithData = this.asteroids.filter(function (neo: any) {
                        return neo.close_approach_data.length > 0;
                    });
                    let simpleNeos = neoWithData.map(function (neo: any) {
                        return {
                            name: neo.name,
                            miles: neo.close_approach_data[0].miss_distance.miles
                        }
                    });
                    let sortedNeos = simpleNeos.sort(function (a: any, b: any) {
                        return a.miles - b.miles;
                    });
                    return sortedNeos[0]
                }
            },
            methods: {
                fetchAsteroids: function () {
                    let apiKey = 'DEMO_KEY'; //replace with real apikey. demo key is for limited use only

                    let url = 'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=' + apiKey;
                    axios.get(url)
                        .then((res) => {
                            this.asteroids = res.data.near_earth_objects.slice(0, 15);
                        })
                },
                getCloseApproachDate: function (a: any) {
                    if (a.close_approach_data.length > 0) {
                        return a.close_approach_data[0].close_approach_date
                    }
                    return 'N/A'

                },
                remove: function (index: number) {
                    this.asteroids.splice(index, 1)
                }
            },

            created: function () {
                (this as any).fetchAsteroids();
            }


        }
    )
</script>

<style scoped>
    [v-cloak] {
        display: none
    }
</style>