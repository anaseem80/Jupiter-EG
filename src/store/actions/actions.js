import axios from 'axios'
var api = "http://127.0.0.1:8000/api/"
import { router } from "@/router";
import VueRouter from "vue-router";
import VueCookies from 'vue-cookies'
const actions = {

    UserLogin({commit, state}, {User , toast}){
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
        var actualToken;
        if(state.isAuthenticated.token != null){
            actualToken = state.isAuthenticated.token
        }else{
            actualToken = token
        }
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
            commit("SET_AUTHENTICATED", {bool: false, token: null});
            setTimeout(() => {
                commit("LOADING_API",{name: 'Logout', status: false})
                router.push("/login");
                console.log(VueCookies.get("UserToken"))
            }, 1000);
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'Logout', status: false})
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
      
    GetHomeProducts({commit, state}){
        axios.get(state.api_route + "products?lang=en")
        .then(response=>{
            if(response.data.status_code == 200){
                commit("GET_HOME_PRODUCTS",response.data.HomeData)
            }
        })
        .catch(error=>{
          console.log(error)
        })
      },
}

export default actions