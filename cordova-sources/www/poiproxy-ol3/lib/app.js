/** FILE: pace.min.js **/
/*! pace 0.5.3 */
(function() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W = [].slice,
        X = {}.hasOwnProperty,
        Y = function(a, b) {
            function c() {
                this.constructor = a
            }
            for (var d in b) X.call(b, d) && (a[d] = b[d]);
            return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
        },
        Z = [].indexOf ||
        function(a) {
            for (var b = 0, c = this.length; c > b; b++) if (b in this && this[b] === a) return b;
            return -1
        };
    for (t = {
        catchupTime: 500,
        initialRate: .03,
        minTime: 500,
        ghostTime: 500,
        maxProgressPerFrame: 10,
        easeFactor: 1.25,
        startOnPageLoad: !0,
        restartOnPushState: !0,
        restartOnRequestAfter: 500,
        target: "body",
        elements: {
            checkInterval: 100,
            selectors: ["body"]
        },
        eventLag: {
            minSamples: 10,
            sampleCount: 3,
            lagThreshold: 3
        },
        ajax: {
            trackMethods: ["GET"],
            trackWebSockets: !0,
            ignoreURLs: []
        }
    }, B = function() {
        var a;
        return null != (a = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? a : +new Date
    }, D = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, s = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == D && (D = function(a) {
        return setTimeout(a, 50)
    }, s = function(a) {
        return clearTimeout(a)
    }), F = function(a) {
        var b, c;
        return b = B(), (c = function() {
            var d;
            return d = B() - b, d >= 33 ? (b = B(), a(d, function() {
                return D(c)
            })) : setTimeout(c, 33 - d)
        })()
    }, E = function() {
        var a, b, c;
        return c = arguments[0], b = arguments[1], a = 3 <= arguments.length ? W.call(arguments, 2) : [], "function" == typeof c[b] ? c[b].apply(c, a) : c[b]
    }, u = function() {
        var a, b, c, d, e, f, g;
        for (b = arguments[0], d = 2 <= arguments.length ? W.call(arguments, 1) : [], f = 0, g = d.length; g > f; f++) if (c = d[f]) for (a in c) X.call(c, a) && (e = c[a], null != b[a] && "object" == typeof b[a] && null != e && "object" == typeof e ? u(b[a], e) : b[a] = e);
        return b
    }, p = function(a) {
        var b, c, d, e, f;
        for (c = b = 0, e = 0, f = a.length; f > e; e++) d = a[e], c += Math.abs(d), b++;
        return c / b
    }, w = function(a, b) {
        var c, d, e;
        if (null == a && (a = "options"), null == b && (b = !0), e = document.querySelector("[data-pace-" + a + "]")) {
            if (c = e.getAttribute("data-pace-" + a), !b) return c;
            try {
                return JSON.parse(c)
            } catch (f) {
                return d = f, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", d) : void 0
            }
        }
    }, g = function() {
        function a() {}
        return a.prototype.on = function(a, b, c, d) {
            var e;
            return null == d && (d = !1), null == this.bindings && (this.bindings = {}), null == (e = this.bindings)[a] && (e[a] = []), this.bindings[a].push({
                handler: b,
                ctx: c,
                once: d
            })
        }, a.prototype.once = function(a, b, c) {
            return this.on(a, b, c, !0)
        }, a.prototype.off = function(a, b) {
            var c, d, e;
            if (null != (null != (d = this.bindings) ? d[a] : void 0)) {
                if (null == b) return delete this.bindings[a];
                for (c = 0, e = []; c < this.bindings[a].length;) e.push(this.bindings[a][c].handler === b ? this.bindings[a].splice(c, 1) : c++);
                return e
            }
        }, a.prototype.trigger = function() {
            var a, b, c, d, e, f, g, h, i;
            if (c = arguments[0], a = 2 <= arguments.length ? W.call(arguments, 1) : [], null != (g = this.bindings) ? g[c] : void 0) {
                for (e = 0, i = []; e < this.bindings[c].length;) h = this.bindings[c][e], d = h.handler, b = h.ctx, f = h.once, d.apply(null != b ? b : this, a), i.push(f ? this.bindings[c].splice(e, 1) : e++);
                return i
            }
        }, a
    }(), null == window.Pace && (window.Pace = {}), u(Pace, g.prototype), C = Pace.options = u({}, t, window.paceOptions, w()), T = ["ajax", "document", "eventLag", "elements"], P = 0, R = T.length; R > P; P++) J = T[P], C[J] === !0 && (C[J] = t[J]);
    i = function(a) {
        function b() {
            return U = b.__super__.constructor.apply(this, arguments)
        }
        return Y(b, a), b
    }(Error), b = function() {
        function a() {
            this.progress = 0
        }
        return a.prototype.getElement = function() {
            var a;
            if (null == this.el) {
                if (a = document.querySelector(C.target), !a) throw new i;
                this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != a.firstChild ? a.insertBefore(this.el, a.firstChild) : a.appendChild(this.el)
            }
            return this.el
        }, a.prototype.finish = function() {
            var a;
            return a = this.getElement(), a.className = a.className.replace("pace-active", ""), a.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done"
        }, a.prototype.update = function(a) {
            return this.progress = a, this.render()
        }, a.prototype.destroy = function() {
            try {
                this.getElement().parentNode.removeChild(this.getElement())
            } catch (a) {
                i = a
            }
            return this.el = void 0
        }, a.prototype.render = function() {
            var a, b;
            return null == document.querySelector(C.target) ? !1 : (a = this.getElement(), a.children[0].style.width = "" + this.progress + "%", (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (a.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? b = "99" : (b = this.progress < 10 ? "0" : "", b += 0 | this.progress), a.children[0].setAttribute("data-progress", "" + b)), this.lastRenderedProgress = this.progress)
        }, a.prototype.done = function() {
            return this.progress >= 100
        }, a
    }(), h = function() {
        function a() {
            this.bindings = {}
        }
        return a.prototype.trigger = function(a, b) {
            var c, d, e, f, g;
            if (null != this.bindings[a]) {
                for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++) c = f[d], g.push(c.call(this, b));
                return g
            }
        }, a.prototype.on = function(a, b) {
            var c;
            return null == (c = this.bindings)[a] && (c[a] = []), this.bindings[a].push(b)
        }, a
    }(), O = window.XMLHttpRequest, N = window.XDomainRequest, M = window.WebSocket, v = function(a, b) {
        var c, d, e, f;
        f = [];
        for (d in b.prototype) try {
            e = b.prototype[d], f.push(null == a[d] && "function" != typeof e ? a[d] = e : void 0)
        } catch (g) {
            c = g
        }
        return f
    }, z = [], Pace.ignore = function() {
        var a, b, c;
        return b = arguments[0], a = 2 <= arguments.length ? W.call(arguments, 1) : [], z.unshift("ignore"), c = b.apply(null, a), z.shift(), c
    }, Pace.track = function() {
        var a, b, c;
        return b = arguments[0], a = 2 <= arguments.length ? W.call(arguments, 1) : [], z.unshift("track"), c = b.apply(null, a), z.shift(), c
    }, I = function(a) {
        var b;
        if (null == a && (a = "GET"), "track" === z[0]) return "force";
        if (!z.length && C.ajax) {
            if ("socket" === a && C.ajax.trackWebSockets) return !0;
            if (b = a.toUpperCase(), Z.call(C.ajax.trackMethods, b) >= 0) return !0
        }
        return !1
    }, j = function(a) {
        function b() {
            var a, c = this;
            b.__super__.constructor.apply(this, arguments), a = function(a) {
                var b;
                return b = a.open, a.open = function(d, e) {
                    return I(d) && c.trigger("request", {
                        type: d,
                        url: e,
                        request: a
                    }), b.apply(a, arguments)
                }
            }, window.XMLHttpRequest = function(b) {
                var c;
                return c = new O(b), a(c), c
            }, v(window.XMLHttpRequest, O), null != N && (window.XDomainRequest = function() {
                var b;
                return b = new N, a(b), b
            }, v(window.XDomainRequest, N)), null != M && C.ajax.trackWebSockets && (window.WebSocket = function(a, b) {
                var d;
                return d = null != b ? new M(a, b) : new M(a), I("socket") && c.trigger("request", {
                    type: "socket",
                    url: a,
                    protocols: b,
                    request: d
                }), d
            }, v(window.WebSocket, M))
        }
        return Y(b, a), b
    }(h), Q = null, x = function() {
        return null == Q && (Q = new j), Q
    }, H = function(a) {
        var b, c, d, e;
        for (e = C.ajax.ignoreURLs, c = 0, d = e.length; d > c; c++) if (b = e[c], "string" == typeof b) {
            if (-1 !== a.indexOf(b)) return !0
        } else if (b.test(a)) return !0;
        return !1
    }, x().on("request", function(b) {
        var c, d, e, f, g;
        return f = b.type, e = b.request, g = b.url, H(g) ? void 0 : Pace.running || C.restartOnRequestAfter === !1 && "force" !== I(f) ? void 0 : (d = arguments, c = C.restartOnRequestAfter || 0, "boolean" == typeof c && (c = 0), setTimeout(function() {
            var b, c, g, h, i, j;
            if (b = "socket" === f ? e.readyState < 2 : 0 < (h = e.readyState) && 4 > h) {
                for (Pace.restart(), i = Pace.sources, j = [], c = 0, g = i.length; g > c; c++) {
                    if (J = i[c], J instanceof a) {
                        J.watch.apply(J, d);
                        break
                    }
                    j.push(void 0)
                }
                return j
            }
        }, c))
    }), a = function() {
        function a() {
            var a = this;
            this.elements = [], x().on("request", function() {
                return a.watch.apply(a, arguments)
            })
        }
        return a.prototype.watch = function(a) {
            var b, c, d, e;
            return d = a.type, b = a.request, e = a.url, H(e) ? void 0 : (c = "socket" === d ? new m(b) : new n(b), this.elements.push(c))
        }, a
    }(), n = function() {
        function a(a) {
            var b, c, d, e, f, g, h = this;
            if (this.progress = 0, null != window.ProgressEvent) for (c = null, a.addEventListener("progress", function(a) {
                return h.progress = a.lengthComputable ? 100 * a.loaded / a.total : h.progress + (100 - h.progress) / 2
            }), g = ["load", "abort", "timeout", "error"], d = 0, e = g.length; e > d; d++) b = g[d], a.addEventListener(b, function() {
                return h.progress = 100
            });
            else f = a.onreadystatechange, a.onreadystatechange = function() {
                var b;
                return 0 === (b = a.readyState) || 4 === b ? h.progress = 100 : 3 === a.readyState && (h.progress = 50), "function" == typeof f ? f.apply(null, arguments) : void 0
            }
        }
        return a
    }(), m = function() {
        function a(a) {
            var b, c, d, e, f = this;
            for (this.progress = 0, e = ["error", "open"], c = 0, d = e.length; d > c; c++) b = e[c], a.addEventListener(b, function() {
                return f.progress = 100
            })
        }
        return a
    }(), d = function() {
        function a(a) {
            var b, c, d, f;
            for (null == a && (a = {}), this.elements = [], null == a.selectors && (a.selectors = []), f = a.selectors, c = 0, d = f.length; d > c; c++) b = f[c], this.elements.push(new e(b))
        }
        return a
    }(), e = function() {
        function a(a) {
            this.selector = a, this.progress = 0, this.check()
        }
        return a.prototype.check = function() {
            var a = this;
            return document.querySelector(this.selector) ? this.done() : setTimeout(function() {
                return a.check()
            }, C.elements.checkInterval)
        }, a.prototype.done = function() {
            return this.progress = 100
        }, a
    }(), c = function() {
        function a() {
            var a, b, c = this;
            this.progress = null != (b = this.states[document.readyState]) ? b : 100, a = document.onreadystatechange, document.onreadystatechange = function() {
                return null != c.states[document.readyState] && (c.progress = c.states[document.readyState]), "function" == typeof a ? a.apply(null, arguments) : void 0
            }
        }
        return a.prototype.states = {
            loading: 0,
            interactive: 50,
            complete: 100
        }, a
    }(), f = function() {
        function a() {
            var a, b, c, d, e, f = this;
            this.progress = 0, a = 0, e = [], d = 0, c = B(), b = setInterval(function() {
                var g;
                return g = B() - c - 50, c = B(), e.push(g), e.length > C.eventLag.sampleCount && e.shift(), a = p(e), ++d >= C.eventLag.minSamples && a < C.eventLag.lagThreshold ? (f.progress = 100, clearInterval(b)) : f.progress = 100 * (3 / (a + 3))
            }, 50)
        }
        return a
    }(), l = function() {
        function a(a) {
            this.source = a, this.last = this.sinceLastUpdate = 0, this.rate = C.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = E(this.source, "progress"))
        }
        return a.prototype.tick = function(a, b) {
            var c;
            return null == b && (b = E(this.source, "progress")), b >= 100 && (this.done = !0), b === this.last ? this.sinceLastUpdate += a : (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / C.catchupTime, this.sinceLastUpdate = 0, this.last = b), b > this.progress && (this.progress += this.catchup * a), c = 1 - Math.pow(this.progress / 100, C.easeFactor), this.progress += c * this.rate * a, this.progress = Math.min(this.lastProgress + C.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
        }, a
    }(), K = null, G = null, q = null, L = null, o = null, r = null, Pace.running = !1, y = function() {
        return C.restartOnPushState ? Pace.restart() : void 0
    }, null != window.history.pushState && (S = window.history.pushState, window.history.pushState = function() {
        return y(), S.apply(window.history, arguments)
    }), null != window.history.replaceState && (V = window.history.replaceState, window.history.replaceState = function() {
        return y(), V.apply(window.history, arguments)
    }), k = {
        ajax: a,
        elements: d,
        document: c,
        eventLag: f
    }, (A = function() {
        var a, c, d, e, f, g, h, i;
        for (Pace.sources = K = [], g = ["ajax", "elements", "document", "eventLag"], c = 0, e = g.length; e > c; c++) a = g[c], C[a] !== !1 && K.push(new k[a](C[a]));
        for (i = null != (h = C.extraSources) ? h : [], d = 0, f = i.length; f > d; d++) J = i[d], K.push(new J(C));
        return Pace.bar = q = new b, G = [], L = new l
    })(), Pace.stop = function() {
        return Pace.trigger("stop"), Pace.running = !1, q.destroy(), r = !0, null != o && ("function" == typeof s && s(o), o = null), A()
    }, Pace.restart = function() {
        return Pace.trigger("restart"), Pace.stop(), Pace.start()
    }, Pace.go = function() {
        var a;
        return Pace.running = !0, q.render(), a = B(), r = !1, o = F(function(b, c) {
            var d, e, f, g, h, i, j, k, m, n, o, p, s, t, u, v;
            for (k = 100 - q.progress, e = o = 0, f = !0, i = p = 0, t = K.length; t > p; i = ++p) for (J = K[i], n = null != G[i] ? G[i] : G[i] = [], h = null != (v = J.elements) ? v : [J], j = s = 0, u = h.length; u > s; j = ++s) g = h[j], m = null != n[j] ? n[j] : n[j] = new l(g), f &= m.done, m.done || (e++, o += m.tick(b));
            return d = o / e, q.update(L.tick(b, d)), q.done() || f || r ? (q.update(100), Pace.trigger("done"), setTimeout(function() {
                return q.finish(), Pace.running = !1, Pace.trigger("hide")
            }, Math.max(C.ghostTime, Math.max(C.minTime - (B() - a), 0)))) : c()
        })
    }, Pace.start = function(a) {
        u(C, a), Pace.running = !0;
        try {
            q.render()
        } catch (b) {
            i = b
        }
        return document.querySelector(".pace") ? (Pace.trigger("start"), Pace.go()) : setTimeout(Pace.start, 50)
    }, "function" == typeof define && define.amd ? define(function() {
        return Pace
    }) : "object" == typeof exports ? module.exports = Pace : C.startOnPageLoad && Pace.start()
}).call(this);
/** FILE: LayersControl.js **/
if (!window.app) {
  window.app = {};
}
var app = window.app;

/**
 * @class
 * The LayersControl is a layer switcher that can be configured with groups.
 * A minimal configuration is:
 *
 *     new app.LayersControl()
 *
 * In this case, all layers are shown with checkboxes and in a single list.
 * If you want to group layers in separate lists, you can configure the control
 * with a groups config option, for example:
 *
 *     new app.LayersControl({
 *       groups: {
 *         background: {
 *           title: "Base Layers",
 *           exclusive: true
 *         },
 *         default: {
 *           title: "Overlays"
 *         }
 *       }
 *     })
 *
 * Layers that have their 'group' property set to 'background', will be part of
 * the first list. The list will be titled 'Base Layers'. The title is
 * optional. All other layers will be part of the default list. Configure a
 * group with exclusive true to get a radio group.
 *
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object} opt_options Options.
 */
app.LayersControl = function(opt_options) {
  this.defaultGroup = "default";
  var options = opt_options || {};
  var element = document.createElement('div');
  element.className = 'layers-control ol-unselectable';
  if (options.groups) {
    this.groups = options.groups;
    if (!this.groups[this.defaultGroup]) {
      this.groups[this.defaultGroup] = {};
    }
  } else {
    this.groups = {};
    this.groups[this.defaultGroup] = {};
  }
  this.containers = {};
  for (var group in this.groups) {
    this.containers[group] = document.createElement('ul');
    if (this.groups[group].title) {
      $(this.containers[group]).html(this.groups[group].title);
    }
    element.appendChild(this.containers[group]);
  }
  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });
};

ol.inherits(app.LayersControl, ol.control.Control);

/**
 * Remove the control from its current map and attach it to the new map.
 * Here we create the markup for our layer switcher component.
 * @param {ol.Map} map Map.
 */
app.LayersControl.prototype.setMap = function(map) {
  ol.control.Control.prototype.setMap.call(this, map);
  var layers = map.getLayers().getArray();
  for (var i=0, ii=layers.length; i < ii; ++i) {
    var layer = layers[i];
    var title = layer.get('title');
    var group = layer.get('group') || this.defaultGroup;
    if (title) {
      var item = document.createElement('li');
      if (this.groups[group] && this.groups[group].exclusive === true) {
        $('<input />', {type: 'radio', name: group, value: title, checked:
          layer.get('visible')}).
          change([map, layer, group], function(evt) {
            var map = evt.data[0];
            var layers = map.getLayers().getArray();
            for (var i=0, ii=layers.length; i<ii; ++i) {
              if (layers[i].get("group") == evt.data[2]) {
                layers[i].set('visible', false);
              }
            }
            var layer = evt.data[1];
            layer.set('visible', $(this).is(':checked'));
          }).appendTo(item);
        $('<span />').html(title).appendTo(item);
        this.containers[group].appendChild(item);
      } else {
        $('<input />', {type: 'checkbox', checked: layer.get('visible')}).
          change(layer, function(evt) {
            evt.data.set('visible', $(this).is(':checked'));
          }).appendTo(item);
        $('<span />').html(title).appendTo(item);
        if (this.containers[group]) {
          this.containers[group].appendChild(item);
        } else if (this.containers[this.defaultGroup]) {
          this.containers[this.defaultGroup].appendChild(item);
        }
      }
    }
  }
};

/** FILE: TransactionHandler.js **/
if (!window.app) {
  window.app = {};
}
var app = window.app;

/**
 * Options for app.TransactionHandler.
 * @typedef {Object} TransactionHandlerOptions
 * @property {ol.source.Vector} source - The vector source to use for the
 * features.
 * @property {ol.geom.GeometryType} geometryType - The type of geometry.
 * @property {string} geometryName  - The name of the geometry attribute.
 * @property {string} srsName - The srsName to use (normally the
 * view's projection).
 * @property {string} featureNS - The feature namespace.
 * @property {string} featureType - The name of the featureType.
 * @property {string} url - The url of the Web Feature Service.
 * @property {ol.Map} map - The map to interact with.
 */

/**
 * @class
 * The TransactionHandler is a helper class to facilitate inserts, updates
 * and deletes using WFS-T.
 *
 * @constructor
 * @param {TransactionHandlerOptions} options Options.
 */
app.TransactionHandler = function(options) {
  this.srsName_ = options.srsName;
  this.source_ = options.source;
  this.geometryType_ = options.geometryType;
  this.geometryName_ = options.geometryName;
  this.url_ = options.url;
  this.map_ = options.map;
  this.featureNS_ = options.featureNS;
  this.featureType_ = options.featureType;
  this.draw_ = new ol.interaction.Draw({
    source: this.source_,
    'type': this.geometryType_,
    geometryName: this.geometryName_
  });
  this.hasDraw_ = false;
  this.select_ = new ol.interaction.Select();
  this.modify_ = new ol.interaction.Modify({
    features: this.select_.getFeatures()
  });
  this.select_.getFeatures().on('add', this.onSelectAdd_, this);
  this.select_.getFeatures().on('remove', this.onSelectRemove_, this);
  this.dirty_ = {};
  this.map_.addInteraction(this.select_);
  this.map_.addInteraction(this.modify_);
  this.format_ = new ol.format.WFS();
  this.serializer_ = new XMLSerializer();
  this.draw_.on('drawend', this.onDrawEnd, this);
};

