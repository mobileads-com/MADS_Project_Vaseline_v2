/*
 *
 * mads - version 2.00.01
 * Copyright (c) 2015, Ninjoe
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://en.wikipedia.org/wiki/MIT_License
 * https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 *
 */
var mads = function () {
    /* Get Tracker */
    if (typeof custTracker == 'undefined' && typeof rma != 'undefined') {
        this.custTracker = rma.customize.custTracker;
    } else if (typeof custTracker != 'undefined') {
        this.custTracker = custTracker;
    } else {
        this.custTracker = [];
    }

    /* Unique ID on each initialise */
    this.id = this.uniqId();

    /* Tracked tracker */
    this.tracked = [];

    /* Body Tag */
    this.bodyTag = document.getElementsByTagName('body')[0];

    /* Head Tag */
    this.headTag = document.getElementsByTagName('head')[0];

    /* RMA Widget - Content Area */
    this.contentTag = document.getElementById('rma-widget');

    /* URL Path */
    this.path = typeof rma != 'undefined' ? rma.customize.src : '';
};

/* Generate unique ID */
mads.prototype.uniqId = function () {

    return new Date().getTime();
};

/* Link Opner */
mads.prototype.linkOpener = function (url) {

    if(typeof url != "undefined" && url !=""){
        if (typeof mraid !== 'undefined') {
            mraid.open(url);
        }else{
            window.open(url);
        }
    }
};

/* tracker */
mads.prototype.tracker = function (tt, type, name) {

    /* 
     * name is used to make sure that particular tracker is tracked for only once
     * there might have the same type in different location, so it will need the name to differentiate them
     */
    name = name || type;

    if ( typeof this.custTracker != 'undefined' && this.custTracker != '' && this.tracked.indexOf(name) == -1 ) {
        for (var i = 0; i < this.custTracker.length; i++) {
            var img = document.createElement('img');

            /* Insert Macro */
            var src = this.custTracker[i].replace('{{type}}', type);
            src = src.replace('{{tt}}', tt);
            /* */
            img.src = src + '&' + this.id;

            img.style.display = 'none';
            this.bodyTag.appendChild(img);

            this.tracked.push(name);
        }
    }
};

/* Load JS File */
mads.prototype.loadJs = function (js, callback) {
    var script = document.createElement('script');
    script.src = js;

    if (typeof callback != 'undefined') {
        script.onload = callback;
    }

    this.headTag.appendChild(script);
};

/* Load CSS File */
mads.prototype.loadCss = function (href) {
    var link = document.createElement('link');
    link.href = href;
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');

    this.headTag.appendChild(link);
};

/*
 *
 * Unit Testing for mads
 *
 */
var testunit = function () {
    var app = new mads();

    console.log(typeof app.bodyTag != 'undefined');
    console.log(typeof app.headTag != 'undefined');
    console.log(typeof app.custTracker != 'undefined');
    console.log(typeof app.path != 'undefined');
    console.log(typeof app.contentTag != 'undefined');

    app.loadJs('https://code.jquery.com/jquery-1.11.3.min.js',function () {
        console.log(typeof window.jQuery != 'undefined');
    });

    app.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css');

    app.contentTag.innerHTML =
        '<div class="container"><div class="jumbotron"> \
            <h1>Hello, world!</h1> \
            <p>...</p> \
            <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p> \
        </div></div>';

    app.custTracker = ['http://www.tracker.com?type={{type}}&tt={{tt}}','http://www.tracker2.com?type={{type}}'];

    app.tracker('CTR', 'test');
    app.tracker('E','test','name');

    app.linkOpener('http://www.google.com');
};

var msgObj = {
    firstScreenText : 'Skin appearing dark and dull due to  prolonged sun exposure, air conditioning or pollution?',
    secondScreenText : 'Try the new Vaseline Healthy White Instant Fair for a visibly fairer skin! To get started, wipe on her dark and dull skin with your finger. ',
    thirdScreenText : 'Restore your damaged skin from within.',
    fourthScreenText : 'Restore your damaged skin from within. <br/> Gain visibly fairer skin upon 1st application.',
    fifthScreen : {
        footerText : '*Within epidermis layer. <br/> **Compared to Vaseline Total Moisture variant, <br/> due to optical reflective effect of the micro reflector ingredients.',
        buttonText : 'FIND OUT MORE',
        messageText : 'Helps restore damaged skin from within*. <br/> Visibly fair skin upon 1st application**. '
    }
};

var video;

var VaselineAd = function () {
    // initialize MADS SDK
    this.sdk = new mads();
    var self = this;

    // Load local css
    this.sdk.loadCss( this.sdk.path + 'css/style.css');

    // Load local js
    this.sdk.loadJs( this.sdk.path + 'js/jquery.js', function () {
        self.sdk.loadJs( self.sdk.path + 'js/wipe.js');
        self.sdk.loadJs( self.sdk.path + 'js/ninjoe.ytComponent.js');
        self.renderFirstScreen();
    });
};

