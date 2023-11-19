<template lang="">
 <div class="ec-shop-leftside col-lg-3 order-lg-first col-md-12 order-md-last">
                    <div id="shop_sidebar">
                        <div class="ec-sidebar-heading">
                            <h1>{{$t("Filter Products By")}}</h1>
                        </div>
                        <div class="ec-sidebar-wrap">
                            <!-- Sidebar Size Block -->
                            <div class="ec-sidebar-block">
                                <div class="ec-sb-title">
                                    <h3 class="ec-sidebar-title">{{$t("SIZE")}}</h3>
                                </div>
                                <div class="ec-sb-block-content">
                                    <ul>
                                        <li
                                            v-for="size in sizes"
                                        >
                                            <div class="ec-sidebar-block-item">
                                                <input type="checkbox" @click="selectSize(size.name_en, $event)" /><a href="#">{{$i18n.locale == 'ar' ? size.name_ar : size.name_en}}</a><span
                                                    class="checked"></span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Sidebar Color item -->
                            <div class="ec-sidebar-block ec-sidebar-block-clr">
                                <div class="ec-sb-title">
                                    <h3 class="ec-sidebar-title">{{$t("Color")}}</h3>
                                </div>
                                <div class="ec-sb-block-content">
                                    <ul>
                                        <li
                                        v-for="color in colors"
                                        >
                                            <div class="ec-sidebar-block-item"><span class="shadow-sm border" @click="selectColor(color.name_en, $event)"
                                                    :style="'background-color:'+color.color_code"></span></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!-- Sidebar Price Block -->
                            <div class="ec-sidebar-block">
                                <div class="ec-sb-title">
                                    <h3 class="ec-sidebar-title">{{$t("Price")}}</h3>
                                </div>
                                <div class="">
                                    <a-slider v-model:value="price" max="10000" @afterChange="AfterSliderChange()" range :disabled="disabled" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    data(){
        return{
            price:[0,10000],
            sizes_filterd:[],
            colors_filterd:[]
        }
    },
    computed: {
        ...mapState(['sizes','colors']),
    },
    methods:{
        ...mapActions(['GetColors','GetSizes']),
        async FetchColors() {
            await this.GetColors();
        },
        async FetchSizes() {
            await this.GetSizes();
        },
        AfterSliderChange(){
            let id;
            if(this.$route.name=="Sub category"){
                id = this.$route.params.id
            }
            this.$store.dispatch("FilterProducts",{
                min_price:this.price[0],
                max_price:this.price[1], 
                sizes: this.sizes_filterd.join(","), 
                colors: this.colors_filterd.join(","),
                sub_category_id: id
            })    
        },
        selectSize(size, e){
            let id;
            if(this.$route.name=="Sub category"){
                id = this.$route.params.id
            }
            const existedItem = this.sizes_filterd.find(sizeItem =>{
                return sizeItem == size
            })
            if(!existedItem)
                this.sizes_filterd.push(size)
            if(!e.target.checked && existedItem){
                this.sizes_filterd.splice(this.sizes_filterd.indexOf(existedItem),1)
            }
            this.$store.dispatch("FilterProducts",{
                min_price:this.price[0],
                max_price:this.price[1], 
                sizes: this.sizes_filterd.join(","), 
                colors: this.colors_filterd.join(","),
                sub_category_id: id
            })    
        },
        selectColor(color, e){
            let id;
            if(this.$route.name=="Sub category"){
                id = this.$route.params.id
            }
            $(e.target).addClass("border-2")
            const existedItem = this.colors_filterd.find(colorItem =>{
                return colorItem == color
            })
            if(!existedItem)
                this.colors_filterd.push(color)
            if(!e.target.checked && existedItem){
                $(e.target).removeClass("border-2")
                this.colors_filterd.splice(this.colors_filterd.indexOf(existedItem),1)
            }
            this.$store.dispatch("FilterProducts",{
                min_price:this.price[0],
                max_price:this.price[1], 
                sizes: this.sizes_filterd.join(","), 
                colors: this.colors_filterd.join(","), 
                sub_category_id: id
            })
        }
    },
    mounted(){
        this.FetchSizes();
        this.FetchColors();
    }
}
</script>
<style lang="">
    
</style>