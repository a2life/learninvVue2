<template>
    <div class="container">
        <div class="card">
            <b-carousel
                id="epic-carousel"
                style="text-shadow: 0 0 2px #000"
                fade
                img-width="1024"
                img-height="480"
                >
           <template v-for="record in records" >
            <b-carousel-slide
                    :caption="record.caption"
                    :img-src="getImageSrc(record)"
                    :key="record.identifier"
                    :id="record.identifier"
            ></b-carousel-slide>
        </template>
        </b-carousel>
        </div>

        <div class="card">
            <h2 class="card-header">EPIC Picture of the Day. </h2>
            <table class="table table-light">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Identifier</th>
                    <th>Image</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(record,index) in records">
                    <td>{{index+1}}</td>
                    <td>{{record.identifier}}</td>
                    <td v-html="getImageThumbs(record)" title="click here for enlarged image"></td>
                </tr>

                </tbody>
            </table>
            <h3 class="card-footer">from NASA.gov</h3>
        </div>
    </div>
</template>

<script lang="ts">

    import Vue from 'vue';
    import axios from 'axios';

    export default Vue.extend(
        {
            data() {
                return {
                    records: {} as any
                }
            },
            methods: {
                fetchEPIC: function () {
                    let apiKey = 'DEMO_KEY'; //replace with real apikey. demo key is for limited use only
                    let url = 'https://api.nasa.gov/EPIC/api/natural/images?api_key=' + apiKey;
                    axios.get(url)
                        .then((res) => {
                            this.records = res.data;
                        })
                },
                getImageThumbs: function (a:any) {
                    let url = `https://epic.gsfc.nasa.gov/archive/natural/`
                        + a.identifier.substr(0, 4) + '/' //year
                        + a.identifier.substr(4, 2) + '/'  // month
                        + a.identifier.substr(6, 2)   //day
                    ;
                    return `<a href="${url}/jpg/${a.image}.jpg"><img src="${url}/thumbs/${a.image}.jpg"></a>`
                },
                getImageSrc: function (a:any) {
                    let url = `https://epic.gsfc.nasa.gov/archive/natural/`
                        + a.identifier.substr(0, 4) + '/' //year
                        + a.identifier.substr(4, 2) + '/'  // month
                        + a.identifier.substr(6, 2)   //day
                    ;
                    return `${url}/jpg/${a.image}.jpg`
                }


            },
            created: function () {
                this.fetchEPIC();
            }


        }
    )
</script>

<style scoped>
    [v-cloak] {
        display: none
    }
</style>