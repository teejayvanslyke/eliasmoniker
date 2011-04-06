var Player = {

  initializeJPlayer: function() {
    $('#jplayer').jPlayer({
      swfPath: '/javascripts',
    cssSelectorAncestor: "",
    cssSelector: {
      play: '#play_button',
      pause: '#pause_button'
    },
      progress: function(event) {
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

$(function(){

  paper = Raphael('paper', 960, 992);


  function balloon() {
    var color = [ 'blue', 'teal', 'green', 'purple' ][Math.floor(Math.random() * 4)];
    var size  = [ 64, 128, 256 ][Math.floor(Math.random() * 3)];
    var balloon =  paper.image('/images/balloon-'+color+'-256.png', Math.floor(Math.random() * 960), 960+size, size, size);
    balloon.animate({y: -1 * size}, 15000, '<', function() { balloon.remove() } );
  }

  setInterval(balloon, 1000);

  $('#background').hide().fadeIn(2000);

  // Declare parallax on layers
  jQuery('.parallax-layer').parallax({
    mouseport: jQuery("#port"),
    activeOutside: true
  });

  Player.initializeJPlayer();

  $('#port').mouseenter();

  $([ '#play_button', '#pause_button' ]).css('z-index', '10000');
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

