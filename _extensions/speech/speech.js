window.RevealSpeech = function () {
  return {
    id: "RevealSpeech",
    init: function (deck) {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.log('Browser must support webkitSpeechRecognition to use this plugin.');
        return;
      }

      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
      var recognition = new SpeechRecognition();

      const settings = deck.getConfig() ;
      const options = settings.speech ;
      console.log(options);

      var config = {
        nextKeyword: options.nextKeyword ? options.nextKeyword : 'gotonext',
        prevKeyword: options.prevKeyword ? options.prevKeyword : 'gotoprev',
        lastKeyword: options.lastKeyword ? options.lastKeyword : 'gotolast',
        firstKeyword: options.firstKeyword ? options.firstKeyword : 'gotofirst',
        debug: options.debug ? options.debug : false,
        lang: options.lang ? options.lang : ''
      };

      function configure(options) {
        recognition.stop();
        for (var key in options) {
          if (Object.keys(config).indexOf(key) === -1) {
            continue;
          }
          config[key] = options[key];
        }
        recognition.start();
      }

      var fragmentSpeech = {};
      var fragmentIndex = 0;
      var customNextSlidePhrase = null;

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = config.lang;

      deck.on('slidechanged', (event) => {
        fragmentIndex = 0;
        fragmentSpeech = {};
        if (!deck.isLastSlide()) {
          customNextSlidePhrase = event.currentSlide.getAttribute('data-speech-next');
        } else {
          customNextSlidePhrase = null;
        }
        var fragments = [].slice.call(event.currentSlide.getElementsByClassName('fragment')).filter(function (fragment) {
          return fragment.getAttribute('data-speech') !== null;
        });
        if (fragments.length === 0) {
          return;
        }
        var fragment;
        for (var i = 0; i < fragments.length; i++) {
          fragment = fragments[i];
          fragmentSpeech[fragment.getAttribute('data-fragment-index')] = fragment.getAttribute('data-speech').toLowerCase();
        }
        if (config.debug) {
          console.log(customNextSlidePhrase);
          console.log(fragmentSpeech);
        }
      });

      deck.on('fragmentshown', (event) => {
        fragmentIndex++;
      });

      deck.on('fragmenthidden', (event) => {
        fragmentIndex--;
      });

      recognition.onresult = function (event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            handleTranscript(event.results[i][0].transcript);
          }
        }
      };

      function handleTranscript(transcript) {
        transcript = transcript.toLowerCase().split(' ').join('');
        if (transcript.includes(config.nextKeyword) || (customNextSlidePhrase !== null && transcript.includes(customNextSlidePhrase))) {
          deck.next();
        } else if (transcript.includes(config.prevKeyword)) {
          deck.prev();
        } else if (transcript.includes(config.lastKeyword)) {
          deck.slide(Number.MAX_VALUE);
        } else if (transcript.includes(config.firstKeyword)) {
          deck.slide(0);
        }
        // TODO - goto specific slide number

        if (Object.keys(fragmentSpeech).length > 0 && transcript.includes(fragmentSpeech[fragmentIndex])) {
          deck.nextFragment();
        }

        if (config.debug) {
          console.log(transcript);
        }
      };

      deck.on('ready', (event) => {
        // event.currentSlide, event.indexh, event.indexv
        return configure()
      });

    }
  };
};