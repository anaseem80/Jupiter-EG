<template lang="">
    <!-- Footer Start -->
    <footer class="ec-footer section-space-mt">
        <div class="footer-container">
            <div class="footer-offer">
                <div class="container">
                    <div class="row">
                        <div class="text-center footer-off-msg">
                            <span>{{$t("Win a contest! Get this limited edition")}}</span>
                            <router-link to="/games">{{$t("Play Now!")}}</router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-top section-space-footer-p">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 col-lg-3 ec-footer-contact">
                            <div class="ec-footer-widget">
                                <div class="ec-footer-logo"><router-link to="/"><img :src="route+settings.logo"
                                            alt=""><img class="dark-footer-logo" src="assets/images/logo/dark-logo.png"
                                            alt="Site Logo" style="display: none;" /></router-link></div>
                                <h4 class="ec-footer-heading">{{$t('Contact us')}}</h4>
                                <div class="ec-footer-links">
                                    <ul class="align-items-center">
                                        <li class="ec-footer-link">{{settings['company_address']}}</li>
                                        <li class="ec-footer-link"><span>{{$t('Call Us:')}}</span><a :href="'tel:+'+settings['company_phone']">{{settings['company_phone']}}</a></li>
                                        <li class="ec-footer-link"><span>{{$t('Email:')}}</span><a
                                                :href="'mailto:'+settings['email']">{{settings['email']}}</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-3 ec-footer-info">
                            <div class="ec-footer-widget">
                                <h4 class="ec-footer-heading">{{$t("Information")}}</h4>
                                <div class="ec-footer-links">
                                    <ul class="align-items-center">
                                        <li class="ec-footer-link"><router-link to="/about">{{$t("About us")}}</router-link></li>
                                        <li class="ec-footer-link"><router-link to="/terms">{{$t("Terms & Conditions")}}</router-link></li>
                                        <li class="ec-footer-link"><router-link to="/contact">{{$t("Contact us")}}</router-link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-3 ec-footer-account">
                            <div class="ec-footer-widget">
                                <h4 class="ec-footer-heading">{{$t("Account")}}</h4>
                                <div class="ec-footer-links">
                                    <ul class="align-items-center">
                                        <li class="ec-footer-link"><router-link to="/profile">{{$t("My Account")}}</router-link></li>
                                        <li class="ec-footer-link"><router-link to="/profile">{{$t("Order History")}}</router-link></li>
                                        <li class="ec-footer-link"><router-link to="/wishlist">{{$t("Wishlist")}}</router-link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-lg-3 ec-footer-service">
                            <div class="ec-footer-widget">
                                <h4 class="ec-footer-heading">{{$t("Services")}}</h4>
                                <div class="ec-footer-links">
                                    <ul class="align-items-center">
                                        <li class="ec-footer-link"><router-link to="/privacy">{{$t("Privacy Policy")}}</router-link></li>
                                        <li class="ec-footer-link"><router-link to="/return-policy">{{$t("Return Policy")}}</router-link></li>
                                        <li class="ec-footer-link"><router-link to="/store-policy">{{$t("Store Policy")}}</router-link></li>
                                        <li class="ec-footer-link"><router-link to="/seller-policy">{{$t("Seller Policy")}}</router-link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="container">
                    <div class="row align-items-center">
                        <!-- Footer social Start -->
                        <div class="col text-left footer-bottom-left">
                            <div class="footer-bottom-social">
                                <span class="social-text text-upper">Follow us on:</span>
                                <social-links></social-links>
                            </div>
                        </div>
                        <!-- Footer social End -->
                        <!-- Footer Copyright Start -->
                        <div class="col text-center footer-copy">
                            <div class="footer-bottom-copy ">
                                <div class="ec-copy"
                                >{{$t("Copyright © 2023-2024")}} <a class="site-name text-upper"
                                        href="#">JUPITER EG<span>.</span></a> {{$t(".All Rights Reserved")}}</div>
                            </div>
                        </div>
                        <!-- Footer Copyright End -->
                        <!-- Footer payment -->
                        <div class="col footer-bottom-right">
                            <div class="footer-bottom-payment d-flex justify-content-end">
                                <div class="payment-link">
                                    <img src="assets/images/icons/payment.png" alt="">
                                </div>

                            </div>
                        </div>
                        <!-- Footer payment -->
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- Footer Area End -->
</template>
<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(['route','settings']),
    },
}
</script>
<style lang="">
    
</style>