/**
 * Get a reference to the select interaction.
 * @returns {ol.interaction.Select}
 */
app.TransactionHandler.prototype.getSelect = function() {
  return this.select_;
};

/**
 * Handler for when a featue gets selected. Register a change listener on the
 * feature to see if it got modified.
 * @param {ol.CollectionEvent} evt The event object.
 */
app.TransactionHandler.prototype.onSelectAdd_ = function(evt) {
  var feature = evt.element;
  var fid = feature.getId();
  feature.on('change', function(evt) {
    this.dirty_[evt.target.getId()] = true;
  }, this);
};

/**
 * Handler for when a featue gets unselected. If the feature is dirty, send
 * a WFS Update transaction.
 * @param {ol.CollectionEvent} evt The event object.
 */
app.TransactionHandler.prototype.onSelectRemove_ = function(evt) {
  var feature = evt.element;
  var fid = feature.getId();
  if (this.dirty_[fid]) {
    // do a WFS transaction to update the geometry
    var properties = feature.getProperties();
    // get rid of bbox which is not a real property
    delete properties.bbox;
    var clone = new ol.Feature(properties);
    clone.setId(fid);
    var node = this.format_.writeTransaction(null, [clone], null, {
      gmlOptions: {srsName: this.srsName_},
      featureNS: this.featureNS_,
      featureType: this.featureType_
    });
    $.ajax({
      type: "POST",
      url: this.url_,
      data: this.serializer_.serializeToString(node),
      contentType: 'text/xml',
      success: function(data) {
        var result = this.format_.readTransactionResponse(data);
        if (result.transactionSummary.totalUpdated === 1) {
          delete this.dirty_[fid];
        }
      },
      context: this
    });
  }
};

/**
 * Handler for when drawing ends. Send a WFS Insert Transaction.
 * @param {ol.DrawEvent} evt The event object.
 */
app.TransactionHandler.prototype.onDrawEnd = function(evt) {
  var feature = evt.feature;
  var node = this.format_.writeTransaction([feature], null, null, {
    gmlOptions: {srsName: this.srsName_},
    featureNS: this.featureNS_,
    featureType: this.featureType_
  });
  $.ajax({
    type: "POST",
    url: this.url_,
    data: this.serializer_.serializeToString(node),
    contentType: 'text/xml',
    success: function(data) {
      var result = this.format_.readTransactionResponse(data);
      feature.setId(result.insertIds[0]);
      this.map_.removeInteraction(this.draw_);
      this.hasDraw_ = false;
    },
    error: function(e) {
      this.map_.removeInteraction(this.draw_);
      this.hasDraw_ = false;
      var errorMsg = e? (e.status + ' ' + e.statusText) : "";
      bootbox.alert('Error saving this feature to GeoServer.<br><br>'
        + errorMsg);
    },
    context: this
  });
};

/**
 * Activate the draw interaction for inserting new features.
 */
app.TransactionHandler.prototype.activateInsert = function() {
  if (this.hasDraw_ !== true) {
    this.map_.addInteraction(this.draw_);
    this.hasDraw_ = true;
  }
};

/**
 * Send a WFS Delete Transaction for the currently selected feature.
 */
app.TransactionHandler.prototype.deleteSelected = function() {
  var features = this.select_.getFeatures();
  if (features.getLength() === 1) {
    var feature = features.item(0);
    bootbox.confirm("Are you sure you want to delete the currently selected feature?", $.proxy(function(result) {
      if (result === true) {
        var node = this.format_.writeTransaction(null, null, [feature], {
          featureNS: this.featureNS_,
          featureType: this.featureType_
        });
        $.ajax({
          type: "POST",
          url: this.url_,
          data: this.serializer_.serializeToString(node),
          contentType: 'text/xml',
          success: function(data) {
            var result = this.format_.readTransactionResponse(data);
            if (result.transactionSummary.totalDeleted === 1) {
              this.select_.getFeatures().clear();
              this.source_.removeFeature(feature);
            } else {
              bootbox.alert("There was an issue deleting the feature.");
            }
          },
          context: this
        });
      }
    }, this));
  }
};

/** FILE: FeatureTable.js **/
if (!window.app) {
  window.app = {};
}
var app = window.app;

/**
 * Options for app.FeatureTable.
 * @typedef {Object} FeatureTableOptions
 * @property {string} id - The id of the HTML table to use.
 * @property {string[]} fields - A list of fields to display.
 * @property {boolean} showFeatureId - Show the feature id as a column.
 * @property {ol.source.Vector} source - The vector source to use for the
 * features.
 * @property {ol.Map} map - The map to interact with.
 * @property {string} container - The id of the div around the table.
 * @property {ol.interaction.Select} select - The select interaction to use.
 * @property {number} offset - The offset to use when scrolling the table.
 */

/**
 * @class
 * The FeatureTable is a table than can display vector features. It supports
 * bi-directional selection, if a feature is selected in the map, it will get
 * selected in the table as well. Also, if a feature is selected in the table,
 * the corresponding feature will be selected in the map.
 *
 * @constructor
 * @param {FeatureTableOptions} options Options.
 */
app.FeatureTable = function(options) {
  this.id_ = options.id;
  this.container_ = options.container;
  this.source_ = options.source;
  this.source_.un('addfeature', this.addRow, this);
  this.source_.on('addfeature', this.addRow, this);
  this.map_ = options.map;
  this.showFid_ = options.showFeatureId;
  this.fields_ = options.fields;
  this.select_ = options.select;
  this.offset_ = options.offset;
  // this.select_.getFeatures().on('add', this.selectRow, this);
  // this.select_.getFeatures().on('remove', this.unselectRow, this);
  $('#' + this.id_).off('click').on('click', 'tbody tr', this, this.handleRowClick);
  this.addHeader();
  this.addSpacerRow();
  this.cache = {};
};

/**
 * Add the header for the feature table.
 */
app.FeatureTable.prototype.addHeader = function() {
  var html = '';
  if (this.showFid_ === true) {
    html += '<thead><th>FID</th>';
  }
  for (var i=0, ii=this.fields_.length; i<ii; ++i) {
    var field = this.fields_[i];
    html += '<th>' + field.toUpperCase() + '</th>';
  }
  html += '</thead>';
  $('#' + this.id_).append(html);
};

/**
 * Add a table row for a feature, insert as first row.
 * @param {ol.source.VectorEvent} evt The event object.
 */
app.FeatureTable.prototype.addRow = function(evt) {
  var feature = evt.feature, key;
  var row = '<tr>';
  if (this.cache[feature.getId()]) {
    return;
  }
  if (this.showFid_ === true) {
    row += '<td class="fid">' + feature.getId() + '</td>';
    this.cache[feature.getId()] = true;
  }
  for (var i=0, ii=this.fields_.length; i<ii; ++i) {
    var field = this.fields_[i];
    row += '<td>' + feature.get(field) + '</td>';
  }
  row += '</tr>';
  $('#' + this.id_).prepend(row);
};

/**
 * Add a spacer table row to feature tables of set height.
 * Enables other rows to have normal height.
 * @param {ol.source.VectorEvent} evt The event object.
 */
app.FeatureTable.prototype.addSpacerRow = function(evt) {
  
  var row = '<tr style="height: auto;"><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>';
  $('#' + this.id_).append(row);
};

/**
 * Handle clicking on a row in the feature table.
 * @param {Event} evt The event object.
 */
app.FeatureTable.prototype.handleRowClick = function(evt) {
  var me = evt.data;
  var fid = $(this).closest("tr").find(".fid").text();
  var feature;
  for (var i = 0, l = me.source_.getFeatures().length; i<l; i++) {
    if (me.source_.getFeatures()[i].getId() == fid) {
        feature = me.source_.getFeatures()[i];
        break;
    }
  }
  
  if (feature) {
    me.select_.getFeatures().clear();
    me.select_._silent = true;
    me.select_.getFeatures().push(feature);
    delete me.select_._silent;
    var extent = feature.getGeometry().getFirstCoordinate();
    // var extent = ol.extent.buffer(geomExtent, (ol.extent.getWidth(geomExtent)+ol.extent.getHeight(geomExtent))/2);
    panTo(me.map_, me.map_.getView(), extent);
    $(this).addClass('highlight').siblings().removeClass('highlight');
    showPopup(feature);
  }
};

/**
 * Select a row in the feature table.
 * @param {ol.CollectionEvent} evt The event object.
 */
app.FeatureTable.prototype.selectRow = function(evt) {
  if (this.select_._silent === true) {
    return;
  }
  var feature = evt.element;
  var fid = feature.getId();
  var me = this;
  $('#' + this.id_ + ' tr').each(function (i, row) {
    if ($(row).find(".fid").text() === fid) {
      $(row).addClass('highlight');
      var parentPos = $(row).parent().position();
      var rowpos =  $(row).position();
      $('#' + me.container_).scrollTop(rowpos.top-parentPos.top+me.offset_);
      showPopup(feature);
      return false;
    }
  });
};

/**
 * Unselect all rows in the feature table.
 */
app.FeatureTable.prototype.unselectRow = function() {
  $('#' + this.id_ + ' tr').each(function (i, row) {
    if ($(row).hasClass('highlight')) {
      $(row).removeClass('highlight');
      hidePopup();
      return false;
    }
  });
};

app.FeatureTable.prototype.clear = function() {
  $('#features').empty();
  this.cache = {};
  this.source_.un('addfeature', this.addRow, this);
};

/** FILE: WFSBBOXLoader.js **/
if (!window.app) {
  window.app = {};
}
var app = window.app;

/**
 * Options for app.WFSBBOXLoader.
 * @typedef {Object} WFSBBOXLoaderOptions
 * @property {string} url - The OnlineResource of the WFS.
 * @property {string} featurePrefix - The prefix for the featureNS.
 * @property {string} featureType - The name of the feature type to use.
 * @property {string} srsName - The srsName to use, normally the view's
 * projection.
 * @property {string} outputFormat - The output format to use. Defaults to
 * 'application/json'.
 * @property {function} callback - The callback to call when done.
 */

/**
 * @class
 * The WFSBBOXLoader is a helper function for having a BBOX strategy with a
 * WFS protocol.
 *
 * @constructor
 * @param {WFSBBOXLoaderOptions} options Options.
 */
app.WFSBBOXLoader = function(options) {
  this.url_ = options.url;
  this.featurePrefix_ = options.featurePrefix;
  this.featureType_ = options.featureType;
  this.srsName_ = options.srsName;
  this.outputFormat_ = 'application/json';
  this.callback_ = options.callback;
};

/**
 * Load features from the WFS in a certain extent.
 * @param {ol.Extent} extent The extent to query for.
 */
app.WFSBBOXLoader.prototype.load = function(extent) {
  var wfs = this.url_;
  var featureType = this.featurePrefix_ + ':' + this.featureType_;
  var outputFormat = this.outputFormat_;
  var url = wfs + 'service=WFS&' +
    'version=1.1.0&request=GetFeature&typename=' + featureType + '&' +
    'outputFormat=' + outputFormat + '&srsname=' + this.srsName_ + '&bbox=' +
    extent.join(',') + ',' + this.srsName_;
  var me = this;
  $.ajax({
    url: url,
    context: extent
  }).then(function(response) {
    me.callback_.call(this, response);
  });
};

/** FILE: poiclient.js **/
var idCounter = 0;
var table;
var POIClient = function() {

};

POIClient.prototype.emptyTable = function(layer) {
    if (table) {
        table.clear();
    }

    table = new app.FeatureTable({
      id: 'features',
      showFeatureId: true,
      fields: ['name'],
      source: layer.getSource(),
      map: map,
      container: 'features-container',
      select: select,
      offset: 37
    });
};

POIClient.prototype.getLayer = function(service) {
    var layers = map.getLayers().getArray();
    var layer;
    for (var i = 0, l = layers.length; i<l; i++) {
        if (layers[i].get('title') == service) {
            layer = layers[i];
            break;
        }
    }

    return layer;
};

POIClient.prototype.clearFeatures = function(layer) {
    var oldFeatures = layer.getSource().getFeatures();
    for (var i = 0, l = oldFeatures.length; i<l; i++) {
        layer.getSource().removeFeature(oldFeatures[i]);
    }
};

POIClient.prototype.loadFeatures = function(result, service) {
    var layer = this.getLayer(service);
    
    //clear table
    // this.emptyTable(layer);
    // this.clearFeatures(layer);
    //parse features
    var features = this.parseGeoJSONFeatures(result);
    //add to source
    layer.getSource().addFeatures(features);
    //send events
};

POIClient.prototype.clearSearch = function() {
    this.searchMode = false;
};

POIClient.prototype.parseGeoJSONFeatures = function(result) {
    var format = new ol.format.GeoJSON();
      
    var features = format.readFeatures(result);
    for (var i = 0, l = features.length; i<l; i++) {
        features[i].getGeometry().transform('EPSG:4326', 'EPSG:3857');
        features[i].setId(++idCounter);
    }

    return features;
};

POIClient.prototype.bboxLayer = function(service, category) {
    var self = this;
    var vectorSource = new ol.source.ServerVector({
      format: new ol.format.GeoJSON(),
      loader: function(extent, resolution, projection) {
        
      },
      strategy: function(extent, resolution) {
        if (self.searchMode || vectorSource._prevExtent && extent[0] == vectorSource._prevExtent[0] && extent[1] == vectorSource._prevExtent[1]) {
            return [extent];
        } else {
            vectorSource._prevExtent = extent.slice(0);
        }
        var minCoord = ol.proj.transform([extent[0], extent[1]], 'EPSG:3857', 'EPSG:4326');
        var maxCoord = ol.proj.transform([extent[2], extent[3]], 'EPSG:3857', 'EPSG:4326');
        var url = self.buildUrl(service.id, minCoord, maxCoord, category);
        $.ajax({
          url: url,
          dataType: 'json'
        }).done(function(result) {
            self.loadFeatures(result, service.id);
        }).fail(function(jqxhr) {
            console.log(jqxhr);
        });
        return [extent];
      },
      projection: 'EPSG:4326'
    });
    
    var layer = new ol.layer.Vector({
        source: vectorSource,
        title: service.id,
        'name': self.getName(service, service.id, category),
        group: 'default',
        visible: false,
        style: new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: 'src/css/poi.png'
            }))
        })
    });

    return layer;
};

POIClient.prototype.search = function(service, keyword, minX, maxX, minY, maxY) {
    var self = this;
    if (!service || !keyword) {
        alert('select a service and type a search term');
        return;
    }
    self.searchMode = true;

    var url = this.buildSearchUrl(service, keyword, minX, maxX, minY, maxY);

    $.getJSON(url, null)
        .done(function(result) {
            var layer = self.getLayer(service);
            self.emptyTable(layer);
            self.clearFeatures(layer);
            self.loadFeatures(result, service);
        })
        .fail(function(jqxhr, textStatus, error) {
            console.log(textStatus);
        });
};
/** FILE: poiproxy.js **/
var POIProxyClient = function(url) {
    this.url = url;
    this.describeServicesEndPoint = '/describeServices';
};

POIProxyClient.prototype = new POIClient();

POIProxyClient.prototype.createLayers = function(callback) {
    var self = this;
    var layers = [];
    this.getDescribeServices(function(describeServices) {
        self.describeServices = describeServices;
        var layer;
        for (var service in describeServices.services) {
            var serviceConfig = config.services[service];
            var strategy = "bbox";
            if (serviceConfig && !serviceConfig.strategy) {
                continue;
            }

            if (!serviceConfig) {
                strategy = "bbox";
            }

            if (serviceConfig && serviceConfig.strategy) {
                strategy = serviceConfig.strategy;
            }
            
            layer = self[strategy + 'Layer'](describeServices.services[service]);

            layer.on('change:visible', function(event) {
                // create a feature table that will represent our features in a tabular form
                if (!event.target.getVisible()) {
                    return;
                }
                self.emptyTable(event.target);
            });

            layers.push(layer);
        }

        callback(layers);
    });
};

POIProxyClient.prototype.localLayer = function(service) {
    var vectorSource = new ol.source.Vector({
        projection: 'EPSG:3857'
    });
    var vector = new ol.layer.Vector({
        source: vectorSource,
        title: service.id,
        name: config.services[service.id].name,
        url: this.url + '/browse?' +
                 'service='+ service.id +'&z=0&x=0&y=0',
        group: 'default',
        visible: false,
        style: new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: 'src/css/icon.png'
            }))
        })
    });

    return vector;
};

POIProxyClient.prototype.buildSearchUrl = function(service, keyword, minX, maxX, minY, maxY) {
    return this.url + '/browseByExtent?' +
            'service='+ service +'&minX=' + minX +'&maxX=' + maxX + '&minY=' + minY + '&maxY=' + maxY + '&query=' + keyword;
};

POIProxyClient.prototype.search = function(service, keyword, minX, maxX, minY, maxY) {
    var self = this;
    if (!service || !keyword) {
        alert('select a service and type a search term');
        return;
    }
    self.searchMode = true;

    var url = this.buildSearchUrl(service, keyword, minX, maxX, minY, maxY);

    $.getJSON(url, null)
        .done(function(result) {
            var layer = self.getLayer(service);
            self.emptyTable(layer);
            self.clearFeatures(layer);
            self.loadFeatures(result, service);
        })
        .fail(function(jqxhr, textStatus, error) {
            console.log(textStatus);
        });
};

POIProxyClient.prototype.buildUrl = function(serviceID, minCoord, maxCoord, category) {
    return this.url + '/browseByExtent?' +
             'service='+ serviceID +'&minX=' + minCoord[0] + '&minY=' + minCoord[1] +'&maxX=' + maxCoord[0] + '&maxY=' + maxCoord[1]
            + '';
};

POIProxyClient.prototype.getName = function(service, serviceID, category) {
    return config.services[service.id] && config.services[service.id].name || service.id;
};

POIProxyClient.prototype.getTitle = function(service, serviceID, category) {
    return service.id;
};

POIProxyClient.prototype.tileLayer = function(service) {
    var self = this;
    var vectorSource = new ol.source.ServerVector({
      format: new ol.format.GeoJSON(),
      loader: function(extent, resolution, projection) {
        if (self.searchMode) {
            return;
        }
        var minCoord = ol.proj.transform([extent[0], extent[1]], 'EPSG:3857', 'EPSG:4326');
        var maxCoord = ol.proj.transform([extent[2], extent[3]], 'EPSG:3857', 'EPSG:4326');
        var url = self.url + '/browseByExtent?' +
             'service='+ service.id +'&minX=' + minCoord[0] + '&minY=' + minCoord[1] +'&maxX=' + maxCoord[0] + '&maxY=' + maxCoord[1]
            + '';
        $.ajax({
          url: url,
          dataType: 'json'
        }).done(function(result) {
            self.loadFeatures(result, service.id);
        }).fail(function(jqxhr) {
            console.log(jqxhr);
        });
      },
      strategy: ol.loadingstrategy.createTile(new ol.tilegrid.XYZ({
        maxZoom: 19
      })),
      projection: 'EPSG:4326'
    });
    
    var poiproxyLayer = new ol.layer.Vector({
        source: vectorSource,
        title: service.id,
        name: config.services[service.id].name,
        group: 'default',
        visible: false,
        style: new ol.style.Style({
            image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
                anchor: [0.5, 46],
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                opacity: 0.75,
                src: 'src/css/poi.png'
            }))
        })
    });

    return poiproxyLayer;
};

// POIProxyClient.prototype.tileLayer = function(service) {
//     var self = this;
//     var tileSource = new ol.source.TileVector({
//         format: new ol.format.GeoJSON({
//             defaultProjection: 'EPSG:4326'
//         }),
//         projection: 'EPSG:3857',
//         tileGrid: new ol.tilegrid.XYZ({
//             maxZoom: 19
//         }),
//         url: this.url + '/browse?' +
//             'service='+ service.id +'&z={z}&x={x}&y={y}'
//     });

//     tileSource.on('change', function(vectorEvent) {
//         var features = vectorEvent.target.getFeatures();
        
//         $('#features').empty();
//         for (var i = 0, l = features.length; i<l; i++) {
//             features[i].setId(++idCounter);
//             tileSource.dispatchEvent(new ol.source.VectorEvent(ol.source.VectorEventType.ADDFEATURE, features[i]));
//         }
//     });
    
//     var poiproxyLayer = new ol.layer.Vector({
//         source: tileSource,
//         title: service.id,
//         name: config.services[service.id].name,
//         group: 'default',
//         visible: false,
//         style: new ol.style.Style({
//             image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
//                 anchor: [0.5, 46],
//                 anchorXUnits: 'fraction',
//                 anchorYUnits: 'pixels',
//                 opacity: 0.75,
//                 src: 'src/css/poi.png'
//             }))
//         })
//     });

//     return poiproxyLayer;
// };

POIProxyClient.prototype.isLocalBcn = function(service) {
    return service.indexOf('bcn_') != -1;
};

