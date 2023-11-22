<template lang="">
    <section class="ec-page-content section-space-p">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">{{$t("Log in")}}</h2>
                        <h2 class="ec-title">{{$t("Log in")}}</h2>
                        <p class="sub-title mb-3">{{$t("Best place to buy and sell digital products")}}</p>
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
                                    <label>{{$t("Email Address")}}*</label>
                                    <Field
                                        name="email"
                                        type="text"
                                        class="form-control mt-2 mb-0"
                                        :placeholder="$t('Enter your email add...')"
                                        :class="{ 'is-invalid': errors.email }"
                                    />
                                    <div class="invalid-feedback text-danger mb-2">{{ errors.email }}</div>
                                </span>
                                <span class="ec-login-wrap mt-3">
                                    <label>{{$t("Password")}}*</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        class="form-control mt-2 mb-0"
                                        :placeholder="$t('Enter your password')"
                                        :class="{ 'is-invalid': errors.password }"
                                    />
                                    <div class="invalid-feedback text-danger mb-2">{{ errors.password }}</div>
                                </span>
                                <span class="ec-login-wrap ec-login-fp mt-3">
                                    <label><router-link to="/forget_password">{{$t("Forgot Password")}}</router-link></label>
                                </span>
                                <span class="ec-login-wrap ec-login-btn">
                                    <s-button :name='$t("Login")' action='UserLogin'/>
                                    <span class="ec-register-wrap ec-register-fp mt-3">
                                        <label>{{$t("Don't have any account yet")}}  <router-link to="/register">{{$t("Register Now")}}!</router-link></label>
                                    </span>
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
import {LoadingOutlined,} from '@ant-design/icons-vue';
export default {
    components: {
        Form,
        Field,
        LoadingOutlined
    },
    data(){
        return{
            UserIDToken: VueCookies.get("UserIDToken")
        }
    },
    created(){
        if(this.UserIDToken !== null){
           router.push("/");
        }
    },
    methods:{
        onSubmit(User){
            this.$store.dispatch("UserLogin", { User: User, toast: this.$toast })
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    },
    setup(){
        const schema = Yup.object().shape({
            email: Yup.string().required("Email is required").email("Email is invalid"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Password is required"),
        });
        return {
            schema,
        };
    },
}
</script>
<style lang="">
    
</style>