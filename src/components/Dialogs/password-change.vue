<template lang="">
    <!-- Change password modal start -->
    <Form 
        @submit="onChangePassword"
        :validation-schema="Passwordschema"
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
                                <label for="old_password" class="mb-0">Current Password</label>
                                <Field 
                                    type="password" 
                                    class="form-control"
                                    name="old_password"
                                    id="old_password"
                                    placeholder="Enter your current password"
                                    :class="{ 'is-invalid': errors.old_password }"
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label for="new_password" class="mb-0">New Password</label>
                                <Field 
                                    type="password" 
                                    class="form-control"
                                    name="new_password"
                                    id="new_password"
                                    placeholder="Enter your new password"
                                    :class="{ 'is-invalid': errors.new_password }"
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label for="new_password_confirmation" class="mb-0">New Password Confirmation</label>
                                <Field 
                                    type="password" 
                                    class="form-control"
                                    name="new_password_confirmation"
                                    id="new_password_confirmation"
                                    placeholder="Enter your password confirmation"
                                    :class="{ 'is-invalid': errors.new_password_confirmation }"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn btn-primary w-100" type="submit" id="basic-addon3" :disabled="isLoading('UpdateUserPassword')">
                Save Changes
                <loading-outlined class="ms-3" v-if="isLoading('UpdateUserPassword')"/>
        </button>
    </Form>
    <!-- Change password modal end -->
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
        onChangePassword(data){
            this.$store.dispatch("UpdateUserPassword", data)
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    },
    setup(){
        const Passwordschema = Yup.object().shape({
            old_password: Yup.string()
                .required("Password is required"),
            new_password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Password is required"),
            new_password_confirmation: Yup.string().oneOf([Yup.ref('new_password'), null], 'Passwords must match').required("Password is required"),
        });
        return {
            Passwordschema,
        };
    },
}
</script>
<style lang="">
    
</style>