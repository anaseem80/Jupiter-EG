import { createApp } from 'vue';
import { router } from './router';
import App from "./App.vue";
import store from './store'
import Header from '@/views/layouts/header'
import Footer from '@/views/layouts/footer'
import Toaster from '@meforma/vue-toaster'
import SettingsBar from '@/components/Home/settingsBar'
import SubmitButton from '@/components/Buttons/submitButton'
import Banner from '@/components/Home/banner'
import ProductsHome from '@/components/Home/products'
import LeftcategoryBar from '@/components/Main/LeftcategoryBar'
import FilterSide from '@/components/Main/FilterSide'
import Cart from '@/components/Main/cart'
import RelatedProducts from '@/components/Main/related-products'
import Search from '@/components/Search/search'
import WishListIcon from '@/components/Main/wishlist'
import Loader from '@/components/Main/loader'
import VueCountdown from '@chenfengyuan/vue-countdown';
import AddReview from '@/components/Main/add-review';
import Whatsapp from '@/components/Main/whatsapp';
import SettingsSide from '@/components/Main/settings-side';
import MobileMenu from '@/components/Main/mobile-menu';
import Language from '@/components/lang/language';
import Currency from '@/components/currencies/currencies';
import SocialLinks from '@/components/Main/social-links';
import UserSettings from '@/components/Profile/settings';
import Orders from '@/components/Profile/orders';
import UserAddress from '@/components/Profile/address';
import wheelSpin from '@/components/wheel-spin/wheel-spin';
import breadcrumb from '@/components/breadcrumb/breadcrumb';
import VueLazyload from 'vue-lazyload'
import Antd from 'ant-design-vue';
import i18n from "@/localization/i18n.js"
import 'ant-design-vue/dist/reset.css';
const app = createApp(App)

/* Dialogs Compontents */
import InfoDialog from '@/components/Dialogs/change-info';
import PasswordDialog from '@/components/Dialogs/password-change';
import AddAddress from '@/components/Dialogs/add-address';

/* Dialogs Compontents */
app.config.warnHandler = function (msg, vm, trace) {
    return null
}
/* Header Compontents */

app.component('layout-header',Header)
app.component('layout-footer',Footer)

/* Header Compontents */

/* Main Compontents */

app.component('settings-bar',SettingsBar)
app.component('filter-side',FilterSide)
app.component('wheel-spin',wheelSpin)
app.component('cart',Cart)
app.component('search',Search)
app.component('related-products',RelatedProducts)
app.component('products-component',ProductsHome)
app.component('category-bar',LeftcategoryBar)
app.component('banner',Banner)
app.component('add-review',AddReview)
app.component('loader',Loader)
app.component('mobile-menu',MobileMenu)
app.component('language-dropdown',Language)
app.component('settings-side',SettingsSide)
app.component('wishlist-icon',WishListIcon)
app.component('info-dialog',InfoDialog)
app.component('currency',Currency)
app.component('whatsapp',Whatsapp)
app.component('password-dialog',PasswordDialog)
app.component('user-settings',UserSettings)
app.component('user-address',UserAddress)
app.component('add-address',AddAddress)
app.component('user-orders',Orders)
app.component('social-links',SocialLinks)
app.component('s-button',SubmitButton)
app.component('breadcrumb',breadcrumb)

/* Header Compontents */



/* Stylesheet */
import '@/assets/css/plugins/swiper-bundle.min.css'
import '@/assets/css/style.css'
import '@/assets/css/vendor/ecicons.min.css'
import '@/assets/css/plugins/animate.css'
import '@/assets/css/plugins/countdownTimer.css'
import '@/assets/css/plugins/slick.min.css'
import '@/assets/css/plugins/bootstrap.css'
import '@/assets/css/demo1.css'
import '@/assets/css/responsive.css'
import '@/assets/css/backgrounds/bg-4.css'


/* Stylesheet */

/* Javascript */
import jQuery from 'jquery';

// import '@/assets/js/vendor/jquery-3.5.1.min.js'
import '@/assets/js/vendor/popper.min.js'
import '@/assets/js/vendor/bootstrap.min.js'
import '@/assets/js/plugins/swiper-bundle.min.js'
import '@/assets/js/plugins/countdownTimer.min.js'
import '@/assets/js/plugins/scrollup.js'
import '@/assets/js/plugins/jquery.zoom.min.js'
import '@/assets/js/plugins/infiniteslidev2.js'
import '@/assets/js/vendor/jquery.magnific-popup.min.js'
import '@/assets/js/plugins/jquery.sticky-sidebar.js'
import '@/assets/js/plugins/slick.min.js'
import '@/assets/js/vendor/index.js'
import '@/assets/js/main.js'
/* Javascript */

const loadimage = require('@/assets/images/bg/blur.jpg')

app.use(router)
app.use(Antd)
app.use(i18n)
app.use(store)
app.use(VueLazyload, {
    preLoad: 1.3,
    loading: loadimage,
    attempt: 1
})
  
app.use(Toaster, {
    position: "top-right",
});
app.component(VueCountdown.name, VueCountdown);
// app.use(jQuery)
app.use(router).mount('#app');

