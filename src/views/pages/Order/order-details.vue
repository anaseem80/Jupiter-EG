<template lang="">
        <transition name="fade" mode="out-in">
            <loader v-if="isLoading('GetUserOrder')" key="loader"></loader>
        </transition>
        <div v-if="order">
            <section class="ec-page-content section-space-p">
            <div class="container">
                <!-- Track Order Content Start -->
                <div class="ec-trackorder-content col-md-12">
                    <div class="ec-trackorder-inner">
                        <div class="ec-trackorder-top">
                            <h2 class="ec-order-id">order #{{order['id']}}</h2>
                            <div class="ec-order-detail">
                                <div>Payment Status: <span>{{order['payment_status']}}</span></div>
                                <div>Payment Method: <span>{{order['payment_method']}}</span></div>
                            </div>
                        </div>
                        <div class="ec-trackorder-bottom">
                            <div class="ec-progress-track">
                                <ul id="ec-progressbar" v-if=" order['status'] !== 'cancelled' && order['status'] !== 'refunded'">
                                    <li 
                                    :class="{'active' : order['status'] == 'pending' || order['status'] == 'processing' || order['status'] == 'delivering' || order['status'] == 'completed' }"
                                    class="step0"
                                    ><span class="ec-track-icon"> <img
                                                src="@/assets/images/icons/track_1.png" alt="track_order"></span><span
                                            class="ec-progressbar-track"></span><span class="ec-track-title">order
                                            <br>Pending</span></li>
                                    <li 
                                    :class="{'active' : order['status'] == 'processing' || order['status'] == 'delivering' || order['status'] == 'completed' }"
                                    class="step0"
                                    ><span class="ec-track-icon"> <img
                                                src="@/assets/images/icons/track_2.png" alt="track_order"></span><span
                                            class="ec-progressbar-track"></span><span class="ec-track-title">order
                                                <br>Processing</span></li>
                                    <li 
                                    :class="{'active' : order['status'] == 'delivering' || order['status'] == 'completed' }"
                                    class="step0"
                                    ><span class="ec-track-icon"> <img
                                                src="@/assets/images/icons/track_3.png" alt="track_order"></span><span
                                            class="ec-progressbar-track"></span><span class="ec-track-title">order
                                                <br>Delivering</span></li>
                                    <li 
                                    :class="{'active' : order['status'] == 'completed'}"
                                    class="step0"
                                    ><span class="ec-track-icon"> <img
                                                src="@/assets/images/icons/track_4.png" alt="track_order"></span><span
                                            class="ec-progressbar-track"></span><span class="ec-track-title">order <br>Completed</span></li>

                                </ul>
                                <ul id="ec-progressbar" v-if=" order['status'] == 'cancelled' || order['status'] == 'refunded'">
                                    <li 
                                    class="step0 active w-50"
                                    ><span class="ec-track-icon"> <img
                                                src="@/assets/images/icons/track_1.png" alt="track_order"></span><span
                                            class="ec-progressbar-track"></span><span class="ec-track-title">order
                                            <br>Pending</span></li>

                                    <li 
                                    :class="{'active' : order['status'] == 'cancelled' || order['status'] == 'refunded'}"
                                    class="step0 w-50"
                                    ><span class="ec-track-icon"> <img
                                                src="@/assets/images/icons/track_6.png" width="65" alt="track_order"></span><span
                                            class="ec-progressbar-track"></span><span class="ec-track-title">order <br>{{order['status'] == 'cancelled' ? 'Cancelled' : 'Refunded'}}</span></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Track Order Content end -->
            </div>
            </section>
            <div class="ec-page-content ec-vendor-uploads ec-user-account section-space-p">
                <div class="ec-shop-rightside col-lg-9 m-auto">
                    <div class="ec-vendor-dashboard-card">
                        <div class="ec-vendor-card-header">
                            <h5>Invoice</h5>
                        </div>
                        <div class="ec-vendor-card-body padding-b-0">
                            <div class="page-content">
                                <div class="page-header text-blue-d2">
                                    <img :src="route+settings.logo" alt="Site Logo" />
                                </div>

                                <div class="container px-0">
                                    <div class="row mt-4">
                                        <div class="col-lg-12">
                                            <hr class="row brc-default-l1 mx-n1 mb-4" />


                                            <div class="mt-4">

                                                <div class="text-95 text-secondary-d3">
                                                    <div class="ec-vendor-card-table">
                                                        <table class="table ec-table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">#</th>
                                                                    <th scope="col">Name</th>
                                                                    <th scope="col">Qty</th>
                                                                    <th scope="col">Discount</th>
                                                                    <th scope="col">Price</th>
                                                                    <th scope="col">Amount</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr
                                                                v-for="product in order['order_items']"
                                                                >
                                                                    <th><span>
                                                                        <img class="ec-cart-pro-img mr-4"
                                                                        width="70"
                                                                        :src="route + product['product']['image']"
                                                                        alt="" />
                                                                    </span></th>
                                                                    <td><span>{{product['product']['name']}}</span></td>
                                                                    <td><span>{{product['quantity']}}</span></td>
                                                                    <td><span>{{product['product']['discount']}}</span></td>
                                                                    <td><span>{{product['product']['price']}}</span></td>
                                                                    <td><span>{{product['product']['final_price'] * product['quantity']}}</span></td>
                                                                </tr>
                                                            </tbody>
                                                            <tfoot>
                                                                <tr>
                                                                    <td class="border-none" colspan="3">
                                                                        <span></span></td>
                                                                    <td class="border-color" colspan="1">
                                                                        <span><strong>Sub Total</strong></span></td>
                                                                    <td class="border-color">
                                                                        <span>{{order['subtotal']}}</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="border-none" colspan="3">
                                                                        <span></span></td>
                                                                    <td class="border-color" colspan="1">
                                                                        <span><strong>Shipping</strong></span></td>
                                                                    <td class="border-color">
                                                                        <span>{{order['shipping']}}</span></td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="border-none m-m15"
                                                                        colspan="3"><span class="note-text-color">Extra
                                                                            note such as company or payment
                                                                            information...</span></td>
                                                                    <td class="border-color m-m15"
                                                                        colspan="1"><span><strong>Total</strong></span>
                                                                    </td>
                                                                    <td class="border-color m-m15">
                                                                        <span>{{order['total']}}</span></td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    computed: {
        ...mapState(['order','route','settings']),
    },
    methods: {
        ...mapActions(['GetUserOrder']),
        async fetchUserOrder() {
            await this.GetUserOrder(this.$route.params.id);
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    },
    mounted() {
        this.fetchUserOrder();
    },
}
</script>
<style lang="">
    
</style>