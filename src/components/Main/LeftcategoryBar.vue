<template lang="">
      <!-- Category Sidebar start -->
    <div class="ec-side-cat-overlay"></div>
    <div class="col-lg-3 category-sidebar" data-animation="fadeIn">
            <div class="cat-sidebar">
                <div class="cat-sidebar-box">
                    <div class="ec-sidebar-wrap border-0">
                        <!-- Sidebar Category Block -->
                        <div class="ec-sidebar-block">
                            <div class="ec-sb-title">
                                <h3 class="ec-sidebar-title">{{$t("Categories")}}<button class="ec-close">×</button></h3>
                            </div>
                            <div class="ec-sb-block-content">
                                <ul>
                                    <li 
                                        v-for="(category, index) in home_products.categoriesWithSubcategories"
                                        :key="category.id"
                                    >
                                        <div class="ec-sidebar-block-item" @click="openSubCat($event.target)"><img :src="route + category.image" class="svg_img" alt="drink" />{{category.name}}</div>
                                        <ul>
                                            <li v-if="category.subcategories == 0" class="text-center">No Products here</li>
                                            <li v-for="subCategory in category.subcategories">
                                                    <div class="ec-sidebar-sub-item"><router-link :to="`/subCategory/${subCategory.id}`" @click="hideMenu()">{{subCategory.name}}</router-link></div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <!-- Sidebar Category Block -->
                    </div>
                </div>
            </div>
    </div>

</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
    created(){
        $(document).ready(function(){

        });
    },
    computed: {
        ...mapState([`home_products`,'route']),
    },
    methods:{
        ...mapActions(['GetHomeProducts']),
        async fetchHomeProducts() {
            await this.GetHomeProducts();
        },
        openSubCat(e){
            // $(".ec-sidebar-block .ec-sb-block-content ul li ul").addClass("ec-cat-sub-dropdown");
            $('.ec-cat-sub-dropdown').not($(e)).fadeOut()
            $(e).next().fadeToggle()
        },
        hideMenu(){
            $(".ec-side-cat-overlay").fadeOut();
            $(".category-sidebar").removeClass("ec-open");
        }
    },
    mounted() {
        this.fetchHomeProducts();
    },
}
</script>