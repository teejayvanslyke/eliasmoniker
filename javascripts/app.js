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
        var status = event.jPlayer.status;
      },
      ended: function() {
        var nextSongElement = $('#'+currentSong['song_id']).next();
        if (nextSongElement.length > 0) {
          window.location.href = nextSongElement.find('a.play').attr('href');
        }
             }
    });
  },

  play: function(mp3) {
    $('#jplayer').jPlayer('setMedia', { mp3: mp3 });
    $('#jplayer').jPlayer('play');
  }

};


$(function(){

  $('#background').hide().fadeIn(2000);

  // Declare parallax on layers
  jQuery('.parallax-layer').parallax({
    mouseport: jQuery("#port"),
    activeOutside: true
  });

  Player.initializeJPlayer();

  $('#port').mouseenter();

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