POIProxyClient.prototype.getDescribeServices = function(callback) {
    $.getJSON(this.url + this.describeServicesEndPoint, null)
    .done(function(result) {
        callback(result);
    })
    .fail(function(jqxhr, textStatus, error) {
        alert(textStatus);
    });
};
/** FILE: ficontent.js **/
var FIContentClient = function(url, type) {
    this.url = url + '/' + type + '/pois/json';
    this.categoriesURL = url + '/' + type + '/categories/search?list=poi';
    this.type = type;
};

FIContentClient.prototype = new POIClient();

FIContentClient.prototype.createLayers = function(callback) {
    var self = this;
    var layers = [];

    var categories = config[this.type].categories;

    for (var i = 0, l = categories.length; i<l; i++) {
        var layer = self['bboxLayer']({id: this.type}, categories[i]);

        layer.on('change:visible', function(event) {
            // create a feature table that will represent our features in a tabular form
            if (!event.target.getVisible()) {
                return;
            }
            self.emptyTable(event.target);
        });

        layers.push(layer);
    }

    callback(layers);


    // this.getDescribeServices(function(describeServices) {
    //     self.describeServices = describeServices;
    //     var layer;
    //     for (var service in describeServices.services) {
    //         var serviceConfig = config.services[service];
    //         if (!serviceConfig.strategy) {
    //             continue;
    //         }
    //         layer = self[serviceConfig.strategy + 'Layer'](describeServices.services[service]);

    //         layer.on('change:visible', function(event) {
    //             // create a feature table that will represent our features in a tabular form
    //             if (!event.target.getVisible()) {
    //                 return;
    //             }
    //             self.emptyTable(event.target);
    //         });

    //         layers.push(layer);
    //     }

    //     callback(layers);
    // });
};

FIContentClient.prototype.buildSearchUrl = function(service, keyword, minX, maxX, minY, maxY) {
    var category = this.getCategory(service);

    var url = this.url + '/search?' +
             'category='+ category +'&coords=' + minX + ',' + minY +',' + maxX + ',' + maxY + '&complete=' + keyword;

    return url;
};

FIContentClient.prototype.getCategory = function(service) {
    return service.split('_')[1];
};

FIContentClient.prototype.buildUrl = function(serviceID, minCoord, maxCoord, category) {
    return this.url + '/search?' +
             'category='+ category +'&coords=' + minCoord[0] + ',' + minCoord[1] +',' + maxCoord[0] + ',' + maxCoord[1]
            + '';
};

FIContentClient.prototype.getName = function(service, serviceID, category) {
    return serviceID+'_'+category;
};

FIContentClient.prototype.getTitle = function(service, serviceID, category) {
    return serviceID+'_'+category;
};
/** FILE: funcs.js **/
var berlin = ol.proj.transform([13.392333984375, 52.50953477032729], 'EPSG:4326', 'EPSG:3857');
var barcelona = ol.proj.transform([2.1807861328125, 41.38917324986403], 'EPSG:4326', 'EPSG:3857');

function elastic(t) {
    return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
}

var flyToBerlin = document.getElementById('fly-to-berlin');
flyToBerlin.addEventListener('click', function() {
    var view = map.getView();
    var duration = 7000;
    var start = +new Date();
    var pan = ol.animation.pan({
        duration: duration,
        source: /** @type {ol.Coordinate} */
        (view.getCenter()),
        start: start
    });
    var bounce = ol.animation.bounce({
        duration: duration,
        resolution: 4 * view.getResolution(),
        start: start
    });
    map.beforeRender(pan, bounce);
    view.setCenter(berlin);
}, false);

var elasticToBarcelona = document.getElementById('elastic-to-barcelona');
elasticToBarcelona.addEventListener('click', function() {
    var view = map.getView();
    var pan = ol.animation.pan({
        duration: 7000,
        easing: elastic,
        source: /** @type {ol.Coordinate} */
        (view.getCenter())
    });
    map.beforeRender(pan);
    view.setCenter(barcelona);
}, false);

var panTo = function(map, view, center) {
    var pan = ol.animation.pan({
        duration: 500,
        source: /** @type {ol.Coordinate} */
        (view.getCenter())
    });
    map.beforeRender(pan);
    view.setCenter(center);

};

