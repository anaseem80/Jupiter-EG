<template lang="">
    <!-- Ec cart page -->
    <breadcrumb title="Wishlist" :route="$route.name"/>
    <section class="ec-page-content section-space-p">
        <div class="container">
            <div class="row">
                <div class="col-12 text-center" v-if="wishlist.length == 0">
                    <img src="@/assets/images/vendor/empty.gif" width="250" alt="">
                    <h4>{{$t("Your wishlist is empty!")}} 😓</h4>
                    <router-link to="/" class="btn btn-primary rounded-pill mt-3">{{$t("Back to home")}}</router-link>
                </div>
                <div class="ec-cart-leftside col-12" v-if="wishlist.length > 0">
                    <!-- cart content Start -->
                    <div class="ec-cart-content">
                        <div class="ec-cart-inner">
                            <div class="row">
                                <form action="#">
                                    <div class="table-content cart-table-content">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>{{$t("Product")}}</th>
                                                    <!-- <th>{{$t("Price")}}</th> -->
                                                    <th class="text-center">{{$t("Action")}}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="item in wishlist" class="position-relative">
                                                    <td :data-label="$t('Product')" class="ec-cart-pro-name">
                                                        <transition name="fade" mode="out-in">
                                                            <div v-if="isLoading('Remove_Product_From_Wishlist'+item.id)" class="loader position-absolute top-0 w-100 h-100 d-flex justify-content-center align-items-center">
                                                                <loading-outlined class="fs-3"/>
                                                            </div>
                                                        </transition>
                                                        <h6 @click="this.$store.dispatch('GetProductData',{id: product_id})">
                                                            <router-link
                                                        :to="'/product/'+item['id']"><img class="ec-cart-pro-img mr-4"
                                                                :src="route + item['image']"
                                                                alt="" />{{CheckItemName(item)}}</router-link>
                                                        </h6>
                                                       </td>
                                                    <!-- <td :data-label="$t('Price')" class="ec-cart-pro-price">
                                                        <span class="amount">{{item['final_price']}} {{currency}}</span>
                                                        <div v-if="item.attribute">
                                                            <p class="mb-0">{{item.attribute.color != null ? ($i18n.locale == 'en' ? item.attribute.color.name_en : item.attribute.color.name_ar) : ""}}</p>
                                                            <p class="mb-0">{{item.attribute.size != null ? ($i18n.locale == 'en' ? item.attribute.size.name_en : item.attribute.size.name_ar) : ""}}</p>
                                                        </div>
                                                    </td> -->
                                                    <td :data-label="$t('Action')" class="ec-cart-pro-remove text-center">
                                                        <a href="#" @click="onRemoveProduct(item)"><i class="ecicon eci-trash-o text-danger"></i></a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!--cart content End -->
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import {LoadingOutlined} from '@ant-design/icons-vue';
import { router } from "@/router";
export default {
    computed: {
        ...mapState(['wishlist','route','currency']),
    },
    methods:{
        onRemoveProduct(product){
            this.$store.dispatch("Remove_Product_From_Wishlist",product)
        },
        startsWithArabicLetter(str) {
        const arabicRange = /[\u0600-\u06FF]/;
        return arabicRange.test(str[0]);
        },
        CheckItemName(item){
            if (this.$i18n.locale == "ar") {
                if(this.startsWithArabicLetter(item['name'])){
                    return item['name'];
                }else{
                    return item['favorite_name'];
                }
            } else {
                if(this.startsWithArabicLetter(item['name'])){
                    return item['favorite_name'];
                }else{
                    return item['name'];
                }
            }
            
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    }
}
</script>
<style lang="">
    
</style>