<template lang="">
    <!-- Sart Single product -->
    <section class="ec-page-content section-space-p" v-if="product">
        <div class="container">
            <div class="row">
                <div class="ec-pro-rightside ec-common-rightside col-lg-12 col-md-12">
                    {{$route.params.id}}
                    
                    <!-- Single product content Start -->
                    <div class="single-pro-block">
                        <div class="single-pro-inner">
                            <div class="row">
                                <div class="col-lg-5 single-pro-img single-pro-img-no-sidebar">
                                    <div class="single-product-scroll">
                                        <swiper
                                            :slides-per-view="1"
                                            :space-between="0"
                                            class="single-product-cover"
                                            :autoplay="true"
                                        >
                                        <swiper-slide class="single-slide zoom-image-hover" @mouseenter="zoomImage()">
                                                <img class="img-responsive" src="@/assets/images/product-360/1_1.jpg"
                                                    alt="">
                                        </swiper-slide>
                                        </swiper>
                                        <swiper
                                            :slides-per-view="4"
                                            :space-between="20"
                                            class="single-nav-thumb mt-3"
                                            :navigation="true"
                                            :modules="modules"
                                            :autoplay="true"
                                        >
                                        <swiper-slide class="single-slide p-0">
                                                <img class="img-responsive" src="@/assets/images/product-360/1_1.jpg"
                                                    alt="">
                                        </swiper-slide>
                                        <swiper-slide class="single-slide p-0">
                                                <img class="img-responsive" src="@/assets/images/product-360/1_1.jpg"
                                                    alt="">
                                        </swiper-slide>
                                        <swiper-slide class="single-slide p-0">
                                                <img class="img-responsive" src="@/assets/images/product-360/1_1.jpg"
                                                    alt="">
                                        </swiper-slide>
                                        <swiper-slide class="single-slide p-0">
                                                <img class="img-responsive" src="@/assets/images/product-360/1_1.jpg"
                                                    alt="">
                                        </swiper-slide>
                                        <swiper-slide class="single-slide p-0">
                                                <img class="img-responsive" src="@/assets/images/product-360/1_1.jpg"
                                                    alt="">
                                        </swiper-slide>
                                        </swiper>
                                    </div>
                                </div>
                                <div class="col-lg-7 single-pro-desc single-pro-desc-no-sidebar">
                                    <div class="single-pro-content">
                                        <h5 class="ec-single-title">{{product.product['name']}}</h5>
                                        <div class="ec-single-rating-wrap">
                                            <div class="ec-single-rating">
                                                <i class="ecicon eci-star fill"></i>
                                                <i class="ecicon eci-star fill"></i>
                                                <i class="ecicon eci-star fill"></i>
                                                <i class="ecicon eci-star fill"></i>
                                                <i class="ecicon eci-star-o"></i>
                                            </div>
                                            <span class="ec-read-review"><a href="#ec-spt-nav-review">Be the first to
                                                    review this product</a></span>
                                        </div>
                                        <div class="ec-single-desc">{{product.product['description']}}</div>

                                        <div class="ec-single-sales">
                                            <div class="ec-single-sales-inner">
                                                <div class="ec-single-sales-title">sales accelerators</div>
                                                <div class="ec-single-sales-progress">
                                                    <span class="ec-single-progress-desc">Hurry up!left {{product.product['quantity']}} in
                                                        stock</span>
                                                    <span class="ec-single-progressbar"></span>
                                                </div>
                                                <div class="ec-single-sales-countdown">
                                                    <div class="ec-single-countdown"><span
                                                            id="ec-single-countdown"></span></div>
                                                    <div class="ec-single-count-desc">Time is Running Out!</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ec-single-price-stoke">
                                            <div class="ec-single-price">
                                                <span class="ec-single-ps-title">As low as</span>
                                                <span class="new-price">{{product.product['final_price']}}</span>
                                            </div>
                                            <div class="ec-single-stoke">
                                                <span class="ec-single-ps-title">IN STOCK</span>
                                                <span class="ec-single-sku">SKU#: WH12</span>
                                            </div>
                                        </div>
                                        <div class="ec-pro-variation" v-if="product.product.type_attribute == 'both'">
                                            <div class="ec-pro-variation-inner ec-pro-variation-size">
                                                <span>SIZE</span>
                                                <div class="ec-pro-variation-content">
                                                    <ul>
                                                        <li 
                                                            v-for="(size,index) in product.product.attribute_for"
                                                            @click="sizeColorChange($event.target)"
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
                                                            @click="onColorChange($event.target,color,product.product.id)"
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
                                                            @click="onColorChange($event.target,color,product.product.id)"
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
                                                <div class="dec ec_qtybtn">-</div>
                                                <input class="qty-input" type="text" name="ec_qtybtn" value="1" />
                                                <div class="inc ec_qtybtn">+</div>
                                            </div>
                                            <div class="ec-single-cart ">
                                                <button class="btn btn-primary">Add To Cart</button>
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
                                        <a class="nav-link" data-bs-toggle="tab" data-bs-target="#ec-spt-nav-review"
                                            role="tablist">Reviews</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content  ec-single-pro-tab-content">
                                <div id="ec-spt-nav-details" class="tab-pane fade show active">
                                    <div class="ec-single-pro-tab-desc">
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            Lorem Ipsum has been the industry's standard dummy text ever since the
                                            1500s, when an unknown printer took a galley of type and scrambled it to
                                            make a type specimen book. It has survived not only five centuries, but also
                                            the leap into electronic typesetting, remaining essentially unchanged.
                                        </p>
                                        <ul>
                                            <li>Any Product types that You want - Simple, Configurable</li>
                                            <li>Downloadable/Digital Products, Virtual Products</li>
                                            <li>Inventory Management with Backordered items</li>
                                            <li>Flatlock seams throughout.</li>
                                        </ul>
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
                                            <div class="ec-t-review-item">
                                                <div class="ec-t-review-avtar">
                                                    <img src="@/assets/images/review-image/1.jpg" alt="" />
                                                </div>
                                                <div class="ec-t-review-content">
                                                    <div class="ec-t-review-top">
                                                        <div class="ec-t-review-name">Jeny Doe</div>
                                                        <div class="ec-t-review-rating">
                                                            <i class="ecicon eci-star fill"></i>
                                                            <i class="ecicon eci-star fill"></i>
                                                            <i class="ecicon eci-star fill"></i>
                                                            <i class="ecicon eci-star fill"></i>
                                                            <i class="ecicon eci-star-o"></i>
                                                        </div>
                                                    </div>
                                                    <div class="ec-t-review-bottom">
                                                        <p>Lorem Ipsum is simply dummy text of the printing and
                                                            typesetting industry. Lorem Ipsum has been the industry's
                                                            standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galley of type and scrambled it to make a
                                                            type specimen.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ec-t-review-item">
                                                <div class="ec-t-review-avtar">
                                                    <img src="@/assets/images/review-image/2.jpg" alt="" />
                                                </div>
                                                <div class="ec-t-review-content">
                                                    <div class="ec-t-review-top">
                                                        <div class="ec-t-review-name">Linda Morgus</div>
                                                        <div class="ec-t-review-rating">
                                                            <i class="ecicon eci-star fill"></i>
                                                            <i class="ecicon eci-star fill"></i>
                                                            <i class="ecicon eci-star fill"></i>
                                                            <i class="ecicon eci-star-o"></i>
                                                            <i class="ecicon eci-star-o"></i>
                                                        </div>
                                                    </div>
                                                    <div class="ec-t-review-bottom">
                                                        <p>Lorem Ipsum is simply dummy text of the printing and
                                                            typesetting industry. Lorem Ipsum has been the industry's
                                                            standard dummy text ever since the 1500s, when an unknown
                                                            printer took a galley of type and scrambled it to make a
                                                            type specimen.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="ec-ratting-content">
                                            <h3>Add a Review</h3>
                                            <div class="ec-ratting-form">
                                                <form action="#">
                                                    <div class="ec-ratting-star">
                                                        <span>Your rating:</span>
                                                        <div class="ec-t-review-rating">
                                                            <i class="ecicon eci-star fill"></i>
                                                            <i class="ecicon eci-star fill"></i>
                                                            <i class="ecicon eci-star-o"></i>
                                                            <i class="ecicon eci-star-o"></i>
                                                            <i class="ecicon eci-star-o"></i>
                                                        </div>
                                                    </div>
                                                    <div class="ec-ratting-input">
                                                        <input name="your-name" placeholder="Name" type="text" />
                                                    </div>
                                                    <div class="ec-ratting-input">
                                                        <input name="your-email" placeholder="Email*" type="email"
                                                            required />
                                                    </div>
                                                    <div class="ec-ratting-input form-submit">
                                                        <textarea name="your-commemt"
                                                            placeholder="Enter Your Comment"></textarea>
                                                        <button class="btn btn-primary" type="submit"
                                                            value="Submit">Submit</button>
                                                    </div>
                                                </form>
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
    <section class="section ec-releted-product section-space-p" v-if="product">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">Related products</h2>
                        <h2 class="ec-title">Related products</h2>
                        <p class="sub-title">Browse The Collection of Top Products</p>
                    </div>
                </div>
            </div>
            <div class="row margin-minus-b-30">
                <!-- Related Product Content -->
                <home-products 
                :productObject="product.related_products" :title="'new-arrivals'">
                </home-products>
            </div>
        </div>
    </section>
    <!-- Related Product end -->
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import { mapActions, mapState } from "vuex";
export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    computed: {
        ...mapState(['product','route']),
    },
    data(){
        return{
            selectedAttributeId: {},
        }
    },
    methods:{
        ...mapActions(['GetProductData']),
        async fetchProduct() {
            await this.GetProductData({id: this.$route.params.id});
        },
        zoomImage(e){
            $('.zoom-image-hover').zoom();
        },
        sizeColorChange(e){
            console.log($(e))
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
        onAddProduct(product){
            let attributeId = this.selectedAttributeId['Product'+product.id];
            if(attributeId === undefined){
                attributeId = null
            }
            this.$store.dispatch("Add_Product_To_Cart", { attributeId: attributeId, product: product, quantity: 1, toast: this.$toast,token: this.UserIDToken })
            this.$store.dispatch("GetCartData")
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
        onColorChange(thisObj,color,id){
            this.selectedAttributeId['Product'+id] = color.attribute_id;
            $('#img-'+id).attr('src',this.route+'imagesfp/product/'+color.image)
            var $this = $(thisObj);
            var $new_price = $this.closest('.ec-pro-content').find('.new-price');
            console.log($this.closest('.ec-pro-image'))
            $new_price.text(color.price); 
            if($this.parent().hasClass('color')){
                $this.parent().addClass('active').siblings().removeClass('active');
            }else{
                $this.addClass('active').siblings().removeClass('active');
            }
           
        }
    },
    mounted() {
        this.fetchProduct();
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