// set table height based on responsive panel size
var resizeTableHeight = function() {
  if (!table) {
    return;
  }

  var _window = $(window);
  var window_h = _window.height(), 
      window_w =  _window.width(), 
      navbar_h = $('.navbar').height(),
      table_container = $('#features-container'),
      table = $('#features');

  if (window_w < 768) { // table is beneath map
    var table_height = window_h - $('#map').height();

  } else { // table is right of map
    var table_height = $('#map').height(); 
  }
  table.height(table_height);
  table_container.height(table_height);
};
/** FILE: newservice.js **/
var newService = {
  "id": "berlin_local_data_hotels",
  "format": "json",
  "apiKey": "",
  "encoding": "UTF-8",
  "SRS": "EPSG:4326",
  "categories": [
    "local_berlin_hotels"
  ],
  "requestTypes": {
    "browse": {
      "url": "http://www.berlin.de/stadtplan/gateway.ashx?a=getobjects&scaleRatio=20000&llNE=__MAXX__%2C__MAXY__&llSW=__MINX__%2C__MINY__&cs=0&id=1",
      "params": []
    },
    "search": {
      "url": "b",
      "params": []
    }
  },
  "featureTypes": {
    "browse": {
      "feature": "lon",
      "elements": {
        "name": {
          "input": "title"
        },
        "description": {
          "input": "desc"
        },
        "web": {
          "input": "link"
        },
        "image": {
          "input": ""
        },
        "address": {
          "input": ""
        },
        "phone": {
          "input": ""
        }
      },
      "lon": "lon",
      "lat": "lat"
    },
    "search": {
      "feature": "lon",
      "elements": {
        "name": {
          "input": "title"
        },
        "description": {
          "input": "desc"
        },
        "web": {
          "input": "link"
        },
        "image": {
          "input": ""
        },
        "address": {
          "input": ""
        },
        "phone": {
          "input": ""
        }
      },
      "lon": "lon",
      "lat": "lat"
    }
  }
};
/** FILE: knockout-3.1.0.js **/
// Knockout JavaScript library v3.1.0
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)
(function() {
    (function(p) {
        var A = this || (0, eval)("this"),
            w = A.document,
            K = A.navigator,
            t = A.jQuery,
            C = A.JSON;
        (function(p) {
            "function" === typeof require && "object" === typeof exports && "object" === typeof module ? p(module.exports || exports) : "function" === typeof define && define.amd ? define(["exports"], p) : p(A.ko = {})
        })(function(z) {
            function G(a, c) {
                return null === a || typeof a in M ? a === c : !1
            }
            function N(a, c) {
                var d;
                return function() {
                    d || (d = setTimeout(function() {
                        d = p;
                        a()
                    }, c))
                }
            }
            function O(a, c) {
                var d;
                return function() {
                    clearTimeout(d);
                    d = setTimeout(a, c)
                }
            }
            function H(b, c, d, e) {
                a.d[b] = {
                    init: function(b, h, g, k, l) {
                        var n, r;
                        a.ba(function() {
                            var g = a.a.c(h()),
                                k = !d !== !g,
                                s = !r;
                            if (s || c || k !== n) s && a.ca.fa() && (r = a.a.lb(a.e.childNodes(b), !0)), k ? (s || a.e.U(b, a.a.lb(r)), a.gb(e ? e(l, g) : l, b)) : a.e.da(b), n = k
                        }, null, {
                            G: b
                        });
                        return {
                            controlsDescendantBindings: !0
                        }
                    }
                };
                a.g.aa[b] = !1;
                a.e.Q[b] = !0
            }
            var a = "undefined" !== typeof z ? z : {};
            a.b = function(b, c) {
                for (var d = b.split("."), e = a, f = 0; f < d.length - 1; f++) e = e[d[f]];
                e[d[d.length - 1]] = c
            };
            a.s = function(a, c, d) {
                a[c] = d
            };
            a.version = "3.1.0";
            a.b("version", a.version);
            a.a = function() {
                function b(a, b) {
                    for (var c in a) a.hasOwnProperty(c) && b(c, a[c])
                }
                function c(a, b) {
                    if (b) for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                    return a
                }
                function d(a, b) {
                    a.__proto__ = b;
                    return a
                }
                var e = {
                    __proto__: []
                }
                instanceof Array,
                    f = {},
                    h = {};
                f[K && /Firefox\/2/i.test(K.userAgent) ? "KeyboardEvent" : "UIEvents"] = ["keyup", "keydown", "keypress"];
                f.MouseEvents = "click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");
                b(f, function(a, b) {
                    if (b.length) for (var c = 0, d = b.length; c < d; c++) h[b[c]] = a
                });
                var g = {
                    propertychange: !0
                },
                    k = w &&
                    function() {
                        for (var a = 3, b = w.createElement("div"), c = b.getElementsByTagName("i"); b.innerHTML = "\x3c!--[if gt IE " + ++a + "]><i></i><![endif]--\x3e", c[0];);
                        return 4 < a ? a : p
                    }();
                return {
                    mb: ["authenticity_token", /^__RequestVerificationToken(_.*)?$/],
                    r: function(a, b) {
                        for (var c = 0, d = a.length; c < d; c++) b(a[c], c)
                    },
                    l: function(a, b) {
                        if ("function" == typeof Array.prototype.indexOf) return Array.prototype.indexOf.call(a, b);
                        for (var c = 0, d = a.length; c < d; c++) if (a[c] === b) return c;
                        return -1
                    },
                    hb: function(a, b, c) {
                        for (var d = 0, e = a.length; d < e; d++) if (b.call(c, a[d], d)) return a[d];
                        return null
                    },
                    ma: function(b, c) {
                        var d = a.a.l(b, c);
                        0 < d ? b.splice(d, 1) : 0 === d && b.shift()
                    },
                    ib: function(b) {
                        b = b || [];
                        for (var c = [], d = 0, e = b.length; d < e; d++) 0 > a.a.l(c, b[d]) && c.push(b[d]);
                        return c
                    },
                    ya: function(a, b) {
                        a = a || [];
                        for (var c = [], d = 0, e = a.length; d < e; d++) c.push(b(a[d], d));
                        return c
                    },
                    la: function(a, b) {
                        a = a || [];
                        for (var c = [], d = 0, e = a.length; d < e; d++) b(a[d], d) && c.push(a[d]);
                        return c
                    },
                    $: function(a, b) {
                        if (b instanceof Array) a.push.apply(a, b);
                        else
                        for (var c = 0, d = b.length; c < d; c++) a.push(b[c]);
                        return a
                    },
                    Y: function(b, c, d) {
                        var e = a.a.l(a.a.Sa(b), c);
                        0 > e ? d && b.push(c) : d || b.splice(e, 1)
                    },
                    na: e,
                    extend: c,
                    ra: d,
                    sa: e ? d : c,
                    A: b,
                    Oa: function(a, b) {
                        if (!a) return a;
                        var c = {},
                            d;
                        for (d in a) a.hasOwnProperty(d) && (c[d] = b(a[d], d, a));
                        return c
                    },
                    Fa: function(b) {
                        for (; b.firstChild;) a.removeNode(b.firstChild)
                    },
                    ec: function(b) {
                        b = a.a.R(b);
                        for (var c = w.createElement("div"), d = 0, e = b.length; d < e; d++) c.appendChild(a.M(b[d]));
                        return c
                    },
                    lb: function(b, c) {
                        for (var d = 0, e = b.length, g = []; d < e; d++) {
                            var k = b[d].cloneNode(!0);
                            g.push(c ? a.M(k) : k)
                        }
                        return g
                    },
                    U: function(b, c) {
                        a.a.Fa(b);
                        if (c) for (var d = 0, e = c.length; d < e; d++) b.appendChild(c[d])
                    },
                    Bb: function(b, c) {
                        var d = b.nodeType ? [b] : b;
                        if (0 < d.length) {
                            for (var e = d[0], g = e.parentNode, k = 0, h = c.length; k < h; k++) g.insertBefore(c[k], e);
                            k = 0;
                            for (h = d.length; k < h; k++) a.removeNode(d[k])
                        }
                    },
                    ea: function(a, b) {
                        if (a.length) {
                            for (b = 8 === b.nodeType && b.parentNode || b; a.length && a[0].parentNode !== b;) a.shift();
                            if (1 < a.length) {
                                var c = a[0],
                                    d = a[a.length - 1];
                                for (a.length = 0; c !== d;) if (a.push(c), c = c.nextSibling, !c) return;
                                a.push(d)
                            }
                        }
                        return a
                    },
                    Db: function(a, b) {
                        7 > k ? a.setAttribute("selected", b) : a.selected = b
                    },
                    ta: function(a) {
                        return null === a || a === p ? "" : a.trim ? a.trim() : a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
                    },
                    oc: function(b, c) {
                        for (var d = [], e = (b || "").split(c), g = 0, k = e.length; g < k; g++) {
                            var h = a.a.ta(e[g]);
                            "" !== h && d.push(h)
                        }
                        return d
                    },
                    kc: function(a, b) {
                        a = a || "";
                        return b.length > a.length ? !1 : a.substring(0, b.length) === b
                    },
                    Sb: function(a, b) {
                        if (a === b) return !0;
                        if (11 === a.nodeType) return !1;
                        if (b.contains) return b.contains(3 === a.nodeType ? a.parentNode : a);
                        if (b.compareDocumentPosition) return 16 == (b.compareDocumentPosition(a) & 16);
                        for (; a && a != b;) a = a.parentNode;
                        return !!a
                    },
                    Ea: function(b) {
                        return a.a.Sb(b, b.ownerDocument.documentElement)
                    },
                    eb: function(b) {
                        return !!a.a.hb(b, a.a.Ea)
                    },
                    B: function(a) {
                        return a && a.tagName && a.tagName.toLowerCase()
                    },
                    q: function(b, c, d) {
                        var e = k && g[c];
                        if (!e && t) t(b).bind(c, d);
                        else if (e || "function" != typeof b.addEventListener) if ("undefined" != typeof b.attachEvent) {
                            var h = function(a) {
                                d.call(b, a)
                            },
                                f = "on" + c;
                            b.attachEvent(f, h);
                            a.a.u.ja(b, function() {
                                b.detachEvent(f, h)
                            })
                        } else
                        throw Error("Browser doesn't support addEventListener or attachEvent");
                        else b.addEventListener(c, d, !1)
                    },
                    ha: function(b, c) {
                        if (!b || !b.nodeType) throw Error("element must be a DOM node when calling triggerEvent");
                        var d;
                        "input" === a.a.B(b) && b.type && "click" == c.toLowerCase() ? (d = b.type, d = "checkbox" == d || "radio" == d) : d = !1;
                        if (t && !d) t(b).trigger(c);
                        else if ("function" == typeof w.createEvent) if ("function" == typeof b.dispatchEvent) d = w.createEvent(h[c] || "HTMLEvents"), d.initEvent(c, !0, !0, A, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, b), b.dispatchEvent(d);
                        else
                        throw Error("The supplied element doesn't support dispatchEvent");
                        else if (d && b.click) b.click();
                        else if ("undefined" != typeof b.fireEvent) b.fireEvent("on" + c);
                        else
                        throw Error("Browser doesn't support triggering events");
                    },
                    c: function(b) {
                        return a.v(b) ? b() : b
                    },
                    Sa: function(b) {
                        return a.v(b) ? b.o() : b
                    },
                    ua: function(b, c, d) {
                        if (c) {
                            var e = /\S+/g,
                                g = b.className.match(e) || [];
                            a.a.r(c.match(e), function(b) {
                                a.a.Y(g, b, d)
                            });
                            b.className = g.join(" ")
                        }
                    },
                    Xa: function(b, c) {
                        var d = a.a.c(c);
                        if (null === d || d === p) d = "";
                        var e = a.e.firstChild(b);
                        !e || 3 != e.nodeType || a.e.nextSibling(e) ? a.e.U(b, [b.ownerDocument.createTextNode(d)]) : e.data = d;
                        a.a.Vb(b)
                    },
                    Cb: function(a, b) {
                        a.name = b;
                        if (7 >= k) try {
                            a.mergeAttributes(w.createElement("<input name='" + a.name + "'/>"), !1)
                        } catch (c) {}
                    },
                    Vb: function(a) {
                        9 <= k && (a = 1 == a.nodeType ? a : a.parentNode, a.style && (a.style.zoom = a.style.zoom))
                    },
                    Tb: function(a) {
                        if (k) {
                            var b = a.style.width;
                            a.style.width = 0;
                            a.style.width = b
                        }
                    },
                    ic: function(b, c) {
                        b = a.a.c(b);
                        c = a.a.c(c);
                        for (var d = [], e = b; e <= c; e++) d.push(e);
                        return d
                    },
                    R: function(a) {
                        for (var b = [], c = 0, d = a.length; c < d; c++) b.push(a[c]);
                        return b
                    },
                    mc: 6 === k,
                    nc: 7 === k,
                    oa: k,
                    ob: function(b, c) {
                        for (var d = a.a.R(b.getElementsByTagName("input")).concat(a.a.R(b.getElementsByTagName("textarea"))), e = "string" == typeof c ?
                        function(a) {
                            return a.name === c
                        } : function(a) {
                            return c.test(a.name)
                        }, g = [], k = d.length - 1; 0 <= k; k--) e(d[k]) && g.push(d[k]);
                        return g
                    },
                    fc: function(b) {
                        return "string" == typeof b && (b = a.a.ta(b)) ? C && C.parse ? C.parse(b) : (new Function("return " + b))() : null
                    },
                    Ya: function(b, c, d) {
                        if (!C || !C.stringify) throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
                        return C.stringify(a.a.c(b), c, d)
                    },
                    gc: function(c, d, e) {
                        e = e || {};
                        var g = e.params || {},
                            k = e.includeFields || this.mb,
                            h = c;
                        if ("object" == typeof c && "form" === a.a.B(c)) for (var h = c.action, f = k.length - 1; 0 <= f; f--) for (var u = a.a.ob(c, k[f]), D = u.length - 1; 0 <= D; D--) g[u[D].name] =
                        u[D].value;
                        d = a.a.c(d);
                        var y = w.createElement("form");
                        y.style.display = "none";
                        y.action = h;
                        y.method = "post";
                        for (var p in d) c = w.createElement("input"), c.name = p, c.value = a.a.Ya(a.a.c(d[p])), y.appendChild(c);
                        b(g, function(a, b) {
                            var c = w.createElement("input");
                            c.name = a;
                            c.value = b;
                            y.appendChild(c)
                        });
                        w.body.appendChild(y);
                        e.submitter ? e.submitter(y) : y.submit();
                        setTimeout(function() {
                            y.parentNode.removeChild(y)
                        }, 0)
                    }
                }
            }();
            a.b("utils", a.a);
            a.b("utils.arrayForEach", a.a.r);
            a.b("utils.arrayFirst", a.a.hb);
            a.b("utils.arrayFilter", a.a.la);
            a.b("utils.arrayGetDistinctValues", a.a.ib);
            a.b("utils.arrayIndexOf", a.a.l);
            a.b("utils.arrayMap", a.a.ya);
            a.b("utils.arrayPushAll", a.a.$);
            a.b("utils.arrayRemoveItem", a.a.ma);
            a.b("utils.extend", a.a.extend);
            a.b("utils.fieldsIncludedWithJsonPost", a.a.mb);
            a.b("utils.getFormFields", a.a.ob);
            a.b("utils.peekObservable", a.a.Sa);
            a.b("utils.postJson", a.a.gc);
            a.b("utils.parseJson", a.a.fc);
            a.b("utils.registerEventHandler", a.a.q);
            a.b("utils.stringifyJson", a.a.Ya);
            a.b("utils.range", a.a.ic);
            a.b("utils.toggleDomNodeCssClass", a.a.ua);
            a.b("utils.triggerEvent", a.a.ha);
            a.b("utils.unwrapObservable", a.a.c);
            a.b("utils.objectForEach", a.a.A);
            a.b("utils.addOrRemoveItem", a.a.Y);
            a.b("unwrap", a.a.c);
            Function.prototype.bind || (Function.prototype.bind = function(a) {
                var c = this,
                    d = Array.prototype.slice.call(arguments);
                a = d.shift();
                return function() {
                    return c.apply(a, d.concat(Array.prototype.slice.call(arguments)))
                }
            });
            a.a.f = new
            function() {
                function a(b, h) {
                    var g = b[d];
                    if (!g || "null" === g || !e[g]) {
                        if (!h) return p;
                        g = b[d] = "ko" + c++;
                        e[g] = {}
                    }
                    return e[g]
                }
                var c = 0,
                    d = "__ko__" + (new Date).getTime(),
                    e = {};
                return {
                    get: function(c, d) {
                        var e = a(c, !1);
                        return e === p ? p : e[d]
                    },
                    set: function(c, d, e) {
                        if (e !== p || a(c, !1) !== p) a(c, !0)[d] = e
                    },
                    clear: function(a) {
                        var b = a[d];
                        return b ? (delete e[b], a[d] = null, !0) : !1
                    },
                    L: function() {
                        return c+++d
                    }
                }
            };
            a.b("utils.domData", a.a.f);
            a.b("utils.domData.clear", a.a.f.clear);
            a.a.u = new
            function() {
                function b(b, c) {
                    var e = a.a.f.get(b, d);
                    e === p && c && (e = [], a.a.f.set(b, d, e));
                    return e
                }
                function c(d) {
                    var e = b(d, !1);
                    if (e) for (var e = e.slice(0), k = 0; k < e.length; k++) e[k](d);
                    a.a.f.clear(d);
                    a.a.u.cleanExternalData(d);
                    if (f[d.nodeType]) for (e = d.firstChild; d = e;) e = d.nextSibling, 8 === d.nodeType && c(d)
                }
                var d = a.a.f.L(),
                    e = {
                        1: !0,
                        8: !0,
                        9: !0
                    },
                    f = {
                        1: !0,
                        9: !0
                    };
                return {
                    ja: function(a, c) {
                        if ("function" != typeof c) throw Error("Callback must be a function");
                        b(a, !0).push(c)
                    },
                    Ab: function(c, e) {
                        var k = b(c, !1);
                        k && (a.a.ma(k, e), 0 == k.length && a.a.f.set(c, d, p))
                    },
                    M: function(b) {
                        if (e[b.nodeType] && (c(b), f[b.nodeType])) {
                            var d = [];
                            a.a.$(d, b.getElementsByTagName("*"));
                            for (var k = 0, l = d.length; k < l; k++) c(d[k])
                        }
                        return b
                    },
                    removeNode: function(b) {
                        a.M(b);
                        b.parentNode && b.parentNode.removeChild(b)
                    },
                    cleanExternalData: function(a) {
                        t && "function" == typeof t.cleanData && t.cleanData([a])
                    }
                }
            };
            a.M = a.a.u.M;
            a.removeNode = a.a.u.removeNode;
            a.b("cleanNode", a.M);
            a.b("removeNode", a.removeNode);
            a.b("utils.domNodeDisposal", a.a.u);
            a.b("utils.domNodeDisposal.addDisposeCallback", a.a.u.ja);
            a.b("utils.domNodeDisposal.removeDisposeCallback", a.a.u.Ab);
            (function() {
                a.a.Qa = function(b) {
                    var c;
                    if (t) if (t.parseHTML) c = t.parseHTML(b) || [];
                    else {
                        if ((c = t.clean([b])) && c[0]) {
                            for (b = c[0]; b.parentNode && 11 !== b.parentNode.nodeType;) b = b.parentNode;
                            b.parentNode && b.parentNode.removeChild(b)
                        }
                    } else {
                        var d = a.a.ta(b).toLowerCase();
                        c = w.createElement("div");
                        d = d.match(/^<(thead|tbody|tfoot)/) && [1, "<table>", "</table>"] || !d.indexOf("<tr") && [2, "<table><tbody>", "</tbody></table>"] || (!d.indexOf("<td") || !d.indexOf("<th")) && [3, "<table><tbody><tr>", "</tr></tbody></table>"] || [0, "", ""];
                        b = "ignored<div>" + d[1] + b + d[2] + "</div>";
                        for ("function" == typeof A.innerShiv ? c.appendChild(A.innerShiv(b)) : c.innerHTML = b; d[0]--;) c = c.lastChild;
                        c = a.a.R(c.lastChild.childNodes)
                    }
                    return c
                };
                a.a.Va = function(b, c) {
                    a.a.Fa(b);
                    c = a.a.c(c);
                    if (null !== c && c !== p) if ("string" != typeof c && (c = c.toString()), t) t(b).html(c);
                    else
                    for (var d = a.a.Qa(c), e = 0; e < d.length; e++) b.appendChild(d[e])
                }
            })();
            a.b("utils.parseHtmlFragment", a.a.Qa);
            a.b("utils.setHtml", a.a.Va);
            a.w = function() {
                function b(c, e) {
                    if (c) if (8 == c.nodeType) {
                        var f = a.w.xb(c.nodeValue);
                        null != f && e.push({
                            Rb: c,
                            cc: f
                        })
                    } else if (1 == c.nodeType) for (var f = 0, h = c.childNodes, g = h.length; f < g; f++) b(h[f], e)
                }
                var c = {};
                return {
                    Na: function(a) {
                        if ("function" != typeof a) throw Error("You can only pass a function to ko.memoization.memoize()");
                        var b = (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1) + (4294967296 * (1 + Math.random()) | 0).toString(16).substring(1);
                        c[b] = a;
                        return "\x3c!--[ko_memo:" + b + "]--\x3e"
                    },
                    Hb: function(a, b) {
                        var f = c[a];
                        if (f === p) throw Error("Couldn't find any memo with ID " + a + ". Perhaps it's already been unmemoized.");
                        try {
                            return f.apply(null, b || []), !0
                        } finally {
                            delete c[a]
                        }
                    },
                    Ib: function(c, e) {
                        var f = [];
                        b(c, f);
                        for (var h = 0, g = f.length; h < g; h++) {
                            var k = f[h].Rb,
                                l = [k];
                            e && a.a.$(l, e);
                            a.w.Hb(f[h].cc, l);
                            k.nodeValue = "";
                            k.parentNode && k.parentNode.removeChild(k)
                        }
                    },
                    xb: function(a) {
                        return (a = a.match(/^\[ko_memo\:(.*?)\]$/)) ? a[1] : null
                    }
                }
            }();
            a.b("memoization", a.w);
            a.b("memoization.memoize", a.w.Na);
            a.b("memoization.unmemoize", a.w.Hb);
            a.b("memoization.parseMemoText", a.w.xb);
            a.b("memoization.unmemoizeDomNodeAndDescendants", a.w.Ib);
            a.Ga = {
                throttle: function(b, c) {
                    b.throttleEvaluation = c;
                    var d = null;
                    return a.h({
                        read: b,
                        write: function(a) {
                            clearTimeout(d);
                            d = setTimeout(function() {
                                b(a)
                            }, c)
                        }
                    })
                },
                rateLimit: function(a, c) {
                    var d, e, f;
                    "number" == typeof c ? d = c : (d = c.timeout, e = c.method);
                    f = "notifyWhenChangesStop" == e ? O : N;
                    a.Ma(function(a) {
                        return f(a, d)
                    })
                },
                notify: function(a, c) {
                    a.equalityComparer = "always" == c ? null : G
                }
            };
            var M = {
                undefined: 1,
                "boolean": 1,
                number: 1,
                string: 1
            };
            a.b("extenders", a.Ga);
            a.Fb = function(b, c, d) {
                this.target = b;
                this.za = c;
                this.Qb = d;
                this.sb = !1;
                a.s(this, "dispose", this.F)
            };
            a.Fb.prototype.F = function() {
                this.sb = !0;
                this.Qb()
            };
            a.N = function() {
                a.a.sa(this, a.N.fn);
                this.H = {}
            };
            var F = "change";
            z = {
                V: function(b, c, d) {
                    var e = this;
                    d = d || F;
                    var f = new a.Fb(e, c ? b.bind(c) : b, function() {
                        a.a.ma(e.H[d], f)
                    });
                    e.o && e.o();
                    e.H[d] || (e.H[d] = []);
                    e.H[d].push(f);
                    return f
                },
                notifySubscribers: function(b, c) {
                    c = c || F;
                    if (this.qb(c)) try {
                        a.k.jb();
                        for (var d = this.H[c].slice(0), e = 0, f; f = d[e]; ++e) f.sb || f.za(b)
                    } finally {
                        a.k.end()
                    }
                },
                Ma: function(b) {
                    var c = this,
                        d = a.v(c),
                        e, f, h;
                    c.ia || (c.ia = c.notifySubscribers, c.notifySubscribers = function(a, b) {
                        b && b !== F ? "beforeChange" === b ? c.bb(a) : c.ia(a, b) : c.cb(a)
                    });
                    var g = b(function() {
                        d && h === c && (h = c());
                        e = !1;
                        c.Ka(f, h) && c.ia(f = h)
                    });
                    c.cb = function(a) {
                        e = !0;
                        h = a;
                        g()
                    };
                    c.bb = function(a) {
                        e || (f = a, c.ia(a, "beforeChange"))
                    }
                },
                qb: function(a) {
                    return this.H[a] && this.H[a].length
                },
                Wb: function() {
                    var b = 0;
                    a.a.A(this.H, function(a, d) {
                        b += d.length
                    });
                    return b
                },
                Ka: function(a, c) {
                    return !this.equalityComparer || !this.equalityComparer(a, c)
                },
                extend: function(b) {
                    var c = this;
                    b && a.a.A(b, function(b, e) {
                        var f = a.Ga[b];
                        "function" == typeof f && (c = f(c, e) || c)
                    });
                    return c
                }
            };
            a.s(z, "subscribe", z.V);
            a.s(z, "extend", z.extend);
            a.s(z, "getSubscriptionsCount", z.Wb);
            a.a.na && a.a.ra(z, Function.prototype);
            a.N.fn = z;
            a.tb = function(a) {
                return null != a && "function" == typeof a.V && "function" == typeof a.notifySubscribers
            };
            a.b("subscribable", a.N);
            a.b("isSubscribable", a.tb);
            a.ca = a.k = function() {
                function b(a) {
                    d.push(e);
                    e = a
                }
                function c() {
                    e = d.pop()
                }
                var d = [],
                    e, f = 0;
                return {
                    jb: b,
                    end: c,
                    zb: function(b) {
                        if (e) {
                            if (!a.tb(b)) throw Error("Only subscribable things can act as dependencies");
                            e.za(b, b.Kb || (b.Kb = ++f))
                        }
                    },
                    t: function(a, d, e) {
                        try {
                            return b(), a.apply(d, e || [])
                        } finally {
                            c()
                        }
                    },
                    fa: function() {
                        if (e) return e.ba.fa()
                    },
                    pa: function() {
                        if (e) return e.pa
                    }
                }
            }();
            a.b("computedContext", a.ca);
            a.b("computedContext.getDependenciesCount", a.ca.fa);
            a.b("computedContext.isInitial", a.ca.pa);
            a.m = function(b) {
                function c() {
                    if (0 < arguments.length) return c.Ka(d, arguments[0]) && (c.P(), d = arguments[0], c.O()), this;
                    a.k.zb(c);
                    return d
                }
                var d = b;
                a.N.call(c);
                a.a.sa(c, a.m.fn);
                c.o = function() {
                    return d
                };
                c.O = function() {
                    c.notifySubscribers(d)
                };
                c.P = function() {
                    c.notifySubscribers(d, "beforeChange")
                };
                a.s(c, "peek", c.o);
                a.s(c, "valueHasMutated", c.O);
                a.s(c, "valueWillMutate", c.P);
                return c
            };
            a.m.fn = {
                equalityComparer: G
            };
            var E = a.m.hc = "__ko_proto__";
            a.m.fn[E] = a.m;
            a.a.na && a.a.ra(a.m.fn, a.N.fn);
            a.Ha = function(b, c) {
                return null === b || b === p || b[E] === p ? !1 : b[E] === c ? !0 : a.Ha(b[E], c)
            };
            a.v = function(b) {
                return a.Ha(b, a.m)
            };
            a.ub = function(b) {
                return "function" == typeof b && b[E] === a.m || "function" == typeof b && b[E] === a.h && b.Yb ? !0 : !1
            };
            a.b("observable", a.m);
            a.b("isObservable", a.v);
            a.b("isWriteableObservable", a.ub);
            a.T = function(b) {
                b = b || [];
                if ("object" != typeof b || !("length" in b)) throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");
                b = a.m(b);
                a.a.sa(b, a.T.fn);
                return b.extend({
                    trackArrayChanges: !0
                })
            };
            a.T.fn = {
                remove: function(b) {
                    for (var c = this.o(), d = [], e = "function" != typeof b || a.v(b) ?
                    function(a) {
                        return a === b
                    } : b, f = 0; f < c.length; f++) {
                        var h = c[f];
                        e(h) && (0 === d.length && this.P(), d.push(h), c.splice(f, 1), f--)
                    }
                    d.length && this.O();
                    return d
                },
                removeAll: function(b) {
                    if (b === p) {
                        var c = this.o(),
                            d = c.slice(0);
                        this.P();
                        c.splice(0, c.length);
                        this.O();
                        return d
                    }
                    return b ? this.remove(function(c) {
                        return 0 <= a.a.l(b, c)
                    }) : []
                },
                destroy: function(b) {
                    var c = this.o(),
                        d = "function" != typeof b || a.v(b) ?
                        function(a) {
                            return a === b
                        } : b;
                    this.P();
                    for (var e = c.length - 1; 0 <= e; e--) d(c[e]) && (c[e]._destroy = !0);
                    this.O()
                },
                destroyAll: function(b) {
                    return b === p ? this.destroy(function() {
                        return !0
                    }) : b ? this.destroy(function(c) {
                        return 0 <= a.a.l(b, c)
                    }) : []
                },
                indexOf: function(b) {
                    var c = this();
                    return a.a.l(c, b)
                },
                replace: function(a, c) {
                    var d = this.indexOf(a);
                    0 <= d && (this.P(), this.o()[d] = c, this.O())
                }
            };
            a.a.r("pop push reverse shift sort splice unshift".split(" "), function(b) {
                a.T.fn[b] = function() {
                    var a = this.o();
                    this.P();
                    this.kb(a, b, arguments);
                    a = a[b].apply(a, arguments);
                    this.O();
                    return a
                }
            });
            a.a.r(["slice"], function(b) {
                a.T.fn[b] = function() {
                    var a = this();
                    return a[b].apply(a, arguments)
                }
            });
            a.a.na && a.a.ra(a.T.fn, a.m.fn);
            a.b("observableArray", a.T);
            var I = "arrayChange";
            a.Ga.trackArrayChanges = function(b) {
                function c() {
                    if (!d) {
                        d = !0;
                        var c = b.notifySubscribers;
                        b.notifySubscribers = function(a, b) {
                            b && b !== F || ++f;
                            return c.apply(this, arguments)
                        };
                        var k = [].concat(b.o() || []);
                        e = null;
                        b.V(function(c) {
                            c = [].concat(c || []);
                            if (b.qb(I)) {
                                var d;
                                if (!e || 1 < f) e = a.a.Aa(k, c, {
                                    sparse: !0
                                });
                                d = e;
                                d.length && b.notifySubscribers(d, I)
                            }
                            k = c;
                            e = null;
                            f = 0
                        })
                    }
                }
                if (!b.kb) {
                    var d = !1,
                        e = null,
                        f = 0,
                        h = b.V;
                    b.V = b.subscribe = function(a, b, d) {
                        d === I && c();
                        return h.apply(this, arguments)
                    };
                    b.kb = function(b, c, l) {
                        function h(a, b, c) {
                            return r[r.length] = {
                                status: a,
                                value: b,
                                index: c
                            }
                        }
                        if (d && !f) {
                            var r = [],
                                m = b.length,
                                q = l.length,
                                s = 0;
                            switch (c) {
                            case "push":
                                s = m;
                            case "unshift":
                                for (c = 0; c < q; c++) h("added", l[c], s + c);
                                break;
                            case "pop":
                                s = m - 1;
                            case "shift":
                                m && h("deleted", b[s], s);
                                break;
                            case "splice":
                                c = Math.min(Math.max(0, 0 > l[0] ? m + l[0] : l[0]), m);
                                for (var m = 1 === q ? m : Math.min(c + (l[1] || 0), m), q = c + q - 2, s = Math.max(m, q), B = [], u = [], D = 2; c < s; ++c, ++D) c < m && u.push(h("deleted", b[c], c)), c < q && B.push(h("added", l[D], c));
                                a.a.nb(u, B);
                                break;
                            default:
                                return
                            }
                            e = r
                        }
                    }
                }
            };
            a.ba = a.h = function(b, c, d) {
                function e() {
                    q = !0;
                    a.a.A(v, function(a, b) {
                        b.F()
                    });
                    v = {};
                    x = 0;
                    n = !1
                }
                function f() {
                    var a = g.throttleEvaluation;
                    a && 0 <= a ? (clearTimeout(t), t = setTimeout(h, a)) : g.wa ? g.wa() : h()
                }
                function h() {
                    if (!r && !q) {
                        if (y && y()) {
                            if (!m) {
                                p();
                                return
                            }
                        } else m = !1;
                        r = !0;
                        try {
                            var b = v,
                                d = x;
                            a.k.jb({
                                za: function(a, c) {
                                    q || (d && b[c] ? (v[c] = b[c], ++x, delete b[c], --d) : v[c] || (v[c] = a.V(f), ++x))
                                },
                                ba: g,
                                pa: !x
                            });
                            v = {};
                            x = 0;
                            try {
                                var e = c ? s.call(c) : s()
                            } finally {
                                a.k.end(), d && a.a.A(b, function(a, b) {
                                    b.F()
                                }), n = !1
                            }
                            g.Ka(l, e) && (g.notifySubscribers(l, "beforeChange"), l = e, g.wa && !g.throttleEvaluation || g.notifySubscribers(l))
                        } finally {
                            r = !1
                        }
                        x || p()
                    }
                }
                function g() {
                    if (0 < arguments.length) {
                        if ("function" === typeof B) B.apply(c, arguments);
                        else
                        throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
                        return this
                    }
                    n && h();
                    a.k.zb(g);
                    return l
                }
                function k() {
                    return n || 0 < x
                }
                var l, n = !0,
                    r = !1,
                    m = !1,
                    q = !1,
                    s = b;
                s && "object" == typeof s ? (d = s, s = d.read) : (d = d || {}, s || (s = d.read));
                if ("function" != typeof s) throw Error("Pass a function that returns the value of the ko.computed");
                var B = d.write,
                    u = d.disposeWhenNodeIsRemoved || d.G || null,
                    D = d.disposeWhen || d.Da,
                    y = D,
                    p = e,
                    v = {},
                    x = 0,
                    t = null;
                c || (c = d.owner);
                a.N.call(g);
                a.a.sa(g, a.h.fn);
                g.o = function() {
                    n && !x && h();
                    return l
                };
                g.fa = function() {
                    return x
                };
                g.Yb = "function" === typeof d.write;
                g.F = function() {
                    p()
                };
                g.ga = k;
                var w = g.Ma;
                g.Ma = function(a) {
                    w.call(g, a);
                    g.wa = function() {
                        g.bb(l);
                        n = !0;
                        g.cb(g)
                    }
                };
                a.s(g, "peek", g.o);
                a.s(g, "dispose", g.F);
                a.s(g, "isActive", g.ga);
                a.s(g, "getDependenciesCount", g.fa);
                u && (m = !0, u.nodeType && (y = function() {
                    return !a.a.Ea(u) || D && D()
                }));
                !0 !== d.deferEvaluation && h();
                u && k() && u.nodeType && (p = function() {
                    a.a.u.Ab(u, p);
                    e()
                }, a.a.u.ja(u, p));
                return g
            };
            a.$b = function(b) {
                return a.Ha(b, a.h)
            };
            z = a.m.hc;
            a.h[z] = a.m;
            a.h.fn = {
                equalityComparer: G
            };
            a.h.fn[z] = a.h;
            a.a.na && a.a.ra(a.h.fn, a.N.fn);
            a.b("dependentObservable", a.h);
            a.b("computed", a.h);
            a.b("isComputed", a.$b);
            (function() {
                function b(a, f, h) {
                    h = h || new d;
                    a = f(a);
                    if ("object" != typeof a || null === a || a === p || a instanceof Date || a instanceof String || a instanceof Number || a instanceof Boolean) return a;
                    var g = a instanceof Array ? [] : {};
                    h.save(a, g);
                    c(a, function(c) {
                        var d = f(a[c]);
                        switch (typeof d) {
                        case "boolean":
                        case "number":
                        case "string":
                        case "function":
                            g[c] = d;
                            break;
                        case "object":
                        case "undefined":
                            var n = h.get(d);
                            g[c] = n !== p ? n : b(d, f, h)
                        }
                    });
                    return g
                }
                function c(a, b) {
                    if (a instanceof Array) {
                        for (var c =
                        0; c < a.length; c++) b(c);
                        "function" == typeof a.toJSON && b("toJSON")
                    } else
                    for (c in a) b(c)
                }
                function d() {
                    this.keys = [];
                    this.ab = []
                }
                a.Gb = function(c) {
                    if (0 == arguments.length) throw Error("When calling ko.toJS, pass the object you want to convert.");
                    return b(c, function(b) {
                        for (var c = 0; a.v(b) && 10 > c; c++) b = b();
                        return b
                    })
                };
                a.toJSON = function(b, c, d) {
                    b = a.Gb(b);
                    return a.a.Ya(b, c, d)
                };
                d.prototype = {
                    save: function(b, c) {
                        var d = a.a.l(this.keys, b);
                        0 <= d ? this.ab[d] = c : (this.keys.push(b), this.ab.push(c))
                    },
                    get: function(b) {
                        b = a.a.l(this.keys, b);
                        return 0 <= b ? this.ab[b] : p
                    }
                }
            })();
            a.b("toJS", a.Gb);
            a.b("toJSON", a.toJSON);
            (function() {
                a.i = {
                    p: function(b) {
                        switch (a.a.B(b)) {
                        case "option":
                            return !0 === b.__ko__hasDomDataOptionValue__ ? a.a.f.get(b, a.d.options.Pa) : 7 >= a.a.oa ? b.getAttributeNode("value") && b.getAttributeNode("value").specified ? b.value : b.text : b.value;
                        case "select":
                            return 0 <= b.selectedIndex ? a.i.p(b.options[b.selectedIndex]) : p;
                        default:
                            return b.value
                        }
                    },
                    X: function(b, c, d) {
                        switch (a.a.B(b)) {
                        case "option":
                            switch (typeof c) {
                            case "string":
                                a.a.f.set(b, a.d.options.Pa, p);
                                "__ko__hasDomDataOptionValue__" in b && delete b.__ko__hasDomDataOptionValue__;
                                b.value = c;
                                break;
                            default:
                                a.a.f.set(b, a.d.options.Pa, c), b.__ko__hasDomDataOptionValue__ = !0, b.value = "number" === typeof c ? c : ""
                            }
                            break;
                        case "select":
                            if ("" === c || null === c) c = p;
                            for (var e = -1, f = 0, h = b.options.length, g; f < h; ++f) if (g = a.i.p(b.options[f]), g == c || "" == g && c === p) {
                                e = f;
                                break
                            }
                            if (d || 0 <= e || c === p && 1 < b.size) b.selectedIndex = e;
                            break;
                        default:
                            if (null === c || c === p) c = "";
                            b.value = c
                        }
                    }
                }
            })();
            a.b("selectExtensions", a.i);
            a.b("selectExtensions.readValue", a.i.p);
            a.b("selectExtensions.writeValue", a.i.X);
            a.g = function() {
                function b(b) {
                    b = a.a.ta(b);
                    123 === b.charCodeAt(0) && (b = b.slice(1, -1));
                    var c = [],
                        d = b.match(e),
                        g, m, q = 0;
                    if (d) {
                        d.push(",");
                        for (var s = 0, B; B = d[s]; ++s) {
                            var u = B.charCodeAt(0);
                            if (44 === u) {
                                if (0 >= q) {
                                    g && c.push(m ? {
                                        key: g,
                                        value: m.join("")
                                    } : {
                                        unknown: g
                                    });
                                    g = m = q = 0;
                                    continue
                                }
                            } else if (58 === u) {
                                if (!m) continue
                            } else if (47 === u && s && 1 < B.length)(u = d[s - 1].match(f)) && !h[u[0]] && (b = b.substr(b.indexOf(B) + 1), d = b.match(e), d.push(","), s = -1, B = "/");
                            else if (40 === u || 123 === u || 91 === u)++q;
                            else if (41 === u || 125 === u || 93 === u)--q;
                            else if (!g && !m) {
                                g = 34 === u || 39 === u ? B.slice(1, -1) : B;
                                continue
                            }
                            m ? m.push(B) : m = [B]
                        }
                    }
                    return c
                }
                var c = ["true", "false", "null", "undefined"],
                    d = /^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,
                    e = RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]", "g"),
                    f = /[\])"'A-Za-z0-9_$]+$/,
                    h = {
                        "in": 1,
                        "return": 1,
                        "typeof": 1
                    },
                    g = {};
                return {
                    aa: [],
                    W: g,
                    Ra: b,
                    qa: function(e, l) {
                        function f(b, e) {
                            var l, k = a.getBindingHandler(b);
                            if (k && k.preprocess ? e = k.preprocess(e, b, f) : 1) {
                                if (k = g[b]) l = e, 0 <= a.a.l(c, l) ? l = !1 : (k = l.match(d), l = null === k ? !1 : k[1] ? "Object(" + k[1] + ")" + k[2] : l), k = l;
                                k && m.push("'" + b + "':function(_z){" + l + "=_z}");
                                q && (e = "function(){return " + e + " }");
                                h.push("'" + b + "':" + e)
                            }
                        }
                        l = l || {};
                        var h = [],
                            m = [],
                            q = l.valueAccessors,
                            s = "string" === typeof e ? b(e) : e;
                        a.a.r(s, function(a) {
                            f(a.key || a.unknown, a.value)
                        });
                        m.length && f("_ko_property_writers", "{" + m.join(",") + " }");
                        return h.join(",")
                    },
                    bc: function(a, b) {
                        for (var c = 0; c < a.length; c++) if (a[c].key == b) return !0;
                        return !1
                    },
                    va: function(b, c, d, e, g) {
                        if (b && a.v(b))!a.ub(b) || g && b.o() === e || b(e);
                        else if ((b = c.get("_ko_property_writers")) && b[d]) b[d](e)
                    }
                }
            }();
            a.b("expressionRewriting", a.g);
            a.b("expressionRewriting.bindingRewriteValidators", a.g.aa);
            a.b("expressionRewriting.parseObjectLiteral", a.g.Ra);
            a.b("expressionRewriting.preProcessBindings", a.g.qa);
            a.b("expressionRewriting._twoWayBindings", a.g.W);
            a.b("jsonExpressionRewriting", a.g);
            a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson", a.g.qa);
            (function() {
                function b(a) {
                    return 8 == a.nodeType && h.test(f ? a.text : a.nodeValue)
                }
                function c(a) {
                    return 8 == a.nodeType && g.test(f ? a.text : a.nodeValue)
                }
                function d(a, d) {
                    for (var e = a, g = 1, k = []; e = e.nextSibling;) {
                        if (c(e) && (g--, 0 === g)) return k;
                        k.push(e);
                        b(e) && g++
                    }
                    if (!d) throw Error("Cannot find closing comment tag to match: " + a.nodeValue);
                    return null
                }
                function e(a, b) {
                    var c = d(a, b);
                    return c ? 0 < c.length ? c[c.length - 1].nextSibling : a.nextSibling : null
                }
                var f = w && "\x3c!--test--\x3e" === w.createComment("test").text,
                    h = f ? /^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/ : /^\s*ko(?:\s+([\s\S]+))?\s*$/,
                    g = f ? /^\x3c!--\s*\/ko\s*--\x3e$/ : /^\s*\/ko\s*$/,
                    k = {
                        ul: !0,
                        ol: !0
                    };
                a.e = {
                    Q: {},
                    childNodes: function(a) {
                        return b(a) ? d(a) : a.childNodes
                    },
                    da: function(c) {
                        if (b(c)) {
                            c = a.e.childNodes(c);
                            for (var d = 0, e = c.length; d < e; d++) a.removeNode(c[d])
                        } else a.a.Fa(c)
                    },
                    U: function(c, d) {
                        if (b(c)) {
                            a.e.da(c);
                            for (var e = c.nextSibling, g = 0, k = d.length; g < k; g++) e.parentNode.insertBefore(d[g], e)
                        } else a.a.U(c, d)
                    },
                    yb: function(a, c) {
                        b(a) ? a.parentNode.insertBefore(c, a.nextSibling) : a.firstChild ? a.insertBefore(c, a.firstChild) : a.appendChild(c)
                    },
                    rb: function(c, d, e) {
                        e ? b(c) ? c.parentNode.insertBefore(d, e.nextSibling) : e.nextSibling ? c.insertBefore(d, e.nextSibling) : c.appendChild(d) : a.e.yb(c, d)
                    },
                    firstChild: function(a) {
                        return b(a) ? !a.nextSibling || c(a.nextSibling) ? null : a.nextSibling : a.firstChild
                    },
                    nextSibling: function(a) {
                        b(a) && (a = e(a));
                        return a.nextSibling && c(a.nextSibling) ? null : a.nextSibling
                    },
                    Xb: b,
                    lc: function(a) {
                        return (a = (f ? a.text : a.nodeValue).match(h)) ? a[1] : null
                    },
                    wb: function(d) {
                        if (k[a.a.B(d)]) {
                            var g = d.firstChild;
                            if (g) {
                                do
                                if (1 === g.nodeType) {
                                    var f;
                                    f = g.firstChild;
                                    var h = null;
                                    if (f) {
                                        do
                                        if (h) h.push(f);
                                        else if (b(f)) {
                                            var q = e(f, !0);
                                            q ? f = q : h = [f]
                                        } else c(f) && (h = [f]);
                                        while (f = f.nextSibling)
                                    }
                                    if (f = h) for (h = g.nextSibling, q = 0; q < f.length; q++) h ? d.insertBefore(f[q], h) : d.appendChild(f[q])
                                }
                                while (g = g.nextSibling)
                            }
                        }
                    }
                }
            })();
            a.b("virtualElements", a.e);
            a.b("virtualElements.allowedBindings", a.e.Q);
            a.b("virtualElements.emptyNode", a.e.da);
            a.b("virtualElements.insertAfter", a.e.rb);
            a.b("virtualElements.prepend", a.e.yb);
            a.b("virtualElements.setDomNodeChildren", a.e.U);
            (function() {
                a.J = function() {
                    this.Nb = {}
                };
                a.a.extend(a.J.prototype, {
                    nodeHasBindings: function(b) {
                        switch (b.nodeType) {
                        case 1:
                            return null != b.getAttribute("data-bind");
                        case 8:
                            return a.e.Xb(b);
                        default:
                            return !1
                        }
                    },
                    getBindings: function(a, c) {
                        var d = this.getBindingsString(a, c);
                        return d ? this.parseBindingsString(d, c, a) : null
                    },
                    getBindingAccessors: function(a, c) {
                        var d = this.getBindingsString(a, c);
                        return d ? this.parseBindingsString(d, c, a, {
                            valueAccessors: !0
                        }) : null
                    },
                    getBindingsString: function(b) {
                        switch (b.nodeType) {
                        case 1:
                            return b.getAttribute("data-bind");
                        case 8:
                            return a.e.lc(b);
                        default:
                            return null
                        }
                    },
                    parseBindingsString: function(b, c, d, e) {
                        try {
                            var f = this.Nb,
                                h = b + (e && e.valueAccessors || ""),
                                g;
                            if (!(g = f[h])) {
                                var k, l = "with($context){with($data||{}){return{" + a.g.qa(b, e) + "}}}";
                                k = new Function("$context", "$element", l);
                                g = f[h] = k
                            }
                            return g(c, d)
                        } catch (n) {
                            throw n.message = "Unable to parse bindings.\nBindings value: " + b + "\nMessage: " + n.message, n;
                        }
                    }
                });
                a.J.instance = new a.J
            })();
            a.b("bindingProvider", a.J);
            (function() {
                function b(a) {
                    return function() {
                        return a
                    }
                }
                function c(a) {
                    return a()
                }

                function d(b) {
                    return a.a.Oa(a.k.t(b), function(a, c) {
                        return function() {
                            return b()[c]
                        }
                    })
                }
                function e(a, b) {
                    return d(this.getBindings.bind(this, a, b))
                }
                function f(b, c, d) {
                    var e, g = a.e.firstChild(c),
                        k = a.J.instance,
                        f = k.preprocessNode;
                    if (f) {
                        for (; e = g;) g = a.e.nextSibling(e), f.call(k, e);
                        g = a.e.firstChild(c)
                    }
                    for (; e = g;) g = a.e.nextSibling(e), h(b, e, d)
                }
                function h(b, c, d) {
                    var e = !0,
                        g = 1 === c.nodeType;
                    g && a.e.wb(c);
                    if (g && d || a.J.instance.nodeHasBindings(c)) e = k(c, null, b, d).shouldBindDescendants;
                    e && !n[a.a.B(c)] && f(b, c, !g)
                }
                function g(b) {
                    var c = [],
                        d = {},
                        e = [];
                    a.a.A(b, function y(g) {
                        if (!d[g]) {
                            var k = a.getBindingHandler(g);
                            k && (k.after && (e.push(g), a.a.r(k.after, function(c) {
                                if (b[c]) {
                                    if (-1 !== a.a.l(e, c)) throw Error("Cannot combine the following bindings, because they have a cyclic dependency: " + e.join(", "));
                                    y(c)
                                }
                            }), e.length--), c.push({
                                key: g,
                                pb: k
                            }));
                            d[g] = !0
                        }
                    });
                    return c
                }
                function k(b, d, k, f) {
                    var h = a.a.f.get(b, r);
                    if (!d) {
                        if (h) throw Error("You cannot apply bindings multiple times to the same element.");
                        a.a.f.set(b, r, !0)
                    }!h && f && a.Eb(b, k);
                    var l;
                    if (d && "function" !== typeof d) l = d;
                    else {
                        var n = a.J.instance,
                            m = n.getBindingAccessors || e,
                            x = a.h(function() {
                                (l = d ? d(k, b) : m.call(n, b, k)) && k.D && k.D();
                                return l
                            }, null, {
                                G: b
                            });
                        l && x.ga() || (x = null)
                    }
                    var t;
                    if (l) {
                        var w = x ?
                        function(a) {
                            return function() {
                                return c(x()[a])
                            }
                        } : function(a) {
                            return l[a]
                        },
                            z = function() {
                                return a.a.Oa(x ? x() : l, c)
                            };
                        z.get = function(a) {
                            return l[a] && c(w(a))
                        };
                        z.has = function(a) {
                            return a in l
                        };
                        f = g(l);
                        a.a.r(f, function(c) {
                            var d = c.pb.init,
                                e = c.pb.update,
                                g = c.key;
                            if (8 === b.nodeType && !a.e.Q[g]) throw Error("The binding '" + g + "' cannot be used with virtual elements");
                            try {
                                "function" == typeof d && a.k.t(function() {
                                    var a = d(b, w(g), z, k.$data, k);
                                    if (a && a.controlsDescendantBindings) {
                                        if (t !== p) throw Error("Multiple bindings (" + t + " and " + g + ") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");
                                        t = g
                                    }
                                }), "function" == typeof e && a.h(function() {
                                    e(b, w(g), z, k.$data, k)
                                }, null, {
                                    G: b
                                })
                            } catch (f) {
                                throw f.message = 'Unable to process binding "' + g + ": " + l[g] + '"\nMessage: ' + f.message, f;
                            }
                        })
                    }
                    return {
                        shouldBindDescendants: t === p
                    }
                }

                function l(b) {
                    return b && b instanceof a.I ? b : new a.I(b)
                }
                a.d = {};
                var n = {
                    script: !0
                };
                a.getBindingHandler = function(b) {
                    return a.d[b]
                };
                a.I = function(b, c, d, e) {
                    var g = this,
                        k = "function" == typeof b && !a.v(b),
                        f, h = a.h(function() {
                            var f = k ? b() : b,
                                l = a.a.c(f);
                            c ? (c.D && c.D(), a.a.extend(g, c), h && (g.D = h)) : (g.$parents = [], g.$root = l, g.ko = a);
                            g.$rawData = f;
                            g.$data = l;
                            d && (g[d] = l);
                            e && e(g, c, l);
                            return g.$data
                        }, null, {
                            Da: function() {
                                return f && !a.a.eb(f)
                            },
                            G: !0
                        });
                    h.ga() && (g.D = h, h.equalityComparer = null, f = [], h.Jb = function(b) {
                        f.push(b);
                        a.a.u.ja(b, function(b) {
                            a.a.ma(f, b);
                            f.length || (h.F(), g.D = h = p)
                        })
                    })
                };
                a.I.prototype.createChildContext = function(b, c, d) {
                    return new a.I(b, this, c, function(a, b) {
                        a.$parentContext = b;
                        a.$parent = b.$data;
                        a.$parents = (b.$parents || []).slice(0);
                        a.$parents.unshift(a.$parent);
                        d && d(a)
                    })
                };
                a.I.prototype.extend = function(b) {
                    return new a.I(this.D || this.$data, this, null, function(c, d) {
                        c.$rawData = d.$rawData;
                        a.a.extend(c, "function" == typeof b ? b() : b)
                    })
                };
                var r = a.a.f.L(),
                    m = a.a.f.L();
                a.Eb = function(b, c) {
                    if (2 == arguments.length) a.a.f.set(b, m, c), c.D && c.D.Jb(b);
                    else
                    return a.a.f.get(b, m)
                };
                a.xa = function(b, c, d) {
                    1 === b.nodeType && a.e.wb(b);
                    return k(b, c, l(d), !0)
                };
                a.Lb = function(c, e, g) {
                    g = l(g);
                    return a.xa(c, "function" === typeof e ? d(e.bind(null, g, c)) : a.a.Oa(e, b), g)
                };
                a.gb = function(a, b) {
                    1 !== b.nodeType && 8 !== b.nodeType || f(l(a), b, !0)
                };
                a.fb = function(a, b) {
                    !t && A.jQuery && (t = A.jQuery);
                    if (b && 1 !== b.nodeType && 8 !== b.nodeType) throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");
                    b = b || A.document.body;
                    h(l(a), b, !0)
                };
                a.Ca = function(b) {
                    switch (b.nodeType) {
                    case 1:
                    case 8:
                        var c = a.Eb(b);
                        if (c) return c;
                        if (b.parentNode) return a.Ca(b.parentNode)
                    }
                    return p
                };
                a.Pb = function(b) {
                    return (b = a.Ca(b)) ? b.$data : p
                };
                a.b("bindingHandlers", a.d);
                a.b("applyBindings", a.fb);
                a.b("applyBindingsToDescendants", a.gb);
                a.b("applyBindingAccessorsToNode", a.xa);
                a.b("applyBindingsToNode", a.Lb);
                a.b("contextFor", a.Ca);
                a.b("dataFor", a.Pb)
            })();
            var L = {
                "class": "className",
                "for": "htmlFor"
            };
            a.d.attr = {
                update: function(b, c) {
                    var d = a.a.c(c()) || {};
                    a.a.A(d, function(c, d) {
                        d = a.a.c(d);
                        var h = !1 === d || null === d || d === p;
                        h && b.removeAttribute(c);
                        8 >= a.a.oa && c in L ? (c = L[c], h ? b.removeAttribute(c) : b[c] = d) : h || b.setAttribute(c, d.toString());
                        "name" === c && a.a.Cb(b, h ? "" : d.toString())
                    })
                }
            };
            (function() {
                a.d.checked = {
                    after: ["value", "attr"],
                    init: function(b, c, d) {
                        function e() {
                            return d.has("checkedValue") ? a.a.c(d.get("checkedValue")) : b.value
                        }
                        function f() {
                            var g = b.checked,
                                f = r ? e() : g;
                            if (!a.ca.pa() && (!k || g)) {
                                var h = a.k.t(c);
                                l ? n !== f ? (g && (a.a.Y(h, f, !0), a.a.Y(h, n, !1)), n = f) : a.a.Y(h, f, g) : a.g.va(h, d, "checked", f, !0)
                            }
                        }
                        function h() {
                            var d = a.a.c(c());
                            b.checked = l ? 0 <= a.a.l(d, e()) : g ? d : e() === d
                        }
                        var g = "checkbox" == b.type,
                            k = "radio" == b.type;
                        if (g || k) {
                            var l = g && a.a.c(c()) instanceof Array,
                                n = l ? e() : p,
                                r = k || l;
                            k && !b.name && a.d.uniqueName.init(b, function() {
                                return !0
                            });
                            a.ba(f, null, {
                                G: b
                            });
                            a.a.q(b, "click", f);
                            a.ba(h, null, {
                                G: b
                            })
                        }
                    }
                };
                a.g.W.checked = !0;
                a.d.checkedValue = {
                    update: function(b, c) {
                        b.value = a.a.c(c())
                    }
                }
            })();
            a.d.css = {
                update: function(b, c) {
                    var d = a.a.c(c());
                    "object" == typeof d ? a.a.A(d, function(c, d) {
                        d = a.a.c(d);
                        a.a.ua(b, c, d)
                    }) : (d = String(d || ""), a.a.ua(b, b.__ko__cssValue, !1), b.__ko__cssValue = d, a.a.ua(b, d, !0))
                }
            };
            a.d.enable = {
                update: function(b, c) {
                    var d = a.a.c(c());
                    d && b.disabled ? b.removeAttribute("disabled") : d || b.disabled || (b.disabled = !0)
                }
            };
            a.d.disable = {
                update: function(b, c) {
                    a.d.enable.update(b, function() {
                        return !a.a.c(c())
                    })
                }
            };
            a.d.event = {
                init: function(b, c, d, e, f) {
                    var h = c() || {};
                    a.a.A(h, function(g) {
                        "string" == typeof g && a.a.q(b, g, function(b) {
                            var h, n = c()[g];
                            if (n) {
                                try {
                                    var r = a.a.R(arguments);
                                    e = f.$data;
                                    r.unshift(e);
                                    h = n.apply(e, r)
                                } finally {
                                    !0 !== h && (b.preventDefault ? b.preventDefault() : b.returnValue = !1)
                                }!1 === d.get(g + "Bubble") && (b.cancelBubble = !0, b.stopPropagation && b.stopPropagation())
                            }
                        })
                    })
                }
            };
            a.d.foreach = {
                vb: function(b) {
                    return function() {
                        var c = b(),
                            d = a.a.Sa(c);
                        if (!d || "number" == typeof d.length) return {
                            foreach: c,
                            templateEngine: a.K.Ja
                        };
                        a.a.c(c);
                        return {
                            foreach: d.data,
                            as: d.as,
                            includeDestroyed: d.includeDestroyed,
                            afterAdd: d.afterAdd,
                            beforeRemove: d.beforeRemove,
                            afterRender: d.afterRender,
                            beforeMove: d.beforeMove,
                            afterMove: d.afterMove,
                            templateEngine: a.K.Ja
                        }
                    }
                },
                init: function(b, c) {
                    return a.d.template.init(b, a.d.foreach.vb(c))
                },
                update: function(b, c, d, e, f) {
                    return a.d.template.update(b, a.d.foreach.vb(c), d, e, f)
                }
            };
            a.g.aa.foreach = !1;
            a.e.Q.foreach = !0;
            a.d.hasfocus = {
                init: function(b, c, d) {
                    function e(e) {
                        b.__ko_hasfocusUpdating = !0;
                        var k = b.ownerDocument;
                        if ("activeElement" in k) {
                            var f;
                            try {
                                f = k.activeElement
                            } catch (h) {
                                f = k.body
                            }
                            e = f === b
                        }
                        k = c();
                        a.g.va(k, d, "hasfocus", e, !0);
                        b.__ko_hasfocusLastValue = e;
                        b.__ko_hasfocusUpdating = !1
                    }
                    var f = e.bind(null, !0),
                        h = e.bind(null, !1);
                    a.a.q(b, "focus", f);
                    a.a.q(b, "focusin", f);
                    a.a.q(b, "blur", h);
                    a.a.q(b, "focusout", h)
                },
                update: function(b, c) {
                    var d = !! a.a.c(c());
                    b.__ko_hasfocusUpdating || b.__ko_hasfocusLastValue === d || (d ? b.focus() : b.blur(), a.k.t(a.a.ha, null, [b, d ? "focusin" : "focusout"]))
                }
            };
            a.g.W.hasfocus = !0;
            a.d.hasFocus = a.d.hasfocus;
            a.g.W.hasFocus = !0;
            a.d.html = {
                init: function() {
                    return {
                        controlsDescendantBindings: !0
                    }
                },
                update: function(b, c) {
                    a.a.Va(b, c())
                }
            };
            H("if");
            H("ifnot", !1, !0);
            H("with", !0, !1, function(a, c) {
                return a.createChildContext(c)
            });
            var J = {};
            a.d.options = {
                init: function(b) {
                    if ("select" !== a.a.B(b)) throw Error("options binding applies only to SELECT elements");
                    for (; 0 < b.length;) b.remove(0);
                    return {
                        controlsDescendantBindings: !0
                    }
                },
                update: function(b, c, d) {
                    function e() {
                        return a.a.la(b.options, function(a) {
                            return a.selected
                        })
                    }
                    function f(a, b, c) {
                        var d = typeof b;
                        return "function" == d ? b(a) : "string" == d ? a[b] : c
                    }
                    function h(c, d) {
                        if (r.length) {
                            var e = 0 <= a.a.l(r, a.i.p(d[0]));
                            a.a.Db(d[0], e);
                            m && !e && a.k.t(a.a.ha, null, [b, "change"])
                        }
                    }
                    var g = 0 != b.length && b.multiple ? b.scrollTop : null,
                        k = a.a.c(c()),
                        l = d.get("optionsIncludeDestroyed");
                    c = {};
                    var n, r;
                    r = b.multiple ? a.a.ya(e(), a.i.p) : 0 <= b.selectedIndex ? [a.i.p(b.options[b.selectedIndex])] : [];
                    k && ("undefined" == typeof k.length && (k = [k]), n = a.a.la(k, function(b) {
                        return l || b === p || null === b || !a.a.c(b._destroy)
                    }), d.has("optionsCaption") && (k = a.a.c(d.get("optionsCaption")), null !== k && k !== p && n.unshift(J)));
                    var m = !1;
                    c.beforeRemove = function(a) {
                        b.removeChild(a)
                    };
                    k = h;
                    d.has("optionsAfterRender") && (k = function(b, c) {
                        h(0, c);
                        a.k.t(d.get("optionsAfterRender"), null, [c[0], b !== J ? b : p])
                    });
                    a.a.Ua(b, n, function(c, e, g) {
                        g.length && (r = g[0].selected ? [a.i.p(g[0])] : [], m = !0);
                        e = b.ownerDocument.createElement("option");
                        c === J ? (a.a.Xa(e, d.get("optionsCaption")), a.i.X(e, p)) : (g = f(c, d.get("optionsValue"), c), a.i.X(e, a.a.c(g)), c = f(c, d.get("optionsText"), g), a.a.Xa(e, c));
                        return [e]
                    }, c, k);
                    a.k.t(function() {
                        d.get("valueAllowUnset") && d.has("value") ? a.i.X(b, a.a.c(d.get("value")), !0) : (b.multiple ? r.length && e().length < r.length : r.length && 0 <= b.selectedIndex ? a.i.p(b.options[b.selectedIndex]) !== r[0] : r.length || 0 <= b.selectedIndex) && a.a.ha(b, "change")
                    });
                    a.a.Tb(b);
                    g && 20 < Math.abs(g - b.scrollTop) && (b.scrollTop = g)
                }
            };
            a.d.options.Pa = a.a.f.L();
            a.d.selectedOptions = {
                after: ["options", "foreach"],
                init: function(b, c, d) {
                    a.a.q(b, "change", function() {
                        var e = c(),
                            f = [];
                        a.a.r(b.getElementsByTagName("option"), function(b) {
                            b.selected && f.push(a.i.p(b))
                        });
                        a.g.va(e, d, "selectedOptions", f)
                    })
                },
                update: function(b, c) {
                    if ("select" != a.a.B(b)) throw Error("values binding applies only to SELECT elements");
                    var d = a.a.c(c());
                    d && "number" == typeof d.length && a.a.r(b.getElementsByTagName("option"), function(b) {
                        var c =
                        0 <= a.a.l(d, a.i.p(b));
                        a.a.Db(b, c)
                    })
                }
            };
            a.g.W.selectedOptions = !0;
            a.d.style = {
                update: function(b, c) {
                    var d = a.a.c(c() || {});
                    a.a.A(d, function(c, d) {
                        d = a.a.c(d);
                        b.style[c] = d || ""
                    })
                }
            };
            a.d.submit = {
                init: function(b, c, d, e, f) {
                    if ("function" != typeof c()) throw Error("The value for a submit binding must be a function");
                    a.a.q(b, "submit", function(a) {
                        var d, e = c();
                        try {
                            d = e.call(f.$data, b)
                        } finally {
                            !0 !== d && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
                        }
                    })
                }
            };
            a.d.text = {
                init: function() {
                    return {
                        controlsDescendantBindings: !0
                    }
                },
                update: function(b, c) {
                    a.a.Xa(b, c())
                }
            };
            a.e.Q.text = !0;
            a.d.uniqueName = {
                init: function(b, c) {
                    if (c()) {
                        var d = "ko_unique_" + ++a.d.uniqueName.Ob;
                        a.a.Cb(b, d)
                    }
                }
            };
            a.d.uniqueName.Ob = 0;
            a.d.value = {
                after: ["options", "foreach"],
                init: function(b, c, d) {
                    function e() {
                        g = !1;
                        var e = c(),
                            f = a.i.p(b);
                        a.g.va(e, d, "value", f)
                    }
                    var f = ["change"],
                        h = d.get("valueUpdate"),
                        g = !1;
                    h && ("string" == typeof h && (h = [h]), a.a.$(f, h), f = a.a.ib(f));
                    !a.a.oa || "input" != b.tagName.toLowerCase() || "text" != b.type || "off" == b.autocomplete || b.form && "off" == b.form.autocomplete || -1 != a.a.l(f, "propertychange") || (a.a.q(b, "propertychange", function() {
                        g = !0
                    }), a.a.q(b, "focus", function() {
                        g = !1
                    }), a.a.q(b, "blur", function() {
                        g && e()
                    }));
                    a.a.r(f, function(c) {
                        var d = e;
                        a.a.kc(c, "after") && (d = function() {
                            setTimeout(e, 0)
                        }, c = c.substring(5));
                        a.a.q(b, c, d)
                    })
                },
                update: function(b, c, d) {
                    var e = a.a.c(c());
                    c = a.i.p(b);
                    if (e !== c) if ("select" === a.a.B(b)) {
                        var f = d.get("valueAllowUnset");
                        d = function() {
                            a.i.X(b, e, f)
                        };
                        d();
                        f || e === a.i.p(b) ? setTimeout(d, 0) : a.k.t(a.a.ha, null, [b, "change"])
                    } else a.i.X(b, e)
                }
            };
            a.g.W.value = !0;
            a.d.visible = {
                update: function(b, c) {
                    var d = a.a.c(c()),
                        e = "none" != b.style.display;
                    d && !e ? b.style.display = "" : !d && e && (b.style.display = "none")
                }
            };
            (function(b) {
                a.d[b] = {
                    init: function(c, d, e, f, h) {
                        return a.d.event.init.call(this, c, function() {
                            var a = {};
                            a[b] = d();
                            return a
                        }, e, f, h)
                    }
                }
            })("click");
            a.C = function() {};
            a.C.prototype.renderTemplateSource = function() {
                throw Error("Override renderTemplateSource");
            };
            a.C.prototype.createJavaScriptEvaluatorBlock = function() {
                throw Error("Override createJavaScriptEvaluatorBlock");
            };
            a.C.prototype.makeTemplateSource =

            function(b, c) {
                if ("string" == typeof b) {
                    c = c || w;
                    var d = c.getElementById(b);
                    if (!d) throw Error("Cannot find template with ID " + b);
                    return new a.n.j(d)
                }
                if (1 == b.nodeType || 8 == b.nodeType) return new a.n.Z(b);
                throw Error("Unknown template type: " + b);
            };
            a.C.prototype.renderTemplate = function(a, c, d, e) {
                a = this.makeTemplateSource(a, e);
                return this.renderTemplateSource(a, c, d)
            };
            a.C.prototype.isTemplateRewritten = function(a, c) {
                return !1 === this.allowTemplateRewriting ? !0 : this.makeTemplateSource(a, c).data("isRewritten")
            };
            a.C.prototype.rewriteTemplate =

            function(a, c, d) {
                a = this.makeTemplateSource(a, d);
                c = c(a.text());
                a.text(c);
                a.data("isRewritten", !0)
            };
            a.b("templateEngine", a.C);
            a.Za = function() {
                function b(b, c, d, g) {
                    b = a.g.Ra(b);
                    for (var k = a.g.aa, l = 0; l < b.length; l++) {
                        var n = b[l].key;
                        if (k.hasOwnProperty(n)) {
                            var r = k[n];
                            if ("function" === typeof r) {
                                if (n = r(b[l].value)) throw Error(n);
                            } else if (!r) throw Error("This template engine does not support the '" + n + "' binding within its templates");
                        }
                    }
                    d = "ko.__tr_ambtns(function($context,$element){return(function(){return{ " + a.g.qa(b, {
                        valueAccessors: !0
                    }) + " } })()},'" + d.toLowerCase() + "')";
                    return g.createJavaScriptEvaluatorBlock(d) + c
                }
                var c = /(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,
                    d = /\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;
                return {
                    Ub: function(b, c, d) {
                        c.isTemplateRewritten(b, d) || c.rewriteTemplate(b, function(b) {
                            return a.Za.dc(b, c)
                        }, d)
                    },
                    dc: function(a, f) {
                        return a.replace(c, function(a, c, d, e, n) {
                            return b(n, c, d, f)
                        }).replace(d, function(a, c) {
                            return b(c, "\x3c!-- ko --\x3e", "#comment", f)
                        })
                    },
                    Mb: function(b, c) {
                        return a.w.Na(function(d, g) {
                            var k = d.nextSibling;
                            k && k.nodeName.toLowerCase() === c && a.xa(k, b, g)
                        })
                    }
                }
            }();
            a.b("__tr_ambtns", a.Za.Mb);
            (function() {
                a.n = {};
                a.n.j = function(a) {
                    this.j = a
                };
                a.n.j.prototype.text = function() {
                    var b = a.a.B(this.j),
                        b = "script" === b ? "text" : "textarea" === b ? "value" : "innerHTML";
                    if (0 == arguments.length) return this.j[b];
                    var c = arguments[0];
                    "innerHTML" === b ? a.a.Va(this.j, c) : this.j[b] = c
                };
                var b = a.a.f.L() + "_";
                a.n.j.prototype.data = function(c) {
                    if (1 === arguments.length) return a.a.f.get(this.j, b + c);
                    a.a.f.set(this.j, b + c, arguments[1])
                };
                var c = a.a.f.L();
                a.n.Z = function(a) {
                    this.j = a
                };
                a.n.Z.prototype = new a.n.j;
                a.n.Z.prototype.text = function() {
                    if (0 == arguments.length) {
                        var b = a.a.f.get(this.j, c) || {};
                        b.$a === p && b.Ba && (b.$a = b.Ba.innerHTML);
                        return b.$a
                    }
                    a.a.f.set(this.j, c, {
                        $a: arguments[0]
                    })
                };
                a.n.j.prototype.nodes = function() {
                    if (0 == arguments.length) return (a.a.f.get(this.j, c) || {}).Ba;
                    a.a.f.set(this.j, c, {
                        Ba: arguments[0]
                    })
                };
                a.b("templateSources", a.n);
                a.b("templateSources.domElement", a.n.j);
                a.b("templateSources.anonymousTemplate", a.n.Z)
            })();
            (function() {
                function b(b, c, d) {
                    var e;
                    for (c = a.e.nextSibling(c); b && (e = b) !== c;) b = a.e.nextSibling(e), d(e, b)
                }
                function c(c, d) {
                    if (c.length) {
                        var e = c[0],
                            f = c[c.length - 1],
                            h = e.parentNode,
                            m = a.J.instance,
                            q = m.preprocessNode;
                        if (q) {
                            b(e, f, function(a, b) {
                                var c = a.previousSibling,
                                    d = q.call(m, a);
                                d && (a === e && (e = d[0] || b), a === f && (f = d[d.length - 1] || c))
                            });
                            c.length = 0;
                            if (!e) return;
                            e === f ? c.push(e) : (c.push(e, f), a.a.ea(c, h))
                        }
                        b(e, f, function(b) {
                            1 !== b.nodeType && 8 !== b.nodeType || a.fb(d, b)
                        });
                        b(e, f, function(b) {
                            1 !== b.nodeType && 8 !== b.nodeType || a.w.Ib(b, [d])
                        });
                        a.a.ea(c, h)
                    }
                }
                function d(a) {
                    return a.nodeType ? a : 0 < a.length ? a[0] : null
                }
                function e(b, e, h, n, r) {
                    r = r || {};
                    var m = b && d(b),
                        m = m && m.ownerDocument,
                        q = r.templateEngine || f;
                    a.Za.Ub(h, q, m);
                    h = q.renderTemplate(h, n, r, m);
                    if ("number" != typeof h.length || 0 < h.length && "number" != typeof h[0].nodeType) throw Error("Template engine must return an array of DOM nodes");
                    m = !1;
                    switch (e) {
                    case "replaceChildren":
                        a.e.U(b, h);
                        m = !0;
                        break;
                    case "replaceNode":
                        a.a.Bb(b, h);
                        m = !0;
                        break;
                    case "ignoreTargetNode":
                        break;
                    default:
                        throw Error("Unknown renderMode: " + e);
                    }
                    m && (c(h, n), r.afterRender && a.k.t(r.afterRender, null, [h, n.$data]));
                    return h
                }
                var f;
                a.Wa = function(b) {
                    if (b != p && !(b instanceof a.C)) throw Error("templateEngine must inherit from ko.templateEngine");
                    f = b
                };
                a.Ta = function(b, c, h, n, r) {
                    h = h || {};
                    if ((h.templateEngine || f) == p) throw Error("Set a template engine before calling renderTemplate");
                    r = r || "replaceChildren";
                    if (n) {
                        var m = d(n);
                        return a.h(function() {
                            var f = c && c instanceof a.I ? c : new a.I(a.a.c(c)),
                                p = a.v(b) ? b() : "function" == typeof b ? b(f.$data, f) : b,
                                f = e(n, r, p, f, h);
                            "replaceNode" == r && (n = f, m = d(n))
                        }, null, {
                            Da: function() {
                                return !m || !a.a.Ea(m)
                            },
                            G: m && "replaceNode" == r ? m.parentNode : m
                        })
                    }
                    return a.w.Na(function(d) {
                        a.Ta(b, c, h, d, "replaceNode")
                    })
                };
                a.jc = function(b, d, f, h, r) {
                    function m(a, b) {
                        c(b, s);
                        f.afterRender && f.afterRender(b, a)
                    }
                    function q(a, c) {
                        s = r.createChildContext(a, f.as, function(a) {
                            a.$index = c
                        });
                        var d = "function" == typeof b ? b(a, s) : b;
                        return e(null, "ignoreTargetNode", d, s, f)
                    }
                    var s;
                    return a.h(function() {
                        var b = a.a.c(d) || [];
                        "undefined" == typeof b.length && (b = [b]);
                        b = a.a.la(b, function(b) {
                            return f.includeDestroyed || b === p || null === b || !a.a.c(b._destroy)
                        });
                        a.k.t(a.a.Ua, null, [h, b, q, f, m])
                    }, null, {
                        G: h
                    })
                };
                var h = a.a.f.L();
                a.d.template = {
                    init: function(b, c) {
                        var d = a.a.c(c());
                        "string" == typeof d || d.name ? a.e.da(b) : (d = a.e.childNodes(b), d = a.a.ec(d), (new a.n.Z(b)).nodes(d));
                        return {
                            controlsDescendantBindings: !0
                        }
                    },
                    update: function(b, c, d, e, f) {
                        var m = c(),
                            q;
                        c = a.a.c(m);
                        d = !0;
                        e = null;
                        "string" == typeof c ? c = {} : (m = c.name, "if" in c && (d = a.a.c(c["if"])), d && "ifnot" in c && (d = !a.a.c(c.ifnot)), q = a.a.c(c.data));
                        "foreach" in c ? e = a.jc(m || b, d && c.foreach || [], c, b, f) : d ? (f = "data" in c ? f.createChildContext(q, c.as) : f, e = a.Ta(m || b, f, c, b)) : a.e.da(b);
                        f = e;
                        (q = a.a.f.get(b, h)) && "function" == typeof q.F && q.F();
                        a.a.f.set(b, h, f && f.ga() ? f : p)
                    }
                };
                a.g.aa.template = function(b) {
                    b = a.g.Ra(b);
                    return 1 == b.length && b[0].unknown || a.g.bc(b, "name") ? null : "This template engine does not support anonymous templates nested within its templates"
                };
                a.e.Q.template = !0
            })();
            a.b("setTemplateEngine", a.Wa);
            a.b("renderTemplate", a.Ta);
            a.a.nb = function(a, c, d) {
                if (a.length && c.length) {
                    var e, f, h, g, k;
                    for (e =
                    f = 0;
                    (!d || e < d) && (g = a[f]); ++f) {
                        for (h = 0; k = c[h]; ++h) if (g.value === k.value) {
                            g.moved = k.index;
                            k.moved = g.index;
                            c.splice(h, 1);
                            e = h = 0;
                            break
                        }
                        e += h
                    }
                }
            };
            a.a.Aa = function() {
                function b(b, d, e, f, h) {
                    var g = Math.min,
                        k = Math.max,
                        l = [],
                        n, p = b.length,
                        m, q = d.length,
                        s = q - p || 1,
                        t = p + q + 1,
                        u, w, y;
                    for (n = 0; n <= p; n++) for (w = u, l.push(u = []), y = g(q, n + s), m = k(0, n - 1); m <= y; m++) u[m] = m ? n ? b[n - 1] === d[m - 1] ? w[m - 1] : g(w[m] || t, u[m - 1] || t) + 1 : m + 1 : n + 1;
                    g = [];
                    k = [];
                    s = [];
                    n = p;
                    for (m = q; n || m;) q = l[n][m] - 1, m && q === l[n][m - 1] ? k.push(g[g.length] = {
                        status: e,
                        value: d[--m],
                        index: m
                    }) : n && q === l[n - 1][m] ? s.push(g[g.length] = {
                        status: f,
                        value: b[--n],
                        index: n
                    }) : (--m, --n, h.sparse || g.push({
                        status: "retained",
                        value: d[m]
                    }));
                    a.a.nb(k, s, 10 * p);
                    return g.reverse()
                }
                return function(a, d, e) {
                    e = "boolean" === typeof e ? {
                        dontLimitMoves: e
                    } : e || {};
                    a = a || [];
                    d = d || [];
                    return a.length <= d.length ? b(a, d, "added", "deleted", e) : b(d, a, "deleted", "added", e)
                }
            }();
            a.b("utils.compareArrays", a.a.Aa);
            (function() {
                function b(b, c, f, h, g) {
                    var k = [],
                        l = a.h(function() {
                            var l = c(f, g, a.a.ea(k, b)) || [];
                            0 < k.length && (a.a.Bb(k, l), h && a.k.t(h, null, [f, l, g]));
                            k.length = 0;
                            a.a.$(k, l)
                        }, null, {
                            G: b,
                            Da: function() {
                                return !a.a.eb(k)
                            }
                        });
                    return {
                        S: k,
                        h: l.ga() ? l : p
                    }
                }
                var c = a.a.f.L();
                a.a.Ua = function(d, e, f, h, g) {
                    function k(b, c) {
                        v = r[c];
                        u !== c && (z[b] = v);
                        v.Ia(u++);
                        a.a.ea(v.S, d);
                        s.push(v);
                        y.push(v)
                    }
                    function l(b, c) {
                        if (b) for (var d = 0, e = c.length; d < e; d++) c[d] && a.a.r(c[d].S, function(a) {
                            b(a, d, c[d].ka)
                        })
                    }
                    e = e || [];
                    h = h || {};
                    var n = a.a.f.get(d, c) === p,
                        r = a.a.f.get(d, c) || [],
                        m = a.a.ya(r, function(a) {
                            return a.ka
                        }),
                        q = a.a.Aa(m, e, h.dontLimitMoves),
                        s = [],
                        t = 0,
                        u = 0,
                        w = [],
                        y = [];
                    e = [];
                    for (var z = [], m = [], v, x = 0, A, C; A = q[x]; x++) switch (C = A.moved, A.status) {
                    case "deleted":
                        C === p && (v = r[t], v.h && v.h.F(), w.push.apply(w, a.a.ea(v.S, d)), h.beforeRemove && (e[x] = v, y.push(v)));
                        t++;
                        break;
                    case "retained":
                        k(x, t++);
                        break;
                    case "added":
                        C !== p ? k(x, C) : (v = {
                            ka: A.value,
                            Ia: a.m(u++)
                        }, s.push(v), y.push(v), n || (m[x] = v))
                    }
                    l(h.beforeMove, z);
                    a.a.r(w, h.beforeRemove ? a.M : a.removeNode);
                    for (var x = 0, n = a.e.firstChild(d), E; v = y[x]; x++) {
                        v.S || a.a.extend(v, b(d, f, v.ka, g, v.Ia));
                        for (t = 0; q = v.S[t]; n = q.nextSibling, E = q, t++) q !== n && a.e.rb(d, q, E);
                        !v.Zb && g && (g(v.ka, v.S, v.Ia), v.Zb = !0)
                    }
                    l(h.beforeRemove, e);
                    l(h.afterMove, z);
                    l(h.afterAdd, m);
                    a.a.f.set(d, c, s)
                }
            })();
            a.b("utils.setDomNodeChildrenFromArrayMapping", a.a.Ua);
            a.K = function() {
                this.allowTemplateRewriting = !1
            };
            a.K.prototype = new a.C;
            a.K.prototype.renderTemplateSource = function(b) {
                var c = (9 > a.a.oa ? 0 : b.nodes) ? b.nodes() : null;
                if (c) return a.a.R(c.cloneNode(!0).childNodes);
                b = b.text();
                return a.a.Qa(b)
            };
            a.K.Ja = new a.K;
            a.Wa(a.K.Ja);
            a.b("nativeTemplateEngine", a.K);
            (function() {
                a.La = function() {
                    var a = this.ac = function() {
                        if (!t || !t.tmpl) return 0;
                        try {
                            if (0 <= t.tmpl.tag.tmpl.open.toString().indexOf("__")) return 2
                        } catch (a) {}
                        return 1
                    }();
                    this.renderTemplateSource = function(b, e, f) {
                        f = f || {};
                        if (2 > a) throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");
                        var h = b.data("precompiled");
                        h || (h = b.text() || "", h = t.template(null, "{{ko_with $item.koBindingContext}}" + h + "{{/ko_with}}"), b.data("precompiled", h));
                        b = [e.$data];
                        e = t.extend({
                            koBindingContext: e
                        }, f.templateOptions);
                        e = t.tmpl(h, b, e);
                        e.appendTo(w.createElement("div"));
                        t.fragments = {};
                        return e
                    };
                    this.createJavaScriptEvaluatorBlock = function(a) {
                        return "{{ko_code ((function() { return " + a + " })()) }}"
                    };
                    this.addTemplate = function(a, b) {
                        w.write("<script type='text/html' id='" + a + "'>" + b + "\x3c/script>")
                    };
                    0 < a && (t.tmpl.tag.ko_code = {
                        open: "__.push($1 || '');"
                    }, t.tmpl.tag.ko_with = {
                        open: "with($1) {",
                        close: "} "
                    })
                };
                a.La.prototype = new a.C;
                var b = new a.La;
                0 < b.ac && a.Wa(b);
                a.b("jqueryTmplTemplateEngine", a.La)
            })()
        })
    })();
})();
/** FILE: chosen_v1.1.0/chosen.jquery.min.js **/
/* Chosen v1.1.0 | (c) 2011-2013 by Harvest | MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md */
!function(){var a,AbstractChosen,Chosen,SelectParser,b,c={}.hasOwnProperty,d=function(a,b){function d(){this.constructor=a}for(var e in b)c.call(b,e)&&(a[e]=b[e]);return d.prototype=b.prototype,a.prototype=new d,a.__super__=b.prototype,a};SelectParser=function(){function SelectParser(){this.options_index=0,this.parsed=[]}return SelectParser.prototype.add_node=function(a){return"OPTGROUP"===a.nodeName.toUpperCase()?this.add_group(a):this.add_option(a)},SelectParser.prototype.add_group=function(a){var b,c,d,e,f,g;for(b=this.parsed.length,this.parsed.push({array_index:b,group:!0,label:this.escapeExpression(a.label),children:0,disabled:a.disabled}),f=a.childNodes,g=[],d=0,e=f.length;e>d;d++)c=f[d],g.push(this.add_option(c,b,a.disabled));return g},SelectParser.prototype.add_option=function(a,b,c){return"OPTION"===a.nodeName.toUpperCase()?(""!==a.text?(null!=b&&(this.parsed[b].children+=1),this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,value:a.value,text:a.text,html:a.innerHTML,selected:a.selected,disabled:c===!0?c:a.disabled,group_array_index:b,classes:a.className,style:a.style.cssText})):this.parsed.push({array_index:this.parsed.length,options_index:this.options_index,empty:!0}),this.options_index+=1):void 0},SelectParser.prototype.escapeExpression=function(a){var b,c;return null==a||a===!1?"":/[\&\<\>\"\'\`]/.test(a)?(b={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},c=/&(?!\w+;)|[\<\>\"\'\`]/g,a.replace(c,function(a){return b[a]||"&amp;"})):a},SelectParser}(),SelectParser.select_to_array=function(a){var b,c,d,e,f;for(c=new SelectParser,f=a.childNodes,d=0,e=f.length;e>d;d++)b=f[d],c.add_node(b);return c.parsed},AbstractChosen=function(){function AbstractChosen(a,b){this.form_field=a,this.options=null!=b?b:{},AbstractChosen.browser_is_supported()&&(this.is_multiple=this.form_field.multiple,this.set_default_text(),this.set_default_values(),this.setup(),this.set_up_html(),this.register_observers())}return AbstractChosen.prototype.set_default_values=function(){var a=this;return this.click_test_action=function(b){return a.test_active_click(b)},this.activate_action=function(b){return a.activate_field(b)},this.active_field=!1,this.mouse_on_container=!1,this.results_showing=!1,this.result_highlighted=null,this.allow_single_deselect=null!=this.options.allow_single_deselect&&null!=this.form_field.options[0]&&""===this.form_field.options[0].text?this.options.allow_single_deselect:!1,this.disable_search_threshold=this.options.disable_search_threshold||0,this.disable_search=this.options.disable_search||!1,this.enable_split_word_search=null!=this.options.enable_split_word_search?this.options.enable_split_word_search:!0,this.group_search=null!=this.options.group_search?this.options.group_search:!0,this.search_contains=this.options.search_contains||!1,this.single_backstroke_delete=null!=this.options.single_backstroke_delete?this.options.single_backstroke_delete:!0,this.max_selected_options=this.options.max_selected_options||1/0,this.inherit_select_classes=this.options.inherit_select_classes||!1,this.display_selected_options=null!=this.options.display_selected_options?this.options.display_selected_options:!0,this.display_disabled_options=null!=this.options.display_disabled_options?this.options.display_disabled_options:!0},AbstractChosen.prototype.set_default_text=function(){return this.default_text=this.form_field.getAttribute("data-placeholder")?this.form_field.getAttribute("data-placeholder"):this.is_multiple?this.options.placeholder_text_multiple||this.options.placeholder_text||AbstractChosen.default_multiple_text:this.options.placeholder_text_single||this.options.placeholder_text||AbstractChosen.default_single_text,this.results_none_found=this.form_field.getAttribute("data-no_results_text")||this.options.no_results_text||AbstractChosen.default_no_result_text},AbstractChosen.prototype.mouse_enter=function(){return this.mouse_on_container=!0},AbstractChosen.prototype.mouse_leave=function(){return this.mouse_on_container=!1},AbstractChosen.prototype.input_focus=function(){var a=this;if(this.is_multiple){if(!this.active_field)return setTimeout(function(){return a.container_mousedown()},50)}else if(!this.active_field)return this.activate_field()},AbstractChosen.prototype.input_blur=function(){var a=this;return this.mouse_on_container?void 0:(this.active_field=!1,setTimeout(function(){return a.blur_test()},100))},AbstractChosen.prototype.results_option_build=function(a){var b,c,d,e,f;for(b="",f=this.results_data,d=0,e=f.length;e>d;d++)c=f[d],b+=c.group?this.result_add_group(c):this.result_add_option(c),(null!=a?a.first:void 0)&&(c.selected&&this.is_multiple?this.choice_build(c):c.selected&&!this.is_multiple&&this.single_set_selected_text(c.text));return b},AbstractChosen.prototype.result_add_option=function(a){var b,c;return a.search_match?this.include_option_in_results(a)?(b=[],a.disabled||a.selected&&this.is_multiple||b.push("active-result"),!a.disabled||a.selected&&this.is_multiple||b.push("disabled-result"),a.selected&&b.push("result-selected"),null!=a.group_array_index&&b.push("group-option"),""!==a.classes&&b.push(a.classes),c=document.createElement("li"),c.className=b.join(" "),c.style.cssText=a.style,c.setAttribute("data-option-array-index",a.array_index),c.innerHTML=a.search_text,this.outerHTML(c)):"":""},AbstractChosen.prototype.result_add_group=function(a){var b;return a.search_match||a.group_match?a.active_options>0?(b=document.createElement("li"),b.className="group-result",b.innerHTML=a.search_text,this.outerHTML(b)):"":""},AbstractChosen.prototype.results_update_field=function(){return this.set_default_text(),this.is_multiple||this.results_reset_cleanup(),this.result_clear_highlight(),this.results_build(),this.results_showing?this.winnow_results():void 0},AbstractChosen.prototype.reset_single_select_options=function(){var a,b,c,d,e;for(d=this.results_data,e=[],b=0,c=d.length;c>b;b++)a=d[b],a.selected?e.push(a.selected=!1):e.push(void 0);return e},AbstractChosen.prototype.results_toggle=function(){return this.results_showing?this.results_hide():this.results_show()},AbstractChosen.prototype.results_search=function(){return this.results_showing?this.winnow_results():this.results_show()},AbstractChosen.prototype.winnow_results=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m;for(this.no_results_clear(),e=0,g=this.get_search_text(),a=g.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&"),d=this.search_contains?"":"^",c=new RegExp(d+a,"i"),j=new RegExp(a,"i"),m=this.results_data,k=0,l=m.length;l>k;k++)b=m[k],b.search_match=!1,f=null,this.include_option_in_results(b)&&(b.group&&(b.group_match=!1,b.active_options=0),null!=b.group_array_index&&this.results_data[b.group_array_index]&&(f=this.results_data[b.group_array_index],0===f.active_options&&f.search_match&&(e+=1),f.active_options+=1),(!b.group||this.group_search)&&(b.search_text=b.group?b.label:b.html,b.search_match=this.search_string_match(b.search_text,c),b.search_match&&!b.group&&(e+=1),b.search_match?(g.length&&(h=b.search_text.search(j),i=b.search_text.substr(0,h+g.length)+"</em>"+b.search_text.substr(h+g.length),b.search_text=i.substr(0,h)+"<em>"+i.substr(h)),null!=f&&(f.group_match=!0)):null!=b.group_array_index&&this.results_data[b.group_array_index].search_match&&(b.search_match=!0)));return this.result_clear_highlight(),1>e&&g.length?(this.update_results_content(""),this.no_results(g)):(this.update_results_content(this.results_option_build()),this.winnow_results_set_highlight())},AbstractChosen.prototype.search_string_match=function(a,b){var c,d,e,f;if(b.test(a))return!0;if(this.enable_split_word_search&&(a.indexOf(" ")>=0||0===a.indexOf("["))&&(d=a.replace(/\[|\]/g,"").split(" "),d.length))for(e=0,f=d.length;f>e;e++)if(c=d[e],b.test(c))return!0},AbstractChosen.prototype.choices_count=function(){var a,b,c,d;if(null!=this.selected_option_count)return this.selected_option_count;for(this.selected_option_count=0,d=this.form_field.options,b=0,c=d.length;c>b;b++)a=d[b],a.selected&&(this.selected_option_count+=1);return this.selected_option_count},AbstractChosen.prototype.choices_click=function(a){return a.preventDefault(),this.results_showing||this.is_disabled?void 0:this.results_show()},AbstractChosen.prototype.keyup_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),b){case 8:if(this.is_multiple&&this.backstroke_length<1&&this.choices_count()>0)return this.keydown_backstroke();if(!this.pending_backstroke)return this.result_clear_highlight(),this.results_search();break;case 13:if(a.preventDefault(),this.results_showing)return this.result_select(a);break;case 27:return this.results_showing&&this.results_hide(),!0;case 9:case 38:case 40:case 16:case 91:case 17:break;default:return this.results_search()}},AbstractChosen.prototype.clipboard_event_checker=function(){var a=this;return setTimeout(function(){return a.results_search()},50)},AbstractChosen.prototype.container_width=function(){return null!=this.options.width?this.options.width:""+this.form_field.offsetWidth+"px"},AbstractChosen.prototype.include_option_in_results=function(a){return this.is_multiple&&!this.display_selected_options&&a.selected?!1:!this.display_disabled_options&&a.disabled?!1:a.empty?!1:!0},AbstractChosen.prototype.search_results_touchstart=function(a){return this.touch_started=!0,this.search_results_mouseover(a)},AbstractChosen.prototype.search_results_touchmove=function(a){return this.touch_started=!1,this.search_results_mouseout(a)},AbstractChosen.prototype.search_results_touchend=function(a){return this.touch_started?this.search_results_mouseup(a):void 0},AbstractChosen.prototype.outerHTML=function(a){var b;return a.outerHTML?a.outerHTML:(b=document.createElement("div"),b.appendChild(a),b.innerHTML)},AbstractChosen.browser_is_supported=function(){return"Microsoft Internet Explorer"===window.navigator.appName?document.documentMode>=8:/iP(od|hone)/i.test(window.navigator.userAgent)?!1:/Android/i.test(window.navigator.userAgent)&&/Mobile/i.test(window.navigator.userAgent)?!1:!0},AbstractChosen.default_multiple_text="Select Some Options",AbstractChosen.default_single_text="Select an Option",AbstractChosen.default_no_result_text="No results match",AbstractChosen}(),a=jQuery,a.fn.extend({chosen:function(b){return AbstractChosen.browser_is_supported()?this.each(function(){var c,d;c=a(this),d=c.data("chosen"),"destroy"===b&&d?d.destroy():d||c.data("chosen",new Chosen(this,b))}):this}}),Chosen=function(c){function Chosen(){return b=Chosen.__super__.constructor.apply(this,arguments)}return d(Chosen,c),Chosen.prototype.setup=function(){return this.form_field_jq=a(this.form_field),this.current_selectedIndex=this.form_field.selectedIndex,this.is_rtl=this.form_field_jq.hasClass("chosen-rtl")},Chosen.prototype.set_up_html=function(){var b,c;return b=["chosen-container"],b.push("chosen-container-"+(this.is_multiple?"multi":"single")),this.inherit_select_classes&&this.form_field.className&&b.push(this.form_field.className),this.is_rtl&&b.push("chosen-rtl"),c={"class":b.join(" "),style:"width: "+this.container_width()+";",title:this.form_field.title},this.form_field.id.length&&(c.id=this.form_field.id.replace(/[^\w]/g,"_")+"_chosen"),this.container=a("<div />",c),this.is_multiple?this.container.html('<ul class="chosen-choices"><li class="search-field"><input type="text" value="'+this.default_text+'" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chosen-drop"><ul class="chosen-results"></ul></div>'):this.container.html('<a class="chosen-single chosen-default" tabindex="-1"><span>'+this.default_text+'</span><div><b></b></div></a><div class="chosen-drop"><div class="chosen-search"><input type="text" autocomplete="off" /></div><ul class="chosen-results"></ul></div>'),this.form_field_jq.hide().after(this.container),this.dropdown=this.container.find("div.chosen-drop").first(),this.search_field=this.container.find("input").first(),this.search_results=this.container.find("ul.chosen-results").first(),this.search_field_scale(),this.search_no_results=this.container.find("li.no-results").first(),this.is_multiple?(this.search_choices=this.container.find("ul.chosen-choices").first(),this.search_container=this.container.find("li.search-field").first()):(this.search_container=this.container.find("div.chosen-search").first(),this.selected_item=this.container.find(".chosen-single").first()),this.results_build(),this.set_tab_index(),this.set_label_behavior(),this.form_field_jq.trigger("chosen:ready",{chosen:this})},Chosen.prototype.register_observers=function(){var a=this;return this.container.bind("mousedown.chosen",function(b){a.container_mousedown(b)}),this.container.bind("mouseup.chosen",function(b){a.container_mouseup(b)}),this.container.bind("mouseenter.chosen",function(b){a.mouse_enter(b)}),this.container.bind("mouseleave.chosen",function(b){a.mouse_leave(b)}),this.search_results.bind("mouseup.chosen",function(b){a.search_results_mouseup(b)}),this.search_results.bind("mouseover.chosen",function(b){a.search_results_mouseover(b)}),this.search_results.bind("mouseout.chosen",function(b){a.search_results_mouseout(b)}),this.search_results.bind("mousewheel.chosen DOMMouseScroll.chosen",function(b){a.search_results_mousewheel(b)}),this.search_results.bind("touchstart.chosen",function(b){a.search_results_touchstart(b)}),this.search_results.bind("touchmove.chosen",function(b){a.search_results_touchmove(b)}),this.search_results.bind("touchend.chosen",function(b){a.search_results_touchend(b)}),this.form_field_jq.bind("chosen:updated.chosen",function(b){a.results_update_field(b)}),this.form_field_jq.bind("chosen:activate.chosen",function(b){a.activate_field(b)}),this.form_field_jq.bind("chosen:open.chosen",function(b){a.container_mousedown(b)}),this.form_field_jq.bind("chosen:close.chosen",function(b){a.input_blur(b)}),this.search_field.bind("blur.chosen",function(b){a.input_blur(b)}),this.search_field.bind("keyup.chosen",function(b){a.keyup_checker(b)}),this.search_field.bind("keydown.chosen",function(b){a.keydown_checker(b)}),this.search_field.bind("focus.chosen",function(b){a.input_focus(b)}),this.search_field.bind("cut.chosen",function(b){a.clipboard_event_checker(b)}),this.search_field.bind("paste.chosen",function(b){a.clipboard_event_checker(b)}),this.is_multiple?this.search_choices.bind("click.chosen",function(b){a.choices_click(b)}):this.container.bind("click.chosen",function(a){a.preventDefault()})},Chosen.prototype.destroy=function(){return a(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.search_field[0].tabIndex&&(this.form_field_jq[0].tabIndex=this.search_field[0].tabIndex),this.container.remove(),this.form_field_jq.removeData("chosen"),this.form_field_jq.show()},Chosen.prototype.search_field_disabled=function(){return this.is_disabled=this.form_field_jq[0].disabled,this.is_disabled?(this.container.addClass("chosen-disabled"),this.search_field[0].disabled=!0,this.is_multiple||this.selected_item.unbind("focus.chosen",this.activate_action),this.close_field()):(this.container.removeClass("chosen-disabled"),this.search_field[0].disabled=!1,this.is_multiple?void 0:this.selected_item.bind("focus.chosen",this.activate_action))},Chosen.prototype.container_mousedown=function(b){return this.is_disabled||(b&&"mousedown"===b.type&&!this.results_showing&&b.preventDefault(),null!=b&&a(b.target).hasClass("search-choice-close"))?void 0:(this.active_field?this.is_multiple||!b||a(b.target)[0]!==this.selected_item[0]&&!a(b.target).parents("a.chosen-single").length||(b.preventDefault(),this.results_toggle()):(this.is_multiple&&this.search_field.val(""),a(this.container[0].ownerDocument).bind("click.chosen",this.click_test_action),this.results_show()),this.activate_field())},Chosen.prototype.container_mouseup=function(a){return"ABBR"!==a.target.nodeName||this.is_disabled?void 0:this.results_reset(a)},Chosen.prototype.search_results_mousewheel=function(a){var b;return a.originalEvent&&(b=-a.originalEvent.wheelDelta||a.originalEvent.detail),null!=b?(a.preventDefault(),"DOMMouseScroll"===a.type&&(b=40*b),this.search_results.scrollTop(b+this.search_results.scrollTop())):void 0},Chosen.prototype.blur_test=function(){return!this.active_field&&this.container.hasClass("chosen-container-active")?this.close_field():void 0},Chosen.prototype.close_field=function(){return a(this.container[0].ownerDocument).unbind("click.chosen",this.click_test_action),this.active_field=!1,this.results_hide(),this.container.removeClass("chosen-container-active"),this.clear_backstroke(),this.show_search_field_default(),this.search_field_scale()},Chosen.prototype.activate_field=function(){return this.container.addClass("chosen-container-active"),this.active_field=!0,this.search_field.val(this.search_field.val()),this.search_field.focus()},Chosen.prototype.test_active_click=function(b){var c;return c=a(b.target).closest(".chosen-container"),c.length&&this.container[0]===c[0]?this.active_field=!0:this.close_field()},Chosen.prototype.results_build=function(){return this.parsing=!0,this.selected_option_count=null,this.results_data=SelectParser.select_to_array(this.form_field),this.is_multiple?this.search_choices.find("li.search-choice").remove():this.is_multiple||(this.single_set_selected_text(),this.disable_search||this.form_field.options.length<=this.disable_search_threshold?(this.search_field[0].readOnly=!0,this.container.addClass("chosen-container-single-nosearch")):(this.search_field[0].readOnly=!1,this.container.removeClass("chosen-container-single-nosearch"))),this.update_results_content(this.results_option_build({first:!0})),this.search_field_disabled(),this.show_search_field_default(),this.search_field_scale(),this.parsing=!1},Chosen.prototype.result_do_highlight=function(a){var b,c,d,e,f;if(a.length){if(this.result_clear_highlight(),this.result_highlight=a,this.result_highlight.addClass("highlighted"),d=parseInt(this.search_results.css("maxHeight"),10),f=this.search_results.scrollTop(),e=d+f,c=this.result_highlight.position().top+this.search_results.scrollTop(),b=c+this.result_highlight.outerHeight(),b>=e)return this.search_results.scrollTop(b-d>0?b-d:0);if(f>c)return this.search_results.scrollTop(c)}},Chosen.prototype.result_clear_highlight=function(){return this.result_highlight&&this.result_highlight.removeClass("highlighted"),this.result_highlight=null},Chosen.prototype.results_show=function(){return this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.container.addClass("chosen-with-drop"),this.results_showing=!0,this.search_field.focus(),this.search_field.val(this.search_field.val()),this.winnow_results(),this.form_field_jq.trigger("chosen:showing_dropdown",{chosen:this}))},Chosen.prototype.update_results_content=function(a){return this.search_results.html(a)},Chosen.prototype.results_hide=function(){return this.results_showing&&(this.result_clear_highlight(),this.container.removeClass("chosen-with-drop"),this.form_field_jq.trigger("chosen:hiding_dropdown",{chosen:this})),this.results_showing=!1},Chosen.prototype.set_tab_index=function(){var a;return this.form_field.tabIndex?(a=this.form_field.tabIndex,this.form_field.tabIndex=-1,this.search_field[0].tabIndex=a):void 0},Chosen.prototype.set_label_behavior=function(){var b=this;return this.form_field_label=this.form_field_jq.parents("label"),!this.form_field_label.length&&this.form_field.id.length&&(this.form_field_label=a("label[for='"+this.form_field.id+"']")),this.form_field_label.length>0?this.form_field_label.bind("click.chosen",function(a){return b.is_multiple?b.container_mousedown(a):b.activate_field()}):void 0},Chosen.prototype.show_search_field_default=function(){return this.is_multiple&&this.choices_count()<1&&!this.active_field?(this.search_field.val(this.default_text),this.search_field.addClass("default")):(this.search_field.val(""),this.search_field.removeClass("default"))},Chosen.prototype.search_results_mouseup=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c.length?(this.result_highlight=c,this.result_select(b),this.search_field.focus()):void 0},Chosen.prototype.search_results_mouseover=function(b){var c;return c=a(b.target).hasClass("active-result")?a(b.target):a(b.target).parents(".active-result").first(),c?this.result_do_highlight(c):void 0},Chosen.prototype.search_results_mouseout=function(b){return a(b.target).hasClass("active-result")?this.result_clear_highlight():void 0},Chosen.prototype.choice_build=function(b){var c,d,e=this;return c=a("<li />",{"class":"search-choice"}).html("<span>"+b.html+"</span>"),b.disabled?c.addClass("search-choice-disabled"):(d=a("<a />",{"class":"search-choice-close","data-option-array-index":b.array_index}),d.bind("click.chosen",function(a){return e.choice_destroy_link_click(a)}),c.append(d)),this.search_container.before(c)},Chosen.prototype.choice_destroy_link_click=function(b){return b.preventDefault(),b.stopPropagation(),this.is_disabled?void 0:this.choice_destroy(a(b.target))},Chosen.prototype.choice_destroy=function(a){return this.result_deselect(a[0].getAttribute("data-option-array-index"))?(this.show_search_field_default(),this.is_multiple&&this.choices_count()>0&&this.search_field.val().length<1&&this.results_hide(),a.parents("li").first().remove(),this.search_field_scale()):void 0},Chosen.prototype.results_reset=function(){return this.reset_single_select_options(),this.form_field.options[0].selected=!0,this.single_set_selected_text(),this.show_search_field_default(),this.results_reset_cleanup(),this.form_field_jq.trigger("change"),this.active_field?this.results_hide():void 0},Chosen.prototype.results_reset_cleanup=function(){return this.current_selectedIndex=this.form_field.selectedIndex,this.selected_item.find("abbr").remove()},Chosen.prototype.result_select=function(a){var b,c;return this.result_highlight?(b=this.result_highlight,this.result_clear_highlight(),this.is_multiple&&this.max_selected_options<=this.choices_count()?(this.form_field_jq.trigger("chosen:maxselected",{chosen:this}),!1):(this.is_multiple?b.removeClass("active-result"):this.reset_single_select_options(),c=this.results_data[b[0].getAttribute("data-option-array-index")],c.selected=!0,this.form_field.options[c.options_index].selected=!0,this.selected_option_count=null,this.is_multiple?this.choice_build(c):this.single_set_selected_text(c.text),(a.metaKey||a.ctrlKey)&&this.is_multiple||this.results_hide(),this.search_field.val(""),(this.is_multiple||this.form_field.selectedIndex!==this.current_selectedIndex)&&this.form_field_jq.trigger("change",{selected:this.form_field.options[c.options_index].value}),this.current_selectedIndex=this.form_field.selectedIndex,this.search_field_scale())):void 0},Chosen.prototype.single_set_selected_text=function(a){return null==a&&(a=this.default_text),a===this.default_text?this.selected_item.addClass("chosen-default"):(this.single_deselect_control_build(),this.selected_item.removeClass("chosen-default")),this.selected_item.find("span").text(a)},Chosen.prototype.result_deselect=function(a){var b;return b=this.results_data[a],this.form_field.options[b.options_index].disabled?!1:(b.selected=!1,this.form_field.options[b.options_index].selected=!1,this.selected_option_count=null,this.result_clear_highlight(),this.results_showing&&this.winnow_results(),this.form_field_jq.trigger("change",{deselected:this.form_field.options[b.options_index].value}),this.search_field_scale(),!0)},Chosen.prototype.single_deselect_control_build=function(){return this.allow_single_deselect?(this.selected_item.find("abbr").length||this.selected_item.find("span").first().after('<abbr class="search-choice-close"></abbr>'),this.selected_item.addClass("chosen-single-with-deselect")):void 0},Chosen.prototype.get_search_text=function(){return this.search_field.val()===this.default_text?"":a("<div/>").text(a.trim(this.search_field.val())).html()},Chosen.prototype.winnow_results_set_highlight=function(){var a,b;return b=this.is_multiple?[]:this.search_results.find(".result-selected.active-result"),a=b.length?b.first():this.search_results.find(".active-result").first(),null!=a?this.result_do_highlight(a):void 0},Chosen.prototype.no_results=function(b){var c;return c=a('<li class="no-results">'+this.results_none_found+' "<span></span>"</li>'),c.find("span").first().html(b),this.search_results.append(c),this.form_field_jq.trigger("chosen:no_results",{chosen:this})},Chosen.prototype.no_results_clear=function(){return this.search_results.find(".no-results").remove()},Chosen.prototype.keydown_arrow=function(){var a;return this.results_showing&&this.result_highlight?(a=this.result_highlight.nextAll("li.active-result").first())?this.result_do_highlight(a):void 0:this.results_show()},Chosen.prototype.keyup_arrow=function(){var a;return this.results_showing||this.is_multiple?this.result_highlight?(a=this.result_highlight.prevAll("li.active-result"),a.length?this.result_do_highlight(a.first()):(this.choices_count()>0&&this.results_hide(),this.result_clear_highlight())):void 0:this.results_show()},Chosen.prototype.keydown_backstroke=function(){var a;return this.pending_backstroke?(this.choice_destroy(this.pending_backstroke.find("a").first()),this.clear_backstroke()):(a=this.search_container.siblings("li.search-choice").last(),a.length&&!a.hasClass("search-choice-disabled")?(this.pending_backstroke=a,this.single_backstroke_delete?this.keydown_backstroke():this.pending_backstroke.addClass("search-choice-focus")):void 0)},Chosen.prototype.clear_backstroke=function(){return this.pending_backstroke&&this.pending_backstroke.removeClass("search-choice-focus"),this.pending_backstroke=null},Chosen.prototype.keydown_checker=function(a){var b,c;switch(b=null!=(c=a.which)?c:a.keyCode,this.search_field_scale(),8!==b&&this.pending_backstroke&&this.clear_backstroke(),b){case 8:this.backstroke_length=this.search_field.val().length;break;case 9:this.results_showing&&!this.is_multiple&&this.result_select(a),this.mouse_on_container=!1;break;case 13:a.preventDefault();break;case 38:a.preventDefault(),this.keyup_arrow();break;case 40:a.preventDefault(),this.keydown_arrow()}},Chosen.prototype.search_field_scale=function(){var b,c,d,e,f,g,h,i,j;if(this.is_multiple){for(d=0,h=0,f="position:absolute; left: -1000px; top: -1000px; display:none;",g=["font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"],i=0,j=g.length;j>i;i++)e=g[i],f+=e+":"+this.search_field.css(e)+";";return b=a("<div />",{style:f}),b.text(this.search_field.val()),a("body").append(b),h=b.width()+25,b.remove(),c=this.container.outerWidth(),h>c-10&&(h=c-10),this.search_field.css({width:h+"px"})}},Chosen}(AbstractChosen)}.call(this);
/** FILE: app.js **/
/**
 * Add all your dependencies here.
 *
 * @require pace.min.js
 * @require LayersControl.js
 * @require TransactionHandler.js
 * @require FeatureTable.js
 * @require WFSBBOXLoader.js
 * @require poiclient.js
 * @require poiproxy.js
 * @require ficontent.js
 * @require funcs.js
 * @require newservice.js
 * @require knockout-3.1.0.js
 * @require chosen_v1.1.0/chosen.jquery.min.js
 */

