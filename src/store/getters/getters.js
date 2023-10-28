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
      const couponDiscount = parseFloat(getters.couponDiscount);
  
      const shippingFee = state.cart.cart_items.reduce((acc, item) => {
        return acc + parseFloat(item.shipping_fee);
      }, 0);
  
      const totalAmount = subtotal - totalDiscount - couponDiscount + shippingFee;
      return totalAmount.toFixed(2);
    },
    subtotal: (state) => {
      return state.cart.cart_items.reduce((acc, item) => {
        const price = item.attribute && item.attribute.price ? parseFloat(item.attribute.price) : parseFloat(item.price);
        return acc + (price * parseInt(item.quantity));
      }, 0).toFixed(2);
    },
    totalDiscount: (state) => {
      return state.cart.cart_items.reduce((acc, item) => {
        return acc + (parseFloat(item.discount) * parseInt(item.quantity));
      }, 0).toFixed(2);
    },
    couponDiscount: (state, getters) => {
      const couponDiscountPercentage = 10;
      return (getters.subtotal * (couponDiscountPercentage / 100)).toFixed(2);
    }
}

export default getters