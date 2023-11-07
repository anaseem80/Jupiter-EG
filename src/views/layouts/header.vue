<template lang="">
    <!-- Header start  -->
    <header class="ec-header">
        <!--Ec Header Top Start -->
        <div class="header-top">
            <div class="container">
                <div class="row align-items-center">
                    <!-- Header Top social Start -->
                    <div class="col text-left header-top-left d-none d-lg-block">
                        <div class="header-top-social">
                            <span class="social-text text-upper">Follow us on:</span>
                            <social-links></social-links>
                        </div>
                    </div>
                    <!-- Header Top social End -->
                    <!-- Header Top Message Start -->
                    <div class="col text-center header-top-center">
                        <div class="header-top-message text-upper">
                            <span>Free Shipping</span>This Week Order Over - $75
                        </div>
                    </div>
                    <!-- Header Top Message End -->
                    <!-- Header Top Language Currency -->
                    <div class="col header-top-right d-none d-lg-block">
                        <div class="header-top-lan-curr d-flex justify-content-end">
                            <!-- Currency Start -->
                            <div class="header-top-curr dropdown">
                                <button class="dropdown-toggle text-upper" data-bs-toggle="dropdown">Currency <i
                                        class="ecicon eci-caret-down" aria-hidden="true"></i></button>
                                <ul class="dropdown-menu">
                                    <li class="active"><a class="dropdown-item" href="#">USD $</a></li>
                                    <li><a class="dropdown-item" href="#">EUR €</a></li>
                                </ul>
                            </div>
                            <!-- Currency End -->
                            <!-- Language Start -->
                            <div class="header-top-lan dropdown">
                                <button class="dropdown-toggle text-upper" data-bs-toggle="dropdown">Language <i
                                        class="ecicon eci-caret-down" aria-hidden="true"></i></button>
                                <ul class="dropdown-menu">
                                    <li class="active"><a class="dropdown-item" href="#">English</a></li>
                                    <li><a class="dropdown-item" href="#">Italiano</a></li>
                                </ul>
                            </div>
                            <!-- Language End -->

                        </div>
                    </div>
                    <!-- Header Top Language Currency -->
                    <!-- Header Top responsive Action -->
                    <div class="col d-lg-none ">
                        <div class="ec-header-bottons">
                            <a-tooltip v-if="isAuthenticated.bool" placement="bottom">
                                <template #title>You can replace these points!</template>
                                <a href="wishlist.html" class="ec-header-btn ec-header-wishlist">
                                    <div class="header-icon"><img src="@/assets/images/icons/icon.gif"
                                            class="svg_img header_svg icon-gif" alt="" /></div>
                                            <span class="ec-header-count" v-if="userData">{{userData.points}}</span>
                                </a>
                            </a-tooltip>
                            <!-- Header User Start -->
                            <div class="ec-header-user dropdown">
                                <button class="dropdown-toggle" data-bs-toggle="dropdown"><img
                                        src="@/assets/images/icons/user.svg" class="svg_img header_svg" alt="" /></button>
                                <ul class="dropdown-menu dropdown-menu-right">
                                    <li><a class="dropdown-item" href="checkout.html">Checkout</a></li>
                                    <li v-if="!isAuthenticated.bool"><router-link class="dropdown-item" to="/login">Login</router-link></li>
                                        <li v-if="isAuthenticated.bool">
                                            <button class="dropdown-item" @click="Logout" :disabled="isLoading('Logout')">
                                                Logout
                                                <img src="@/assets/images/common/loader-2.gif" width="20" v-if="isLoading('Logout')" class="ms-3">
                                            </button>
                                    </li>
                                </ul>
                            </div>
                            <!-- Header User End -->
                            <!-- Header Cart Start -->
                            <a href="wishlist.html" class="ec-header-btn ec-header-wishlist">
                                <div class="header-icon"><img src="@/assets/images/icons/wishlist.svg"
                                        class="svg_img header_svg" alt="" /></div>
                                <span class="ec-header-count">4</span>
                            </a>
                            <!-- Header Cart End -->
                            <!-- Header Cart Start -->
                            <a v-if="isAuthenticated.token != null ? isAuthenticated.token : UserIDToken" href="#ec-side-cart" class="ec-header-btn ec-side-toggle" @click="CartMenuOpen($event.target)">
                                <div class="header-icon"><img src="@/assets/images/icons/cart.svg"
                                        class="svg_img header_svg" alt="" /></div>
                                <span class="ec-header-count cart-count-lable" v-if="cart">{{cart.cart_items.length}}</span>
                            </a>
                            <!-- Header Cart End -->
                            <a href="javascript:void(0)" class="ec-header-btn ec-sidebar-toggle" @click="CategoryMenuOpen()">
                                <img src="@/assets/images/icons/category-icon.svg" class="svg_img header_svg" alt="icon" />
                            </a>
                            <!-- Header menu Start -->
                            <a href="#ec-mobile-menu" class="ec-header-btn ec-side-toggle d-lg-none" @click="MenuOpen($event.target)">
                                <img src="@/assets/images/icons/menu.svg" class="svg_img header_svg" alt="icon" />
                            </a>
                            <!-- Header menu End -->
                        </div>
                    </div>
                    <!-- Header Top responsive Action -->
                </div>
            </div>
        </div>
        <!-- Ec Header Top  End -->
        <!-- Ec Header Bottom  Start -->
        <div class="ec-header-bottom d-none d-lg-block">
            <div class="container position-relative">
                <div class="row">
                    <div class="ec-flex">
                        <!-- Ec Header Logo Start -->
                        <div class="align-self-center">
                            <div class="header-logo" v-if="settings">
                                <router-link to="/"><img :src="route+settings.logo" alt="Site Logo" /><img
                                        class="dark-logo" src="@/assets/images/logo/dark-logo.png" alt="Site Logo"
                                        style="display: none;" /></router-link>
                            </div>
                        </div>
                        <!-- Ec Header Logo End -->

                        <!-- Ec Header Search Start -->
                        <div class="align-self-center">
                            <div class="header-search">
                                <search />
                            </div>
                        </div>
                        <!-- Ec Header Search End -->

                        <!-- Ec Header Button Start -->
                        <div class="align-self-center">
                            <div class="ec-header-bottons">
                                <a-tooltip v-if="isAuthenticated.bool" placement="bottom">
                                <template #title>You can replace these points!</template>
                                <a href="wishlist.html" class="ec-header-btn ec-header-wishlist">
                                    <div class="header-icon"><img src="@/assets/images/icons/icon.gif"
                                            class="svg_img header_svg icon-gif" alt="" /></div>
                                    <span class="ec-header-count" v-if="userData">{{userData.points}}</span>
                                </a>
                                </a-tooltip>
                                <!-- Header User Start -->
                                <div class="ec-header-user dropdown">
                                    <button class="dropdown-toggle" data-bs-toggle="dropdown"><img
                                            src="@/assets/images/icons/user.svg" class="svg_img header_svg" alt="" /></button>
                                    <ul class="dropdown-menu dropdown-menu-right">
                                        <li><a class="dropdown-item" href="checkout.html">Checkout</a></li>
                                        <li v-if="!isAuthenticated.bool"><router-link class="dropdown-item" to="/login">Login</router-link></li>
                                        <li v-if="isAuthenticated.bool">
                                            <button class="dropdown-item" @click="Logout" :disabled="isLoading('Logout')">
                                                Logout
                                                <img src="@/assets/images/common/loader-2.gif" width="20" v-if="isLoading('Logout')" class="ms-3">
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                                <!-- Header User End -->
                                <!-- Header User Start -->
                                <a href="wishlist.html" class="ec-header-btn ec-header-wishlist">
                                    <div class="header-icon"><img src="@/assets/images/icons/wishlist.svg"
                                            class="svg_img header_svg" alt="" /></div>
                                    <span class="ec-header-count">4</span>
                                </a>
                                <!-- Header User End -->
                                <!-- Header Points Start -->       
                                                 
                                <!-- Header Points End -->
                                <!-- Header Cart Start -->
                                <a v-if="isAuthenticated.token != null ? isAuthenticated.token : UserIDToken" href="#ec-side-cart" class="ec-header-btn ec-side-toggle" @click="CartMenuOpen($event.target)">
                                    <div class="header-icon"><img src="@/assets/images/icons/cart.svg"
                                            class="svg_img header_svg" alt="" /></div>
                                    <span class="ec-header-count cart-count-lable" v-if="cart">{{cart.cart_items.length}}</span>
                                </a>
                                <!-- Header Cart End -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Ec Header Button End -->
        <!-- Header responsive Bottom  Start -->
        <div class="ec-header-bottom d-lg-none">
            <div class="container position-relative">
                <div class="row ">

                    <!-- Ec Header Logo Start -->
                    <div class="col">
                        <div class="header-logo" v-if="settings">
                            <router-link to="/"><img :src="route+settings.logo" alt="Site Logo" width="50"/><img
                                    class="dark-logo" src="@/assets/images/logo/dark-logo.png" alt="Site Logo"
                                    style="display: none;" /></router-link>
                        </div>
                    </div>
                    <!-- Ec Header Logo End -->
                    <!-- Ec Header Search Start -->
                    <div class="col">
                        <div class="header-search">
                            <search />
                        </div>
                    </div>
                    <!-- Ec Header Search End -->
                </div>
            </div>
        </div>
        <!-- Header responsive Bottom  End -->
        <!-- EC Main Menu Start -->
        <div id="ec-main-menu-desk" class="d-none d-lg-block sticky-nav">
            <div class="container position-relative">
                <div class="row">
                    <div class="col-md-12 align-self-center">
                        <div class="ec-main-menu">
                            <a href="javascript:void(0)" class="ec-header-btn ec-sidebar-toggle" @click="CategoryMenuOpen()">
                                <img src="@/assets/images/icons/category-icon.svg" class="svg_img header_svg" alt="icon" />
                            </a>
                            <ul>
                                <li><router-link to="/">Home</router-link></li>
                                <li class="dropdown position-static"><a href="javascript:void(0)">Categories</a>
                                    <ul class="mega-menu d-block">
                                        <li class="d-flex">
                                            <ul 
                                                v-if="home_products.categoriesWithSubcategories"
                                                class="d-block"
                                                v-for="(category, index) in home_products.categoriesWithSubcategories.slice(0,4)"
                                            >
                                                <li class="menu_title"><a href="javascript:void(0)">{{category.name}}</a></li>
                                                <li
                                                    v-for="subCategory in category.subcategories"
                                                >
                                                    <router-link :to="`/subCategory/${subCategory.id}`">{{subCategory.name}}</router-link>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <ul class="ec-main-banner w-100">
                                                <li
                                                v-if="home_products.categoriesWithSubcategories"
                                                v-for="(category, index) in home_products.categoriesWithSubcategories.slice(0,4)"
                                                >
                                                    <a class="p-0 h-100" href="shop-left-sidebar-col-3.html">
                                                        <img 
                                                            class="img-responsive h-100" 
                                                            :src="route + category.image"
                                                            alt=""
                                                        >
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                
                                
                                
                               
                                <li><router-link to="/toprate" @click="$store.dispatch('GetProductsByCurrentCategory',{page: 1, route:'products/toprate'})">Top Rate</router-link></li>
                                <li><router-link to="/last" @click="$store.dispatch('GetProductsByCurrentCategory',{page: 1, route:'products/last'})">Last Products</router-link></li>
                                <li><router-link to="/with-offers" @click="$store.dispatch('GetProductsByCurrentCategory',{page: 1, route:'products/with-offers'})">Hot Offers</router-link></li>
                                <li class="dropdown scroll-to"><a href="javascript:void(0)"><img
                                    src="@/assets/images/icons/scroll.svg" class="svg_img header_svg scroll" alt="" /></a>
                                    <ul class="sub-menu">
                                        <li class="menu_title">Scroll To Section</li>
                                        <li><a href="javascript:void(0)" data-scroll="collection" class="nav-scroll">Top Collection</a></li>
                                        <li><a href="javascript:void(0)" data-scroll="categories" class="nav-scroll">Categories</a></li>
                                        <li><a href="javascript:void(0)" data-scroll="offers" class="nav-scroll">Offers</a></li>
                                        <li><a href="javascript:void(0)" data-scroll="vendors" class="nav-scroll">Top Vendors</a></li>
                                        <li><a href="javascript:void(0)" data-scroll="services" class="nav-scroll">Services</a></li>
                                        <li><a href="javascript:void(0)" data-scroll="arrivals" class="nav-scroll">New Arrivals</a></li>
                                        <li><a href="javascript:void(0)" data-scroll="reviews" class="nav-scroll">Client Review</a></li>
                                        <li><a href="javascript:void(0)" data-scroll="insta" class="nav-scroll">Instagram Feed</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Ec Main Menu End -->
        <!-- ekka Mobile Menu Start -->
        <!-- ekka mobile Menu End -->
    </header>
    <!-- Header End  -->