// ========= config section =============================================
var poiproxy = new POIProxyClient(poiProxyURL);
var ficontent = new FIContentClient(ficontentURL, 'osm');
var ficontentdb = new FIContentClient(ficontentURL, 'dbpedia');
var map;
var select;
var selectedFeature;
var activeLayerTitle;
var activeLayer;
// ======================================================================

$(document).ready(function() {
  
  init();

  Pace.start({
    document: true
  });

  // add resize listener for table height, enables scroll-y
  // on table for responsive and full view
  var rszTimer;

  $(window).resize(function(e) {
    clearTimeout(rszTimer);
    rszTimer = setTimeout(resizeTableHeight(), 100);
  }).resize(); // call on first load

});

var init = function() {
  ficontentdb.createLayers(function(filayersdb) {
    ficontent.createLayers(function(filayers) {
      poiproxy.createLayers(function(layers) {
        layers = layers.concat(filayers);
        layers = layers.concat(filayersdb);
        layers = layers.sort(function(a, b) {
          if (a.get('name') < b.get('name')) return -1;
          return 1;
        });
        initMap(layers);
        initUI(layers);
      });
    });
  });
};

var initUI = function(layers) {
  var newHeight = $(document).outerHeight() - $('.navbar').outerHeight();
  $('#features-container').height(newHeight);

  buildPOIProxySelector(layers);

  var popup = buildPopup();
  map.addOverlay(popup);

  // display popup on click
  map.on('click', function(evt) {
    onMapClick(evt.pixel);
  });

  registerChangeCursor();

  $('.poiproxy-search').keypress(function(event) {
    if (!$('.poiproxy-search').val()) {
      clearSearch();
      return;
    }
    if (event.keyCode == 13) {
      search($('.poiproxy-search').val());
    }
  });

  onNewServiceClick();

  onRegisterServiceClick();
};

