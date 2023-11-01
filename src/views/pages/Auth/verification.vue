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
                                <p class="text-dark">We have sent the OTP to <span class="fw-bold">{{ otpEmail }}</span> please check your DM.</p>
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
                                            ref="otpInput"
                                            class="form-control mt-2 mb-0 bg-light"
                                            maxlength="1"
                                            min="0"
                                            v-model="otpDigits[index]"
                                            @input="OTP($event.target, index)"
                                            @paste="handlePaste"
                                            @keydown="handleBackspace($event, index)"
                                        />
                                        </div>
                                    </div>
                                    <Field
                                        name="otp"
                                        type="hidden"
                                        class="form-control mt-2 mb-0"
                                        v-model="otpDigits[index]"
                                    />
                                    <p class="my-3 text-center">Didn't recieve the OTP? 
                                        <button @click="ResendOTP" type="button" :disabled="isLoading('RESEND_OTP')">
                                            Resend 
                                        </button>
                                        <vue-countdown class="d-block" v-if="isLoading('RESEND_OTP')" :time="60000" v-slot="{ minutes, seconds }">
                                        You Can send again in {{ minutes }} minutes, {{ seconds }} seconds.
                                        </vue-countdown>
                                    </p>
                                </span>
                                <span class="ec-register-wrap ec-register-btn">
                                    <s-button name='Verfiy email' action='SubmitOTP'/>
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
import VueCountdown from '@chenfengyuan/vue-countdown';
export default {
    data(){
        return {
            otpDigits: new Array(6).fill(''),
            otpEmail: VueCookies.get("emailOTP"),
        };
    },
    components: {
        Form,
        Field,
    },
    created(){
        if(this.otpEmail === null){
            console.log("asd")
           router.push("/");
        }
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
        handlePaste(event) {
            const pasteData = event.clipboardData.getData('text');
            if (pasteData.length === this.otpDigits.length) {
                for (let i = 0; i < this.otpDigits.length; i++) {
                    this.otpDigits[i] = pasteData[i];
                }
                event.preventDefault();
            }
        },
        OTP(e) {
            if($(e).parent().next().find("input").length == 1){
                $(e).parent().next().find("input")[0].focus()
            }
            console.log()
        },
        handleBackspace(event, index) {
            if (event.key === 'Backspace' && index > 0 && this.otpDigits[index] === '') {
            this.$nextTick(() => {
                this.$refs.otpInput[index - 1].focus();
            });
            }
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
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