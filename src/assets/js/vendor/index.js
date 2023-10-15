/**
    Item Name: Ekka - Ecommerce HTML Template.
    Author: ashishmaraviya
    Copyright 2021-2022
	Author URI: https://themeforest.net/user/ashishmaraviya
**/
function ecCreateCookie(cookieName,cookieValue,daysToExpire)
{
    var date = new Date();
    date.setTime(date.getTime()+(daysToExpire*24*60*60*1000));
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toGMTString();
}

// Function To Delete Existing Cookie
function ecDeleteCookie(cookieName,cookieValue)
{
    var date = new Date(0).toGMTString();
    document.cookie = cookieName + "=" + cookieValue + "; expires=" + date;
}

// Function To Access Existing Cookie
function ecAccessCookie(cookieName)
{
    var name = cookieName + "=";
    var allCookieArray = document.cookie.split(';');
    for(var i=0; i<allCookieArray.length; i++)
    {
        var temp = allCookieArray[i].trim();
        if (temp.indexOf(name)==0){
            return temp.substring(name.length,temp.length);
        }
    }

    return "";
}

// Function To Check Existing Cookie
function ecCheckCookie()
{
    var bgImageMode = ecAccessCookie("bgImageModeCookie");
    if (bgImageMode != "")
    {     
        var bgIDClass = bgImageMode.split('||');
        var bgID = bgIDClass[0];
        var bgClass = bgIDClass[1];
        
        $("body").removeClass("body-bg-1");
        $("body").removeClass("body-bg-2");
        $("body").removeClass("body-bg-3");
        $("body").removeClass("body-bg-4");
    
        $("body").addClass(bgClass);
    
        $("#bg-switcher-css").attr("href", "assets/css/backgrounds/" + bgID + ".css");
    }

    var rtlMode = ecAccessCookie("rtlModeCookie");
    if (rtlMode != "")
    {
        // alert(rtlMode);    
        var $link = $('<link>', {
            rel: 'stylesheet',
            href: 'assets/css/rtl.css',
            class: 'rtl'
        });
        $(".ec-tools-sidebar .ec-change-rtl").toggleClass('active');
        $link.appendTo('head');                
    }

    // ecCreateCookie('bgImgModeCookie',bgIDClass,1);

    var darkMode = ecAccessCookie("darkModeCookie");
    if (darkMode != "")
    {
        var $link = $('<link>', {
            rel: 'stylesheet',
            href: 'assets/css/dark.css',
            class: 'dark'
        });
        
        $("link[href='assets/css/responsive.css']").before($link);

        $(".ec-tools-sidebar .ec-change-mode").toggleClass('active');
        $("body").addClass("dark");
    }
    else
    {
        var themeColor = ecAccessCookie("themeColorCookie");
        if (themeColor != "")
        {
            $('li[data-color = '+themeColor+']').toggleClass('active').siblings().removeClass('active');
            $('li[data-color = '+themeColor+']').addClass('active');
            
            if(themeColor != '01'){
                $("link[href='assets/css/responsive.css']").before('<link rel="stylesheet" href="assets/css/skin-'+themeColor+'.css" rel="stylesheet">');
            }
        }
    }
}

(function($) {
    "use strict";

    /*--------------------- Main Slider image auto height ---------------------- */
    
    $(document).ready(function() {

        // Comment this Two below line to display Popup evertime
        var dataValue = false; 
        ecCreateCookie('ecPopNewsLetter',dataValue,1);

        var ecPopNewsLetter = ecAccessCookie("ecPopNewsLetter");
        if (ecPopNewsLetter == "false")
        {
            setTimeout( function(){ 
                $("#ec-popnews-bg").fadeIn();
                $("#ec-popnews-box").fadeIn();
            }, 5000);

            $("#ec-popnews-close").click(() => {
                $("#ec-popnews-bg").fadeOut();
                $("#ec-popnews-box").fadeOut();

                var dataValue = true;
                ecCreateCookie('ecPopNewsLetter',dataValue,1);
            });

            $("#ec-popnews-bg").click(() => {
                $("#ec-popnews-bg").fadeOut();
                $("#ec-popnews-box").fadeOut();

                var dataValue = true;
                ecCreateCookie('ecPopNewsLetter',dataValue,1);
            });
        }
    });

})(jQuery);




