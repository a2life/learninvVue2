<template>
    <div class="container">
        <form class="mt-5">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" v-model="email" type="email" clas="form-control form-control-lg">
            </div>
            <button type="submit"  @click.prevent="process" class="btn btn-primary">Submit</button>
        </form>

    </div>
</template>

<script lang="ts">
    /**
     * Use of getter and setter to computed value to simplify two way conversion of temperature.
     */
    import Vue from 'vue'


    export default Vue.extend(
        {
            data() {
                return {
                    email: "a2life@a2life.info"
                }
            },
            methods: {
                process: function(){

                    alert ('submitted ' + this.email)
                }
            }
        }
    )
</script>

<style scoped>
    .main {
        color: green;

    }

</style>