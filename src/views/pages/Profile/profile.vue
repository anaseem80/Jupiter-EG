<template lang="">
    <!-- User profile section -->
    <section class="ec-page-content ec-vendor-uploads ec-user-account section-space-p" v-if="this.isAuthenticated.user">
        <div class="container">
            <div class="row">
                <!-- Sidebar Area Start -->
                <div class="ec-shop-leftside ec-vendor-sidebar col-lg-3 col-md-12">
                    <div class="ec-sidebar-wrap">
                        <!-- Sidebar Category Block -->
                        <div class="ec-sidebar-block">
                            <div class="ec-vendor-block">
                                <div class="ec-vendor-block-items">
                                    <ul class="ec-cat-tab-nav nav d-block">
                                        <li class="cat-item">
                                        <a 
                                        class="cat-link active show" 
                                        data-bs-toggle="tab" 
                                        href="#tab-cat-profile"
                                        >
                                            User Profile
                                        </a>
                                        </li>
                                        <li class="cat-item">
                                        <a 
                                        class="cat-link" 
                                        data-bs-toggle="tab" 
                                        href="#tab-cat-address"
                                        >
                                            Address
                                        </a>
                                        </li>
                                        <li class="cat-item">
                                        <a 
                                        class="cat-link" 
                                        data-bs-toggle="tab" 
                                        href="#tab-cat-orders"
                                        >
                                            Orders
                                        </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ec-shop-rightside col-lg-9 col-md-12">
                    <div class="ec-vendor-dashboard-card ec-vendor-setting-card position-relative">
                        <transition name="fade" mode="out-in">
                            <div v-if="isLoading('UserData')" class="loader position-absolute top-0 w-100 h-100 d-flex justify-content-center align-items-center">
                                <loading-outlined class="fs-3"/>
                            </div>
                        </transition>
                        <div class="ec-vendor-card-body">
                            <div class="row tab-content">
                                <user-settings />
                                <user-address />
                                <user-orders />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End User profile section -->
</template>
<script>
import { router } from "@/router";
import {LoadingOutlined} from '@ant-design/icons-vue';

export default {
    data(){
        return{
            emailBOOL: false,
        }
    },
    created(){
        if(this.isAuthenticated.user == null){
           router.push("/");
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
    },
    methods:{
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    },
    components: {
        LoadingOutlined
    },
}
</script>
<style lang="">
    
</style>