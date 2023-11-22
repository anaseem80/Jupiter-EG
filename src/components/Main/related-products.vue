<template lang="">
    <section class="section ec-releted-product section-space-p" v-if="product">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="section-title">
                        <h2 class="ec-bg-title">{{$t("Related products")}}</h2>
                        <h2 class="ec-title">{{$t("Related products")}}</h2>
                        <p class="sub-title">{{$t("Browse The Collection of Top Categories")}}</p>
                    </div>
                </div>
            </div>
            <div class="row margin-minus-b-30">
                <!-- Related Product Content -->
                <products-component 
                :productObject="product.products" 
                :title="'related-products'" 
                :class="'col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 ec-product-content'">
                </products-component>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props:['product']
}
</script>
<style lang="">
    
</style>