var search = function(val) {
  var extent = map.getView().calculateExtent([800,800]);
  var minCoord = ol.proj.transform([extent[0], extent[1]], 'EPSG:3857', 'EPSG:4326');
  var maxCoord = ol.proj.transform([extent[2], extent[3]], 'EPSG:3857', 'EPSG:4326');
  if (isPoiProxyLayer(activeLayerTitle)) {
    poiproxy.search($('.poiproxy-services').val(), val, minCoord[0], maxCoord[0], minCoord[1], maxCoord[1]);
  } else {
    ficontent.search($('.poiproxy-services').val(), val, minCoord[0], maxCoord[0], minCoord[1], maxCoord[1]);
  }
};

var clearSearch = function() {
  poiproxy.clearSearch();
  ficontent.clearSearch();
};

var buildPOIProxySelector = function(layers) {
  var $combo = $('.poiproxy-services');
  $combo.attr('data-placeholder', 'Choose a service...');
  var $option, text, value;

  for (var i = 0, l = layers.length; i<l; i++) {
    text = layers[i].get('name');
    value = layers[i].get('title');
    $option = $('<option />').text(text).val(value);
    $combo.append($option);
  }

  $combo.chosen({
    no_results_text: "Oops, nothing found!",
    allow_single_deselect: true
  }).change(function(evt) {
      $('#features').empty();
      hidePopup();
      var layers = map.getLayers().getArray();
      var layer;
      for (var i=0, ii=layers.length; i<ii; ++i) {
        layer = layers[i];
        if (layer instanceof ol.layer.Vector) {
          layer.set('visible', false);
          if (layer.get('title') == $(this).val()) {
            activateLayer(layer);
          }
        }
      }
  });
};

