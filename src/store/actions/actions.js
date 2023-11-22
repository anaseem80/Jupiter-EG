import axios from 'axios'
var api = "http://127.0.0.1:8000/api/"
import { router } from "@/router";
import VueRouter from "vue-router";
import VueCookies from 'vue-cookies'
import { notification } from "ant-design-vue";
import getters from '../getters/getters'

function fadeLoader(){
    $(".ec-overlay").each(function(){
        $(this).fadeOut()
    })
}

const actions = {

    UserLogin({commit, state, dispatch}, {User , toast}){
        commit("LOADING_API",{name: 'UserLogin', status: true})
        axios.post(state.api_route + "login", User)
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
        axios.post(state.api_route + "register", User)
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
        axios.post(state.api_route + "verify-email", {
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

    UpdateUserInfo({commit, state}, data){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'UpdateUserInfo', status: true})
        axios.post(state.api_route + "updateUserInfo",data,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
        if(response.data.status_code == 200){
            commit("LOADING_API",{name: 'UpdateUserInfo', status: false})
            if(response.data.status_code == 200){
                commit("SET_AUTHENTICATED", {bool: state.isAuthenticated.bool, token: state.isAuthenticated.token, user: response.data.data});
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

    UpdateUserPassword({commit, state}, data){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'UpdateUserPassword', status: true})
        axios.post(state.api_route + "changePassword",data,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
        if(response.data.status_code == 200){
            commit("LOADING_API",{name: 'UpdateUserPassword', status: false})
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
        }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
            commit("LOADING_API",{name: 'UpdateUserPassword', status: false})
        })
    },


    ResendOTP({commit, state}, {email, toast}){
        axios.post(state.api_route + "verification-notification", {
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
        commit("LOADING_API",{name: 'ForgetPassword', status: true})
        axios.post(state.api_route + "forgot-password", User)
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
        commit("LOADING_API",{name: 'ResetPassword', status: true})
        axios.post(state.api_route + "reset-password", User, {
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
        VueCookies.remove('UserIDToken')
        VueCookies.remove('UserToken')
        VueCookies.remove('UserData')
        commit("CART_DATA",null)
        commit("SET_AUTHENTICATED", {bool: false, token: null, user: null});
        commit("USER_DATA", null)
        commit("WHEEL_POINTS",null)
        axios.post(state.api_route + "logout", null,{
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
            if(error.response.data.message == 'You must log in first'){
                notification['success']({
                    message: "Success",
                    description: 'تم تسجيل الخروج بنجاح',
                });
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
            }else{
                notification['info']({
                    message: "Error",
                    description: error.response.data.message,
                });
            }
            commit("LOADING_API",{name: 'Logout', status: false})
        })
    },


    Add_Product_To_Cart({commit, state, getters}, {product, quantity, attribute, token, toast}){
        const locale = getters.CurrentLang;
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'Add_Product_To_Cart'+product.id, status: true})
        axios.post(state.api_route + `cart/add?currency=${state.currency}&lang=${locale}&quantity=${quantity}&product_id=${product.id}${attribute != null ? `&attribute_id=${attribute}` : ''}`, null,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
            if(response.data.status_code === 200){
                const existingItem = state.cart.cart_items.find(item => 
                    item.product_id == response.data.product.product_id.toString() && 
                    item.attribute_id == (attribute != null ? attribute : null)
                );
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
                    description: response.data.message + " 🥳",
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

    Add_Product_To_Wishlist({commit, state, getters}, product){
        const locale = getters.CurrentLang;
        const existingItem = state.wishlist.find(item => 
            item.id == product.id
        );
        if (!existingItem) {
            state.wishlist.push(product);
        }
        commit("WISHLIST_DATA",state.wishlist)
        notification['success']({
            message: "Success",
            description: locale == "en" ? "Product added successfully to wishlist 🥳" : "🥳 تمت إضافة المنتج بنجاح إلي المفضلة",
        });
    },

    Remove_Product_From_Wishlist({commit, state, getters}, product){
        commit("LOADING_API",{name: 'Remove_Product_From_Wishlist'+product.id, status: true})
        const locale = getters.CurrentLang;
        const existingItem = state.wishlist.findIndex(item => item.id === product.id);
        if (existingItem > -1) {
          state.wishlist.splice(existingItem, 1);
        }
        commit("WISHLIST_DATA", state.wishlist);
        commit("LOADING_API",{name: 'Remove_Product_From_Wishlist'+product.id, status: false})
        notification['success']({
            message: "Success",
            description: locale == "en" ? "Product has removed successfully to wishlist 🥳" : "🥳 تم حذف المنتج بنجاح من المفضلة",
        });
    },


    AddReview({commit, state}, {data, toast}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'AddReview', status: true})
        axios.post(state.api_route + `create-review`, data,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
        if(response.data.status_code == 200){
            notification['success']({
                message: "Success",
                description: response.data.message + " 🥳",
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

    ContactUS({commit, state}, data){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'ContactUS', status: true})
        axios.post(state.api_route + `contact`, data)
        .then((response) => {
        if(response.data.status_code == 200){
            notification['success']({
                message: "Success",
                description: response.data.message + " 🥳",
            });
            commit("LOADING_API",{name: 'ContactUS', status: false})
        }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
            commit("LOADING_API",{name: 'ContactUS', status: false})
        })
    },

    ApplyCoupon({commit, state}, coupon){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'ApplyCoupon', status: true})
        axios.post(state.api_route + `cart/applycoupon?currency=${state.currency}&coupon_code=${coupon}`,null,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            },
        })
        .then((response) => {
        if(response.data.status_code == 200){
            notification['success']({
                message: "Success",
                description: `Great work! you saved ${response.data.coupon['discount_amount']}EGP 😍🥳`,
            });
            commit('APPLY_COUPON', response.data.coupon);
            commit('COUPON_FLAG', false);
            commit('COUPON_FLAG_2', true);
            commit("LOADING_API",{name: 'ApplyCoupon', status: false})
        }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
            commit("LOADING_API",{name: 'ApplyCoupon', status: false})
        })
    },

    ApplyTax({commit, state}, {coupon, address_id}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'ApplyTax', status: true})
        axios.get(state.api_route + `cart/checkout?${coupon != null ? `coupon_code=${coupon}&` : ''}user_address_id=${address_id}&currency=${state.currency}`,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            },
        })
        .then((response) => {
        if(response.data.status_code == 200){
            notification['success']({
                message: "Success",
                description: response.data.message,
            });
            commit('APPLY_TAX', response.data.check_out);
            commit("LOADING_API",{name: 'ApplyTax', status: false})
        }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
            commit("LOADING_API",{name: 'ApplyTax', status: false})
        })
    },

    OrderCreate({commit, state}, {coupon, user_address_id, description, payment_method}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'OrderCreate', status: true})
        if(payment_method=='paymob'){
            window.location.replace(state.api_route + `orders/create?${coupon != null ? `coupon_code=${coupon}&` : ''}${description != "" ? `description=${description}&` : ''}user_address_id=${user_address_id}&payment_method=${payment_method}&token=${actualToken}&currency=${state.currency}`)
        }
        axios.get(state.api_route + `orders/create?${coupon != null ? `coupon_code=${coupon}&` : ''}${description != "" ? `description=${description}&` : ''}user_address_id=${user_address_id}&payment_method=${payment_method}&token=${actualToken}`,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            },
        })
        .then((response) => {
        if(response.data.order_id){
            notification['success']({
                message: "Success",
                description: response.data.message,
            });
            state.cart.cart_items = []
            router.push("/order-success")
            commit("LOADING_API",{name: 'OrderCreate', status: false})
        }
        })
        .catch((error) => {
            notification['info']({
                message: "Error",
                description: error.response.data.message,
            });
            commit("LOADING_API",{name: 'OrderCreate', status: false})
        })
    },

    Remove_Product_From_Cart({commit, state}, {product, toast}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'Remove_Product_From_Cart'+product.id, status: true})
        axios.delete(state.api_route + `cart/remove?cart_id=${product.id}`,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then((response) => {
        commit("REMOVED_PRODUCT_CART",{product:product})
        if(response.data.status_code == 200){
            const productIndex = state.cart.cart_items.findIndex(item => item.id === product.id);

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
        axios.delete(state.api_route + `cart/clear`,{
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
    
        axios.post(state.api_route + `cart/currency=${state.currency}&${sign}?cart_id=${id}`, null, {
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
        axios.get(state.api_route + "banners")
        .then(response=>{
            if(response.data.status_code == 200){
                commit("GET_BANNERS",response.data.banners)
            }
        })
        .catch(error=>{})
    },

    GetProductsByCurrentCategory({commit, state, getters},{page, route, keyword}){
        const locale = getters.CurrentLang;
        commit("LOADING_API",{name: 'GetProductsByCurrentCategory', status: true})
        const method = keyword != undefined ? 'post' : 'get'
        axios[method](state.api_route + `${route}?currency=${state.currency}&lang=${locale}&${page}${keyword != undefined ? `&keyword=${keyword}` : ''}`)
        .then(response=>{
            if(response.data.status_code == 200){
                commit("LOADING_API",{name: 'GetProductsByCurrentCategory', status: false})
                commit("CURRENT_PRODUCTS_CATEGORY_PRODUCTS_DATA",response.data.data)
                fadeLoader()
            }
        })
        .catch(error=>{
          commit("LOADING_API",{name: 'GetProductsByCurrentCategory', status: false})
          fadeLoader()
        })
    },

    
    GetSidePageData({commit, state, getters},route){
        const locale = getters.CurrentLang;
        commit("LOADING_API",{name: 'GetSidePageData', status: true})
        axios.get(state.api_route + `${route}?lang=${locale}`)
        .then(response=>{
            if(response.data.status_code == 200){
                commit("LOADING_API",{name: 'GetSidePageData', status: false})
                commit("GET_SIDE_PAGES_DATA",response.data.data)
                fadeLoader()
            }
        })
        .catch(error=>{
          commit("LOADING_API",{name: 'GetSidePageData', status: false})
          fadeLoader()
        })
    },

    
    GetUserAddresses({commit, state}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'UserData', status: true})
        axios.get(state.api_route + `user-addresses`,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then(response=>{
            if(response.data.status_code == 200){
                commit("LOADING_API",{name: 'UserData', status: false})
                commit("GET_USER_ADDRESSESS",response.data.userAddresses)
            }
        })
        .catch(error=>{
          commit("LOADING_API",{name: 'UserData', status: false})
        })
    },
    
    GetUserOrders({commit, state}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'UserData', status: true})
        axios.get(state.api_route + `orders`,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then(response=>{
            if(response.data.status_code == 200){
                commit("LOADING_API",{name: 'UserData', status: false})
                commit("GET_USER_ORDERS",response.data.orders)
            }
        })
        .catch(error=>{
          commit("LOADING_API",{name: 'UserData', status: false})
        })
    },

    GetUserOrder({commit, state}, id){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'GetUserOrder', status: true})
        axios.get(state.api_route + `orders/detalis/${id}`,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then(response=>{
            if(response.data.status_code == 200){
                commit("LOADING_API",{name: 'GetUserOrder', status: false})
                commit("GET_USER_ORDER",response.data.order)
            }
        })
        .catch(error=>{
          commit("LOADING_API",{name: 'GetUserOrder', status: false})
        })
    },

    AddAddress({commit, state}, {Address, mode}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        const method = mode == 'add' ? 'post' : 'put'
        const endpoint = mode == 'add' ? 'store' : 'update'
        commit("LOADING_API",{name: 'AddAddress', status: true})
        axios[method](state.api_route + `user-addresses/${endpoint}`,Address,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then(response=>{
            if(response.data.status_code == 200){
                commit("LOADING_API",{name: 'AddAddress', status: false})
                $(".dismiss-add-address")[0].click()
                notification['success']({
                    message: "Success",
                    description: response.data.message,
                });
                var index = state.addresses.findIndex(item => item.id == response.data.userAddress.id);
                if (index !== -1) {
                    state.addresses[index] = response.data.userAddress;
                } else {
                    state.addresses.push(response.data.userAddress);
                }            
            }
        })
        .catch(error=>{
          commit("LOADING_API",{name: 'AddAddress', status: false})
            notification['success']({
                message: "Success",
                description: error.response.data.message,
            });
        })
    },
    
    DeleteAddress({commit, state}, address){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        commit("LOADING_API",{name: 'DeleteAddress'+address.id, status: true})
        axios.delete(state.api_route + `user-addresses/destroy/`+address.id,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            }
        })
        .then(response=>{
            if(response.data.status_code == 200){
                notification['success']({
                    message: "Success",
                    description: response.data.message,
                });
                commit("LOADING_API",{name: 'DeleteAddress'+address.id, status: false})
                var existingAddress = state.addresses.find(item=> item.id == address.id)
                state.addresses.splice(existingAddress, 1)
            }
        })
        .catch(error=>{
            commit("LOADING_API",{name: 'DeleteAddress'+address.id, status: false})
            notification['success']({
                message: "Success",
                description: error.response.data.message,
            });
        })
    },
    
    
    
    GetCartData({commit, state, getters}){
        const locale = getters.CurrentLang;
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        axios.get(state.api_route + `cart/items?currency=${state.currency}&lang=${locale}`, {
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
        })
    },

    FilterProducts({commit, state, getters}, {min_price, max_price, sizes, colors, sub_category_id}){
        commit("LOADING_API",{name: 'GetProductsByCurrentCategory', status: true})
        const locale = getters.CurrentLang;
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        axios.get(state.api_route + `products/flitter?currency=${state.currency}&lang=${locale}&min_price=${min_price}&max_price=${max_price}&sizes=${sizes}&colors=${colors}&sort_type=1${sub_category_id != undefined ? `&sub_category_id=${sub_category_id}` : ''}`)
        .then(response=>{
            if(response.data.status_code == 200){
                commit("CURRENT_PRODUCTS_CATEGORY_PRODUCTS_DATA",response.data.data)
                commit("LOADING_API",{name: 'GetProductsByCurrentCategory', status: false})
            }
        })
        .catch(error=>{
          commit("LOADING_API",{name: 'GetProductsByCurrentCategory', status: false})
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
        })
    },

    GetCountries({commit, state}){
        axios.get(state.api_route + "countries")
        .then(response=>{
            if(response.data.status_code == 200){
                commit("GET_COUNTRIES",response.data.countries)
            }
        })
        .catch(error=>{
        })
    },

    GetColors({commit, state}){
        axios.get(state.api_route + "colors")
        .then(response=>{
            if(response.data.status_code == 200){
                commit("GET_COLORS",response.data.data.colors)
            }
        })
        .catch(error=>{
        })
    },

    GetSizes({commit, state}){
        axios.get(state.api_route + "sizes")
        .then(response=>{
            if(response.data.status_code == 200){
                commit("GET_SIZES",response.data.data.sizes)
            }
        })
        .catch(error=>{
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
    //            
    //         }
    //     })
    //     .catch(error=>{
    //       
    //     })
    // },

    GetWheelPoints({commit, state}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        axios.get(state.api_route + "wheels-points", {
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
      
        })
    },

    WheelUpdateUserPoint({commit, state, dispatch}, points){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        axios.post(state.api_route + "points-wheel",{
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
            notification['warning']({
                message: "error",
                description: error.response.data.message,
            });
        })
    },

    UserInformation({commit, state}){
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        axios.get(state.api_route + "userInformation",{
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
          if(error && actualToken != null){
            VueCookies.remove('UserIDToken')
            VueCookies.remove('UserToken')
            VueCookies.remove('UserData')
            commit("CART_DATA",null)
            commit("SET_AUTHENTICATED", {bool: false, token: null, user: null});
            commit("USER_DATA", null)
            commit("WHEEL_POINTS",null)
          }
        })
    },

    SortedProducts({commit, state, getters}, sorted){
        const locale = getters.CurrentLang;
        commit("LOADING_API",{name: 'GetProductsByCurrentCategory', status: true})
        var actualToken = state.isAuthenticated.token != null ? state.isAuthenticated.token : VueCookies.get("UserToken");
        axios.get(state.api_route + `sorted-products?currency=${state.currency}&lang=${locale}`,{
            headers:{
                Authorization: 'Bearer ' + actualToken
            },
            params:sorted,
        })
        .then(response=>{
            if(response.data.status_code == 200){
                commit("LOADING_API",{name: 'GetProductsByCurrentCategory', status: false})
                commit("CURRENT_PRODUCTS_CATEGORY_PRODUCTS_DATA",response.data)
            }
        })
        .catch(error=>{
            commit("LOADING_API",{name: 'GetProductsByCurrentCategory', status: false})
        })
    },

    GetProductData({commit, state, getters}, {id}){
        const locale = getters.CurrentLang;
        commit("PRODUCT_DATA",null)
        commit("LOADING_API",{name: 'GetProductData'+id, status: true})
        axios.get(state.api_route + `product/${id}?currency=${state.currency}&lang=${locale}`)
        .then(response=>{
            if(response.data.status_code == 200){
                commit("PRODUCT_DATA",response.data.data)
                commit("LOADING_API",{name: 'GetProductData'+id, status: false})
            }
        })
        .catch(error=>{
          commit("LOADING_API",{name: 'GetProductData'+id, status: false})
        })
    },

    GetCurrencies({commit, state, getters}){
        const locale = getters.CurrentLang;
        axios.get(state.api_route + `currency?lang=${locale}`)
        .then(response=>{
            if(response.data.status_code == 200){
                commit("CURRENCIES",response.data.data.currency)
            }
        })
        .catch(error=>{
        })
    },

    GetHomeProducts({commit, state, getters}){
        const locale = getters.CurrentLang;
        commit("LOADING_API",{name: 'GetHomeProducts', status: true})
        axios.get(state.api_route + `products?currency=${state.currency}&lang=${locale}`)
        .then(response=>{
            if(response.data.status_code == 200){
                commit("GET_HOME_PRODUCTS",response.data.data.HomeData)
                commit("LOADING_API",{name: 'GetHomeProducts', status: false})
                fadeLoader()
            }
        })
        .catch(error=>{
          commit("LOADING_API",{name: 'GetHomeProducts', status: false})
          fadeLoader()
        })
    },

    GetSiteSettings({commit, state, getters}){
        const locale = getters.CurrentLang;
        commit("RESET_LOADING_STATE")
        commit("LOADING_API",{name: 'GetSiteSettings', status: true})
        axios.get(state.api_route + `settings?lang=${locale}`)
        .then(response=>{
            if(response.data.status_code == 200){
                commit("GET_SITE_SETTINGS",response.data.setting)
                commit("LOADING_API",{name: 'GetSiteSettings', status: false})
                commit('APPLY_COUPON', null);
                commit('COUPON_FLAG', true);
                commit('COUPON_FLAG_2', false);
                commit('APPLY_TAX', null);
                fadeLoader()
            }
        })
        .catch(error=>{
          commit("LOADING_API",{name: 'GetSiteSettings', status: false})
          fadeLoader()
        })
    },
}

export default actions