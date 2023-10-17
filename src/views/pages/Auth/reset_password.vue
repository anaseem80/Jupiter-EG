<template lang="">
    <section class="ec-page-content section-space-p">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">Reset Password</h2>
                        <h2 class="ec-title">Reset Password</h2>
                        <p class="sub-title mb-3">Best place to buy and sell digital products</p>
                    </div>
                </div>
                <div class="ec-login-wrapper col-lg-6">
                    <div class="ec-login-container">
                        <div class="ec-login-form">
                                <Form
                                    class="login"
                                    @submit="onSubmit"
                                    :validation-schema="schema"
                                    v-slot="{ errors }"
                                >
                                <span class="ec-login-wrap">
                                    <label>New Password</label>
                                    <Field
                                        name="new_password"
                                        type="text"
                                        class="form-control mt-2 mb-0"
                                        placeholder="Enter your email add..."
                                        :class="{ 'is-invalid': errors.new_password }"
                                    />
                                    <div class="invalid-feedback text-danger mb-2">{{ errors.new_password }}</div>
                                </span>
                                <span class="ec-login-wrap mt-3">
                                    <label>Password Confirmation</label>
                                    <Field
                                        name="new_password_confirmation"
                                        type="text"
                                        class="form-control mt-2 mb-0"
                                        placeholder="Enter your email add..."
                                        :class="{ 'is-invalid': errors.new_password_confirmation }"
                                    />
                                    <div class="invalid-feedback text-danger mb-2">{{ errors.new_password_confirmation }}</div>
                                </span>
                                <span class="ec-login-wrap ec-login-btn">
                                    <button class="btn btn-primary w-100" :disabled="isLoading('ResetPassword')" type="submit">
                                        Reset Password
                                        <img src="@/assets/images/common/loader-2.gif" width="20" v-if="isLoading('ResetPassword')" class="ms-3">
                                    </button>
                                </span>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { mapActions, mapState } from "vuex";
import VueCookies from 'vue-cookies'
import { router } from "@/router";
export default {
    components: {
        Form,
        Field,
    },
    data(){
        return{
            token:VueCookies.get("tokenOTP"),
            UserIDToken: VueCookies.get("UserIDToken")
        }
    },
    created(){
        if(this.token === null){
           router.push("/");
        }
        if(this.otpEmail !== null){
           router.push("/");
        }
    },
    methods:{
        onSubmit(User){
            console.log(this.$toast)
            this.$store.dispatch("ResetPassword", { User: User,token: this.token, toast: this.$toast })
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    },
    setup(){
        const schema = Yup.object().shape({
            new_password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Password is required"),
            new_password_confirmation: Yup.string()
            .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
        });
        return {
            schema,
        };
    },
}
</script>
<style lang="">
    
</style>