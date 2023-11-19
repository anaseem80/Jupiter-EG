<template lang="">
    <!-- <transition name="fade" mode="out-in">
        <loader v-if="isLoading('GetProductsByCurrentCategory')" key="loader"></loader>
    </transition> -->
    <breadcrumb :title="$route.name" :route="$route.name"/>
    <section class="ec-page-content section-space-p" v-if="ProductsCategoryProducts">
        <div class="container">
            <div class="row">
                <div class="ec-shop-rightside col-lg-9 order-lg-last col-md-12 order-md-first margin-b-30">
                    <div class="ec-pro-list-top d-flex">
                        <div class="col-md-6 ec-grid-list">
                            <div class="ec-gl-btn">
                                <button class="btn btn-grid active" @click="showGrid()"><img src="@/assets/images/icons/grid.svg"
                                        class="svg_img gl_svg" alt="" /></button>
                                <button class="btn btn-list" @click="showList()"><img src="@/assets/images/icons/list.svg"
                                        class="svg_img gl_svg" alt="" /></button>
                            </div>
                        </div>
                        <div class="col-md-6 ec-sort-select" v-if="$route.name == 'Sub category'">
                            <span class="sort-by">{{$t("Sort by")}}</span>
                            <div class="ec-select-inner">
                                <select 
                                @change="SortedProducts($event.target.value)"
                                name="ec-select" id="ec-select"
                                >
                                    <option selected disabled>{{$t("Position")}}</option>
                                    <option value="1">{{$t("Highest in demand")}}</option>
                                    <option value="2">{{$t("Price, low to high")}}</option>
                                    <option value="3">{{$t("Price, high to low")}}</option>
                                    <option value="4">{{$t("Newest")}}</option>
                                    <option value="5">{{$t("discount")}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <!-- Shop Top End -->

                    <!-- Shop content Start -->
                    <div class="shop-pro-content">
                        <div class="shop-pro-inner position-relative">
                            <transition name="fade" mode="out-in">
                                <div class="main-loader position-absolute h-100 w-100" v-if="isLoading('GetProductsByCurrentCategory')">
                                    <loading-outlined class="ms-3 fs-4"/>
                                </div>
                            </transition>
                            <div class="row">
                                <h4 v-if="ProductsCategoryProducts.products.data.length == 0" class="text-center mb-3">
                                    {{$t("No products here!")}} 😓 <br>
                                    <img src="@/assets/images/common/no-products.gif" width="150" class="img-fluid"/>
                                </h4>
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
                            <span>{{$t("Showing")}} 1-{{ProductsCategoryProducts.products.data.length}}</span>
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
import {LoadingOutlined} from '@ant-design/icons-vue';

export default {
    props: ["apiEndpoint", "id"],
    data(){
        return{
            current:1,
        }
    },
    components: {
        LoadingOutlined
    },
    computed: {
        ...mapState([`ProductsCategoryProducts`,'route']),
    },
    created(){
        $(window).scrollTop(0); 
    },
    methods:{
        ...mapActions(['GetProductsByCurrentCategory','SortedProducts']),
        async FetchProductsByCurrentCategory(page) {
            await this.GetProductsByCurrentCategory({page:page, route:this.apiEndpoint, keyword: this.$route.params.keyword});
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
        Next(url){
            if(url!==null){
                console.log(url.split("/").reverse()[0].split("?").reverse()[0])
                this.FetchProductsByCurrentCategory(url.split("/").reverse()[0].split("?").reverse()[0],this.$route.params.id)
            }
        },
        SortedProducts(selected){
            const sorted = {
                sort_type: selected,
                sub_category_id: this.$route.params.id
            }
            this.$store.dispatch("SortedProducts", sorted)
        },
        showList(){
            $(".btn-list").addClass("active").siblings().removeClass("active")
            var $gridCont = $('.shop-pro-inner');
            var $listView = $('.pro-gl-content');
            $gridCont.addClass('list-view');
            $listView.addClass('width-100');
        },
        onPageChange(newPage) {
            $(window).scrollTop(0); 
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