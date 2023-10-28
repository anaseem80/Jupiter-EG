<template lang="">
    <transition name="fade" mode="out-in">
        <loader v-if="isLoading('GetProductsByCurrentCategory')" key="loader"></loader>
    </transition>
    <section class="ec-page-content section-space-p" v-if="ProductsCategoryProducts">
        <div class="container">
            <div class="row">
                <div class="ec-shop-rightside col-lg-9 order-lg-last col-md-12 order-md-first margin-b-30">
                    <!-- Shop Top Start -->
                    <div class="ec-pro-list-top d-flex">
                        <div class="col-md-6 ec-grid-list">
                            <div class="ec-gl-btn">
                                <button class="btn btn-grid active" @click="showGrid()"><img src="@/assets/images/icons/grid.svg"
                                        class="svg_img gl_svg" alt="" /></button>
                                <button class="btn btn-list" @click="showList()"><img src="@/assets/images/icons/list.svg"
                                        class="svg_img gl_svg" alt="" /></button>
                            </div>
                        </div>
                        <div class="col-md-6 ec-sort-select">
                            <span class="sort-by">Sort by</span>
                            <div class="ec-select-inner">
                                <select name="ec-select" id="ec-select">
                                    <option selected disabled>Position</option>
                                    <option value="1">Relevance</option>
                                    <option value="2">Name, A to Z</option>
                                    <option value="3">Name, Z to A</option>
                                    <option value="4">Price, low to high</option>
                                    <option value="5">Price, high to low</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- Shop Top End -->

                    <!-- Shop content Start -->
                    <div class="shop-pro-content">
                        <div class="shop-pro-inner">
                            <div class="row">
                                <h4 v-if="ProductsCategoryProducts.products.data.length == 0" class="text-center mb-3">No Products</h4>
                                <products-component 
                                    :productObject="ProductsCategoryProducts.products.data" 
                                    :title="'sub-category'"
                                    :class="'col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-6 pro-gl-content'"
                                    >
                                </products-component>
                            </div>
                        </div>
                        <!-- Ec Pagination Start -->
                        <div class="ec-pro-pagination">
                            <span>Showing 1-{{ProductsCategoryProducts.products.data.length}}</span>
                            <ul class="ec-pro-pagination-inner">
                                <li
                                    v-for="item in ProductsCategoryProducts.products.last_page"
                                >
                                    <a
                                        class="mb-0 cursor-pointer" 
                                        href="#"
                                        @click="FetchProductsByCurrentCategory('page='+item,this.$route.params.id)"
                                        :class="ProductsCategoryProducts.products.current_page == item ? 'active' : ''"
                                    >
                                    {{item}}
                                    </a>
                                </li>
                                <li class="ms-2"><a class="next" href="#" @click="Next(ProductsCategoryProducts.products.next_page_url)">Next <i class="ecicon eci-angle-right"></i></a></li>
                            </ul>
                        </div>
                        <!-- Ec Pagination End -->
                    </div>
                    <!--Shop content End -->
                </div>
                <!-- Sidebar Area Start -->
               <filter-side></filter-side>
            </div>
        </div>
    </section>
    <!-- End Shop page -->
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
    props: ["apiEndpoint", "id"],
    computed: {
        ...mapState([`ProductsCategoryProducts`,'route']),
    },
    methods:{
        ...mapActions(['GetProductsByCurrentCategory']),
        async FetchProductsByCurrentCategory(page, id) {
            console.log(page)
            await this.GetProductsByCurrentCategory({id:id, page:page, route:this.apiEndpoint});
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
        Next(url){
            console.log(url)
            if(url!==null){
                console.log(url.split("/").reverse()[0].split("?").reverse()[0])
                this.FetchProductsByCurrentCategory(url.split("/").reverse()[0].split("?").reverse()[0],this.$route.params.id)
            }
        },
        showList(){
            $(".btn-list").addClass("active").siblings().removeClass("active")
            var $gridCont = $('.shop-pro-inner');
            var $listView = $('.pro-gl-content');
            $gridCont.addClass('list-view');
            $listView.addClass('width-100');
        },
        showGrid(){
            $(".btn-grid").addClass("active").siblings().removeClass("active")
            var $gridCont = $('.shop-pro-inner');
            var $gridView = $('.pro-gl-content');
            $gridCont.removeClass('list-view');
            $gridView.removeClass('width-100');
        }
    },
    mounted() {
        this.FetchProductsByCurrentCategory(1,this.$route.params.id);
    },
    watch:{
        $route (to, from){
           if(to.params.id !== from.params.id){
            this.FetchProductsByCurrentCategory(1,to.params.id)
           }
           if(to.name != 'subCategory'){
            this.FetchProductsByCurrentCategory(1,to.params.id)
           }
        }
    } 
}
</script>
<style lang="">
    
</style>