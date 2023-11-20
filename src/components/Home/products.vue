<template lang="">
    <div v-for="productsSortedAdmin in productObject" v-key="productsSortedAdmin.key" :class="class">
        <div class="ec-product-inner position-relative">
            <div class="sold-out position-absolute z-2" v-if="productsSortedAdmin.quantity == 0">
                <img src="@/assets/images/common/Sold-Out-Transparent.png"/>
            </div>
            <div class="ec-pro-image-outer">
                <div class="ec-pro-image">
                    <a href="product-left-sidebar.html" class="image">
                        <img class="main-image"
                            v-lazy="route + productsSortedAdmin['image']" alt="Product" 
                            :id="'img-'+title+productsSortedAdmin.id"
                            
                            />
                        <img v-lazy="route + productsSortedAdmin['hover_image']" v-if="productsSortedAdmin['hover_image'] !== null" class="hover-image" alt="Product" />
                    </a>
                    <div class="ec-pro-actions">
                        <button 
                            v-if="userData && userData.client_type !== 'wholesale'"
                            title="Add To Cart" 
                            class="add-to-cart" 
                            :disable="isLoading('Add_Product_To_Cart'+productsSortedAdmin.id)" 
                            @click="onAddProduct(productsSortedAdmin)"
                            :class="{
                                'low-fade': isLoading('Add_Product_To_Cart'+productsSortedAdmin.id)
                            }"
                            >
                        >
                        <img
                            src="@/assets/images/icons/cart.svg" class="svg_img pro_svg"
                            alt="" /> 
                            <loading-outlined class="fs-4 loader-small-button" v-if="isLoading('Add_Product_To_Cart'+productsSortedAdmin.id)"/>
                        </button>
                        <button 
                            v-if="!userData"
                            title="Add To Cart" 
                            class="add-to-cart" 
                            :disable="isLoading('Add_Product_To_Cart'+productsSortedAdmin.id)" 
                            @click="onAddProduct(productsSortedAdmin)"
                            :class="{
                                'low-fade': isLoading('Add_Product_To_Cart'+productsSortedAdmin.id)
                            }"
                            >
                        >
                        <img
                            src="@/assets/images/icons/cart.svg" class="svg_img pro_svg"
                            alt="" /> 
                            <loading-outlined class="fs-4 loader-small-button" v-if="isLoading('Add_Product_To_Cart'+productsSortedAdmin.id)"/>
                        </button>
                        <a 
                            class="ec-btn-group wishlist" 
                            @click="onAddProductWishList(productsSortedAdmin)" 
                            title="Wishlist"
                        >
                            <wishlist-icon :product="productsSortedAdmin"/>
                        </a>
                    </div>
                </div>
            </div>
            <!-- this.$route.params.id -->
            <div class="ec-pro-content">
                <a-rate v-model:value="productsSortedAdmin.average_rating" disabled />
                <h5 class="ec-pro-title" @click="fetchProductData(productsSortedAdmin.id)"><router-link :to="'/product/'+productsSortedAdmin['id']">{{productsSortedAdmin['name']}}</router-link></h5>
                <span class="ec-price">
                    <span class="new-price">{{productsSortedAdmin['final_price']}}</span>
                </span>
                <div class="ec-pro-option" v-if="productsSortedAdmin.type_attribute == 'both'">
                    <div>
                      <div
                        class="ec-pro-color"
                        v-for="(colorAttr,index) in productsSortedAdmin.attribute_for"
                        :class="{
                            'd-none': index !== 0,
                            [title + productsSortedAdmin.id]: true
                        }"
                        :id="title+colorAttr.size_name_en+productsSortedAdmin.id"
                        >
                        <span class="ec-pro-opt-label">Color</span>
                        <ul class="ec-opt-swatch ec-change-img">
                            <li 
                                class="active"
                                @click="onColorChange($event.target,color,productsSortedAdmin.id,title,colorAttr)"
                                :data-src="color.image"
                                :data-src-hover="color.image"
                                :data-old="productsSortedAdmin.price"
                                :data-new="color.price"
                                :data-tooltip="color.colorName"
                                v-for="color in colorAttr.colors"
                            >
                                <a 
                                    href="javascript:void(0)" 
                                    class="ec-opt-clr-img"
                                    ><span
                                    :style="{ backgroundColor: color.color_code, }">
                                  </span>
                                </a>
                              </li>
                        </ul>
                    </div>
                    </div>
                    <!-- :class="{ 'active': index === 0 }" -->
                    <div class="ec-pro-size">
                        <span class="ec-pro-opt-label">Size</span>
                        <ul class="ec-opt-size">
                            <li 
                            v-for="(size,index) in productsSortedAdmin.attribute_for"
                            @click="sizeColorChange($event.target)"
                            :data-color="title+ size.size_name_en == null ? size.size.name_en : size.size_name_en +productsSortedAdmin.id"
                            :data-div="title"
                            :data-id="productsSortedAdmin.id"
                            
                            >
                            <a 
                              :href="'#tab-color-'+size.size_name_en+productsSortedAdmin.id"
                              data-bs-toggle="tab"
                              class="ec-opt-sz"
                              data-tooltip="Small"
                              >
                              {{size.size_name_en}}
                            </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="ec-pro-option justify-content-end" v-if="productsSortedAdmin.type_attribute == 'sizes'">
                    <div class="ec-pro-size">
                        <span class="ec-pro-opt-label">Size</span>
                        <ul class="ec-opt-size">
                            <li 
                            v-for="(size,index) in productsSortedAdmin.attribute_for"
                            @click="sizeColorChange($event.target, productsSortedAdmin.type_attribute , size.size, title,productsSortedAdmin.id )"
                            :data-color="title+ size.size.size_name_en == null ? size.size.name_en : size.size.size_name_en +productsSortedAdmin.id"
                            :data-div="title"
                            :data-id="productsSortedAdmin.id"
                            >
                            <a 
                              :href="'#tab-color-'+size.size.size_name_en+productsSortedAdmin.id"
                              data-bs-toggle="tab"
                              class="ec-opt-sz"
                              data-tooltip="Small"
                              >
                              {{size.size.size_name_en}}
                            </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="ec-pro-option justify-content-start" v-if="productsSortedAdmin.type_attribute == 'colors'">
                    <div>
                      <div
                        class="ec-pro-color"
                            v-for="(colorAttr,index) in productsSortedAdmin.attribute_for"
                        >
                        <span class="ec-pro-opt-label">Color</span>
                        <ul class="ec-opt-swatch ec-change-img">
                            <li 
                                class="active"
                                @click="onColorChange($event.target,colorAttr.color,productsSortedAdmin.id,title)"
                                :data-src="colorAttr.color.image"
                                :data-src-hover="colorAttr.color.image"
                                :data-old="productsSortedAdmin.price"
                                :data-new="colorAttr.color.price"
                                :data-tooltip="colorAttr.color.colorName"
                            >
                                <a 
                                    href="javascript:void(0)" 
                                    class="ec-opt-clr-img"
                                    ><span
                                    :style="{ backgroundColor: colorAttr.color.color_code, }">
                                  </span>
                                </a>
                              </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import VueCookies from 'vue-cookies'
