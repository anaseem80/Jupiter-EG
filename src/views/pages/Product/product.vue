<template lang="">
    <transition name="fade" mode="out-in">
        <loader v-if="isLoading('GetProductData'+$route.params.id)" key="loader"></loader>
    </transition>
    <section class="ec-page-content section-space-p" v-if="product">
        <div class="container">
            <div class="row">
                <div class="ec-pro-rightside ec-common-rightside col-lg-12 col-md-12">                    
                    <!-- Single product content Start -->
                    <div class="single-pro-block">
                        <div class="single-pro-inner position-relative">
                            <div class="row">
                                <div class="col-lg-5 single-pro-img single-pro-img-no-sidebar">
                                    <div class="single-product-scroll">
                                        <swiper
                                            :slides-per-view="1"
                                            :space-between="0"
                                            class="single-product-cover"
                                            :autoplay="true"
                                        >
                                        <swiper-slide class="single-slide zoom-image-hover">
                                                <img class="img-responsive image-product w-100" @mouseenter="zoomImage()" :src="route + product.product.images[0]['image']"
                                                    alt="">
                                        </swiper-slide>
                                        </swiper>
                                        <swiper
                                            :slides-per-view="4"
                                            :space-between="20"
                                            class="single-nav-thumb gellary mt-3"
                                            :navigation="true"
                                            :modules="modules"
                                            :autoplay="true"
                                        >
                                        <swiper-slide 
                                        class="single-slide p-0"
                                        v-for="image in product.product.images"
                                        >
                                                <img class="img-responsive cursor-pointer" :src="route + image['image']" @click="changeImage(route + image['image'])"
                                                    alt="">
                                        </swiper-slide>
                                        </swiper>
                                    </div>
                                </div>
                                <div class="col-lg-7 single-pro-desc single-pro-desc-no-sidebar">
                                    <div class="single-pro-content">
                                        <h5 class="ec-single-title">{{product.product['name']}}</h5>
                                        {{product.product['rating']}}
                                        <div class="ec-single-rating-wrap">
                                            <div class="ec-single-rating">
                                                <i class="ecicon eci-star fill"></i>
                                                <i class="ecicon eci-star fill"></i>
                                                <i class="ecicon eci-star fill"></i>
                                                <i class="ecicon eci-star fill"></i>
                                                <i class="ecicon eci-star-o"></i>
                                            </div>
                                            <span class="ec-read-review" @click="openReviews()" v-if="product.product.reviews.length == 0"><a href="#ec-spt-nav-review">Be the first to
                                                    review this product</a></span>
                                        </div>
                                        <div class="ec-single-desc">{{product.product['description']}}</div>

                                        <div class="ec-single-sales" v-if="product.product['discount_end']">
                                            <div class="ec-single-sales-inner">
                                                <div class="ec-single-sales-title">sales accelerators</div>
                                                <div class="ec-single-sales-progress">
                                                    <span class="ec-single-progress-desc">Hurry up!left {{product.product['quantity']}} in
                                                        stock</span>
                                                </div>
                                                <div class="ec-single-sales-countdown d-block">
                                                    <div class="ec-single-count-desc mb-2">Time is Running Out!</div>   
                                                    <div class="countdowntimer d-block">
                                            <div id="ec-fs-count-2" class="style colorDefinition labelformat">
                                                <vue-countdown class="d-block" :time="calculateTimeRemaining(product.product['discount_end'])" v-slot="{ days, hours, minutes, seconds }">
                                                    <span class="timerDisplay label4 d-block">
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
                                            
                                            </div>
                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ec-single-price-stoke">
                                            <div class="ec-single-price">
                                                <span class="ec-single-ps-title">As low as</span>
                                                <span class="new-price">{{product.product['final_price']}}</span>
                                            </div>
                                            <div class="ec-single-stoke">
                                                <span class="ec-single-ps-title">{{product.product['quantity']}} IN STOCK</span>
                                                <span class="ec-single-sku" v-if="product.product.type_attribute == 'both' || product.product.type_attribute == 'colors'">SKU#: <span class="sku"></span></span>
                                            </div>
                                        </div>
                                        <div class="ec-pro-variation" v-if="product.product.type_attribute == 'both'">
                                            <div class="ec-pro-variation-inner ec-pro-variation-size">
                                                <span>SIZE</span>
                                                <div class="ec-pro-variation-content">
                                                    <ul>
                                                        <li 
                                                            v-for="(size,index) in product.product.attribute_for"
                                                            @click="sizeColorChange($event.target, size, product.product)"
                                                            class="size"
                                                            :data-color="size.size_name_en == null ? size.size.name_en : size.size_name_en +product.product.id"
                                                            :data-id="product.product.id"
                                                            :class="{ 'active': index === 0 }"
                                                            >
                                                            <a 
                                                            class="ec-opt-sz"
                                                            >
                                                            {{size.size_name_en}}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="ec-pro-variation-inner ec-pro-variation-color">
                                                <span>Color</span>
                                                <div class="ec-pro-variation-content">
                                                    <ul
                                                    v-for="(colorAttr,index) in product.product.attribute_for"
                                                    :class="{
                                                        'd-none': index !== 0,
                                                        [product.product.id]: true
                                                    }"
                                                    :id="colorAttr.size_name_en+product.product.id"
                                                    >
                                                        <li 
                                                            @click="onColorChange($event.target,color,product.product.id, product)"
                                                            :data-src="color.image"
                                                            :data-src-hover="color.image"
                                                            :data-old="product.product.price"
                                                            :data-new="color.price"
                                                            :data-tooltip="color.colorName"
                                                            v-for="(color, index) in colorAttr.colors"
                                                            class="color"
                                                            :class="{ 'active': index === 0 }"
                                                            >
                                                            <span 
                                                            :style="{ backgroundColor: color.color_code, }"
                                                            >
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ec-pro-variation" v-if="product.product.type_attribute == 'colors'">
                                            <div class="ec-pro-variation-inner ec-pro-variation-color">
                                                <span>Color</span>
                                                <div class="ec-pro-variation-content">
                                                    <ul
                                                    v-for="(color,index) in product.product.attribute_for"
                                                    :class="{
                                                        'd-none': index !== 0,
                                                        [product.product.id]: true
                                                    }"
                                                    >
                                                        <li 
                                                            @click="onColorChange($event.target,color,product.product.id, product)"
                                                            :data-src="color.image"
                                                            :data-src-hover="color.image"
                                                            :data-old="product.product.price"
                                                            :data-new="color.price"
                                                            :data-tooltip="color.colorName"
                                                            class="color"
                                                            :class="{ 'active': index === 0 }"
                                                            >
                                                            <span 
                                                            :style="{ backgroundColor: color.color.color_code, }"
                                                            >
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ec-pro-variation" v-if="product.product.type_attribute == 'sizes'">
                                            <div class="ec-pro-variation-inner ec-pro-variation-size">
                                                <span>SIZE</span>
                                                <div class="ec-pro-variation-content">
                                                    <ul>
                                                        <li 
                                                            v-for="(size,index) in product.product.attribute_for"
                                                            class="size"
                                                            @click="sizeColorChange($event.target, size, product.product)"
                                                            :data-color="size.size_name_en == null ? size.size.name_en : size.size_name_en +product.product.id"
                                                            :data-id="product.product.id"
                                                            :class="{ 'active': index === 0 }"
                                                            >
                                                            <a 
                                                            class="ec-opt-sz"
                                                            >
                                                            {{size.size.name_en}}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ec-single-qty">
                                            <div class="qty-plus-minus">
                                                <div class="dec ec_qtybtn" @click="increaseDecreaseQuantity('-')">-</div>
                                                <input class="qty-input" type="text" name="ec_qtybtn" v-model="quantity" disabled/>
                                                <div class="inc ec_qtybtn" @click="increaseDecreaseQuantity('+')">+</div>
                                            </div>
                                            <!-- product.product.quantity != 0 -->
                                            <div class="ec-single-cart" v-if="userData && userData.client_type !== 'wholesale'">
                                                <button class="btn btn-primary" @click="onAddProduct(product.product)" :disabled="isLoading('Add_Product_To_Cart'+product.product.id)">
                                                    Add To Cart
                                                    <img src="@/assets/images/common/loader-2.gif" width="20" class="ms-3" v-if="isLoading('Add_Product_To_Cart'+product.product.id)">
                                                </button>
                                            </div>
                                            <div class="ec-single-cart" v-if="!userData">
                                                <button class="btn btn-primary" @click="onAddProduct(product.product)" :disabled="isLoading('Add_Product_To_Cart'+product.product.id)">
                                                    Add To Cart
                                                    <img src="@/assets/images/common/loader-2.gif" width="20" class="ms-3" v-if="isLoading('Add_Product_To_Cart'+product.product.id)">
                                                </button>
                                            </div>
                                            <div class="ec-single-cart" v-if="userData && userData.client_type == 'wholesale'">
                                                <button class="btn btn-success">
                                                    <a :href="whatsappLink" @click="whatsappLinkA(product.product)" class="text-light" target="_blank">
                                                        <i class="ecicon eci-whatsapp me-2 fs-6"></i> Price Preview
                                                    </a>
                                                </button>
                                            </div>
                                            <div class="sold-out position-absolute z-2 w-100" v-if="product.product.quantity == 0">
                                                <img src="@/assets/images/common/Sold-Out-Transparent.png"/>
                                            </div>
                                            <div class="ec-single-wishlist">
                                                <a class="ec-btn-group wishlist" title="Wishlist"><img
                                                        src="@/assets/images/icons/wishlist.svg" class="svg_img pro_svg"
                                                        alt="" /></a>
                                            </div>
                                            <div class="ec-single-quickview">
                                                <a href="#" class="ec-btn-group quickview" data-link-action="quickview"
                                                    title="Quick view" data-bs-toggle="modal"
                                                    data-bs-target="#ec_quickview_modal"><img
                                                        src="@/assets/images/icons/quickview.svg" class="svg_img pro_svg"
                                                        alt="" /></a>
                                            </div>
                                        </div>
                                        <div class="ec-single-social">
                                            <ul class="mb-0">
                                                <li class="list-inline-item facebook"><a href="#"><i
                                                            class="ecicon eci-facebook"></i></a></li>
                                                <li class="list-inline-item twitter"><a href="#"><i
                                                            class="ecicon eci-twitter"></i></a></li>
                                                <li class="list-inline-item instagram"><a href="#"><i
                                                            class="ecicon eci-instagram"></i></a></li>
                                                <li class="list-inline-item youtube-play"><a href="#"><i
                                                            class="ecicon eci-youtube-play"></i></a></li>
                                                <li class="list-inline-item behance"><a href="#"><i
                                                            class="ecicon eci-behance"></i></a></li>
                                                <li class="list-inline-item whatsapp"><a href="#"><i
                                                            class="ecicon eci-whatsapp"></i></a></li>
                                                <li class="list-inline-item plus"><a href="#"><i
                                                            class="ecicon eci-plus"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--Single product content End -->
                    <!-- Single product tab start -->
                    <div class="ec-single-pro-tab">
                        <div class="ec-single-pro-tab-wrapper">
                            <div class="ec-single-pro-tab-nav">
                                <ul class="nav nav-tabs">
                                    <li class="nav-item">
                                        <a class="nav-link active" data-bs-toggle="tab"
                                            data-bs-target="#ec-spt-nav-details" role="tablist">Detail</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" data-bs-toggle="tab" data-bs-target="#ec-spt-nav-info"
                                            role="tablist">More Information</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link reviews-tab" data-bs-toggle="tab" data-bs-target="#ec-spt-nav-review"
                                            role="tablist">Reviews</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content  ec-single-pro-tab-content">
                                <div id="ec-spt-nav-details" class="tab-pane fade show active">
                                    <div class="ec-single-pro-tab-desc">
                                        <p class="mb-0">
                                            {{product.product['description']}}
                                        </p>
                                    </div>
                                </div>
                                <div id="ec-spt-nav-info" class="tab-pane fade">
                                    <div class="ec-single-pro-tab-moreinfo">
                                        <ul>
                                            <li><span>Weight</span> 1000 g</li>
                                            <li><span>Dimensions</span> 35 × 30 × 7 cm</li>
                                            <li><span>Color</span> Black, Pink, Red, White</li>
                                        </ul>
                                    </div>
                                </div>

                                <div id="ec-spt-nav-review" class="tab-pane fade">
                                    <div class="row">
                                        <div class="ec-t-review-wrapper">
                                            <h6 class="mb-4" v-if="product.product.reviews.length == 0" data-bs-toggle="tab" data-bs-target="#ec-spt-nav-review">No reviews yet, be the first one</h6>
                                            <div class="ec-t-review-item" v-for="review in product.product.reviews" :key="review">
                                                <div class="ec-t-review-avtar">
                                                    <img src="@/assets/images/review-image/1.jpg" alt="" />
                                                </div>
                                                <div class="ec-t-review-content">
                                                    <div class="ec-t-review-top">
                                                        <div class="ec-t-review-name">{{review.user['name']}}</div>
                                                        <div class="ec-t-review-rating" >
                                                            <i 
                                                                class="ecicon eci-star fill"
                                                                v-for="(rate, index) in parseInt(review.rating)"
                                                            >
                                                            </i>
                                                        </div>
                                                    </div>
                                                    <div class="ec-t-review-bottom">
                                                        <p>{{review['review']}}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ec-ratting-content">
                                            <h3>Add a Review</h3>
                                            <div class="ec-ratting-form">
                                                <add-review v-model="userRating" :max-stars="5" v-if="isAuthenticated.token != null ? isAuthenticated.token : UserIDToken"/>
                                                <h6 v-if="isAuthenticated.token != null ? !isAuthenticated.token : !UserIDToken">You need to <router-link to="/login">Login</router-link> to can add reviews</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- product details description area end -->
                </div>

            </div>
        </div>
    </section>
    <!-- End Single product -->

    <!-- Related Product Start -->
    <related-products :product="product"/>
    <!-- Related Product end -->
