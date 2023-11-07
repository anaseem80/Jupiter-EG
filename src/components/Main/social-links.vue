<template lang="">
    <ul class="mb-0" v-if="settings">
        <li class="list-inline-item"><a class="hdr-facebook" target="_blank" :href="settings['facebook']"><i class="ecicon eci-facebook"></i></a></li>
        <li class="list-inline-item"><a class="hdr-twitter" target="_blank" :href="settings['twitter']"><i class="ecicon eci-twitter"></i></a></li>
        <li class="list-inline-item"><a class="hdr-instagram" target="_blank" :href="settings['google']"><i class="ecicon eci-google"></i></a></li>
        <li class="list-inline-item"><a class="hdr-linkedin" target="_blank" :href="settings['linkedin']"><i class="ecicon eci-linkedin"></i></a></li>
    </ul>
</template>
<script>
import { mapState } from "vuex";
export default {
    computed:{
        ...mapState(['route', 'settings'])
    }
}
</script>
<style lang="">
    
</style>