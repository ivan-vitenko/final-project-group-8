// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/jquery.flexslider-min.js":[function(require,module,exports) {
/*
 * jQuery FlexSlider v1.7
 * http://flex.madebymufffin.com
 * Copyright 2011, Tyler Smith
 * Free to use under the MIT license.
 */
(function (a) {
  a.flexslider = function (c, b) {
    var d = c;

    d.init = function () {
      d.vars = a.extend({}, a.flexslider.defaults, b);
      d.data('flexslider', true);
      d.container = a('.slides', d);
      d.slides = a('.slides > li', d);
      d.count = d.slides.length;
      d.animating = false;
      d.currentSlide = d.vars.slideToStart;
      d.animatingTo = d.currentSlide;
      d.atEnd = d.currentSlide == 0 ? true : false;
      d.eventType = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
      d.cloneCount = 0;
      d.cloneOffset = 0;

      if (d.vars.controlsContainer != '') {
        d.controlsContainer = a(d.vars.controlsContainer).eq(a('.slides').index(d.container));
        d.containerExists = d.controlsContainer.length > 0;
      }

      if (d.vars.manualControls != '') {
        d.manualControls = a(d.vars.manualControls, d.containerExists ? d.controlsContainer : d);
        d.manualExists = d.manualControls.length > 0;
      }

      if (d.vars.randomize) {
        d.slides.sort(function () {
          return Math.round(Math.random()) - 0.5;
        });
        d.container.empty().append(d.slides);
      }

      if (d.vars.animation.toLowerCase() == 'slide') {
        d.css({
          overflow: 'hidden'
        });

        if (d.vars.animationLoop) {
          d.cloneCount = 2;
          d.cloneOffset = 1;
          d.container.append(d.slides.filter(':first').clone().addClass('clone')).prepend(d.slides.filter(':last').clone().addClass('clone'));
        }

        d.container.width((d.count + d.cloneCount) * d.width() + 2000);
        d.newSlides = a('.slides > li', d);
        setTimeout(function () {
          d.newSlides.width(d.width()).css({
            float: 'left'
          }).show();
        }, 100);
        d.container.css({
          marginLeft: -1 * (d.currentSlide + d.cloneOffset) * d.width() + 'px'
        });
      } else {
        d.slides.css({
          width: '100%',
          float: 'left',
          marginRight: '-100%'
        }).eq(d.currentSlide).fadeIn(400);
      }

      if (d.vars.controlNav) {
        if (d.manualExists) {
          d.controlNav = d.manualControls;
        } else {
          var g = a('<ol class="flex-control-nav"></ol>');
          var k = 1;

          for (var l = 0; l < d.count; l++) {
            g.append('<li><a>' + k + '</a></li>');
            k++;
          }

          if (d.containerExists) {
            a(d.controlsContainer).append(g);
            d.controlNav = a('.flex-control-nav li a', d.controlsContainer);
          } else {
            d.append(g);
            d.controlNav = a('.flex-control-nav li a', d);
          }
        }

        d.controlNav.eq(d.currentSlide).addClass('active');
        d.controlNav.bind(d.eventType, function (i) {
          i.preventDefault();

          if (!a(this).hasClass('active')) {
            d.flexAnimate(d.controlNav.index(a(this)), d.vars.pauseOnAction);
          }
        });
      }

      if (d.vars.directionNav) {
        var f = a('<ul class="flex-direction-nav"><li><a class="prev" href="#">' + d.vars.prevText + '</a></li><li><a class="next" href="#">' + d.vars.nextText + '</a></li></ul>');

        if (d.containerExists) {
          a(d.controlsContainer).append(f);
          d.directionNav = a('.flex-direction-nav li a', d.controlsContainer);
        } else {
          d.append(f);
          d.directionNav = a('.flex-direction-nav li a', d);
        }

        if (!d.vars.animationLoop) {
          if (d.currentSlide == 0) {
            d.directionNav.filter('.prev').addClass('disabled');
          } else {
            if (d.currentSlide == d.count - 1) {
              d.directionNav.filter('.next').addClass('disabled');
            }
          }
        }

        d.directionNav.bind(d.eventType, function (i) {
          i.preventDefault();
          var j = a(this).hasClass('next') ? d.getTarget('next') : d.getTarget('prev');

          if (d.canAdvance(j)) {
            d.flexAnimate(j, d.vars.pauseOnAction);
          }
        });
      }

      if (d.vars.keyboardNav && a('ul.slides').length == 1) {
        a(document).keyup(function (i) {
          if (d.animating) {
            return;
          } else {
            if (i.keyCode != 39 && i.keyCode != 37) {
              return;
            } else {
              if (i.keyCode == 39) {
                var j = d.getTarget('next');
              } else {
                if (i.keyCode == 37) {
                  var j = d.getTarget('prev');
                }
              }

              if (d.canAdvance(j)) {
                d.flexAnimate(j, d.vars.pauseOnAction);
              }
            }
          }
        });
      }

      if (d.vars.slideshow) {
        if (d.vars.pauseOnHover && d.vars.slideshow) {
          d.hover(function () {
            d.pause();
          }, function () {
            d.resume();
          });
        }

        d.animatedSlides = setInterval(d.animateSlides, d.vars.slideshowSpeed);
      }

      if (d.vars.pausePlay) {
        var e = a('<div class="flex-pauseplay"><span></span></div>');

        if (d.containerExists) {
          d.controlsContainer.append(e);
          d.pausePlay = a('.flex-pauseplay span', d.controlsContainer);
        } else {
          d.append(e);
          d.pausePlay = a('.flex-pauseplay span', d);
        }

        var h = d.vars.slideshow ? 'pause' : 'play';
        d.pausePlay.addClass(h).text(h == 'pause' ? d.vars.pauseText : d.vars.playText);
        d.pausePlay.click(function (i) {
          i.preventDefault();
          a(this).hasClass('pause') ? d.pause() : d.resume();
        });
      }

      if (d.vars.touchSwipe && 'ontouchstart' in document.documentElement) {
        d.each(function () {
          var i,
              j = 20;
          isMoving = false;

          function o() {
            this.removeEventListener('touchmove', m);
            i = null;
            isMoving = false;
          }

          function m(s) {
            if (isMoving) {
              var p = s.touches[0].pageX,
                  q = i - p;

              if (Math.abs(q) >= j) {
                o();
                var r = q > 0 ? d.getTarget('next') : d.getTarget('prev');

                if (d.canAdvance(r)) {
                  d.flexAnimate(r, d.vars.pauseOnAction);
                }
              }
            }
          }

          function n(p) {
            if (p.touches.length == 1) {
              i = p.touches[0].pageX;
              isMoving = true;
              this.addEventListener('touchmove', m, false);
            }
          }

          if ('ontouchstart' in document.documentElement) {
            this.addEventListener('touchstart', n, false);
          }
        });
      }

      if (d.vars.animation.toLowerCase() == 'slide') {
        d.sliderTimer;
        a(window).resize(function () {
          d.newSlides.width(d.width());
          d.container.width((d.count + d.cloneCount) * d.width() + 2000);
          clearTimeout(d.sliderTimer);
          d.sliderTimer = setTimeout(function () {
            d.flexAnimate(d.currentSlide);
          }, 300);
        });
      }

      d.vars.start(d);
    };

    d.flexAnimate = function (f, e) {
      if (!d.animating) {
        d.animating = true;
        d.animatingTo = f;
        d.vars.before(d);

        if (e) {
          d.pause();
        }

        if (d.vars.controlNav) {
          d.controlNav.removeClass('active').eq(f).addClass('active');
        }

        d.atEnd = f == 0 || f == d.count - 1 ? true : false;

        if (!d.vars.animationLoop && d.vars.directionNav) {
          if (f == 0) {
            d.directionNav.removeClass('disabled').filter('.prev').addClass('disabled');
          } else {
            if (f == d.count - 1) {
              d.directionNav.removeClass('disabled').filter('.next').addClass('disabled');
            } else {
              d.directionNav.removeClass('disabled');
            }
          }
        }

        if (!d.vars.animationLoop && f == d.count - 1) {
          d.pause();
          d.vars.end(d);
        }

        if (d.vars.animation.toLowerCase() == 'slide') {
          if (d.currentSlide == 0 && f == d.count - 1 && d.vars.animationLoop && d.direction != 'next') {
            d.slideString = '0px';
          } else {
            if (d.currentSlide == d.count - 1 && f == 0 && d.vars.animationLoop && d.direction != 'prev') {
              d.slideString = -1 * (d.count + 1) * d.slides.filter(':first').width() + 'px';
            } else {
              d.slideString = -1 * (f + d.cloneOffset) * d.slides.filter(':first').width() + 'px';
            }
          }

          d.container.animate({
            marginLeft: d.slideString
          }, d.vars.animationDuration, function () {
            if (d.currentSlide == 0 && f == d.count - 1 && d.vars.animationLoop) {
              d.container.css({
                marginLeft: -1 * d.count * d.slides.filter(':first').width() + 'px'
              });
            } else {
              if (d.currentSlide == d.count - 1 && f == 0 && d.vars.animationLoop) {
                d.container.css({
                  marginLeft: -1 * d.slides.filter(':first').width() + 'px'
                });
              }
            }

            d.animating = false;
            d.currentSlide = f;
            d.vars.after(d);
          });
        } else {
          d.slides.eq(d.currentSlide).fadeOut(d.vars.animationDuration);
          d.slides.eq(f).fadeIn(d.vars.animationDuration, function () {
            d.animating = false;
            d.currentSlide = f;
            d.vars.after(d);
          });
        }
      }
    };

    d.animateSlides = function () {
      if (!d.animating) {
        var e = d.currentSlide == d.count - 1 ? 0 : d.currentSlide + 1;
        d.flexAnimate(e);
      }
    };

    d.pause = function () {
      clearInterval(d.animatedSlides);

      if (d.vars.pausePlay) {
        d.pausePlay.removeClass('pause').addClass('play').text(d.vars.playText);
      }
    };

    d.resume = function () {
      d.animatedSlides = setInterval(d.animateSlides, d.vars.slideshowSpeed);

      if (d.vars.pausePlay) {
        d.pausePlay.removeClass('play').addClass('pause').text(d.vars.pauseText);
      }
    };

    d.canAdvance = function (e) {
      if (!d.vars.animationLoop && d.atEnd) {
        if (d.currentSlide == 0 && e == d.count - 1 && d.direction != 'next') {
          return false;
        } else {
          if (d.currentSlide == d.count - 1 && e == 0 && d.direction == 'next') {
            return false;
          } else {
            return true;
          }
        }
      } else {
        return true;
      }
    };

    d.getTarget = function (e) {
      d.direction = e;

      if (e == 'next') {
        return d.currentSlide == d.count - 1 ? 0 : d.currentSlide + 1;
      } else {
        return d.currentSlide == 0 ? d.count - 1 : d.currentSlide - 1;
      }
    };

    d.init();
  };

  a.flexslider.defaults = {
    animation: 'fade',
    slideshow: true,
    slideshowSpeed: 7000,
    animationDuration: 600,
    directionNav: true,
    controlNav: true,
    keyboardNav: true,
    touchSwipe: true,
    prevText: 'Назад',
    nextText: 'Вперед',
    pausePlay: false,
    pauseText: 'Pause',
    playText: 'Play',
    randomize: false,
    slideToStart: 0,
    animationLoop: true,
    pauseOnAction: true,
    pauseOnHover: false,
    controlsContainer: '',
    manualControls: '',
    start: function start() {},
    before: function before() {},
    after: function after() {},
    end: function end() {}
  };

  a.fn.flexslider = function (b) {
    return this.each(function () {
      if (a(this).find('.slides li').length == 1) {
        a(this).find('.slides li').fadeIn(400);
      } else {
        if (a(this).data('flexslider') != true) {
          new a.flexslider(a(this), b);
        }
      }
    });
  };
})(jQuery);
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46495" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/jquery.flexslider-min.js"], null)
//# sourceMappingURL=/jquery.flexslider-min.c5b6b04d.js.map