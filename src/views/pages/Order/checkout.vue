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
                                <div>
                                    <span class="d-flex justify-content-evenly">
                                        <a href="javascript:void(0)" class="me-1" data-bs-toggle="modal" @click="prepareAddress('edit', address)" data-bs-target="#address"><EditOutlined class="fs-6"/></a>
                                        <a href="javascript:void(0)" @click="deleteAddress(address)"><DeleteOutlined class="text-danger fs-6"/></a>
                                    </span>
                                </div>
                                </div>
                                <div v-if="addresses.length == 0" class="mb-2">No addresses found, add new one</div>
                                <a class="btn btn-lg btn-primary" @click="prepareAddress('add')" data-bs-toggle="modal" data-bs-target="#address" href="javascript:void(0)">Add Address</a>
                            </div>
                            <span class="ec-check-order-btn" v-if="addresses.length > 0">
                                <a class="btn btn-primary" href="#">Place Order</a>
                            </span>
                        </div>
                    </div>
                    <!--cart content End -->
                </div>
                <!-- Sidebar Area Start -->
                <div class="ec-checkout-rightside col-lg-4 col-md-12">
                    <div class="ec-sidebar-wrap">
                        <!-- Sidebar Summary Block -->
                        <div class="ec-sidebar-block">
                            <div class="ec-sb-title">
                                <h3 class="ec-sidebar-title">Summary</h3>
                            </div>
                            <div class="ec-sb-block-content">
                                <div class="ec-checkout-summary">
                                    <div>
                                        <span class="text-left">Sub-Total</span>
                                        <span class="text-right">{{subtotal}}</span>
                                    </div>
                                    <div>
                                        <span class="text-left">Total discount</span>
                                        <span class="text-right">{{totalDiscount}}</span>
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
                                            <b class="text-success">{{couponDetails['discount_amount']}}EGP</b>
                                        </div>
                                        <a href="javascript:void(0)" @click="deleteCoupon()"><DeleteOutlined class="text-danger fs-6"/></a>
                                    </div>
                                    <div class="ec-checkout-summary-total">
                                        <span class="text-left">Total Amount</span>
                                        <span class="text-right">{{totalAmount}}</span>
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
                                                <input type="radio" class="h-auto w-auto me-2" id="pay1" name="radio-group" checked>
                                                <label for="pay1">Cash On Delivery</label>
                                            </span>
                                            <span class="d-block">
                                                <input type="radio" class="h-auto w-auto me-2" id="pay2" name="radio-group">
                                                <label for="pay2">Paymob</label>
                                            </span>
                                        </span>
                                        <span class="ec-pay-commemt">
                                            <span class="ec-pay-opt-head">Add Comments About Your Order</span>
                                            <textarea name="your-commemt" placeholder="Comments"></textarea>
                                        </span>
                                        <!-- <span class="ec-pay-agree"><input type="checkbox" value=""><a href="#">I have
                                                read and agree to the <span>Terms & Conditions</span></a><span
                                                class="checked"></span></span> -->
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
        ...mapGetters(['subtotal','totalDiscount','couponDiscount','totalAmount']),
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
            if(this.addresses.length > 0){
                this.AddressID = this.addresses[0].id
            }
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
    },
    mounted() {
        this.fetchUserAddresses();
        this.AddressID = null
    },
}
</script>
<style lang="">
    
</style>