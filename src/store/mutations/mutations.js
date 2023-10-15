const mutations = {
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
    LOADING_API(state, {name, status}){
      state.Loading = {name, status}
      console.log(state.Loading)
    },
}

export default mutations