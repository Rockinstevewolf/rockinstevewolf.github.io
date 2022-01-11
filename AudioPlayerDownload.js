trackNum = 1;
trackBuf = [{
                "name": "Chris Tofield - Give Life One More Chance (Mix & Master)",
                "duration": "5:29",
                "file": "ChrisTofield_GiveLifeOneMoreChance_Mix_Master"
            }, {
                "name": "Allen Stone - Naturally (Mix)",
                "duration": "5:06",
                "file": "Allen_Stone_Naturally_Mix"
            }, {
                "name": "BalazsDanielBoogieWoogieTrio - OwnWayToBoogie (Mix & Master)",
                "duration": "2:59",
                "file": "BalazsDanielBoogieWoogieTrio_OwnWayToBoogie_Full_Mix_Master"
            }, {
                "name": "Skelpolu - Entwine (Mix & Master)",
                "duration": "5:25",
                "file": "Skelpolu_Entwine_Full_Master"
            }, {
                "name": "HollowGround - IllFate (Mix & Master)",
                "duration": "2:22",
                "file": "HollowGround_IllFate_Full_mix _master"
            }, {
                "name": "Barnstar! - Believer (Mix)",
                "duration": "3:41",
                "file": "Barnstar!_Believer_Mix"
            }, {
                "name": "AbletonesBigBand - CorineCorine (Mix)",
                "duration": "2:46",
                "file": "AbletonesBigBand_CorineCorine_Mix"
            }]


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
                'volume',
                'download'
            ]
        });
        // initialize playlist and controls
        var index = 0,
            playing = false,
            mediaPath = '/audio/',
            extension = '',
            tracks = trackBuf,
            buildPlaylist = $.each(tracks, function(key, value) {
                /*var trackNumber = value.track,*/
                var trackNumber = trackNum,
                    trackName = value.name,
                    trackDuration = value.duration;
                trackNum++;
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
                updateDownload(id, audio.src);
            },
            updateDownload = function (id, source) {
                player.on('loadedmetadata', function () {
                    $('a[data-plyr="download"]').attr('href', source);
                });
            },
            playTrack = function (id) {
                loadTrack(id);
                audio.play();
            };
        extension = audio.canPlayType('audio/mpeg') ? '.mp3' : audio.canPlayType('audio/ogg') ? '.ogg' : '';
        loadTrack(index);
    } else {
        /*no audio support*/
        $('.column').addClass('hidden');
        var noSupport = $('#audio1').text();
        $('.container').append('<p class="no-support">' + noSupport + '</p>');
    }
});
