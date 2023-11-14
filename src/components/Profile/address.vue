<template lang="">
<div class="col-md-12 tab-pane fade" id="tab-cat-address" v-if="addresses">
    <div class="ec-vendor-card-header p-0 pb-4">
        <h5>Addresses</h5>
        <div class="ec-header-btn">
            <a class="btn btn-lg btn-primary" @click="prepareAddress('add')" data-bs-toggle="modal" data-bs-target="#address" href="javascript:void(0)">Add Address</a>
        </div>
    </div>
    <div class="">
        <div class="ec-vendor-card-table">
            <table class="table ec-table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Country</th>
                        <th scope="col">Address</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(address, index) in addresses"
                        class="position-relative"
                    >
                        <th scope="row">
                            <transition name="fade" mode="out-in">
                                <!--  -->
                                <div v-if="isLoading('DeleteAddress'+address.id)" class="loader position-absolute top-0 w-100 h-100 d-flex justify-content-center align-items-center end-0">
                                    <loading-outlined class="fs-3"/>
                                </div>
                            </transition>
                            <span>{{index+1}}</span>
                        </th>
                        <td><span>{{address['country']}}</span></td>
                        <td><span>{{address['address_1']}}</span></td>
                        <td><span>{{address['name']}}</span></td>
                        <td><span>{{address['email']}}</span></td>
                        <td><span>{{address['phone']}}</span></td>
                        <td>
                           <span class="d-flex justify-content-evenly">
                            <a href="javascript:void(0)" data-bs-toggle="modal" @click="prepareAddress('edit', address)" data-bs-target="#address"><EditOutlined class="fs-6"/></a>
                            <a href="javascript:void(0)" @click="deleteAddress(address)"><DeleteOutlined class="text-danger fs-6"/></a>
                           </span>
                        </td>
                    </tr>
                    <tr v-if="addresses.length == 0">
                        <td colspan="7" class="text-center"><span>No addresses found</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
<add-address :addressData="currentAddress" :mode="addressMode"/>
</template>
<script>
import {EyeOutlined, DeleteOutlined, EditOutlined, LoadingOutlined} from '@ant-design/icons-vue';
import { mapState, mapActions } from 'vuex'
export default {
    data(){
        return{
            addressMode: 'add',
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
        ...mapState(['addresses']),
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
        deleteAddress(address){
            this.$store.dispatch("DeleteAddress",address)
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    },
    mounted() {
        this.fetchUserAddresses();
    },
}
</script>
<style lang="">
    
</style>