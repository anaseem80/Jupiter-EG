import axios from 'axios'
var api = "http://127.0.0.1:8000/api/"
import { router } from "@/router";
import VueRouter from "vue-router";
import VueCookies from 'vue-cookies'
const actions = {

    UserLogin({commit}, {User , toast}){
        commit("LOADING_API",{name: 'UserLogin', status: true})
        axios.post(api + "login?lang=en", User)
        .then((response) => {
        commit("USER_LOGIN",User)
        if(response.data.token){
            toast.success("تم التسجيل بنجاح")
            commit("LOADING_API",{name: 'UserLogin', status: true})
            commit("SET_AUTHENTICATED", true);
            setTimeout(() => {
                commit("LOADING_API",{name: 'UserLogin', status: false})
                VueCookies.set('UserIDToken', response.data.user.id, '1d');
                VueCookies.set('UserToken', response.data.token, '1d');
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

    UserRegister({commit}, {User , toast}){
        commit("LOADING_API",{name: 'UserRegister', status: true})
        axios.post(api + "register?lang=en", User)
        .then((response) => {
        commit("USER_LOGIN",User)
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

    SubmitOTP({commit}, {OTP, toast}){
        commit("LOADING_API",{name: 'SubmitOTP', status: true})
        console.log(OTP)
        axios.post(api + "verify-email?lang=en", {
            otp:OTP,
            email:VueCookies.get("emailOTP")
        })
        .then((response) => {
        commit("USER_LOGIN",OTP)
        if(response.data.status_code == 200){
            toast.success("تم التفعيل بنحاح")
            commit("LOADING_API",{name: 'SubmitOTP', status: true})
            VueCookies.remove("emailOTP")
            setTimeout(() => {
                commit("LOADING_API",{name: 'SubmitOTP', status: false})
                if(response.data.token){
                    VueCookies.set('tokenOTP', response.data.token, '1d');
                    router.push("reset_password");
                }else{
                    router.push("/");
                }
            }, 1000);
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'SubmitOTP', status: false})
        })
    },

    ResendOTP({commit}, {email, toast}){
        commit("LOADING_API",{name: 'RESEND_OTP', status: true})
        axios.post(api + "verification-notification?lang=en", {
            email:VueCookies.get("emailOTP")
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

    ForgetPassword({commit}, {User, toast}){
        console.log(User)
        commit("LOADING_API",{name: 'ForgetPassword', status: true})
        axios.post(api + "forgot-password?lang=en", User)
        .then((response) => {
        commit("USER_LOGIN",User)
        if(response.data.status_code == 200){
            toast.success("تم إرسال الرمز بنجاح")
            commit("LOADING_API",{name: 'ForgetPassword', status: true})
            VueCookies.set('emailOTP', User.email, '1d');
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

    ResetPassword({commit}, {User, token, toast}){
        console.log(token)
        commit("LOADING_API",{name: 'ResetPassword', status: true})
        axios.post(api + "reset-password?lang=en", User, {
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
                console.log("asd")
                commit("LOADING_API",{name: 'ResetPassword', status: false})
            }, 1000);
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'ResetPassword', status: false})
        })
    },

    Logout({commit}, {token, toast}){
        console.log(token)
        commit("LOADING_API",{name: 'Logout', status: true})
        axios.post(api + "logout?lang=en", null,{
            headers:{
                Authorization: 'Bearer ' + token 
            }
        })
        .then((response) => {
        commit("LOGOUT",token)
        console.log(response)
        if(response.data.status_code == 200){
            toast.success(response.data.message)
            commit("LOADING_API",{name: 'Logout', status: true})
            VueCookies.remove('UserIDToken')
            VueCookies.remove('UserToken')
            commit("SET_AUTHENTICATED", false);
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
}

export default actions