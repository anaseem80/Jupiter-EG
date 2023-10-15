<template lang="">
    <section class="ec-page-content section-space-p">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">Verification</h2>
                        <h2 class="ec-title">Verification</h2>
                        <p class="sub-title mb-3">Best place to buy and sell digital products</p>
                    </div>
                </div>
                <div class="col-lg-6 ec-register-wrapper">
                    <div class="ec-register-container">
                        <div class="ec-register-form">
                            <div class="text-center">
                                <img src="@/assets/images/common/otp.gif" class="rounded-circle" width="350" alt="">
                            </div>
                            <Form
                                    class="register"
                                    @submit="SubmitOTP"
                                    :validation-schema="schema"
                                    v-slot="{ errors }"
                                >
                                <span class="ec-register-wrap">
                                    <label class="text-center">OTP*</label>
                                    <div class="row">
                                        <div class="col-lg-2 col-4" v-for="(digit, index) in otpDigits" :key="index">
                                        <input
                                            type="text"
                                            class="form-control mt-2 mb-0 bg-light"
                                            maxlength="1"
                                            min="0"
                                            v-model="otpDigits[index]"
                                            @input="OTP($event.target.value, index)"
                                        />
                                        </div>
                                    </div>
                                    <Field
                                        name="otp"
                                        type="hidden"
                                        class="form-control mt-2 mb-0"
                                        v-model="otpDigits[index]"
                                    />
                                    <p class="my-3 text-center">Didn't recieve the OTP? <span class="text-primary cursor-pointer" @click="ResendOTP">Resend</span></p>
                                </span>
                                <span class="ec-register-wrap ec-register-btn">
                                    <button class="btn btn-primary w-100 mt-0" :disabled="$store.state.Loading.status" type="submit">
                                        Verfiy email
                                        <img src="@/assets/images/common/loader-2.gif" width="20" v-if="$store.state.Loading.status" class="ms-3">
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
export default {
    data(){
        return {
            otpDigits: new Array(6).fill(''),
        };
    },
    components: {
        Form,
        Field,
    },
    methods:{
        SubmitOTP(){
            if(this.otpDigits.join() === ',,,,,'){
                this.$toast.error('Please type otp code')
            }else{
                this.$store.dispatch("SubmitOTP", { OTP: this.otpDigits.join("") , toast: this.$toast })
            }
        },
        ResendOTP(){
            this.$store.dispatch("ResendOTP", { email: 'anaseemamin@gmail.com' , toast: this.$toast })
        },
        OTP() {},
    },
    setup(){
        const schema = Yup.object().shape({
        });
        return {
            schema,
        };
    },
}
</script>
<style lang="">
    
</style>