<template lang="">
    <!--Banner-->
    <banner></banner>
    <!--Banner-->
    


    <section class="section ec-new-product section-space-p" id="arrivals">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">New Arrivals</h2>
                        <h2 class="ec-title">New Arrivals</h2>
                        <p class="sub-title">Browse The Collection of Top Products</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <!-- New Product Content -->
                <products-component 
                 :productObject="home_products.productsNewArrival"
                 :title="'new-arrivals'"
                 :class="'col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 ec-product-content'"
                >
                </products-component>
            </div>
        </div>
    </section>

    <!-- Product tab Area Start -->
    <!-- <section class="section ec-product-tab section-space-p" id="collection">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">Our Top Collection</h2>
                        <h2 class="ec-title">Our Top Collection</h2>
                        <p class="sub-title">Browse The Collection of Top Products</p>
                    </div>
                </div>

                <div class="col-md-12 text-center">
                    <ul class="ec-pro-tab-nav nav justify-content-center">
                        <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#tab-pro-for-you">For
                                You</a></li>
                        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-pro-for-men">For
                                Men</a></li>
                        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-pro-for-women">For
                                Women</a></li>
                        <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#tab-pro-for-hot-items">Hot items</a></li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="tab-content">
                        <div class="tab-pane fade for-you show active" id="tab-pro-for-you">
                            <div class="row">
                                <products-component 
                                :productObject="home_products.productsSortedAdmin" :title="'for-you'">
                                </products-component>
                                <div class="col-sm-12 shop-all-btn"><a href="shop-left-sidebar-col-3.html">Shop All Collection</a></div>
                            </div>
                        </div>
                        <div class="tab-pane fade for-men" id="tab-pro-for-men">
                            <div class="row">
                                <products-component 
                                :productObject="home_products.producsForMan" :title="'for-men'">
                                </products-component>
                                <div class="col-sm-12 shop-all-btn"><a href="shop-left-sidebar-col-3.html">Shop All Collection</a></div>
                            </div>
                        </div>
                        <div class="tab-pane fade for-women" id="tab-pro-for-women">
                            <div class="row">
                                <products-component 
                                :productObject="home_products.producsForWomen" :title="'for-women'">
                                </products-component>
                                <div class="col-sm-12 shop-all-btn"><a href="shop-left-sidebar-col-3.html">Shop All Collection</a></div>
                            </div>
                        </div>
                        <div class="tab-pane fade hot-items" id="tab-pro-for-hot-items">
                            <div class="row">
                                <products-component 
                                :productObject="home_products.productsHotItem" :title="'hot-items'">
                                </products-component>
                                <div class="col-sm-12 shop-all-btn"><a href="shop-left-sidebar-col-3.html">Shop All Collection</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->
    <!-- ec Product tab Area End -->

    <!--  Category Section Start -->
    <section class="section ec-category-section section-space-p" id="categories">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">Our Top Collection</h2>
                        <h2 class="ec-title">Top Sales</h2>
                        <p class="sub-title">Browse The Collection of Top Categories</p>
                    </div>
                </div>
            </div>

            <div class="row">
                <!--Category Nav Start -->
                <div class="col-lg-3">
                    <ul class="ec-cat-tab-nav nav justify-content-start">
                        <li class="cat-item"
                          v-for="(categoriesHome, index) in home_products.SubCategory"
                          v-key="categoriesHome.id"
                          >
                            <a 
                                class="cat-link" 
                                data-bs-toggle="tab" 
                                :class="{ 'active show': index === 0 }"
                                :href="'#tab-cat-'+categoriesHome.id"
                            >
                                <div class="cat-desc"><span>{{categoriesHome.name_en}}</span><span>{{categoriesHome.products_count}} Products</span></div>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- Category Nav End -->
                <!--Category Tab Start -->
                <div class="col-lg-9">
                    <div class="tab-content">
                        <!-- 1st Category tab end -->
                        <div 
                            class="tab-pane fade" 
                            v-for="(categoriesHome, index) in home_products.SubCategory"
                            v-key="categoriesHome"
                            :class="{ 'active show': index === 0 }"
                            :id="'tab-cat-'+categoriesHome.id"
                            >
                            <div class="row img-responsive-products">
                                <img :src="route + categoriesHome['image']" alt=""/>
                            </div>
                            <span class="panel-overlay">
                                <router-link :to="`/subCategory/${categoriesHome.id}`" class="btn btn-primary">View All</router-link>
                            </span>
                        </div>
                        <!-- 1st Category tab end -->
                    </div>
                    <!-- Category Tab End -->
                </div>
            </div>
        </div>
    </section>
    <!-- Category Section End -->

    <!--  Feature & Special Section Start -->
    <!-- <section class="section ec-fre-spe-section section-space-p" id="offers">
        <div class="container">
            <div class="row">
                 Feature Section Start
                <div class="ec-fre-section margin-b-30">
                    <div class="col-md-12 text-left">
                        <div class="section-title">
                            <h2 class="ec-bg-title">Flash sale</h2>
                            <h2 class="ec-title">Flash sale</h2>
                        </div>
                    </div>
                    <swiper
                        :slides-per-view="1"
                        :space-between="0"
                        ref="swiperRef"
                        class="ec-fre-products"
                        :navigation="true"
                        :modules="modules"
                        @swiper="onSwiper"
                        :autoplay="true"
                        @slideChange="onSlideChange"
                    >
                        <swiper-slide 
                            class="ec-fs-product"
                            v-for="flashProduct in home_products.products_FlashSale"
                            :key="flashProduct.id"
                        >
                            <div class="ec-fs-pro-inner">
                                <div class="ec-fs-pro-image-outer col-lg-6 col-md-6 col-sm-6">
                                    <div class="ec-fs-pro-image">
                                        <a href="product-left-sidebar.html" class="image"><img class="main-image"
                                                :src="route + flashProduct['image']" alt="Product" /></a>
                                        <a href="#" class="quickview" data-link-action="quickview" title="Quick view"
                                            data-bs-toggle="modal" data-bs-target="#ec_quickview_modal"><img
                                                src="@/assets/images/icons/quickview.svg" class="svg_img pro_svg"
                                                alt="" /></a>
                                    </div>
                                </div>
                                <div class="ec-fs-pro-content col-lg-6 col-md-6 col-sm-6">
                                    <h5 class="ec-fs-pro-title"><a href="product-left-sidebar.html">{{flashProduct['name']}}</a>
                                    </h5>
                                    <div class="ec-fs-price">
                                        <span class="old-price">$549.00</span>
                                        <span class="new-price">{{flashProduct['final_price']}}</span>
                                    </div>

                                    <div class="countdowntimer">
                                        <span id="ec-fs-count-2" class="style colorDefinition labelformat">
                                            <vue-countdown class="d-block" :time="calculateTimeRemaining(flashProduct['discount_end'])" v-slot="{ days, hours, minutes, seconds }">
                                                <span class="timerDisplay label4">
                                                    <span class="displaySection">
                                                        <span class="numberDisplay">{{days}}</span>
                                                        <span class="periodDisplay">Days</span>
                                                    </span>
                                                    <span class="displaySection">
                                                        <span class="numberDisplay">{{hours}}</span>
                                                        <span class="periodDisplay">Hours</span>
                                                    </span>
                                                    <span class="displaySection">
                                                        <span class="numberDisplay">{{minutes}}</span>
                                                        <span class="periodDisplay">Minutes</span>
                                                    </span>
                                                    <span class="displaySection">
                                                        <span class="numberDisplay">{{seconds}}</span>
                                                        <span class="periodDisplay">Seconds</span>
                                                    </span>
                                         
                                                </span>
                                            </vue-countdown>
                                         
                                        </span>
                                    </div>
                                    <div class="ec-fs-pro-desc">Lorem Ipsum is simply dummy text the printing and
                                        typesetting.
                                    </div>
                                    <div class="ec-fs-pro-btn">
                                        <a href="#" class="btn btn-lg btn-primary">Details</a>
                                    </div>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
                 Feature Section End
            </div>
        </div>
    </section> -->
    <!-- Feature & Special Section End -->

    <section class="section ec-services-section section-space-p" id="services">
        <h2 class="d-none">Services</h2>
        <div class="container">
            <div class="row">
                <div class="ec_ser_content ec_ser_content_1 col-sm-12 col-md-6 col-lg-3 zoomIn" data-animation="zoomIn" data-animated="true">
                    <div class="ec_ser_inner">
                        <div class="ec-service-image">
                            <img src="@/assets/images/icons/service_1.svg" class="svg_img" alt="">
                        </div>
                        <div class="ec-service-desc">
                            <h2>Free Shipping</h2>
                            <p>Free shipping inside Egypt or order above $200</p>
                        </div>
                    </div>
                </div>
                <div class="ec_ser_content ec_ser_content_2 col-sm-12 col-md-6 col-lg-3 zoomIn" data-animation="zoomIn" data-animated="true">
                    <div class="ec_ser_inner">
                        <div class="ec-service-image">
                            <img src="@/assets/images/icons/service_2.svg" class="svg_img" alt="">
                        </div>
                        <div class="ec-service-desc">
                            <h2>Best prices</h2>
                            <p>Contact us 24 hours a day, 7 days a week</p>
                        </div>
                    </div>
                </div>
                <div class="ec_ser_content ec_ser_content_3 col-sm-12 col-md-6 col-lg-3 zoomIn" data-animation="zoomIn" data-animated="true">
                    <div class="ec_ser_inner">
                        <div class="ec-service-image">
                            <img src="@/assets/images/icons/service_3.svg" class="svg_img" alt="">
                        </div>
                        <div class="ec-service-desc">
                            <h2>Cash back</h2>
                            <p>Simply return it within 30 days for an exchange</p>
                        </div>
                    </div>
                </div>
                <div class="ec_ser_content ec_ser_content_4 col-sm-12 col-md-6 col-lg-3 zoomIn" data-animation="zoomIn" data-animated="true">
                    <div class="ec_ser_inner">
                        <div class="ec-service-image">
                            <img src="@/assets/images/icons/service_4.svg" class="svg_img" alt="">
                        </div>
                        <div class="ec-service-desc">
                            <h2>Payment Secure</h2>
                            <p>Contact us 24 hours a day, 7 days a week</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- <section class="ec-banner section section-space-p">
        <h2 class="d-none">Banner</h2>
        <div class="container">
            <div class="ec-banner-inner">
                <div class="ec-banner-block ec-banner-block-2">
                    <div class="row">
                        <div 
                            class="banner-block col-lg-6 col-md-12 margin-b-30 slideInRight"
                            v-for="category in home_products.categoriesHome"
                            data-animation="slideInRight" 
                            data-animated="true"
                         >
                            <div class="bnr-overlay">
                                <img :src="route + category.image" alt="">
                                <div class="banner-text">
                                    <span class="ec-banner-stitle">New Arrivals</span>
                                    <span class="ec-banner-title">{{category.name}}</span>
                                    <span class="ec-banner-discount">30% Discount</span>
                                </div>
                                <div class="banner-content">
                                    <span class="ec-banner-btn"><a href="#">Order Now</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section> -->
    <section 
        class="section ec-offer-section section-space-p section-space-m"
        :style="{ backgroundImage: 'url('+ route + home_products.advertisements[0]['image'] + ')' }"
    >
        <a :href="home_products.advertisements[0]['banner_url']">
            <h2 class="d-none">Offer</h2>
            <div class="container">
                <div class="row justify-content-end">
                    <div class="col-xl-6 col-lg-7 col-md-7 col-sm-7 align-self-center ec-offer-content">
                        <h2 class="ec-offer-title text-light">{{home_products.advertisements[0]['name']}}</h2>
                        <h3 class="ec-offer-stitle slideInDown text-light" data-animation="slideInDown" data-animated="true">Super Offer</h3>
                        <span class="ec-offer-img zoomIn" data-animation="zoomIn" data-animated="true"><img :src="route + home_products.advertisements[0]['image']" alt="offer image"></span>
                        <!-- إعلان -->
                    </div>
                </div>
            </div>
        </a>
    </section>



    
</template>
<script>
import { mapActions, mapState } from "vuex";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
export default {
    computed: {
        ...mapState(['home_products','route']),
    },
    components: {
      Swiper,
      SwiperSlide,
    },
    methods: {
        ...mapActions(['GetHomeProducts']),
        async fetchHomeProducts() {
            await this.GetHomeProducts();
        },
        goToNextSlide() {
            if (this.$refs.swiperRef) {
                console.log(this.$refs)
                // this.$refs.swiperRef.swiperRef.swiperNext;
            }
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
        goToPrevSlide() {
            if (this.$refs.swiperRef) {
                this.$refs.swiperRef.swiperRef.swiperPrev();
            }
        },
        calculateTimeRemaining(discountEnd) {
            const discountEndTimestamp = new Date(discountEnd).getTime();
            const currentTimestamp = new Date().getTime();
            const timeRemaining = Math.max(discountEndTimestamp - currentTimestamp, 0);
            return timeRemaining;
        },
    },
    mounted() {
        this.fetchHomeProducts();
    },
    setup() {
      return {
        modules: [Navigation],
      };
    },
}
</script>
<style lang="">
    
</style>