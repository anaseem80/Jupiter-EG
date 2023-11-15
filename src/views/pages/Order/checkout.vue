<template lang="">
    <!-- Ec checkout page -->
    <section class="ec-page-content section-space-p">
        <div class="container">
            <div class="row">
                <div class="ec-checkout-leftside col-lg-8 col-md-12 ">
                    <!-- checkout content Start -->
                    <div class="ec-checkout-content">
                        <div class="ec-checkout-inner">
                            <div class="ec-checkout-wrap margin-bottom-30 padding-bottom-3">
                                <div class="ec-checkout-block ec-check-bill">
                                    <h3 class="ec-checkout-title">Billing Details</h3>
                                    <div class="ec-bl-block-content">
                                        <div class="ec-check-subtitle">Checkout Options</div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="addresses">
                                <div 
                                    v-for="(address,index) in addresses"
                                    class="d-flex justify-content-between bg-light p-2 mb-2"
                                >
                                <div>
                                    <input 
                                    type="radio" 
                                    :value="address['id']" 
                                    class="w-auto h-auto me-2"
                                    v-model="AddressID"
                                    @change="ApplyTax()"
                                    name="user_address_id"
                                    :id="'address'+address['id']"
                                    >
                                    <label class="mb-0" :for="'address'+address['id']">
                                        {{address['name']}},
                                        {{address['address_1']}},
                                        {{address['country']}},
                                        {{address['email']}},
                                        {{address['phone']}}
                                    </label>
                                </div>
                                <!-- <div>
                                    <span class="d-flex justify-content-evenly">
                                        <a href="javascript:void(0)" class="me-1" data-bs-toggle="modal" @click="prepareAddress('edit', address)" data-bs-target="#address"><EditOutlined class="fs-6"/></a>
                                        <a href="javascript:void(0)" @click="deleteAddress(address)"><DeleteOutlined class="text-danger fs-6"/></a>
                                    </span>
                                </div> -->
                                </div>
                                <div v-if="addresses.length == 0" class="mb-2">No addresses found, add new one</div>
                                <a class="btn btn-lg btn-primary" @click="prepareAddress('add')" data-bs-toggle="modal" data-bs-target="#address" href="javascript:void(0)">Add Address</a>
                            </div>
                            <span class="ec-check-order-btn" v-if="addresses.length > 0">
                                <button class="btn btn-primary" @click="CreateOrder()" :disabled="AddressID == null || isLoading('OrderCreate')">
                                    Place Order
                                    <loading-outlined class="fs-6 ms-2" v-if="isLoading('OrderCreate')"/>
                                </button>
                            </span>
                        </div>
                    </div>
                    <!--cart content End -->
                </div>
                <!-- Sidebar Area Start -->
                <div class="ec-checkout-rightside col-lg-4 col-md-12">
                    <div class="ec-sidebar-wrap">
                        <!-- Sidebar Summary Block -->
                        <div class="ec-sidebar-block position-relative">
                            <div class="ec-sb-title mb-2">
                                <h3 class="ec-sidebar-title">Summary</h3>
                            </div>
                            <div class="ec-sb-block-content">
                                <transition name="fade" mode="out-in">
                                    <div v-if="isLoading('ApplyCoupon') || isLoading('ApplyTax')" class="loader position-absolute top-0 w-100 h-100 d-flex justify-content-center align-items-center">
                                        <loading-outlined class="fs-3"/>
                                    </div>
                                </transition>
                                <div class="ec-checkout-summary">
                                    <div>
                                        <span class="text-left">Sub-Total</span>
                                        <span class="text-right">EGP{{subtotal}}</span>
                                    </div>
                                    <div>
                                        <span class="text-left">Total discount</span>
                                        <span class="text-right">EGP{{totalDiscount}}</span>
                                    </div>
                                    <div>
                                        <span class="text-left">Country Tax</span>
                                        <span class="text-right">EGP{{countryTax}}</span>
                                    </div>
                                    <div>
                                        <span class="text-left">Shipping fee</span>
                                        <span class="text-right">EGP{{shippingFee}}</span>
                                    </div>
                                    <div>
                                        <span class="text-left">Coupan Discount</span>
                                    </div>
                                    <transition name="fade" mode="out-in">
                                        <div class="ec-checkout-coupan-content d-block" v-if="coupon_flag">
                                        <form class="ec-checkout-coupan-form" name="ec-checkout-coupan-form" @submit.prevent="ApplyCoupon">
                                            <input class="ec-coupan" type="text" v-model="Coupon" required="" placeholder="Enter Your Coupan Code" name="ec-coupan">
                                            <button class="ec-coupan-btn button btn-primary d-flex align-items-center" type="submit" name="subscribe" :disabled="isLoading('ApplyCoupon')">
                                                Apply
                                                <loading-outlined class="ms-3" v-if="isLoading('ApplyCoupon')"/>
                                            </button>
                                        </form>
                                    </div>
                                    </transition>
                                    <div v-if="couponDetails">
                                        <div>
                                            {{couponDetails['code']}} 
                                            <b class="text-success">EGP{{couponDetails['discount_amount']}}</b>
                                        </div>
                                        <a href="javascript:void(0)" @click="deleteCoupon()"><DeleteOutlined class="text-danger fs-6"/></a>
                                    </div>
                                    <div class="ec-checkout-summary-total">
                                        <span class="text-left">Total Amount</span>
                                        <span class="text-right">EGP{{totalAmount}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Sidebar Summary Block -->
                    </div>
                    <div class="ec-sidebar-wrap ec-checkout-pay-wrap">
                        <!-- Sidebar Payment Block -->
                        <div class="ec-sidebar-block">
                            <div class="ec-sb-title">
                                <h3 class="ec-sidebar-title">Payment Method</h3>
                            </div>
                            <div class="ec-sb-block-content">
                                <div class="ec-checkout-pay">
                                    <div class="ec-pay-desc">Please select the preferred payment method to use on this
                                        order.</div>
                                    <form action="#">
                                        <span class="ec-pay-option">
                                            <span class="d-block">
                                                <input type="radio" v-model="payment_method" value="cash_on_delivery" class="h-auto w-auto me-2" id="pay1" name="radio-group" checked>
                                                <label for="pay1">Cash On Delivery</label>
                                            </span>
                                            <span class="d-block">
                                                <input type="radio" v-model="payment_method" value="paymob" class="h-auto w-auto me-2" id="pay2" name="radio-group">
                                                <label for="pay2">Paymob</label>
                                            </span>
                                        </span>
                                        <span class="ec-pay-commemt">
                                            <span class="ec-pay-opt-head">Add Comments About Your Order</span>
                                            <textarea name="your-commemt" v-model="description" placeholder="Comments"></textarea>
                                        </span>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- Sidebar Payment Block -->
                    </div>
                </div>
            </div>
        </div>
        <add-address :addressData="currentAddress" :mode="addressMode"/>
    </section>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import {EyeOutlined, DeleteOutlined, EditOutlined, LoadingOutlined} from '@ant-design/icons-vue';
import { router } from "@/router";
export default {
    data(){
        return{
            addressMode: 'add',
            coupanFlag:false,
            description:"",
            payment_method:"cash_on_delivery",
            Coupon:null,
            AddressID:null,
            currentAddress: {},
        }
    },
    components: {
        EyeOutlined,
        DeleteOutlined,
        EditOutlined,
        LoadingOutlined
    },
    computed: {
        ...mapState(['addresses','couponDetails','coupon_flag','coupon_flag_2']),
        ...mapGetters(['subtotal','totalDiscount','couponDiscount','totalAmount','countryTax','shippingFee']),
        isAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
    },
    created(){
        if(this.isAuthenticated.user == null){
           router.push("/");
        }
    },
    methods: {
        ...mapActions(['GetUserAddresses']),
        async fetchUserAddresses() {
            await this.GetUserAddresses();
        },
        prepareAddress(mode, address = {}) {
            this.addressMode = mode;
            this.currentAddress = { ...address };
        },
        ApplyCoupon(){
            this.$store.dispatch("ApplyCoupon",this.Coupon)
        },
        deleteAddress(address){
            this.$store.dispatch("DeleteAddress",address)
            if(address.id == this.AddressID){
                this.AddressID = null
            }
        },
        ApplyTax(){
            let coupon;
            if(this.couponDetails != null){
                coupon = this.couponDetails['code']
            }
            this.$store.dispatch("ApplyTax",{coupon:coupon, address_id:this.AddressID})
        },
        deleteCoupon(){
            this.$store.commit('APPLY_COUPON', null);
            this.$store.commit('COUPON_FLAG', true);
        },
        toggleCoupon(){
            this.$store.commit('COUPON_FLAG_2');
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
        CreateOrder(){
            let coupon;
            if(this.couponDetails != null){
                coupon = this.couponDetails['code']
            }
            this.$store.dispatch("OrderCreate",{
                coupon:coupon, 
                user_address_id:this.AddressID, 
                payment_method:this.payment_method,
                description: this.description
            })
        }
    },
    mounted() {
        this.fetchUserAddresses();
        this.AddressID = null
    },
}
</script>
<style lang="">
    
</style>