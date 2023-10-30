<template lang="">
    <button class="btn btn-primary w-100" :disabled="isLoading(action)" type="submit">
        {{name}}
        <loading-outlined class="ms-3" v-if="isLoading(action)"/>
    </button>
</template>
<script>
import {LoadingOutlined} from '@ant-design/icons-vue';

export default {
    props:['name','action'],
    components: {
        LoadingOutlined
    },
    methods:{
        isLoading(actionName) {
            return this.$store.state.Loading[actionName] || false;
        },
    }
}
</script>
<style lang="">
    
</style>