var acceptCookie = '.accept-cookie';
var declineCookie = '.decline-cookie';
var cookieName = 'trackingConsent';
var cookieValue1 = 'Accepted';
var cookieValue2 = 'Rejected';
var cookieExpire = 1;

// When click button, create cookie.
$(document).ready(function(){
  $(acceptCookie).click(function() {
    if ($.cookie(cookieName) == null){      
      $.cookie(cookieName, cookieValue1, { expires: cookieExpire, path: '/' });      
      $('.cookie-disclaimer').hide();
    }
  });

  $(declineCookie).click(function() {
    if ($.cookie(cookieName) == null){      
      $.cookie(cookieName, cookieValue2, { expires: cookieExpire, path: '/' });      
      $('.cookie-disclaimer').hide();
    }
  });
  
  checkCookie();
   if ($.cookie(cookieName) != null) {      
      $('.cookie-disclaimer').hide();
    }
}); 

function checkCookie(){
    if ($.cookie(cookieName) == null) {      
      $('.cookie-disclaimer').show();
    }
  else {$('.cookie-disclaimer').hide();}
}