var registerChangeCursor = function() {
  // change mouse cursor when over marker
  $(map.getViewport()).on('mousemove', function(e) {
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
      return true;
    });
    if (hit) {
      map.getTarget().style.cursor = 'pointer';
    } else {
      map.getTarget().style.cursor = '';
    }
  });
};

var buildPopup = function() {
  var element = $('<div id="popup" data-original-title="" title=""></div>');
  $('body').append(element);

  popup = new ol.Overlay({
    element: element,
    positioning: 'bottom-center',
    stopEvent: false
  });

  return popup;
};

var onNewServiceClick = function() {
  $('#new-service').on('shown.bs.modal', function (e) {
    ko.applyBindings(newService, $('#new-service')[0]);
  });
};

var onRegisterServiceClick = function() {
  $('#register-service').click(function() {
    $.post(registerServiceURL, {"data": JSON.stringify(newService)}, function(data, textStatus, jqXHR) {
      $('#new-service').modal('hide');
      $('.modal-refresh').modal('show');
    })
    .error(function(jqXHR) {
      $('#new-service').modal('hide');
      $('.modal-refresh').modal('show');
    });
  });
};

var onMapClick = function(pixel) {
  var feature = map.forEachFeatureAtPixel(pixel,
      function(feature, layer) {
        return feature;
      });
  if (feature) {
    showPopup(feature);
  } else {
    hidePopup(feature);
  }
};