</template>
<script>
import VueCookies from 'vue-cookies'
import { mapActions, mapState } from "vuex";

export default {
    data(){
        return{
            UserIDToken: VueCookies.get("UserToken"),
            UserData: VueCookies.get("UserData"),
        }
    },
    methods:{
        ...mapActions(['GetHomeProducts','UserInformation','GetSiteSettings']),
        async fetchHomeProducts() {
            await this.GetHomeProducts();
        },
        async fetchUserInformation() {
            await this.UserInformation();
        },
        async fetchGetSiteSettings() {
            await this.GetSiteSettings();
        },
        Logout(){
            this.$store.dispatch("Logout", { token: this.UserIDToken, toast: this.$toast })
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
        CategoryMenuOpen(){
            $(".ec-side-cat-overlay").fadeIn();
            $(".category-sidebar").addClass("ec-open");


            $(".ec-close").on("click", function () {
                $(".category-sidebar").removeClass("ec-open");
                $(".ec-side-cat-overlay").fadeOut();
            });

            $(".ec-side-cat-overlay").on("click", function () {
                $(".category-sidebar").removeClass("ec-open");
                $(".ec-side-cat-overlay").fadeOut();
            });
        },
        CartMenuOpen($ekkaToggle){
            $(".ec-side-cart-overlay").fadeIn();
            $("#ec-side-cart").addClass("ec-open");
            if ($('.ec-side-toggle').parent().hasClass("mobile-menu-toggle")) {
                $('.ec-side-toggle').addClass("close");
                $(".ec-side-cart-overlay").fadeOut();
            }

            $(".ec-side-cart-overlay").on("click", function(e) {
            $(".ec-side-cart-overlay").fadeOut();
            $("#ec-side-cart").removeClass("ec-open");
            $(".mobile-menu-toggle").find("a").removeClass("close");
        });

            $(".ec-close").on("click", function(e) {
                e.preventDefault();
                $(".ec-side-cart-overlay").fadeOut();
                $("#ec-side-cart").removeClass("ec-open");
                $(".mobile-menu-toggle").find("a").removeClass("close");
            });   
        },
        MenuOpen(e){
            var $ekkaToggle = $(".ec-side-toggle"),
            $ekka = $(".ec-mobile-menu"),
            $ecMenuToggle = $(".mobile-menu-toggle");
            var $this = $($ekkaToggle),
            $target = $this.attr("href");
            $(".ec-side-cart-overlay").fadeIn();
            $("#ec-mobile-menu").addClass("ec-open");
            if ($this.parent().hasClass("mobile-menu-toggle")) {
                    $this.addClass("close");
                    $(".ec-side-cart-overlay").fadeOut();
            }
            
            $(".ec-side-cart-overlay").on("click", function(e) {
                $(".ec-side-cart-overlay").fadeOut();
                $ekka.removeClass("ec-open");
                $ecMenuToggle.find("a").removeClass("close");
            });

            $(".ec-close").on("click", function(e) {
                e.preventDefault();
                $(".ec-side-cart-overlay").fadeOut();
                $ekka.removeClass("ec-open");
                $ecMenuToggle.find("a").removeClass("close");
            });
        }
    },
    computed: {
        ...mapState([`home_products`,'route','cart','userData','settings']),
        isAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
    },
    mounted() {
    var doc = document.documentElement;
    var w = window;

    var ecprevScroll = w.scrollY || doc.scrollTop;
    var eccurScroll;
    var ecdirection = 0;
    var ecprevDirection = 0;
    var ecscroll_top = $(window).scrollTop() + 1;
    var echeader = document.getElementById('ec-main-menu-desk');

    var checkScroll = function() {

        eccurScroll = w.scrollY || doc.scrollTop;
        if (eccurScroll > ecprevScroll) { 
            //scrolled up
            ecdirection = 2;
        }
        else if (eccurScroll < ecprevScroll) { 
            //scrolled down
            ecdirection = 1;
        }

        if (ecdirection !== ecprevDirection) {
            toggleHeader(ecdirection, eccurScroll);
        }

        ecprevScroll = eccurScroll;
    };

    var toggleHeader = function(ecdirection, eccurScroll) {                   

        if (ecdirection === 2 && eccurScroll > 52) { 
            // echeader.classList.add('hide');
            ecprevDirection = ecdirection;
            $("#ec-main-menu-desk").addClass("menu_fixed_up");
            // $("#ec-main-menu-desk").removeClass("menu_fixed");
        }
        else if (ecdirection === 1) 
        {
            // echeader.classList.remove('hide');
            ecprevDirection = ecdirection;              
            $("#ec-main-menu-desk").addClass("menu_fixed");  
            $("#ec-main-menu-desk").removeClass("menu_fixed_up");            
        }
    };

    this.fetchHomeProducts();
    this.fetchUserInformation();
    this.fetchGetSiteSettings();
    },
}
</script>
<style lang="">
    
</style>