import {LoadingOutlined} from '@ant-design/icons-vue';

export default {
    props:['productObject','title','class'],
    computed: {
        ...mapState(['route','userData']),
        ...mapGetters(['filterAttribute']),
    },
    data(){
        return{
            UserIDToken: VueCookies.get("UserToken"),
            selectedAttribute: {},
        }
    },
    components: {
        LoadingOutlined
    },
    methods:{
        isProductInWishlist(product) {
            const productId = product.id;

            return this.$store.state.wishlist.find(item => item.id === productId);
        },
        sizeColorChange(e, type, size, title, id){
            if(type!=undefined){
                this.selectedAttribute[title + id] = size.attribute_id;
            }
            $(e).addClass("active").siblings().removeClass("active")
            $('.'+$(e).data('div')+$(e).data('id')).addClass("d-none")
            $('#'+$(e).data('div')+$(e).data('color')).addClass('d-block').removeClass('d-none')
        },
        onAddProduct(product){
            let attribute = this.selectedAttribute[this.title + product.id];
            console.log(attribute)
            if(attribute === undefined){
                attribute = null
            }
            this.$store.dispatch("Add_Product_To_Cart", { attribute: attribute, product: product, quantity: 1, toast: this.$toast,token: this.UserIDToken })
        },
        fetchProductData(id){
            $(window).scrollTop(0); 
            this.$store.dispatch('GetProductData',{id: id})
        },
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
        onAddProductWishList(product){
            const existedItem = this.$store.state.wishlist.find(item =>{
                return item.id == product.id
            })
            if(existedItem){
                this.$store.dispatch("Remove_Product_From_Wishlist",product)
            }else{
                this.$store.dispatch("Add_Product_To_Wishlist",product)
            }
        },
        onColorChange(element,color,id,title, object){
            console.log(color)
            this.selectedAttribute[title + id] = color.attribute_id;
            console.log(this.selectedAttribute[title + id] )
            $('#img-'+title+id).attr('src',this.route+'imagesfp/product/'+color.image)
            var $this = $(element);
            var $new_price = $this.closest('.ec-pro-content').find('.new-price');

            console.log($this.closest('.ec-pro-image'))
            $new_price.text(color.price); 

            $this.addClass('active').siblings().removeClass('active');
        }
    },
    mounted(){
    }
}
</script>
<style lang="">
    
</style>