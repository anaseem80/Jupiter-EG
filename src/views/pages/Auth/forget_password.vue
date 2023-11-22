<template lang="">
    <section class="ec-page-content section-space-p">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">{{$t("Reset Password")}}</h2>
                        <h2 class="ec-title">{{$t("Reset Password")}}</h2>
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
                                    <label>{{$t("Email Address*")}}</label>
                                    <Field
                                        name="email"
                                        type="text"
                                        class="form-control mt-2 mb-0"
                                        :placeholder="$t('Enter your email add...')"
                                        :class="{ 'is-invalid': errors.email }"
                                    />
                                    <div class="invalid-feedback text-danger mb-2">{{ errors.email }}</div>
                                </span>
                                <span class="ec-login-wrap ec-login-btn">
                                    <s-button :name="$t('Reset Password')" action='ForgetPassword'/>
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
import { router } from "@/router";
import VueCookies from 'vue-cookies'
export default {
    components: {
        Form,
        Field,
    },
    methods:{
        onSubmit(User){
            this.$store.dispatch("ForgetPassword", { User: User, toast: this.$toast })
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
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
    setup(){
        const schema = Yup.object().shape({
            email: Yup.string().required("Email is required").email("Email is invalid"),
        });
        return {
            schema,
        };
    },
}
</script>
<style lang="">
    
</style>