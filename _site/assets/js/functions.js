$( document ).ready(function() {
  
  /* ------------------------- */
  /* FitText plugin - resizing font */
  
  $("header h1, .section-contact .contact-email").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
  
  /* ------------------------- */
  
  /* ------------------------- */
  /* Mobile menu */
  
  (function mobileMenu() {
    
    $(".menu-button i").click(function() {
      
      var collapseMenu = function() {
        $("header nav").css({"padding-top": "+=50px", "height": "+=250px"});
        $(".menu-button i").removeClass("icon-menu").addClass("icon-cancel");
      }

      var riseMenu = function() {
        $("header nav").css({"padding-top": "-=50px", "height": "-=250px"});
        $(".menu-button i").removeClass("icon-cancel").addClass("icon-menu");
      }
      
      $(this).hasClass("icon-menu") ? collapseMenu() : riseMenu();

    });  
  })();
  
  /* ------------------------- */
  
  /* ------------------------- */
  /* Work Section - View Scrolling */
  
  (function workScroll() {
    $(".back-btn").click(function scrollLeft(){
      $(".section-work-container").css("left", "0%");
      $(".work-container").hide();
    });

    $(".thumb-unit").click(function scrollRight(){
      $(".section-work-container").css("left", "-100%");
    });
  })();
  
  /* ------------------------- */
  
  /* ------------------------- */
  /* Work Section - View Loading */
  
  (function workLoad() {
    $(".thumb-unit").click(function loadContent() {
      
      var folderName = $(this).data("folder"),
          newHTML = '/work/' + folderName + '.html',
          newTitle = $(this).find("strong").text(),
          loadingSpinner = '<div class="loader">Loading...</div>';
      
      $(".work-container").show();
      $(".project-load").html(loadingSpinner).load(newHTML);
      $("#work-title").text(newTitle);
    });
  })();
  
  /* ------------------------- */
  
  /* ------------------------- */
  /* Clients Section - Carrousel */
  
  (function clientsCarrousel() {
    
    var clients = $(".client-logo").length,
        interval;
    
    function getActiveClient() {
      return $(".client-logo.client-active").index();
    }
    
    function setActiveClient(index) {
      
      var firstClientIndex = 0;
      var lastClientIndex = clients - 1;
      
      if(index < firstClientIndex) {index = lastClientIndex};
      if(index > lastClientIndex) {index = firstClientIndex};
      
      $(".client-unit").removeClass("client-active").eq(index).addClass("client-active");
      $(".client-logo").removeClass("client-active").eq(index).addClass("client-active");
      $(".client-controll-mobile span").removeClass("client-active").eq(index).addClass("client-active");   
    }
      
    $(".client-controll-next").click(function(){
      var activeClient = getActiveClient();
      setActiveClient(activeClient + 1);
      console.log(activeClient);
    });
      
    $(".client-controll-prev").click(function(){
      var activeClient = getActiveClient();
      setActiveClient(activeClient - 1);
    });
    
    $(".client-logo, .client-controll-mobile span").click(function(){
      setActiveClient($(this).index());
    });
    
    /* automatic view changing with intervals */
    
    function autoCarrousel() {
      var lastClientIndex = clients - 1;
      
      getActiveClient() < lastClientIndex ? $(".client-active").removeClass("client-active").next().addClass("client-active") : setActiveClient(0);  
    }
    
    function carrouselInterval() {
      interval = setInterval(autoCarrousel, 5000);
    }
    
    carrouselInterval();
    
    $(".clients-carrousel").hover(function() {
      clearInterval(interval);
    }, function() {
      carrouselInterval();
    });
    
      /* ----------------------------------- */
  })();
  
  /* ------------------------- */
  
  /* ------------------------- */
  /* Smooth Scroll */
  
  (function smoothScroll() {
    // Select all links with hashes, remove links that don't actually link to anything
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
        // On-page links
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

        if (target.length) {
          event.preventDefault();
          $('html, body').animate({scrollTop: target.offset().top}, 700);
        }
      }
    });
  })();
  
  /* ------------------------- */
  
});

/* FitText plugin code */

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );