<template lang="">
    <!-- Ec Contact Us page -->
    <section class="ec-page-content section-space-p">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">{{$t("Contact us")}}</h2>
                        <h2 class="ec-title">{{$t("Contact us")}}</h2>
                        <p class="sub-title mb-3">{{$t("Best place to buy and sell digital products")}}</p>
                    </div>
                </div>
                <div class="ec-common-wrapper">
                    <div class="ec-contact-leftside">
                        <div class="ec-contact-container">
                            <div class="ec-contact-form">
                                <Form
                                    @submit="onSubmitContact"
                                    :validation-schema="schema"
                                    v-slot="{ errors }"
                                >
                                    <span class="ec-contact-wrap">
                                        <label>{{$t("Name*")}}</label>
                                        <Field 
                                            type="text" 
                                            name="name"
                                            class="form-control"
                                            :placeholder="$t('Enter your name')"
                                            :class="{ 'is-invalid': errors.name }"
                                        />
                                        <div class="invalid-feedback text-danger mb-2">{{ errors.name }}</div>
                                    </span>
                                    <span class="ec-contact-wrap">
                                        <label>{{$t("Email Address*")}}</label>
                                        <Field 
                                            type="email" 
                                            name="email" 
                                            :class="{ 'is-invalid': errors.email }"
                                            class="form-control"
                                            :placeholder="$t('Enter your email address')"
                                        />
                                        <div class="invalid-feedback text-danger mb-2">{{ errors.email }}</div>
                                    </span>
                                    <span class="ec-contact-wrap">
                                        <label>{{$t("Phone Number*")}}</label>
                                        <Field 
                                            type="text" 
                                            name="phone" 
                                            :class="{ 'is-invalid': errors.phone }"
                                            class="form-control"
                                            :placeholder="$t('Enter your phone number')"
                                        />
                                        <div class="invalid-feedback text-danger mb-2">{{ errors.phone }}</div>
                                    </span>
                                    <span class="ec-contact-wrap">
                                        <label>{{$t("Subject*")}}</label>
                                        <Field 
                                            type="text" 
                                            name="subject" 
                                            :class="{ 'is-invalid': errors.subject }"
                                            class="form-control"
                                            :placeholder="$t('Enter your subject')"
                                        />
                                        <div class="invalid-feedback text-danger mb-2">{{ errors.subject }}</div>
                                    </span>
                                    <span class="ec-contact-wrap">
                                        <label>{{$t("Comments/Questions*")}}</label>
                                        <Field 
                                            as="textarea"
                                            name="message"
                                            :class="{ 'is-invalid': errors.message }"
                                            class="form-control"
                                            :placeholder="$t('Please leave your comments here..')"
                                        />
                                        <div class="invalid-feedback text-danger mb-2">{{ errors.message }}</div>
                                    </span>
                                    <span class="ec-contact-wrap ec-contact-btn">
                                        <s-button :name='$t("Send")' action='ContactUS'/>
                                    </span>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div class="ec-contact-rightside">
                        <div class="ec_contact_info">
                            <h1 class="ec_contact_info_head">{{$t("Contact us")}}</h1>
                            <ul class="align-items-center">
                                <!-- <li class="ec-contact-item"><i class="ecicon eci-map-marker"
                                        aria-hidden="true"></i><span>Address :</span>71 Pilgrim Avenue Chevy Chase, east california. east california. MD
                                    20815, USA</li> -->
                                <li class="ec-contact-item align-items-center"><i class="ecicon eci-phone"
                                        aria-hidden="true"></i><span>{{$t("Call Us:")}}</span><a :href="'tel:+'+settings['company_phone']">{{settings['company_phone']}}</a></li>
                                <li class="ec-contact-item align-items-center"><i class="ecicon eci-envelope"
                                        aria-hidden="true"></i><span>{{$t("Email Address")}} :</span><a
                                                :href="'mailto:'+settings['email']">{{settings['email']}}</a></li>
                            </ul>
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
    computed: {
        ...mapState(['route','settings']),
    },
    methods:{
        onSubmitContact(data){
            this.$store.dispatch("ContactUS", data)
        },
    },
    setup(){
        const schema = Yup.object().shape({
            email: Yup.string().required("Email is required").email("Email is invalid"),
            name: Yup.string().required("Name is required"),
            subject: Yup.string().required("Subject is required"),
            message: Yup.string().required("Message is required"),
            phone: Yup.string().required("Phone is required"),
        });
        return {
            schema,
        };
    },
}
</script>
<style lang="">
    
</style>