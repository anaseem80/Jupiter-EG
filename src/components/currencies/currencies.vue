<template lang="">
    <div class="header-top-curr dropdown">
        <button class="dropdown-toggle text-upper" data-bs-toggle="dropdown">{{$t("Currency")}} <i
                class="ecicon eci-caret-down" aria-hidden="true"></i></button>
        <ul class="dropdown-menu">
            <li 
            class="active"
            @click="ChangeCurrency(currency['code'])"
            v-for="currency in currencies"
            :key="currency"
            >
                <a class="dropdown-item" href="javascript:void(0)">{{currency['code']}}</a>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
    computed: {
        ...mapState(['currencies']),
    },
    methods: {
        ...mapActions(['GetCurrencies']),
        async fetchCurrencies() {
            await this.GetCurrencies();
        },
        ChangeCurrency(currency){
            this.$store.commit("CHANGE_CURRENY",currency)
            window.location.reload()
        }
    },
    mounted() {
        this.fetchCurrencies();
    },
}
</script>
<style lang="">
    
</style>