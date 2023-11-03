<template lang="">
    <Form 
        class="ec-btn-group-form"
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors }"
    >
        <Field
            name="keyword"
            type="text"
            class="form-control mt-2 mb-0"
            placeholder="Enter your keyword here..."
        />
        <button class="submit" type="submit"><img src="@/assets/images/icons/search.svg" class="svg_img header_svg" alt="icon" /></button>
    </Form>
</template>
<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { router } from "@/router";

export default {
    components: {
        Form,
        Field,
    },
    methods:{
        onSubmit(data){
          console.log(data.keyword)
          this.$store.dispatch('GetProductsByCurrentCategory',{page: 1, route:'search-product', keyword: data.keyword})
          router.push("/search-product/"+data.keyword)
        },
    },
    setup(){
        const schema = Yup.object().shape({
            keyword: Yup.string().required("Keyword is required")
        });
        return {
            schema,
        };
    },
}
</script>
<style lang="">
    
</style>