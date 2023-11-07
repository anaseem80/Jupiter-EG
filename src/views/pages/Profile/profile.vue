<template lang="">
    <!-- User profile section -->
    <section class="ec-page-content ec-vendor-uploads ec-user-account section-space-p">
        <div class="container">
            <div class="row">
                <!-- Sidebar Area Start -->
                <div class="ec-shop-leftside ec-vendor-sidebar col-lg-3 col-md-12">
                    <div class="ec-sidebar-wrap">
                        <!-- Sidebar Category Block -->
                        <div class="ec-sidebar-block">
                            <div class="ec-vendor-block">
                                <!-- <div class="ec-vendor-block-bg"></div>
                                <div class="ec-vendor-block-detail">
                                    <img class="v-img" src="@/@/assets/images/user/1.jpg" alt="vendor image">
                                    <h5>Mariana Johns</h5>
                                </div> -->
                                <div class="ec-vendor-block-items">
                                    <ul>
                                        <li><a href="user-profile.html">User Profile</a></li>
                                        <li><a href="user-history.html">History</a></li>
                                        <li><a href="wishlist.html">Wishlist</a></li>
                                        <li><a href="cart.html">Cart</a></li>
                                        <li><a href="checkout.html">Checkout</a></li>
                                        <li><a href="track-order.html">Track Order</a></li>
                                        <li><a href="user-invoice.html">Invoice</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ec-shop-rightside col-lg-9 col-md-12">
                    <div class="ec-vendor-dashboard-card ec-vendor-setting-card">
                        <div class="ec-vendor-card-body">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="ec-vendor-block-profile">
                                        <div class="ec-vendor-block-img space-bottom-30">
                                            <div class="ec-vendor-block-detail mt-4">
                                                <img class="v-img" src="@/assets/images/user/1.jpg" alt="vendor image">
                                                <h5 class="name">{{this.isAuthenticated.user.name}}</h5>
                                                <p>{{this.isAuthenticated.user.client_type}}</p>
                                            </div>
                                            <p>Hello <span>{{this.isAuthenticated.user.name}}</span></p>
                                            <p>From your account you can easily view and track orders. You can manage and change your account information like address, contact information and history of orders.</p>
                                        </div>
                                        <h5>Account Information</h5>
                                        <div class="row">
                                            <div class="col-md-6 col-sm-12">
                                                <div class="ec-vendor-detail-block ec-vendor-block-email space-bottom-30">
                                                    <h6>E-mail address <a href="javasript:void(0)" data-link-action="editmodal" title="Edit Detail" data-bs-toggle="modal" data-bs-target="#edit_modal"><img src="@/assets/images/icons/edit.svg"
                                                        class="svg_img pro_svg" alt="edit" /></a></h6>
                                                    <strong>{{this.isAuthenticated.user.email}}</strong>
                                                </div>
                                            </div>
                                            <div class="col-md-6 col-sm-12">
                                                <div class="ec-vendor-detail-block ec-vendor-block-email space-bottom-30">
                                                    <h6>Password <a href="javasript:void(0)" data-link-action="editmodal" title="Edit Detail" data-bs-toggle="modal" data-bs-target="#edit_modal"><img src="@/assets/images/icons/edit.svg"
                                                        class="svg_img pro_svg" alt="edit" /></a></h6>
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
    </section>
        <!-- Modal -->
        <div class="modal fade" id="edit_modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header p-3">
                    <h5 class="modal-title">Edit Information</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="space-bottom-30">
                            <div class="ec-vendor-upload-detail">
                                <Form 
                                    class="row g-3"
                                    @submit="onChangeEmail"
                                    :validation-schema="Emailschema"
                                    v-slot="{ errors }"
                                >
                                    <div class="col-12 input-group">
                                        <Field 
                                            type="text" 
                                            class="form-control"
                                            name="email"
                                            placeholder="Enter your new email"
                                            :class="{ 'is-invalid': errors.email }"
                                        />
                                        <div class="input-group-append">
                                            <button class="btn btn-primary" id="basic-addon2" :disabled="isLoading('UpdateUserInfo')">
                                                Send OTP
                                                <loading-outlined class="ms-3" v-if="isLoading('UpdateUserInfo')"/>
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal end -->
    <!-- End User profile section -->
</template>
<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { router } from "@/router";
import {LoadingOutlined} from '@ant-design/icons-vue';
export default {
    components: {
        Form,
        Field,
        LoadingOutlined
    },
    data(){
        return{
            emailBOOL: false,
        }
    },
    created(){
        if(this.isAuthenticated.user == null){
           router.push("/");
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
    },
    methods:{
        onChangeEmail(data){
            console.log(data)
            this.$store.dispatch("UpdateUserInfo", { email: data.email, emailBOOL: this.emailBOOL })
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    },
    setup(){
        const Emailschema = Yup.object().shape({
            email: Yup.string().required("Email is required").email("Email is invalid"),
        });
        return {
            Emailschema,
        };
    },
}
</script>
<style lang="">
    
</style>