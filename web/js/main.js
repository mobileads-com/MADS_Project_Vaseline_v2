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
console.log(type);
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

    this.preloadImages(this.sdk.bodyTag);
};

VaselineAd.prototype.preloadImages = function (parent) {
    var script = document.createElement('SCRIPT');
    var str = '';

    str = str +
    'var pic1 = new Image();' +
    'var pic2 = new Image();' +
    'var pic3 = new Image();' +
    'var pic4 = new Image();' +
    'var pic5 = new Image();' +
    'var pic6 = new Image();' +
    'var pic7 = new Image();' +
    'var pic8 = new Image();' +
    'var pic9 = new Image();' +
    'var pic10 = new Image();' +
    'var pic11 = new Image();' +
    'var pic12 = new Image();' +
    'var pic13 = new Image();' +
    'var pic14 = new Image();' +
    'var pic15 = new Image();' +
    'var pic16 = new Image();' +
    'pic1.src="img/bg.png";' +
    'pic2.src="img/bg-blue.png";' +
    'pic3.src="img/btn-bg.png";' +
    'pic4.src="img/dark-body.png";' +
    'pic5.src="img/darker-body.png";' +
    'pic6.src="img/footer-bg.png";' +
    'pic7.src="img/hand.png";' +
    'pic8.src="img/happy-face.png";' +
    'pic9.src="img/indicator.png";' +
    'pic10.src="img/light-body.png";' +
    'pic11.src="img/model.png";' +
    'pic12.src="img/sad-face.png";' +
    'pic13.src="img/skin-wheel.png";' +
    'pic14.src="img/sun.png";' +
    'pic15.src="img/vaseline-bottle.png";' +
    'pic16.src="img/vaseline-bottle-rotated.png";';

    script.innerHTML = str;

    parent.appendChild(script);
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
        .append('<div class="body"><img id="light-body" src="' + this.sdk.path + 'img/dark-body.png" /></div>')
        .append('<div class="body dark"><img id="dark-body" src="' + this.sdk.path + 'img/darker-body.png" /></div>');
    firstScreen.append(model);

    var sun = $('<div class="sun"></div>');
    firstScreen.append(sun);

    var wheelIndicator = $('<div class="indicator"></div>');
    var skinWheel = $('<div class="skin-wheel"></div>');
    firstScreen.append(skinWheel).append($('<div class="skin-wheel invisible"></div>').append(wheelIndicator));

    this.animateToSecondScreen(5500);
};

VaselineAd.prototype.animateToSecondScreen = function (timeout) {
    var self = this;
    setTimeout(function () {
        $('#light-body').attr('src', self.sdk.path + 'img/light-body.png');

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

VaselineAd.prototype.wipe = function () {
    var sdk = new mads();
    var eventsBound = false;

    $('#dark-body').eraser({
        size: 30,
        completeRatio: .5,
        completeFunction: wipeCompleted,
        progressFunction: function() {
            var canvas = $('canvas');
            var cursor;

            bindEvents();

            if (!$('#cursor').length) {
                cursor = $('<div style="position: absolute; top: 330px; left: 100px;" id="cursor"><img src="' + sdk.path + 'img/vaseline-bottle-rotated.png" /></div>');
                $('#first-screen').append(cursor);
            }

            function moveCursor (e) {
                var x = e.clientX;
                var y = e.clientY;

                $('#hand').remove();
                $('#cursor').css({
                    position: 'absolute',
                    top: (y - 80) + 'px',
                    left: (x - 50) + 'px'
                });
            }

            function cancelCursor () {
                $('#cursor').remove();
            }

            function bindEvents() {
                if (!eventsBound) {
                    eventsBound = true;

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
                }
            }
        }
    });

    function wipeCompleted () {
        
        sdk.tracker('E', 'vv_wipe');
        var canvas = $('canvas');
        $('#cursor').remove();

        canvas.off('click');
        canvas.off('mousedown');
        canvas.off('mousemove');
        canvas.off('touchstart');
        canvas.off('touchmove');
        canvas.off('touchend');
        canvas.off('mouseup');
        canvas.off('mousemoveend');

        var head = $('#first-screen .model-body .head.happy');
        head.animate({
            opacity: 1
        }, 5000, function() {
            $('#first-screen .title').html('<div class="text"> ' + msgObj.fourthScreenText + ' </div>');
            $('#rma-widget').css({
                background: 'url("' + sdk.path + 'img/bg-blue.png") no-repeat'
            });
            $('#dark-body').remove();
        });

        $('#dark-body').animate({
            opacity: 0
        }, 500, null);

        $('#first-screen .title').html('<div class="text"> ' + msgObj.thirdScreenText + ' </div>');

        $('#first-screen .skin-wheel.invisible .indicator').removeClass('indicator').addClass('indicator-on-dark');
        $('#first-screen .skin-wheel.invisible').removeClass('invisible').addClass('animate-back');

        showLastScreen(8000);
    }

    function showLastScreen (timeout) {

        setTimeout(function () {
            $('#first-screen .title').html('');
            $('#first-screen .sun').fadeOut(1000);
            $('#first-screen .model-body').addClass('animate-to-left').html('<img src="'+sdk.path+'img/model.png" />');

            $('#first-screen').append('<div id="video"></div>');
            video = new ytComponent({
                'container' : 'video',
                'width' : '290',
                'height' : '170',
                'videoId' : '2KGpqyaL_OI',
                'tracker' : sdk
            });

            var content = $('<div id="content"></div>');
            content.append($('<div class="img"><img src="' + sdk.path + 'img/vaseline-bottle.png" width="43" height="98" /></div>'));
            content.append($('<div class="message"> ' + msgObj.fifthScreen.messageText + ' </div>'));
            content.append($('<a id="btn" href="#">' + msgObj.fifthScreen.buttonText + '</a>'));
            $('#first-screen').append(content);

            var footer = $('<div id="footer">' + msgObj.fifthScreen.footerText + '</div>');
            $('#first-screen').append(footer);

            var clickableArea = $('<div id="clickable"></div>');
            $('#first-screen').append(clickableArea);

            clickableArea.on('click', function () {
                sdk.tracker('CTR', 'vv_site');
                sdk.linkOpener('http://www.vaseline.com.my/');
            });

        }, timeout);
    }
};

function onYouTubeIframeAPIReady() {
    video.loadVideo();
}

var ad = new VaselineAd();