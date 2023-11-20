import i18n from "@/localization/i18n.js"
export const state = {
    api_route: 'https://jupiter-eg.com/admin-panel/public/api/',
    route: 'https://jupiter-eg.com/admin-panel/',
    SubmitOTP: null,
    AddedProductToCart: {},
    selectedAttribute: {},
    userData:null,
    addresses:[],
    countries:null,
    orders:null,
    order:null,
    tax:null,
    settings:null,
    RemovedProduct: null,
    couponDetails:null,
    coupon_flag:true,
    coupon_flag_2:false,
    ProductsCategoryProducts: null,
    cart:null,
    keywords:null,
    recent_keywords: [],
    product:null,
    wheelpoints:null,
    sidePageData:null,
    lang:i18n.global.locale,
    color:null,
    size:null,
    ResendOTP: null,
    ForgetPassword: null,
    Logout: null,
    banners: [],
    wishlist:[],
    home_products: [],
    isAuthenticated: {},
    ResetPassword: null,
    Loading: {},
    colors:null,
    sizes:null,
}

export default state