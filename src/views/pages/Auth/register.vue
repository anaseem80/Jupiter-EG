<template lang="">
    <section class="ec-page-content section-space-p">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">{{$t("Register")}}</h2>
                        <h2 class="ec-title">{{$t("Register")}}</h2>
                        <p class="sub-title mb-3">{{$t("Best place to buy and sell digital products")}}</p>
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
                                    <label>{{$t("Name*")}}</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        class="form-control mt-2 mb-0"
                                        :placeholder="$t('Your name..')"
                                        :class="{ 'is-invalid': errors.name }"
                                    />
                                    <div class="invalid-feedback text-danger mb-2">{{ errors.name }}</div>
                                </span>
                                <span class="ec-register-wrap mt-3">
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
                                <span class="ec-register-wrap mt-3">
                                    <label>{{$t("Phone Number*")}}</label>
                                    <vue-tel-input
                                     v-model="phone" 
                                     mode="international"
                                     @validate="handlePhoneValidation"
                                     :inputOptions="{ 
                                        'name': 'phone',
                                        showDialCode: true
                                    }"
                                     class="mb-0 phone-input"
                                    >
                                    </vue-tel-input>
                                    <div class="text-danger mb-2">{{ phoneMessage }}</div>
                                </span>
                                <span class="ec-register-wrap mt-3">
                                    <label>{{$t("Type*")}}</label>
                                    <Field
                                        as="select"
                                        name="client_type"
                                        class="form-control mt-2 mb-0 border"
                                        :class="{ 'is-invalid': errors.client_type }"
                                    >
                                        <option value="" selected disabled>{{$t("Select Type")}}</option>
                                        <!-- <option value="user">{{$t("user")}}</option> -->
                                        <option value="wholesale">{{$t("wholesale")}}</option>
                                        <option value="retail">{{$t("retail")}}</option>
                                    </Field>
                                    <div class="invalid-feedback text-danger mb-2">{{ errors.client_type }}</div>
                                </span>
                                <span class="ec-register-wrap mt-3">
                                    <label>{{$t("Password*")}}</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        class="form-control mt-2 mb-0"
                                        :placeholder="$t('Enter your password')"
                                        :class="{ 'is-invalid': errors.password }"
                                    />
                                    <div class="invalid-feedback text-danger mb-2">{{ errors.password }}</div>
                                </span>
                                <span class="ec-register-wrap ec-register-btn">
                                    <s-button :name="$t('Register')" action='UserRegister'/>
                                </span>
                                <span class="ec-register-wrap ec-register-fp mt-3">
                                    <label>{{$t("Already have an account?")}}  <router-link to="/login">{{$t("Login Now!")}}</router-link></label>
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
            UserIDToken: VueCookies.get("UserIDToken"),
            lang: this.$store.getters.CurrentLang,
            phone:'',
            phoneValidate:'',
            phoneMessage:null,
            countryCODE:null,
        }
    },
    created(){
        if(this.UserIDToken !== null){
           router.push("/");
        }
    },
    methods:{
        onSubmit(User){
            if(this.phone.split("").length != 16 && this.countryCODE == "20"){
                this.phoneMessage = this.$i18n.locale == 'ar' ? "رقم الهاتف يجب أن يكون صحيحا" : "Phone number must be a valid phone"
            }else if(this.phoneValidate == undefined || this.phoneValidate == false){
                this.phoneMessage = this.$i18n.locale == 'ar' ? "رقم الهاتف يجب أن يكون صحيحا" : "Phone number must be a valid phone"
            }else{
                this.phoneMessage = ''   
                User.phone = this.phone
                console.log(User)
                this.$store.dispatch("UserRegister", { User: User, toast: this.$toast })
            }
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
        handlePhoneValidation(phoneObject) {
            this.phoneValidate = phoneObject.valid
            this.countryCODE = phoneObject.countryCallingCode

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