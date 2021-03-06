(function($) {
  var cache = [];
  // Arguments are image paths relative to the current page.
  $.preloadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  }
})(jQuery)


$.preloadImages(
  "/images/background.png",
  "/images/balloon-blue-256.png",
  "/images/balloon-green-256.png",
  "/images/balloon-purple-256.png",
  "/images/bop.fm.png",
  "/images/cover.png",
  "/images/cover5.jpeg",
  "/images/gear-grey.png",
  "/images/header-text.png",
  "/images/play-pause.png",
  "/images/shopping-cart-large.png",
  "/images/shopping-cart-small.png",
  "/images/social-networks.png",
  "/images/song-titles-hover.png",
  "/images/song-titles-selected.png",
  "/images/song-titles.png",
  "/images/soon.png",
  "/images/tv-large-light.png",
  "/images/tv-small-dark.png"
  )

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


  paper = Raphael('paper', 960, 720);

  function gear(x, y, size) {
    var color = ['blue', 'purple', 'green', 'orange', 'grey'][Math.floor(Math.random() * 5)];
    var gear = paper.image('/images/gear-grey.png', x - (size / 2), y - (size / 2), size, size);
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

  function balloon() {
    var color = [ 'blue', 'green', 'purple' ][Math.floor(Math.random() * 3)];
    var size  = [ 32, 64, 128 ][Math.floor(Math.random() * 3)];
    var balloon =  paper.image('/images/balloon-'+color+'-256.png', Math.floor(Math.random() * 704) + 256, 960+size, size, size);
    balloon.toBack();
    balloon.animate({y: -1 * size}, 20000, '<', function() { balloon.remove() } );
  }

  setInterval(balloon, 5000);

  $('#background').hide().fadeIn(2000);

  // Declare parallax on layers
  jQuery('.parallax-layer').parallax({
    mouseport: jQuery("#port"),
    activeOutside: true
  });

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
      $('#tv').attr('src', '/images/tv-large-light.png');
      $('#tv, #tv_screen').animate({
        width: '700px',
        height: '520px',
        bottom: '128px',
        left: '130px',
      }, 100, function() { 
        $('#tv_canvas').fadeIn(100);
      });

      $('#tv').css({ 'z-index': 10000 });
      $('#tv_canvas').css({ 'z-index': 9999 });
      $('#tv_screen').css({ 'z-index': 9998 });

      $('html, body').animate({scrollTop:0}, 100);
      theShoppingCart.hide();
      $this.enlarged = true;
    };

    this.hide = function() {
      $('#tv').attr('src', '/images/tv-small-dark.png');
      $('#tv_canvas').hide();
      $('#tv, #tv_screen').animate(this.defaultAttributes, 100);
      $this.enlarged = false;
    };

    $('#tv, #tv_screen').css(this.defaultAttributes).mouseover(function() {
      $(this).attr('src', '/images/tv-large-light.png');
    }).mouseout(function() {
      if ($this.enlarged) return;
      $(this).attr('src', '/images/tv-small-dark.png');
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
    this.enlarged = false;
    var element = $('#shopping_cart');

    $('#paypal').hide();

    this.defaultAttributes = {
      width: '162px',
      height: '166px',
      bottom: '16px',
      left: '20px',
      'z-index': 4
    };

    this.show = function() {
      element.attr('src', '/images/shopping-cart-large.png');
      element.animate({
        width: '644px',
        height: '657px',
        left: '130px',
        'z-index': 10000
      }, 100, function() {
        $('#paypal').fadeIn();
      });
      $('html, body').animate({scrollTop:0}, 100);
      theTV.hide();
      $this.enlarged = true;
    };

    this.hide = function() {
      element.attr('src', '/images/shopping-cart-small.png');
      $('#paypal').hide();
      element.animate(this.defaultAttributes, 100);
      $this.enlarged = false;
    };

    $('#shopping_cart').css(this.defaultAttributes).mouseover(function() {
      $(this).attr('src', '/images/shopping-cart-large.png');
    }).mouseout(function() {
      if ($this.enlarged) return;
      $(this).attr('src', '/images/shopping-cart-small.png');
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

  Cufon.replace('h2');
  Cufon.replace('h3');
  Cufon.replace('h4');

  $('#loader').hide();
});

