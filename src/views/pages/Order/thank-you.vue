<template lang="">
    <!-- Ec Thank You page -->
    <section class="sticky-header-next-sec ec-thank-you-page section-space-p">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="ec-thank-you section-space-p">
                        <!-- thank content Start -->
                        <div class="ec-thank-content">
                            <i class="ecicon eci-check-circle" aria-hidden="true"></i>
                            <div class="section-title">
                                <h2 class="ec-title">{{$t("Thank You")}}</h2>
                                <p class="sub-title">{{$t("For Shopping with us.")}}</p>
                            </div>
                        </div>
                        <!--thank content End -->
                        <div class="ec-hunger">
                            <div class="ec-hunger-detial">
                                <h3>{{$t("Still Hungry For Shopping?")}}</h3>
                                <h6>{{$t("Check out our special offers here.")}}</h6>
                                <router-link to="/with-offers" @click="$store.dispatch('GetProductsByCurrentCategory',{page: 1, route:'products/with-offers'})" class="btn btn-primary">{{$t("Top Offers")}}</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>