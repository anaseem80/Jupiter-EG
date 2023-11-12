<template lang="">
<div class="col-md-12 tab-pane fade" id="tab-cat-orders" v-if="orders">
    <div class="ec-vendor-card-header p-0 pb-4">
        <h5>Orders</h5>
    </div>
    <div class="">
        <div class="ec-vendor-card-table">
            <table class="table ec-table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Payment Status</th>
                        <th scope="col">Payment Method</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Total</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(order, index) in orders"
                        class="position-relative"
                    >
                        <th scope="row">
                            <span>{{index+1}}</span>
                        </th>
                        <td><span>{{order['status']}}</span></td>
                        <td><span>{{order['payment_status']}}</span></td>
                        <td><span>{{order['payment_method']}}</span></td>
                        <td><span>{{order['currency']}}</span></td>
                        <td><span>{{order['total']}}</span></td>
                        <td>
                           <span class="d-flex justify-content-evenly align-items-center">
                            <router-link :to="'/order/'+order.id"><EyeOutlined class="fs-6"/></router-link>
                            <a href="javascript:void(0)" class="fs-6 text-danger" @click="deleteAddress(address)">x</a>
                           </span>
                        </td>
                    </tr>
                    <tr v-if="orders.length == 0">
                        <td colspan="7" class="text-center"><span>No addresses found</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>
<script>
import {EyeOutlined, DeleteOutlined, EditOutlined, LoadingOutlined} from '@ant-design/icons-vue';
import { mapState, mapActions } from 'vuex'
export default {
    components: {
        EyeOutlined,
        DeleteOutlined,
        EditOutlined,
        LoadingOutlined
    },
    computed: {
        ...mapState(['orders']),
    },
    methods: {
        ...mapActions(['GetUserOrders']),
        async fetchUserOrders() {
            await this.GetUserOrders();
        },
        
        deleteAddress(address){
            this.$store.dispatch("DeleteAddress",address)
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    },
    mounted() {
        this.fetchUserOrders();
    },
}
</script>
<style lang="">
    
</style>