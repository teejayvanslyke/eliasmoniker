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


  paper = Raphael('paper', 960, 992);

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
      console.log(degrees);
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
    var color = [ 'blue', 'teal', 'green', 'purple' ][Math.floor(Math.random() * 4)];
    var size  = [ 64, 128, 256 ][Math.floor(Math.random() * 3)];
    var balloon =  paper.image('/images/balloon-'+color+'-256.png', Math.floor(Math.random() * 960), 960+size, size, size);
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
    
    var element = $('#tv');

    this.show = function() {
      element.attr('src', '/images/tv-large-light.png');
      element.animate({
        width: '700px',
        height: '520px',
        top: '32px',
        left: '130px',
        'z-index': 10000
      }, 100);
      theShoppingCart.hide();
    };

    this.hide = function() {
      element.attr('src', '/images/tv-small-dark.png');
      element.animate({
        width: '339px',
        height: '250px',
        top: '602px',
        left: '600px',
        'z-index': 4
      }, 100);
      $this.enlarged = false;
    };

    element.css({
      width: '339px',
      height: '250px',
      top: '602px',
      left: '600px',
      'z-index': 4
    }).mouseover(function() {
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
      $this.enlarged = !$this.enlarged;
    });
  }

  var theTV = new tv();

  function shoppingCart() {
    var $this = this;
    this.enlarged = false;
    var element = $('#shopping_cart');
    this.show = function() {
      element.attr('src', '/images/shopping-cart-large.png');
      element.animate({
        width: '644px',
        height: '657px',
        top: '32px',
        left: '130px',
        'z-index': 10000
      }, 100);
      theTV.hide();
    };

    this.hide = function() {
      element.attr('src', '/images/shopping-cart-small.png');
      element.animate({
        width: '324px',
        height: '331px',
        top: '570px',
        left: '20px',
        'z-index': 4
      }, 100);
      $this.enlarged = false;
    };

    $('#shopping_cart').css({
      width: '324px',
      height: '331px',
      top: '570px',
      left: '20px',
      'z-index': 4
    }).mouseover(function() {
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
      $this.enlarged = !$this.enlarged;
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
  $('#cover').css({ 'z-index': 1 });
  $('#playlist').css({ 'z-index': 4 });
  $('#paper_wrapper').css({ 'z-index': 3 });

  $('#tv').css({ 'z-index': 4 });
  $('#shopping_cart').css({ 'z-index': 4 });

});

