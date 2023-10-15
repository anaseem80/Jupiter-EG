<template lang="">
    <section class="ec-page-content section-space-p">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">Log In</h2>
                        <h2 class="ec-title">Log In</h2>
                        <p class="sub-title mb-3">Best place to buy and sell digital products</p>
                    </div>
                </div>
                <div class="ec-login-wrapper">
                    <div class="ec-login-container">
                        <div class="ec-login-form">
                                <Form
                                    class="login"
                                    @submit="onSubmit"
                                    :validation-schema="schema"
                                    v-slot="{ errors }"
                                >
                                <span class="ec-login-wrap">
                                    <label>Email Address*</label>
                                    <Field
                                        name="email"
                                        type="text"
                                        class="form-control mt-2 mb-0"
                                        placeholder="Enter your email add..."
                                        :class="{ 'is-invalid': errors.email }"
                                    />
                                    <div class="invalid-feedback text-danger mb-2">{{ errors.email }}</div>
                                </span>
                                <span class="ec-login-wrap mt-3">
                                    <label>Password*</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        class="form-control mt-2 mb-0"
                                        placeholder="Enter your password"
                                        :class="{ 'is-invalid': errors.password }"
                                    />
                                    <div class="invalid-feedback text-danger mb-2">{{ errors.password }}</div>
                                </span>
                                <span class="ec-login-wrap ec-login-fp mt-3">
                                    <label><a href="#">Forgot Password?</a></label>
                                </span>
                                <span class="ec-login-wrap ec-login-btn">
                                    <button class="btn btn-primary w-100" :disabled="$store.state.Loading.status" type="submit">
                                        Login
                                        <img src="@/assets/images/common/loader-2.gif" width="20" v-if="$store.state.Loading.status" class="ms-3">
                                    </button>
                                    <span class="ec-register-wrap ec-register-fp mt-3">
                                        <label>Don't have any account yet?  <router-link to="/register">Register Now!</router-link></label>
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
export default {
    components: {
        Form,
        Field,
    },
    methods:{
        onSubmit(User){
            console.log(this.$toast)
            this.$store.dispatch("UserLogin", { User: User, toast: this.$toast })
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