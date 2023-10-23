<template lang="">
    <!-- Ec cart page -->
    <section class="ec-page-content section-space-p">
        <div class="container" v-if="cart">
            <div class="row">
                <div class="col-12 text-center" v-if="cart.cart_items.length < 1">
                    <h4>No Items here</h4>
                    <router-link to="/">Back to home</router-link>
                </div>
                <div class="ec-cart-leftside col-lg-8 col-md-12 " v-if="cart.cart_items.length > 0">
                    <!-- cart content Start -->
                    <div class="ec-cart-content">
                        <div class="ec-cart-inner">
                            <div class="row">
                                <form action="#">
                                    <div class="table-content cart-table-content">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th style="text-align: center;">Quantity</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in cart.cart_items" class="position-relative">
                                                    <td data-label="Product" class="ec-cart-pro-name">
                                                        <div v-if="isLoading('Remove_Product_From_Cart'+item.id) || isLoading('Product_Increase_Decrease_From_Cart'+item.id)" class="loader position-absolute top-0 w-100 h-100 d-flex justify-content-center align-items-center">
                                                        <img src="@/assets/images/common/loader-2.gif" width="20" class="ms-3">
                                                    </div>
                                                        <a
                                                            href="product-left-sidebar.html"><img class="ec-cart-pro-img mr-4"
                                                                :src="item.attribute ? route + item.attribute.image: route + item['image']"
                                                                alt="" />{{item['name']}}</a></td>
                                                    <td data-label="Price" class="ec-cart-pro-price">
                                                        <span class="amount">{{item['price']}}</span>
                                                        <div v-if="item.attribute" class="d-flex">
                                                            <p class="mb-0 me-2">{{item.attribute.color.name_en}}</p>
                                                            <p class="mb-0">{{item.attribute.size.name_en}}</p>
                                                        </div>
                                                    </td>
                                                    <td data-label="Quantity" class="ec-cart-pro-qty"
                                                        style="text-align: center;">
                                                        <div class="cart-qty-plus-minus">
                                                            <input class="cart-plus-minus" type="text"
                                                                name="cartqtybutton" :value="item['quantity']" disabled/>
                                                            <div class="ec_cart_qtybtn">
                                                                <div class="inc ec_qtybtn" @click="ProductQuantity('+',item.id)">+</div>
                                                                <div class="dec ec_qtybtn" @click="ProductQuantity('-',item.id)">-</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td data-label="Remove" class="ec-cart-pro-remove text-center">
                                                        <a href="#" @click="onRemoveProduct(item)"><i class="ecicon eci-trash-o text-danger"></i></a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="ec-cart-update-bottom">
                                                <a href="#">Continue Shopping</a>
                                                <div class="d-flex">
                                                    <button class="btn btn-dark me-2" @click="onClearCart()" :disabled="isLoading('Clear_Cart')">
                                                        Clear Cart
                                                        <img src="@/assets/images/common/loader-2.gif" width="20" v-if="isLoading('Clear_Cart')" class="ms-3">
                                                    </button>
                                                    <button class="btn btn-primary">Check Out</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!--cart content End -->
                </div>
                <!-- Sidebar Area Start -->
                <div class="ec-cart-rightside col-lg-4 col-md-12" v-if="cart.cart_items.length > 0">
                    <div class="ec-sidebar-wrap">
                        <!-- Sidebar Summary Block -->
                        <div class="ec-sidebar-block">
                            <div class="ec-sb-title">
                                <h3 class="ec-sidebar-title">Summary</h3>
                            </div>
                            <div class="ec-sb-block-content border-0">
                                <div class="ec-cart-summary-bottom">
                                    <div class="ec-cart-summary">
                                        <div>
                                            <span class="text-left">Sub-Total</span>
                                            <span class="text-right">{{cart.cart_prices.subtotal}}</span>
                                        </div>
                                        <div>
                                            <span class="text-left">Total Discount</span>
                                            <span class="text-right">{{cart.cart_prices.total_discount}}</span>
                                        </div>
                                        <div>
                                            <span class="text-left">Coupan Discount</span>
                                            <span class="text-right"><a class="ec-cart-coupan">Apply Coupan</a></span>
                                        </div>
                                        <div class="ec-cart-coupan-content">
                                            <form class="ec-cart-coupan-form" name="ec-cart-coupan-form" method="post"
                                                action="#">
                                                <input class="ec-coupan" type="text" required=""
                                                    placeholder="Enter Your Coupan Code" name="ec-coupan" value="">
                                                <button class="ec-coupan-btn button btn-primary" type="submit"
                                                    name="subscribe" value="">Apply</button>
                                            </form>
                                        </div>
                                        <div class="ec-cart-summary-total">
                                            <span class="text-left">Total Amount</span>
                                            <span class="text-right">{{cart.cart_prices.total}}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <!-- Sidebar Summary Block -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
    computed: {
        ...mapState(['cart','route']),
    },
    methods:{
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
        onClearCart(){
            this.$store.dispatch("Clear_Cart", { toast: this.$toast })
            this.$store.dispatch("GetCartData")
        },
        ProductQuantity(sign, id){
            this.$store.dispatch("Product_Increase_Decrease_From_Cart", { id: id, toast: this.$toast, type: sign })
            this.$store.dispatch("GetCartData")
        }
    },
    mounted() {
        this.fetchCart();
    },
}
</script>
<style lang="">
    
</style>