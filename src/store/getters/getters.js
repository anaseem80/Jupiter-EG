import i18n from "@/localization/i18n.js"
const getters = {
    filterAttribute: (state) => (color, title, id, attrID) => {
        const localState = { ...state };

        const filteredColors = color.colors.filter(colorf => colorf.attribute_id == attrID.attribute_id);
        const obj = {
          size_name_en: color.size_name_en,
          colors: filteredColors
        };
        
        localState.selectedAttribute[title + id] = obj;
    
        return obj;
    },
    totalAmount: (state, getters) => {
      const subtotal = parseFloat(getters.subtotal);
      const totalDiscount = parseFloat(getters.totalDiscount);
      const countryTax = parseFloat(getters.countryTax);
      const shippingFee = parseFloat(getters.shippingFee);
      if(state.cart != null){
        const totalAmount = subtotal - totalDiscount + shippingFee + countryTax;
        return totalAmount.toFixed(2);
      }else{
        return
      }
    },
    subtotal: (state) => {
      if(state.cart != null){
        return state.cart.cart_items.reduce((acc, item) => {
          const price = item.attribute && item.attribute.price ? parseFloat(item.attribute.price) : parseFloat(item.price);
          return acc + (price * parseInt(item.quantity));
        }, 0).toFixed(2);
      }else{
        return
      }
    },
    countryTax: (state) => {
      return state.tax ? parseFloat(state.tax.country_tax) : 0;
    },
    shippingFee: (state) => {
      if(state.cart != null){
        return state.tax != null ? parseFloat(state.tax.total_shipping_fee).toFixed(2) : state.cart.cart_prices['total_shipping_fee'].toFixed(2);
      }else{
        return
      }
    },
    totalDiscount: (state, getters) => {
      const couponDiscount = parseFloat(getters.couponDiscount);
      console.log()
      if(state.cart != null){
          return (state.cart.cart_prices['total_discount'] + couponDiscount).toFixed(2);
      }else{
        return
      }
    },
    couponDiscount: (state, getters) => {
      return state.couponDetails ? parseFloat(state.couponDetails.discount_amount) : 0;
    },
    CurrentLang: (state, getters) => {
      return i18n.global.locale;
    }
}

export default getters