<template>
  <layout-header></layout-header>
  <category-bar></category-bar>
  <cart></cart>
  <router-view />
  <Toasts/>
  <layout-footer></layout-footer>
</template>

<script>
import VueCookies from 'vue-cookies'
export default {
  name: 'App',
}
</script>

<style>

</style>
