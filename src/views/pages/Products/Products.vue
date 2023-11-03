<template lang="">
    <transition name="fade" mode="out-in">
        <loader v-if="isLoading('GetProductsByCurrentCategory')" key="loader"></loader>
    </transition>
    <breadcrumb :title="$route.name" :route="$route.name"/>
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
                                <a-pagination 
                                    v-model:current="current" 
                                    @change="onPageChange"
                                    @showSizeChange="onShowSizeChange"
                                    :total="ProductsCategoryProducts.products.last_page + '0'" 
                                >
                                </a-pagination>
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
    data(){
        return{
            current:1,
        }
    },
    computed: {
        ...mapState([`ProductsCategoryProducts`,'route']),
    },
    created(){
        $(window).scrollTop(0); 
    },
    methods:{
        ...mapActions(['GetProductsByCurrentCategory']),
        async FetchProductsByCurrentCategory(page) {
            await this.GetProductsByCurrentCategory({page:page, route:this.apiEndpoint, keyword: this.$route.params.keyword});
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
        onPageChange(newPage) {
            this.FetchProductsByCurrentCategory('page='+newPage,this.$route.params.id)
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
        var keyword = this.$route.params.keyword != undefined ? this.$route.params.keyword : ''
        this.FetchProductsByCurrentCategory(1,this.$route.params.id,keyword);
    },
    watch:{
        $route (to, from){
           if(to.params.id !== from.params.id){
            this.FetchProductsByCurrentCategory(1,to.params.id)
           }
        }
    } 
}
</script>
<style lang="">
    
</style>