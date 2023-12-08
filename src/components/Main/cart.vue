<template lang="">
    <!-- ekka Cart Start -->
    <div class="ec-side-cart-overlay"></div>
    <div id="ec-side-cart" class="ec-side-cart">
        <div 
        class="ec-cart-inner"
        :class="{'justify-content-start': cart && cart.cart_items.length === 0}"
        >
            <div class="ec-cart-top">
                <div class="ec-cart-title">
                    <span class="cart_title">{{$t("My Cart")}}</span>
                    <button class="ec-close">×</button>
                </div>
                <ul class="eccart-pro-items" v-if="cart">
                    <li v-for="item in cart.cart_items" v-key="item.id" class="position-relative">
                        <transition name="fade" mode="out-in">
                        <div v-if="isLoading('Remove_Product_From_Cart'+item.id) || isLoading('Product_Increase_Decrease_From_Cart'+item.id)" class="loader position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
                            <loading-outlined class="fs-3"/>
                        </div>
                        </transition>
                        <span @click="fetchProductData(item.product_id)">
                            <router-link @click="fetchProductData(item.product_id)" :to="'/product/'+item['id']" class="sidekka_pro_img">
                                <img :src="item.attribute != undefined && item.attribute.length != 0 ? route + item.attribute.image: route + item['image']" alt="product">
                            </router-link>
                        </span>

                        <div class="ec-pro-content">
                            <span @click="fetchProductData(item.product_id)"><router-link :to="'/product/'+item['id']" class="cart_pro_title">{{item['name']}}</router-link></span>
                            <span class="cart-price"><span>{{currency}} {{item['price']}}</span> x {{item['quantity']}}</span>
                            <div v-if="item.attribute">
                                <p class="mb-0">{{item.attribute.color != null ? ($i18n.locale == 'en' ? item.attribute.color.name_en : item.attribute.color.name_ar) : ""}}</p>
                                <p class="mb-0">{{item.attribute.size != null ? ($i18n.locale == 'en' ? item.attribute.size.name_en : item.attribute.size.name_ar) : ""}}</p>
                            </div>
                            <div class="qty-plus-minus">
                                <div class="dec ec_qtybtn" @click="ProductQuantity('-',item.id)">-</div>
                                <input class="qty-input" type="text" min="1" name="ec_qtybtn" :value="item['quantity']" disabled />
                                <div class="inc ec_qtybtn" @click="ProductQuantity('+',item.id)">+</div>
                            </div>
                            <a href="javascript:void(0)" class="ecicon eci-trash-o remove" @click="onRemoveProduct(item)"></a>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="cart">
                <div class="col-12 text-center" v-if="cart.cart_items.length < 1">
                    <img src="@/assets/images/vendor/empty.gif" width="250" alt="">
                    <h4>{{$t("Your cart is empty!")}} 😓</h4>
                    <router-link to="/" @click="hideCart()" class="btn btn-primary rounded-pill mt-3">{{$t("Continue Shopping")}}</router-link>
                </div>
            </div>
            <div class="ec-cart-bottom" v-if="cart && cart.cart_items.length > 0">
                <div class="cart-sub-total">
                    <table class="table cart-table">
                        <tbody>
                            <tr>
                                <td class="text-left">{{$t("Sub Total")}} :</td>
                                <td class="text-right">{{currency}} {{subtotal}}</td>
                            </tr>
                            <tr>
                                <td class="text-left">{{$t("Total Discount")}} :</td>
                                <td class="text-right">{{currency}} {{totalDiscount}}</td>
                            </tr>
                            <tr>
                                <td class="text-left">{{$t("Total")}} :</td>
                                <td class="text-right primary-color">{{currency}} {{totalAmount}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="cart_btn">
                    <router-link to="/cart" class="btn btn-primary" @click="hideCart()">{{$t("View Cart")}}</router-link>
                    <router-link to="/checkout" class="btn btn-secondary" @click="hideCart()">{{$t("Checkout")}}</router-link>
                </div>
            </div>
        </div>
    </div>
    <!-- ekka Cart End -->
</template>
<script>
import { mapActions, mapState,mapGetters } from "vuex";
import {LoadingOutlined} from '@ant-design/icons-vue';
export default {
    computed: {
        ...mapState(['cart','route', 'currency']),
        ...mapGetters(['subtotal','totalDiscount','couponDiscount','totalAmount']),
    },
    components: {
        LoadingOutlined
    },
    methods: {
        ...mapActions(['GetCartData']),
        async fetchCart() {
            await this.GetCartData();
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
        onRemoveProduct(product){
            this.$store.dispatch("Remove_Product_From_Cart", { product: product, toast: this.$toast })
        },
        fetchProductData(id){
            $(".ec-side-cart-overlay").fadeOut();
            $("#ec-side-cart").removeClass("ec-open");
            $(".mobile-menu-toggle").find("a").removeClass("close");

            $(window).scrollTop(0); 
            this.$store.dispatch('GetProductData',{id: id})
        },
        ProductQuantity(sign, id){
            this.$store.dispatch("Product_Increase_Decrease_From_Cart", { id: id, toast: this.$toast, type: sign })
        },
        hideCart(){
            $(".ec-side-cart-overlay").fadeOut();
            $("#ec-side-cart").removeClass("ec-open");
            $(".mobile-menu-toggle").find("a").removeClass("close");
        }
    },
    mounted() {
        this.fetchCart();
    },
}
</script>
<style lang="">
    
</style>