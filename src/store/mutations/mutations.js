const mutations = {
    // Auth Start
    USER_LOGIN(state, User){
      state.LoginData = User
    },
    USER_REGISTER(state, User){
      state.RegisterData = User
    },
    SUBMIT_OTP(state, otp){
      state.SubmitOTP = otp
    },
    RESEND_OTP(state, otp){
      state.ResendOTP = otp
    },
    USER_DATA(state, userData){
      state.userData = userData
    },
    GET_SITE_SETTINGS(state, settings){
      state.settings = settings
    },
    GET_USER_ADDRESSESS(state, addresses){
      state.addresses = addresses
    },
    APPLY_COUPON(state, couponDetails) {
      state.couponDetails = couponDetails
    },
    GET_USER_ORDERS(state, orders){
      state.orders = orders
    },
    GET_USER_ORDER(state, order){
      state.order = order
    },
    GET_COUNTRIES(state, countries){
      state.countries = countries
    },
    POPULAR_KEYWEODS_DATA(state, keywords){
      state.keywords = keywords
    },
    RECENT_SEARCH(state, recent_keywords){
      var existsItem = state.recent_keywords.find(keyword => keyword == recent_keywords)
      if(existsItem){
        return
      }else{
        state.recent_keywords.push(recent_keywords)
      }
    },
    EMPTY_RECENT_SEARCH(state){
      state.recent_keywords = []
    },
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    FORGET_PASSWORD(state, password){
      state.ForgetPassword = password
    },
    WHEEL_POINTS(state, wheelpoints){
      state.wheelpoints = wheelpoints
    },
    ADDED_PRODUCT_CART(state, AddedProductToCart){
      state.AddedProductToCart = AddedProductToCart
    },
    REMOVED_PRODUCT_CART(state, RemovedProduct){
      state.RemovedProduct = RemovedProduct
    },
    CART_DATA(state, cart){
      state.cart = cart
    },
    CURRENCIES(state, currencies){
      state.currencies = currencies
    },
    CHANGE_CURRENY(state, currency){
      state.currency = currency
    },
    CHANGE_LANG(state, lang){
      state.lang = lang
    },
    WISHLIST_DATA(state, wishlist){
      state.wishlist = wishlist
    },
    PRODUCT_DATA(state, product){
      state.product = product
    },
    APPLY_TAX(state, tax){
      state.tax = tax
    },
    GET_SIDE_PAGES_DATA(state, sidePageData){
      state.sidePageData = sidePageData
    },
    RESET_LOADING_STATE(state) {
        Object.keys(state.Loading).forEach(key => {
            state.Loading[key] = false;
        });
    },
    CURRENT_PRODUCTS_CATEGORY_PRODUCTS_DATA(state, ProductsCategoryProducts){
      state.ProductsCategoryProducts = ProductsCategoryProducts
    },
    RESET_PASSWORD(state, password){
      state.ResetPassword = password
    },
    COUPON_FLAG(state, coupon_flag){
      state.coupon_flag = coupon_flag
    },
    COUPON_FLAG_2(state){
      state.coupon_flag_2 = !state.coupon_flag_2
    },
    LOGOUT(state, token){
      state.Logout = token
    },
    LOADING_API(state, {name, status}){
      state.Loading[name] = status;
    },
    // Auth end
    GET_BANNERS(state, banners){
      state.banners = banners;
    },
    GET_HOME_PRODUCTS(state, home_products){
      state.home_products = home_products;
    },
    GET_COLORS(state, colors){
      state.colors = colors;
    },
    GET_SIZES(state, sizes){
      state.sizes = sizes;
    },
}

export default mutations