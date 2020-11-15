window.addEventListener("load", function () {
    //On-load features
    if (window.location.hash) {
        $('.overlay').fadeIn();
        $('body').css('overflow', 'hidden');
    }
    $('.green').fadeOut(1000);

    //On-load animation
    $(".header h1").addClass("slidein-0-1s");
    $(".header a:nth-child(1)").addClass("slidein-0-1s");
    $(".header a:nth-child(2)").addClass("slidein-0-2s");
    $(".header a:nth-child(3)").addClass("slidein-0-3s");
    $(".header a:nth-child(4)").addClass("slidein-0-4s");

    //Scroll Swing
    $('a[href^="#"]').on('click', function (e) {
        if ($(this).hasClass('external')) return;
        e.preventDefault();
        if ($('.overlay').is(':visible')) {
            $($(this).closest('.overlay')).stop().animate({
                'scrollTop': $(this.hash).position().top + 1
            }, 750, 'swing');
        } else {
            $('html, body').stop().animate({
                'scrollTop': $(this.hash).offset().top + 1
            }, 750, 'swing');
        }
    });

    //Parallax & Content Move on Scroll
    $(window).on('scroll resize', function () {
        if ($(window).width() > 760) {
            $('.parallax').each(function () {
                if ($(document).scrollTop() > ($(this).offset().top - (window.innerHeight)) && $(document).scrollTop() < ($(this).offset().top + $(this).height())) {
                    $(this).css('background-position-y', ($(window).scrollTop() * -0.3 + ($(this).position().top / 4)) + 'px');
                }
            });
        }
    });


    //Ripple
    !(function (a) {
        a(".ripple-dark").mousedown(function (b) {
            var c = a(this);
            0 === c.find(".dark").length &&
                c.append("<span class='dark'></span>");
            var d = c.find(".dark");
            if ((d.removeClass("animate"), !d.height() && !d.width())) {
                var e = Math.max(c.outerWidth(), c.outerHeight());
                d.css({
                    height: e,
                    width: e
                });
            }
            var f = b.pageX - c.offset().left - d.width() / 2,
                g = b.pageY - c.offset().top - d.height() / 2;
            d.css({
                top: g + "px",
                left: f + "px"
            }).addClass("animate");
        });
    })(jQuery);
    !(function (a) {
        a(".ripple-light").mousedown(function (b) {
            var c = a(this);
            0 === c.find(".light").length &&
                c.append("<span class='light'></span>");
            var d = c.find(".light");
            if ((d.removeClass("animate"), !d.height() && !d.width())) {
                var e = Math.max(c.outerWidth(), c.outerHeight());
                d.css({
                    height: e,
                    width: e
                });
            }
            var f = b.pageX - c.offset().left - d.width() / 2,
                g = b.pageY - c.offset().top - d.height() / 2;
            d.css({
                top: g + "px",
                left: f + "px"
            }).addClass("animate");
        });
    })(jQuery);

    //Form Thing
    $('.form-section input, .form-section textarea').on('input focusin focusout', function () {
        if ($(this).val().length || this === document.activeElement) {
            $(this).next().css('transform', 'translate(10px,10px)');
        } else {
            $(this).next().css('transform', 'translate(10px,40px)');
        }
    });

    //Random background & copyrights
    var image = ['coralzeit.jpg', 'cloudylatias.jpg', 'opalitebunny.png', 'wolfyskyla.JPG', 'pinkycupcake_.JPG', 'silverdebut.png', 'eggily.jpg'];
    var copyright = ['<a href="https://www.instagram.com/coralzeit/" target="_blank">Coralzeit</a>', '<a href="https://www.instagram.com/p/BMCriPrBF0H" target="_blank">Cloudy Latias</a>', '<a href="https://www.instagram.com/opalitebunny/" target="_blank">Zelda</a>', '<a href="https://www.instagram.com/wolfyskyla/" target="_blank">Wolfyskyla</a>', '<a href="https://www.instagram.com/pinkycupcake_/" target="_blank">Chiakrahx</a>', '<a href="https://www.instagram.com/silverdebut/" target="_blank">Silverdebut</a>', '<a href="https://www.instagram.com/e.ggily/" target="_blank">Eggily</a>'];
    var imageRandom = Math.round(Math.random() * (image.length - 1));
    $('.quote-section').css({
        'background-image': 'url(images/footer/' + image[imageRandom] + ')'
    });
    $('.copyright').html(copyright[imageRandom]);

    //Tooltip
    $('.tooltip').each(function () {
        var tooltipText = $('<div class="tooltip-text">' + $(this).data('tooltip-text') + '</div>');
        $(this).mouseover(function () {
            tooltipText.appendTo('body').fadeIn('fast');
        });
        $(this).mouseout(function () {
            tooltipText.hide().remove();
        });
        $(this).mousemove(function (e) {
            tooltipText.css('top', (e.pageY - 40) + 'px');
            tooltipText.css('right', ($(window).width() - e.pageX) + 'px');
        });
    });

    //Internal Button Link and Back/Forward Browser Arrow Handling
    $('a.external').click(function () {
        $('.overlay').show();
        $('body').css('overflow', 'hidden');
        setTimeout(function() {
            document.getElementsByClassName('overlay')[0].scrollTop = 0;
        }, 1)
       
    });
    $('.back').click(function () {
        if (history.length > 2) history.back();
        else closeOverlay();
    });
});

