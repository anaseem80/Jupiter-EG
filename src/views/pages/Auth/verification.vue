<template lang="">
    <section class="ec-page-content section-space-p">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">{{$t("Verification")}}</h2>
                        <h2 class="ec-title">{{$t("Verification")}}</h2>
                        <p class="sub-title mb-3">{{$t("Best place to buy and sell digital products")}}</p>
                    </div>
                </div>
                <div class="col-lg-6 ec-register-wrapper">
                    <div class="ec-register-container">
                        <div class="ec-register-form">
                            <div class="text-center">
                                <p class="text-dark">{{$t("We have sent the OTP to")}} <span class="fw-bold email-wrap">{{ userOTP }}</span> {{$t("please check your DM.")}}</p>
                                <img src="@/assets/images/common/otp.gif" class="rounded-circle" width="350" alt="">
                            </div>
                                <Form
                                    class="register"
                                    @submit="SubmitOTP"
                                    :validation-schema="schema"
                                    v-slot="{ errors }"
                                >
                                <span class="ec-register-wrap">
                                    <label class="text-center">{{$t("OTP*")}}</label>
                                    <div class="row">
                                        <div class="col-lg-2 col-4" v-for="(digit, index) in otpDigits" :key="index">
                                        <input
                                            type="text"
                                            ref="otpInput"
                                            class="form-control mt-2 mb-0 otp-field border-2"
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
                                    <p class="my-3 text-center">{{$t("Didn't receive the OTP?")}}
                                        <button @click="ResendOTP" type="button" :disabled="isLoading('RESEND_OTP')">
                                            {{$t("Resend")}}
                                        </button>
                                        <vue-countdown class="d-block" v-if="isLoading('RESEND_OTP')" :time="60000" v-slot="{ minutes, seconds }">
                                        {{$t("You Can send again in")}} {{ minutes }} {{$t("minutes,")}} {{ seconds }} {{$t("seconds.")}}
                                        </vue-countdown>
                                    </p>
                                </span>
                                <span class="ec-register-wrap ec-register-btn">
                                    <s-button :name="settings.confirmation_message == 'email' ? $t('Verify email') : $t('Verify phone')" action='SubmitOTP'/>
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
import { router } from "@/router";
import VueCookies from 'vue-cookies'
import { mapActions, mapState } from "vuex";
import VueCountdown from '@chenfengyuan/vue-countdown';
export default {
    data(){
        return {
            otpDigits: new Array(6).fill(''),
            userOTP: VueCookies.get("USER_OTP"),
        };
    },
    components: {
        Form,
        Field,
    },
    created(){
        if(this.userOTP === null){
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
            this.$store.dispatch("ResendOTP")
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
    computed: {
        ...mapState(['settings']),
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