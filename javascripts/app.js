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
          var nextSongElement = $('.song-title.current:first').next();
          if (nextSongElement.length > 0) {
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
    gear.attr({ 'z-index': Math.floor(Math.random() * 100) });
    return gear;
  }

  var gears = {};
  gears.player = gear(848, 152, 200);
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
    var speed = 8;

    function updateGear(gear, coef) {
      gear.stop();
      gear.animate({ 'rotation': Math.floor(percent * 360 * coef * speed) }, 500, '<');
    }

    updateGear(gears.player, 1);
    updateGear(gears.g1, 2);
    updateGear(gears.g2, 2);
    updateGear(gears.g3, 2);
    updateGear(gears.g4, 4);
    updateGear(gears.g5, 4);
    updateGear(gears.g6, 2);
    updateGear(gears.g7, 4);
    updateGear(gears.g8, 2);
    updateGear(gears.g9, 2);
    updateGear(gears.g10, 2);
  }

  function balloon() {
    var color = [ 'blue', 'teal', 'green', 'purple' ][Math.floor(Math.random() * 4)];
    var size  = [ 64, 128, 256 ][Math.floor(Math.random() * 3)];
    var balloon =  paper.image('/images/balloon-'+color+'-256.png', Math.floor(Math.random() * 960), 960+size, size, size);
    balloon.attr({ 'z-index': (size == 64 ? -1000 : 0) });
    balloon.toBack();
    balloon.animate({y: -1 * size}, 20000, '<', function() { balloon.remove() } );

    var cycles = 0;
    function rotateLeft() {
      if (cycles < 5) {
        balloon.animate({rotation: -10}, 5000, '>', rotateRight);
        cycles += 1;
      }
    }

    function rotateRight() {
      if (cycles < 5) {
        balloon.animate({rotation: 10}, 5000, '>', rotateLeft);
        cycles += 1;
      }
    }

    rotateLeft();
  }

  setInterval(balloon, 5000);

  $('#background').hide().fadeIn(2000);

  // Declare parallax on layers
  /*
  jQuery('.parallax-layer').parallax({
    mouseport: jQuery("#port"),
    activeOutside: true
  });
  */

  Player.initializeJPlayer();

  $('#port').mouseenter();

  $('#play_button, #pause_button').css('z-index', '12000');

  $('.song-title').css('z-index', '10000').mouseover(function() {
    $(this).addClass('hover');
  }).mouseout(function() {
    $(this).removeClass('hover');
  }).click(function() {
    $('.song-title').removeClass('current');
    $(this).addClass('current');
    Player.play($(this).data('url'));
  });


});

