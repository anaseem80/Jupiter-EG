<template lang="">
    <div v-for="productsSortedAdmin in productObject" v-key="productsSortedAdmin.key" class="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 ec-product-content">
        <div class="ec-product-inner">
            <div class="ec-pro-image-outer">
                <div class="ec-pro-image">
                    <a href="product-left-sidebar.html" class="image">
                        <img class="main-image"
                            :src="route + productsSortedAdmin['image']" alt="Product" />
                        <img v-if="productsSortedAdmin['hover_image'] !== null" class="hover-image"
                            :src="route + productsSortedAdmin['hover_image']" alt="Product" />
                    </a>
                    <span class="percentage">20%</span>
                    <a href="#" class="quickview" data-link-action="quickview"
                        title="Quick view" data-bs-toggle="modal"
                        data-bs-target="#ec_quickview_modal"><img
                            src="@/assets/images/icons/quickview.svg" class="svg_img pro_svg"
                            alt="" /></a>
                    <div class="ec-pro-actions">
                        <button title="Add To Cart" class="add-to-cart"><img
                                src="@/assets/images/icons/cart.svg" class="svg_img pro_svg"
                                alt="" /> Add To Cart</button>
                        <a class="ec-btn-group wishlist" title="Wishlist"><img
                                src="@/assets/images/icons/wishlist.svg"
                                class="svg_img pro_svg" alt="" /></a>
                    </div>
                </div>
            </div>
            <div class="ec-pro-content">
                <h5 class="ec-pro-title"><a href="product-left-sidebar.html">{{productsSortedAdmin['name']}}</a></h5>
                <span class="ec-price">
                    <span class="old-price">$27.00</span>
                    <span class="new-price">{{productsSortedAdmin['final_price']}}</span>
                </span>
                <div class="ec-pro-option" v-if="productsSortedAdmin.attribute_for.length > 0">
                    <div>
                      <div
                        class="ec-pro-color"
                        v-for="(colorAttr,index) in productsSortedAdmin.attribute_for"
                        :class="{ 'd-none': index !== 0 }"
                        :id="title+colorAttr.size_name_en+productsSortedAdmin.id"
                        >
                        <span class="ec-pro-opt-label">Color</span>
                        <ul class="ec-opt-swatch ec-change-img" v-if="colorAttr.color">
                            <li 
                              class="active"
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
                        <ul class="ec-opt-swatch ec-change-img" v-if="colorAttr.size_name_en">
                            <li 
                              class="active"
                              v-for="color in colorAttr.colors"
                            >
                                <a 
                                    href="#" 
                                    class="ec-opt-clr-img"
                                    data-src="@/assets/images/product-image/6_1.jpg"
                                    data-src-hover="@/assets/images/product-image/6_1.jpg"
                                    data-tooltip="Gray"><span
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
                            :data-color="title+ size.size_name_en == null ? size.size.name_en : size.size_name_en+productsSortedAdmin.id"
                            :data-div="title"
                            :class="{ 'active': index === 0 }"
                            >
                            <a 
                              v-if="size.size"
                              :href="'#tab-color-'+size.size.name_en+productsSortedAdmin.id"
                              data-bs-toggle="tab"
                              class="ec-opt-sz"
                              data-old="$25.00"
                              data-new="$20.00"
                              data-tooltip="Small"
                              >
                              {{size.size.name_en}}
                            </a>
                            <a 
                              v-if="size.size_name_en"
                              :href="'#tab-color-'+size.size_name_en+productsSortedAdmin.id"
                              data-bs-toggle="tab"
                              class="ec-opt-sz"
                              data-old="$25.00"
                              data-new="$20.00"
                              data-tooltip="Small"
                              >
                              {{size.size_name_en}}
                            </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
    props:['productObject','title'],
    computed: {
        ...mapState(['route']),
    },
    mounted(){
      $('.ec-opt-size').each(function() {
        $(this).on('mouseenter', 'li', function() {
            // alert("1");
            $('.'+$(this).data('div')+' .ec-pro-color').addClass("d-none")
            $('#'+$(this).data('color')).addClass('d-block').removeClass('d-none')
            onSizeChange($(this));
        });

        $(this).on('click', 'li', function() {
            // alert("2");
            onSizeChange($(this));
        });        

       function onSizeChange(thisObj){
            // alert("3");
            var $this = thisObj;
            var $old_data = $this.find('a').attr('data-old');
            var $new_data = $this.find('a').attr('data-new');
            var $old_price = $this.closest('.ec-pro-content').find('.old-price');
            var $new_price = $this.closest('.ec-pro-content').find('.new-price');

            $old_price.text($old_data); 
            $new_price.text($new_data); 

            $this.addClass('active').siblings().removeClass('active');
        }
    });


    var $ecproduct = $('.ec-pro-color, .ec-product-tab, .shop-pro-inner, .ec-new-product, .ec-releted-product, .ec-checkout-pro').find('.ec-opt-swatch');

function initChangeImg($opt) {
    $opt.each(function() {
        var $this = $(this),
        ecChangeImg = $this.hasClass('ec-change-img');           

        $this.on('mouseenter', 'li', function() {
            changeProductImg($(this));
        });
        
        $this.on('click', 'li', function() {
            changeProductImg($(this));
        });

        function changeProductImg(thisObj){
            var $this = thisObj;
            var $load = $this.find('a');

            var $proimg = $this.closest('.ec-product-inner').find('.ec-pro-image');

            if (!$load.hasClass('loaded')) {
                $proimg.addClass('pro-loading');
            }

            var $loaded = $this.find('a').addClass('loaded');

            $this.addClass('active').siblings().removeClass('active');
            if (ecChangeImg) {
                hoverAddImg($this);
            }
            setTimeout(function() {
               $proimg.removeClass("pro-loading");
           }, 1000);
            return false;    
        }

    });
}

    }
}
</script>
<style lang="">
    
</style>