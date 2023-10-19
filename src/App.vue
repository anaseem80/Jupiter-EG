<template>
  <layout-header></layout-header>
  <category-bar></category-bar>
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
