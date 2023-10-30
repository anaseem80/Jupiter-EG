<template lang="">
    <div v-for="productsSortedAdmin in productObject" v-key="productsSortedAdmin.key" :class="class">
        <div class="ec-product-inner">
            <div class="ec-pro-image-outer">
                <div class="ec-pro-image">
                    <a href="product-left-sidebar.html" class="image">
                        <img class="main-image"
                            v-lazy="route + productsSortedAdmin['image']" alt="Product" 
                            :id="'img-'+title+productsSortedAdmin.id"
                            
                            />
                        <img v-lazy="route + productsSortedAdmin['hover_image']" v-if="productsSortedAdmin['hover_image'] !== null" class="hover-image" alt="Product" />
                    </a>
                    <span class="percentage">20%</span>
                    <a href="#" class="quickview" data-link-action="quickview"
                        title="Quick view" data-bs-toggle="modal"
                        data-bs-target="#ec_quickview_modal"><img
                            src="@/assets/images/icons/quickview.svg" class="svg_img pro_svg"
                            alt="" /></a>
                    <div class="ec-pro-actions">
                        <button 
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
                        <img src="@/assets/images/common/loader-2.gif" width="20" class="ms-3 loader-small-button" v-if="isLoading('Add_Product_To_Cart'+productsSortedAdmin.id)"></button>
                        <a class="ec-btn-group wishlist" title="Wishlist"><img
                                src="@/assets/images/icons/wishlist.svg"
                                class="svg_img pro_svg" alt="" /></a>
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
                    <div class="ec-pro-size">
                        <span class="ec-pro-opt-label">Size</span>
                        <ul class="ec-opt-size">
                            <li 
                            v-for="(size,index) in productsSortedAdmin.attribute_for"
                            @click="sizeColorChange($event.target)"
                            :data-color="title+ size.size_name_en == null ? size.size.name_en : size.size_name_en +productsSortedAdmin.id"
                            :data-div="title"
                            :data-id="productsSortedAdmin.id"
                            :class="{ 'active': index === 0 }"
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
                            >
                            <a 
                              :href="'#tab-color-'+size.size.name_en+productsSortedAdmin.id"
                              data-bs-toggle="tab"
                              class="ec-opt-sz"
                              data-old="$25.00"
                              data-new="$20.00"
                              data-tooltip="Small"
                              >
                              {{size.size.name_en}}
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
                                @click="onColorChange($event.target,colorAttr,productsSortedAdmin.id,title, colorAttr)"
                                :data-src="colorAttr.image"
                                :data-src-hover="colorAttr.image"
                                :data-old="productsSortedAdmin.price"
                                :data-new="colorAttr.price"
                                :data-tooltip="colorAttr.color.name_en"
                            >
                                <a 
                                    href="#" 
                                    class="ec-opt-clr-img"
                                    data-src="@/assets/images/product-image/6_1.jpg"
                                    data-src-hover="@/assets/images/product-image/6_1.jpg"
                                    data-tooltip="Gray"><span
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

export default {
    props:['productObject','title','class'],
    computed: {
        ...mapState(['route']),
        ...mapGetters(['filterAttribute']),
        
    },
    data(){
        return{
            UserIDToken: VueCookies.get("UserToken"),
            selectedAttribute: {},
        }
    },
    methods:{
        sizeColorChange(e){
            $(e).addClass("active").siblings().removeClass("active")
            $('.'+$(e).data('div')+$(e).data('id')).addClass("d-none")
            $('#'+$(e).data('div')+$(e).data('color')).addClass('d-block').removeClass('d-none')
        },
        onAddProduct(product){
            let attribute = this.selectedAttribute[this.title + product.id];
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
        onColorChange(element,color,id,title, object){
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