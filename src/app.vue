<template>
    <div class="main">
        <div class="degreeC">
            <label id="labelForDegreeC">Degree C</label>
            <input id="degreeC" v-model.lazy="degreeC" value="0.0"/>
        </div>
        <div class="ferhC">
            <label id="labelForDegreeF">Degree F</label>
            <input id="degreeF" v-model.lazy="degreeF" value="32.0">
        </div>


    </div>
</template>

<script lang="ts">
    /**
     * Use of getter and setter to computed value to simplify two way conversion of temperature.
     */
    import Vue from 'vue';
    import * as numeral from 'numeral'

    export default Vue.extend(
        {
            name: 'MainApp',
            data() {
                return {
                  degreeCSeed: '0.0'
                }
            },
            computed: {
                degreeF: {
                    get(): string {
                        return numeral((parseFloat(this.degreeC) * 9 / 5) + 32).format('0.0')
                    }
                    ,
                    set(newValue: string): void {
                        this.degreeCSeed = numeral((parseFloat(newValue) - 32) * 5 / 9).format('0.0')
                    }

                },
                degreeC: {
                    get(): string {
                        return numeral(parseFloat(this.degreeCSeed)).format('0.0')
                    },
                    set(newValue: string): void {
                        this.degreeCSeed = numeral(parseFloat(newValue)).format('0.0');
                    }
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