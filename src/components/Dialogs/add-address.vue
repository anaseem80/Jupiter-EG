<template lang="">
<!-- Add Address -->
    <div class="modal fade" id="address" tabindex="-1" aria-labelledby="addAddressModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <Form 
            class="modal-content"
            @submit="onAddAddress"
            :validation-schema="AddressSchema"
            v-slot="{ errors }"
        >
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{mode}} Address</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body row">
            <div class="col-lg-6 form-group">
                <label for="name" class="mb-0">Name</label>
                <Field 
                    type="text" 
                    class="form-control"
                    name="name"
                    v-model="addressData.name"
                    id="name"
                    :class="{ 'is-invalid': errors.name }"
                />
            </div>
            <div class="col-lg-6 form-group">
                <label for="email" class="mb-0">Email</label>
                <Field 
                    type="email" 
                    class="form-control"
                    name="email"
                    v-model="addressData.email"
                    id="email"
                    :class="{ 'is-invalid': errors.email }"
                />
            </div>
            <div class="col-lg-12 form-group mt-2">
                <label for="phone" class="mb-0">Phone</label>
                <Field 
                    type="phone" 
                    class="form-control"
                    name="phone"
                    v-model="addressData.phone"
                    id="phone"
                    :class="{ 'is-invalid': errors.phone }"
                />
            </div>
            <div class="col-lg-4 form-group mt-2">
                <label for="country" class="mb-0">Country</label>
                <Field 
                    as="select"
                    class="form-control border"
                    name="country"
                    v-model="addressData.country"
                    id="country"
                    :class="{ 'is-invalid': errors.country }"
                >
                <option value="" selected disabled>Select Country</option>
                <option :value="country.name_en" v-for="country in countries" :key="country">{{country.name_en}}</option>
                </Field>
            </div>
            <div class="col-lg-4 form-group mt-2">
                <label for="city" class="mb-0">City</label>
                <Field 
                    type="text" 
                    class="form-control"
                    name="city"
                    v-model="addressData.city"
                    id="city"
                    :class="{ 'is-invalid': errors.city }"
                />
            </div>
            <div class="col-lg-4 form-group mt-2">
                <label for="state" class="mb-0">state</label>
                <Field 
                    type="text" 
                    class="form-control"
                    name="state"
                    v-model="addressData.state"
                    id="state"
                    :class="{ 'is-invalid': errors.state }"
                />
            </div>
            <div class="col-lg-12 form-group mt-2">
                <label for="address_1" class="mb-0">Address 1</label>
                <Field 
                    as="textarea"
                    type="text" 
                    class="form-control"
                    name="address_1"
                    v-model="addressData.address_1"
                    id="address_1"
                    :class="{ 'is-invalid': errors.address_1 }"
                />
            </div>
            <div class="col-lg-12 form-group mt-2">
                <label for="address_2" class="mb-0">Address 2</label>
                <Field 
                    as="textarea"
                    type="text" 
                    class="form-control"
                    name="address_2"
                    v-model="addressData.address_2"
                    id="address_2"
                    :class="{ 'is-invalid': errors.address_2 }"
                />
            </div>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary dismiss-add-address" data-bs-dismiss="modal">Close</button>
            <button class="btn btn-primary" type="submit" id="basic-addon2" :disabled="isLoading('AddAddress')">
                    Save Changes
                <loading-outlined class="ms-3" v-if="isLoading('AddAddress')"/>
            </button>
        </div>
        </Form>
    </div>
    </div>
</template>
<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import {LoadingOutlined} from '@ant-design/icons-vue';
import { mapState, mapActions } from 'vuex'

export default {
    props:['addressData', 'mode'],
    components: {
        Form,
        Field,
        LoadingOutlined
    },
    computed: {
        ...mapState(['countries']),
    },
    methods:{
        ...mapActions(['GetCountries']),
        async fetchCountries() {
            await this.GetCountries();
        },
        onAddAddress(address){
            const current = this.mode == 'edit' ? this.addressData : address
            this.$store.dispatch("AddAddress", {Address:current, mode:this.mode})
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    },
    setup(){
        const AddressSchema = Yup.object().shape({
            email: Yup.string().required("Email is required").email("Email is invalid"),
            country: Yup.string().required("Country is required"),
            state: Yup.string().required("State is required"),
            city: Yup.string().required("City is required"),
            address_1: Yup.string().required("Address 1 is required"),
            address_2: Yup.string().required("Address 2 is required"),
            name: Yup.string().required("Name is required"),
            phone: Yup.string().required("Phone is required")
        });
        return {
            AddressSchema,
        };
    },
    mounted() {
        this.fetchCountries();
    },
}
</script>
