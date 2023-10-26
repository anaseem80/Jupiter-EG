<template>
  <layout-header></layout-header>
  <category-bar></category-bar>
  <mobile-menu></mobile-menu>
  <cart></cart>
  <router-view />
  <Toasts/>
  <layout-footer></layout-footer>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>

</style>
