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
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    FORGET_PASSWORD(state, password){
      state.ForgetPassword = password
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
}

export default mutations