<template lang="">
        <!-- Main Slider Start -->
        <div class="sticky-header-next-sec ec-main-slider section section-space-pb">
        <div class="ec-slider swiper-container main-slider-nav main-slider-dot">
            <!-- Main slider -->
            <swiper
                :slides-per-view="1"
                :space-between="0"
                :navigation="true"
                :modules="modules"
                @swiper="onSwiper"
                :autoplay="true"
                @slideChange="onSlideChange"
            >
                <swiper-slide 
                    v-for="banner in banners"
                    :key="banner.id"
                    class="ec-slide-item swiper-slide d-flex ec-slide-1"
                    :style="{ backgroundImage: 'url('+ 'http://127.0.0.1:8000/' + banner.image + ')' }"
                >
                    <div class="container align-self-center">
                        <div class="row">
                            <div class="col-xl-6 col-lg-7 col-md-7 col-sm-7 align-self-center">
                                <div class="ec-slide-content slider-animation"></div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
    <!-- Main Slider End -->
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { mapActions, mapState } from "vuex";
import 'swiper/css';
import { Navigation } from 'swiper/modules';

export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    computed: {
        ...mapState(['banners']),
    },
    methods: {
        ...mapActions(['GetBanners']),
        async fetchBanners() {
            await this.GetBanners();
        },
    },
    mounted() {
        this.fetchBanners();
    },
    setup() {
      return {
        modules: [Navigation],
      };
    },
}
</script>
<style lang="">
    
</style>