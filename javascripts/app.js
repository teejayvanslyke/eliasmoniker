//= require "cufon"
//= require "jquery.jparallax.min.js"
//= require "jplayer.min.js"
//= require "raphael"

(function($) {
  
  var cache = [];
  // Arguments are image paths relative to the current page.
  //
  $.preloadImages = function() {
    function tryCallback() {
      for (i in cache) {
        if (!cache[i].complete || !cache[i].loaded) {
          setTimeout(tryCallback, 100);
          return;
        }
      }

      callback();
    }

    var callback = arguments[arguments.length - 1];
    var args_len = arguments.length - 1;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cacheImage.loaded = false;
      cacheImage.onload = function(){ this.loaded = true};
      cache.push(cacheImage);
    }

    setTimeout(tryCallback, 100);
  }
})(jQuery)


$(function(){
  var Player = {

    initializeJPlayer: function() {
      $('#jplayer').jPlayer({
        swfPath: '/javascripts',
      cssSelectorAncestor: "",
      cssSelector: {
        play: '#play_button',
        pause: '#pause_button'
      },
        timeupdate: function(event) {
                    updateProgressBar(event.jPlayer.status.currentTime / event.jPlayer.status.duration);
        },
        ended: function() {
          var nextSongElement = $('.current').next();
          if (nextSongElement.length > 0) {
            $('.song-title').removeClass('current');
            nextSongElement.addClass('current');
            Player.play(nextSongElement.data('url'));
          }
               }
      });
    },

    play: function(mp3) {
      $('#jplayer').jPlayer('setMedia', { mp3: mp3 });
      $('#jplayer').jPlayer('play');
    }

  };

  var paper = null;

  // adds an effect called "myEffect" to the overlay
  $.tools.overlay.addEffect("basic", function(position, done) {

    /*
       - 'this' variable is a reference to the overlay API
       - here we use jQuery's fadeIn() method to perform the effect
       */
    this.getOverlay().css(position).show();
  },

  // close function
  function(done) {

    // fade out the overlay
    this.getOverlay().hide();
  }
  );
  

  $("a.overlay").overlay({
    onBeforeClose: function() {
                    this.getOverlay().find(".content").children().remove();
                   },
    onBeforeLoad: function() {
                    var content = this.getOverlay().find(".content");
                    content.load(this.getTrigger().attr('href'), function() {
                      Cufon.replace('h2');
                    });
                  }
  });

  paper = Raphael('paper', 960, 720);

  function gear(x, y, size) {
    var color = ['blue', 'purple', 'green', 'orange', 'grey'][Math.floor(Math.random() * 5)];
    var gear = paper.image('http://eliasmoniker.com.s3.amazonaws.com/images/gear-grey.png', x - (size / 2), y - (size / 2), size, size);
    return gear;
  }

  var gears = {};
  gears.player = gear(842, 145, 180);
  gears.g1 = gear(732, 72, 100);
  gears.g2 = gear(610, 100, 170);
  gears.g3 = gear(490, 150, 100);
  gears.g4 = gear(432, 112, 50);
  gears.g5 = gear(404, 78, 50);

  gears.g6 = gear(600, 225, 100);
  gears.g7 = gear(660, 260, 50);
  gears.g8 = gear(715, 300, 100);
  gears.g9 = gear(792, 350, 100);
  gears.g10 = gear(845, 426, 100);

  function updateProgressBar(percent) {
    var speed = 4.0;

    if ($.browser.webkit) {
      function updateGear(gear, coef) {
        var degrees = Math.floor(percent * 360 * coef * speed);
        if (isNaN(degrees)) return;
        gear.animate({ 'rotation': degrees }, 1000, '>');
        //gear.attr({ 'rotation': degrees });
      }

      updateGear(gears.player, 1);
      updateGear(gears.g1, -2);
      updateGear(gears.g2, 2);
      updateGear(gears.g3, -2);
      updateGear(gears.g4, 4);
      updateGear(gears.g5, -4);
      updateGear(gears.g6, -2);
      updateGear(gears.g7, 4);
      updateGear(gears.g8, -2);
      updateGear(gears.g9, 2);
      updateGear(gears.g10, -2);
    }
  }

  function balloon() {
    var color = [ 'blue', 'green', 'purple' ][Math.floor(Math.random() * 3)];
    var size  = [ 32, 64, 128 ][Math.floor(Math.random() * 3)];
    var balloon =  paper.image('http://eliasmoniker.com.s3.amazonaws.com/images/balloon-'+color+'-256.png', Math.floor(Math.random() * 704) + 256, 960+size, size, size);
    balloon.toBack();
    balloon.animate({y: -1 * size}, 20000, '<', function() { balloon.remove() } );
  }

  setInterval(balloon, 5000);

  $('#background').hide().fadeIn(2000);

  Player.initializeJPlayer();

  $('.song-title:first').addClass('current');
  var currentSong = $('.song-title.current');
  $('#jplayer').jPlayer('setMedia', { mp3: currentSong.data('url') });

  $('#port').mouseenter();

  function tv() {
    var $this = this;

    this.enlarged = false;
    
    var element = $('#tv, #tv_screen, #tv_canvas');

    this.defaultAttributes = {
      width: '170px',
      height: '125px',
      bottom: '32px',
      left: '222px',
      'z-index': 4
    };

    this.show = function() {
    };

    this.hide = function() {
    };

    $('#tv, #tv_screen').css(this.defaultAttributes).mouseover(function() {
      $(this).attr('src', 'http://eliasmoniker.com.s3.amazonaws.com/images/tv-large-light.png');
    }).mouseout(function() {
      if ($this.enlarged) return;
      $(this).attr('src', 'http://eliasmoniker.com.s3.amazonaws.com/images/tv-small-dark.png');
    }).click(function() {
      if (!$this.enlarged) {
        $this.show();
      }
      else {
        $this.hide();
      }
    });
  }

  var theTV = new tv();

  function shoppingCart() {
    var $this = this;
    var element = $('#shopping_cart');

    this.defaultAttributes = {
      width: '162px',
      height: '166px',
      bottom: '16px',
      left: '20px',
      'z-index': 4
    };

    this.show = function() {
    };

    this.hide = function() {
      element.attr('src', 'http://eliasmoniker.com.s3.amazonaws.com/images/shopping-cart-small.png');
      $('#paypal').hide();
      element.animate(this.defaultAttributes, 100);
      $this.enlarged = false;
    };

    $('#shopping_cart').css(this.defaultAttributes).mouseover(function() {
      $(this).attr('src', 'http://eliasmoniker.com.s3.amazonaws.com/images/shopping-cart-large.png');
    }).mouseout(function() {
      if ($this.enlarged) return;
      $(this).attr('src', 'http://eliasmoniker.com.s3.amazonaws.com/images/shopping-cart-small.png');
    }).click(function() {
      if (!$this.enlarged) {
        $this.show();
      }
      else {
        $this.hide();
      }
    });

    return this;
  }

  var theShoppingCart = new shoppingCart();

  $('.song-title').mouseover(function() {
    $(this).addClass('hover');
  }).mouseout(function() {
    $(this).removeClass('hover');
  }).click(function() {
    $('.song-title').removeClass('current');
    $(this).addClass('current');
    $('#jplayer').jPlayer('setMedia', { mp3: $(this).data('url') });
      $('#jplayer').jPlayer('play');
  });

  $('#background_wrapper').css({ 'z-index': 0 });
  $('#cover').css({ 'z-index': 3 });
  $('#playlist').css({ 'z-index': 4 });
  $('#paper_wrapper').css({ 'z-index': 3 });

  $('#tv').css({ 'z-index': 4 });
  $('#shopping_cart').css({ 'z-index': 4 });
  $('#paypal').css({ 'z-index': 10001 });


  $.preloadImages(
    "http://eliasmoniker.com.s3.amazonaws.com/images/background.png",
    "http://eliasmoniker.com.s3.amazonaws.com/images/balloon-blue-256.png",
    "http://eliasmoniker.com.s3.amazonaws.com/images/balloon-green-256.png",
    "http://eliasmoniker.com.s3.amazonaws.com/images/balloon-purple-256.png",
//    "http://eliasmoniker.com.s3.amazonaws.com/images/bop.fm.png",
    "http://eliasmoniker.com.s3.amazonaws.com/images/cover.png",
    "http://eliasmoniker.com.s3.amazonaws.com/images/cover5.jpeg",
    "http://eliasmoniker.com.s3.amazonaws.com/images/gear-grey.png",
//    "http://eliasmoniker.com.s3.amazonaws.com/images/header-text.png",
    "http://eliasmoniker.com.s3.amazonaws.com/images/play-pause.png",
 //   "http://eliasmoniker.com.s3.amazonaws.com/images/shopping-cart-large.png",
  //  "http://eliasmoniker.com.s3.amazonaws.com/images/shopping-cart-small.png",
 //   "http://eliasmoniker.com.s3.amazonaws.com/images/social-networks.png",
    "http://eliasmoniker.com.s3.amazonaws.com/images/song-titles-hover.png",
    "http://eliasmoniker.com.s3.amazonaws.com/images/song-titles-selected.png",
    "http://eliasmoniker.com.s3.amazonaws.com/images/song-titles.png",
//    "http://eliasmoniker.com.s3.amazonaws.com/images/soon.png",
//    "http://eliasmoniker.com.s3.amazonaws.com/images/tv-large-light.png",
//    "http://eliasmoniker.com.s3.amazonaws.com/images/tv-small-dark.png",

    function() {
      if ($.browser.webkit && false) {
        // Declare parallax on layers
        $('.parallax-layer').parallax({
          mouseport: $("#port"),
          activeOutside: true
        });
      }

      $('#loader').hide();

      $('#jplayer').jPlayer('setMedia', { mp3: $('.song-title:first').data('url') });

      //$('#buy_button a').trigger('click');
    });
});

