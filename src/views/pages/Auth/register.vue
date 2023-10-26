<template lang="">
    <section class="ec-page-content section-space-p">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">Register</h2>
                        <h2 class="ec-title">Register</h2>
                        <p class="sub-title mb-3">Best place to buy and sell digital products</p>
                    </div>
                </div>
                <div class="ec-register-wrapper col-lg-6">
                    <div class="ec-register-container">
                        <div class="ec-register-form">
                                <Form
                                    class="register"
                                    @submit="onSubmit"
                                    :validation-schema="schema"
                                    v-slot="{ errors }"
                                >
                                <span class="ec-register-wrap">
                                    <label>Name*</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        class="form-control mt-2 mb-0"
                                        placeholder="Enter your email add..."
                                        :class="{ 'is-invalid': errors.name }"
                                    />
                                    <div class="invalid-feedback text-danger mb-2">{{ errors.name }}</div>
                                </span>
                                <span class="ec-register-wrap mt-3">
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
                                <span class="ec-register-wrap mt-3">
                                    <label>Type*</label>
                                    <Field
                                        as="select"
                                        name="client_type"
                                        class="form-control mt-2 mb-0 border"
                                        :class="{ 'is-invalid': errors.client_type }"
                                    >
                                        <option selected disabled>Select</option>
                                        <option value="user">User</option>
                                        <option value="wholesale">Wholesale</option>
                                        <option value="retail">Retail</option>
                                    </Field>
                                    <div class="invalid-feedback text-danger mb-2">{{ errors.client_type }}</div>
                                </span>
                                <span class="ec-register-wrap mt-3">
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
                                <span class="ec-register-wrap ec-register-btn">
                                    <button class="btn btn-primary w-100" :disabled="isLoading('UserRegister')" type="submit">
                                        Register
                                        <img src="@/assets/images/common/loader-2.gif" width="20" v-if="isLoading('UserRegister')" class="ms-3">
                                    </button>
                                </span>
                                <span class="ec-register-wrap ec-register-fp mt-3">
                                    <label>Already have an account?  <router-link to="/login">Login Now!</router-link></label>
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
            this.$store.dispatch("UserRegister", { User: User, toast: this.$toast })
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    },
    setup(){
        const schema = Yup.object().shape({
            email: Yup.string().required("Email is required").email("Email is invalid"),
            name: Yup.string().required("Name is required"),
            client_type: Yup.string().required("Type is required"),
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