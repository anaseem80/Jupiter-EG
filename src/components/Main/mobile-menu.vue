<template lang="">
    <div id="ec-mobile-menu" class="ec-side-cart ec-mobile-menu">
        <div class="ec-menu-title">
            <span class="menu_title">{{$t("My Menu")}}</span>
            <button class="ec-close">×</button>
        </div>
        <div class="ec-menu-inner">
            <div class="ec-menu-content">
                <ul>
                    <span class="menu-toggle"></span>
                    <li @click="hideMenu()"><router-link to="/toprate" @click="$store.dispatch('GetProductsByCurrentCategory',{page: 1, route:'products/toprate'})">{{$t("Top Rate")}}</router-link></li>
                    <li @click="hideMenu()"><router-link to="/last" @click="$store.dispatch('GetProductsByCurrentCategory',{page: 1, route:'products/last'})">{{$t("Last Products")}}</router-link></li>
                    <li @click="hideMenu()"><router-link to="/with-offers" @click="$store.dispatch('GetProductsByCurrentCategory',{page: 1, route:'products/with-offers'})">{{$t("Hot Offers")}}</router-link></li>
                </ul>
            </div>
            <div class="header-res-lan-curr">
                <div class="header-top-lan-curr">
                    <!-- Language Start -->
                    <language-dropdown />
                    <!-- Language End -->
                    <!-- Currency Start -->
                    <currency />
                    <!-- Currency End -->
                </div>
                <!-- Social Start -->
                <div class="header-res-social">
                    <div class="header-top-social">
                        <social-links></social-links>
                    </div>
                </div>
                <!-- Social End -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        hideMenu(){
            $(".ec-side-cat-overlay").fadeOut();
            $(".ec-side-cart-overlay").fadeOut();
            $(".category-sidebar").removeClass("ec-open");
            $(".ec-mobile-menu").removeClass("ec-open");
        }
    },
   
}
</script>
<style lang="">
    
</style>