window.onpopstate = function () {
    if (window.location.hash == '') {
        closeOverlay();
    } else {
        $(".overlay").show();
        $(window.location.hash).css("display", "flex!important");
    }
}

function closeOverlay() {
    $('.overlay').fadeOut();
    $('body').css('overflow', 'auto');
    window.location.hash = '';
    setTimeout(function () {
        $("html, body").scrollTop($('#projects').offset().top);
    }, 1);
}

$(window).on('hashchange load', function () {
    lazyLoad();
    if (window.location.href.indexOf('#websites') != -1 || window.location.href.indexOf('#artwork') != -1) {
        $('.back i').css('color', 'black');
    } else {
        $('.back i').css('color', 'white');
    }
});

//Spotify Checker & if error -> quote
$.ajax({
    type: "GET",
    url: 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=meowsom3&api_key=e08dd93bcff4d95a837f6de0d5319f42&format=json&limit=1',
    dataType: "json",
    success: function (data) {
        if (data.recenttracks.track[0] == undefined || data.recenttracks.track[0]["@attr"] == undefined) runQuote();
        else {
            $('.song').show();
            $('#songName').text(data.recenttracks.track[0].name);
            $('#song').attr("href", data.recenttracks.track[0].url);
            $('#songArtist').text('by ' + data.recenttracks.track[0].artist['#text']);
        }
    },
    error: function () {
        runQuote();
    }
});


//Quote Randomizer
function runQuote() {
    $('.quote').show();
    var quote = ['"I\'d rather be myself, myself and nasty. Not somebody else, however jolly."<br><i>-Aldous Huxley, Brave New World</i>', '"You don\'t know my brain the way you know my name, you don\'t know my heart the way you know my face."<br><i>-Tyler Joseph, Message Man</i>', '"I want to stand as close to the edge as I can without going over. Out on the edge you see all kinds of things you can\'t see from the center."<br><i>-Kurt Vonnegut Jr., Player Piano</i>', '"Everything was beautiful, and nothing hurt."<br><i>-Kurt Vonnegut Jr., Slaughterhouse-Five</i>', '"If liberty means anything at all, it means the right to tell people what they do not want to hear."<br><i>-George Orwell, Animal Farm</i>', '"No amount of fire or freshness can challenge what a man will store up in his ghostly heart."<br><i>-F. Scott Fitzgerald, The Great Gatsby</i>', '"<i>\'Brahouna!\'</i>, cried the Shah cheerfully. He waved. \'Brahouna, Takaru.\'<br>\'Live!\' translated Krashdrahr."<br><i>-Kurt Vonnegut Jr., Player Piano</i>', '"Good evening, shuttle bus!<br>Tell me where you\'re gonna take us."<br><i>-Adam Young, Early Birdie</i>', '"In time, I will leave the city. For now, I will stay alive."<br><i>-Tyler Joseph, Leave the City</i>', '"Look at the sky tonight, all of the stars have a reason."<br><i>-Gustav Åhr, Star Shopping</i>', '"Time is like a leaf in the wind<br>Either it\'s time well spent or time I\'ve wasted."<br><i>- Matt Shultz, Telescope</i>', '"What doesn\'t kill you makes you ugly; life gives you lemons, at least it gave you something."<br>-Adam Met, Break My Face'];
    var quoteRandom = Math.round(Math.random() * (quote.length - 1));
    $('.quote h4').html(quote[quoteRandom]);
}


//Lazy Load Images 
function lazyLoad() {
    setTimeout(function () {
        if (!window.location.hash == "") {
            $(window.location.hash + " img").each(function () {
                if (this.src.length > 0) return;
                $(this).attr('src', $(this).data('rel'));
            })
        }
    }, 1);
}
