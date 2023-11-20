<template lang="">
    <img v-if="!isProductInWishlist(product)" src="@/assets/images/icons/wishlist.svg" class="svg_img pro_svg" alt="" />
    <img v-if="isProductInWishlist(product)" src="@/assets/images/icons/heart-431.svg" class="svg_img pro_svg" alt="" />
</template>
<script>
export default {
    props:['product'],
    methods:{
        isProductInWishlist(product) {
            const productId = product.id;

            return this.$store.state.wishlist.find(item => item.id === productId);
        },
    }
}
</script>
<style lang="">
    
</style>