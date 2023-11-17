<template lang="">
    <section class="ec-page-content section-space-p">
        <div class="container">
            <div class="row">
                
                <div class="col-md-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">{{$route.name}}</h2>
                        <h2 class="ec-title">{{$route.name}}</h2>
                        <p class="sub-title mb-3">Welcome to the Jupiter EG marketplace</p>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="ec-common-wrapper border p-2">
                        <div class="col-sm-12 ec-cms-block">
                            <div class="ec-cms-block-inner">
                                <p>
                                    {{sidePageData}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    props: ["apiEndpoint", "id"],
    computed: {
        ...mapState(['sidePageData']),
    },
    methods: {
        ...mapActions(['GetSidePageData']),
        async fetchSidePageData() {
            await this.GetSidePageData(this.apiEndpoint);
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    },
    mounted() {
        this.fetchSidePageData();
    },
}
</script>
<style lang="">
    
</style>