var isPoiProxyLayer = function(layerTitle) {
  return layerTitle.indexOf('osm_') == -1 && layerTitle.indexOf('dbpedia_') == -1;
};

var activateLayer = function(layer) {
  var title = layer.get('title');
  var layerConfig = config.services[title];
  activeLayerTitle = title;
  activeLayer = layer;

  if (!layerConfig) {
    layer.set('visible', true);
    $('.poiproxy-search').attr('placeholder', "Search...");
    $('.poiproxy-search').prop('disabled', false);
    return;
  }

  $('.poiproxy-search').prop('disabled', !layerConfig.search);

  if (layerConfig.browse && layerConfig.search) {
    layer.set('visible', true);
    if (isLocalBcn(layer.get('title'))) {
      loadData(layer);
    }
  } else if (layerConfig.browse && !layerConfig.search) {
    layer.set('visible', true);
    $('.poiproxy-search').attr('placeholder', "Not available...");
  } else if (!layerConfig.browse && layerConfig.search) {
    layer.set('visible', true);
    $('.poiproxy-search').attr('placeholder', "Search...");
  }
};

var showPopup = function(feature) {
  hidePopup();
  selectedFeature = feature;
  var $element = $('#popup');
  var geometry = feature.getGeometry();
  var coord = geometry.getCoordinates();
  popup.setPosition(coord);

  $element.popover({
    'placement': 'top',
    'html': true,
    'content': createPopup(feature)
  });
  $element.popover('show');
};

var hidePopup = function() {
  selectedFeature = null;
  var $element = $('#popup');
  $element.popover('destroy');
};

var createPopup = function(feature) {
  var keys = feature.getKeys();

  var html = "";
  for (var i = 0, l = keys.length; i<l; i++) {
    var key = keys[i];
    if (isValidAttribute(key)) {
      var value = feature.get(key);
      html += "<div class='row'>" + "<div class='popup-attribute'>"+key+': </div>'+"<div class='popup-content'>"+createPopupContent(key, value)+'</div></div>';
    }
  }

  return html;
};

var createPopupContent = function(key, value) {
  var res = value;
  if (key == 'image' || value.indexOf('.jpg') != -1 || value.indexOf('.jpeg') != -1 || value.indexOf('.png') != -1 || value.indexOf('.gif') != -1) {
    res = '<a href="'+value+'" target="_blank"><img src="'+value+'" width="100" height="100"/></a>';
  } else if (key == 'web' || key == 'link' || key == 'url' || value.indexOf('http') != -1) {
    res = '<a href="'+value+'" target="_blank">' + value + '</a>';
  }

  return res;
}

var isValidAttribute = function(attribute) {
  return attribute && attribute.indexOf('geom') == -1 && attribute != 'id' 
    && attribute.indexOf('px_categories') == -1 && attribute.indexOf('px_service') == -1;
};

var loadData = function(layer) {
  var url = layer.get('url');
  $.getJSON(url, null)
    .done(function(result) {
      var oldFeatures = layer.getSource().getFeatures();
      for (var i = 0, l = oldFeatures.length; i<l; i++) {
          layer.getSource().removeFeature(oldFeatures[i]);
      }

      var features = poiproxy.parseGeoJSONFeatures(result);

      layer.getSource().addFeatures(features);
    })
    .fail(function(jqxhr, textStatus, error) {
        alert(textStatus);
    });
};

var isLocalBcn = function(title) {
  return title.indexOf('local_bcn');
};

var initMap = function(poiproxyLayers) {
  select = new ol.interaction.Select({
            featureOverlay: new ol.FeatureOverlay({
              style: new ol.style.Style({
                image: new ol.style.Circle({
                  radius: 20,
                  fill: new ol.style.Fill({
                    color: '#FF0000'
                  }),
                  stroke: new ol.style.Stroke({
                    color: '#000000'
                  })
                })
              })
            })
          });
  // create the map
  map = new ol.Map({
    interactions: ol.interaction.defaults().extend([select]),
    /*controls: ol.control.defaults().extend([
      new app.LayersControl({
        groups: {
          background: {
            title: "Base Layers",
            exclusive: true
          },
          'default': {
            title: "POI",
            exclusive: true
          }
        }
      })
    ]),*/
    // render the map in the 'map' div
    target: document.getElementById('map'),
    // use the Canvas renderer
    renderer: 'canvas',
    layers: [
      // MapQuest streets
      new ol.layer.Tile({
        title: 'Street Map',
        group: "background",
        source: new ol.source.MapQuest({layer: 'osm'})
      }),
      // MapQuest imagery
      new ol.layer.Tile({
        title: 'Aerial Imagery',
        group: "background",
        visible: false,
        source: new ol.source.MapQuest({layer: 'sat'})
      }),
      // MapQuest hybrid (uses a layer group)
      new ol.layer.Group({
        title: 'Imagery with Streets',
        group: "background",
        visible: false,
        layers: [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
          }),
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'hyb'})
          })
        ]
      })
    ].concat(poiproxyLayers),
    // initial center and zoom of the map's view
    view: new ol.View2D({
      center: center,
      zoom: zoom
    })
  });
};