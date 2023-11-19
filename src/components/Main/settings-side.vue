<template lang="">
    <div class="ec-tools-sidebar-overlay"></div>
    <div class="ec-tools-sidebar">
        <div class="tool-title">
            <h3>Features</h3>
        </div>
        <a href="javascript:void(0);" class="ec-tools-sidebar-toggle in-out" @click="OpenSettings($event.target)">
            <img alt="icon" src="@/assets/images/common/settings.png">
        </a>
        <div class="ec-tools-detail">
            <div class="ec-tools-sidebar-content ec-change-color ec-color-desc">
                <h3>Color Scheme</h3>
                <ul class="bg-panel">

                    
                    <li 
                        v-for="color in colors"
                        @click="changeSiteColor($event.target, color.color_code)" 
                        :data-color="color.id"
                    >
                        <a href="javascript:void(0);" class="colorcode1 shadow-sm" :style="'background-color:'+color.color_code"></a>
                    </li>
                </ul>
            </div>
            <div class="ec-tools-sidebar-content">
                <h3>Backgrounds</h3>
                <ul class="bg-panel">
                    <li class="bg"><a class="back-bg-1" id="bg-1">Background-1</a></li>
                    <li class="bg"><a class="back-bg-2" id="bg-2">Background-2</a></li>
                    <li class="bg"><a class="back-bg-3" id="bg-3">Background-3</a></li>
                    <li class="bg"><a class="back-bg-4" id="bg-4">Default</a></li>
                </ul>
            </div>
            <div class="ec-tools-sidebar-content">
                <h3>Dark mode</h3>
                <div class="ec-change-mode">
                    <div class="ec-mode-switch" @click="modeSwitch($event.target)">
                        <div class="ec-mode-btn">Mode</div>
                        <div class="ec-mode-on">On</div>
                        <div class="ec-mode-off">Off</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    computed: {
        ...mapState(['colors']),
    },
    methods:{
        ...mapActions(['GetColors']),
        async FetchColors() {
            await this.GetColors();
        },
        OpenSettings(e){
            $(".ec-tools-sidebar").stop().animate({right: "0px"}, 100);
            $(".ec-tools-sidebar-overlay").fadeIn();
            if ($(".ec-tools-sidebar-toggle").not("in-out")) {
                $(".ec-tools-sidebar").stop().animate({right: "-200px"}, 100);
                $(".ec-tools-sidebar-toggle").addClass("in-out");
                // $(".ec-tools-sidebar-overlay").fadeOut();
            }
            if ($(".ec-tools-sidebar-toggle").not("in-out")) {
                $(".ec-tools-sidebar").stop().animate({right: "0"}, 100);
                $(".ec-tools-sidebar-toggle").addClass("in-out");
                $(".ec-tools-sidebar-overlay").fadeIn();
            }
            $(e).toggleClass("in-out");


            $(".ec-tools-sidebar-overlay").on("click", function (e) {
                $(".ec-tools-sidebar-toggle").addClass("in-out");
                $(".ec-tools-sidebar").stop().animate({right: "-200px"}, 100);
                $(".ec-tools-sidebar-overlay").fadeOut();
            });
        },
        changeSiteColor(e, colorCode){
            console.log(e.parentElement)
            $('link[href^="assets/css/skin-"]').remove();
            $('link.dark').remove();
            $('.ec-change-mode').removeClass("active");


            $(e.parentElement).toggleClass('active').siblings().removeClass('active');

            document.documentElement.style.setProperty("--primary-color",colorCode)

            return false;
        },
        modeSwitch(e){
            var $link = $('<link>', {
                rel: 'stylesheet',
                href: 'assets/css/dark.css',
                class: 'dark'
            });
            $(e).parent().toggleClass('active');
            var modevalue = "light";
            if ($(e).parent().hasClass('ec-change-mode') && $(e).parent().hasClass('active')){
                    $("link[href='assets/css/responsive.css']").before($link);

            } else if($(e).parent().hasClass('ec-change-mode') && !$(e).parent().hasClass('active')){
                $('link.dark').remove();
                modevalue = "light";
            }
            if ($(e).parent().hasClass('active')){
                $("#ec-fixedbutton .ec-change-color").css("pointer-events", "none");
                $("body").addClass("dark");
                modevalue = "dark";
            }else{
                $("#ec-fixedbutton .ec-change-color").css("pointer-events", "all");
                $("body").removeClass("dark");
            }
        }
    },
    mounted(){
        this.FetchColors();
    }
}
</script>
<style lang="">
    
</style>