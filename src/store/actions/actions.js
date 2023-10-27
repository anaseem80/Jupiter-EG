import axios from 'axios'
var api = "http://127.0.0.1:8000/api/"
import { router } from "@/router";
import VueRouter from "vue-router";
import VueCookies from 'vue-cookies'

function fadeLoader(){
    $(".ec-overlay").each(function(){
        $(this).fadeOut()
    })
}

const actions = {

    UserLogin({commit, state, dispatch}, {User , toast}){
        commit("LOADING_API",{name: 'UserLogin', status: true})
        axios.post(state.api_route + "login?lang=en", User)
        .then((response) => {
        commit("USER_LOGIN",User)
        if(response.data.token){
            toast.success("تم التسجيل بنجاح")
            commit("LOADING_API",{name: 'UserLogin', status: true})
            commit("SET_AUTHENTICATED", {bool: true, token: response.data.token});
            VueCookies.set('UserIDToken', response.data.user.id, '1d');
            VueCookies.set('UserToken', response.data.token, '1d');
            VueCookies.set('UserRouteRV', 'register', '1d');
            VueCookies.set('UserData', response.data.user, '1d');
            dispatch("GetCartData")
            setTimeout(() => {
                commit("LOADING_API",{name: 'UserLogin', status: false})
                router.push("/");
            }, 1000);
        }
        })
        .catch((error) => {
            if(error.response.data.message === "Email not verified."){
                console.log(User.email)
                VueCookies.set('emailOTP', User.email, '1d');
                toast.error("لم يتم تفعيل الإيميل سيتم توجهيك خلال 3 ثوان")
                setTimeout(() => {
                    router.push("/verification"); 
                }, 3000);
            }else{
                toast.error(error.response.data.message)
            }
            commit("LOADING_API",{name: 'UserLogin', status: false})
        })
    },

    UserRegister({commit, state}, {User , toast}){
        commit("LOADING_API",{name: 'UserRegister', status: true})
        axios.post(state.api_route + "register?lang=en", User)
        .then((response) => {
        commit("SUBMIT_OTP",User)
        if(response.data.status_code == 200){
            toast.success("تم التسجيل بنجاح")
            VueCookies.set('emailOTP', User.email, '1d');
            commit("LOADING_API",{name: 'UserRegister', status: true})
            setTimeout(() => {
                commit("LOADING_API",{name: 'UserRegister', status: false})
                router.push("/verification");
            }, 1000);
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'UserRegister', status: false})
        })
    },

    SubmitOTP({commit, state}, {OTP, toast}){
        commit("LOADING_API",{name: 'SubmitOTP', status: true})
        console.log(OTP)
        axios.post(state.api_route + "verify-email?lang=en", {
            otp:OTP,
            email:VueCookies.get("emailOTP"),
            route: VueCookies.get("UserRouteRV")
        })
        .then((response) => {
        commit("USER_LOGIN",OTP)
        if(response.data.status_code == 200){
            commit("LOADING_API",{name: 'SubmitOTP', status: true})
            setTimeout(() => {
                commit("LOADING_API",{name: 'SubmitOTP', status: false})
                console.log(response.data)
                if(response.data.token){
                    VueCookies.remove("emailOTP")
                    toast.success("الكود صحيح سيتم توجهيك لصفحة تغير كلمة المرور")
                    VueCookies.set('tokenOTP', response.data.token, '1d');
                    router.push("/reset_password");
                }else{
                    toast.success("تم التفعيل بنحاح")
                    router.push("/login");
                }
            }, 1000);
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'SubmitOTP', status: false})
        })
    },

    ResendOTP({commit, state}, {email, toast}){
        commit("LOADING_API",{name: 'RESEND_OTP', status: true})
        axios.post(state.api_route + "verification-notification?lang=en", {
            email:VueCookies.get("emailOTP"),
        })
        .then((response) => {
        commit("USER_LOGIN",email)
        if(response.data.status_code == 200){
            toast.success("تم إرسال الرمز بنجاح")
            commit("LOADING_API",{name: 'RESEND_OTP', status: true})
            setTimeout(() => {
                commit("LOADING_API",{name: 'RESEND_OTP', status: false})
            }, 60000);
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'RESEND_OTP', status: false})
        })
    },

    ForgetPassword({commit, state}, {User, toast}){
        console.log(User)
        commit("LOADING_API",{name: 'ForgetPassword', status: true})
        axios.post(state.api_route + "forgot-password?lang=en", User)
        .then((response) => {
        commit("USER_LOGIN",User)
        if(response.data.status_code == 200){
            toast.success("تم إرسال الرمز بنجاح")
            commit("LOADING_API",{name: 'ForgetPassword', status: true})
            VueCookies.set('emailOTP', User.email, '1d');
            VueCookies.set('UserRouteRV', 'reset_password', '1d');
            setTimeout(() => {
                router.push("/verification");
                commit("LOADING_API",{name: 'ForgetPassword', status: false})
            }, 1000);
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'ForgetPassword', status: false})
        })
    },

    ResetPassword({commit, state}, {User, token, toast}){
        console.log(token)
        commit("LOADING_API",{name: 'ResetPassword', status: true})
        axios.post(state.api_route + "reset-password?lang=en", User, {
            headers:{
                Authorization: 'Bearer ' + token 
            }
        })
        .then((response) => {
        commit("USER_LOGIN",User)
        if(response.data.status_code == 200){
            toast.success(response.data.message)
            commit("LOADING_API",{name: 'ResetPassword', status: true})
            VueCookies.remove('tokenOTP')
            setTimeout(() => {
                router.push("/")
                commit("LOADING_API",{name: 'ResetPassword', status: false})
            }, 1000);
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'ResetPassword', status: false})
        })
    },

    Logout({commit, state}, {token, toast}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'Logout', status: true})
        axios.post(state.api_route + "logout?lang=en", null,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
        commit("LOGOUT",token)
        if(response.data.status_code == 200){
            toast.success(response.data.message)
            commit("LOADING_API",{name: 'Logout', status: true})
            VueCookies.remove('UserIDToken')
            VueCookies.remove('UserToken')
            VueCookies.remove('UserData')
            commit("CART_DATA",null)
            commit("SET_AUTHENTICATED", {bool: false, token: null});
            setTimeout(() => {
                commit("LOADING_API",{name: 'Logout', status: false})
                router.push("/login");
            }, 1000);
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'Logout', status: false})
        })
    },


    Add_Product_To_Cart({commit, state}, {product, quantity, attributeId, token, toast}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'Add_Product_To_Cart'+product.id, status: true})
        axios.post(state.api_route + `cart/add?lang=en&quantity=${quantity}&product_id=${product.id}${attributeId != null ? `&attribute_id=${attributeId}` : ''}`, null,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
        commit("ADDED_PRODUCT_CART",{product:product,quantity: quantity})
        if(response.data.status_code == 200){
            toast.success(response.data.message)
            $(".ec-side-toggle")[2].click()
            commit("LOADING_API",{name: 'Add_Product_To_Cart'+product.id, status: false})
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'Add_Product_To_Cart'+product.id, status: false})
        })
    },


    AddReview({commit, state}, {data, toast}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'AddReview', status: true})
        axios.post(state.api_route + `create-review?lang=en`, data,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
        if(response.data.status_code == 200){
            toast.success(response.data.message)
            state.product.product.reviews.push(data)
            commit("LOADING_API",{name: 'AddReview', status: false})
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'AddReview', status: false})
        })
    },

    Remove_Product_From_Cart({commit, state}, {product, toast}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'Remove_Product_From_Cart'+product.id, status: true})
        axios.delete(state.api_route + `cart/remove?lang=en&cart_id=${product.id}`,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
        commit("REMOVED_PRODUCT_CART",{product:product})
        if(response.data.status_code == 200){
            toast.success(response.data.message)
            commit("LOADING_API",{name: 'Remove_Product_From_Cart'+product.id, status: false})
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'Remove_Product_From_Cart'+product.id, status: false})
        })
    },

    Clear_Cart({commit, state}, {toast}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'Clear_Cart', status: true})
        axios.delete(state.api_route + `cart/clear?lang=en`,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
            if(response.status == 200){
                toast.success(response.data.message)
                commit("LOADING_API",{name: 'Clear_Cart', status: false})
            }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'Clear_Cart', status: false})
        })
    },
    
    Product_Increase_Decrease_From_Cart({commit, state}, {id, toast, type}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        var sign = type == '+' ? 'increase' : 'reduce'
        commit("LOADING_API",{name: 'Product_Increase_Decrease_From_Cart'+id, status: true})
        axios.post(state.api_route + `cart/${sign}?lang=en&cart_id=${id}`,null,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
        if(response.data.status_code == 200){
            toast.success(response.data.message)
            commit("LOADING_API",{name: 'Product_Increase_Decrease_From_Cart'+id, status: false})
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'Product_Increase_Decrease_From_Cart'+id, status: false})
        })
    },

    GetBanners({commit, state}){
        axios.get(state.api_route + "banners?lang=en")
        .then(response=>{
            if(response.data.status_code == 200){
                commit("GET_BANNERS",response.data.banners)
            }
        })
        .catch(error=>{
          console.log(error)
        })
    },

    GetSubCategoryProducts({commit, state},{id, page}){
        commit("LOADING_API",{name: 'GetSubCategoryProducts', status: true})
        axios.get(state.api_route + `subcategories/${id}/products?lang=en&${page}`)
        .then(response=>{
            if(response.data.status_code == 200){
                commit("LOADING_API",{name: 'GetSubCategoryProducts', status: false})
                commit("SUB_CATEGORY_PRODUCTS_DATA",response.data.data)
                fadeLoader()
            }
        })
        .catch(error=>{
          console.log(error)
          commit("LOADING_API",{name: 'GetSubCategoryProducts', status: false})
          fadeLoader()
        })
    },
      
    GetCartData({commit, state}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        axios.get(state.api_route + "cart/items?lang=en", {
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then(response=>{
            if(response.data.status_code == 200){
                commit("CART_DATA",response.data)
            }
        })
        .catch(error=>{
          console.log(error)
        })
    },

    GetProductData({commit, state}, {id}){
        commit("LOADING_API",{name: 'GetProductData'+id, status: true})
        axios.get(state.api_route + `product/${id}?lang=en`)
        .then(response=>{
            if(response.data.status_code == 200){
                commit("PRODUCT_DATA",response.data)
                console.log(response.data)
                commit("LOADING_API",{name: 'GetProductData'+id, status: false})
            }
        })
        .catch(error=>{
          console.log(error)
          commit("LOADING_API",{name: 'GetProductData'+id, status: false})
        })
    },

    GetHomeProducts({commit, state}){
        commit("LOADING_API",{name: 'GetHomeProducts', status: true})
        axios.get(state.api_route + "products?lang=en")
        .then(response=>{
            if(response.data.status_code == 200){
                commit("GET_HOME_PRODUCTS",response.data.data.HomeData)
                commit("LOADING_API",{name: 'GetHomeProducts', status: false})
                fadeLoader()
            }
        })
        .catch(error=>{
          console.log(error)
          commit("LOADING_API",{name: 'GetHomeProducts', status: false})
          fadeLoader()
        })
      },
}

export default actions