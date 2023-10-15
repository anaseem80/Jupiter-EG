import axios from 'axios'
var api = "http://127.0.0.1:8000/api/"
import { router } from "@/router";
import VueRouter from "vue-router";
const actions = {

    UserLogin({commit}, {User , toast}){
        commit("LOADING_API",{name: 'UserLogin', status: true})
        axios.post(api + "login?lang=en", User)
        .then((response) => {
        commit("USER_LOGIN",User)
        if(response.data.token){
            toast.success("تم التسجيل بنجاح")
            commit("LOADING_API",{name: 'UserLogin', status: true})
            setTimeout(() => {
                commit("LOADING_API",{name: 'UserLogin', status: false})
                router.push("/");
            }, 1000);
        }
        })
        .catch((error) => {
            if(error.response.data.message === "Email not verified."){
                console.log("Asdasd")
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
            email:'abdonaseem13@gmail.com'
        })
        .then((response) => {
        commit("USER_LOGIN",OTP)
        if(response.data.status_code == 200){
            toast.success("تم التفعيل بنحاح")
            commit("LOADING_API",{name: 'SubmitOTP', status: true})
            setTimeout(() => {
                commit("LOADING_API",{name: 'SubmitOTP', status: false})
                router.push("/");
            }, 1000);
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'SubmitOTP', status: false})
        })
    },

    ResendOTP({commit}, {email, toast}){
        axios.post(api + "verification-notification?lang=en", {
            email:'anaseem@tonsetech.com'
        })
        .then((response) => {
        commit("USER_LOGIN",email)
        if(response.data.status_code == 200){
            toast.success("تم التفعيل بنحاح")
            commit("LOADING_API",{name: 'RESEND_OTP', status: true})
            setTimeout(() => {
                commit("LOADING_API",{name: 'RESEND_OTP', status: false})
                router.push("/");
            }, 1000);
        }
        })
        .catch((error) => {
            toast.error(error.response.data.message)
            commit("LOADING_API",{name: 'RESEND_OTP', status: false})
        })
    },
}

export default actions