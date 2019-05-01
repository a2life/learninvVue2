<template>
    <div class="container">
    <div class="card mt-5" v-cloak>
        <h2 class="card-header">Near-Earth
            <transition name="spin" appear>
                <span style="display:inline-block;">Objects</span>
            </transition></h2>
        <transition name="flippy">
            <div class="m-3" v-cloak v-if="numAsteroids>0 && showSummary">
                <p>Showing {{numAsteroids}} items</p>
                <p>{{closestObject.name}} has the shortest missing distance of {{closestObject.miles}} miles </p>
            </div>
        </transition>

        <div class="m-3">
            <a href="#" @click="showSummary = !showSummary">Show/hide Summary</a>
        </div>

        <table class="table table-striped" v-cloak>

            <thead class="thead-light">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Close Approach Date</th>
                <th>Miss Distance</th>
                <th>Remove</th>
            </tr>
            </thead>
            <tbody v-cloak is="transition-group" name="neo-list">
            <tr v-for="(a,index) in asteroids" :key="a.neo_reference_id"
                :class="[{missingData:isDataMissing(a)}, 'shadow-sm']" >
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
                    asteroids: [] as any,
                    showSummary:true

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
                    return sortedNeos[0] || {name:"",miles:NaN} //if sortedNeos is undefined still return something
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
                },
                getRowStyle: function(a:any){
                    if (a.close_approach_data.length===0){
                     return {border: 'solid 3px red', color:'red'}
                    }
                },
                isDataMissing: function(a:any){
                    return (a.close_approach_data.length===0)
                }

            },

            created: function () {
                this.fetchAsteroids();
            }


        }
    )
</script>

<style scoped>
    [v-cloak] {
        display: none
    }
    .missingData {
        border: solid 3px red;
        color: red;
    }
    .flippy-leave-to, .flippy-enter {
       transform: translateX(150px) rotate(30deg);
        opacity:0;
    }
    .flippy-enter-active, .flippy-leave-active {
        transition: all .5s ease;
    }
    .neo-list-leave-to, .neo-list-enter{
        opacity:0;
        transform: translateY(30px)
    }
    .neo-list-enter-active, .neo-list-leave-active {
        transition: all .5s linear;
    }
    .spin-enter-active {
        animation: spin-steps 2s;
    }
    @keyframes spin-steps {
        0% {
            transform: scale(1) rotate(0);
        }
        50% {
            transform: scale(10) rotate(360deg);
        }
        100%{
            transform: scale(1) rotate(1080deg);
        }
    }

</style>