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
    PRODUCT_DATA(state, product){
      state.product = product
    },
    CURRENT_PRODUCTS_CATEGORY_PRODUCTS_DATA(state, ProductsCategoryProducts){
      state.ProductsCategoryProducts = ProductsCategoryProducts
    },
    RESET_PASSWORD(state, password){
      state.ResetPassword = password
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
}

export default mutations