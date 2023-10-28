import { createStore } from 'vuex'
import { router } from "@/router";
import VueRouter from "vue-router";
import state from './state/state'
import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'



export default createStore({
  state,
  mutations,
  actions,
  getters 
})
