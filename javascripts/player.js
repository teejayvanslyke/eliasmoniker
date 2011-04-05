var Player = {

  initializeJPlayer: function() {
    $('#jplayer').
      jPlayer('cssId', 'play', 'play_button').
      jPlayer('cssId', 'pause', 'pause_button').
      jPlayer('cssId', "playBar", "play_progress").
      jPlayer('cssId', "loadBar", "load_progress").
      jPlayer('onProgressChange', function(loadPercent, playedPercentRelative, playedPercentAbsolute, playedTime, totalTime) {
        var myPlayedTime = new Date(playedTime);
        var ptMin = (myPlayedTime.getUTCMinutes() < 10) ? "0" + myPlayedTime.getUTCMinutes() : myPlayedTime.getUTCMinutes();
        var ptSec = (myPlayedTime.getUTCSeconds() < 10) ? "0" + myPlayedTime.getUTCSeconds() : myPlayedTime.getUTCSeconds();
        $("#play_time").text(ptMin+":"+ptSec);

        var myTotalTime = new Date(totalTime);
        var ttMin = (myTotalTime.getUTCMinutes() < 10) ? "0" + myTotalTime.getUTCMinutes() : myTotalTime.getUTCMinutes();
        var ttSec = (myTotalTime.getUTCSeconds() < 10) ? "0" + myTotalTime.getUTCSeconds() : myTotalTime.getUTCSeconds();
        $("#total_time").text(ttMin+":"+ttSec);
      }).
      jPlayer('onSoundComplete', function() {
        var nextSongElement = $('#'+currentSong['song_id']).next();
        if (nextSongElement.length > 0) {
          window.location.href = nextSongElement.find('a.play').attr('href');
        }
      });
  },

  play: function(mp3) {
    $('#jplayer').jPlayer('setFile', mp3);
    $('#jplayer').jPlayer('play');
  },

  playSong: function(song) {
    Player.play(song.stream_url);
    currentSong = { 'album_id': song.album_permalink, 'song_id': song.permalink };
    $('.song').removeClass('current');
    var element = $('#'+song.permalink);
    element.addClass('current');
    return;
  },
  
  playSongById: function(albumId, songId) {
    Album.each(function(index, item) {
      album = item['album'];
      if (album.subdomain == albumId) {
        // Play the first song and return if no ID is specified.
        if (songId === undefined) {
          Player.playSong(album.songs[0]);
        }
        $.each(album.songs, function(index, song) {
          if (song.permalink == songId) Player.playSong(song);
        });
      }
    });
  }

};

