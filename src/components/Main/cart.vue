<template lang="">
    <!-- ekka Cart Start -->
    <div class="ec-side-cart-overlay"></div>
    <div id="ec-side-cart" class="ec-side-cart">
        <div class="ec-cart-inner">
            <div class="ec-cart-top">
                <div class="ec-cart-title">
                    <span class="cart_title">My Cart</span>
                    <button class="ec-close">×</button>
                </div>
                <ul class="eccart-pro-items" v-if="cart">
                    <li v-for="item in cart.cart_items" v-key="item.id" class="position-relative">
                        <div v-if="isLoading('Remove_Product_From_Cart'+item.id) || isLoading('Product_Increase_Decrease_From_Cart'+item.id)" class="loader position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
                            <img src="@/assets/images/common/loader-2.gif" width="20" class="ms-3">
                        </div>
                        <a href="product-left-sidebar.html" class="sidekka_pro_img"><img
                                :src="item.attribute ? route + item.attribute.image: route + item['image']" alt="product"></a>
                        <div class="ec-pro-content">
                            <a href="product-left-sidebar.html" class="cart_pro_title">{{item['name']}}</a>
                            <span class="cart-price"><span>{{item['price']}}</span> x {{item['quantity']}}</span>
                            <div v-if="item.attribute">
                                <p class="mb-0">{{item.attribute.color.name_en}}</p>
                                <p class="mb-0">{{item.attribute.size.name_en}}</p>
                            </div>
                            <div class="qty-plus-minus">
                                <div class="dec ec_qtybtn" @click="ProductQuantity('-',item.id)">-</div>
                                <input class="qty-input" type="text" min="1" name="ec_qtybtn" :value="item['quantity']" disabled />
                                <div class="inc ec_qtybtn" @click="ProductQuantity('+',item.id)">+</div>
                            </div>
                            <a href="javascript:void(0)" @click="onRemoveProduct(item)" class="remove">×</a>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="cart">
                <p class="text-center" v-if="cart.cart_items.length < 1">No Items found</p>
            </div>
            <div class="ec-cart-bottom" v-if="cart && cart.cart_items.length > 0">
                <div class="cart-sub-total">
                    <table class="table cart-table">
                        <tbody>
                            <tr>
                                <td class="text-left">Sub-Total :</td>
                                <td class="text-right">{{cart.cart_prices.subtotal}}</td>
                            </tr>
                            <tr>
                                <td class="text-left">Total Discount :</td>
                                <td class="text-right">{{cart.cart_prices.total_discount}}</td>
                            </tr>
                            <tr>
                                <td class="text-left">Total :</td>
                                <td class="text-right primary-color">{{cart.cart_prices.total}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="cart_btn">
                    <router-link to="/cart" class="btn btn-primary" @click="hideCart()">View Cart</router-link>
                    <a href="checkout.html" class="btn btn-secondary">Checkout</a>
                </div>
            </div>
        </div>
    </div>
    <!-- ekka Cart End -->
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    computed: {
        ...mapState(['cart','route']),
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
            this.$store.dispatch("GetCartData")
        },
        ProductQuantity(sign, id){
            this.$store.dispatch("Product_Increase_Decrease_From_Cart", { id: id, toast: this.$toast, type: sign })
            this.$store.dispatch("GetCartData")
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