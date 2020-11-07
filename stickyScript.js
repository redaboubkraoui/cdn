 
                
(function(){
var product = {};
var language = {
  "add_to_cart":{
    "en_us":"Add To Cart",
    "en_uk":"Add To Cart",
    "esp":"Agregar al carrito",
    "de":"In den Warenkorb",
    "fr":"Ajouter au panier",
    "it":"Aggiungi al carrello",
    "da":"LÃ¦g i indkÃ¸bskurven",
    "nl":"In winkelmand",
    "no":"Legg i handlekurven"
    },
  "buy_now":{
    "en_us":"Buy Now",
    "en_uk":"Buy Now",
    "esp":"Comprar ahora",
    "de":"Jetzt kaufen",
    "fr":"Acheter maintenant",
    "it":"Acquista ora",
    "da":"KÃ¸b nu",
    "nl":"Koop nu",
    "no":"KjÃ¸p"
  },
  "quantity":{
    "en_us":"Quantity",
    "en_uk":"Quantity",
    "esp":"Cantidad",
    "de":"Menge",
    "fr":"QuantitÃ©",
    "it":"QuantitÃ ",
    "da":"Antal",
    "nl":"Aantal",
    "no":"Antall"
  },
  "check_out":{
    "en_us":"Check Out",
    "en_uk":"Check Out",
    "esp":"Finalizar pedido",
    "de":"Zur Kasse",
    "fr":"ProcÃ©der au paiement",
    "it":"Check-out",
    "da":"GÃ¥ til kassen",
    "nl":"Verder naar bestellen",
    "no":"Til kassen"

  },
  "continue_shopping":{
    "en_us":"Continue Shopping",
    "en_uk":"Continue Shopping",
    "esp":"Seguir comprando",
    "de":"Weiter einkaufen",
    "fr":"Continuer vos achats",
    "it":"Continua lo shopping",
    "da":"FortsÃ¦tte med at handle",
    "nl":"Verder winkelen",
    "no":"Fortsett Ã¥ handle"
  },
  "view_cart": {
    "en_us":"View Cart",
    "en_uk":"View Cart",
    "esp":"Carrito de compras",
    "de":"Einkaufswagen ansehen",
    "fr":"Voir le panier",
    "it":"Visualizza carrello",
    "da":"IndkÃ¸bskurv",
    "nl":"Winkelmand",
    "no":"Handlekurv"
  },
  "item_added":{
    "en_us":"Item Added To Cart!",
    "en_uk":"Item Added To Cart!",
    "esp":"Â¡ArtÃ­culo agregado al carrito!",
    "de":"Artikel wurde in den Einkaufswagen gelegt",
    "fr":"Article ajoutÃ© au panier",
    "it":"Articolo aggiunto al carrello!",
    "da":"Produkt tilfÃ¸jet til indkÃ¸bskurv",
    "nl":"Het artikel is toegevoegd aan je winkelwagen",
    "no":"Lagt i handlekurven"
  },
  "please_select":{
    "en_us":"Please Select",
    "en_uk":"Please Select",
    "esp":"Por favor elija",
    "de":"Bitte auswÃ¤hlen",
    "fr":"Choisissez s'il vous plaÃ®t",
    "it":"si prega di scegliere",
    "da":"VÃ¦lg venligst",
    "nl":"Gelieve te kiezen",
    "no":"Vennligst velg"
  },
  "sold_out":{
    "en_us":"Out of Stock!",
    "en_uk":"Out of Stock!",
    "esp":"Agotado",
    "de":"Ausverkauft",
    "fr":"Ã‰puisÃ©",
    "it":"Esaurito",
    "da":"Udsolgt",
    "nl":"Uitverkocht",
    "no":"Utsolgt"
  }
};

var loadScript = function(url, callback){

  var script = document.createElement("script");
  script.type = "text/javascript";

  // If the browser is Internet Explorer.
  if (script.readyState){
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" || script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  // For any other browser.
  } else {
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);

};



var myAppJavaScript = function($){
var aph_enabled= true;
var aph_device= 'all';
var position= 'bottom';
var button_color= 'DA5A2C';
var text_color= '000000';
var cart_dest= 'def';
var scroll_option= 'always';
var popup_style= 'dark';
var carticon_style= 'dark';
var var_images= 'on';
var qbuy_enabled= true;
var qbuy_position= 'bot-left';
var lang= 'en_us';
var prec_setting= '2';


  if (typeof lang == 'undefined') {
    var lang = 'en_us';
  }
  if (aph_enabled == true || qbuy_enabled == true) {
  var head = document.getElementsByTagName('head')[0];
  var style = document.createElement('link');
  style.type = 'text/css';
  style.rel = 'stylesheet';
  style.href = 'https://assets.apphero.co/cart/css/bar2.css';

  head.appendChild(style);

    startMeUp();
}



function startMeUp() {
  append_preloaders();
  inject_bar();
  var handle = prepare_product_handle();
  get_product_info(handle);
  append_quick_buy();
  append_quick_buy_featured();

var is_aux_hidden = true;


  $(document).on('click','.variant_button',function() {
    $(this).siblings().removeClass('aph_selected');
    $(this).addClass('aph_selected');
    $('.aph_price_wrapper').html(get_variant_price());
    convertCurrency();

    $(this).closest('.variant_wrapper').children().find('.selected_variant').html($(this).data('option')).removeClass('red');
  //  if ($(this).hasClass('var_image')) {
      $('.aph_product_image').attr('src',$(this).data('img'));
    //}

  });


  $(document).on('click','.aph_cart_cover',function() {
    dismiss_cart();
  });

  $(document).on('touchstart','.aph_cart_cover',function() {
    dismiss_cart();
  });

  $(document).on('click','div.aph_qbuy',function(e) {
      e.preventDefault();
      var handle = $(this).data('aph-qbuy');
      do_quick_buy(handle);
      //return false;
  });

  $(document).on('click','.aph_dismiss_btn, .aph_continue_shopping',function(e) {
    dismiss_cart();
  });

  $(document).on('click','.aph_action_cart',function(e) {
    view_cart();
  });

  $(document).on('click','.aph_add_cart',function(e) {
    build_cart_view();
  });

  $(document).on('click','.aph_cart_large, .aph_view_cart',function(e) {
    view_cart();
  });

  $(document).off('click','.aph_addtocart, .aph_buynow').on('click','.aph_addtocart, .aph_buynow',function(e) {
    aph_add_tocart($(this).data("aph-target"));
  });

  $(document).off('click','.aph_minus').on('click','.aph_minus',function(e) {
    remove_quantity();

  });

  $(document).off('click','.aph_plus').on('click','.aph_plus',function(e) {
    add_quantity();

  });

  $('.aph_add_cart.large').mouseenter(function(){
    var rgb = hexToRgb(button_color);
    $(this).css('background','rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.8)');
    $(this).parent('.aph_cart_container').animate({
        width:"230px"
    });
  });

  $('.aph_add_cart.large').mouseleave(function(){

      setTimeout(function() {
        $(this).css('background','#' + button_color);
        $('.aph_add_cart').parent('.aph_cart_container').animate({
            width:"55px"
        },'slow');
      },300);

  });

  $(document).on('keyup','.aph_quantity_text',function(){
    if ($(this).val() < 1) {
      $(this).val(1);

    }
  });

$(window).scroll(function() {
  if (scroll_option == "scroll") {
  if ($(window).scrollTop() > 250) {
    if ($(window).width() < 749) {
      $('.aph_cart').fadeIn("fast");
    }
  }
  else {
    if ($(window).width() < 749) {
      $('.aph_cart').fadeOut("fast");
    }
  }
}
});
}

function prepare_product_handle() {
var full_url = window.location.href;
var stripped_url = full_url.split('?')[0];
var handle = stripped_url.substr(stripped_url.lastIndexOf('/') + 1);
return handle;
};

function get_product_info(handle) {
  $.getJSON('/products/' + handle + '.js', function(result) {
    product = result;
    //check_variant_images();

  });
};

function check_stock(handle,callback) {
  var available = true;
  $.getJSON('/products/' + handle + '.js', function(result) {
    available = result.available;
    //check_variant_images();
    callback(available);
  });

}


function inject_bar() {
if (aph_enabled) {
  var svg = '<svg class="add-to-cart-icon" style="fill:#' + text_color + ';" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.23 18.1"><title>add-cart-SVG</title><path d="M10.4,18.9a2,2,0,1,0-2,2A1.94,1.94,0,0,0,10.4,18.9Zm-2.7,0a.86.86,0,0,1,.8-.8.8.8,0,1,1,0,1.6h0A.86.86,0,0,1,7.7,18.9Z" transform="translate(-2.9 -2.8)"/><path d="M17.9,18.9a2,2,0,1,0-2,2A2,2,0,0,0,17.9,18.9Zm-2.7,0a.8.8,0,1,1,.8.8A.86.86,0,0,1,15.2,18.9Z" transform="translate(-2.9 -2.8)"/><path d="M19.7,6.2a.56.56,0,0,0-.7.4l-.2.8L17.7,12a1,1,0,0,1-.9.7h-9L6.6,5.6A1.82,1.82,0,0,0,4.8,4.1H3.5a.65.65,0,0,0-.6.6.65.65,0,0,0,.6.6H4.8a.63.63,0,0,1,.6.5L7,15.9a.56.56,0,0,0,.6.5h9.7a.6.6,0,1,0,0-1.2H8.1L7.9,14h8.8a2.25,2.25,0,0,0,2.1-1.6L20.1,7C20.2,6.6,20,6.2,19.7,6.2Z" transform="translate(-2.9 -2.8)"/><path d="M15.8,7.1a.61.61,0,0,0-.8,0L13.4,8.7V3.4a.6.6,0,1,0-1.2,0V8.6L10.6,7a.57.57,0,1,0-.8.8l2.6,2.6a.76.76,0,0,0,.4.2.52.52,0,0,0,.4-.2l2.6-2.6C16,7.7,16,7.3,15.8,7.1Z" transform="translate(-2.9 -2.8)"/></svg>';
  var bar = aph_device == "all" || aph_device == "desktop"?"<div class='aph_cart_container'>" +
  "<div class='aph_cart_large "+ carticon_style +"'><span class='aph_cart_count'></span><div class='aph_cart_icon " + carticon_style +"'></div></div>" +
  "<div class='aph_add_cart large' ><div class='aph_add_cart_icon_wrapper'>" + svg + "</div><div style='color:#" + text_color + "' class='add_cart_title'>" + language.add_to_cart[lang] + "</div></div>" +
  "</div>":"";
  var bar_mob = aph_device == "all" || aph_device == "mobile"?"<div class='aph_cart'><div class='aph_view_cart " +  carticon_style + "'>" +
  "<span class='aph_cart_count'>0</span>" +
  "<div class='aph_cart_icon " + carticon_style +"'></div>":"";


    bar_mob += "</div><div class='aph_add_cart mob' ><span>+ " + language.add_to_cart[lang] +"</span></div></div>";

  $(bar).appendTo('body').hide();
  $(bar_mob).appendTo('body').hide();
  get_cart_count(function(count){
    if (window.location.pathname.indexOf('/products/') <= -1) {
      $('.aph_add_cart').css('visibility','hidden');

      if (count <= 0) {
        $('.aph_view_cart').hide();
      }
      if (window.location.pathname.indexOf('cart') > -1) {
        $('.aph_view_cart').hide();
        $('.aph_cart_large').hide();
      }
    }

  if (scroll_option == "always") {
    if ($(window).width() < 750) {
      $('.aph_cart').show();
    }
    else {
      $('.aph_cart_container').show();
    }
  }
  else {
    if ($(window).width() >= 750) {
        $('.aph_cart_container').show();
    }
  }
});
  apply_settings();

}
};

function apply_settings() {
  if (position == "top") {
    $('.aph_cart').css('top','0');
    $('.aph_cart').css('bottom','');
  }
  else if (position == "bottom") {
    $('.aph_cart').css('bottom','0');
    $('.aph_cart').css('top','');
  }
  $('.aph_add_cart_icon_wrapper').css({'background':'#'+ button_color, 'color':'#'+ text_color});
  $('.aph_add_cart').css({'background':'#'+ button_color, 'color':'#'+ text_color});
};

function build_cart_view() {
  if ($('.aph_cart_view').length == 0) {
    var product_image = "";
    if (product.images.length > 0) {
      var extension = get_extention(product.images[0]);
    var last_index = product.images[0].lastIndexOf('.' + extension);
    product_image = product.images[0].substring(0,last_index) + '_150x150.' + extension;
    }

 if ($('.aph_cart_cover').length == 0) {
  var cart_cover = "<div class='aph_cart_cover'></div>";
  $(cart_cover).hide().appendTo('body').fadeIn();
}

  var view = "<div class='aph_cart_view " + popup_style + "'><div class='aph_dismiss'><div class='aph_dismiss_btn'>&#xd7;</div></div><div class='cart_wrapper'>"+
  '<div class="aph_header">' +
  '<div class="aph_head_wrapper">' +
  '<div class="aph_product_image_wrapper">' +
  '<svg viewBox="0 0 20 20" class="Polaris-Spinner Polaris-Spinner--sizeSmall image-spinner ' + popup_style + '" aria-label="Loading" role="status">' +
  '<path d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z"></path></svg>' +
  '</div>' +
  '<div class="aph_product_title"><span class="aph_product_title_text">' + product.title + '</span>' +
  '<div class="aph_price_wrapper">'+
   get_item_price() +
  '</div></div></div>' +
  '<span class="seperator"></span></div>' +
  '<div class="aph_content_wrapper">' +
  prepare_variants() +
  '<div class="aph_quantity"><label class="aph_quantity_title ' + popup_style + '">' + language.quantity[lang] + ': </label><div class="aph_q_control aph_minus ' + popup_style + '" ></div><input type="number" oninput="this.value=this.value.replace(/[^0-9]/g,\'\');" class="aph_q_control aph_quantity_text ' + popup_style + '" value="1"/><div class="aph_q_control aph_plus ' + popup_style + '"></div></div>' +
  '</div>' +
  '<div class="buttons_wrapper ' + popup_style + '"><div class="buttons_wrapper_n"><div style="background:#' + button_color + '; color:#' + text_color + ';" class="aph_addtocart" data-aph-target="'+ cart_dest +'" >' + language.add_to_cart[lang] + '</div><div style="border:2px solid #' + button_color + '" class="aph_buynow ' + popup_style + '" data-aph-target="buynow">'+language.buy_now[lang]+'</div></div></div>' +
  '</div></div>';
  $('<img class="aph_product_image" />').on('load',function(){

    $(this).appendTo('.aph_product_image_wrapper');
    $('.aph_product_image_wrapper').find('svg').remove();


  }).attr('src','https:' + product_image);


  if ($(window).width() < 750) {
  $(view).css('top','100%').appendTo('body');
  $('.aph_cart_view').animate({
    top:"0px"
  },300);
}
else {
  if (navigator.userAgent.match(/iPad/i) != null) {
    $(view).css('width','50%').css('right','-100%').appendTo('body');
  }
  else {
    $(view).css('right','-100%').appendTo('body');
  }


  $('.aph_cart_view').animate({
    right:"0px"
  },300, function() {
    var cart_width = $('.aph_cart_view').width();
  //  $('body').animate({
    //  right:cart_width + "px"
  //  },100);
  });
}
send_event('click',0, function(){

});

if (product.variants.length <= 1 && product.variants[0].available == false) {
  if (product.variants[0].available == false) {
    $('.aph_addtocart').hide();
    $('.aph_buynow').hide();
    if ($('.oos-block').length <= 0) {
    var oos_block = "<div class='oos-block'><div class='oos-icon " + popup_style + "'></div>"+
    "<div class='oos-message'>" + language.sold_out[lang] + "</div></div>";
    $('.buttons_wrapper').append(oos_block);
  }
  }
}

}
convertCurrency();
};


function prepare_variants() {
  var variants = "";
  if (product.variants.length > 1) {
  var variant_controller  = check_variant_images();

  if (!variant_controller.hasImages && var_images == "off") {
  product.options.forEach(function(item) {
    variants += "<div class='variant_wrapper'><label class='variant_title " + popup_style + "'>" + item.name + ": <span class='selected_variant'></span><div class='aph_variant'>";
    item.values.forEach(function(option) {
      variants += "<span class='variant_button " + popup_style + "' data-option='" + option + "'>" + option + "</span>";
    });
    variants += "</label></div></div>";
  });
}


else if (variant_controller.hasImages && var_images == "off") {
  for (var i=0; i < product.options.length; i++) {


    if (i == variant_controller.variant_index) {
      variants += "<div class='variant_wrapper'><label class='variant_title " + popup_style + "'>" + product.options[i].name + ": <span class='selected_variant'></span><div class='aph_variant'>";
    product.options[i].values.forEach(function(value) {
      variants += "<span class='variant_button " + popup_style + "' data-option='" + value + "' data-img='" + get_featured_image(value,variant_controller.variant_index) + "'>" + value + "</span>";
    });
  }
  else {
    variants += "<div class='variant_wrapper'><label class='variant_title " + popup_style + "'>" + product.options[i].name + ": <span class='selected_variant'></span><div class='aph_variant'>";
    product.options[i].values.forEach(function(value) {
    variants += "<span class='variant_button " + popup_style + "' data-option='" + value + "'>" + value + "</span>";
  });
  }
  variants += "</label></div></div>";
  }
}


else {

  for (var i=0; i < product.options.length; i++) {


    if (i == variant_controller.variant_index) {
      variants += "<div class='variant_wrapper'><label class='variant_title " + popup_style + "'>" + product.options[i].name + ": <span class='selected_variant'></span><div class='aph_variant_grid'>";
    product.options[i].values.forEach(function(value) {
      variants += "<span class='variant_button var_image variant_grid_button " + popup_style + "' data-option='" + value + "' data-img='" + get_featured_image(value,variant_controller.variant_index) + "'><img src='" + get_featured_image(value,variant_controller.variant_index) + "' /></span>";
    });
  }
  else {
    variants += "<div class='variant_wrapper'><label class='variant_title " + popup_style + "'>" + product.options[i].name + ": <span class='selected_variant'></span><div class='aph_variant'>";
    product.options[i].values.forEach(function(value) {
    variants += "<span class='variant_button " + popup_style + "' data-option='" + value + "'>" + value + "</span>";
  });
  }
  variants += "</label></div></div>";
  }
}
}


  return variants;
};

 function check_variant_images() {
   var variant_controller = {};
   var valid_variants = true;
   var variant_array = product.variants;
   var featured_image_sources = [];
   var seen = {};
   product.variants.forEach(function(item){
     if (item.featured_image == null) {
       valid_variants = false;
     }
     else {
       featured_image_sources.push(item.featured_image.src);
     }
   });

   if (product.variants[0].featured_image != null && valid_variants) {
     var allEqual = featured_image_sources.every(function(val,i,array) {return val === array[0];});

     if (!allEqual) {
     if (product.options.length > 1) {
       var variants = product.variants;
       variants.sort(function(a,b) {
         return a.title.localeCompare(b.title);
       });
     variant_controller.hasImages = true;
     var variant1 = variants[0];
     var variant2 = variants[1];
     if (variant1.featured_image.src == variant2.featured_image.src) {
       var comp = variant1.options.filter(function(n) { return this.has(n);}, new Set(variant2.options));
     }
     else {

       var comp = variant1.options.filter(function(n) { return !this.has(n);}, new Set(variant2.options));

     }
     variant_controller.variant_index = variant1.options.indexOf(comp.toString());

   }
   else {
     variant_controller.hasImages = true;
     variant_controller.variant_index = 0;
   }

   }
 }
   else {
     variant_controller.hasImages = false;
   }
   return variant_controller;
 };

function get_featured_image(value,index) {
   featured_image = "";
   product.variants.forEach(function(item) {
     if (item.options[index] == value) {
       featured_image = item.featured_image.src;
       var extension = get_extention(featured_image);
       var last_index = featured_image.lastIndexOf('.' + extension);
       featured_image = featured_image.substring(0,last_index) + '_compact.' + extension;
     }
   });
   return featured_image;
 }

function add_quantity() {
  var number = Number($('.aph_quantity_text').val());
  number += 1;

  $('.aph_quantity_text').val(number);

  if (number > 1) {
    $('.aph_minus').css('opacity',1);
  }
}

function remove_quantity() {
  var number = Number($('.aph_quantity_text').val());
  if (number > 1) {
  number -= 1;
  $('.aph_quantity_text').val(number);
}
 if (number == 1) {
  $('.aph_minus').css('opacity',0.5);
}
}

function get_variant_id() {
  var variant_id = "";
  if (product.variants.length > 1) {
  var variant_combo = [];
  $('.aph_selected').each(function(i,obj) {
    variant_combo.push($(obj).data('option').toString());
  });
  product.variants.forEach(function(item) {
    if (JSON.stringify(item.options) == JSON.stringify(variant_combo)) {
      variant_id = item.id;
      if (item.available == false) {
        $('.aph_addtocart').hide();
        $('.aph_buynow').hide();
        if ($('.oos-block').length <= 0) {
        var oos_block = "<div class='oos-block'><div class='oos-icon " + popup_style + "'></div>"+
        "<div class='oos-message'>" + language.sold_out[lang] + "</div></div>";
        $('.buttons_wrapper').append(oos_block);
      }
      }
      else {
        $('.oos-block').remove();
        $('.aph_addtocart').fadeIn();
        $('.aph_buynow').fadeIn();
      }
    }

  });
}
else {
  variant_id = product.variants[0].id;
}
  return variant_id;
}


function get_variant_price() {
  var price = 0;
  var price_compare = 0;
  var compare_tag = "";
  if ($('.aph_selected').length == product.options.length) {
    var variant_id = get_variant_id();

    product.variants.forEach(function(item) {
      if (variant_id == item.id) {
      price = formatMoney(item.price, '{{amount}}');
      price_compare = item.compare_at_price != null?formatMoney(item.compare_at_price, '{{amount}}'):0;
    }
    });
  }
  else {
    price = get_price_number();
  }

if (price_compare != 0 && price_compare > price) {

  compare_tag = '<div class="aph_price_compare"><span class="money">' + price_compare + ' ' + match_currency_symbol(Shopify.currency.active) + '</span></div>';
}


  var price_tag = '<div class="aph_price"><span class="money">' + price + ' ' + match_currency_symbol(Shopify.currency.active) + '</span></div>';
  return price_tag + compare_tag;
}

function get_item_price() {
  var price;
  if (product.price_varies == true) {
    var price_min = product.price_min;
    var price_max = product.price_max;
    price = "<span class='money'>" + formatMoney(price_min,'{{amount' + get_precision() + '}}') + ' ' + match_currency_symbol(Shopify.currency.active) + "</span>" + " - " + "<span class='money'>" + formatMoney(price_max, '{{amount' + get_precision() +'}}') + ' ' + match_currency_symbol(Shopify.currency.active) + "</span>";
  }
  else {

    price = '<span class="money">' + formatMoney(product.price,'{{amount' + get_precision() + '}}') + ' ' + match_currency_symbol(Shopify.currency.active) + '</span>';
  }
  return '<div class="aph_price">' + price + '</div>';
}

function get_price_number() {
  return formatMoney(product.price, '{{amount' + get_precision() + '}}');
}


function view_cart() {
  send_event('view',0, function() {
});
    window.top.location.href="/cart";


//  window.top.location.href="/cart";
}



function aph_add_tocart (cartmode) {
  var variant_id = get_variant_id();
  var quantity = Number($('.aph_quantity_text').val().replace(/[^0-9]/g,''));
  if (cartmode != "buynow") {
  $('.aph_addtocart').html('<svg viewBox="0 0 20 20" style="fill:#' + text_color + ';" class="Polaris-Spinner Polaris-Spinner--sizeSmall" aria-label="Loading" role="status">' +
  '<path style="fill:#' + text_color + ';" d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z"></path></svg>');
}
else if (cartmode == "buynow") {
  $('.aph_buynow').html('<svg viewBox="0 0 20 20" style="fill:#' + text_color + ';" class="Polaris-Spinner Polaris-Spinner--sizeSmall" aria-label="Loading" role="status">' +
  '<path style="fill:#' + button_color + ';" d="M7.229 1.173a9.25 9.25 0 1 0 11.655 11.412 1.25 1.25 0 1 0-2.4-.698 6.75 6.75 0 1 1-8.506-8.329 1.25 1.25 0 1 0-.75-2.385z"></path></svg>');
}
$.ajax ({
  type:"POST",
  url:"/cart/add.js",
  data: {
    quantity:quantity,
    id:variant_id
  },
  success:function(result) {

  },
  complete:function(result) {
    if (result.status == 200) {
    var line_item = JSON.parse(result.responseText);

    send_event('add', formatMoney(line_item.price,'{{amount}}'), function(){


    if (cartmode == "def") {
      displayStatus(language.item_added[lang],[{title:language.check_out[lang], type:"primary", url:"/checkout", class:""},
      {title:language.continue_shopping[lang], type:"secondary", url:"javascript:void(0);", class:"aph_continue_shopping"}, {title:language.view_cart[lang], type:"secondary", url:"javascript:void(0);", class:"aph_action_cart"}]);
      get_cart_count(function(count){
        if (count > 0) {
          $('.aph_cart_large').show();
          $('.aph_view_cart').show();
        }
      });
    }
    else if (cartmode == 'cart'){
      window.top.location.href = "/cart";
    }
    else if (cartmode == 'buynow') {
      window.top.location.href = '/checkout';
    }
  });
    });
  }
  else {
    if (cartmode != "buynow") {
    $('.aph_addtocart').html(language.add_to_cart[lang]);
    $('.aph_buynow').css('padding','0.51rem');
  }
  else {
    $('.aph_buynow').html(language.buy_now[lang]);
    $('.aph_addtocart').css('padding','0.61rem');
  }
  $('.selected_variant').each(function(){
    if ($(this).html() == "" || $(this).html() == language.please_select[lang]) {
      $(this).html(language.please_select[lang]).addClass('red');
      $(this).parent().parent().removeClass('invalid'+popup_style).addClass('invalid'+popup_style);
    }
  });
  setTimeout(function(){
     $('.selected_variant').parent().parent().removeClass('invalid'+popup_style);
   },1000);
//  $('.selected_variant').text('Please Select').addClass('red');
  //  $(".selected_variant:contains('Please Select')").parent().parent().addClass('invalid'+popup_style);

  //  setTimeout(function(){
  //    $(".selected_variant:contains('Please Select')").parent().parent().removeClass('invalid'+popup_style);
  //  },1000);


  }
  }

//displayStatus("Item Added To Cart",[{title:"Checkout", type:"primary", url:"/checkout"},
//{title:"Contiue Shopping", type:"secondary", url:"#"}, {title:"Visit Cart", type:"secondary", url:"/cart"}]);


function send_event(type, rev, callback) {


        $.ajax({
          type:"POST",
          url:"",
          data:{
            type:type,
            shop:Shopify.shop,
            rev: rev,
            curr:Shopify.currency.active
          },
          success:function(res) {

            callback();
          }

        });
}



function formatMoney(cents, format) {
  if (typeof cents == 'string') { cents = cents.replace('.',''); }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = (format || this.money_format);

  function defaultOption(opt, def) {
     return (typeof opt == 'undefined' ? def : opt);
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal   = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) { return 0; }

    if (precision == 2) {
      var precision_settings = typeof(prec_setting) == "undefined"?2:prec_setting;
    number = (number/100.0).toFixed(precision_settings);
  }
  else if (precision == 3) {
    var precision_settings = typeof(prec_setting) == "undefined"?3:prec_setting;
    number = (number/1000.0).toFixed(precision_settings);
  }

    var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';

    return dollars + cents;
  }

  switch(formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount3':
      value = formatWithDelimiters(cents,3);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
}

function dismiss_cart() {
  $('.aph_cart_cover').fadeOut();
  if ($(window).width() > 750) {
  $('.aph_cart_view').animate({
    right:"-100%"
  },200,function(){
    $('.aph_cart_view').remove();
    $('.aph_cart_cover').remove();
  });
}
else {
  $('.aph_cart_view').animate({
    top:"100%"
  },200,function(){
    $('.aph_cart_view').remove();
    $('.aph_cart_cover').remove();
  });
}
}


function displayStatus(message,actions) {
  $('.cart_wrapper').hide();
  var container = "<div class='aph_status_wrapper'><img class='aph_status_icon' src='https://assets.apphero.co/cart/images/check-icon.gif' />" +
  "<div class='aph_message'>" + message + "</div>" +
  "<div class='aph_action_wrapper'>";
  actions.forEach(function(action) {
    var actionItem = "<a href='" + action.url + "' class='" + action.class + "'><div class='aph_action " + action.type + popup_style + "'>" + action.title + "</div></a>";
    container += actionItem;
  });
  container += "</div></div>";
  $('.aph_cart_view').append(container);
}


/*function show_aux_menu() {
$('.aph_aux_btns').animate({
  bottom:"14%",
  opacity:"1"
}, 300);

}*/

function do_quick_buy(product_handle) {
  var cart_cover = "<div class='aph_cart_cover'></div>";
  $(cart_cover).hide().appendTo('body').fadeIn();
  $.getJSON('/products/'+ product_handle + '.js', function(result) {
    product = result;
    build_cart_view();

  });
}

function append_preloaders() {
  var preloader = "<div class='preloader'>" +
  "<img src='https://assets.apphero.co/cart/images/check-icon.gif' />" +
  "<img src='https://assets.apphero.co/cart/images/plusIcon.png' />" +
  "<img src='https://assets.apphero.co/cart/images/plusIcon-dark.png' />" +
  "<img src='https://assets.apphero.co/cart/images/minusIcon.png' />" +
  "<img src='https://assets.apphero.co/cart/images/minusIcon-dark.png' />" +
  "<img src='https://assets.apphero.co/cart/images/oos-icon-light.png' />" +
  "<img src='https://assets.apphero.co/cart/images/oos-icon-dark.png' />" +
  "</div>";
  $("body").append(preloader);
}

function append_quick_buy() {

  if (qbuy_enabled && window.location.pathname.indexOf('cart') <= -1) {

$("a[href*='/products/']").not('.product-single__thumbnail, .product-slideshow__open').each(function(i,object) {
  if ($(this).attr('href').indexOf("=https") == -1 || $(this).attr('href').indexOf("=http") == -1) {
  var handle_no_query = $(this).attr('href').split("?")[0];
  var handle = handle_no_query.split('/products/')[1];

  var buy_button = "<div class='aph_qbuy' data-aph-qbuy='" + handle + "'><div class='aph_qbuy_icon'></div></a></div>";
  var parent = $(this);
  var url_handle = window.location.href.split('/products/')[1];
  url_handle = strip_handle(url_handle);
  handle = strip_handle(handle);


  if (handle != url_handle && !handle.match(/(\.jpg|\.png|\.gif)/)) {


   check_stock(handle, function(res_available) {
      if (res_available && $(object).is($("a[href*='" + handle + "']")[0])) {
    if ($(object).find("img[src*='/products/']:not([src*='compact']), img[srcset*='/products/']:not([srcset*='compact']), img[data-src*='/products/']:not([data-src*='compact']), img[data-img-raw-src*='/products/']:not([data-img-raw-src*='compact'])").length !== 0) {
      $(object).find("img[src*='/products/']:not([src*='compact']), img[srcset*='/products/']:not([srcset*='compact']), img[data-src*='/products/']:not([data-src*='compact']), img[data-img-raw-src*='/products/']:not([data-img-raw-src*='compact'])").after(buy_button);
    }

    else if ($(object).find(".visually-hidden").length !== 0 || $(object).find("noscript").length !== 0) {
      $(object).css("z-index","");
      $(object).append(buy_button);
    }

  $(object).attr('data-aph-qbuy',$(object).attr('href').split('/products/')[1]);

  switch (qbuy_position) {
    case 'top-left':
      $('.aph_qbuy').css('top', '5px');
      $('.aph_qbuy').css('margin-left', '5px');
      break;
    case 'top-right':
      $('.aph_qbuy').css('top', '5px');
      $('.aph_qbuy').css('right', '5px');
      break;
    case 'bot-left':
      $('.aph_qbuy').css('bottom', '5px');
      $('.aph_qbuy').css('margin-left', '5px');
      break;
    case 'bot-right':
      $('.aph_qbuy').css('bottom', '5px');
      $('.aph_qbuy').css('right', '5px');
      break;

  }
}
});

}
}
});




}

}


function append_quick_buy_featured() {
  if (qbuy_enabled && window.location.pathname.indexOf('cart') <= -1) {

  $("meta[content*='/products/'][itemprop='url']").not('.product-single__thumbnail, .product-slideshow__open').each(function(i,object) {
  if ($(this).attr('content').indexOf("=https") == -1 || $(this).attr('content').indexOf("=http") == -1) {
  var handle_no_query = $(this).attr('content').split("?")[0];
  var handle = handle_no_query.split('/products/')[1];

  var buy_button = "<div class='aph_qbuy' data-aph-qbuy='" + handle + "'><div class='aph_qbuy_icon'></div></a></div>";
  var parent = $(object).parent();
  var url_handle = window.location.href.split('/products/')[1];
  url_handle = strip_handle(url_handle);
  handle = strip_handle(handle);


  if (handle != url_handle && !handle.match(/(\.jpg|\.png|\.gif)/)) {

  if (parent.attr('data-aph-qbuy') != handle ) {
   check_stock(handle, function(res_available) {
      if (res_available) {
    if (parent.find("img[src*='/products/']:not([src*='compact']), img[srcset*='/products/']:not([srcset*='compact']), img[data-src*='/products/']:not([data-src*='compact']), img[data-img-raw-src*='/products/']:not([data-img-raw-src*='compact'])").length !== 0) {
      parent.find("img[src*='/products/']:not([src*='compact']), img[srcset*='/products/']:not([srcset*='compact']), img[data-src*='/products/']:not([data-src*='compact']), img[data-img-raw-src*='/products/']:not([data-img-raw-src*='compact'])").after(buy_button);
    }

    else if (parent.find(".visually-hidden").length !== 0 || parent.find("noscript").length !== 0) {
      parent.css("z-index","");
      parent.append(buy_button);
    }

  parent.attr('data-aph-qbuy',$(object).attr('content').split('/products/')[1]);

  switch (qbuy_position) {
    case 'top-left':
      $('.aph_qbuy').css('top', '5px');
      $('.aph_qbuy').css('margin-left', '5px');
      break;
    case 'top-right':
      $('.aph_qbuy').css('top', '5px');
      $('.aph_qbuy').css('right', '5px');
      break;
    case 'bot-left':
      $('.aph_qbuy').css('bottom', '5px');
      $('.aph_qbuy').css('margin-left', '5px');
      break;
    case 'bot-right':
      $('.aph_qbuy').css('bottom', '5px');
      $('.aph_qbuy').css('right', '5px');
      break;

  }
  }
  });
  }
  }
  }
  });

  }


}

function get_cart_count(callback) {
  var count = 0;
  $.getJSON('/cart.js',function (result) {
    count = result.item_count;
    $('.aph_cart_count').text(count.toString());
    if (count > 0) {
      $('.aph_cart_count').css('display','block');
      $('.aph_cart_icon').addClass('shk');
    }
    callback(count);
  });

}

function get_precision() {
  var precision_settings = "";
  var product_price = 0;
  if (product.price_varies == "true") {
    product_price = product.price_max;
  }
  else {
    product_price = product.price;
  }
  var variant_price = 0;
  for (var i=0;i<product.variants.length;i++) {
    if (product.variants[i].price == product_price) {
      variant_price = product.variants[i].price;
    }
  }

  product_price = product_price.toString().length;
  variant_price = variant_price.toString().length;
  if (product_price > variant_price) {
    precision_settings = 3;
  }
  else {
    precision_settings = "";
  }
  return precision_settings.toString();
}

function match_currency_symbol(currency) {
  var symbol = currency;

  switch (currency) {
    case "USD":
      symbol = "USD";
      break;
    case "AUD":
      symbol = "AUD";
      break;
    case "CAD":
      symbol = "CAD";
      break;
    case "EUR":
      symbol = "EUR"
      break;
    case "GBP":
      symbol = "GBP"
      break;
    default:
      symbol = currency;
      break;
  }
  return symbol;
}

function get_extention(url) {
  var ext = "";
  if (url.length > 0) {
    url = url.split("?")[0];
    var dot_index = url.lastIndexOf(".");
    ext = url.substring(dot_index+1,url.length);
  }
  else {
    ext = "jpg";
  }
  return ext;
}

function getQueryStringValue(key) {
return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

function strip_handle(handle) {
  var final_string = "";
  if (handle != undefined) {
  var no_and = handle.split("&")[0];
  var no_query = no_and.split("?")[0];
  final_string = no_query;
}

  return final_string;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function convertCurrency() {
if (typeof Currency !== 'undefined') {
  Currency.convertAll(Shopify.currency.active,Currency.currentCurrency,"span.money","money_format");
}
else if (typeof DoublyGlobalCurrency !== 'undefined') {
  DoublyGlobalCurrency.convertAll(DoublyGlobalCurrency.currentCurrency,"span.money");
}

}

};

if ((typeof jQuery === 'undefined') || (parseInt(jQuery.fn.jquery) === 1 && parseFloat(jQuery.fn.jquery.replace(/^1\./,"")) < 11.0)) {
  loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js', function(){
    jQuery191 = jQuery.noConflict(true);
    myAppJavaScript(jQuery191);
  });
} else {
  myAppJavaScript(jQuery);
}

})();
                
                
                
                