VaselineAd.prototype.renderFirstScreen = function () {
    var mainDiv = $('#rma-widget');
    var firstScreen = $('<div id="first-screen"></div>');

    mainDiv.append(firstScreen);
    var title = $('<div class="title"></div>');
    firstScreen.append(title);
    title.append('<div class="text">' + msgObj.firstScreenText + '</div>');

    var model = $('<div class="model-body"></div>');
    model.append('<div class="head sad"></div>')
        .append('<div class="head happy"></div>')
        .append('<div class="body"><img id="light-body" src="img/dark-body.png" /></div>')
        .append('<div class="body dark"><img id="dark-body" src="img/darker-body.png" /></div>');
    firstScreen.append(model);

    var sun = $('<div class="sun"></div>');
    firstScreen.append(sun);

    var wheelIndicator = $('<div class="indicator"></div>');
    var skinWheel = $('<div class="skin-wheel"></div>');
    firstScreen.append(skinWheel).append($('<div class="skin-wheel invisible"></div>').append(wheelIndicator));

    this.animateToSecondScreen(4000);
};

VaselineAd.prototype.animateToSecondScreen = function (timeout) {
    var self = this;
    setTimeout(function () {
        $('#light-body').attr('src', 'img/light-body.png');

        var title = $('#first-screen .title');
        title.html('');
        title.append('<div class="vaseline-bottle"></div>').append('<div class="msg">' + msgObj.secondScreenText + '</div>');

        var hand = $('<div id="hand"></div>');
        $('#first-screen').append(hand);

        $('#dark-body').on('mousedown', self.wipe);
        $('#dark-body').on('click', self.wipe);
        $('#dark-body').on('touchstart', self.wipe);
        $('#dark-body').trigger('click');
    }, timeout);
};

VaselineAd.prototype.wipe = function (e) {

    var sdk = new mads();
    
    $('#dark-body').eraser({
        size: 30,
        completeRatio: .6,
        completeFunction: wipeCompleted,
        progressFunction: function() {
            var canvas = $('canvas');
            var cursor;

            if (!$('#cursor').length) {
                canvas.on('click', moveCursor);
                canvas.on('mousedown', moveCursor);
                canvas.on('mousemove', moveCursor);
                canvas.on('touchstart', moveCursor);
                canvas.on('touchmove', moveCursor);
                canvas.on('touchend', cancelCursor);
                canvas.on('mouseup', cancelCursor);
                canvas.on('mousemoveend', cancelCursor);
                var x;
                document.addEventListener('mousemove', function() {
                    if (x) clearTimeout(x);
                    x = setTimeout(cancelCursor, 200);
                }, false);

                cursor = $('<div style="position: absolute; top: 330px; left: 100px;" id="cursor"><img src="img/vaseline-bottle-rotated.png" /></div>');
                $('#first-screen').append(cursor);
            }

            function moveCursor (e) {
                var x = e.clientX;
                var y = e.clientY;

                $('#hand').remove();
                cursor.css({
                    position: 'absolute',
                    top: (y - 80) + 'px',
                    left: (x - 50) + 'px'
                });
            }

            function cancelCursor () {
                $('#cursor').remove();
            }
        }
    });

    function wipeCompleted () {
        var head = $('#first-screen .model-body .head.happy');
        head.animate({
            opacity: 1
        }, 5000, function() {
            $('#first-screen .title').html('<div class="text"> ' + msgObj.fourthScreenText + ' </div>');
            $('#rma-widget').css({
                background: 'url("img/bg-blue.png") no-repeat'
            });
            $('#dark-body').remove();
        });

        $('#dark-body').animate({
            opacity: 0
        }, 5000, null);

        $('#first-screen .title').html('<div class="text"> ' + msgObj.thirdScreenText + ' </div>');

        $('#first-screen .skin-wheel.invisible .indicator').removeClass('indicator').addClass('indicator-on-dark');
        $('#first-screen .skin-wheel.invisible').removeClass('invisible').addClass('animate-back');

        showLastScreen(8000);
    }

    function showLastScreen (timeout) {
        
        setTimeout(function () {
            $('#first-screen .title').html('');
            $('#first-screen .sun').fadeOut(1000);
            $('#first-screen .model-body').addClass('animate-to-left').html('<img src="img/model.png" />');

            $('#first-screen').append('<div id="video"></div>');
            video = new ytComponent({
                'container' : 'video',
                'width' : '215',
                'height' : '130',
                'videoId' : 'gM61UMwe7PE'
            });

            var content = $('<div id="content"></div>');
            content.append($('<div class="img"><img src="img/vaseline-bottle.png" width="43" height="98" /></div>'));
            content.append($('<div class="message"> ' + msgObj.fifthScreen.messageText + ' </div>'));
            content.append($('<a id="btn" href="#">' + msgObj.fifthScreen.buttonText + '</a>'));
            $('#first-screen').append(content);

            var footer = $('<div id="footer">' + msgObj.fifthScreen.footerText + '</div>');
            $('#first-screen').append(footer);

            $('#content').on('click', function () {
                sdk.linkOpener('http://www.vaseline.com.my/');
            });
            
        }, timeout);
    }
};

function onYouTubeIframeAPIReady() {
    video.loadVideo();
}

var ad = new VaselineAd();