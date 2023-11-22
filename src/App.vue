<template>
  <layout-header></layout-header>
  <loader></loader>
  <category-bar></category-bar>
  <mobile-menu></mobile-menu>
  <cart></cart>
  <!-- <settings-side></settings-side> -->
  <router-view/>
  <Toasts/>
  <whatsapp/>
  <layout-footer></layout-footer>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    
  },
  methods:{
    loadCSS(id, path) {
      let existingLink = document.getElementById(id);
      if (!existingLink) {
        let link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = path;
        document.head.appendChild(link);
      }
    },

    unloadCSS(id) {
      let link = document.getElementById(id);
      if (link) {
        document.head.removeChild(link);
      }
    }
  },
  watch:{
    '$i18n.locale': function (newVal) {
      
     const cssPath = 'https://jupiter-eg.com/rtl/rtl.css'; // Adjust the path based on your project structure
      if (newVal === 'ar') {
        this.loadCSS('rtlStyle', cssPath);
      } else {
        this.unloadCSS('rtlStyle');
      }
    }
  }
}
</script>

<style>

</style>
