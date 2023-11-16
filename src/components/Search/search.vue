<template lang="">
    <Form 
        class="ec-btn-group-form"
        v-if="keywords"
        @submit="onSubmit"
        :validation-schema="schema"
        v-slot="{ errors }"
        >
        <Field
            name="keyword"
            type="text"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown" 
            aria-expanded="false"
            @focus="SearchDropdownFocus()"
            @blur:outside="SearchDropdownBlur()"
            class="form-control mt-2 mb-0 dropdown-toggle"
            :placeholder="$t('Enter your keyword here...')"
        />
        <div 
        class="search-dropdown rounded-0 border-0 w-100 bg-white position-absolute p-3 shadow-sm dropdown-menu" 
        aria-labelledby="dropdownMenuButton1"
        :class="{'text-end': $i18n.locale == 'ar'}"
        >
            <p v-if="recent_keywords.length == 0">{{$t("No recent search")}}</p>
            <div class="recent-search" v-if="recent_keywords.length > 0">
                <div class="d-flex justify-content-between align-items-center">
                    <p class="mb-0 fw-bold">{{$t('Recent search')}}</p>
                    <i @click="emptyRecentSearch()" class="ecicon eci-trash-o cursor-pointer"></i>
                </div>
                <ul class="d-flex flex-wrap">
                    <li
                    v-for="keyword in recent_keywords"
                    >
                        <router-link @click="keyword_search(keyword)" class="bg-light d-inline-block fw-bold py-1 px-3 me-2 my-1" to="#">{{keyword}}</router-link>
                    </li>
                </ul>
            </div>
            <p v-if="keywords.length == 0">No recent search and view</p>
            <div class="search-view mt-3" v-if="keywords.length > 0">
                <p class="mb-0 fw-bold">{{$t('Search and view')}}</p>
                <ul class="d-flex flex-wrap">
                    <li
                    v-for="keyword in keywords"
                    >
                    <router-link @click="keyword_search(keyword['keyword'])" class="bg-light d-inline-block fw-bold py-1 px-3 me-2 my-1" to="#">{{keyword['keyword']}}</router-link>
                    </li>
                </ul>
            </div>
            <p v-if="keywords.length == 0">No Popular search</p>
            <div class="search-view mt-3 border rounded p-3 popular-search position-relative" v-if="keywords.length > 0">
                <p class="mb-0 fw-bold"><i class="ecicon eci-fire text-danger"></i> {{$t('Popular search')}}</p>
                <ul class="p-0 mt-2">
                    <li
                    v-for="(keyword, index) in keywords"
                    >
                    <router-link @click="keyword_search(keyword['keyword'])" class="d-inline-block me-2 my-1 fw-bold" to="#">
                        <span
                        :class="[
                        'badge me-2 rounded-circle d-inline-block search-index',
                        index === 0 ? 'bg-warning' : '',
                        index === 1 ? 'bg-secondary' : '',
                        index === 2 ? 'bg-danger' : '',
                        index > 2 ? 'text-secondary' : ''
                        ]"
                    >
                        {{ index + 1 }}
                    </span> {{keyword['keyword']}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <button class="submit" type="submit"><img src="@/assets/images/icons/search.svg" class="svg_img header_svg" alt="icon" /></button>
    </Form>
</template>
<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
import { router } from "@/router";
import { mapActions, mapState } from "vuex";
export default {
    data(){
        return{
            searchbool: false,
        }
    },
    components: {
        Form,
        Field,
    },
    computed: {
        ...mapState(['keywords','recent_keywords']),
    },
    methods:{
        ...mapActions(['GetPopularKeywords']),
        async fetchPopularKeywords() {
            await this.GetPopularKeywords();
        },
        onSubmit(data){
          this.$store.dispatch('GetProductsByCurrentCategory',{page: 1, route:'search-product', keyword: data.keyword})
        //   this.$store.dispatch('AddToPopularKeywords',data.keyword)
          this.$store.dispatch('RecentSearch',data.keyword)
          router.push("/search-product/"+data.keyword)
        },
        SearchDropdownFocus(){
            // this.searchbool = true
        },
        keyword_search(keyword){
            this.$store.dispatch('GetProductsByCurrentCategory',{page: 1, route:'search-product', keyword: keyword})
            router.push("/search-product/"+keyword),
            this.searchbool = false
        },
        SearchDropdownBlur(){
            console.log("clicked")
            // this.searchbool = false
        },
        emptyRecentSearch(){
            this.$store.dispatch('EmptyRecentSearch')
        }
    },

    mounted() {
        this.fetchPopularKeywords();
    },
    setup(){
        const schema = Yup.object().shape({
            keyword: Yup.string().required("Keyword is required")
        });
        return {
            schema,
        };
    },
}
</script>
<style lang="">
    
</style>