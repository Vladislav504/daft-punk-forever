// Mythium Archive: https://archive.org/details/mythium/


jQuery(function ($) {
    'use strict'
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
        // initialize plyr
        var player = new Plyr('#audio1', {
            controls: [
                'restart',
                'play',
                'progress',
                'current-time',
                'duration',
                'mute',
                'volume'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = '',
            extension = '',
            pageTitle = document.title,
            tracks = null;
            if (pageTitle == "Homework") {
              mediaPath = 'music/1/';
              tracks = [{
                  "track": 1,
                  "name": "Daft Punk - Around The World",
                  "duration": "7:09",
                  "file": "1"
              }, {
                  "track": 2,
                  "name": "Daft Punk - Da Funk",
                  "duration": "5:29",
                  "file": "2"
              }];
            } else if (pageTitle == "Discovery") {
              mediaPath = 'music/2/';
              tracks = [{
                  "track": 1,
                  "name": "Daft Punk - One More Time",
                  "duration": "5:20",
                  "file": "1"
              }, {
                  "track": 2,
                  "name": "Daft Punk - Aerodynamic",
                  "duration": "3:27",
                  "file": "2"
              }, {
                  "track": 3,
                  "name": "Daft Punk - Digital Love",
                  "duration": "4:58",
                  "file": "3"
              }, {
                  "track": 4,
                  "name": "Daft Punk - Harder, Better, Faster, Stronger",
                  "duration": "3:44",
                  "file": "4"
              }, {
                  "track": 5,
                  "name": "Daft Punk - Something About Us",
                  "duration": "3:51",
                  "file": "5"
              }, {
                  "track": 6,
                  "name": "Daft Punk - Face To Face",
                  "duration": "4:00",
                  "file": "6"
              }];
            } else if (pageTitle == "Human After All") {
              mediaPath = 'music/3/';
              tracks = [{
                  "track": 1,
                  "name": "Daft Punk - Human After All",
                  "duration": "5:19",
                  "file": "1"
              }, {
                  "track": 2,
                  "name": "Daft Punk - Robot Rock",
                  "duration": "4:47",
                  "file": "2"
              }, {
                  "track": 3,
                  "name": "Daft Punk - Technologic",
                  "duration": "4:44",
                  "file": "3"
              }];
            } else {
              mediaPath = 'music/4/';
              tracks = [{
                  "track": 1,
                  "name": "Daft Punk - Instant Crush",
                  "duration": "5:37",
                  "file": "1"
              }, {
                  "track": 2,
                  "name": "Daft Punk - Lose Yourself To Dance",
                  "duration": "5:53",
                  "file": "2"
              }, {
                  "track": 3,
                  "name": "Daft Punk - Get Lucky",
                  "duration": "6:09",
                  "file": "3"
              }];
            }


            var buildPlaylist = $(tracks).each(function(key, value) {
                var trackNumber = value.track,
                    trackName = value.name,
                    trackDuration = value.duration;
                if (trackNumber.toString().length === 1) {
                    trackNumber = '0' + trackNumber;
                }
                $('#plList').append('<li> \
                    <div class="plItem"> \
                        <span class="plNum">' + trackNumber + '.</span> \
                        <span class="plTitle">' + trackName + '</span> \
                        <span class="plLength">' + trackDuration + '</span> \
                    </div> \
                </li>');
            }),
            trackCount = tracks.length,
            npAction = $('#npAction'),
            npTitle = $('#npTitle'),
            audio = $('#audio1').on('play', function () {
                playing = true;
                npAction.text('Now Playing...');
            }).on('pause', function () {
                playing = false;
                npAction.text('Paused...');
            }).on('ended', function () {
                npAction.text('Paused...');
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    audio.play();
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }).get(0),
            btnPrev = $('#btnPrev').on('click', function () {
                if ((index - 1) > -1) {
                    index--;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            btnNext = $('#btnNext').on('click', function () {
                if ((index + 1) < trackCount) {
                    index++;
                    loadTrack(index);
                    if (playing) {
                        audio.play();
                    }
                } else {
                    audio.pause();
                    index = 0;
                    loadTrack(index);
                }
            }),
            li = $('#plList li').on('click', function () {
                var id = parseInt($(this).index());
                if (id !== index) {
                    playTrack(id);
                }
            }),
            loadTrack = function (id) {
                $('.plSel').removeClass('plSel');
                $('#plList li:eq(' + id + ')').addClass('plSel');
                npTitle.text(tracks[id].name);
                index = id;
                audio.src = mediaPath + tracks[id].file + extension;
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        // boo hoo
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});
