
var code = `
var shop = 'dohashopiy.myshopify.com';
var af_hpp_verify = document.createElement("meta");
af_hpp_verify.id = 'af_hpp_verify';
document.head.appendChild(af_hpp_verify);


function serviceWorkerRegistered(){
    var hpp = new URLSearchParams(window.location.search);
    if (hpp.has("hidepp_clear")) {
        alert("Hide Paypal Cache Cleared!");
    }else{
        debugConsolelog("Hide PayPal Service worker registered");
    }
}
function debugConsolelog(log_text) {
    if(typeof debug != 'undefined' && debug == true){
        console.log(log_text);
    }
}
var whole_window_url = new URL(window.location.href);
var pathname = whole_window_url.pathname;
var url_depth = pathname.split("/").length-1;
var prefix = '';
if(url_depth > 1){
    for(loop=1;loop < url_depth; loop++){
        prefix += "../";
    }
}

var prefix_scope = '';
if(url_depth > 0){
    for(loop=0;loop < url_depth; loop++){
        prefix_scope += "../";
    }
}

var sw_url = prefix+"a/1883256/sw.php";

var hide_paypal_checkout = "Y";
var hide_paypal_cart = "Y";
var hide_pp_enable = "1";
var remove_service_worker = 1;
if(hide_pp_enable == "1") {
    if(hide_paypal_checkout == "Y") {
        // Due to hide checkout enable Dont remove remove_service_worker
        remove_service_worker = 0;
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register(sw_url, {
                scope: ''+prefix_scope+''
            }).then(serviceWorkerRegistered);
        }
    }
    if(hide_paypal_cart == "Y") {
        var css = '[data-alternative-payments],#dynamic-checkout-cart,.shopify-payment-button__button--branded,.shopify-payment-button__more-options,.additional_checkout_buttons{display:none!important;}html body #paypal-express-checkout-btn{ display: none !important;} html body #paypal-express-button{ display: none !important;}.additional-checkout-buttons{ display: none !important; }.paypal-button, .paypal-button-context-iframe, .alternative-payment-separator{ display: none !important; }#paypal-express-button, .dynamic-checkout, .dynamic-checkout__title, .dynamic-checkout__content{ display: none !important; }.content .main__header iframe { display: none !important; }#paypal-express-checkout-btn{ display: none !important; }#paypal-offers--iframe{ display: none !important;}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
        style.type = 'text/css';
        style.af_attr = 'custom_css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    }
}
if(remove_service_worker == 1){
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {                
                registration.unregister()
            }})
}

try {
  window.shopifypaypalisrememberedcallback({"paypal":false,"venmo":false});
	var ls_shopifyPaypalAcceleration = localStorage.getItem('shopifyPaypalAcceleration');
	if(ls_shopifyPaypalAcceleration != null){
	    var ls_shopifyPaypalAcceleration_parsed = JSON.parse(ls_shopifyPaypalAcceleration);
	    ls_shopifyPaypalAcceleration_parsed.value.paypal = false;
	    ls_shopifyPaypalAcceleration_parsed.value.venmo = false;
	    ls_shopifyPaypalAcceleration = JSON.stringify(ls_shopifyPaypalAcceleration_parsed);
	    localStorage.setItem('shopifyPaypalAcceleration', ls_shopifyPaypalAcceleration);
	}
}
catch(err) {
    debugConsolelog(err.message);
}

function af_buynow_submit(){
    var af_product_form = $(".af_buynow_button").attr('data-form');
	$.ajax({
       type: "POST",
       url: '/cart/add',
       data: $(af_product_form).serialize(), // serializes the form's elements.
       success: function(data)
       {
          window.location.href = "/checkout";
       }
    });
}

function injectProductBuyNowButton(whatToInject){
	// parent is always #af_product_buynow_button_parent where we inject.
	document.getElementById("af_product_buynow_button_parent").innerHTML = whatToInject;
		var css = '.shopify-payment-button__button--unbranded{display:none!important;}',
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
        style.type = 'text/css';
        style.af_attr = 'hide_unbranded_payment';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
}

function afDocReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
} 
    

afDocReady(function(){

	if(shop == 'ausziehstuhl.myshopify.com'){
		
		var whatToInject = '<button type="button" class="af_buynow_button shopify-payment-button__button _2ogcW-Q9I-rgsSkNbRiJzA _2EiMjnumZ6FVtlC7RViKtj _2-dUletcCZ2ZL1aaH0GXxT" data-testid="Checkout-button" onclick="af_buynow_submit();" data-form=".product-form.product-form-product-template">Jetzt kaufen</button>';
		injectProductBuyNowButton(whatToInject);
	
	}

});

`;

var debug = false;
var get_hpp_params = new URLSearchParams(window.location.search);
if (get_hpp_params.has("hpp_debug") || typeof sessionStorage.hidepp_token != "undefined") {
    sessionStorage.hpp_debug = "1";
    debug = true;
}
if (sessionStorage.getItem("hidepp_token") === null || sessionStorage.getItem("hidepp_token").length < 100) {
    // token is not set, that mean no data
    debugConsolelog("Hide PayPal - No Session");
    btoa_string = window.btoa(encodeURIComponent(code));
    sessionStorage.setItem('hidepp_token', btoa_string);
    eval(code);
} else {
    if (document.getElementById('af_hpp_verify') == null) {
        //dom is not created, means script was not loaded.
        debugConsolelog("Hide PayPal - DOM not loaded");
        eval(code);
    } else {
        debugConsolelog("Hide PayPal - DOM Loaded from Session");
        btoa_string = window.btoa(encodeURIComponent(code));
        sessionStorage.setItem('hidepp_token', btoa_string);
    }
}
function debugConsolelog(log_text) {
    if(typeof debug != 'undefined' && debug == true){
        console.log(log_text);
    }
}
