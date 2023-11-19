<template lang="">
    <Form 
        @submit="onChangeEmail"
        :validation-schema="Emailschema"
        v-slot="{ errors }"
    >
        <div class="row">
            <div class="space-bottom-30">
                <div class="ec-vendor-upload-detail">
                    <div 
                        class="row g-3"
                    >
                        <div class="col-12">
                            <div class="form-group">
                                <label for="name" class="mb-0">{{$t("Name*")}}</label>
                                <Field 
                                    type="text" 
                                    class="form-control"
                                    name="name"
                                    id="name"
                                    v-model="isAuthenticated.user.name"
                                    :placeholder="$t('Enter your name')"
                                    :class="{ 'is-invalid': errors.name }"
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label for="email" class="mb-0">{{$t("Email Address*")}}</label>
                                <Field 
                                    type="text" 
                                    class="form-control"
                                    name="email"
                                    id="email"
                                    v-model="isAuthenticated.user.email"
                                    :placeholder="$t('Enter your email address')"
                                    :class="{ 'is-invalid': errors.email }"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn btn-primary w-100" type="submit" id="basic-addon2" :disabled="isLoading('UpdateUserInfo')">
                {{$t("Save")}}
                <loading-outlined class="ms-3" v-if="isLoading('UpdateUserInfo')"/>
        </button>
    </Form>
</template>
<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import {LoadingOutlined} from '@ant-design/icons-vue';

export default {
    components: {
        Form,
        Field,
        LoadingOutlined
    },
    methods:{
        onChangeEmail(data){
            this.$store.dispatch("UpdateUserInfo", data)
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    },
    computed: {
        isAuthenticated() {
            return this.$store.state.isAuthenticated;
        },
    },
    setup(){
        const Emailschema = Yup.object().shape({
            email: Yup.string().required("Email is required").email("Email is invalid"),
            name: Yup.string().required("Name is required")
        });
        return {
            Emailschema,
        };
    },
}
</script>
<style lang="">
    
</style>