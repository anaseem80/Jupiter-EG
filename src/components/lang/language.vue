<template lang="">
    <div class="header-top-lan dropdown">        
        <button class="dropdown-toggle text-upper" data-bs-toggle="dropdown">
            <img :src="flag" class="me-2" width="20"/>
            {{$i18n.locale == 'en' ? "English" : "العربية"}} 
            <i class="ecicon eci-caret-down" aria-hidden="true"></i>
        </button>
        <ul class="dropdown-menu">
            <li class="active"><a class="dropdown-item" href="#" @click="changeLanguage('ar')"><img src="@/assets/images/flags/arabic.png" class="me-2" width="20"/>العربية</a></li>
            <li><a class="dropdown-item" href="#" @click="changeLanguage('en')"><img src="@/assets/images/flags/english.png" class="me-2" width="20"/>English</a></li>
        </ul>
    </div>
</template>
<script>
import arabic from "@/assets/images/flags/arabic.png";
import english from "@/assets/images/flags/english.png";

export default {
    data(){
        return{
            flag:english,
        }
    },
    methods:{
        changeLanguage(lang){
            if(lang !== this.$i18n.locale){
                window.location.reload()
            }
            localStorage.setItem("lang", lang)
            this.$i18n.locale = lang;
            lang == 'ar' ? this.flag = arabic : this.flag = english

        }
    },
    created(){
    $("body").addClass("CairoFont rtl")
    if(localStorage.getItem("lang")=="ar"){
        this.$i18n.locale = 'ar';
        this.flag = arabic
      }
      if(localStorage.getItem("lang")=="en"){
        this.$i18n.locale = 'en';
        this.flag = english
      }
  }
}
</script>
<style lang="">
    
</style>