</template>
<script>
import VueCookies from 'vue-cookies'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { mapActions, mapState } from "vuex";
import { notification } from "ant-design-vue";

export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data(){
        return{
            selectedAttributeId: {},
            quantity: 1,
            userRating: 1,
            currentProduct: null,
            color:null,
            size:null,
            UserIDToken: VueCookies.get("UserToken")
        }
    },
    computed: {
        ...mapState(['product','route','userData']),
        isAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
        getURL(){
            return window.location.href;
        },
        whatsappLink() {
            this.loadProduct(this.product.product.minimum_order)
            this.currentProduct = this.product.product
            const productName = encodeURIComponent(this.product.product['name']);
            const quantityText = encodeURIComponent(`and I need for ${this.quantity} Quantity, `);
            const sizeText = this.size != null ? encodeURIComponent(`and I need for ${this.size} size, `) : '';
            const colorText = this.color != null ? encodeURIComponent(`and I need for ${this.color} color, `) : '';
            const getURL = encodeURIComponent(this.getURL);
            const message = `I am interested in ${productName}%0A${sizeText}%0A${colorText} ${quantityText}%0A${getURL}`;

            return `https://wa.me/+201069000501?text=${message}`;        
        },
    },
    methods:{
        ...mapActions(['GetProductData']),
        setQuantityForUser() {
            if (this.isAuthenticated.user && this.isAuthenticated.user.client_type === 'wholesale') {
                this.quantity = this.product.product.minimum_order || 1;
            } else {
                // set to default or other logic for non-wholesale users
            }
        },
        async fetchProduct() {
            await this.GetProductData({id: this.$route.params.id});
        },
        zoomImage(e){
            $('.zoom-image-hover').zoom();
        },
        sizeColorChange(e, size, product){
            if(product.type_attribute == 'both'){
                this.size = size.size_name_en
            }
            if(product.type_attribute == 'sizes'){
                this.size = size.size.name_en
            }

            $(e).addClass("active").siblings().removeClass("active")
            var $this = $(e);
            if($this.parent().hasClass('size')){
                $this.parent().addClass('active').siblings().removeClass('active');
                $('.'+$(e).parent().data('id')).addClass("d-none")
                $('#'+$(e).parent().data('color')).addClass('d-block').removeClass('d-none')

            }else{
                $('.'+$(e).data('id')).addClass("d-none")
                $('#'+$(e).data('color')).addClass('d-block').removeClass('d-none')
                $this.addClass('active').siblings().removeClass('active');
            }
        },
        onColorChange(thisObj,color,id, product){
            console.log(product)
            if(product.type_attribute == 'colors'){
                this.color = color.color.name_en
            }
            if(product.type_attribute == 'both'){
                this.color = color.colorName
            }
            this.selectedAttributeId['Product'+id] = color.attribute_id;
            $('.image-product').attr('src',this.route+'imagesfp/product/'+color.image)
            var $this = $(thisObj);
            var $new_price = $('.new-price');
            var $new_sku = $('.sku');
            $new_price.text(color.price); 
            $new_sku.text(color.sku); 
            if($this.parent().hasClass('color')){
                $this.parent().addClass('active').siblings().removeClass('active');
            }else{
                $this.addClass('active').siblings().removeClass('active');
            }
           
        },
        onAddProduct(product){
            let attributeId = this.selectedAttributeId['Product'+product.id];
            if(attributeId === undefined){
                attributeId = null
            }
            this.$store.dispatch("Add_Product_To_Cart", { attributeId: attributeId, product: product, quantity: this.quantity, toast: this.$toast,token: this.UserIDToken })
            this.$store.dispatch("GetCartData")
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
        changeImage(route) {
            $('.image-product').attr('src',route)
        },
        openReviews(){
            $('.reviews-tab')[0].click()
        },
        calculateTimeRemaining(discountEnd) {
            const discountEndTimestamp = new Date(discountEnd).getTime();
            const currentTimestamp = new Date().getTime();
            const timeRemaining = Math.max(discountEndTimestamp - currentTimestamp, 0);
            return timeRemaining;
        },
        loadProduct(minimum_order) {
            // console.log(parseInt(minimum_order))
            // this.quantity = null
            // if (this.isAuthenticated.user && this.isAuthenticated.user.client_type === 'wholesale') {
            //     if(this.product){
            //         console.log(this.product)
            //         this.quantity = this.product.product.minimum_order;
            //     }
            // }
        },
        increaseDecreaseQuantity(sign){
            const clientType = this.isAuthenticated.user ? this.isAuthenticated.user.client_type : null;
            const minimumOrder = this.product.product.minimum_order || 1;
            const maxQuantityAvailable = this.product.product['quantity'];

            if (sign === '-') {
                if (clientType && clientType === 'wholesale' && this.quantity > minimumOrder) {
                    this.quantity--;
                } else if (clientType && clientType !== 'wholesale' && this.quantity > 1) {
                    this.quantity--;
                } else if(this.quantity == 1){
                    this.quantity = 1;
                }else if(this.quantity == minimumOrder && clientType === 'wholesale'){
                    this.quantity = minimumOrder;
                }
                else{
                    this.quantity--;
                }
          
            } else if (sign === '+') {
                if (this.quantity <  maxQuantityAvailable) {
                    this.quantity++
                } else {
                    this.quantity = maxQuantityAvailable
                }
            }
        },
        whatsappLinkA(product){
            if(product.type_attribute == 'both'){
                if(this.size == null && this.color == null){
                    this.size = product.attribute_for[0].size_name_en
                    this.color = product.attribute_for[0].colors[0].colorName
                }
            }
            if(product.type_attribute == 'colors'){
                if(this.color == null){
                    this.color = product.attribute_for[0].color.name_en
                }
                this.size = null
            }
            if(product.type_attribute == 'sizes'){
                if(this.size == null){
                    this.size = product.attribute_for[0].size.name_en
                }
                this.color = null
            }
            if(product.type_attribute == 'none'){
                this.size = null
                this.color = null
            }
        },
    },
    mounted() {
        this.fetchProduct();
    },
    created() {
        this.setQuantityForUser();
    },
    setup() {
      return {
        modules: [Navigation],
      };
    },
    watch: {
        '$route': 'setQuantityForUser',
        'product.product.minimum_order': function(newVal, oldVal) {
            if (this.isAuthenticated.user && this.isAuthenticated.user.client_type === 'wholesale') {
                this.quantity = newVal || 1;
            }
        }
    },
}
</script>
<style lang="">
    
</style>