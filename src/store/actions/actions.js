import axios from 'axios'
var api = "http://127.0.0.1:8000/api/"
import { router } from "@/router";
import VueRouter from "vue-router";
import VueCookies from 'vue-cookies'
import { notification } from "ant-design-vue";

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
            notification['success']({
                message: "Success",
                description: 'تم التسجيل بنجاح',
            });
            commit("LOADING_API",{name: 'UserLogin', status: true})
            commit("SET_AUTHENTICATED", {bool: true, token: response.data.token, user: response.data.user});
            VueCookies.set('UserIDToken', response.data.user.id, '1d');
            VueCookies.set('UserToken', response.data.token, '1d');
            VueCookies.set('UserRouteRV', 'register', '1d');
            VueCookies.set('UserData', response.data.user, '1d');
            VueCookies.remove("emailOTP")
            dispatch("UserInformation")
            dispatch("GetCartData")
            dispatch("GetWheelPoints")
            setTimeout(() => {
                commit("LOADING_API",{name: 'UserLogin', status: false})
                router.push("/");
            }, 1000);
        }
        })
        .catch((error) => {
            if(error.response.data.message === "Email not verified."){
                VueCookies.set('emailOTP', User.email, '1d');
                notification['info']({
                    message: "Error",
                    description: 'لم يتم تفعيل الإيميل سيتم توجهيك خلال 3 ثوان',
                });
                setTimeout(() => {
                    router.push("/verification"); 
                }, 3000);
            }else{
                notification['info']({
                    message: "Error",
                    description: error.response.data.message,
                });
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
            notification['success']({
                message: "Success",
                description: 'تم التسجيل بنجاح',
            });
            VueCookies.set('emailOTP', User.email, '1d');
            commit("LOADING_API",{name: 'UserRegister', status: true})
            setTimeout(() => {
                commit("LOADING_API",{name: 'UserRegister', status: false})
                router.push("/verification");
            }, 1000);
        }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
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
                    notification['success']({
                        message: "Success",
                        description: 'الكود صحيح سيتم توجهيك لصفحة تغير كلمة المرور',
                    });
                    VueCookies.set('tokenOTP', response.data.token, '1d');
                    router.push("/reset_password");
                }else{
                    notification['success']({
                        message: "Success",
                        description: 'تم التفعيل بنجاح',
                    });
                    router.push("/login");
                }
            }, 1000);
        }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
            commit("LOADING_API",{name: 'SubmitOTP', status: false})
        })
    },

    UpdateUserInfo({commit, state}, {email, emailBOOL}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'UpdateUserInfo', status: true})
        axios.post(state.api_route + "updateUserInfo?lang=en", {
            email:email,
            name: "ahmed",
        },{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
        if(response.data.status_code == 200){
            setTimeout(() => {
                commit("LOADING_API",{name: 'UpdateUserInfo', status: false})
                console.log(response.data)
                if(response.data.status_code == 200){
                    notification['success']({
                        message: "Success",
                        description: response.data.message,
                    });
                }else{
                    notification['info']({
                        message: "Error",
                        description: response.data.message,
                    });
                }
            }, 1000);
        }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
            commit("LOADING_API",{name: 'UpdateUserInfo', status: false})
        })
    },


    ResendOTP({commit, state}, {email, toast}){
        axios.post(state.api_route + "verification-notification?lang=en", {
            email:VueCookies.get("emailOTP"),
        })
        .then((response) => {
        commit("USER_LOGIN",email)
        if(response.data.status_code == 200){
            notification['success']({
                message: "Success",
                description: 'تم إرسال الرمز بنجاح',
            });
            commit("LOADING_API",{name: 'RESEND_OTP', status: true})
            setTimeout(() => {
                commit("LOADING_API",{name: 'RESEND_OTP', status: false})
            }, 60000);
        }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
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
            notification['success']({
                message: "Success",
                description: 'تم إرسال الرمز بنجاح',
            });
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
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
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
            notification['success']({
                message: "Success",
                description: response.data.message,
            });
            commit("LOADING_API",{name: 'ResetPassword', status: true})
            VueCookies.remove('tokenOTP')
            setTimeout(() => {
                router.push("/")
                commit("LOADING_API",{name: 'ResetPassword', status: false})
            }, 1000);
        }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
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
            notification['success']({
                message: "Success",
                description: 'تم تسجيل الخروج بنجاح',
            });
            commit("LOADING_API",{name: 'Logout', status: true})
            VueCookies.remove('UserIDToken')
            VueCookies.remove('UserToken')
            VueCookies.remove('UserData')
            commit("CART_DATA",null)
            commit("SET_AUTHENTICATED", {bool: false, token: null, user: null});
            commit("USER_DATA", null)
            commit("WHEEL_POINTS",null)
            VueCookies.remove("emailOTP")
            setTimeout(() => {
                commit("LOADING_API",{name: 'Logout', status: false})
                router.push("/login");
            }, 1000);
        }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
            commit("LOADING_API",{name: 'Logout', status: false})
        })
    },


    Add_Product_To_Cart({commit, state}, {product, quantity, attribute, token, toast}){
        console.log(attribute)
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'Add_Product_To_Cart'+product.id, status: true})
        axios.post(state.api_route + `cart/add?lang=en&quantity=${quantity}&product_id=${product.id}${attribute != null ? `&attribute_id=${attribute}` : ''}`, null,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
            if(response.data.status_code === 200){
                console.log(response.data.product)
                console.log(state.cart.cart_items)
                const existingItem = state.cart.cart_items.find(item => 
                    item.product_id == response.data.product.product_id.toString() && 
                    item.attribute_id == (attribute != null ? attribute : null)
                );
                console.log(existingItem)
                if (existingItem) {
                    existingItem.quantity = parseInt(existingItem.quantity) + quantity;
                } else {
                    state.cart.cart_items.push({
                        ...response.data.product, 
                        quantity
                    });
                }
    
                commit("LOADING_API", { name: 'Add_Product_To_Cart' + product.id, status: false })
                notification['success']({
                    message: "Success",
                    description: response.data.message,
                });
                $(".ec-side-toggle")[2].click()
            }
        })
        .catch((error) => {
            if(error){
                notification['info']({
                    message: "Error",
                    description: error.response.data.message,
                });
            }
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
            notification['success']({
                message: "Success",
                description: response.data.message,
            });
            state.product.product.reviews.push(data)
            commit("LOADING_API",{name: 'AddReview', status: false})
        }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
            commit("LOADING_API",{name: 'AddReview', status: false})
        })
    },

    Remove_Product_From_Cart({commit, state}, {product, toast}){
        console.log(product)
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
            const productIndex = state.cart.cart_items.findIndex(item => item.id === product.id);

            console.log(product)
            if (productIndex > -1) {
                state.cart.cart_items.splice(productIndex, 1);
                commit("REMOVED_PRODUCT_CART", { product });
                notification['success']({
                    message: "Success",
                    description: response.data.message,
                });
            } else {
                notification['info']({
                    message: "Error",
                    description: 'Product not found in cart',
                });
            }
            commit("LOADING_API",{name: 'Remove_Product_From_Cart'+product.id, status: false})
        }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
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
                notification['success']({
                    message: "Success",
                    description: response.data.message,
                });
                state.cart.cart_items = []
                commit("LOADING_API",{name: 'Clear_Cart', status: false})
            }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
            commit("LOADING_API",{name: 'Clear_Cart', status: false})
        })
    },
    
    Product_Increase_Decrease_From_Cart({commit, state}, {id, toast, type}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        var sign = type === '+' ? 'increase' : 'reduce'
        commit("LOADING_API",{name: 'Product_Increase_Decrease_From_Cart' + id, status: true})
    
        axios.post(state.api_route + `cart/${sign}?lang=en&cart_id=${id}`, null, {
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
            if(response.data.status_code === 200){
                const productIndex = state.cart.cart_items.findIndex(item => item.id === id);
                if (productIndex > -1) {
                    const currentQuantity = parseInt(state.cart.cart_items[productIndex].quantity, 10);
                    if (!isNaN(currentQuantity)) {
                        if (type === '+') {
                            state.cart.cart_items[productIndex].quantity = currentQuantity + 1;
                        } else if (type === '-' && currentQuantity > 1) {
                            state.cart.cart_items[productIndex].quantity = currentQuantity - 1;
                        } else if (type === '-' && currentQuantity === 1) {
                            // Remove the product from the cart
                            state.cart.cart_items.splice(productIndex, 1);
                            notification['success']({
                                message: "Success",
                                description: 'Product Removed From Cart',
                            });
                        }
                    } else {
                        toast.error("Invalid quantity");
                    }
                } else {
                    toast.error("Product not found in cart");
                }
                
                commit("LOADING_API", {name: 'Product_Increase_Decrease_From_Cart' + id, status: false});
                notification['success']({
                    message: "Success",
                    description: response.data.message,
                });
            }
        })
        .catch((error) => {
            if(error.response && error.response.data){
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
            } else {
                toast.error("An error occurred");
            }
            commit("LOADING_API", {name: 'Product_Increase_Decrease_From_Cart' + id, status: false});
        });
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

    GetProductsByCurrentCategory({commit, state},{page, route, keyword}){
        commit("LOADING_API",{name: 'GetProductsByCurrentCategory', status: true})
        const method = keyword != undefined ? 'post' : 'get'
        axios[method](state.api_route + `${route}?lang=en&${page}${keyword != undefined ? `&keyword=${keyword}` : ''}`)
        .then(response=>{
            if(response.data.status_code == 200){
                commit("LOADING_API",{name: 'GetProductsByCurrentCategory', status: false})
                commit("CURRENT_PRODUCTS_CATEGORY_PRODUCTS_DATA",response.data.data)
                fadeLoader()
            }
        })
        .catch(error=>{
          console.log(error)
          commit("LOADING_API",{name: 'GetProductsByCurrentCategory', status: false})
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


    GetPopularKeywords({commit, state}){
        axios.get(state.api_route + "popular")
        .then(response=>{
            if(response.data.status_code == 200){
                commit("POPULAR_KEYWEODS_DATA",response.data.keywords)
            }
        })
        .catch(error=>{
          console.log(error)
        })
    },

    RecentSearch({commit, state}, keyword){
        commit("RECENT_SEARCH",keyword)
    },

    EmptyRecentSearch({commit, state}){
        commit("EMPTY_RECENT_SEARCH")
        notification['success']({
            message: "Success",
            description: "Empty successfully",
        });
    },


    // AddToPopularKeywords({commit, state}, keyword){
    //     var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
    //     axios.get(state.api_route + `popular/view/${keyword}`)
    //     .then(response=>{
    //         if(response.data.status_code == 200){
    //             console.log(response)
    //         }
    //     })
    //     .catch(error=>{
    //       console.log(error)
    //     })
    // },

    GetWheelPoints({commit, state}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        axios.get(state.api_route + "wheels-points?lang=en", {
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then(response=>{
            if(response.data.status_code == 200){
                commit("WHEEL_POINTS",response.data.data)
            }
        })
        .catch(error=>{
          console.log(error)
        })
    },

    WheelUpdateUserPoint({commit, state, dispatch}, points){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        axios.post(state.api_route + "points-wheel?lang=en",{
            points: points,
            email:state.isAuthenticated.user.email
        }, {
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then(response=>{
            if(response.data.status_code == 200){
                dispatch("UserInformation")
                notification['success']({
                    message: "Success",
                    description: response.data.message,
                });
            }
        })
        .catch(error=>{
          console.log(error)
        })
    },

    UserInformation({commit, state}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        axios.get(state.api_route + "userInformation?lang=en",{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then(response=>{
            if(response.data.name){
                commit("USER_DATA", response.data)
            }
        })
        .catch(error=>{
          console.log(error)
        })
    },

    GetProductData({commit, state}, {id}){
        commit("PRODUCT_DATA",null)
        commit("LOADING_API",{name: 'GetProductData'+id, status: true})
        axios.get(state.api_route + `product/${id}?lang=en`)
        .then(response=>{
            if(response.data.status_code == 200){
                commit("PRODUCT_DATA",response.data)
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

    GetSiteSettings({commit, state}){
        commit("LOADING_API",{name: 'GetSiteSettings', status: true})
        axios.get(state.api_route + "settings?lang=en")
        .then(response=>{
            if(response.data.status_code == 200){
                commit("GET_SITE_SETTINGS",response.data.setting)
                commit("LOADING_API",{name: 'GetSiteSettings', status: false})
                fadeLoader()
            }
        })
        .catch(error=>{
          console.log(error)
          commit("LOADING_API",{name: 'GetSiteSettings', status: false})
          fadeLoader()
        })
    },
}

export default actions