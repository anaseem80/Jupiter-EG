<template lang="">
    <div class="my-5">
        <wheel-spin v-if="wheelpoints !== null"></wheel-spin>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
    computed: {
        ...mapState(['wheelpoints']),
    },
}
</script>
<style lang="">
    
</style>