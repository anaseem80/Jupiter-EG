import { createApp } from 'vue';
import { router } from './router';
import App from "./App.vue";
import store from './store'
import Header from '@/views/layouts/header'
import Footer from '@/views/layouts/footer'
import Toaster from '@meforma/vue-toaster'
import SettingsBar from '@/components/Home/settingsBar'
import Banner from '@/components/Home/banner'
import ProductsHome from '@/components/Home/products'
import LeftcategoryBar from '@/components/Main/LeftcategoryBar'
import FilterSide from '@/components/Main/FilterSide'
import Cart from '@/components/Main/cart'
import VueCountdown from '@chenfengyuan/vue-countdown';
import AddReview from '@/components/Main/add-review';
import MobileMenu from '@/components/Main/mobile-menu';
const app = createApp(App)



/* Header Compontents */

app.component('layout-header',Header)
app.component('layout-footer',Footer)

/* Header Compontents */

/* Main Compontents */

app.component('settings-bar',SettingsBar)
app.component('filter-side',FilterSide)
app.component('cart',Cart)
app.component('products-component',ProductsHome)
app.component('category-bar',LeftcategoryBar)
app.component('banner',Banner)
app.component('add-review',AddReview)
app.component('mobile-menu',MobileMenu)

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

app.use(router)
app.use(store)
app.use(Toaster, {
    position: "top-right",
});
app.component(VueCountdown.name, VueCountdown);
// app.use(jQuery)
app.use(router).mount('#app');

