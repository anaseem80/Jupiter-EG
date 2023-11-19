<template lang="">
  <div class="col-md-12 tab-pane fade active show" id="tab-cat-profile">
        <div class="ec-vendor-block-profile">
            <div class="ec-vendor-block-img space-bottom-30">
                <div class="ec-vendor-block-detail">
                    <h5 class="name">{{this.isAuthenticated.user.name}}</h5>
                    <p>{{$t(this.isAuthenticated.user.client_type)}}</p>
                </div>
                <p>{{$t("Hello")}} <span>{{this.isAuthenticated.user.name}}</span></p>
                <p>{{$t("From your account you can easily view and track orders. You can manage and change your account information like address, contact information and history of orders.")}}</p>
                <strong>{{this.isAuthenticated.user.email}}</strong>
            </div>
            <h5>{{$t("Account Information")}}</h5>
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="ec-vendor-detail-block ec-vendor-block-email space-bottom-30">
                        <h6>{{$t("E-mail address and name")}}</h6>
                        <info-dialog />
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="ec-vendor-detail-block ec-vendor-block-email space-bottom-30">
                        <h6>{{$t("Password")}}</h6>
                        <password-dialog />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {LoadingOutlined} from '@ant-design/icons-vue';

export default {
    methods:{
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    },
    components: {
        LoadingOutlined
    },
    computed: {
        isAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
    },
}
</script>
<style lang="">
    
</style>