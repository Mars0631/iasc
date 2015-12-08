/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>

 @version 3.9.0
*/
FusionCharts.register("module", ["private", "modules.renderer.js-messagelogger", function () {
    var W = this.hcLib,
        lb = W.Raphael,
        za, Xa = W.isIE,
        da = W.graphics.HEXtoRGB,
        A = W.graphics.convertColor,
        Ha, O, ya, va, q, G, h, ab, Da, P, V, fa, oa, Ja, ub = this.window,
        qa = ub.document,
        zb = 8 === qa.documentMode,
        ha = !0,
        Y = !1,
        F = W.pluck,
        ua = W.pluckNumber,
        Ab = W.FC_CONFIG_STRING,
        Ua = {
            display: "block",
            paddingLeft: "10px",
            paddingRight: "10px",
            "font-family": "Arial",
            "font-size": "11px"
        },
        z = function (h, q) {
            var v = this,
                G;
            q || (q = "");
            for (G = v.indexOf(h); - 1 !== G;) v = v.replace(h,
                q), G = v.indexOf(h);
            return v
        };
    Ja = function (z, F, v) {
        var O = z.hcJSON,
            V = O && O[Ab],
            P = F && F.chartWidth,
            $ = F && F.chartHeight,
            O = va / 100 * P,
            oa = q / 100 * $,
            na = (P - O) / 2,
            ja = ($ - oa) / 2,
            ua = O - 18 - 22,
            ka = oa - 18 - 22,
            qa = ab,
            da = ab;
        z = v.html("div", {
            fill: "transparent",
            width: P,
            height: $
        }, {
            fontSize: "10px",
            lineHeight: "15px",
            fontFamily: (V && V.inCanvasStyle || z.inCanvasStyle).fontFamily
        }, F && F.container);
        z.veil = v.html("div", {
            id: "veil",
            fill: "000000",
            width: P,
            height: $,
            opacity: .1
        }, void 0, z).on("click", function () {
            fa && W.messageLogger.close()
        });
        h && G && (z.title =
            v.html("p", {
                id: "Title",
                innerHTML: h,
                x: 5,
                y: 5
            }, {
                "font-weight": "bold"
            }, z));
        z.dialog = v.html("div", {
            id: "dialog",
            x: na,
            y: ja,
            fill: "ffffff",
            strokeWidth: 1,
            stroke: qa,
            width: O,
            height: oa
        }, {
            borderRadius: "5px",
            boxShadow: "1px 1px 3px #000000",
            "-webkit-border-radius": "5px",
            "-webkit-box-shadow": "1px 1px 3px #000000",
            filter: 'progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color="#000000")'
        }, z);
        z.logBackground = v.html("div", {
            id: "dialogBackground",
            x: 0,
            y: 0,
            fill: da,
            width: O,
            height: oa
        }, void 0, z.dialog);
        fa &&
            (z.closeBtnContainer = v.html("div", {
                id: "closeBtnContainer",
                width: 18,
                height: 18,
                x: na + O - 21,
                y: ja + 3
            }, {}, z), F = new lb("closeBtnContainer", 18, 18), P = F.group("closeGroup"), z.closeButton = F.symbol("closeIcon", 0, 0, 6, P).attr({
                transform: "t9,9",
                "stroke-width": 2,
                stroke: A("999999"),
                ishot: !0,
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            }).css({
                cursor: "pointer",
                _cursor: "hand"
            }).click(function () {
                W.messageLogger.close()
            }));
        z.logWrapper = v.html("div", {
                id: "logWrapper",
                x: (O - ua) / 2,
                y: (oa - ka) / 2,
                width: ua,
                height: ka
            }, {
                overflow: "auto"
            },
            z.dialog).on("scroll", function () {
            var h = this && this.scrollTop,
                q = this && this.scrollHeight,
                v = this && this.offsetHeight;
            Y ? Y = !1 : ha = q - h === v ? !0 : !1
        });
        z.log = v.html("div", {
            id: "log",
            x: 0,
            y: 0
        }, {}, z.logWrapper);
        z.hide();
        return z
    };
    za = function (h, q, v, z) {
        if (W.messageLogger) return W.messageLogger;
        this.chart = h;
        this.instanceAPI = q;
        this.renderer = v;
        this.paper = z;
        this.menuCreated = !1;
        this.log = (h = this.ui = Ja(q, v, z)) && h.log;
        h && this.updateStatus("INITIALIZED")
    };
    za.prototype = {
        STATUS: "",
        updateStatus: function (h) {
            var q = this.renderer,
                q =
                q && q.menu instanceof Array && q.menu[0];
            this.status = h;
            switch (q && this.status.toLowerCase()) {
                case "initialized":
                    Ha ? q.hideItem(4) : q.hideItem(1);
                    break;
                case "closed":
                    Ha ? q.showItem(3) : q.showItem(0);
                    Ha ? q.hideItem(4) : q.hideItem(1);
                    break;
                case "active":
                    Ha ? q.showItem(4) : q.showItem(1), Ha ? q.hideItem(3) : q.hideItem(0)
            }
        },
        appendMessage: function (h) {
            var q = this.status,
                v = F(h.msgid, ""),
                G = F(h.msgtitle, ""),
                A = F(h.msgtext, ""),
                O = h && F(h.msgtype, "literal"),
                $ = h && !!ua(h.clearlog, 0),
                oa = h && !!ua(h.hidelog, 0),
                na = h && !!ua(h.showlog, 0),
                ja = h && !!ua(h.msggoestolog, ya),
                va = h && !!ua(h.msggoestojs, Da);
            ja && "INITIALIZED" === q && this.updateStatus("CLOSED");
            oa && this.close();
            $ && this.clear();
            na && this.open();
            ja && "ACTIVE" !== this.status && this.show();
            if (("" !== G && void 0 !== G || "" !== A && void 0 !== A) && this.log && ja) {
                var q = this.log,
                    $ = h && h.msgtitle,
                    oa = h && h.msgtext,
                    na = h && F(h.msgtype, "literal"),
                    ka, W;
                h = "";
                var fa, wa, ra;
                q && q.element && (fa = q.element);
                fa && (wa = fa.parentElement);
                $ && ($ += " : ");
                switch (na.toLowerCase()) {
                    case "info":
                        $ && (ka = '<span style="color: #005900">$titleVal$</span>');
                        oa && (W = "<span>$msgVal$</span>");
                        break;
                    case "literal":
                        $ && (ka = '<span style="color: #005900">$titleVal$</span>');
                        oa && (W = "<span>$msgVal$</span>");
                        break;
                    case "error":
                        $ && (ka = '<span style="color: #CC0000">$titleVal$</span>');
                        oa && (W = '<span style="color: #CC0000">$msgVal$</span>');
                        break;
                    case "link":
                        $ && (ka = '<span style="color: #005900">$titleVal$</span>');
                        oa && (W = '<a href="$msgVal$">$msgVal$</a>');
                        break;
                    default:
                        $ && (ka = '<span style="color: #005900">$titleVal$</span>'), oa && (W = "<span>$msgVal$</span>")
                }
                ka && (ka =
                    ka.replace("$titleVal$", $), h += ka);
                W && (W = z.call(W, "$msgVal$", oa), h += W);
                if (fa && h) {
                    ka = qa.createElement("span");
                    for (ra in Ua) ka.style[ra] = Ua[ra];
                    ka.innerHTML = h;
                    fa.appendChild && fa.appendChild(ka);
                    Xa && zb && (ra = fa.innerHTML, fa.innerHTML = ra);
                    ha && (Y = !0, fa = wa.scrollHeight, wa.scrollTop = fa)
                }
                Xa || (this.ui.element.scrollHeight += 30, this.ui.element.scrollTop = this.ui.element.scrollHeight)
            }
            va && P && (va = ub[P], "function" === typeof va && (V ? va(v, G, A, O) : va(A)))
        },
        hide: function () {
            "ACTIVE" === this.status && (this.ui.hide(), this.updateStatus("BEFORE CLOSE"))
        },
        close: function () {
            "ACTIVE" === this.status && (this.ui.hide(), this.updateStatus("CLOSED"))
        },
        open: function () {
            "ACTIVE" !== this.status && (this.ui.show(), this.updateStatus("ACTIVE"))
        },
        show: function () {
            "ACTIVE" !== this.status && "CLOSED" !== this.status && (this.ui.show(), this.updateStatus("ACTIVE"))
        },
        clear: function () {
            var h = this.log;
            if (h = h && h.element)
                for (; h.hasChildNodes();) h.removeChild(h.lastChild)
        },
        destroy: function () {
            this.hide();
            this.updateStatus("DESTROYED");
            W.messageLogger = null;
            delete W.messageLogger;
            return null
        }
    };
    za.prototype.constructor = za;
    this.core.addEventListener(["rendered", "dataupdated", "resized"], function (z) {
        var F = z && z.sender;
        z = z && z.eventType;
        var v = F && F.jsVars,
            A = v && v.hcObj,
            Y = A && A.options,
            ha = v && v.instanceAPI,
            $ = ha && ha.renderer,
            A = $ && $.paper,
            Y = Y && Y.chart,
            qa = F && F.options,
            qa = qa && qa.renderer,
            na = W && W.messageLogger,
            ja = na && na.status,
            Ua = v && v._reflowData,
            ka = Ua && Ua._messageLogger || {},
            v = ka && ka.appendedMessages,
            Ja;
        if (!qa || "javascript" === qa.toLowerCase())
            if (O = Y && Y.useMessageLog) {
                Y && (Ha = Y.showRTMenuItem, ya = Y.messageGoesToLog,
                    Da = Y.messageGoesToJS, P = Y.messageJSHandler, V = Y.messagePassAllToJS, va = Y.messageLogWPercent, q = Y.messageLogHPercent, G = Y.messageLogShowTitle, h = Y.messageLogTitle, fa = Y.messageLogIsCancelable, ab = Y.messageLogColor, ab = ab.replace(/^#?([a-f0-9]+)/ig, "$1"), da(ab), oa = Y.alwaysShowMessageLogMenu);
                na && (na = W.messageLogger = na.destroy());
                Ja = (na = W.messageLogger = new za(F, ha, $, A)) && na.ui && na.ui.log && na.ui.log.element;
                if ("resized" === z) switch (v && (Ja.innerHTML = v), ja.toLowerCase()) {
                    case "active":
                        na.ui.show();
                        na.updateStatus(ja);
                        break;
                    case "closed":
                        na.updateStatus(ja)
                }
                oa && (na.menuCreated = !0);
                F.addEventListener("RealTimeUpdateComplete", function (h, q) {
                    var v = q && q.updateObject,
                        z = v && v.msgtitle,
                        G = v && v.msgtext,
                        A = v && ua(v.showlog, 0),
                        Y = v && ua(v.hidelog, 0),
                        V = v && ua(v.clearlog, 0);
                    if (z || G || A || Y || V) !O || Ha || !ya || oa || na.menuCreated || (ha.drawMLMenuButtons.call($, F), na.menuCreated = !0), na.appendMessage(v), ka.appendedMessages = Ja && Ja.innerHTML, Ua._messageLogger = ka
                });
                F.addEventListener("beforeDispose", function () {
                    na && na.destroy()
                })
            }
    })
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-realtime", function () {
    var W = this,
        lb = W.window,
        za = Math,
        Xa = za.random,
        da = za.max,
        A = W.hcLib.pluckNumber,
        Ha = function (A, q, G) {
            clearTimeout(G);
            return setTimeout(A, q)
        },
        O, ya;
    O = function (A) {
        var q = A.sender,
            G = q.jsVars;
        A = q.__state;
        var h = G.instanceAPI,
            O = h.hcJSON,
            Da = h.numberFormatter,
            P = O && O.alerts && O.alerts.alert || [],
            G = G._rtLastUpdatedData && G._rtLastUpdatedData.values,
            V = P.length,
            fa;
        if (G && G.length) {
            h = function (h) {
                var G, A = Da.getCleanValue(h),
                    O, fa = function (h) {
                        return function () {
                            eval(h.param)
                        }
                    };
                for (O = 0; O < V; O += 1)
                    if (h = P[O], G = h.action && h.action.toLowerCase(), h.minvalue <= A && h.maxvalue >= A) {
                        if ("1" !== h.occuronce || !h.hasOccurred) {
                            h.hasOccurred = !0;
                            h.state = "1";
                            switch (G) {
                                case "calljs":
                                    setTimeout(fa(h), 0);
                                    break;
                                case "showannotation":
                                    q.showAnnotation && q.showAnnotation(h.param)
                            }
                            W.raiseEvent("AlertComplete", {
                                alertValue: A,
                                alertMaxValue: h.maxvalue,
                                alertMinValue: h.minvalue
                            }, q)
                        }
                    } else "showannotation" === G && "1" === h.state && q.hideAnnotation && q.hideAnnotation(h.param), h.state = "2"
            };
            O = da(G.length, 0);
            for (fa = 0; fa < O; fa +=
                1) A.lastSetValues && G[fa] === A.lastSetValues[fa] || h(G[fa]);
            A.lastSetValues = G
        }
    };
    ya = function (va) {
        var q = va.sender,
            G = q.__state,
            h, da, Da, P, V, fa, oa, Ja, za, qa, ya, ha;
        G.dataSetDuringConstruction && !G.rtStateChanged && void 0 === G.rtPreInit && (q.dataReady() ? (G.rtStateChanged = !0, G.rtPreInit = !0) : G.rtPreInit = !1);
        G.rtStateChanged && (G.rtStateChanged = !1, h = q.jsVars, da = h.hcObj) && (Da = da.logic, V = (P = da.options) && P.chart || {}, fa = 1E3 * A(V.updateInterval, V.refreshInterval), oa = 1E3 * A(V.clearInterval, 0), Ja = V.dataStreamURL, za = V.dataStamp,
            V = Boolean(Da && Da.realtimeEnabled && 0 < fa && void 0 !== Ja && V), P = P && P.plotOptions && P.plotOptions.series.animation && P.plotOptions.series.animation.duration || 0, qa = G._rtAjaxObj, ya = function () {
                q.clearChart && q.clearChart();
                oa && (G._toClearChart = setTimeout(ya, oa))
            }, ha = function () {
                var h = Ja,
                    h = h + ((-1 === Ja.indexOf("?") ? "?num=" : "&num=") + Xa());
                za && (h += "&dataStamp=" + za);
                qa.open && qa.abort();
                qa.get(h);
                G._rtAjaxLatencyStart = new Date
            }, 0 >= fa ? (G._toRealtime = clearTimeout(G._toRealtime), qa && qa.abort()) : 10 > fa && (fa = 10), G._toClearChart =
            clearTimeout(G._toClearChart), 0 < oa && (10 > oa ? oa = 10 : G._toClearChart = setTimeout(ya, oa)), G._rtStaticRefreshMS = fa, V && (void 0 === G._rtPaused && (G._rtPaused = !1), G._rtDataUrl = Ja, G.lastSetValues = null, qa = G._rtAjaxObj || (G._rtAjaxObj = new W.ajax), qa.onSuccess = function (A, F, O, V) {
                if (!q.disposed) {
                    var P = h.hcObj && h.hcObj.logic;
                    O = P.linearDataParser && P.linearDataParser(A, P.multisetRealtime);
                    G._rtAjaxLatencyStart && (G._rtAjaxLatency = new Date - G._rtAjaxLatencyStart);
                    if (q.isActive() && O && da && (da.realtimeUpdate || P.realtimeUpdate)) {
                        za =
                            O.dataStamp ? O.dataStamp : null;
                        O.interval = 1E3 > fa ? fa : 1E3;
                        F = q.getDataJSON();
                        da.realtimeUpdate ? da.realtimeUpdate(O) : P.realtimeUpdate(O);
                        h._rtLastUpdatedData = P.multisetRealtime ? O : q.getDataJSON();
                        P = (P.realtimeDrawingLatency || 0) + (G._rtAjaxLatency || 0);
                        W.raiseEvent("realtimeUpdateComplete", {
                            data: A,
                            updateObject: O,
                            prevData: F.values,
                            source: "XmlHttpRequest",
                            url: V,
                            networkLatency: G._rtAjaxLatency,
                            latency: P
                        }, va.sender);
                        try {
                            lb.FC_ChartUpdated && lb.FC_ChartUpdated(va.sender.id)
                        } catch (z) {
                            setTimeout(function () {
                                throw z;
                            }, 1)
                        }
                        G._rtPaused || (P >= G._rtStaticRefreshMS && (P = G._rtStaticRefreshMS - 1), G._toRealtime = setTimeout(ha, G._rtStaticRefreshMS - P))
                    } else G._toRealtime = clearTimeout(G._toRealtime)
                }
            }, qa.onError = function (h, F, A, O) {
                G._rtAjaxLatencyStart && (G._rtAjaxLatency = new Date - G._rtAjaxLatencyStart);
                W.raiseEvent("realtimeUpdateError", {
                    source: "XmlHttpRequest",
                    url: O,
                    xmlHttpRequestObject: F.xhr,
                    error: h,
                    httpStatus: F.xhr && F.xhr.status ? F.xhr.status : -1,
                    networkLatency: G._rtAjaxLatency
                }, va.sender);
                G._toRealtime = q.isActive() ? setTimeout(ha,
                    fa) : clearTimeout(G._toRealtime)
            }, G._rtPaused || (G._toRealtime = Ha(ha, P > fa ? P : fa, G._toRealtime))), q.removeEventListener("realtimeUpdateComplete", O), Da.dataObj && Da.dataObj.alerts && Da.dataObj.alerts && Da.dataObj.alerts.alert && Da.dataObj.alerts.alert.length && q.addEventListener("realtimeUpdateComplete", O))
    };
    W.addEventListener(["beforeDataUpdate", "beforeRender"], function (A) {
        A = A.sender;
        var q = A.__state;
        A.jsVars && (A.jsVars._rtLastUpdatedData = null);
        q._toRealtime && (q._toRealtime = clearTimeout(q._toRealtime));
        q._toClearChart &&
            (q._toClearChart = clearTimeout(q._toClearChart));
        q._rtAjaxLatencyStart = null;
        q._rtAjaxLatency = null
    });
    W.addEventListener(["renderComplete", "dataUpdated"], function (A) {
        var q = A.sender.__state;
        q && (void 0 === q.rtPreInit && (q.rtPreInit = !1), q._rtPaused && delete q._rtPaused, q.rtStateChanged || (q.rtStateChanged = !0, ya.apply(this, arguments)))
    });
    W.core.addEventListener("beforeDispose", function (A) {
        A = A.sender.__state;
        A._toRealtime && (A._toRealtime = clearTimeout(A._toRealtime));
        A._toClearChart && (A._toClearChart = clearTimeout(A._toClearChart))
    });
    W.core.addEventListener("drawComplete", ya)
}]);
FusionCharts.register("module", ["private", "modules.renderer.js-widgets", function () {
    function W() {}

    function lb(a, e, c, d) {
        e = h(e, d);
        a = h(a, c);
        return e && a ? a / c == e / d ? c / a : Math.min(c / a, d / e) : 1
    }

    function za(a, e) {
        var c = a.labels,
            d = c._textY,
            b = c._righttX,
            c = c._leftX,
            f, k, g = e.length;
        for (f = 0; f < g; f += 1)
            if (k = e[f] && e[f].label) k.y = d, k.x = k.align === bb ? b : c
    }

    function Xa(a, e, c, d) {
        var b, f, k, g, p, m;
        c instanceof Array || (c = this.colorManager.getPlotColor(0));
        if (a && 0 < a.length) {
            for (f = k = a.length - 1; 0 <= f; --f)
                if (b = a[f]) b.minvalue = d.numberFormatter.getCleanValue(b.minvalue),
                    b.maxvalue = d.numberFormatter.getCleanValue(b.maxvalue), null === b.minvalue && (null !== b.maxvalue ? b.minvalue = b.maxvalue : f !== k && a.splice(f, 1)), void 0 !== b.label && (b.label = $(b.label)), void 0 !== b.name && (b.name = $(b.name)), null !== b.maxvalue && b.minvalue > b.maxvalue && (g = b.minvalue, b.minvalue = b.maxvalue, b.maxvalue = g);
            a.sort(Mb);
            a[0].code || (a[0].code = c[0]);
            void 0 === G(a[0].alpha) && (a[0].alpha = Qa);
            f = 0;
            for (k = a.length - 1; f < k; f += 1)
                if (g = f + 1, b = a[f], d = a[g], d.code || (d.code = c[g]), void 0 === G(d.alpha) && (d.alpha = Qa), null === b.maxvalue &&
                    (b.maxvalue = d.minvalue), b.maxvalue > d.minvalue) {
                    if (b.maxvalue > d.maxvalue) {
                        g = V(b);
                        g.maxvalue = b.maxvalue;
                        m = g.minvalue = d.maxvalue;
                        for (p = f + 2; p < k && a[p].minvalue < m; p += 1);
                        a.splice(p, 0, g);
                        k += 1
                    }
                    b.maxvalue = d.minvalue
                }
            b = a[f];
            null === b.maxvalue && (b.maxvalue = b.minvalue)
        }
        a && 0 < a.length || (e || (e = {
            code: "CCCCCC",
            alpha: "100",
            bordercolor: "000000",
            borderalpha: "100"
        }), a = [e], this.defaultAsigned = !0);
        this.colorArr = a
    }
    var da = this,
        A = da.hcLib,
        Ha = A.Raphael,
        O = A.BLANKSTRING,
        ya = A.createTrendLine,
        va = A.createContextMenu,
        q = A.pluck,
        G = A.getValidValue,
        h = A.pluckNumber,
        ab = A.getFirstDefinedValue,
        Da = A.getColorCodeString,
        P = A.FC_CONFIG_STRING,
        V = A.extend2,
        fa = A.getDashStyle,
        oa = A.hashify,
        Ja = A.hasSVG,
        ub = A.falseFN,
        qa = A.getFirstValue,
        zb = A.getFirstColor,
        ha = A.graphics.getDarkColor,
        Y = A.graphics.getLightColor,
        F = A.graphics.convertColor,
        ua = A.graphics.parseColor,
        Ab = A.graphics.parseAlpha,
        Ua = A.COLOR_TRANSPARENT,
        z = A.chartAPI,
        Ya = A.parseTooltext,
        Tb = z.singleseries,
        v = A.COMMASTRING,
        ib = A.ZEROSTRING,
        Jb = A.ONESTRING,
        Ub = /\\,/ig,
        $ = A.parseUnsafeString,
        Vb = A.HCstub,
        na = da.window,
        ja = /msie/i.test(na.navigator.userAgent) && !na.opera,
        vb = A.regex.hexcode,
        ka = "rgba(192,192,192," + (ja ? .002 : 1E-6) + ")",
        Wb = parseFloat,
        Xb = parseInt,
        wa = Math,
        ra = wa.round,
        Kb = wa.ceil,
        Aa = wa.max,
        Ka = wa.min,
        Bb = wa.abs,
        Lb = wa.atan2,
        la = wa.pow,
        ob = wa.sqrt,
        db = wa.PI / 180,
        jb = A.regex.dropHash,
        Cb = A.toPrecision,
        Yb = A.isArray,
        mb = A.HASHSTRING,
        R = A.toRaphaelColor,
        wa = A.TOUCH_THRESHOLD_PIXELS,
        Zb = A.CLICK_THRESHOLD_PIXELS,
        Db = void 0 !== na.document.documentElement.ontouchstart,
        Eb = Db ? wa : Zb,
        $b = A.getPosition,
        ma = A.plotEventHandler,
        Mb, Fb, Gb, Hb,
        kb, Nb, Ob, Pb, ac = {
            left: "start",
            right: "end",
            center: "middle"
        },
        wb = {
            "true": void 0,
            "false": "crisp"
        },
        bc = function (a, e, c) {
            var d = 0,
                b = a.length;
            if (c)
                for (; d < b; d++) {
                    if (!1 === e.call(c, a[d], d, a)) return d
                } else
                    for (; d < b; d++)
                        if (!1 === e.call(a[d], a[d], d, a)) return d
        },
        Ea = function (a, e) {
            var c;
            a || (a = {});
            for (c in e) a[c] = e[c];
            return a
        },
        pb = function (a) {
            return "object" === typeof a
        },
        Za = function (a) {
            return "string" === typeof a
        },
        ia = function (a) {
            return void 0 !== a && null !== a
        },
        xb = ja && !Ja ? "visible" : "",
        yb = A.regex.startsRGBA,
        Ga = A.setLineHeight,
        Qb = A.pluckFontSize,
        La = A.POSITION_MIDDLE,
        Ma = A.POSITION_TOP,
        qb = A.POSITION_BOTTOM,
        bb = A.POSITION_RIGHT,
        Ia = A.POSITION_LEFT,
        Na = A.POSITION_MIDDLE,
        Qa = A.HUNDREDSTRING,
        nb = A.PXSTRING,
        Rb = A.COMMASPACE,
        Ba = {
            right: "end",
            left: "start",
            middle: "middle",
            start: "start",
            end: "end",
            center: "middle",
            undefined: "",
            "": ""
        },
        ja = !/fusioncharts\.com$/i.test(na.location.hostname),
        cc = function () {
            return function (a, e, c) {
                var d, b = this,
                    f = this._Attr,
                    k = Ha.vml ? -1.5 : 0,
                    g = Ha.vml ? -1.5 : 0,
                    p;
                f || (f = b._Attr = {});
                Za(a) && ia(e) && (d = a, a = {}, a[d] = e);
                if (Za(a) ||
                    void 0 === a) b = "angle" == a ? b._Attr[a] : b._attr(a);
                else
                    for (d in a) e = a[d], "angle" === d ? (f[d] = e, p = e * db, f.tooltipPos[0] = f.cx + f.toolTipRadius * Math.cos(p), f.tooltipPos[1] = f.cy + f.toolTipRadius * Math.sin(p), f.prevValue = e, c && c.duration ? b.animate({
                        transform: "R" + e + "," + k + "," + g
                    }, c.duration, "easeIn") : b.attr({
                        transform: "R" + e + "," + k + "," + g
                    })) : b._attr(d, e);
                return b
            }
        },
        rb = function (a) {
            var e = [],
                c;
            (function (a) {
                (c = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(a)) ? e = [parseInt(c[1],
                    10), parseInt(c[2], 10), parseInt(c[3], 10), parseFloat(c[4])]: (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a)) && (e = [parseInt(c[1], 16), parseInt(c[2], 16), parseInt(c[3], 16), 1])
            })(a);
            return {
                get: function (c) {
                    return e && !isNaN(e[0]) ? "rgb" === c ? "rgb(" + e[0] + "," + e[1] + "," + e[2] + ")" : "hex" === c ? "#" + ("000000" + (e[0] << 16 | e[1] << 8 | e[2]).toString(16)).slice(-6) : "a" === c ? e[3] : "rgba(" + e.join(",") + ")" : a
                },
                brighten: function (a) {
                    if (!isNaN(a) && 0 !== a) {
                        var b;
                        for (b = 0; 3 > b; b++) e[b] += parseInt(255 * a, 10), 0 > e[b] && (e[b] = 0), 255 <
                            e[b] && (e[b] = 255)
                    }
                    return this
                },
                setOpacity: function (a) {
                    e[3] = a;
                    return this
                }
            }
        },
        wa = V({}, A.defaultGaugePaletteOptions);
    W.prototype = {
        numDecimals: function (a) {
            a = Cb(a, 10);
            a = Math.abs(a);
            a = Cb(a - Math.floor(a), 10);
            a = String(a).length - 2;
            return 0 > a ? 0 : a
        },
        toRadians: function (a) {
            return a / 180 * Math.PI
        },
        toDegrees: function (a) {
            return a / Math.PI * 180
        },
        flashToStandardAngle: function (a) {
            return -1 * a
        },
        standardToFlashAngle: function (a) {
            return -1 * a
        },
        flash180ToStandardAngle: function (a) {
            var e = 360 - (0 > (a %= 360) ? a + 360 : a);
            return 360 == e ? 0 : e
        },
        getAngularPoint: function (a, e, c, d) {
            d *= Math.PI / 180;
            a += c * Math.cos(d);
            e -= c * Math.sin(d);
            return {
                x: a,
                y: e
            }
        },
        remainderOf: function (a, e) {
            var c = a % e,
                d = void 0,
                d = la(10, void 0 === d ? 2 : d),
                c = ra(Number(String(c * d)));
            return c /= d
        },
        boundAngle: function (a) {
            return 0 <= a ? W.prototype.remainderOf(a, 360) : 360 - W.prototype.remainderOf(Math.abs(a), 360)
        },
        toNearestTwip: function (a) {
            var e = 0 > a ? -1 : 1;
            a = Math.abs(a);
            a = ra(100 * a);
            var c = Math.floor(a / 5);
            return (2 < Number(String(a - 5 * c)) ? 5 * c + 5 : 5 * c) / 100 * e
        },
        roundUp: function (a, e) {
            var c = la(10, void 0 ===
                e ? 2 : e);
            a = ra(Number(String(a * c)));
            return a /= c
        }
    };
    W.prototype.constructor = W;
    A.MathExt = W;
    Fb = function (a, e, c, d, b, f, k, g) {
        var p = a[P].smartLabel,
            m = e.chart,
            l = a.chart,
            n, s, r = 0;
        e = a.title;
        k = a.subtitle;
        var t = e.text,
            u = k.text;
        b = h(m.captionpadding, b, 2);
        var B = 0,
            L = 0,
            r = 0,
            w = h(m.captiononright, 0),
            q = G(m.captionposition, "top").toLowerCase(),
            m = 0,
            x = {
                left: 0,
                right: 0
            };
        g = g.snapLiterals || (g.snapLiterals = {});
        var y = 0,
            D = 0;
        t !== O && (n = e.style, B = h(parseInt(n.fontHeight, 10), parseInt(n.lineHeight, 10), 12), h(parseInt(n.fontSize, 10), 10));
        u !==
            O && (s = k.style, L = h(parseInt(s.fontHeight, 10), parseInt(s.lineHeight, 10), 12), r = h(parseInt(s.fontSize, 10), 10));
        if (0 < B || 0 < L) {
            p.setStyle(n);
            n = p.getSmartText(e.text, c, d);
            0 < n.width && (n.width += 2, m = n.height);
            p.setStyle(s);
            s = p.getSmartText(k.text, c, d - m);
            0 < s.width && (s.width += 2);
            p = n.height + 0 + r / 2;
            switch (q) {
                case "middle":
                    e.y = d / 2 - n.height;
                    k.y = e.y + p;
                    break;
                case "bottom":
                    k.y = d - l.marginBottom - l.marginTop - s.height;
                    e.y = k.y - (0 < n.height ? p : 0);
                    break;
                default:
                    e.y = 0, k.y = p
            }
            r = Math.max(n.width, s.width);
            a.title.text = n.text;
            n.tooltext &&
                (a.title.originalText = n.tooltext);
            a.subtitle.text = s.text;
            s.tooltext && (a.subtitle.originalText = s.tooltext);
            0 < r && (r += b);
            a = Math.min(r, c);
            w ? (e.align = k.align = Ba.start, x.right = a, e.x = f - r + b, k.x = f - r + b) : (e.align = k.align = Ba.end, x.left = a, e.x = r - b, k.x = r - b, y = a, D = s.width);
            e._captionWidth = n.width;
            k._subCaptionWidth = s.width;
            g.captionstartx = e.x - y;
            g.captionstarty = e.y;
            g.captionwidth = n.width;
            g.captionheight = m || 0;
            g.captionendx = g.captionstartx + g.captionwidth;
            g.captionendy = g.captionstarty + g.captionheight;
            g.subcaptionstartx =
                k.x - D;
            g.subcaptionstarty = k.y;
            g.subcaptionwidth = 0 < s.width ? s.width : 0;
            g.subcaptionheight = 0 < s.height ? s.height : 0;
            g.subcaptionendx = g.subcaptionstartx + g.subcaptionwidth;
            g.subcaptionendy = g.subcaptionstarty + g.subcaptionheight
        }
        return x
    };
    Gb = function (a, e, c, d, b, f) {
        var k = a.chart,
            g = e.chart;
        e = a.title;
        var p = h(g.captionpadding, 2),
            g = h(g.captiononright, 0);
        a = a.subtitle;
        f = f.snapLiterals;
        var m = 0,
            l = 0;
        k.spacingRight = k.spacingLeft = 0;
        ia(d) || (d = 0);
        ia(b) || (b = 0);
        g ? (c -= k.marginRight, a.align = e.align = Ba.start, e.x = a.x = c + p + b + 2) : (a.align =
            e.align = Ba.end, e.x = a.x = k.marginLeft - k.spacingLeft - p - d - 2, m = e._captionWidth, l = a._subCaptionWidth);
        f.captionstartx = e.x - m;
        f.subcaptionstartx = a.x - l;
        f.captionendx = f.captionstartx + f.captionwidth;
        f.subcaptionendx = f.subcaptionstartx + f.subcaptionwidth
    };
    Hb = function (a, e, c, d, b) {
        this.userMin = a;
        this.userMax = e;
        this.numMajorTM = h(d.majorTMNumber, -1);
        this.numMinorTM = h(d.minorTMNumber, 5);
        this.adjustTM = d.adjustTM;
        this.tickValueStep = h(d.tickValueStep, 1);
        this.showLimits = h(d.showLimits, 1);
        this.showTickValues = h(d.showTickValues,
            1);
        this.nf = b;
        this.stopMaxAtZero = c;
        this.setMinAsZero = !d.setAdaptiveMin;
        this.upperLimitDisplay = d.upperLimitDisplay;
        this.lowerLimitDisplay = d.lowerLimitDisplay;
        this.userMaxGiven = null === this.userMax || void 0 === this.userMax || "" === this.userMax ? !1 : !0;
        this.userMinGiven = null === this.userMin || void 0 === this.userMin || "" === this.userMin ? !1 : !0;
        this.majorTM = [];
        this.minorTM = [];
        this.MathExt = new W
    };
    Hb.prototype = {
        setAxisCoords: function (a, e) {
            this.startAxisPos = a;
            this.endAxisPos = e
        },
        calculateLimits: function (a, e) {
            var c = !0,
                d = !0,
                b = Number(this.userMax),
                f = Number(this.userMin),
                k, g;
            if (this.userMaxGiven && this.userMinGiven) b > a && (a = b), f < e && (e = f);
            else if (isNaN(a) && (a = .9, d = !1), isNaN(e) && (e = 0, c = !1), a === e && 0 === a && (isNaN(b) || (a = b), isNaN(b) || 0 === b)) a = .9;
            f = Math.floor(Math.log(Math.abs(a)) / Math.LN10);
            k = Math.floor(Math.log(Math.abs(e)) / Math.LN10);
            k = Math.max(k, f);
            f = la(10, k);
            2 > Math.abs(a) / f && 2 > Math.abs(e) / f && (k--, f = la(10, k));
            k = Math.floor(Math.log(a - e) / Math.LN10);
            k = la(10, k);
            0 < a - e && 10 <= f / k && (f = k);
            k = (Math.floor(a / f) + 1) * f;
            0 > e ? g = -1 * (Math.floor(Math.abs(e /
                f)) + 1) * f : this.setMinAsZero ? g = 0 : (g = Math.floor(Math.abs(e / f) - 1) * f, g = 0 > g ? 0 : g);
            this.stopMaxAtZero && 0 >= a && (k = 0);
            this.max = !1 === this.userMaxGiven || !0 === this.userMaxGiven && b < a && d ? k : b;
            this.min = !1 === this.userMinGiven || !0 === this.userMinGiven && Number(this.userMin) > e && c ? g : Number(this.userMin);
            this.min > this.max ? this.min == Number(this.userMin) && this.max == b ? (c = this.min, this.min = this.max, this.max = c) : this.min == Number(this.userMin) ? this.max = this.min + 1 : this.max == b && (this.min = this.max - 1) : this.min == this.max && (this.max =
                this.min + 1);
            this.range = Math.abs(this.max - this.min);
            this.interval = f;
            this.calcTickInterval()
        },
        calcTickInterval: function () {
            var a, e, c = 0; - 1 != this.numMajorTM && 2 > this.numMajorTM && (this.numMajorTM = 2);
            !1 === this.userMinGiven && !1 === this.userMaxGiven && -1 !== this.numMajorTM ? (this.numMajorTM = -1 == this.numMajorTM ? 5 : this.numMajorTM, a = this.getDivisibleRange(this.min, this.max, this.numMajorTM, this.interval, !0), e = a - this.range, this.range = a, 0 < this.max ? this.max += e : this.min -= e) : (this.numMajorTM = -1 == this.numMajorTM ? 5 : this.numMajorTM, !0 === this.adjustTM && (a = function (a, b) {
                for (var c = 0, e = 1, g;;) {
                    g = b.numMajorTM + c * e;
                    g = 0 === g ? 1 : g;
                    if (b.isRangeDivisible(a, g, b.interval)) break;
                    c = -1 == e || c > b.numMajorTM ? ++c : c;
                    if (25 < c) {
                        g = b.numMajorTM;
                        break
                    }
                    e = c <= b.numMajorTM ? -1 * e : 1
                }
                b.numMajorTM = 1 < g ? g : b.numMajorTM
            }, e = this.numMajorTM, a(this.range, this), 2 === this.numMajorTM && (this.numMajorTM = e, a(this.range + 1, this), c = 1)));
            this.majorTickInt = (this.max - this.min + c) / (this.numMajorTM - 1)
        },
        isRangeDivisible: function (a, e, c) {
            return this.MathExt.numDecimals(a / (e - 1)) > this.MathExt.numDecimals(c) ?
                !1 : !0
        },
        getDivisibleRange: function (a, e, c, d, b) {
            if (3 > c) return this.range;
            a = Math.abs(e - a);
            e = a / (c - 1);
            this.isRangeDivisible(a, c, d) || (b && Number(e) / Number(d) < (1 < d ? 2 : .5) && (d /= 10), e = (Math.floor(e / d) + 1) * d, a = e * (c - 1));
            return a
        },
        calculateTicks: function () {
            this.majorTM = [];
            this.minorTM = [];
            for (var a = 0, e, c, d = this.numMajorTM, b = this.numMinorTM, f = this.nf, k = this.tickValueStep, g = $(this.lowerLimitDisplay), p = $(this.upperLimitDisplay), m = this.majorTickInt, l = this.min, n = this.showTickValues, s = !1, r = h(this.showLimits, n); a < d; a += 1) e =
                a < d - 1 ? Cb(Number(l + m * a), 10) : this.max, c = f.scale(e), s = !1, 0 !== a % k && a !== d - 1 ? c = O : 0 === a || a === d - 1 ? r ? 0 === a && g ? (c = g, s = !0) : a == d - 1 && p && (c = p, s = !0) : c = O : n || (c = O), this.majorTM.push({
                    displayValue: c,
                    isString: s,
                    value: e
                });
            c = m / (b + 1);
            for (a = 0; a < d - 1; a += 1)
                for (e = 1; e <= b; e += 1) this.minorTM.push(this.majorTM[a].value + c * e)
        },
        returnDataAsTick: function (a, e) {
            var c = {};
            c.value = a;
            c.displayValue = this.nf.dataLabels(a);
            c.showValue = e;
            return c
        },
        getMax: function () {
            return this.max
        },
        getMin: function () {
            return this.min
        },
        getMajorTM: function () {
            return this.majorTM
        },
        getMinorTM: function () {
            return this.minorTM
        },
        getAxisPosition: function (a) {
            if (void 0 === this.startAxisPos || void 0 === this.endAxisPos) throw Error("Cannot calculate position, as axis co-ordinates have not been defined. Please use setAxisCoords() method to define the same.");
            return this.startAxisPos + (this.endAxisPos - this.startAxisPos) / (this.max - this.min) * (a - this.min)
        },
        getValueFromPosition: function (a) {
            if (void 0 === this.startAxisPos || void 0 === this.endAxisPos) throw Error("Cannot calculate value, as axis co-ordinates have not been defined. Please use setAxisCoords() method to define the same.");
            var e, c;
            e = this.max - this.min;
            c = a - this.startAxisPos;
            return c / (c + (this.endAxisPos - a)) * e + this.min
        }
    };
    z("gaugebase", {
        creditLabel: ja,
        defaultPaletteOptions: wa,
        multiValueGauge: !1,
        decimals: 2,
        formatnumberscale: 0,
        drawAnnotations: !0,
        useScaleRecursively: !0,
        includeColorRangeInLimits: !1,
        init: function (a, e, c) {
            var d = c.jsVars;
            this.rtLatestSeriesData = d && d._rtLastUpdatedData ? d._rtLastUpdatedData : null;
            return z.base.init.apply(this, arguments)
        },
        chart: function (a, e) {
            var c = this.name,
                d = this.dataObj || {},
                b = d.chart || {},
                f = this.defaultSeriesType,
                k = this.realtimeEnabled,
                g = this.colorManager,
                p, m = d.alerts,
                l, n, s, r, t, u, B, L, w, T, x, y, D;
            n = Vb(d, a, e, this);
            t = n.chart;
            l = n[P];
            n.labels.smartLabel = l.smartLabel = this.smartLabel;
            this.width = a;
            this.height = e;
            l.width = a;
            l.height = e;
            r = n.plotOptions;
            t.useRoundEdges = 1 == b.useroundedges;
            l.tooltext = b.plottooltext;
            l.targettooltext = b.targettooltext;
            p = (t.is3D = s = l.is3d = /3d$/.test(f)) ? A.chartPaletteStr.chart3D : A.chartPaletteStr.chart2D;
            t.defaultSeriesType = f;
            u = 0 < b.palette && 6 > b.palette ? b.palette : h(this.paletteIndex, 1);
            --u;
            t.paletteIndex =
                u;
            f = V({}, d.colorrange);
            this.colorRangeGetter = new Xa(f.color, void 0, this.defaultPaletteOptions.paletteColors[u], this);
            t.events.click = n.plotOptions.series.point.events.click = this.linkClickFN;
            void 0 !== q(b.clickurl) && (t.link = b.clickurl, t.style.cursor = "pointer", n.plotOptions.series.point.events.click = function () {
                t.events.click.call({
                    link: b.clickurl
                })
            });
            B = q(b.basefont, "Verdana,sans");
            L = Qb(b.basefontsize, 10);
            w = q(b.basefontcolor, g.getColor("baseFontColor"));
            f = q(b.outcnvbasefont, B);
            x = Qb(b.outcnvbasefontsize,
                L);
            u = x + nb;
            T = q(b.outcnvbasefontcolor, w).replace(/^#?([a-f0-9]+)/ig, "#$1");
            L += nb;
            w = w.replace(/^#?([a-f0-9]+)/ig, "#$1");
            this.trendStyle = this.outCanvasStyle = {
                fontFamily: f,
                color: T,
                fontSize: u
            };
            y = Ga(this.trendStyle);
            this.inCanvasStyle = {
                fontFamily: B,
                fontSize: L,
                color: w
            };
            D = Ga(this.inCanvasStyle);
            l.trendStyle = l.outCanvasStyle = {
                fontFamily: f,
                color: T,
                fontSize: u
            };
            V(n.legend, {
                title: {
                    style: {
                        fontFamily: q(b.legendcaptionfont, f),
                        fontSize: h(b.legendcaptionfontsize, x) + "px",
                        color: oa(q(b.legendcaptionfontcolor, T)),
                        fontWeight: h(b.legendcaptionfontbold,
                            1) ? "bold" : "normal"
                    },
                    align: ac[q(b.legendcaptionalignment)]
                },
                itemStyle: {
                    fontFamily: q(b.legenditemfont, f),
                    fontSize: h(b.legenditemfontsize, x) + "px",
                    color: oa(q(b.legenditemfontcolor, T)),
                    fontWeight: h(b.legenditemfontbold) ? "bold" : "normal"
                },
                itemHiddenStyle: {
                    fontFamily: f,
                    fontSize: x + "px",
                    color: oa(q(b.legenditemhiddencolor, T))
                },
                itemHoverStyle: {
                    color: oa(q(b.legenditemhoverfontcolor, b.legenditemfontcolor, T))
                }
            });
            n.legend.title.style.lineHeight = Ga(n.legend.title.style);
            n.legend.itemStyle.lineHeight = Ga(n.legend.itemStyle);
            n.legend.itemHiddenStyle.lineHeight = Ga(n.legend.itemHiddenStyle);
            l = (l = qa(b.valuebordercolor, O)) ? F(l, h(b.valueborderalpha, b.valuealpha, 100)) : O;
            l = r.series.dataLabels.style = {
                fontFamily: q(b.valuefont, B),
                fontSize: q(b.valuefontsize, parseInt(L, 10)) + nb,
                color: F(q(b.valuefontcolor, w), h(b.valuefontalpha, b.valuealpha, 100)),
                fontWeight: h(b.valuefontbold) ? "bold" : "normal",
                fontStyle: h(b.valuefontitalic) ? "italic" : "normal",
                border: l || b.valuebgcolor ? h(b.valueborderthickness, 1) + "px solid" : void 0,
                borderColor: l,
                borderThickness: h(b.valueborderthickness,
                    1),
                borderPadding: h(b.valueborderpadding, 2),
                borderRadius: h(b.valueborderradius, 0),
                backgroundColor: b.valuebgcolor ? F(b.valuebgcolor, h(b.valuebgalpha, b.valuealpha, 100)) : O,
                borderDash: h(b.valueborderdashed, 0) ? fa(h(b.valueborderdashlen, 4), h(b.valueborderdashgap, 2), h(b.valueborderthickness, 1)) : "none"
            };
            Ga(l);
            r.series.dataLabels.color = l.color;
            this.isDataLabelBold && (l.fontWeight = "bold", delete l.lineHeight, Ga(l));
            n.tooltip.style = {
                fontFamily: B,
                fontSize: L,
                lineHeight: D,
                color: w
            };
            n.title.style = {
                fontFamily: q(b.captionfont,
                    f),
                color: q(b.captionfontcolor, T).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                fontSize: h(b.captionfontsize, x + 3) + nb,
                fontWeight: 0 === h(b.captionfontbold) ? "normal" : "bold"
            };
            n.title.align = q(b.captionalignment, La);
            n.title.isOnTop = h(b.captionontop, 1);
            n.title.alignWithCanvas = h(b.aligncaptionwithcanvas, this.alignCaptionWithCanvas, 1);
            n.title.horizontalPadding = h(b.captionhorizontalpadding, n.title.alignWithCanvas ? 0 : 15);
            Ga(n.title.style);
            n.subtitle.style = {
                fontFamily: q(b.subcaptionfont, b.captionfont, f),
                color: q(b.subcaptionfontcolor,
                    b.captionfontcolor, T).replace(/^#?([a-f0-9]+)/ig, "#$1"),
                fontSize: h(b.subcaptionfontsize, h(Aa(h(b.captionfontsize) - 3, -1), x) + h(this.subTitleFontSizeExtender, 1)) + nb,
                fontWeight: 0 === h(b.subcaptionfontbold, this.subTitleFontWeight, b.captionfontbold) ? "normal" : "bold"
            };
            n.subtitle.align = n.title.align;
            n.subtitle.isOnTop = n.title.isOnTop;
            n.subtitle.alignWithCanvas = n.title.alignWithCanvas;
            n.subtitle.horizontalPadding = n.title.horizontalPadding;
            Ga(n.subtitle.style);
            n.chart.trendPointStyle = {
                style: this.trendStyle
            };
            n.orphanStyles = {
                defaultStyle: {
                    style: V({}, this.inCanvasStyle)
                }
            };
            n.chart.colorRangeStyle = {
                style: {
                    fontFamily: B,
                    fontSize: L,
                    lineHeight: D,
                    color: w
                }
            };
            Ga(n.chart.colorRangeStyle);
            l = h(b.scaleonresize, 1);
            t.origW = r = h(b.origw, l ? this.origRenderWidth : a);
            t.origH = l = h(b.origh, l ? this.origRenderHeight : e);
            r = (t.autoScale = B = h(b.autoscale, 1)) ? lb(r, l, a, e) : 1;
            this.scaleFactor = t.scaleFactor = r;
            this.createGaugeAxis && this.createGaugeAxis(d, n, {
                fontFamily: f,
                fontSize: u,
                lineHeight: y,
                color: T
            });
            this.parseStyles(n);
            delete n.xAxis.labels.style.backgroundColor;
            delete n.xAxis.labels.style.borderColor;
            delete n.yAxis[0].labels.style.backgroundColor;
            delete n.yAxis[0].labels.style.borderColor;
            delete n.yAxis[1].labels.style.backgroundColor;
            delete n.yAxis[1].labels.style.borderColor;
            this.showTooltip = h(b.showtooltip, this.showTooltip, 1);
            this.tooltipSepChar = q(b.tooltipsepchar, Rb);
            this.showValues = h(b.showvalues, b.showvalue, this.showValues, 1);
            this.seriesNameInToolTip = h(b.seriesnameintooltip, 1);
            this.showTooltip || (n.tooltip.enabled = !1);
            n.plotOptions.series.connectNullData =
                h(b.connectnulldata, 0);
            t.backgroundColor = {
                FCcolor: {
                    color: q(b.bgcolor, g.getColor(p.bgColor)),
                    alpha: q(b.bgalpha, g.getColor(p.bgAlpha)),
                    angle: q(b.bgangle, g.getColor(p.bgAngle)),
                    ratio: q(b.bgratio, g.getColor(p.bgRatio))
                }
            };
            p = h(b.showborder, s ? 0 : 1);
            t.borderWidth = p ? h(b.borderthickness, 1) : 0;
            t.borderRadius = h(b.borderradius, 0);
            t.borderDashStyle = h(b.borderdashed, 0) ? fa(h(b.borderdashlen, 4), h(b.borderdashgap, 2), t.borderWidth) : "none";
            t.borderColor = F(q(b.bordercolor, s ? "#666666" : g.getColor("borderColor")), q(b.borderalpha,
                s ? "100" : g.getColor("borderAlpha")));
            t.plotBackgroundColor = t.plotBorderColor = Ua;
            t.plotBorderWidth = 0;
            t.plotShadow = 0;
            t.bgSWF = q(b.bgimage, b.bgswf);
            t.bgSWFAlpha = h(b.bgimagealpha, b.bgswfalpha, 100);
            s = q(b.bgimagedisplaymode, "none").toLowerCase();
            p = G(b.bgimagevalign, O).toLowerCase();
            f = G(b.bgimagehalign, O).toLowerCase();
            "tile" == s || "fill" == s || "fit" == s ? (p != Ma && p != Na && p != qb && (p = Na), "left" != f && f != Na && "right" != f && (f = Na)) : (p != Ma && p != Na && p != qb && (p = Ma), "left" != f && f != Na && "right" != f && (f = "left"));
            t.bgImageDisplayMode =
                s;
            t.bgImageVAlign = p;
            t.bgImageHAlign = f;
            t.bgImageScale = h(b.bgimagescale, 100);
            t.logoURL = G(b.logourl);
            t.logoPosition = q(b.logoposition, "tl").toLowerCase();
            t.logoAlpha = h(b.logoalpha, 100);
            t.logoLink = G(b.logolink);
            t.logoScale = h(b.logoscale, 100);
            t.logoLeftMargin = h(b.logoleftmargin, 0);
            t.logoTopMargin = h(b.logotopmargin, 0);
            t.annRenderDelay = G(b.annrenderdelay);
            s = n.tooltip.style;
            s.backgroundColor = F(q(s.backgroundColor, b.tooltipbgcolor, b.hovercapbgcolor, b.hovercapbg, g.getColor("toolTipBgColor")), q(b.tooltipbgalpha,
                100));
            s.borderColor = F(q(s.borderColor, b.tooltipbordercolor, b.hovercapbordercolor, b.hovercapborder, g.getColor("toolTipBorderColor")), q(b.tooltipborderalpha, 100));
            n.tooltip.constrain = h(b.constraintooltip, 1);
            n.tooltip.shadow = h(b.showtooltipshadow, b.showshadow, 1) ? {
                enabled: !0,
                opacity: Aa(h(b.tooltipbgalpha, 100), h(b.tooltipborderalpha, 100)) / 100
            } : !1;
            s.borderWidth = h(b.tooltipborderthickness, 1) + "px";
            b.tooltipborderradius && (s.borderRadius = h(b.tooltipborderradius, 1) + "px");
            n.tooltip.style.padding = h(b.tooltippadding,
                this.tooltippadding, 3) + "px";
            b.tooltipcolor && (s.color = zb(b.tooltipcolor));
            t.rotateValues = h(b.rotatevalues, 0);
            t.placeValuesInside = h(b.placevaluesinside, 0);
            t.valuePosition = b.valueposition;
            t.valuePadding = h(b.valuepadding, 4);
            n.plotOptions.series.shadow = h(b.showshadow, b.showcolumnshadow, this.defaultPlotShadow, this.colorManager.getColor("showShadow"));
            t.useRoundEdges && (n.plotOptions.series.shadow = h(b.showshadow, b.showcolumnshadow, 1), n.plotOptions.series.borderRadius = 1, n.tooltip.borderRadius = 2);
            n.title.text =
                $(b.caption);
            n.subtitle.text = $(b.subcaption);
            b.showtooltip == ib && (n.tooltip.enabled = !1);
            g = h(b.plotspacepercent, 20);
            if (80 < g || 0 > g) g = 20;
            this.plotSpacePercent = n.plotOptions.series.groupPadding = g / 200;
            this.parseExportOptions(n);
            t.dataStreamURL = q(b.datastreamurl, "");
            t.refreshInterval = h(b.refreshinterval, 1);
            t.dataStamp = b.datastamp;
            t.useMessageLog = h(b.usemessagelog, 0);
            t.messageLogWPercent = Ka(h(b.messagelogwpercent, 80), 100);
            t.messageLogHPercent = Ka(h(b.messageloghpercent, 70), 100);
            t.messageLogShowTitle = h(b.messagelogshowtitle,
                1);
            t.messageLogTitle = q(b.messagelogtitle, "Message Log");
            t.messageLogColor = q(b.messagelogcolor, "#fbfbfb");
            t.messageGoesToJS = h(b.messagegoestojs, 0);
            t.messageGoesToLog = h(b.messagegoestolog, 1);
            t.messageJSHandler = q(b.messagejshandler, "");
            t.messagePassAllToJS = h(b.messagepassalltojs, 0);
            t.messageLogIsCancelable = h(b.messagelogiscancelable, 1);
            t.alwaysShowMessageLogMenu = h(b.alwaysshowmessagelogmenu, t.useMessageLog);
            t.showRTMenuItem = h(b.showrtmenuitem, 0);
            g = h(b.showgaugeborder, 1);
            t.gaugeBorderColor = q(b.gaugebordercolor,
                this.gaugeBorderColor, "333333");
            t.gaugeBorderThickness = g ? h(b.gaugeborderthickness, this.gaugeBorderThickness, 2) : 0;
            t.gaugeBorderAlpha = q(b.gaugeborderalpha, Qa);
            t.gaugeFillColor = q(b.gaugefillcolor, b.ledbgcolor, "000000");
            t.useSameFillColor = h(b.usesamefillcolor, 0);
            t.useSameFillBgColor = h(b.usesamefillbgcolor, t.useSameFillColor);
            t.colorRangeFillMix = ab(b.colorrangefillmix, b.gaugefillmix, this.colorRangeFillMix, "{light-10},{dark-10},{light-10},{dark-10}");
            t.colorRangeFillRatio = ab(b.colorrangefillratio, b.gaugefillratio,
                this.colorRangeFillRatio, b.gaugefillratio, "0,10,80,10");
            t.showColorRangeBorder = h(b.showcolorrangeborder, b.showgaugeborder, this.showColorRangeBorder, 0);
            t.colorRangeBorderColor = q(b.colorrangebordercolor, b.gaugebordercolor, "{dark-20}");
            t.colorRangeBorderThickness = g ? h(b.colorrangeborderthickness, b.gaugeborderthickness, 1) : 0;
            t.colorRangeBorderAlpha = h(b.colorrangeborderalpha, b.gaugeborderalpha, 100);
            t.roundRadius = h(b.roundradius, b.gaugeroundradius, 0);
            t.showShadow = h(b.showshadow, 1);
            t.gaugeType = h(b.gaugetype,
                this.gaugeType, 1);
            this.preSeriesAddition && this.preSeriesAddition(n, d, a, e);
            this.series(d, n, c, a, e);
            this.postSeriesAddition && this.postSeriesAddition(n, d, a, e);
            this.configureAxis && this.configureAxis(n, d);
            this.spaceManager && this.spaceManager(n, d, a, e);
            this.postSpaceManager && this.postSpaceManager();
            this.updateSnapPoints && this.updateSnapPoints(n);
            this.latestDataUpdater && this.latestDataUpdater(n, d, a, e);
            c = t.toolbar = {
                button: {}
            };
            g = c.button;
            g.scale = h(b.toolbarbuttonscale, 1.15);
            g.width = h(b.toolbarbuttonwidth, 15);
            g.height = h(b.toolbarbuttonheight, 15);
            g.radius = h(b.toolbarbuttonradius, 2);
            g.spacing = h(b.toolbarbuttonspacing, 5);
            g.fill = F(q(b.toolbarbuttoncolor, "ffffff"));
            g.labelFill = F(q(b.toolbarlabelcolor, "cccccc"));
            g.symbolFill = F(q(b.toolbarsymbolcolor, "ffffff"));
            g.hoverFill = F(q(b.toolbarbuttonhovercolor, "ffffff"));
            g.stroke = F(q(b.toolbarbuttonbordercolor, "bbbbbb"));
            g.symbolStroke = F(q(b.toolbarsymbolbordercolor, "9a9a9a"));
            g.strokeWidth = h(b.toolbarbuttonborderthickness, 1);
            g.symbolStrokeWidth = h(b.toolbarsymbolborderthickness,
                1);
            d = g.symbolPadding = h(b.toolbarsymbolpadding, 5);
            g.symbolHPadding = h(b.toolbarsymbolhpadding, d);
            g.symbolVPadding = h(b.toolbarsymbolvpadding, d);
            g = c.position = q(b.toolbarposition, "tr").toLowerCase();
            switch (g) {
                case "tr":
                case "tl":
                case "br":
                case "bl":
                    break;
                default:
                    g = "tr"
            }
            d = c.hAlign = "left" === (O + b.toolbarhalign).toLowerCase() ? "l" : g.charAt(1);
            g = c.vAlign = "bottom" === (O + b.toolbarvalign).toLowerCase() ? "b" : g.charAt(0);
            c.hDirection = h(b.toolbarhdirection, "r" === d ? -1 : 1);
            c.vDirection = h(b.toolbarvdirection, "b" === g ? -1 :
                1);
            c.vMargin = h(b.toolbarvmargin, 6);
            c.hMargin = h(b.toolbarhmargin, 10);
            c.x = h(b.toolbarx, "l" === d ? 0 : a);
            c.y = h(b.toolbary, "t" === g ? 0 : e);
            na.console && na.console.log && na.FC_DEV_ENVIRONMENT && console.log(n);
            h(b.showrtmenuitem, 0) ? (n.callbacks || (n.callbacks = [])).push(this.drawRTMenuButtons) : t.useMessageLog && t.alwaysShowMessageLogMenu && t.messageGoesToLog && (n.callbacks || (n.callbacks = [])).push(this.drawMLMenuButtons);
            k && m && (this.hcJSON.alerts = this.parseAlertObj(m));
            return n
        },
        parseAlertObj: function () {
            return kb.parseAlertObj.apply(this,
                arguments)
        },
        drawMLMenuButtons: function () {
            var a = this.options,
                e = a.chart,
                c = this.menu || (this.menu = []),
                d = this.toolbar,
                a = a[P],
                b;
            c.push(b = va({
                chart: this,
                basicStyle: a && a.outCanvasStyle || this.outCanvasStyle || {},
                items: [{
                    text: "Show Log",
                    visibility: "hidden",
                    onclick: function () {
                        A && A.messageLogger && A.messageLogger.open();
                        b.showItem(4);
                        b.hideItem(3)
                    }
                }, {
                    text: "Hide Log",
                    visibility: "hidden",
                    onclick: function () {
                        A && A.messageLogger && A.messageLogger.close();
                        b.showItem(3);
                        b.hideItem(4)
                    }
                }],
                position: {
                    x: e.spacingLeft,
                    y: this.chartHeight -
                        e.spacingBottom + (e.showFormBtn || e.showRestoreBtn ? 10 : -15)
                }
            }));
            b.hideItem(1);
            this.elements.configureButton = d.add("loggerIcon", function (a, c) {
                return function () {
                    b.visible ? b.hide() : b.show({
                        x: a,
                        y: c + 1
                    })
                }
            }(), {
                x: e.spacingLeft,
                y: this.chartHeight - e.spacingBottom + (e.showFormBtn || e.showRestoreBtn ? 10 : -15),
                tooltip: "Show & Hide Message"
            })
        },
        drawRTMenuButtons: function () {
            var a = this.logic,
                e = a.chartInstance,
                c = this.options,
                d = c.chart,
                b = d && d.alwaysShowMessageLogMenu,
                f = this.menu || (this.menu = []),
                k = this.toolbar,
                c = (c = c[P]) &&
                c.outCanvasStyle || this.outCanvasStyle || {},
                g, a = (a = e.isUpdateActive || a.eiMethods.isUpdateActive) && a.call(e);
            f.push(g = va({
                chart: this,
                basicStyle: c,
                items: [{
                    text: "Stop Update",
                    visibility: a ? xb : "hidden",
                    onclick: function () {
                        g.hideItem(0);
                        g.showItem(1);
                        e.stopUpdate()
                    }
                }, {
                    text: "Start Update",
                    visibility: a ? "hidden" : xb,
                    onclick: function () {
                        g.hideItem(1);
                        g.showItem(0);
                        e.restartUpdate()
                    }
                }, {
                    text: "Clear Chart",
                    onclick: function () {
                        e.clearChart()
                    }
                }, {
                    text: "Show Log",
                    visibility: "hidden",
                    onclick: function () {
                        A && A.messageLogger &&
                            A.messageLogger.open();
                        g.showItem(4);
                        g.hideItem(3)
                    }
                }, {
                    text: "Hide Log",
                    visibility: "hidden",
                    onclick: function () {
                        A && A.messageLogger && A.messageLogger.close();
                        g.showItem(3);
                        g.hideItem(4)
                    }
                }],
                position: {
                    x: d.spacingLeft,
                    y: this.chartHeight - d.spacingBottom + (d.showFormBtn || d.showRestoreBtn ? 10 : -15)
                }
            }));
            g.hideItem(2);
            g.hideItem(0);
            g.hideItem(1);
            g.showItem(a ? 0 : 1);
            !b && g.hideItem(3);
            g.hideItem(4);
            this.elements.configureButton = k.add("configureIcon", function (a, b) {
                return function () {
                    g.visible ? g.hide() : g.show({
                        x: a,
                        y: b +
                            1
                    })
                }
            }(), {
                x: d.spacingLeft,
                y: this.chartHeight - d.spacingBottom + (d.showFormBtn || d.showRestoreBtn ? 10 : -15),
                tooltip: "Manage RealTime Update"
            })
        },
        latestDataUpdater: function (a) {
            var e = this.chartInstance;
            a = (a = a.series && a.series) && a[0] && a[0].data;
            var c, d, b;
            if ((e = e && e.jsVars && e.jsVars._rtLastUpdatedData) && a)
                for (c = 0, d = e.values && e.values.length; c < d; c += 1)
                    if (b = a[c]) b.y = e.values[c], b.displayValue = e.labels[c], b.toolText = e.toolTexts[c]
        },
        styleApplicationDefinition_font: function (a, e, c) {
            var d, b = !1,
                f, k, g, p = this.styleMapForFont;
            switch (e) {
                case "caption":
                    a = a.title;
                    break;
                case "datalabels":
                    a = a.plotOptions.series.dataLabels;
                    break;
                case "value":
                    a = a.plotOptions.series.dataLabels;
                    break;
                case "datavalues":
                    a = a.plotOptions.series.dataLabels;
                    b = !0;
                    break;
                case "subcaption":
                    a = a.subtitle;
                    break;
                case "tooltip":
                    a = a.tooltip;
                    break;
                case "trendvalues":
                    a = a.chart.trendPointStyle;
                    break;
                case "xaxisname":
                    a = a.xAxis.title;
                    break;
                case "vlinelabels":
                    a = {
                        style: a[P].divlineStyle
                    };
                    break;
                case "gaugelabels":
                    a = a.chart.colorRangeStyle;
                    break;
                case "tickvalues":
                    a = a.scale.tickValues;
                    break;
                case "limitvalues":
                    a = a.scale.limitValues;
                    break;
                case "openvalue":
                    a = a.chart.openValue;
                    break;
                case "closevalue":
                    a = a.chart.closeValue;
                    break;
                case "highlowvalue":
                    a = a.chart.highLowValue;
                    break;
                case "legend":
                    a = {
                        style: a.legend.itemStyle
                    };
                    break;
                default:
                    a.orphanStyles[e] = a = {
                        text: "",
                        style: {}
                    }
            }
            if ("object" === typeof a)
                if (a instanceof Array)
                    for (f = 0, k = a.length; f < k; f += 1) {
                        g = a[f];
                        for (d in c)
                            if (e = d.toLowerCase(), "function" === typeof p[e]) p[e](c[d], g, b);
                        Ga(g.style)
                    } else {
                        for (d in c)
                            if (e = d.toLowerCase(), "function" ===
                                typeof p[e]) p[e](c[d], a, b);
                        Ga(a.style)
                    }
        },
        createGaugeAxis: function (a, e, c) {
            a = a.chart;
            var d = this.colorManager,
                b = this.numberFormatter,
                f = this.isHorizontal ? h(a.ticksbelowgauge, a.ticksbelowgraph, this.ticksbelowgauge, 1) ? 3 : 1 : h(a.ticksonright, this.ticksOnRight, 1) ? 2 : 4,
                d = q(a.majortmcolor, d.getColor("tickColor")),
                k = h(a.majortmalpha, 100),
                g = h(h(a.majortmheight) * this.scaleFactor, this.majorTMHeight, 6),
                p = h(a.tickvaluestep, a.tickvaluesstep, 1),
                m = h(a.showtickmarks, 1),
                l = m ? h(a.connecttickmarks, this.connectTickMarks, 1) :
                0,
                n = h(a.showtickvalues, m),
                s = h(a.majortmthickness, 1),
                r = h(b.getCleanValue(a.upperlimit)),
                b = h(b.getCleanValue(a.lowerlimit)),
                t = 1 == h(a.reversescale, 0);
            this.isHorizontal || (t = !t);
            p = 1 > p ? 1 : p;
            e.scale = {
                min: null,
                max: null,
                axisPosition: f,
                showTickMarks: m,
                showTickValues: n,
                showLimits: h(a.showlimits, n),
                adjustTM: Boolean(h(a.adjusttm, 1)),
                majorTMNumber: h(a.majortmnumber, -1),
                majorTMColor: F(d, k),
                majorTMHeight: m ? g : 0,
                majorTMThickness: s,
                minorTMNumber: h(a.minortmnumber, this.minorTMNumber, 4),
                minorTMColor: F(q(a.minortmcolor,
                    d), h(a.minortmalpha, k)),
                minorTMHeight: m ? h(h(a.minortmheight, a.minortmwidth) * this.scaleFactor, ra(g / 2)) : 0,
                minorTMThickness: h(a.minortmthickness, 1),
                tickMarkDistance: h(h(a.tickmarkdistance, a.tickmarkgap) * this.scaleFactor, this.tickMarkDistance, 3),
                tickValueDistance: h(h(a.tickvaluedistance, a.displayvaluedistance) * this.scaleFactor, 2) + 2,
                placeTicksInside: h(a.placeticksinside, 0),
                placeValuesInside: h(a.placevaluesinside, 0),
                tickValueStep: p,
                setAdaptiveMin: h(a.setadaptivemin, 0),
                upperLimit: r,
                lowerLimit: b,
                upperLimitDisplay: G(a.upperlimitdisplay),
                lowerLimitDisplay: G(a.lowerlimitdisplay),
                reverseScale: t,
                connectorColor: F(q(a.connectorcolor, d), h(a.connectoralpha, k)),
                connectorThickness: l ? h(a.connectorthickness, s) : 0,
                majorTM: [],
                minorTM: [],
                trendPoint: [],
                labels: {
                    style: V({}, c)
                },
                tickValues: {
                    style: V({}, c)
                },
                limitValues: {
                    style: V({}, c)
                }
            }
        },
        configureAxis: function (a, e) {
            var c = e.chart,
                d, b, f, k, g = this.colorManager,
                p, m, l, n, s, r = this.colorRangeGetter,
                t = (r = r && r.colorArr) && r.length;
            b = r && r[0];
            d = r && r[t - 1];
            k = this.minDataValue;
            m = this.maxDataValue;
            r = a.scale;
            l = r.lowerLimit;
            n = r.upperLimit;
            var t = this.numberFormatter,
                u;
            if (a.series[0] && (ia(k) && ia(m) ? (l = l <= k ? l : b && b.minvalue, n = n >= m ? n : d && d.maxvalue) : (l = h(l, b && b.minvalue), n = h(n, d && d.maxvalue)), d = new Hb(l, n, !1, r, this.numberFormatter), d.calculateLimits(this.maxDataValue, this.minDataValue), d.calculateTicks(), r.majorTM = d.getMajorTM(), r.minorTM = d.getMinorTM(), b = r.min = d.min, d = r.max = d.max, e.trendpoints && (f = e.trendpoints.point) && 0 < (p = f.length))) {
                r.trendPoint = [];
                for (m = 0; m < p; m += 1) k = f[m], s = h(k.dashed, 0) ? fa(q(Math.max(k.dashlen, k.thickness),
                    4), h(k.dashgap, 3), h(k.thickness, 1)) : "none", l = h(k.startvalue, k.value), n = h(k.endvalue, l), u = l !== n, l <= d && l >= b && n <= d && n >= b && (r.trendPoint.push({
                    style: V(V(a.chart.trendPointStyle.style), {}),
                    startValue: l,
                    endValue: n,
                    tooltext: G($(k.markertooltext)),
                    displayValue: G($(k.displayvalue), u ? O : t.scale(l)),
                    showOnTop: h(k.showontop, c.ticksbelowgauge, c.ticksbelowgraph, 1),
                    color: q(k.color, g.getColor("trendLightColor")),
                    alpha: h(k.alpha, 99),
                    thickness: h(k.thickness, 1),
                    dashStyle: s,
                    useMarker: h(k.usemarker, 0),
                    markerColor: F(q(k.markercolor,
                        k.color, g.getColor("trendLightColor")), 100),
                    markerBorderColor: F(q(k.markerbordercolor, k.bordercolor, g.getColor("trendDarkColor")), 100),
                    markerRadius: h(h(k.markerradius) * this.scaleFactor, 5),
                    markerToolText: qa(k.markertooltext),
                    trendValueDistance: h(h(k.trendvaluedistance, c.trendvaluedistance) * this.scaleFactor, r.tickValueDistance),
                    isZone: u,
                    valueInside: h(k.valueinside, c.placevaluesinside, 0),
                    showBorder: h(k.showborder, 1),
                    borderColor: F(q(k.bordercolor, k.color, g.getColor("trendDarkColor")), h(k.borderalpha,
                        k.alpha, 100)),
                    radius: h(h(k.radius) * this.scaleFactor),
                    innerRadius: h(h(k.innerradius) * this.scaleFactor)
                }), ua(q(k.bordercolor, k.color, g.getColor("trendDarkColor"))));
                "lineargauge" === this.defaultSeriesType && A.stableSort && A.stableSort(r.trendPoint, function (a, b) {
                    return a.startValue - b.startValue
                })
            }
        },
        placeTickMark: function (a, e, c) {
            var d = this.smartLabel,
                b = a.chart,
                f = this.width - (b.marginRight + b.marginLeft),
                k = this.height - (b.marginTop + b.marginBottom);
            a = a.scale;
            var g = a.min,
                p = a.max,
                m = a.axisPosition,
                l = a.showLimits,
                n = a.showTickValues,
                s = a.tickMarkDistance,
                r = a.tickValueDistance,
                t = Math.max(a.majorTMHeight, a.minorTMHeight),
                u = a.placeTicksInside,
                B = a.placeValuesInside,
                L = a.reverseScale,
                w = 0,
                q = 0,
                x = 1,
                y, D = a.majorTM.length - 1,
                C = 2 === m || 4 === m ? !1 : !0,
                E = 6;
            e = C ? k - c : f - e;
            c = 0;
            var U = a.tickValues.style,
                K = a.limitValues.style;
            a.majorTM[0] && a.majorTM[1] && (y = a.majorTM[1].value - a.majorTM[0].value);
            u || (w += s + t);
            if (n || l)
                for (d.setStyle(K), l = h(parseInt(K.fontSize, 10), 10), n = h(parseInt(K.lineHeight, 10), 12), n /= 2, B || (w += r), 3 === m && (q = l), C ? (k = e - w, f =
                        f / (p - g) * y / 2 + 6) : (f = e - w, k = k / (p - g) * y + n), a.majorTM[0] && (y = a.majorTM[0], y.isString ? y.displayValue && (g = d.getSmartText(y.displayValue, f, k), y.displayValue = g.text, y._oriText = g.oriText, g.tooltext && (y.originalText = g.tooltext), C ? (c = Math.max(c, g.height), y.labelY = 1 === m && !B || 3 === m && B ? l - g.height : q, E = Math.min(6, g.width / 2)) : (c = Math.max(c, g.width), y.labelY = l - (L ? g.height - n : n), y.labelX = 0)) : x = 0, C && (L ? (y.labelX = E, y.align = bb) : (y.labelX = -E, y.align = Ia))), a.majorTM[D] && (y = a.majorTM[D], y.isString ? y.displayValue && (g = d.getSmartText(y.displayValue,
                        f, k), y.displayValue = g.text, y._oriText = g.oriText, g.tooltext && (y.originalText = g.tooltext), C ? (c = Math.max(c, g.height), y.labelY = 1 === m && !B || 3 === m && B ? l - g.height : q, E = Math.min(6, g.width / 2)) : (c = Math.max(c, g.width), y.labelY = l - (L ? n : g.height - n), y.labelX = 0)) : (E = 6, D += 1), C && (L ? (y.labelX = -E, y.align = Ia) : (y.labelX = E, y.align = bb))); x < D; x++) 0 === x || x === D - 1 ? (d.setStyle(K), l = h(parseInt(K.fontSize, 10), 10), n = h(parseInt(K.lineHeight, 10), 12)) : (d.setStyle(U), l = h(parseInt(U.fontSize, 10), 10), n = h(parseInt(U.lineHeight, 10), 12)), C &&
                    (q = 1 === m && B || 3 === m && !B ? l : 0), y = a.majorTM[x], y.displayValue && (y.labelX = h(y.labelX, 0), C ? (c = Math.max(c, n), y.labelY = q) : (g = d.getOriSize(y.displayValue), c = Math.max(c, g.width), y.labelY = l - g.height / 2));
            d = w;
            B || (w += c);
            w = Math.min(e, w);
            a._labelUsedSpace = B ? c : w - d;
            switch (m) {
                case 1:
                    b.marginTop += w;
                    break;
                case 2:
                    b.marginRight += w;
                    break;
                case 3:
                    b.marginBottom += w;
                    break;
                case 4:
                    b.marginLeft += w
            }
            return w
        },
        eiMethods: {
            feedData: function (a) {
                var e = this.jsVars,
                    c = e.hcObj,
                    d = c.logic,
                    b = c.options && c.options.series && c.options.series[0],
                    f, k;
                if (this.isActive() && d && d.linearDataParser && (k = d.linearDataParser(a, d.multisetRealtime))) {
                    f = this.getDataJSON();
                    c.realtimeUpdate ? c.realtimeUpdate(k) : c.logic.realtimeUpdate ? c.logic.realtimeUpdate(k) : b && b.realtimeUpdate && b.realtimeUpdate(k);
                    e._rtLastUpdatedData = d.multisetRealtime ? k : this.getDataJSON();
                    da.raiseEvent("realtimeUpdateComplete", {
                        data: a,
                        updateObject: k,
                        prevData: f.values,
                        source: "feedData",
                        url: null
                    }, e.fcObj);
                    try {
                        na.FC_ChartUpdated && na.FC_ChartUpdated(e.fcObj.id)
                    } catch (g) {
                        setTimeout(function () {
                            throw g;
                        }, 0)
                    }
                    return !0
                }
                return !1
            },
            getData: function () {
                var a, e = (a = this.jsVars) && (a = a.hcObj) && (a = a.options) && (a = a.series) && (a = a[0]) && a.data;
                return (a = e && e[0]) ? h(a.value, a.y) : null
            },
            setData: function (a, e) {
                var c = "";
                if (a && a.toString || "" === a || 0 === a) c = "value=" + a.toString();
                if (e && e.toString || "" === e) c = c + "&label=" + e.toString();
                c && this.feedData(c)
            },
            stopUpdate: function (a) {
                var e = this.__state;
                clearTimeout(e._toRealtime);
                e._rtAjaxObj && e._rtAjaxObj.abort();
                e._rtPaused = !0;
                da.raiseEvent("realimeUpdateStopped", {
                    source: a
                }, this)
            },
            restartUpdate: function () {
                var a = this.__state;
                a._rtDataUrl && a._rtPaused && (a._rtPaused = !1, a._rtAjaxObj.get(a._rtDataUrl))
            },
            isUpdateActive: function () {
                return !this.__state._rtPaused
            },
            clearChart: function (a) {
                var e = this.jsVars,
                    c;
                a = a && a.toString && a.toString();
                (c = e.hcObj) && (c = c.options) && (c = c.scale) && (e = c.min, isNaN(e) || (this.jsVars.hcObj.fusionCharts.feedData("&showLabel=0&value=" + e), A.raiseEvent("chartCleared", {
                    source: a
                }, this, [this.id, a])))
            },
            getDataJSON: function () {
                var a = 0,
                    e, c, d = [],
                    b = [],
                    f = [],
                    k = (e = this.jsVars) &&
                    (e = e.hcObj) && (e = e.options) && (e = e.series) && (e = e[0]) && e.data;
                for (e = k && k.length ? k.length : 0; a < e; a += 1) c = k[a], d.push(h(c.value, c.y)), b.push(c.displayValue || ""), f.push(c.toolText || "");
                return {
                    values: d,
                    labels: b,
                    toolTexts: f
                }
            },
            showLog: function () {
                return this.feedData("showLog=1")
            },
            hideLog: function () {
                return this.feedData("hideLog=1")
            },
            clearLog: function () {
                return this.feedData("clearLog=1")
            }
        },
        linearDataParser: function (a, e) {
            var c = {
                    values: v,
                    colors: v,
                    toolTexts: v,
                    links: function (a) {
                        var b = [],
                            c;
                        a = a.replace(Ub, "_fc_escaped_comma_");
                        b = a.split(",");
                        a = 0;
                        for (c = b.length; a < c; a += 1) b[a] = b[a].replace(/_fc_escaped_comma_/ig, ",");
                        return b
                    },
                    valueVisibility: v
                },
                d = this.chartInstance,
                b, f, k, g, p, m = {},
                l = 0;
            a = a && a.toString && a.toString() || "";
            b = a.split("&");
            g = 0;
            for (p = b.length; g < p; g += 1)
                if (f = b[g].split("="), k = f[1], f = f[0], f !== O && void 0 !== f && void 0 !== k && (k !== O || e)) switch (f = f.toLowerCase(), f) {
                    case "label":
                        m.labels = k.split(",");
                        break;
                    case "vline":
                        m.vlines = k.split(",");
                        break;
                    case "vlinelabel":
                        m.vlineLabels = k.split(",");
                        break;
                    case "vlinecolor":
                        m.vlineColors =
                            k.split(",");
                        break;
                    case "vlinethickness":
                        m.vlineThickness = k.split(",");
                        break;
                    case "vlinedashed":
                        m.vlineDashed = k.split(",");
                        break;
                    case "value":
                        m.values = k.split("|");
                        l = 1;
                        break;
                    case "showlabel":
                        m.showLabels = k.split(",");
                        break;
                    case "showvalue":
                        m.valueVisibility = k.split("|");
                        break;
                    case "tooltext":
                        m.toolTexts = k.split("|");
                        break;
                    case "link":
                        m.links = k.split("|");
                        break;
                    case "color":
                        m.colors = k.split("|");
                        break;
                    case "datastamp":
                        m.dataStamp = k;
                        break;
                    case "stopupdate":
                        m.pause = "1" == k;
                        break;
                    case "clear":
                        m.clear =
                            "1" == k;
                        break;
                    default:
                        m[f] = k
                }
            if (e)
                for (m.values || (m.values = []), g = m.values.length; g--;) {
                    for (f in c) m[f] ? "function" === typeof c[f] ? m[f][g] && (m[f][g] = c[f].call(this, m[f][g])) : m[f][g] && (m[f][g] = m[f][g].split(c[f])) : m[f] = [];
                    l = Aa(m.values[g].length, l)
                }
            m.labels && (l = Aa(l, m.labels.length));
            m.dimension = l;
            m.pause && d.stopUpdate && d.stopUpdate("datastream");
            return m
        },
        series: function () {
            var a = this.dataObj,
                e = this.hcJSON,
                c = a.pointers && a.pointers.pointer || a.value,
                d = a.chart,
                b = this.colorRangeGetter,
                f = (b = b && b.colorArr) &&
                b.length,
                k = {},
                g = k.data = [],
                p, m;
            e.legend.enabled = !1;
            Yb(c) || (c = "object" !== typeof c ? [{
                value: c
            }] : [c]);
            p = 0;
            for (m = this.multiValueGauge ? c.length : 1; p < m; p++) g.push(this.getPointStub(c[p], p, e, a));
            e.series[0] = k;
            f && this.pointValueWatcher && h(d.includecolorrangeinlimits, this.includeColorRangeInLimits) && (a = h(b[0].minvalue), ia(a) && this.pointValueWatcher(a), a = h(b[f - 1].maxvalue), ia(a) && this.pointValueWatcher(a))
        },
        pointValueWatcher: function (a) {
            null !== a && (this.maxDataValue = this.maxDataValue > a ? this.maxDataValue : a, this.minDataValue =
                this.minDataValue < a ? this.minDataValue : a)
        },
        updateSnapPoints: function (a) {
            var e = a.chart,
                c = this.width,
                d = this.height,
                b = e.marginBottom;
            a = e.marginLeft;
            var f = e.marginRight,
                e = e.marginTop,
                c = Ea(this.snapLiterals || (this.snapLiterals = {}), {
                    chartstartx: 0,
                    chartstarty: 0,
                    chartwidth: c,
                    chartheight: d,
                    chartendx: c,
                    chartendy: d,
                    chartcenterx: c / 2,
                    chartcentery: d / 2,
                    chartbottommargin: b,
                    chartleftmargin: a,
                    chartrightmargin: f,
                    charttopmargin: e,
                    canvasstartx: a,
                    canvasstarty: e,
                    canvaswidth: c - a - f,
                    canvasheight: d - e - b,
                    canvasendx: c - f,
                    canvasendy: d -
                        b
                });
            c.gaugestartx = c.canvasstartx;
            c.gaugestarty = c.canvasstarty;
            c.gaugeendx = c.canvasendx;
            c.gaugeendy = c.canvasendy;
            c.gaugecenterx = c.canvascenterx = a + c.canvaswidth / 2;
            c.gaugecentery = c.canvascentery = e + c.canvasheight / 2
        }
    }, z.base);
    z("linearscalegauge", {
        spaceManager: function (a, e, c, d) {
            var b = a.chart,
                f = c - (b.marginRight + b.marginLeft),
                k = d - (b.marginTop + b.marginBottom),
                g = b.marginRight,
                p = b.marginLeft,
                m = b.marginTop,
                l = b.marginBottom,
                n = Ka(Aa(.3 * f, 5), f),
                h = Ka(Aa(.3 * k, 5), k),
                r, t, u = 0,
                B;
            5 > n && 10 < c && (n = f = 5, B = g + p, g = b.marginRight =
                (c - f) * g / B, p = b.marginLeft = (c - f) * p / B);
            5 > h && 10 < d && (h = k = 5, B = m + l, m = b.marginRight = (d - k) * m / B, l = b.marginLeft = (d - k) * l / B);
            this.manageTitleSpace && a.title.alignCaptionWithCanvas && (t = this.manageTitleSpace(a, e, n, h));
            this.placeTickMark && (r = this.placeTickMark(a, n, h));
            this.manageTitleSpace && !a.title.alignCaptionWithCanvas && (t = this.manageTitleSpace(a, e, n, h));
            this.placeDataLabels && (u = this.placeDataLabels(a, n, h, m, g, l, p, r));
            this.postDataLabelsPlacement && this.postDataLabelsPlacement(a, n, h);
            this.fixCaptionAlignment && this.fixCaptionAlignment(t,
                a, e, c, 0, u)
        },
        manageTitleSpace: function (a, e, c, d) {
            c = a.chart;
            return this.titleSpaceManager(a, e, this.width - (c.marginRight + c.marginLeft), this.height - (c.marginTop + c.marginBottom) - d)
        },
        placeDataLabels: function (a, e, c, d, b, f) {
            var k = this.smartLabel;
            e = a.chart;
            var g = this.width - (e.marginRight + e.marginLeft),
                p = this.height - (e.marginTop + e.marginBottom);
            d = e.marginBottom;
            b = a.plotOptions.series.dataLabels;
            var m = b.style,
                l = h(parseInt(m.lineHeight, 10), 12);
            c = p - c;
            var p = e.valuePadding,
                n = 0;
            (a = a.series[0].data[0]) && a.displayValue !==
                O && (k.setStyle(m), a.isLabelString ? (k = k.getSmartText(a.displayValue, g, c - p), a.displayValue = k.text, k.tooltext && (a.originalText = k.tooltext)) : k = k.getOriSize(a.displayValue), " " === a.displayValue && (k = {
                    height: l
                }), 0 < k.height && (n = k.height + p), n > c && (a = n - c, p = a < p ? p - a : 0, n = c), e.marginBottom += n, b.align = La, e.valuePadding = d - f + p);
            return n
        },
        postDataLabelsPlacement: function (a) {
            var e = this.smartLabel,
                c = a.chart,
                d = this.width - (c.marginRight + c.marginLeft),
                b = this.height - (c.marginTop + c.marginBottom);
            a = a.scale;
            var f = a.min,
                k = a.max,
                g = a.axisPosition,
                p = a.limitValues.style,
                c = a.reverseScale,
                m, l = a.majorTM.length - 1,
                g = 2 === g || 4 === g ? !1 : !0,
                n = h(parseInt(p.fontSize, 10), 10),
                s = h(parseInt(p.lineHeight, 10), 12) / 2;
            a.majorTM[0] && a.majorTM[1] && (m = a.majorTM[1].value - a.majorTM[0].value);
            g ? (b = a._labelUsedSpace, d = d / (k - f) * m / 2 + 6) : (d = a._labelUsedSpace, b = b / (k - f) * m + s);
            e.setStyle(p);
            a.majorTM[0] && a.majorTM[0].isString && (m = a.majorTM[0], m.displayValue && (f = e.getSmartText(m._oriText, d, b), m.displayValue = f.text, f.tooltext && (m.originalText = f.tooltext), g ? (f = Math.min(6,
                f.width / 2), m.labelX = c ? f : -f) : m.labelY = n - (c ? f.height - s : s)));
            a.majorTM[l] && a.majorTM[l].isString && (m = a.majorTM[l], m.displayValue && (f = e.getSmartText(m._oriText, d, b), m.displayValue = f.text, f.tooltext && (m.originalText = f.tooltext), g ? (f = Math.min(6, f.width / 2), m.labelX = c ? -f : f) : m.labelY = n - (c ? s : f.height - s)))
        },
        getPointStub: function (a, e, c, d, b) {
            var f = c[P];
            e = this.colorManager;
            var k = this.numberFormatter;
            c = k.getCleanValue(a.value);
            var g = G(a.link),
                p = G($(q(a.tooltext, f.tooltext))),
                f = G($(a.displayvalue)),
                m = k.dataLabels(c),
                l, k = d.chart;
            d = h(k.showhovereffect);
            var n, s, r;
            this.showTooltip ? void 0 !== p ? (b = Ya(p, [1, 2], {
                formattedValue: m
            }, a, k), r = !0) : b = null === m ? !1 : void 0 !== b ? b + this.tooltipSepChar + m : m : b = !1;
            a = h(a.showvalue, this.showValues) ? void 0 !== f ? f : G(m, " ") : O;
            this.pointValueWatcher && this.pointValueWatcher(c);
            this.getPointColorObj && (l = this.getPointColorObj(k, c));
            0 !== d && (d || k.gaugefillhovercolor || k.plotfillhovercolor || k.gaugefillhoveralpha || k.plotfillhoveralpha || 0 === k.gaugefillhoveralpha) && (d = !0, f = q(k.gaugefillhovercolor, k.plotfillhovercolor,
                "{dark-10}"), k = h(k.gaugefillhoveralpha, k.plotfillhoveralpha), n = {}, s = {}, s.fluidColor = l.code, s.fluidAlpha = l.alpha, f = (p = /\{/.test(f)) ? e.parseColorMix(G(l.code, O), f)[0] : f, n.fluidColor = f, n.fluidAlpha = h(k, l.alpha));
            return {
                y: c,
                displayValue: a,
                toolText: b,
                isLabelString: r,
                color: F(l.code, l.alpha),
                link: g,
                colorRange: l,
                doNotSlice: !0,
                rolloverProperties: {
                    enabled: d,
                    hoverAttr: n,
                    outAttr: s
                }
            }
        },
        getPointColorObj: function (a, e) {
            return this.colorRangeGetter.getColorObj(e)
        }
    }, z.gaugebase);
    z("led", {
        singleValued: !0,
        isDataLabelBold: !0,
        preSeriesAddition: function (a, e) {
            var c = e.chart,
                d = a.chart;
            d.ledGap = h(c.ledgap, 2);
            d.ledSize = h(c.ledsize, 2);
            d.plotHoverEffect = h(c.showhovereffect, 0)
        }
    }, z.linearscalegauge);
    z("vled", {
        friendlyName: "Vertical LED Gauge",
        defaultSeriesType: "led",
        defaultPlotShadow: 1,
        standaloneInit: !0,
        realtimeEnabled: !0,
        chartleftmargin: 15,
        chartrightmargin: 15,
        charttopmargin: 10,
        chartbottommargin: 10,
        showTooltip: 0,
        connectTickMarks: 0,
        rendererId: "led",
        creditLabel: ja
    }, z.led);
    z("hled", {
        friendlyName: "Horizontal LED Gauge",
        defaultPlotShadow: 1,
        standaloneInit: !0,
        creditLabel: ja,
        isHorizontal: !0,
        rendererId: "led",
        connectTickMarks: 1,
        realtimeEnabled: !0
    }, z.vled);
    z("bullet", {
        creditLabel: ja,
        defaultSeriesType: "bullet",
        defaultPlotShadow: 1,
        drawAnnotations: !0,
        realtimeEnabled: !1,
        subTitleFontSizeExtender: 0,
        subTitleFontWeight: 0,
        connectTickMarks: 0,
        minorTMNumber: 0,
        majorTMHeight: 4,
        chartleftmargin: 10,
        chartrightmargin: 15,
        charttopmargin: 5,
        chartbottommargin: 5,
        isDataLabelBold: !0,
        defaultPaletteOptions: Ea(V({}, wa), {
            paletteColors: [["A6A6A6", "CCCCCC", "E1E1E1", "F0F0F0"],
["A7AA95", "C4C6B7", "DEDFD7", "F2F2EE"], ["04C2E3", "66E7FD", "9CEFFE", "CEF8FF"], ["FA9101", "FEB654", "FED7A0", "FFEDD5"], ["FF2B60", "FF6C92", "FFB9CB", "FFE8EE"]],
            bgColor: ["FFFFFF", "CFD4BE,F3F5DD", "C5DADD,EDFBFE", "A86402,FDC16D", "FF7CA0,FFD1DD"],
            bgAngle: [270, 270, 270, 270, 270],
            bgRatio: ["0,100", "0,100", "0,100", "0,100", "0,100"],
            bgAlpha: ["100", "60,50", "40,20", "20,10", "30,30"],
            toolTipBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
            toolTipBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
            baseFontColor: ["333333",
"60634E", "025B6A", "A15E01", "68001B"],
            tickColor: ["333333", "60634E", "025B6A", "A15E01", "68001B"],
            trendColor: ["545454", "60634E", "415D6F", "845001", "68001B"],
            plotFillColor: ["545454", "60634E", "415D6F", "845001", "68001B"],
            borderColor: ["767575", "545454", "415D6F", "845001", "68001B"],
            borderAlpha: [50, 50, 50, 50, 50]
        }),
        preSeriesAddition: function () {
            var a = this.dataObj.chart;
            this.hcJSON.chart.colorRangeBorderThickness = h(a.showgaugeborder, a.showcolorrangeborder, 0) ? h(a.colorrangeborderthickness, a.gaugeborderthickness, this.gaugeBorderThickness,
                2) : 0
        },
        postSeriesAddition: function (a) {
            var e = this.dataObj,
                c = this.colorManager,
                d = a.series[0],
                b = e.chart,
                f = h(b.showhovereffect),
                k = {
                    value: e.target
                },
                g = h(b.targetthickness, 3),
                p = q(b.targetcolor, c.getColor("plotFillColor")),
                m = G(b.targetalpha, 100),
                l = F(p, m),
                n = h(b.targetfillpercent, 60),
                s, r, t, u;
            0 !== f && (f || b.targethovercolor || b.targethoveralpha || 0 === b.targethoveralpha || b.targethoverthickness || 0 === b.targethoverthickness) && (f = !0, t = {}, u = {}, r = h(b.targethoverthickness, g + 2), g !== r && (t["stroke-width"] = r, u["stroke-width"] =
                g), s = q(b.targethovercolor, "{dark-10}"), m = h(b.targethoveralpha, m), r && (u.stroke = l, r = /\{/.test(s), t.stroke = F(r ? c.parseColorMix(p, s)[0] : s, m)), s = !!h(b.showhoveranimation, 1));
            a = this.getPointStub(k, 1, a, e);
            delete a.rolloverProperties;
            d.data.push(V(a, {
                borderColor: l,
                borderWidth: g,
                targetThickness: g,
                targetFillPercent: n,
                rolloverProperties: {
                    enabled: f,
                    hoverAttr: t,
                    outAttr: u,
                    showHoverAnimation: s
                }
            }))
        },
        getPointStub: function (a, e, c, d, b) {
            var f = this.numberFormatter,
                k = this.colorManager,
                g = c[P];
            c = f.getCleanValue(a.value);
            var p = G(a.link),
                m = G($(e ? g.targettooltext : g.tooltext)),
                l = G($(a.displayvalue)),
                n = f.dataLabels(c),
                g = this.colorRangeGetter.getColorObj(c),
                s = d.chart,
                r = e ? f.dataLabels(f.getCleanValue(d.value)) : n,
                t = e ? c : f.getCleanValue(d.target),
                u = e ? n : f.dataLabels(t),
                B = q(s.plotfillcolor, k.getColor("plotFillColor"));
            e = h(s.plotasdot, 0);
            var f = h(s.showhovereffect),
                L = h(s.showplotborder, 0),
                w = L ? h(s.plotborderthickness, 1) : 0,
                T = h(s.plotfillpercent, e ? 25 : 40),
                x, y, D, C;
            d = this.showTooltip ? void 0 !== m ? Ya(m, [1, 2, 26, 27], {
                formattedValue: r,
                targetValue: t,
                targetDataValue: u
            }, d, s) : null === n ? !1 : void 0 !== b ? b + this.tooltipSepChar + n : n : O;
            a = h(a.showvalue, this.showValues) ? void 0 !== l ? l : G(n, " ") : O;
            this.pointValueWatcher && this.pointValueWatcher(c);
            /\{/.test(b = q(s.plotbordercolor, "{dark-20}")) && (y = !0, b = k.parseColorMix(B, b).join());
            r = h(s.plotfillalpha, 100);
            l = F(B, r);
            m = h(s.plotborderalpha, 100);
            n = F(b, m);
            0 !== f && (f || s.plotfillhovercolor || s.plotfillhoveralpha || 0 === s.plotfillhoveralpha || s.showplotborderonhover || 0 === s.showplotborderonhover || s.plotborderhovercolor || s.plotborderhoverthickness ||
                0 === s.plotborderhoverthickness || s.plotborderhoveralpha || 0 === s.plotborderhoveralpha) && (f = !0, D = {}, C = {}, x = q(s.plotfillhovercolor, "{dark-10}"), r = h(s.plotfillhoveralpha, r), x = /\{/.test(x) ? k.parseColorMix(B, x)[0] : x, D.fill = F(x, r), C.fill = l, B = h(s.showplotborderonhover), void 0 === B && (B = s.plotborderhoverthickness || s.plotborderhovercolor || s.plotborderhoveralpha ? 1 : L), B = B ? h(s.plotborderhoverthickness, w || 1) : 0, w !== B && (D["stroke-width"] = B, C["stroke-width"] = w), L = q(s.plotborderhovercolor, "{dark-10}"), m = h(s.plotborderhoveralpha,
                m), B && (C.stroke = n, B = /\{/.test(L), D.stroke = F(B ? k.parseColorMix(y ? x : b, L)[0] : L, m)), x = !!h(s.showhoveranimation, 1));
            return {
                y: c,
                displayValue: a,
                toolText: d,
                plotAsDot: e,
                plotFillPercent: T,
                color: l,
                borderColor: n,
                borderWidth: w,
                link: p,
                colorRange: g,
                doNotSlice: !0,
                rolloverProperties: {
                    enabled: f,
                    hoverAttr: D,
                    outAttr: C,
                    showHoverAnimation: x
                }
            }
        }
    }, z.linearscalegauge);
    z("vbullet", {
            friendlyName: "Vertical Bullet Gauge",
            creditLabel: ja,
            defaultSeriesType: "bullet",
            gaugeType: 4,
            ticksOnRight: 0,
            rendererId: "bullet",
            standaloneInit: !0
        },
        z.bullet);
    z("hbullet", {
        friendlyName: "Horizontal Bullet Gauge",
        creditLabel: ja,
        defaultSeriesType: "hbullet",
        gaugeType: 1,
        standaloneInit: !0,
        isHorizontal: !0,
        defaultCaptionPadding: 5,
        rendererId: "hbullet",
        placeDataLabels: function (a, e) {
            var c = this.smartLabel,
                d = a.chart,
                b = this.width - (d.marginRight + d.marginLeft),
                f = this.height - (d.marginTop + d.marginBottom),
                k = a.plotOptions.series.dataLabels,
                g = k.style,
                p = h(parseInt(g.fontSize, 10), 10),
                b = b - e,
                m = d.valuePadding,
                l = 0,
                n = a.series[0].data[0];
            n && n.displayValue !== O && (c.setStyle(g),
                n.isLabelString ? (c = c.getSmartText(n.displayValue, b - m, f), n.displayValue = c.text, c.tooltext && (n.originalText = c.tooltext)) : c = c.getOriSize(n.displayValue), 0 < c.height && (l = c.width + m), l > b && (l = b), d.marginRight += l, k.align = Ia, k.x = 0, k.y = p - c.height / 2);
            return l
        },
        manageTitleSpace: function (a, e, c) {
            var d = a.chart,
                b = e.chart,
                f = this.width - (d.marginRight + d.marginLeft),
                d = this.height - (d.marginTop + d.marginBottom),
                k = h(b.captionpadding, 2),
                b = h(h(b.captiononright, 0) ? b.canvasrightmargin : b.canvasleftmargin);
            ia(b) && (b -= k);
            c = h(b,
                f - c);
            return Fb(a, e, c, d, this.defaultCaptionPadding, this.width, this.height, this)
        },
        fixCaptionAlignment: function (a, e, c, d, b, f) {
            d = e.chart;
            var k = c.chart,
                g = h(k.canvasleftmargin),
                k = h(k.canvasrightmargin);
            d.marginRight += a.right;
            d.marginLeft += a.left;
            ia(g) && (d.spacingLeft = d.marginLeft = g, d.spacingLeft -= a.left + 0 - 1);
            ia(k) && (d.spacingRight = d.marginRight = k, d.spacingRight -= a.right + 0 - 1);
            Gb(e, c, this.width, b, f, this)
        }
    }, z.bullet);
    z("lineargauge", {
        creditLabel: ja,
        defaultSeriesType: "lineargauge",
        multiValueGauge: !0,
        realtimeEnabled: !0,
        gaugeType: 1,
        chartleftmargin: 15,
        chartrightmargin: 15,
        charttopmargin: 10,
        chartbottommargin: 10,
        colorRangeFillMix: "{light-10},{dark-20},{light-50},{light-85}",
        colorRangeFillRatio: "0,8,84,8",
        isDataLabelBold: !0,
        eiMethods: V(V({}, z.gaugebase.eiMethods), {
            getData: function (a) {
                var e, c = (e = this.jsVars) && (e = e.hcObj) && (e = e.options) && (e = e.series) && (e = e[0]) && e.data;
                e = c && c.length ? c.length : 0;
                return void 0 !== a && 0 < a && a <= e ? (a = c[a - 1], h(a.value, a.y)) : null
            },
            getDataForId: function (a) {
                var e, c = (e = this.jsVars) && (e = e.hcObj) && e.dataById;
                return c[a] && c[a].point ? (a = c[a].point, h(a.value, a.y)) : null
            },
            setData: function (a, e, c) {
                var d = "",
                    b, f = (b = this.jsVars) && (b = b.hcObj) && (b = b.options) && (b = b.series) && (b = b[0]) && b.data;
                b = f && f.length || 0;
                f = 0;
                if (0 < a && a <= b && (e && e.toString() || "" === e || 0 === e)) {
                    for (f = a; --f;) d += "|";
                    a = "value=" + (d + e);
                    if (c && c.toString || "" === c) a += "&label=" + d + c.toString();
                    this.feedData(a)
                }
            },
            setDataForId: function (a, e, c) {
                var d, b = (d = this.jsVars) && (d = d.hcObj) && d.dataById;
                b[a] && void 0 !== b[a].index && this.setData(b[a].index + 1, e, c)
            }
        }),
        placeDataLabels: function (a,
            e, c, d, b, f, k, g) {
            d = a.scale;
            b = this.smartLabel;
            f = a.chart;
            k = this.width - (f.marginRight + f.marginLeft);
            var p = this.height - (f.marginTop + f.marginBottom),
                m, l = a.plotOptions.series.dataLabels;
            m = l.style;
            var n = a.scale && a.scale.labels && a.scale.labels.style,
                s = h(parseInt(m.lineHeight, 10), 12);
            c = p - c;
            e = k - e;
            var r = f.valuePadding,
                t, u = 0,
                B = 0,
                L = 0,
                w = 0,
                q = 0,
                x = 0,
                y = a.series && a.series[0] && a.series[0].data || [];
            a = a.scale && a.scale.trendPoint || [];
            var D = 0,
                C = y.length,
                E;
            for (b.setStyle(m); D < C; D += 1)(E = y[D]) && E.displayValue !== O && (t = r + E.radius *
                (3 >= E.sides ? .5 : E.sides % 2 ? 1.1 - 1 / E.sides : 1), f.valuePadding = Math.max(f.valuePadding, t), this.isHorizontal ? (E.isLabelString ? (m = b.getSmartText(E.displayValue, k, c - r), E.displayValue = m.text, m.tooltext && (E.originalText = m.tooltext)) : m = b.getOriSize(E.displayValue), " " === E.displayValue && (m = {
                    height: s
                }), 0 < m.height && (u = m.height + t), u > c && (u = c), f.pointerOnOpp ? (3 === d.axisPosition && (w = Math.max(g, w), u = Math.max(g, u)), B = Math.max(B, u)) : (1 === d.axisPosition && (q = Math.max(g, q), u = Math.max(g, u)), L = Math.max(u, L))) : (E.isLabelString ?
                    (m = b.getSmartText(E.displayValue, e - r, p), E.displayValue = m.text, m.tooltext && (E.originalText = m.tooltext)) : m = b.getOriSize(E.displayValue), 0 < m.width && (x = m.width + t), x > e && (x = e), f.pointerOnOpp ? 2 === d.axisPosition ? (f.marginRight -= g, f.marginRight += Math.max(g, x)) : f.marginRight += x : 4 === d.axisPosition ? (f.marginLeft -= g, f.marginLeft += Math.max(g, x)) : f.marginLeft += x), l.align = La);
            b.setStyle(n);
            D = 0;
            for (C = a.length; D < C; D += 1)(E = a[D]) && E.displayValue !== O && (t = r + .5 * E.markerRadius, f.valuePadding = Math.max(t, f.valuePadding), this.isHorizontal &&
                (m = b.getOriSize(E.displayValue), 0 < m.height && (u = m.height + t), u > c && (u = c), E.showOnTop ? (1 === d.axisPosition && (q = Math.max(g, q), u = Math.max(g, u)), L = Math.max(L, u)) : (3 === d.axisPosition && (w = Math.max(g, w), u = Math.max(g, u)), B = Math.max(u, B)), l.align = La));
            this.isHorizontal && (f.marginBottom += B - w, f.marginTop += L - q, u = L + B - w - q);
            return u
        },
        preSeriesAddition: function (a, e) {
            var c = a.chart,
                d = e.chart,
                b = this.colorManager,
                f = a.scale;
            c.pointerRadius = h(d.pointerradius, 10);
            c.pointerBgColor = q(d.pointerbgcolor, d.pointercolor, b.getColor("pointerBgColor"));
            c.pointerBgAlpha = h(d.pointerbgalpha, 100);
            c.pointerBorderColor = q(d.pointerbordercolor, b.getColor("pointerBorderColor"));
            c.pointerBorderThickness = h(d.pointerborderthickness, 1);
            c.pointerBorderAlpha = h(d.pointerborderalpha, 100);
            c.pointerSides = h(d.pointersides, 3);
            c.showGaugeLabels = h(d.showgaugelabels, 1);
            c.showPointerShadow = h(d.showpointershadow, d.showshadow, 1);
            c.valuePadding = h(d.valuepadding, 2);
            this.isHorizontal ? (c.pointerOnOpp = h(d.pointerontop, 1 == f.axisPosition ? 0 : 1) ? 0 : 1, c.gaugeType = f.reverseScale ? 2 : 1,
                c.valueAbovePointer = h(d.valueabovepointer, c.pointerOnOpp ? 0 : 1, 1), c.valueInsideGauge = c.valueAbovePointer === c.pointerOnOpp ? 1 : 0) : (c.pointerOnOpp = h(d.pointeronright, 2 == f.axisPosition ? 0 : 1), c.gaugeType = f.reverseScale ? 4 : 3)
        },
        getPointStub: function (a, e, c, d, b) {
            var f = this.numberFormatter,
                k = this.colorManager,
                g = c.chart,
                p = c[P];
            c = f.getCleanValue(a.value);
            var m = G(a.link),
                l = G($(q(a.tooltext, p.tooltext))),
                n = G($(a.displayvalue)),
                s = f.dataLabels(c),
                f = this.colorRangeGetter.getColorObj(c);
            d = d.chart;
            var p = h(a.alpha, a.bgalpha,
                    g.pointerBgAlpha),
                r = q(a.color, a.bgcolor, g.pointerBgColor),
                t = F(r, p),
                u = h(a.showborder, d.showplotborder, 1),
                B = h(a.borderalpha, g.pointerBorderAlpha),
                L = q(a.bordercolor, g.pointerBorderColor),
                w = F(L, B),
                T = u ? h(a.borderthickness, g.pointerBorderThickness) : 0,
                x = h(a.radius, g.pointerRadius),
                y = h(a.showhovereffect, d.showhovereffect),
                D, C, E, U, K, ca, H, I = !1,
                J = !1,
                Ra, v, N;
            this.showTooltip ? void 0 !== l ? (b = Ya(l, [1, 2], {
                formattedValue: s
            }, a, d), J = !0) : b = null === s ? !1 : void 0 !== b ? b + this.tooltipSepChar + s : s : b = O;
            h(a.showvalue, this.showValues) ?
                void 0 !== n ? I = !0 : n = G(s, " ") : n = O;
            l = h(a.sides, g.pointerSides);
            3 > l && (l = 3);
            this.pointValueWatcher && this.pointValueWatcher(c);
            0 !== y && (y || a.bghovercolor || d.pointerbghovercolor || d.plotfillhovercolor || a.bghoveralpha || d.pointerbghoveralpha || d.plotfillhoveralpha || 0 === a.bghoveralpha || 0 === d.pointerbghoveralpha || a.showborderonhover || d.showborderonhover || 0 === a.showborderonhover || 0 === d.showborderonhover || a.borderhoverthickness || d.pointerborderhoverthickness || 0 === a.borderhoverthickness || 0 === d.pointerborderhoverthickness ||
                a.borderhovercolor || d.pointerborderhovercolor || a.borderhoveralpha || d.pointerborderhoveralpha || 0 === a.borderhoveralpha || 0 === d.pointerborderhoveralpha || a.hoverradius || d.pointerhoverradius || 0 === a.hoverradius || 0 === d.pointerhoverradius) && (y = !0, s = q(a.bghovercolor, d.pointerbghovercolor, d.plotfillhovercolor, "{dark-10}"), E = h(a.bghoveralpha, d.pointerbghoveralpha, d.plotfillhoveralpha), D = h(a.showborderonhover, d.showborderonhover), void 0 === D && (D = a.borderhoverthickness || 0 === a.borderhoverthickness || a.borderhovercolor ||
                a.borderhoveralpha || 0 === a.borderhoveralpha ? 1 : u), u = q(a.borderhovercolor, d.pointerborderhovercolor, "{dark-10}"), K = h(a.borderhoveralpha, d.pointerborderhoveralpha), U = D ? h(a.borderhoverthickness, d.pointerborderhoverthickness, T || 1) : 0, C = h(a.hoverradius, d.pointerhoverradius, x + 2), ca = !!h(a.showhoveranimation, d.showhoveranimation, 1), D = {}, v = {}, T !== U && (D["stroke-width"] = U, v["stroke-width"] = T), v.fill = t, s = (H = /\{/.test(s)) ? k.parseColorMix(r, s)[0] : s, D.fill = F(s, h(E, p)), U && (v.stroke = w, r = /\{/.test(u), D.stroke = F(r ? k.parseColorMix(L,
                u)[0] : u, h(K, B))), C && (ca ? (Ra = {
                r: C
            }, N = {
                r: x
            }) : (D.r = C, v.r = x)));
            return {
                y: c,
                displayValue: n,
                id: q(a.id, "pointer_" + e),
                editMode: h(a.editmode, d.editmode),
                isLabelString: I,
                isTooltextString: J,
                toolText: b,
                _tooltext: a.tooltext,
                plotFillPercent: q(d.plotfillpercent, 40),
                bgalpha: p,
                color: t,
                borderAlpha: h(d.showplotborder, 1) ? g.pointerBorderAlpha : 0,
                borderColor: w,
                borderWidth: T,
                radius: x,
                sides: l,
                link: m,
                colorRange: f,
                doNotSlice: !0,
                tooltipConstraint: this.tooltipConstraint,
                rolloverProperties: {
                    enabled: y,
                    hoverAttr: D,
                    hoverAnimAttr: Ra,
                    outAttr: v,
                    outAnimAttr: N
                }
            }
        }
    }, z.linearscalegauge);
    z("hlineargauge", {
        friendlyName: "Horizontal Linear Gauge",
        creditLabel: ja,
        defaultSeriesType: "lineargauge",
        rendererId: "hlinear",
        standaloneInit: !0,
        isHorizontal: !0
    }, z.lineargauge);
    z("vlineargauge", {
        friendlyName: "Vertical Linear Gauge",
        creditLabel: ja,
        defaultSeriesType: "lineargauge",
        connectTickMarks: 0,
        standaloneInit: !0
    }, z.lineargauge);
    z("thermometer", {
        friendlyName: "Thermometer Gauge",
        creditLabel: ja,
        defaultSeriesType: "thermometer",
        rendererId: "thermometer",
        connectTickMarks: 0,
        tickMarkDistance: 0,
        standaloneInit: !0,
        realtimeEnabled: !0,
        isDataLabelBold: !0,
        defaultPlotShadow: 0,
        alignCaptionWithCanvas: 0,
        defaultPaletteOptions: Ea(V({}, wa), {
            thmBorderColor: ["545454", "60634E", "415D6F", "845001", "68001B"],
            thmFillColor: ["999999", "ADB68F", "A2C4C8", "FDB548", "FF7CA0"]
        }),
        preSeriesAddition: function (a, e) {
            var c = a.chart,
                d = e.chart,
                b = this.colorManager,
                f;
            f = this.numberFormatter;
            var k = h(d.showhovereffect);
            c.thmOriginX = h(d.thmoriginx, d.gaugeoriginx);
            c.thmOriginY = h(d.thmoriginy, d.gaugeoriginy);
            c.thmBulbRadius =
                h(f.getCleanValue(d.thmbulbradius, !0));
            c.thmHeight = h(f.getCleanValue(h(d.thmheight, d.gaugeheight), !0));
            c.gaugeFillColor = q(d.gaugefillcolor, d.thmfillcolor, b.getColor("thmFillColor"));
            c.gaugeFillAlpha = h(d.gaugefillalpha, d.thmfillalpha, Qa);
            0 !== k && (k || d.thmfillhovercolor || d.plotfillhovercolor || d.thmfillhoveralpha || d.plotfillhoveralpha || 0 === d.thmfillhoveralpha) && (c.plotHoverEffects = {}, c.plotHoverEffects.enabled = !0, f = q(d.thmfillhovercolor, d.plotfillhovercolor, "{dark-10}"), c.plotHoverEffects.thmFillHoverColor =
                /\{/.test(f) ? b.parseColorMix(c.gaugeFillColor, f)[0] : f, c.plotHoverEffects.thmFillHoverAlpha = q(d.thmfillhoveralpha, d.plotfillhoveralpha, c.gaugeFillAlpha));
            f = h(d.gaugeborderalpha, h(d.showgaugeborder, 1) ? 40 : 0);
            c.gaugeBorderColor = F(q(d.gaugebordercolor, b.getColor("thmBorderColor")), f);
            c.gaugeBorderThickness = h(d.gaugeborderthickness, 1);
            c.thmGlassColor = q(d.thmglasscolor, Y(c.gaugeFillColor, 30));
            c.use3DLighting = !h(d.use3dlighting, 1)
        },
        getPointColorObj: function (a) {
            return {
                code: q(a.gaugefillcolor, a.thmfillcolor,
                    this.colorManager.getColor("thmFillColor")),
                alpha: h(a.gaugefillalpha, a.thmfillalpha, 100)
            }
        },
        getPointStub: z.linearscalegauge,
        placeDataLabels: z.linearscalegauge,
        manageTitleSpace: z.linearscalegauge,
        spaceManager: function (a, e, c, d) {
            var b = a.chart,
                f = c - (b.marginRight + b.marginLeft),
                k = d - (b.marginTop + b.marginBottom),
                g = b.marginRight,
                p = b.marginLeft,
                m = b.marginTop,
                l = b.marginBottom;
            d = .3 * f;
            var n = .3 * k,
                s = b.thmOriginX,
                r = b.thmOriginY,
                t = b.thmBulbRadius,
                u = b.thmHeight,
                B = ia(s),
                q = ia(r),
                w = ia(t),
                T = ia(u),
                x = 4 === a.scale.axisPosition,
                y = 0,
                D = 0,
                C, E, U = 0;
            a.title.alignWithCanvas || (k -= U = this.manageTitleSpace(a, e, 0, k / 2));
            this.placeTickMark && (f -= y = this.placeTickMark(a, 2 * h(t, 4), n));
            w || (b.thmBulbRadius = t = Math.min(f / 2, .13 * h(u, k)), w = !0);
            w && (E = .643 * t, d = C = 2 * E, w = (2 * t - C) / 2, B ? b.marginLeft = x ? b.marginLeft + (D = s - E - y) : b.marginLeft + (D = s - E) : x ? (b.marginLeft += (c - p - g - w - C) / 2 - y / 2, b.marginRight -= (c - p - g - w - C) / 2 - y / 2, b.marginRight += D = Math.min(t, f / 2) - E) : (b.marginLeft += (c - p - g - w - C) / 2 - y / 2, b.marginRight -= (c - p - g - w - C) / 2 - y / 2, b.marginLeft += D = Math.min(t, f / 2) - E), f -= D);
            b.marginRight +=
                f - C;
            a.title.alignWithCanvas && (k -= U = this.manageTitleSpace(a, e, 0, k / 2));
            q && (n = r - U + t);
            this.placeDataLabels && (k -= this.placeDataLabels(a, d, n, m, g, l, p));
            T || (b.thmHeight = q ? u = Math.max(r - U + t - E, 3 * t) : u = Math.max(k - E, 3 * t));
            b.marginTop = q ? b.marginTop + (r - U + t - u) : b.marginTop + (k - u);
            e = 1.766 * t;
            b.marginBottom += e;
            b.valuePadding += e;
            b.thmHeight = b.plotHeight = u - e;
            this.postDataLabelsPlacement && this.postDataLabelsPlacement(a, d, n)
        }
    }, z.gaugebase);
    z("cylinder", {
        friendlyName: "Cylinder Gauge",
        creditLabel: ja,
        defaultSeriesType: "cylinder",
        connectTickMarks: 0,
        rendererId: "cylinder",
        tickMarkDistance: 2,
        standaloneInit: !0,
        charttopmargin: 10,
        chartbottommargin: 10,
        chartrightmargin: 10,
        chartleftmargin: 10,
        isDataLabelBold: !0,
        realtimeEnabled: !0,
        alignCaptionWithCanvas: 0,
        defaultPaletteOptions: Ea(V({}, wa), {
            cylFillColor: ["CCCCCC", "ADB68F", "E1F5FF", "FDB548", "FF7CA0"],
            periodColor: ["EEEEEE", "ECEEE6", "E6ECF0", "FFF4E6", "FFF2F5"]
        }),
        preSeriesAddition: function (a, e) {
            var c = a.chart,
                d = e.chart,
                b = this.colorManager,
                f = h(d.showhovereffect);
            c.cylFillColor = q(d.gaugefillcolor,
                d.cylfillcolor, b.getColor("cylFillColor"));
            c.cylFillAlpha = q(d.gaugefillalpha, d.cylfillalpha, 100);
            0 !== f && (f || d.cylfillhovercolor || d.plotfillhovercolor || d.cylfillhoveralpha || d.plotfillhoveralpha || 0 === d.cylfillhoveralpha) && (c.plotHoverEffects = {}, c.plotHoverEffects.enabled = !0, f = q(d.cylfillhovercolor, d.plotfillhovercolor, "{dark-10}"), c.plotHoverEffects.cylFillHoverColor = /\{/.test(f) ? b.parseColorMix(c.cylFillColor, f)[0] : f, c.plotHoverEffects.cylFillHoverAlpha = q(d.cylfillhoveralpha, d.plotfillhoveralpha, c.cylFillAlpha));
            c.cylGlassColor = q(d.cylglasscolor, "FFFFFF");
            c.cyl3DLighting = h(d.use3dlighting, "1")
        },
        getPointColorObj: function (a) {
            return {
                code: q(a.gaugefillcolor, a.thmfillcolor, this.colorManager.getColor("cylFillColor")),
                alpha: h(a.gaugefillalpha, a.thmfillalpha, 100)
            }
        },
        getPointStub: z.linearscalegauge,
        placeDataLabels: z.linearscalegauge,
        manageTitleSpace: z.linearscalegauge,
        spaceManager: function (a, e, c, d) {
            var b = a.chart,
                f = e.chart,
                k = c - (b.marginRight + b.marginLeft),
                g = d - (b.marginTop + b.marginBottom),
                p = b.marginRight,
                m = b.marginLeft,
                l = b.marginTop,
                n = b.marginBottom,
                s = .2 * k,
                r = .3 * g,
                t = h(f.cylyscale, 30),
                u = this.scaleFactor,
                B = this.numberFormatter;
            a.title.alignWithCanvas || (g -= this.manageTitleSpace(a, e, k / 2, g / 2));
            this.placeTickMark && (k -= this.placeTickMark(a, s, r));
            this.placeDataLabels && (g -= this.placeDataLabels(a, s, r, l, p, n, m) + 8, b.valuePadding += 8);
            this.postDataLabelsPlacement && this.postDataLabelsPlacement(a, s, r);
            b.cylHeight = G(f.cylheight);
            if (50 < t || 0 > t) t = 30;
            b.cylYScale = t /= 100;
            p = Math.max(Ka(k, 1.2 * g) / 2, 5);
            p = h(G(B.getCleanValue(f.cylradius, !0)) *
                u, p);
            b.marginLeft = h(G(f.cyloriginx) * u, b.marginLeft);
            b.marginLeft += k / 2 - p;
            b.marginRight = c - (b.marginLeft + 2 * p);
            a.title.alignWithCanvas && (g -= this.manageTitleSpace(a, e, k / 2, g / 2));
            a = g - p * t * 2;
            B = h(G(B.getCleanValue(f.cylheight, !0)) * u, a);
            t = b.yScaleRadius = p * t;
            a = b.cylinderTotalHeight = 2 * t + B;
            g = g - a + b.marginTop;
            b.marginTop = h(G(f.cyloriginy) * u - B, t + g);
            b.marginBottom = d - (b.marginTop + B);
            b.cylRadius = p;
            b.cylHeight = B;
            b.yScaleRadius = t
        }
    }, z.gaugebase);
    z("angulargauge", {
        friendlyName: "Angular Gauge",
        standaloneInit: !0,
        drawAnnotations: !0,
        defaultSeriesType: "angulargauge",
        creditLabel: ja,
        rendererId: "angular",
        isAngular: !0,
        eiMethods: z.lineargauge.eiMethods,
        multiValueGauge: !0,
        realtimeEnabled: !0,
        defaultPaletteOptions: Ea(V({}, wa), {
            dialColor: ["999999,ffffff,999999", "ADB68F,F3F5DD,ADB68F", "A2C4C8,EDFBFE,A2C4C8", "FDB548,FFF5E8,FDB548", "FF7CA0,FFD1DD,FF7CA0"],
            dialBorderColor: ["999999", "ADB68F", "A2C4C8", "FDB548", "FF7CA0"],
            pivotColor: ["999999,ffffff,999999", "ADB68F,F3F5DD,ADB68F", "A2C4C8,EDFBFE,A2C4C8", "FDB548,FFF5E8,FDB548", "FF7CA0,FFD1DD,FF7CA0"],
            pivotBorderColor: ["999999", "ADB68F", "A2C4C8", "FDB548", "FF7CA0"]
        }),
        subTitleFontSizeExtender: 0,
        charttopmargin: 5,
        chartrightmargin: 5,
        chartbottommargin: 5,
        chartleftmargin: 5,
        defaultPlotShadow: 1,
        gaugeBorderColor: "{dark-20}",
        gaugeBorderThickness: 1,
        updateSnapPoints: function (a) {
            z.gaugebase.updateSnapPoints.apply(this, arguments);
            var e = a.series[0],
                c = this.snapLiterals;
            c.gaugestartangle = a.chart.gaugeStartAngle / db;
            c.gaugeendangle = a.chart.gaugeEndAngle / db;
            c.chartcenterx = a.chart.origW / 2;
            c.chartcentery = a.chart.origH /
                2;
            c.gaugecenterx = e.gaugeOriginX;
            c.gaugecentery = e.gaugeOriginY;
            c.gaugeinnerradius = e.gaugeInnerRadius;
            c.gaugeouterradius = e.gaugeOuterRadius;
            c.dial = function (c) {
                var b = a.series[0],
                    e = c[1] || c[0],
                    k = (c = b.data[Number(c[0]) || 0]) && c.graphic;
                if (k) {
                    k = k.matrix;
                    switch (e) {
                        case "startx":
                            b = b.gaugeOriginX + k.x(-c.rearExtension, 0);
                            break;
                        case "starty":
                            b = b.gaugeOriginY + k.y(-c.rearExtension, 0);
                            break;
                        case "endx":
                            b = b.gaugeOriginX + k.x(c.radius, 0);
                            break;
                        case "endy":
                            b = b.gaugeOriginY + k.y(c.radius, 0);
                            break;
                        default:
                            b = 0
                    }
                    return b
                }
                return 0
            }
        },
        preSeriesAddition: function (a, e) {
            var c = e.chart,
                d = h(c.gaugescaleangle, 180),
                b = h(c.gaugestartangle),
                c = h(c.gaugeendangle),
                f = ia(b),
                k = Ja ? .001 : .01,
                g = ia(c);
            if (360 < d || -360 > d) d = 0 < d ? 360 : -360;
            if (360 < c || -360 > c) c %= 360;
            if (360 < b || -360 > b) b %= 360;
            if (f && g) {
                if (d = b - c, 360 < d || -360 > d) d %= 360, c = b - d
            } else if (f) {
                if (c = b - d, 360 < c || -360 > c) c %= 360, b += 0 < c ? -360 : 360
            } else if (g) {
                if (b = c + d, 360 < b || -360 > b) b %= 360, c += 0 < b ? -360 : 360
            } else 360 === d ? (b = 180, c = -180) : -360 === d ? c = b = -180 : (b = 90 + d / 2, c = b - d);
            360 === Math.abs(d) && (d += 0 < d ? -k : k, c = b - d);
            c = 360 - c;
            b = 360 -
                b;
            if (360 < b || 360 < c) b -= 360, c -= 360;
            a.chart.gaugeStartAngle = b * db;
            a.chart.gaugeEndAngle = c * db;
            a.chart.gaugeScaleAngle = -d * db
        },
        series: function (a, e) {
            var c = {
                    data: [],
                    colorByPoint: !0
                },
                d = a.chart,
                b = this.colorRangeGetter,
                f = (b = b && b.colorArr) && b.length,
                k = e[P],
                g = this.numberFormatter,
                p = this.colorManager,
                m, l, n, s = c.showValue = h(d.showvalue, d.showrealtimevalue, 0),
                r = this.scaleFactor,
                t = 0,
                u = a.dials && a.dials.dial,
                B, L, w = h(d.showhovereffect),
                T, x, y, D, C, E, U, K, ca, H, I, J, Ra, v, N = h(d.editmode, 0),
                Q, S, z, M, A, Ib, Z, X, aa, ba, pa;
            Q = t = h(G(d.pivotradius) *
                r, 5);
            c.pivotRadius = Q;
            S = 0;
            z = u && u.length;
            ba = 0;
            z || (S = -1, z = 0, u = []);
            for (0 !== w && (w || d.dialborderhovercolor || d.dialborderhoveralpha || 0 === d.dialborderhoveralpha || d.dialborderhoverthickness || 0 === d.dialborderhoverthickness || d.dialbghovercolor || d.plotfillhovercolor || d.dialbghoveralpha || d.plotfillhoveralpha || 0 === d.dialbghoveralpha) && (w = 1); S < z; S += 1) {
                M = u[S] || {};
                m = g.getCleanValue(M.value);
                this.pointValueWatcher && this.pointValueWatcher(m);
                A = h(M.rearextension, 0);
                t = Math.max(t, A * r);
                n = g.dataLabels(m);
                Ib = G(n, O);
                X = h(M.showvalue,
                    s);
                aa = h(G(M.valuey) * r);
                Z = q(M.tooltext, M.hovertext) ? !0 : !1;
                X && !ia(aa) && (ba += 1);
                l = (l = G($(q(M.tooltext, M.hovertext, k.tooltext)))) ? Ya(l, [1, 2], {
                    formattedValue: n
                }, M, d) : Ib;
                Ra = q(M.color, M.bgcolor, p.getColor("dialColor"));
                C = h(M.alpha, M.bgalpha, 100);
                v = R({
                    FCcolor: {
                        color: Ra,
                        alpha: C,
                        angle: 90
                    }
                });
                B = q(M.bordercolor, p.getColor("dialBorderColor"));
                pa = h(M.borderalpha, 100);
                n = F(B, pa);
                L = h(M.borderthickness, 1);
                K = h(M.radius);
                ca = h(M.basewidth);
                I = h(M.topwidth, 0);
                H = h(M.baseradius, 0);
                T = h(M.showhovereffect, w);
                if (0 !== T && (T || M.borderhovercolor ||
                        M.borderhoveralpha || 0 === M.borderhoveralpha || M.borderhoverthickness || 0 === M.borderhoverthickness || M.bghovercolor || M.bghoveralpha || 0 === M.bghoveralpha)) {
                    T = !0;
                    J = {};
                    U = {};
                    x = q(M.borderhovercolor, d.dialborderhovercolor, "{dark-10}");
                    D = h(M.borderhoveralpha, d.dialborderhoveralpha, pa);
                    if (y = h(M.borderhoverthickness, d.dialborderhoverthickness, L)) J.stroke = n, E = /\{/.test(x), U.stroke = F(E ? p.parseColorMix(B, x)[0] : x, D);
                    y !== L && (U["stroke-width"] = y, J["stroke-width"] = L);
                    B = q(M.bghovercolor, d.dialbghovercolor, d.plotfillhovercolor,
                        "{dark-10}");
                    C = h(M.bghoveralpha, d.dialbghoveralpha, d.plotfillhoveralpha, C);
                    J.fill = v;
                    B = (x = /\{/.test(B)) ? p.parseColorMix(Ra, B).join() : B;
                    x = {
                        FCcolor: {
                            color: B,
                            alpha: C,
                            angle: 90
                        }
                    };
                    U.fill = R(x)
                }
                c.data.push({
                    rolloverProperties: {
                        enabled: T,
                        hasHoverSizeChange: void 0,
                        hoverRadius: h(NaN * r),
                        baseHoverWidth: h(NaN * r, 1.6 * Q),
                        topHoverWidth: h(NaN * r),
                        rearHoverExtension: h(NaN * r),
                        hoverFill: x,
                        hoverAttr: U,
                        outAttr: J
                    },
                    _tooltext: q(M.tooltext, M.hovertext),
                    y: m,
                    id: q(M.id, S),
                    color: v,
                    showValue: X,
                    editMode: h(M.editmode, N),
                    borderColor: n,
                    shadowAlpha: pa,
                    borderThickness: L,
                    baseWidth: h(ca * r, 1.6 * Q),
                    topWidth: h(I * r),
                    baseRadius: h(H * r),
                    rearExtension: A * r,
                    valueX: h(G(M.valuex) * r),
                    valueY: aa,
                    radius: h(K * r),
                    link: q(M.link, O),
                    isLabelString: Z,
                    toolText: l,
                    displayValue: X ? q(Ib, " ") : O,
                    doNotSlice: !0
                })
            }
            c.displayValueCount = ba;
            c.compositPivotRadius = t;
            e.series[0] = c;
            f && this.pointValueWatcher && h(d.includecolorrangeinlimits, this.includeColorRangeInLimits) && (c = h(b[0].minvalue), ia(c) && this.pointValueWatcher(c), c = h(b[f - 1].maxvalue), ia(c) && this.pointValueWatcher(c))
        },
        postSeriesAddition: function (a, e) {
            var c = e.chart,
                d = a.series[0],
                b = this.colorManager,
                f;
            d.valueBelowPivot = h(c.valuebelowpivot, 0);
            d.gaugeFillMix = c.gaugefillmix;
            d.gaugeFillRatio = c.gaugefillratio;
            void 0 === d.gaugeFillMix && (d.gaugeFillMix = "{light-10},{light-70},{dark-10}");
            void 0 === d.gaugeFillRatio ? d.gaugeFillRatio = ",6" : "" !== d.gaugeFillRatio && (d.gaugeFillRatio = "," + d.gaugeFillRatio);
            f = b.parseColorMix(q(c.pivotfillcolor, c.pivotcolor, c.pivotbgcolor, b.getColor("pivotColor")), q(c.pivotfillmix, "{light-10},{light-30},{dark-20}"));
            d.pivotFillAlpha = b.parseAlphaList(q(c.pivotfillalpha, Qa), f.length);
            d.pivotFillRatio = b.parseRatioList(q(c.pivotfillratio, ib), f.length);
            d.pivotFillColor = f.join();
            d.pivotFillAngle = h(c.pivotfillangle, 0);
            d.isRadialGradient = "radial" == q(c.pivotfilltype, "radial").toLowerCase();
            d.showPivotBorder = h(c.showpivotborder, 0);
            d.pivotBorderThickness = h(c.pivotborderthickness, 1);
            d.pivotBorderColor = F(q(c.pivotbordercolor, b.getColor("pivotBorderColor")), 1 == d.showPivotBorder ? q(c.pivotborderalpha, Qa) : ib);
            this.parseColorMix =
                b.parseColorMix;
            this.parseAlphaList = b.parseAlphaList;
            this.parseRatioList = b.parseRatioList
        },
        spaceManager: function (a, e, c, d) {
            var b = a.chart,
                f = e.chart,
                k = a.scale,
                g = a.series[0],
                p = g.displayValueCount,
                m = k.tickValues.style,
                l = h(parseInt(m.lineHeight, 10), 12),
                n = h(parseInt(m.fontSize, 10), 10),
                s = .8 * n,
                r = .1 * l,
                t = Ja ? 0 : .1 * l,
                u = h(parseInt(a.plotOptions.series.dataLabels.style.lineHeight, 10), 12),
                B = c - (b.marginRight + b.marginLeft),
                q = d - (b.marginTop + b.marginBottom),
                w = this.scaleFactor,
                T = g.compositPivotRadius,
                x, y, D = b.gaugeStartAngle,
                C = b.gaugeEndAngle,
                E, U = p * u + 2 + g.pivotRadius,
                K = 0,
                ca = g.valueBelowPivot,
                H, I, J, v, z, N, Q, S, A, M, F, O, Z, X, aa, ba, pa, ga, ta, sa, xa, Sa, cb, Oa, tb, gb, hb, Fa, R, P, V, fb, Y, $, W, ka, na;
            E = /^\d+\%$/.test(f.gaugeinnerradius) ? parseInt(f.gaugeinnerradius, 10) / 100 : .7;
            q -= this.titleSpaceManager(a, e, B, q / 2);
            ca || (K = U, U = 0);
            g.gaugeOuterRadius = h(Math.abs(G(f.gaugeouterradius) * w));
            g.gaugeInnerRadius = h(Math.abs(G(f.gaugeinnerradius) * w), g.gaugeOuterRadius * E);
            var fa = b.gaugeStartAngle,
                ja = b.gaugeEndAngle,
                ha = q,
                oa = g.gaugeOuterRadius,
                ma = h(G(f.gaugeoriginx) *
                    w - b.marginLeft),
                da = h(G(f.gaugeoriginy) * w - b.marginTop),
                la = Math.max(T, n),
                ra = U,
                qa = K,
                ua = ia(oa),
                wa = ia(ma),
                Ba = ia(da),
                Aa = 2 * Math.PI,
                va = Math.PI,
                za = Math.PI / 2,
                Da = va + za,
                Pa, Ha = ma,
                Ka = da,
                Ga, ya, Va, Ea, $a, Na = !1,
                Qa, Ua, Ya, Za, Ma, Wa, Xa, Ca, Ta, ab, eb = fa % Aa;
            0 > eb && (eb += Aa);
            (la = la || 0) && la < B / 2 && la < ha / 2 && (Na = !0);
            ra > ha / 2 && (ra = ha / 2);
            qa > ha / 2 && (qa = ha / 2);
            Qa = Math.cos(fa);
            Ua = Math.sin(fa);
            Ya = Math.cos(ja);
            Za = Math.sin(ja);
            ya = Math.min(Qa, Ya, 0);
            Ea = Math.max(Qa, Ya, 0);
            Va = Math.min(Ua, Za, 0);
            $a = Math.max(Ua, Za, 0);
            if (!ua || !wa || !Ba) {
                ab = ja - fa;
                Wa = eb +
                    ab;
                if (Wa > Aa || 0 > Wa) Ea = 1;
                if (0 < ab) {
                    if (eb < za && Wa > za || Wa > Aa + za) $a = 1;
                    if (eb < va && Wa > va || Wa > Aa + va) ya = -1;
                    if (eb < Da && Wa > Da || Wa > Aa + Da) Va = -1
                } else {
                    if (eb > za && Wa < za || Wa < -Da) $a = 1;
                    if (eb > va && Wa < va || Wa < -va) ya = -1;
                    if (eb > Da && Wa < Da || Wa < -za) Va = -1
                }
                wa ? ua || (Ca = B - ma, Ta = -ma, Pa = ya ? Math.min(Ca / Ea, Ta / ya) : Ca / Ea) : (Xa = Ea - ya, Ma = B / Xa, ma = -Ma * ya, Pa = Ma, Na && (B - ma < la ? (ma = B - la, Ca = B - ma, Ta = -ma, Pa = ya ? Math.min(Ca / Ea, Ta / ya) : Ca / Ea) : ma < la && (ma = la, Ca = B - ma, Ta = -ma, Pa = ya ? Math.min(Ca / Ea, Ta / ya) : Ca / Ea)), Ha = ma);
                Ba ? ua || (Ca = ha - da, Ta = -da, Pa = Math.min(Pa, Va ? Math.min(Ca /
                    $a, Ta / Va) : Ca / $a)) : (Xa = $a - Va, Ma = ha / Xa, da = -Ma * Va, Na && (ha - da < la ? (da = ha - la, Ca = ha - da, Ta = -da, Pa = Math.min(Pa, Va ? Math.min(Ca / $a, Ta / Va) : Ca / $a)) : da < la && (da = la, Ca = ha - da, Ta = -da, Pa = Math.min(Pa, Va ? Math.min(Ca / $a, Ta / Va) : Ca / $a))), ha - da < ra ? (da = ha - ra, Ca = ha - da, Ta = -da, Pa = Math.min(Pa, Va ? Math.min(Ca / $a, Ta / Va) : Ca / $a)) : da < qa && (da = qa, Ca = ha - da, Ta = -da, Pa = Math.min(Pa, Va ? Math.min(Ca / $a, Ta / Va) : Ca / $a)), Pa = Math.min(Pa, Ma), Ka = da);
                Ga = Pa;
                0 >= Ga && (Ga = Math.min(B / 2, ha / 2))
            }
            x = g.gaugeOriginX = Ha;
            y = g.gaugeOriginY = Ka;
            H = k.majorTM;
            I = 0;
            J = H.length;
            z = a.labels.smartLabel;
            F = k.min;
            O = k.max - k.min;
            pa = B - x;
            ga = q - y;
            ta = k.placeValuesInside;
            sa = Math.cos(89.98 * db);
            xa = -sa;
            Sa = ia(g.gaugeOuterRadius);
            cb = k.tickValueDistance;
            Oa = k.showTickValues;
            tb = k.showLimits;
            gb = h(g.gaugeOuterRadius, Ga);
            hb = h(g.gaugeInnerRadius, gb * E);
            Fa = gb;
            R = .2 * gb;
            W = 1.5 * l;
            na = (C - D) / O;
            if (Oa || tb)
                for (ta ? hb > cb + l ? P = hb - cb : (P = hb, cb = 0) : (Fa += cb, Sa || (R += cb)), z.setStyle(m); I < J; I += 1)
                    if (M = H[I], ka = D + (M.value - F) * na, Z = Math.cos(ka), X = Math.sin(ka), v = M.displayValue, N = z.getOriSize(v), Q = N.width, S = N.height, A = S / 2, 0 < Q &&
                        0 < S)
                        if (M.x = 0, ta) M.align = Z > sa ? bb : Z < xa ? Ia : La, M.isString && (aa = P * Z, V = Math.abs(aa), V < Q && (N = z.getSmartText(v, Math.max(V, l), W), M.displayValue = N.text, N.tooltext && (M.originalText = N.tooltext), S = N.height, A = S / 2)), Z > sa || Z < xa ? (M.y = n - A + t, M.y -= .4 * S * X) : M.y = s - (0 > X ? 0 : S - r);
                        else if (M.align = Z > sa ? Ia : Z < xa ? bb : La, aa = Fa * Z, ba = Fa * X, Sa || (0 < ba ? ($ = A + A * X, ga < ba + $ && (ba = ga - $, Fa = Math.max(ba / X, R))) : 0 > ba && ($ = A - A * X, y < -ba + $ && (ba = $ - y, Fa = Math.max(ba / X, R)))), Z > sa) aa + Q > pa && (Sa ? M.isString && (N = z.getSmartText(v, pa - aa, W), M.displayValue = N.text, N.tooltext &&
                (M.originalText = N.tooltext), S = N.height, A = S / 2) : (aa = pa - Q, Fa = Math.max(aa / Z, R), aa = Fa * Z, M.isString && aa + Q > pa && (N = z.getSmartText(v, pa - aa, W), M.displayValue = N.text, N.tooltext && (M.originalText = N.tooltext), S = N.height, A = S / 2, Q = N.width, aa = pa - Q, Fa = Math.max(aa / Z, R)))), M.y = n - A + t + .4 * S * X;
            else if (Z < xa) Q - aa > x && (Sa ? M.isString && (N = z.getSmartText(v, x + aa, W), M.displayValue = N.text, N.tooltext && (M.originalText = N.tooltext), S = N.height, A = S / 2) : (aa = Q - x, Fa = Math.max(aa / Z, R), aa = Fa * Z, M.isString && Q - aa > x && (N = z.getSmartText(v, x + aa, W), M.displayValue =
                N.text, N.tooltext && (M.originalText = N.tooltext), Q = N.width, S = N.height, A = S / 2, aa = Q - x, Fa = Math.max(aa / Z, R)))), M.y = n - A + t + .4 * S * X;
            else {
                0 < X ? (fb = ga, Y = S + ba) : (fb = y, Y = S - ba);
                if (!Sa) {
                    if (Y > fb && (Fa = Math.max(fb - S, R), Y = S + Fa), M.isString && Y > fb || Q > B) N = z.getSmartText(v, B, Math.max(fb - R, l)), M.displayValue = N.text, N.tooltext && (M.originalText = N.tooltext), S = N.height, Fa = Math.max(fb - S, R)
                } else if (M.isString && Y > fb || Q > B) N = z.getSmartText(v, B, Math.max(S - Y + fb, l)), M.displayValue = N.text, N.tooltext && (M.originalText = N.tooltext), S = N.height;
                M.y = s - (0 < X ? 0 : S - r)
            }
            Sa || (g.gaugeOuterRadius = ta ? Fa : Fa - cb, 0 >= g.gaugeOuterRadius && (g.gaugeOuterRadius = Math.abs(R)));
            g.gaugeInnerRadius = h(g.gaugeInnerRadius, g.gaugeOuterRadius * E)
        }
    }, z.gaugebase);
    z("bulb", {
        friendlyName: "Bulb Gauge",
        defaultSeriesType: "bulb",
        defaultPlotShadow: 1,
        standaloneInit: !0,
        drawAnnotations: !0,
        charttopmargin: 10,
        chartrightmargin: 10,
        chartbottommargin: 10,
        chartleftmargin: 10,
        realtimeEnabled: !0,
        isDataLabelBold: !0,
        rendererId: "bulb",
        preSeriesAddition: function (a) {
            a = a.chart;
            a.colorRangeGetter = this.colorRangeGetter;
            a.defaultColors = this.colorManager.getPlotColor(0);
            a.defaultColLen = a.defaultColors.length
        },
        getPointColor: function (a, e, c) {
            return c ? {
                FCcolor: {
                    cx: .4,
                    cy: .4,
                    r: "80%",
                    color: Y(a, 65) + v + Y(a, 75) + v + ha(a, 65),
                    alpha: e + v + e + v + e,
                    ratio: "0,30,70",
                    radialGradient: !0
                }
            } : F(a, e)
        },
        getPointStub: function (a, e, c, d, b) {
            var f = c.chart,
                k = c[P];
            e = d.chart;
            c = this.numberFormatter;
            d = c.getCleanValue(a.value);
            var g = c.dataLabels(d);
            c = G(a.link);
            var p = G($(q(a.tooltext, k.tooltext))),
                m = G($(a.displayvalue)),
                k = this.colorRangeGetter.getColorObj(d),
                l = f.useColorNameAsValue = h(e.usecolornameasvalue, 0),
                n = k.colorObj || k.prevObj || k.nextObj || {},
                s = this.colorManager,
                r = $(q(n.label, n.name)),
                t = q(e.gaugefillalpha, n.alpha, Qa),
                u = q(n.bordercolor, e.gaugebordercolor, ha(n.code, 70)),
                B = h(n.borderalpha, e.gaugeborderalpha, "90") * t / 100,
                L = h(e.showgaugeborder, 0),
                w = L ? h(e.gaugeborderthickness, 1) : 0,
                T = f.is3D = h(e.is3d, 1),
                x = this.getPointColor(n.code, t, T),
                y = h(e.showhovereffect),
                D, C, E, U, K, ca, H, I, J;
            k.isOnMeetPoint && (n = k.nextObj);
            f.gaugeFillAlpha = t;
            u = (I = /\{/.test(u)) ? s.parseColorMix(q(n.bordercolor,
                n.code), u)[0] : u;
            f = F(u, B);
            0 !== y && (y || e.gaugefillhovercolor || e.plotfillhovercolor || e.gaugefillhoveralpha || e.plotfillhoveralpha || 0 === e.gaugefillhoveralpha || e.is3donhover || 0 === e.is3donhover || e.showgaugeborderonhover || 0 === e.showgaugeborderonhover || e.gaugeborderhovercolor || e.gaugeborderhoveralpha || 0 === e.gaugeborderhoveralpha || e.gaugeborderhoverthickness || 0 === e.gaugeborderhoverthickness) && (y = !0, D = q(e.gaugefillhovercolor, e.plotfillhovercolor, "{dark-10}"), C = h(e.gaugefillhoveralpha, e.plotfillhoveralpha), E =
                h(e.showgaugeborderonhover), void 0 === E && (E = e.gaugeborderhovercolor || e.gaugeborderhoveralpha || 0 === e.gaugeborderhoveralpha || e.gaugeborderhoverthickness || 0 === e.gaugeborderhoverthickness ? 1 : L), L = q(e.gaugeborderhovercolor, "{dark-10}"), K = h(e.gaugeborderhoveralpha), U = E ? h(e.gaugeborderhoverthickness, w || 1) : 0, T = !!h(e.is3donhover, T), h(e.showhoveranimation, 1), E = {}, J = {}, w !== U && (E["stroke-width"] = U, J["stroke-width"] = w), J.fill = R(x), D = (H = /\{/.test(D)) ? s.parseColorMix(n.code, D)[0] : q(D, n.code), E.fill = R(this.getPointColor(D,
                    h(C, t), T)), U && (J.stroke = f, n = /\{/.test(L), E.stroke = F(n ? s.parseColorMix(I ? D : u, L)[0] : L, h(K, B))));
            this.showTooltip ? void 0 !== p ? (a = Ya(p, [1, 2], {
                formattedValue: g
            }, a, e), ca = !0) : a = l ? r : null === g ? !1 : void 0 !== b ? b + this.tooltipSepChar + g : g : a = !1;
            b = void 0 !== m ? m : l ? r : g;
            this.pointValueWatcher && this.pointValueWatcher(d);
            return {
                y: d,
                displayValue: b,
                toolText: a,
                isLabelString: ca,
                colorName: r,
                color: x,
                borderWidth: w,
                borderColor: f,
                colorRange: k,
                link: c,
                doNotSlice: !0,
                rolloverProperties: {
                    enabled: y,
                    hoverAttr: E,
                    hoverAnimAttr: void 0,
                    outAttr: J
                }
            }
        },
        spaceManager: function (a, e, c, d) {
            var b = this.smartLabel,
                f = a.series[0],
                k = f && f.data[0],
                f = a.chart,
                g = e.chart,
                p = f.scaleFactor = this.scaleFactor;
            c -= f.marginRight + f.marginLeft;
            d -= f.marginTop + f.marginBottom;
            var m = f.marginLeft,
                l = f.marginTop,
                n = h(g.valuepadding, 4),
                s = f.useColorNameAsValue,
                r, t = 0,
                u;
            k.y = G(k.y, a.scale.min);
            k.displayValue = this.showValues ? G(k.displayValue, this.numberFormatter.dataLabels(a.scale.min)) : O;
            u = k.displayValue;
            f.gaugeOriginX = h(g.gaugeoriginx, g.bulboriginx, -1);
            f.gaugeOriginY = h(g.gaugeoriginy, g.bulboriginy, -1);
            f.gaugeRadius = h(g.gaugeradius, g.bulbradius, -1);
            g = -1 !== f.gaugeRadius;
            d -= e = this.titleSpaceManager(a, e, c, .3 * d);
            l += e;
            f.dataLabels = {
                style: a.plotOptions.series.dataLabels.style
            };
            e = f.dataLabels.style;
            b.setStyle(e);
            1 == f.placeValuesInside ? (a = g ? f.gaugeRadius * p : Math.min(c, d) / 2, r = Math.sqrt(la(2 * a, 2) / 2), b = b.getSmartText(u, r, r)) : (r = (g ? d - 2 * f.gaugeRadius * p : .7 * d) - n, b = b.getSmartText(u, c, r), t = b.height + n, a = Math.min(c, d - t) / 2);
            s && (k.displayValue = b.text, b.tooltext && (k.originalText = b.tooltext));
            f.valuePadding = n;
            f.valueTextHeight =
                b.height;
            f.labelLineHeight = parseInt(e.lineHeight, 10);
            a = g ? f.gaugeRadius * p : a;
            b = -1 === f.gaugeOriginX ? m + c / 2 : f.gaugeOriginX * p;
            p = -1 === f.gaugeOriginY ? l + (d - t) / 2 : f.gaugeOriginY * p;
            f.marginTop = f.marginLeft = 0;
            f.gaugeRadius = a;
            f.gaugeOriginX = b;
            f.gaugeOriginY = p
        },
        updateSnapPoints: function (a) {
            z.gaugebase.updateSnapPoints.apply(this, arguments);
            this.snapLiterals.gaugeradius = a.chart.gaugeRadius
        }
    }, z.gaugebase);
    z("drawingpad", {
        friendlyName: "DrawingPad Component",
        standaloneInit: !0,
        defaultSeriesType: "drawingpad",
        rendererId: "drawingpad",
        defaultPlotShadow: 1,
        drawAnnotations: !0,
        chartleftmargin: 0,
        charttopmargin: 0,
        chartrightmargin: 0,
        chartbottommargin: 0,
        chart: function () {
            V(this.dataObj.chart, {
                bgcolor: this.dataObj.chart.bgcolor || "#ffffff",
                bgalpha: this.dataObj.chart.bgalpha || "100"
            });
            return this.base.chart.apply(this, arguments)
        },
        series: function () {
            V(this.hcJSON, {
                legend: {
                    enabled: !1
                },
                chart: {
                    plotBackgroundColor: Ua,
                    plotBorderColor: Ua
                },
                series: [{
                    data: []
                }]
            })
        },
        spaceManager: function () {},
        creditLabel: ja
    }, z.bulb);
    z("funnel", {
        friendlyName: "Funnel Chart",
        standaloneInit: !0,
        defaultSeriesType: "funnel",
        sliceOnLegendClick: !0,
        defaultPlotShadow: 1,
        subTitleFontSizeExtender: 0,
        tooltippadding: 3,
        drawAnnotations: !0,
        isDataLabelBold: !1,
        formatnumberscale: 1,
        rendererId: "funnel",
        alignCaptionWithCanvas: 0,
        defaultPaletteOptions: Ea(V({}, wa), {
            paletteColors: A.defaultPaletteOptions.paletteColors
        }),
        preSeriesAddition: function (a, e) {
            var c = e.chart,
                d = this.colorManager,
                b = a.plotOptions.series.dataLabels;
            b.connectorWidth = h(c.smartlinethickness, 1);
            b.connectorColor = F(q(c.smartlinecolor,
                d.getColor("baseFontColor")), h(c.smartlinealpha, 100));
            h(c.showlegend, 0) ? (a.legend.enabled = !0, a.legend.reversed = !Boolean(h(c.reverselegend, 0))) : a.legend.enabled = !1;
            a.plotOptions.series.point.events.legendItemClick = c.interactivelegend === ib ? ub : function () {
                this.slice()
            }
        },
        series: function (a, e, c) {
            a.data && 0 < a.data.length && (a = this.point(c, {
                data: [],
                colorByPoint: !0,
                showInLegend: !0
            }, a.data, a.chart, e)) && e.series.push(a)
        },
        pointHoverOptions: function (a, e, c) {
            var d = h(a.showhovereffect, e.showhovereffect),
                b = {
                    enabled: d
                },
                f = {};
            void 0 === d && (d = b.enabled = void 0 !== q(a.hovercolor, e.plotfillhovercolor, a.hoveralpha, e.plotfillhoveralpha, a.borderhovercolor, e.plotborderhovercolor, a.borderhoverthickness, e.plotborderhoverthickness, a.borderhoveralpha, e.plotborderhoveralpha));
            if (d) {
                b.highlight = h(a.highlightonhover, e.highlightonhover);
                b.color = q(a.hovercolor, e.plotfillhovercolor);
                b.alpha = q(a.hoveralpha, e.plotfillhoveralpha, c.alpha);
                b.borderColor = q(a.borderhovercolor, e.plotborderhovercolor, c.borderColor);
                b.borderThickness = h(a.borderhoverthickness,
                    e.plotborderhoverthickness, c.borderWidth);
                b.borderAlpha = q(a.borderhoveralpha, e.plotborderhoveralpha, c.borderAlpha);
                0 !== b.highlight && void 0 === b.color && (b.highlight = 1);
                b.color = q(b.color, c.color).replace(/,+?$/, O);
                if (1 === b.highlight) {
                    a = b.color.split(/\s{0,},\s{0,}/);
                    e = a.length;
                    for (c = 0; c < e; c += 1) a[c] = Y(a[c], 70);
                    b.color = a.join(",")
                }
                f = {
                    color: b.color,
                    alpha: b.alpha,
                    borderColor: F(b.borderColor, b.borderAlpha),
                    borderWidth: b.borderThickness
                }
            }
            return {
                enabled: d,
                options: b,
                rolloverOptions: f
            }
        },
        point: function (a, e, c,
            d, b) {
            a = b[P];
            var f = 0,
                k = O,
                g = [],
                p = q(d.plotborderthickness, Jb),
                m = !0,
                l = !1,
                n = O,
                s = b.chart,
                r = this.isPyramid,
                t = h(d.showpercentintooltip, 1),
                u = h(d.showlabels, 1),
                B = h(d.showvalues, 1),
                L = h(d.showpercentvalues, d.showpercentagevalues, 0),
                w = q(d.tooltipsepchar, d.hovercapsepchar, Rb),
                T = q(d.labelsepchar, w),
                x = q(d.plotbordercolor, d.piebordercolor),
                y = this.smartLabel,
                D = this.numberFormatter,
                C = c.length,
                E, U = this.colorManager,
                s = s.issliced = h(d.issliced, 0),
                K = 0,
                ca = h(d.showvalueinlegend, 0),
                H = h(d.showlabelinlegend, 1),
                I = h(d.valuebeforelabelinlegend,
                    0),
                J = h(d.showvalueaspercentinlegend, 1),
                Ra = q(d.legendsepchar, ", "),
                Sb = b.plotOptions.series.dataLabels.style,
                N = {
                    apply: d.showshadow == Jb,
                    opacity: 1
                },
                Q, S, sb, M, ea, R, Z, X, aa, ba, pa, ga, ta, sa, xa;
            e.isPyramid = r;
            ta = e.streamlinedData = h(d.streamlineddata, 1);
            e.is2d = h(d.is2d, 0);
            e.isHollow = h(d.ishollow, ta ? 1 : 0);
            pa = h(d.percentofprevious, 0);
            ba = h(this.isPyramid ? d.pyramidyscale : d.funnelyscale);
            e.labelDistance = Math.abs(h(d.labeldistance, d.nametbdistance, 50));
            e.showLabelsAtCenter = h(d.showlabelsatcenter, 0);
            e.yScale = 0 <= ba && 40 >=
                ba ? ba / 200 : .2;
            u || B || (b.plotOptions.series.dataLabels.enabled = !1, !1 === b.tooltip.enabled && (m = !1));
            e.useSameSlantAngle = h(d.usesameslantangle, ta ? 0 : 1);
            for (b = 0; b < C; b += 1) Q = c[b], c[b].vline || (Q.cleanValue = ba = D.getCleanValue(Q.value, !0), null !== ba && (l = !0, xa = xa || ba, g.push(Q), f += ba, xa = Math.max(xa, ba)));
            if (l) {
                e.valueSum = f;
                c = D.dataLabels(f);
                C = g.length;
                !r && ta && g.sort(function (a, b) {
                    return b.cleanValue - a.cleanValue
                });
                r || ta || e.data.push({
                    showInLegend: !1,
                    y: f,
                    name: "",
                    shadow: N,
                    smartTextObj: E,
                    color: S,
                    alpha: sb,
                    borderColor: F(M,
                        ea),
                    borderWidth: p,
                    link: G(Q.link),
                    style: A.parsexAxisStyles(Q, {}, d, Sb, S),
                    displayValue: O,
                    doNotSlice: 0 === h(d.enableslicing, 1)
                });
                for (b = 0; b < g.length; b += 1) {
                    Q = g[b];
                    l = Q.cleanValue;
                    ga = b ? g[b - 1].value : l;
                    C = $(q(Q.label, Q.name, O));
                    E = y.getOriSize(C);
                    S = b && !r && ta ? b - 1 : b;
                    S = q(Q.color, U.getPlotColor(S));
                    sb = q(Q.alpha, d.plotfillalpha, Qa);
                    M = q(Q.bordercolor, x, Y(S, 25)).split(v)[0];
                    ea = 1 != d.showplotborder ? ib : q(Q.borderalpha, d.plotborderalpha, d.pieborderalpha, "80");
                    N.opacity = Math.max(sb, ea) / 100;
                    if (ba = h(Q.issliced, s)) K += 1, a.preSliced =
                        ba;
                    sa = r || !ta ? f : pa ? ga : xa;
                    m && (Z = D.percentValue(l / sa * 100), X = D.dataLabels(l) || O, R = 1 === u ? C : O, k = 1 === h(Q.showvalue, B) ? 1 === L ? Z : X : O, k = (aa = G($(Q.displayvalue))) ? aa : k !== O && R !== O ? R + T + k : q(R, k) || O, ta && (n = pa ? Z : D.percentValue(l / ga * 100)), R = G($(q(Q.tooltext, a.tooltext))), void 0 !== R ? R = Ya(R, [1, 2, 3, 7, 14, 24, 25, 37], {
                        formattedValue: X,
                        label: C,
                        percentValue: pa ? D.percentValue(l / xa * 100) : Z,
                        sum: c,
                        unformattedSum: f,
                        percentOfPrevValue: n
                    }, Q, d) : (R = 1 === t ? Z : X, R = C !== O ? C + w + R : R));
                    ga = H ? C : O;
                    ca && (sa = J ? D.legendPercentValue(l / sa * 100) : D.legendValue(l),
                        ga = I ? sa + (ga && Ra + ga) : (ga && ga + Ra) + sa);
                    sa = this.pointHoverOptions(Q, d, {
                        color: S,
                        alpha: sb,
                        borderColor: M,
                        borderAlpha: ea,
                        borderWidth: p
                    });
                    E = {
                        displayValue: k,
                        style: A.parsexAxisStyles(Q, {}, d, Sb, S),
                        categoryLabel: C,
                        toolText: R,
                        legendCosmetics: z.singleseries.parseLegendOptions(d, Q),
                        showInLegend: ga !== O,
                        y: l,
                        name: ga,
                        shadow: N,
                        smartTextObj: E,
                        color: S,
                        alpha: sb,
                        borderColor: F(M, ea),
                        borderWidth: p,
                        link: G(Q.link),
                        isSliced: ba,
                        doNotSlice: 0 === h(d.enableslicing, 1),
                        tooltipConstraint: this.tooltipConstraint,
                        hoverEffects: sa.enabled &&
                            sa.options,
                        rolloverProperties: sa.enabled && sa.rolloverOptions
                    };
                    b || r || !ta || (E.showInLegend = !1);
                    e.data.push(E)
                }
                f || (e.data = []);
                e.labelMaxWidth = 0;
                e.noOFSlicedElement = K;
                return e
            }
            return null
        },
        spaceManager: function (a, e, c, d) {
            var b = this.smartLabel,
                f = e.chart,
                k = a.chart,
                g = q(f.legendposition, qb).toLowerCase(),
                p = c - (k.marginRight + k.marginLeft);
            d -= k.marginTop + k.marginBottom;
            var m = this.isPyramid,
                l = 0,
                n = 0,
                s, r, t = a.series[0],
                u, B, L, w, T, x, y, D, C, E, U, K, ca, H, I, J, v, z, N, Q, A, G = k.marginLeft;
            if (t) {
                u = this._tempSnap = {
                    top3DSpace: 0,
                    bottom3DSpace: 0,
                    topLabelSpace: 0,
                    rightLabelSpace: 0
                };
                a.legend.enabled && (g === bb ? p -= this.placeLegendBlockRight(a, e, p / 2, d, !0) : d -= this.placeLegendBlockBottom(a, e, p, d / 2, !0));
                r = .1 * d;
                s = h(f.slicingdistance, r);
                r = s > 2 * r ? 0 : s;
                f = Math.min(2 * (d - r), p);
                k.marginTop += r / 2;
                k.marginBottom += r / 2;
                t.SlicingDistance = s;
                n = t.data;
                y = n.length;
                D = m ? 0 : 1;
                r = t.labelDistance + 3;
                s = t.showLabelsAtCenter;
                K = Math.min(f, .3 * p);
                w = p - K;
                ca = p - K - r;
                I = 0;
                J = (B = n[0]) && n[0].y ? n[0].y : 1;
                v = t.valueSum ? t.valueSum : 1;
                z = m ? 0 : 1;
                N = .8 / J;
                Q = 1 == t.useSameSlantAngle;
                U = (A = !m &&
                    !t.streamlinedData) ? n[0].y - n[1].y : 0;
                !m && B && n[0].displayValue && (C = n[0], B = a.plotOptions.series.dataLabels.style, H = h(Kb(parseFloat(B.lineHeight) + B.borderPadding + B.borderThickness), 10), b.setStyle(B), L = b.getSmartText(C.displayValue, p, H), C.displayValue = L.text, L.tooltext && (C.originalText = L.tooltext), C.labelWidht = b.getOriSize(L.text).width, k.marginTop += u.topLabelSpace = H + 4);
                for (; D < y; D += 1) C = n[D], B = C.style, H = h(Kb(parseFloat(B.lineHeight) + B.borderPadding + B.borderThickness), 10), b.setStyle(B), s ? b.getSmartText(C.displayValue,
                    p, H) : (x = m ? (B = U + C.y / 2) ? B / v : 1 : A ? .2 + N * U : C.y ? Q ? C.y / J : Math.sqrt(C.y / J) : 1, B = K * x, E = ca + (K - B) / 2, L = b.getSmartText(C.displayValue, E, H), C.displayValue = L.text, L.tooltext && (C.originalText = L.tooltext), I = Math.max(I, L.width), 0 < w && (L = 0 < L.width ? E - L.width : E + r, B = 1 / (x + 1) * (B + 2 * L + K), w = Math.min(w, B - K)), U += A ? -(n[D + 1] && n[D + 1].y || 0) : C.y);
                C && (T = m ? 1 : A ? .2 : C.y ? Q ? C.y / J : Math.sqrt(C.y / J) : 1);
                w = K + w;
                w > f && (w = f);
                U = A ? n[0].y - n[1].y : 0;
                if (!s)
                    for (D = m ? 0 : 1, y = n.length; D < y; D += 1) C = n[D], x = m ? (B = U + C.y / 2) ? B / v : 1 : A ? .2 + N * U : C.y ? Q ? C.y / J : ob(C.y / J) : 1, B = w * x,
                        E = ca + (K - B) / 2, L = b.getSmartText(C.displayValue, E, H), l = Aa(l, .5 * B + L.width + r), U += A ? -(n[D + 1] && n[D + 1].y || 0) : C.y;
                0 < I ? (u.rightLabelSpace = p - w, n = l - (.5 * c - k.marginRight), 0 < n && (k.marginRight += n, k.marginLeft -= n), a.legend.enabled && g === bb ? k.marginLeft < G && (k.marginLeft = G) : (k.marginRight += .5 * u.rightLabelSpace, k.marginLeft += .5 * u.rightLabelSpace), p -= a.title.alignWithCanvas ? u.rightLabelSpace : 0) : r = 0;
                t.labelDistance = t.connectorWidth = r;
                this.titleSpaceManager(a, e, p, d / 2);
                (s || !I) && f < p && (k.marginLeft += .5 * (p - f - r), k.marginRight +=
                    .5 * (p - f - r));
                t.is2d || (k.marginTop += u.top3DSpace = w * t.yScale * z / 2, k.marginBottom += u.bottom3DSpace = w * t.yScale * T / 2)
            }
        },
        updateSnapPoints: function () {
            z.gaugebase.updateSnapPoints.apply(this, arguments);
            var a = this.snapLiterals,
                e = this._tempSnap || {};
            a.plotwidth = a.canvaswidth;
            a.plotsemiwidth = a.canvaswidth / 2;
            a.plotheight = a.canvasheight + e.top3DSpace + e.bottom3DSpace;
            a.plotstartx = a.canvasstartx;
            a.plotstarty = a.canvasstarty - e.top3DSpace;
            a.plotendx = a.canvasendx;
            a.plotendy = a.canvasendy + e.bottom3DSpace;
            a.canvaswidth += e.rightLabelSpace;
            a.canvasheight = a.plotheight + e.topLabelSpace;
            a.canvasstarty = a.plotstarty - e.topLabelSpace;
            a.canvasendy = a.plotendy;
            a.canvasendx += e.rightLabelSpace
        },
        eiMethods: {
            sliceDataItem: function (a) {
                var e = this.jsVars.hcObj,
                    c;
                if (e && e.series && (c = e.series[0]) && c.data && c.data[a] && c.data[a].slice) return c.data[c.xIncrement - 1 - a].slice()
            }
        },
        useSortedData: !0,
        creditLabel: ja
    }, z.gaugebase);
    z("pyramid", {
        friendlyName: "Pyramid Chart",
        subTitleFontSizeExtender: 0,
        drawAnnotations: !0,
        standaloneInit: !0,
        defaultSeriesType: "pyramid",
        defaultPlotShadow: 1,
        useSortedData: !1,
        isPyramid: 1,
        creditLabel: ja,
        rendererId: "pyramid"
    }, z.funnel);
    z("sparkbase", {
        defaultPlotShadow: 0,
        useSortedData: !1,
        subTitleFontSizeExtender: 0,
        subTitleFontWeight: 0,
        drawAnnotations: !0,
        showYAxisValues: 0,
        numdivlines: 0,
        chartrightmargin: 3,
        chartleftmargin: 3,
        charttopmargin: 3,
        chartbottommargin: 3,
        decimals: 2,
        showTrendlineLabel: 0,
        zeroplanethickness: 0,
        tooltippadding: 1,
        useScaleRecursively: !0,
        showTrendlineLabels: 0,
        showAxisLimitGridLines: 0,
        styleApplicationDefinition_font: z.gaugebase.styleApplicationDefinition_font,
        defaultPaletteOptions: Ea(V({}, wa), {
            paletteColors: [["555555", "A6A6A6", "CCCCCC", "E1E1E1", "F0F0F0"], ["A7AA95", "C4C6B7", "DEDFD7", "F2F2EE"], ["04C2E3", "66E7FD", "9CEFFE", "CEF8FF"], ["FA9101", "FEB654", "FED7A0", "FFEDD5"], ["FF2B60", "FF6C92", "FFB9CB", "FFE8EE"]],
            bgColor: ["FFFFFF", "CFD4BE,F3F5DD", "C5DADD,EDFBFE", "A86402,FDC16D", "FF7CA0,FFD1DD"],
            bgAngle: [270, 270, 270, 270, 270],
            bgRatio: ["0,100", "0,100", "0,100", "0,100", "0,100"],
            bgAlpha: ["100", "60,50", "40,20", "20,10", "30,30"],
            canvasBgColor: ["FFFFFF", "FFFFFF", "FFFFFF",
"FFFFFF", "FFFFFF"],
            canvasBgAngle: [0, 0, 0, 0, 0],
            canvasBgAlpha: ["100", "100", "100", "100", "100"],
            canvasBgRatio: ["", "", "", "", ""],
            canvasBorderColor: ["BCBCBC", "BEC5A7", "93ADBF", "C97901", "FF97B1"],
            toolTipBgColor: ["FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF", "FFFFFF"],
            toolTipBorderColor: ["545454", "545454", "415D6F", "845001", "68001B"],
            baseFontColor: ["333333", "60634E", "025B6A", "A15E01", "68001B"],
            trendColor: ["666666", "60634E", "415D6F", "845001", "68001B"],
            plotFillColor: ["666666", "A5AE84", "93ADBF", "C97901", "FF97B1"],
            borderColor: ["767575",
"545454", "415D6F", "845001", "68001B"],
            borderAlpha: [50, 50, 50, 50, 50],
            periodColor: ["EEEEEE", "ECEEE6", "E6ECF0", "FFF4E6", "FFF2F5"],
            winColor: ["666666", "60634E", "025B6A", "A15E01", "FF97B1"],
            lossColor: ["CC0000", "CC0000", "CC0000", "CC0000", "CC0000"],
            drawColor: ["666666", "A5AE84", "93ADBF", "C97901", "FF97B1"],
            scorelessColor: ["FF0000", "FF0000", "FF0000", "FF0000", "FF0000"]
        }),
        preSeriesAddition: function (a, e) {
            var c = a.plotOptions.series.dataLabels.style,
                d = a.chart,
                b = e.chart,
                c = {
                    fontFamily: c.fontFamily,
                    fontSize: c.fontSize,
                    lineHeight: c.lineHeight,
                    fontWeight: c.fontWeight,
                    fontStyle: c.fontStyle
                },
                f, k, g, p;
            if ("sparkwinloss" == this.name && (f = e.data || e.dataset && e.dataset[0] && e.dataset[0].data, k = {
                    w: 1,
                    l: -1,
                    d: .1
                }, 0 < (g = f && f.length)))
                for (; g;) --g, p = f[g], p.value = k[p.value.toLowerCase()];
            d.borderWidth = h(b.showborder, this.showBorder, 0) ? h(b.borderthickness, 1) : 0;
            d.plotBorderWidth = h(b.canvasborderthickness, 1);
            f = d.openColor = ua(q(b.opencolor, "0099FF"));
            k = d.closeColor = ua(q(b.closecolor, "0099FF"));
            d.highColor = ua(q(b.highcolor, "00CC00"));
            d.lowColor =
                ua(q(b.lowcolor, "CC0000"));
            d.openHoverColor = F(ua(q(b.openhovercolor, b.anchorhovercolor, b.plotfillhovercolor, Y(f, 70))), h(b.openhoveralpha, b.anchorhoveralpha, b.plotfillhoveralpha, 100));
            d.closeHoverColor = F(ua(q(b.closehovercolor, b.anchorhovercolor, b.plotfillhovercolor, Y(k, 70))), h(b.closehoveralpha, b.anchorhoveralpha, b.plotfillhoveralpha, 100));
            d.highHoverColor = F(ua(q(b.highhovercolor, b.anchorhovercolor, b.plotfillhovercolor, Y(d.highColor, 70))), h(b.highhoveralpha, b.anchorhoveralpha, b.plotfillhoveralpha,
                100));
            d.lowHoverColor = F(ua(q(b.lowhovercolor, b.anchorhovercolor, b.plotfillhovercolor, Y(d.lowColor, 70))), h(b.lowhoveralpha, b.anchorhoveralpha, b.plotfillhoveralpha, 100));
            this.forceHoverEnable = q(b.openhovercolor, b.closehovercolor, b.highhovercolor, b.lowhovercolor, b.openhoveralpha, b.closehoveralpha, b.highhoveralpha, b.lowhoveralpha, b.winhovercolor, b.losshovercolor, b.drawhovercolor, b.scorelesshovercolor);
            a.chart.openValue = {
                style: V({}, c)
            };
            Ga(a.chart.openValue.style);
            a.chart.openValue.style.color = f;
            a.chart.closeValue = {
                style: V({}, c)
            };
            Ga(a.chart.openValue.style);
            a.chart.closeValue.style.color = k;
            a.chart.highLowValue = {
                style: V({}, c)
            };
            this.parseStyles(a);
            0 === this.showCanvas && (d.plotBackgroundColor = Ua);
            this.showCanvasBorder || (d.plotBorderWidth = 0);
            d.useRoundEdges || (d.plotShadow = 0);
            b.zeroplanethickness = q(b.zeroplanethickness, this.zeroplanethickness);
            delete b.yaxisname;
            delete b.xaxisname;
            b.showlabels = q(b.showlabels, ib)
        },
        spaceManager: function (a, e, c, d) {
            var b = a[P],
                f = this.smartLabel || b.smartLabel,
                k = e.chart,
                g = a.series[0],
                p =
                a.chart,
                m = c - (p.marginRight + p.marginLeft),
                l = h(k.canvasleftmargin),
                n = h(k.canvasrightmargin),
                s = a.valuePadding = h(k.valuepadding, 2),
                r = a.plotOptions.series.dataLabels.style,
                t = parseInt(r.lineHeight, 10),
                u = m,
                B = b = 0,
                L, w;
            if (g) {
                d = Fb(a, e, .7 * m, d, void 0, c, d, this);
                u -= d.left + d.right;
                m = c - (p.marginRight + p.marginLeft);
                w = L = g = 0;
                f.setStyle(r);
                ia(p.openValue.label) && (f.setStyle(p.openValue.style), t = h(parseInt(p.openValue.style.lineHeight, 10), 10), r = f.getSmartText(p.openValue.label, u, 1.5 * t), 0 < r.width && (b = g = r.width + s, u -= g));
                ia(p.closeValue.label) && (f.setStyle(p.closeValue.style), t = h(parseInt(p.closeValue.style.lineHeight, 10), 10), r = f.getSmartText(p.closeValue.label, u, 1.5 * t), 0 < r.width && (B = L = r.width + s, u -= L));
                ia(p.highLowValue.label) && (f.setStyle(p.highLowValue.style), t = h(parseInt(p.highLowValue.style.lineHeight, 10), 10), f = f.getSmartText(p.highLowValue.label, u, 1.5 * t), 0 < f.width && (B += w = f.width + s));
                p.marginRight += w + L;
                p.marginLeft += g;
                ia(l) ? (p.spacingLeft = p.marginLeft = l, p.spacingLeft -= d.left + g) : p.marginLeft += d.left;
                ia(n) ? (p.spacingRight =
                    p.marginRight = n, p.spacingRight -= d.right + w + L) : p.marginRight += d.right;
                this.xAxisMinMaxSetter(a, e, m);
                p = a.xAxis;
                n = p.min;
                m = p.max;
                l = h(k.periodlength, 0);
                k = F(q(k.periodcolor, this.colorManager.getColor("periodColor")), h(k.periodalpha, 100));
                s = 1;
                if (0 < l)
                    for (; n <= m; n += l) s ? (p.plotBands.push({
                        color: k,
                        from: n,
                        to: Math.min(m, n + l),
                        zIndex: 1
                    }), s = 0) : s = 1;
                Gb(a, e, c, b, B, this)
            }
        }
    }, Tb);
    z("sparkline", {
        friendlyName: "Spark Line Chart",
        standaloneInit: !0,
        defaultSeriesType: "line",
        rendererId: "sparkline",
        creditLabel: ja,
        showtooltip: 0,
        showCanvas: 0,
        point: z.linebase.point,
        lineThickness: 1,
        anchorRadius: 2,
        anchorBorderThickness: 0,
        postSeriesAddition: function (a, e) {
            var c = a.chart,
                d = e.chart,
                b = this.colorManager,
                f = a.series && a.series[0],
                k = f && a.series[0].data,
                g, p, m, l = this.highValue,
                n = this.lowValue,
                s = this.numberFormatter,
                r = c.openColor,
                t = c.closeColor,
                u = c.highColor,
                B = c.lowColor,
                L = c.openHoverColor,
                w = c.closeHoverColor,
                T = c.highHoverColor,
                x = c.lowHoverColor,
                y;
            y = ua(q(d.anchorcolor, b.getColor("plotFillColor")));
            var D = h(d.showopenanchor, d.drawanchors, d.showanchors,
                    1),
                C = h(d.showcloseanchor, d.drawanchors, d.showanchors, 1),
                E = h(d.showhighanchor, d.drawanchors, d.showanchors, 1),
                U = h(d.showlowanchor, d.drawanchors, d.showanchors, 1),
                K = h(d.anchoralpha, 100),
                ca, H = h(d.drawanchors, d.showanchors, 0),
                I = H ? h(d.anchoralpha, 100) : 0,
                J, v, A = 0,
                N = q(d.linecolor, b.getColor("plotFillColor")),
                z = h(d.linealpha, 100),
                S, G;
            if (0 < (b = g = k && k.length)) {
                p = e.data || e.dataset && e.dataset[0] && e.dataset[0].data;
                f.color = F(N, z);
                S = k[0] && k[0].y || O;
                for (G = k[b - 1] && k[b - 1].y || O; g;) --g, f = k[g], m = p[g], y = void 0, ca = h(f.anchorbgalpha,
                        K), f.color = F(q(m.color, N), h(m.alpha, z)), f.marker.fillColor = F(q(f.anchorbgcolor, y), h(f.anchorbgalpha, I)), y = F(ua(q(d.anchorhovercolor, d.plotfillhovercolor, Y(N, 70))), h(d.lowhoveralpha, d.anchorhoveralpha, d.plotfillhoveralpha, 100)), h(d.anchorhoverradius, f.marker.radius), f.marker.enabled = !!H, f.y == n && (y = q(f.anchorbgcolor, B), f.marker.fillColor = F(y, ca), y = x, f.marker.enabled = !!U, v = s.dataLabels(f.y)), f.y == l && (y = q(f.anchorbgcolor, u), f.marker.fillColor = F(y, ca), y = T, f.marker.enabled = !!E, J = s.dataLabels(f.y)), void 0 !==
                    f.toolText && (f.toolText = Ya(f.toolText, [54, 55, 56, 57, 58, 59, 60, 61], {
                        openDataValue: s.dataLabels(S),
                        closeDataValue: s.dataLabels(G),
                        highDataValue: s.dataLabels(l),
                        lowDataValue: s.dataLabels(n),
                        openValue: S,
                        closeValue: G,
                        highValue: l,
                        lowValue: n
                    }, {}, d)), h(m.showvalue, d.showvalue, d.showvalues, 0) || (f.displayValue = O), ia(f.y) && (A = 1), m = f.hoverEffects, f.marker.enabled && m && (m.anchorColor = y, m = f.rolloverProperties, m.radius = h(d.anchorhoverradius, f.marker.radius), m.lineWidth = 0, m.lineColor = m.fillColor = y);
                f = k[0];
                f.marker.fillColor =
                    F(q(f.anchorbgcolor, r), ca);
                f.marker.enabled = !!D;
                m = f.hoverEffects;
                f.marker.enabled && m && (m.anchorColor = L, m = f.rolloverProperties, m.radius = h(d.anchorhoverradius, f.marker.radius), m.lineWidth = 0, m.lineColor = m.fillColor = L);
                r = s.dataLabels(f.y);
                f.y == n && U && (f.marker.fillColor = F(q(f.anchorbgcolor, B), ca), f.marker.enabled = !!U);
                f.y == l && E && (f.marker.fillColor = F(q(f.anchorbgcolor, u), ca), f.marker.enabled = !!E);
                f = k[b - 1];
                f.marker.fillColor = F(q(f.anchorbgcolor, t), ca);
                f.marker.enabled = !!C;
                m = f.hoverEffects;
                f.marker.enabled &&
                    m && (m.anchorColor = w, m = f.rolloverProperties, m.radius = h(d.anchorhoverradius, f.marker.radius), m.lineWidth = 0, m.lineColor = m.fillColor = w);
                k = s.dataLabels(f.y);
                f.y == n && U && (f.marker.fillColor = F(q(f.anchorbgcolor, B), ca), f.marker.enabled = !!U);
                f.y == l && E && (f.marker.fillColor = F(q(f.anchorbgcolor, u), ca), f.marker.enabled = !!E);
                c.openValue.label = c.closeValue.label = c.highLowValue.label = c.highLowValue.highLabel = void 0;
                A && (c.openValue.label = h(d.showopenvalue, 1) ? r : O, c.closeValue.label = h(d.showclosevalue, 1) ? k : O, h(d.showhighlowvalue,
                    1) && (c.highLowValue.label = "[" + J + " | " + v + "]", c.highLowValue.highLabel = J, c.highLowValue.lowLabel = v))
            }
        }
    }, z.sparkbase);
    z("sparkcolumn", {
        friendlyName: "Spark Column Chart",
        standaloneInit: !0,
        rendererId: "cartesian",
        defaultSeriesType: "column",
        creditLabel: ja,
        showCanvasBorder: !0,
        point: z.column2dbase.point,
        useFlatColor: !0,
        postSeriesAddition: function (a, e) {
            var c = e.chart,
                d = this.colorManager,
                b = a.series && a.series[0] && a.series[0].data,
                f, k, g, p, m = this.highValue,
                l = this.lowValue,
                n = this.numberFormatter,
                s = q(c.plotfillalpha,
                    Qa),
                r = q(c.plotfillcolor, d.getColor("plotFillColor")),
                t = q(c.plotborderalpha, Qa),
                u = q(c.plotbordercolor),
                B, L = q(c.highcolor, "000000"),
                w = q(c.lowcolor, "000000"),
                T = q(c.highbordercolor, u),
                x = q(c.lowbordercolor, u),
                y = h(c.showplotborder, 0) ? h(c.plotborderthickness, 1) : 0,
                D, C, E, U, K, ca;
            if (0 < (d = b && b.length))
                for (k = e.data || e.dataset && e.dataset[0] && e.dataset[0].data; d;) --d, f = b[d], g = k[d], D = q(g.color, r), C = q(g.alpha, s), E = q(g.bordercolor, u), U = q(g.borderalpha, t), K = q(g.ratio, c.plotfillratio), ca = q(360 - c.plotfillangle, 90), f.y ==
                    m && (D = q(g.color, L), E = q(g.bordercolor, T), p = f.hoverEffects) && (p.color = q(g.hovercolor, c.highhovercolor, c.plotfillhovercolor, Y(D, 70)), p.borderColor = q(g.borderhovercolor, c.highborderhovercolor, c.plotborderhovercolor, E), p.colorArr = p = this.getColumnColor(g, p.color, q(g.hoveralpha, c.highhoveralpha, c.plotfillhoveralpha, C), p.borderColor, U, K, ca, a.chart.useRoundEdges), B = f.rolloverProperties, B.color = p[0], B.borderColor = p[1]), f.y == l && (D = q(g.color, w), E = q(g.bordercolor, x), p = f.hoverEffects) && (p.color = q(g.hovercolor,
                        c.lowhovercolor, c.plotfillhovercolor, Y(D, 70)), p.borderColor = q(g.borderhovercolor, c.lowborderhovercolor, c.plotborderhovercolor, E), p.colorArr = p = this.getColumnColor(g, f.hoverEffects.color, q(g.hoveralpha, c.lowhoveralpha, c.plotfillhoveralpha, C), f.hoverEffects.borderColor, U, K, ca, a.chart.useRoundEdges), B = f.rolloverProperties, B.color = p[0], B.borderColor = p[1]), void 0 !== f.toolText && (f.toolText = Ya(f.toolText, [56, 57, 60, 61], {
                            highValue: m,
                            lowValue: l,
                            highDataValue: n.dataLabels(m),
                            lowDataValue: n.dataLabels(l)
                        }, {},
                        c)), p = this.getColumnColor(g, D, C, E, U, K, ca, a.chart.useRoundEdges), f.color = p[0], f.borderColor = p[1], f.borderWidth = y, h(g.showvalue, c.showvalue, c.showvalues, 0) || (f.displayValue = O)
        },
        getColumnColor: function (a, e, c, d, b, f, k, g, p, m) {
            var l;
            d = q(d, ha(e, 60));
            l = e.split(v);
            a = c.split(v);
            d = d.split(v);
            b = b.split(v);
            m ? p = {
                FCcolor: {
                    color: l[0],
                    alpha: a[0]
                }
            } : g ? (e = l[0], c = a[0], p = {
                FCcolor: {
                    color: ha(e, 75) + v + Y(e, 25) + v + ha(e, 80) + v + Y(e, 65) + v + ha(e, 80),
                    alpha: c + v + c + v + c + v + c + v + c,
                    ratio: "0,10,13,57,20",
                    angle: p ? "-180" : "0"
                }
            }, d = [ha(e, 70)]) : (c =
                Ab(c, l.length), p = {
                    FCcolor: {
                        color: e,
                        alpha: c,
                        ratio: f,
                        angle: p ? 180 - k : k
                    }
                });
            return [p, {
                FCcolor: {
                    color: d[0],
                    alpha: b[0]
                }
            }]
        }
    }, z.sparkbase);
    z("sparkwinloss", {
        friendlyName: "Spark Win-Loss Chart",
        standaloneInit: !0,
        defaultSeriesType: "column",
        rendererId: "sparkwinloss",
        creditLabel: ja,
        showCanvasBorder: !1,
        showCanvas: 0,
        showtooltip: 0,
        postSeriesAddition: function (a, e) {
            var c = a.chart,
                d = e.chart,
                b = this.colorManager,
                f = a.series && a.series[0] && a.series[0].data,
                k = q(d.plotfillalpha, Qa),
                g = q(d.plotfillcolor, b.getColor("plotFillColor")),
                p = q(d.plotborderalpha, Qa),
                m = q(d.plotbordercolor),
                l = h(d.showplotborder, 0) ? h(d.plotborderthickness, 1) : 0,
                n = q(d.wincolor, b.getColor("winColor")),
                s = q(d.losscolor, b.getColor("lossColor")),
                r = q(d.drawcolor, b.getColor("drawColor")),
                b = q(d.scorelesscolor, b.getColor("scorelessColor")),
                t = d.winhovercolor,
                u = d.losshovercolor,
                B = d.drawhovercolor,
                L = d.scorelesshovercolor,
                w = O,
                T, x, y, D, C, E, U = 0,
                K = 0,
                ca = 0;
            x = a.yAxis[0];
            var H, I, J, v, A, N;
            a.tooltip.enabled = !1;
            x.min = -1.1;
            x.max = 1.1;
            if (0 < (v = f && f.length)) {
                for (A = e.data || e.dataset &&
                    e.dataset[0] && e.dataset[0].data; v;) {
                    --v;
                    H = f[v];
                    N = A[v];
                    switch (N.value) {
                        case 1:
                            w = q(N.color, n, g);
                            T = q(N.hovercolor, t, w);
                            U += 1;
                            break;
                        case -1:
                            w = q(N.color, s, g);
                            T = q(N.hovercolor, u, w);
                            K += 1;
                            break;
                        case .1:
                            w = q(N.color, r, g), T = q(N.hovercolor, B, w), ca += 1
                    }
                    1 == N.scoreless && (w = q(N.color, b, g), T = q(N.hovercolor, L, N.color, b, T));
                    x = q(N.alpha, k);
                    y = q(N.bordercolor, m);
                    D = q(N.borderalpha, p);
                    C = q(N.ratio, d.plotfillratio);
                    E = q(360 - d.plotfillangle, 90);
                    J = this.getColumnColor(N, w, x, y, D, C, E, a.chart.useRoundEdges);
                    H.color = J[0];
                    H.borderColor =
                        J[1];
                    H.borderWidth = l;
                    h(N.showvalue, 0) || (H.displayValue = O);
                    if (I = H.hoverEffects) H = H.rolloverProperties, I.color = Y(T, 70), J = I.colorArr = this.getColumnColor(N, I.color, x, y, D, C, E, a.chart.useRoundEdges), H.color = J[0], H.borderColor = J[1], I.borderThickness = l, H.borderWidth = l
                }
                1 == h(d.showvalue, 1) && (c.closeValue.style = V({}, a.plotOptions.series.dataLabels.style), c.closeValue.label = U + "-" + K + (0 < ca ? "-" + ca : O))
            }
        }
    }, z.sparkcolumn);
    kb = {
        realtimeEnabled: !0,
        canvasPaddingModifiers: null,
        linearDataParser: z.gaugebase.linearDataParser,
        eiMethods: Ea({}, z.gaugebase.eiMethods),
        decimals: 2,
        prepareRealtimeValueText: function () {
            var a = this.hcJSON,
                e = this.hcJSON[P],
                c = e.rtLabel,
                d = a.chart.realtimeValueSeparator,
                b = new RegExp(d + "$", "g");
            c && c.label && (d = e.realtimeValues.join(d).replace(b, O), e = h(parseInt(e.outCanvasStyle.fontSize, 10), 10), c.label.y = .8 * e + (a.xAxis.title.margin || 0), c.label.text = d, a.xAxis.plotLines && (a.xAxis.plotLines[0] = c))
        },
        chart: function () {
            var a = this.dataObj.chart,
                e = this.numberFormatter,
                c, d, b, f = h(a.showrealtimevalue, 1),
                k = h(a.realtimevaluepadding),
                g, p, a = this.dataObj.chart;
            a.adjustdiv = "0";
            f && (a.xaxisname = a.xaxisname ? "<br/>" + a.xaxisname : "<br/>");
            c = z.msareabase.chart.apply(this, arguments);
            b = c.chart;
            d = c[P];
            g = c.series;
            d.isDual ? (d._userPMin = h(a.pyaxisminvalue), d._userPMax = h(a.pyaxismaxvalue), d._userSMin = h(a.syaxisminvalue), d._userSMax = h(a.syaxismaxvalue)) : (d._userMin = h(a.yaxisminvalue), d._userMax = h(a.yaxismaxvalue));
            b.dataStreamURL = q(a.datastreamurl, "");
            b.refreshInterval = h(a.refreshinterval, 1);
            b.updateInterval = h(a.updateinterval, b.refreshInterval);
            b.clearInterval = h(a.clearchartinterval, 0);
            b.dataStamp = a.datastamp;
            b.useMessageLog = h(a.usemessagelog, 0);
            b.messageLogWPercent = Ka(h(a.messagelogwpercent, 80), 100);
            b.messageLogHPercent = Ka(h(a.messageloghpercent, 70), 100);
            b.messageLogShowTitle = h(a.messagelogshowtitle, 1);
            b.messageLogTitle = q(a.messagelogtitle, "Message Log");
            b.messageLogColor = q(a.messagelogcolor, "#fbfbfb");
            b.messageGoesToJS = h(a.messagegoestojs, 0);
            b.messageGoesToLog = h(a.messagegoestolog, 1);
            b.messageJSHandler = q(a.messagejshandler, "");
            b.messagePassAllToJS =
                h(a.messagepassalltojs, 0);
            b.messageLogIsCancelable = h(a.messagelogiscancelable, 1);
            b.alwaysShowMessageLogMenu = h(a.alwaysshowmessagelogmenu, b.useMessageLog);
            b.showRTMenuItem = h(a.showrtmenuitem, 0);
            b.showRealtimeValue = f;
            b.realtimeValueSeparator = q(a.realtimevaluesep, ", ");
            b.realtimeValuePadding = k;
            b.realtimeValueFont = q(a.realtimevaluefont, "");
            b.realtimeValueFontBold = q(a.realtimevaluefontbold, 0);
            b.realtimeValueFontColor = q(a.realtimevaluefontcolor, "");
            b.realtimeValueFontSize = h(a.realtimevaluefontsize, "");
            if (f) {
                if (!d.realtimeValues)
                    for (d.realtimeValues = [], f = 0, k = g.length; f < k; f++) a = g[f], p = (p = a.data) && p.length && p[p.length - 1] && p[p.length - 1].y, d.realtimeValues[f] = e.dataLabels(p, a.yAxis);
                d.rtLabel || (e = V({}, d.outCanvasStyle), e.fontWeight = b.realtimeValueFontBold ? "bold" : "normal", b.realtimeValueFontColor && (e.color = b.realtimeValueFontColor.replace(jb, mb)), b.realtimeValueFontSize && (e.fontSize = b.realtimeValueFontSize + nb), b.realtimeValueFont && (e.fontFamily = b.realtimeValueFont), g = h(parseInt(e.fontSize, 10), 10), d.rtLabel = {
                    color: ka,
                    alwaysVisible: !0,
                    isTrend: !0,
                    value: (d.x.catCount - 1) / 2,
                    width: .01,
                    label: {
                        align: La,
                        textAlign: La,
                        rotation: 0,
                        textVAlign: Ma,
                        text: " ",
                        x: 0,
                        y: .8 * g + (c.xAxis.title.margin | 0),
                        style: e
                    }
                }, c.xAxis.plotLines.splice(0, 0, d.rtLabel))
            }
            b.showRTMenuItem ? (c.callbacks || (c.callbacks = [])).push(this.drawRTMenuButtons) : b.useMessageLog && b.alwaysShowMessageLogMenu && b.messageGoesToLog && (c.callbacks || (c.callbacks = [])).push(this.drawMLMenuButtons);
            this.dataObj.alerts && (this.hcJSON.alerts = this.parseAlertObj(this.dataObj.alerts));
            return c
        },
        parseAlertObj: function (a) {
            var e = this.numberFormatter,
                c = a && a.alert,
                d = c.length,
                b = {
                    alert: []
                },
                f, k, g, p, m;
            for (a = 0; a < d; a += 1) p = c[a], f = e.getCleanValue(p.minvalue), k = e.getCleanValue(p.maxvalue), g = q(p.action, ""), p = q(p.param, ""), null !== f && null !== k && "" !== g && (f > k && (m = k, k = f, f = m), b.alert.push({
                minvalue: f,
                maxvalue: k,
                param: p,
                action: g
            }));
            return b
        },
        drawMLMenuButtons: function () {
            var a = this.options,
                e = a.chart,
                c = this.menu || (this.menu = []),
                d = this.toolbar,
                a = a[P],
                b;
            c.push(b = va({
                chart: this,
                basicStyle: a && a.outCanvasStyle ||
                    this.outCanvasStyle || {},
                items: [{
                    text: "Show Log",
                    visibility: "hidden",
                    onclick: function () {
                        A && A.messageLogger && A.messageLogger.open();
                        b.showItem(4);
                        b.hideItem(3)
                    }
                }, {
                    text: "Hide Log",
                    visibility: "hidden",
                    onclick: function () {
                        A && A.messageLogger && A.messageLogger.close();
                        b.showItem(3);
                        b.hideItem(4)
                    }
                }],
                position: {
                    x: e.spacingLeft,
                    y: this.chartHeight - e.spacingBottom + (e.showFormBtn || e.showRestoreBtn ? 10 : -15)
                }
            }));
            b.hideItem(1);
            this.elements.configureButton = d.add("loggerIcon", function (a, c) {
                return function () {
                    b.visible ?
                        b.hide() : b.show({
                            x: a,
                            y: c + 1
                        })
                }
            }(), {
                x: e.spacingLeft,
                y: this.chartHeight - e.spacingBottom + (e.showFormBtn || e.showRestoreBtn ? 10 : -15),
                tooltip: "Show & Hide Message"
            })
        },
        drawRTMenuButtons: function () {
            var a = this.logic,
                e = a.chartInstance,
                c = this.options,
                d = c.chart,
                b = d && d.alwaysShowMessageLogMenu,
                f = this.menu || (this.menu = []),
                k = this.toolbar,
                c = (c = c[P]) && c.outCanvasStyle || this.outCanvasStyle || {},
                g, p = e.isUpdateActive || a.eiMethods.isUpdateActive,
                p = p && p.call(e);
            f.push(g = va({
                chart: this,
                basicStyle: c,
                items: [{
                    text: "Stop Update",
                    visibility: p ? xb : "hidden",
                    onclick: function () {
                        g.hideItem(0);
                        g.showItem(1);
                        e.stopUpdate()
                    }
                }, {
                    text: "Start Update",
                    visibility: p ? "hidden" : xb,
                    onclick: function () {
                        g.hideItem(1);
                        g.showItem(0);
                        e.restartUpdate()
                    }
                }, {
                    text: "Clear Chart",
                    onclick: function () {
                        e.clearChart()
                    }
                }, {
                    text: "Show Log",
                    visibility: "hidden",
                    onclick: function () {
                        A && A.messageLogger && A.messageLogger.open();
                        g.showItem(4);
                        g.hideItem(3)
                    }
                }, {
                    text: "Hide Log",
                    visibility: "hidden",
                    onclick: function () {
                        A && A.messageLogger && A.messageLogger.close();
                        g.showItem(3);
                        g.hideItem(4)
                    }
                }],
                position: {
                    x: d.spacingLeft,
                    y: this.chartHeight - d.spacingBottom + (d.showFormBtn || d.showRestoreBtn ? 10 : -15)
                }
            }));
            h(a.dataObj.chart.allowclear, 1) || g.hideItem(2);
            g.hideItem(0);
            g.hideItem(1);
            !b && g.hideItem(3);
            g.hideItem(4);
            g.showItem(p ? 0 : 1);
            this.elements.configureButton = k.add("configureIcon", function (a, b) {
                return function () {
                    g.visible ? g.hide() : g.show({
                        x: a,
                        y: b + 1
                    })
                }
            }(), {
                x: d.spacingLeft,
                y: this.chartHeight - d.spacingBottom + (d.showFormBtn || d.showRestoreBtn ? 10 : -15),
                tooltip: "Manage RealTime Update"
            })
        },
        shiftPlotLines: function (a, e, c, d) {
            var b, f, k = [],
                g = d[0],
                p = g && g.RTValueArr,
                m = p && p.length || 0,
                l = (d = d[1]) && d.RTValueArr,
                n = l && l.length || 0,
                s = a && a.length || 0,
                r;
            c = h(c, -.5);
            for (r = 0; r < s; r += 1)
                if (b = a[r], b.isGrid || b.isVline)
                    if (f = b.value += e, f < c || f === c && b.isVline) a.splice(r, 1), b.isGrid && k.push(b), --r, --s;
            if (g && p && m)
                for (p.splice(0, -e), m = p.length, delete g.min, delete g.max, r = 0; r < m; r += 1)(a = p[r]) && void 0 !== a.min && (!1 === g.min < a.min && (g.min = a.min), !1 === g.max > a.max && (g.max = a.max));
            if (d && l && n)
                for (l.splice(0, -e), n = l.length, delete d.min,
                    delete d.max, r = 0; r < n; r += 1)(a = l[r]) && void 0 !== a.min && (!1 === d.min < a.min && (d.min = a.min), !1 === d.max > a.max && (d.max = a.max));
            return k
        },
        configureAxis: function (a) {
            var e = a[P],
                c = a.xAxis,
                d = e.x,
                b = e.axisGridManager,
                f = d.catCount,
                k = e.oriCatTmp,
                g = e[0],
                p = g && g.RTValueArr,
                m = e[1],
                l = m && m.RTValueArr,
                n = this.dataObj,
                s = n.chart || (n.chart = {}),
                n = a.series,
                r = n[0].data.length,
                s = this.numDisplaySets = h(s.numdisplaysets, Aa(r, 15)),
                t = c.plotLines,
                u = t && t.length || 0,
                B = [],
                q = this.chartInstance.jsVars._reflowData,
                w;
            q.hcJSON && (w = q.hcJSON[P]) &&
                (g.min = w[0] && w[0].min, g.max = w[0] && w[0].max, m.min = w[1] && w[1].min, m.max = w[1] && w[1].max);
            m = ((this.dataObj.categories || (this.dataObj.categories = [{
                category: []
            }]))[0] || (this.dataObj.categories[0] = {
                category: []
            })).category || (this.dataObj.categories[0].category = []);
            0 === f && (this.chartInstance.jsVars._forceReflow = !0);
            g = s - r;
            if (0 < g) {
                for (; u--;) t[u].value += g;
                for (c.plotLines = []; g--;) B[g] = {
                    y: null
                }, b.addXaxisCat(c, g, g, " ", {}, {}, {}), p && p.unshift(null), l && l.unshift(null), k.unshift(null), m.unshift({
                    label: " "
                });
                c.plotLines =
                    c.plotLines.reverse().concat(t)
            } else g && (this.shiftPlotLines(c.plotLines, g, -.5, e), k.splice(0, -g));
            for (g = n.length; g--;) c = n[g], e = c.data, c.data = B.concat(e.slice(-s));
            this.needsRedraw = 0 === f;
            d.catCount = s;
            return z.msareabase.configureAxis && z.msareabase.configureAxis.apply(this, arguments)
        },
        postSeriesAddition: function (a, e, c, d, b) {
            e = a[P];
            c = e.isBar;
            d = a.chart.rotateValues && !c ? 270 : 0;
            var f = e[0],
                k = f.RTValueArr,
                g = f && f.stacking100Percent,
                p, m, l, n, h, r, t, u, B;
            if (this.isStacked && k && (e.showStackTotal || g))
                for (b = b || 0, r = a.series,
                    t = V({}, a.plotOptions.series.dataLabels.style), u = parseFloat(t.fontSize), B = !f.stacking100Percent, t.color = a.plotOptions.series.dataLabels.color, f = k.length; b < f; b += 1)
                    if (m = k[b])
                        if (h = (m.n || 0) + (m.p || 0), e.showStackTotal && (p = b, m = 0 > h ? m.n : m.p, a.xAxis.plotLines.push({
                                value: p,
                                width: 0,
                                isVline: B,
                                isTrend: !B,
                                zIndex: 4,
                                _isStackSum: 1,
                                _catPosition: b,
                                label: {
                                    align: La,
                                    textAlign: 270 === d ? 0 > h ? bb : Ia : La,
                                    offsetScale: B ? m : void 0,
                                    offsetScaleIndex: 0,
                                    rotation: d,
                                    style: t,
                                    verticalAlign: Ma,
                                    y: c ? 0 : 0 > h ? 270 === d ? 4 : u : -4,
                                    x: 0,
                                    text: e.numberFormatter.yAxis(h)
                                }
                            })),
                            g)
                            for (m = 0, p = r.length; m < p; m += 1)
                                if (r[m].data) {
                                    l = r[m].data[b];
                                    if (l.y || 0 === l.y) n = l.y / h * 100, l.y = n, l.showPercentValues && (l.displayValue = this.numberFormatter.percentValue(n)), l.showPercentInToolTip && (l.toolText = l.toolText + parseInt(100 * n, 10) / 100 + "%");
                                    if (l.previousY || 0 === l.previousY) l.previousY = l.previousY / h * 100
                                }
        },
        pointValueWatcher: function (a, e, c, d, b) {
            if (null !== e) {
                var f = a[P];
                a = f[c || (c = 0)];
                var k;
                a || (a = f[c] = {});
                c = a.RTValueArr;
                c || (c = a.RTValueArr = []);
                (f = c[b]) || (f = c[b] = {});
                d && (0 <= e ? f.p ? (k = f.p, e = f.p += e) : f.p = e : f.n ?
                    (k = f.n, e = f.n += e) : f.n = e);
                !1 === f.max > e && (f.max = e, !1 === a.max > e && (a.max = e));
                !1 === f.min < e && (f.min = e, !1 === a.min < e && (a.min = e));
                return k
            }
        },
        realtimeUpdate: function (a, e) {
            var c = this.hcJSON,
                d = this.dataObj,
                b = d.chart,
                f = "0" === b.allowclear ? 0 : 1,
                k = c[P],
                g = this.numberFormatter,
                p = k.x,
                m = p._labelY,
                l = p._labelX,
                n = p._yShipment,
                s = p._isStagger,
                r = p._rotation,
                t = p._textAlign,
                u = p._adjustedPx,
                B = p._staggerLines,
                q = p._labelHeight,
                w, T = k.axisGridManager,
                x = p.catCount,
                y = this.renderer,
                D = this.chartInstance.jsVars,
                C = a.values,
                E = a.labels || [],
                U = a.showLabels || [],
                K = a.colors,
                v = a.toolTexts,
                H = a.links,
                I = c.xAxis,
                J = "0" === d.chart.showlabels,
                z = c.chart.showRealtimeValue,
                F = d.categories,
                N = D._reflowData,
                Q = [],
                S = h(k._startIndex, 0),
                R = p.stepValue,
                p = a.dimension > x ? x : a.dimension,
                M = x - p,
                Q = [],
                ea = a.vlines,
                Y = A.placeHorizontalAxis,
                Z, X, aa, ba, pa, ga, ta, sa, xa, Sa, cb = new Date,
                Oa, tb, gb, hb, Fa, W;
            a.clear && f && this.realtimeUpdate({
                dimension: this.numDisplaySets,
                values: [],
                labels: []
            }, 0 < a.dimension);
            if (a.dimension) {
                c.plotOptions.series.animation = !1;
                ea ? (Z = a.vlineColors || [], X = a.vlineLabels || [], aa = a.vlineThickness || [], ba = a.vlineDashed || []) : ea = [];
                F || (F = d.categories = []);
                F[0] ? F[0].category || (F[0].category = []) : F[0] = {
                    category: []
                };
                F = F[0].category;
                Q = this.shiftPlotLines(I.plotLines, -p, -.5, k);
                for (f = Q.length; f--;)(Sa = Q[f]).label && (pa = Sa.label, pa.text = "0" === U[f] || J ? "" : $(E[f] || O), w = M + f, Sa.value = w, ta = x + f + S, (w = 0 === ta % R) ? (pa.style = I.labels.style, pa.y = s ? m + ta / R % B * q : n, pa.x = l + (r ? u : 0), pa.rotation = r, pa.textAlign = t) : pa.style = I.steppedLabels.style, I.plotLines.push(V({}, Sa)), F.shift(), F.push({
                        label: pa.text
                    })),
                    "1" === ea[f] && T.addVline(I, {
                        color: Z[f] && decodeURIComponent(Z[f]),
                        label: X[f] && decodeURIComponent(X[f]),
                        thickness: aa[f] && decodeURIComponent(aa[f]),
                        dashed: ba[f] && decodeURIComponent(ba[f])
                    }, M + f, c);
                Q = [];
                k._startIndex = (p + S) % (s ? R * B : R);
                S = c.series && c.series.length;
                p && k.oriCatTmp.splice(0, p);
                k._skipValueWatcher = !1;
                for (f = 0; f < S; f += 1) {
                    Z = c.series[f];
                    aa = C && C[f] || [];
                    ba = K && K[f] || [];
                    R = H && H[f] || [];
                    M = v && v[f] || [];
                    U = Z.yAxis || 0;
                    k._rtCounter || (k._rtCounter = 1);
                    !Q[f] && (Q[f] = []);
                    T = Q[f];
                    X = Z.data;
                    ga = X.length;
                    J = ga - p;
                    for (F = 0; J <
                        ga; J += 1, F += 1) ea = decodeURIComponent(G(aa[F], null)), xa = g.getCleanValue(ea), pa = decodeURIComponent(E[F] || ""), k.oriCatTmp[J] = pa, X.shift(), ea = Z._dataParser({
                        value: ea,
                        label: pa,
                        color: ba && ba[F] && decodeURIComponent(ba[F]),
                        link: R && R[F] && decodeURIComponent(R[F]),
                        tooltext: M && M[F] && decodeURIComponent(M[F])
                    }, J, xa), ea.y = xa, X.push(ea), T.push(ea), ea.previousY = this.pointValueWatcher(c, xa, U, this.isStacked, J);
                    z && (k.realtimeValues[f] = g.dataLabels(xa, Z.yAxis))
                }
                k._rtCounter += p;
                this.postSeriesAddition(c, void 0, void 0, void 0,
                    ga - p);
                g = c.yAxis[0];
                C = k[0];
                v = h(this.isStacked ? 0 : this.setAdaptiveYMin, b.setadaptiveymin, 0);
                K = E = !v;
                H = (g.max - g.min) / 4;
                if (k.isDual) {
                    if (C.max > g.max || C.min < g.min || (!K || 0 !== g.min) && g.min !== k._userPMin && C.min - g.min > H || (!E || 0 !== g.max) && g.max !== k._userPMax && g.max - C.max > H) D._forceReflow = !0, k._skipValueWatcher = !0;
                    g = c.yAxis[1];
                    C = k[1];
                    K = E = !h(b.setadaptivesymin, v);
                    H = (g.max - g.min) / 4;
                    if (C.max > g.max || C.min < g.min || (!K || 0 !== g.min) && g.min !== k._userSMin && C.min - g.min > H || (!E || 0 !== g.max) && g.max !== k._userSMax && g.max - C.max >
                        H) D._forceReflow = !0, k._skipValueWatcher = !0
                } else if (C.max > g.max || C.min < g.min || (!K || 0 !== g.min) && g.min !== k._userMin && C.min - g.min > H || (!E || 0 !== g.max) && g.max !== k._userMax && g.max - C.max > H) D._forceReflow = !0, k._skipValueWatcher = !0;
                Oa = k[0] && k[0].RTValueArr;
                tb = k[1] && k[1].RTValueArr;
                D._forceReflow && (g = c.yAxis[0], C = k[0], gb = k[0] && k[0].min, hb = k[0] && k[0].max, Fa = k[1] && k[1].min, W = k[1] && k[1].max, S = g.min, Z = g.max, H = h(k.numdivlines, b.numdivlines, this.numdivlines, 4), ga = b.adjustdiv !== ib, xa = h(k._userMax, k._userPMax), f = h(k._userMin,
                    k._userPMin), T = h(b.showyaxisvalues, b.showyaxisvalue, 1), U = h(b.showlimits, T), J = h(b.showdivlinevalue, b.showdivlinevalues, T), F = h(parseInt(b.yaxisvaluesstep, 10), parseInt(b.yaxisvaluestep, 10), 1), F = 1 > F ? 1 : F, this.axisMinMaxSetter(g, C, xa, f, E, K, H, ga), g.plotLines = [], g.plotBands = [], g.labels.enabled = g.labels._enabled, g.gridLineWidth = g._gridLineWidth, g.alternateGridColor = g._alternateGridColor, this.configurePlotLines(b, c, g, C, U, J, F, k.numberFormatter, !1), S === g.min && Z === g.max && (sa = !0), k.isDual ? (xa = k._userSMax, f = k._userSMin,
                    v = h(b.setadaptivesymin, v), K = E = !v, U = h(b.showsecondarylimits, U), J = h(b.showdivlinesecondaryvalue, T), g = c.yAxis[1], C = k[1], S = g.min, Z = g.max, this.axisMinMaxSetter(g, C, xa, f, E, K, H, ga), g.plotLines = [], g.plotBands = [], g.labels.enabled = g.labels._enabled, g.gridLineWidth = g._gridLineWidth, g.alternateGridColor = g._alternateGridColor, this.configurePlotLines(b, c, g, C, U, J, F, k.numberFormatter, !0), S === g.min && Z === g.max && sa && (D._forceReflow = !1)) : sa && (D._forceReflow = !1), d.trendlines && ya(d.trendlines, c.yAxis, k, k.isDual, this.isBar));
                N.hcJSON && (b = N.hcJSON[P], delete N.hcJSON[P], V(c.series, N.hcJSON.series, !0), N.hcJSON[P] = b, b = null);
                V(N, {
                    preReflowAdjustments: function () {
                        this.dataObj.categories = d.categories
                    },
                    postReflowAdjustments: function () {
                        var a, b = c.series,
                            d = b && b.length;
                        this.hcJSON.xAxis.plotLines = I.plotLines;
                        this.hcJSON._FCconf[0].RTValueArr = Oa;
                        this.hcJSON._FCconf[1].RTValueArr = tb;
                        if (b)
                            for (a = 0; a < d; a += 1) this.hcJSON.series[a].data = b[a].data
                    },
                    postHCJSONCreation: function (a) {
                        V(a, {
                            _FCconf: {
                                0: {
                                    min: gb,
                                    max: hb
                                },
                                1: {
                                    min: Fa,
                                    max: W
                                },
                                _skipValueWatcher: !0,
                                realtimeValues: k.realtimeValues,
                                rtvHTMLWrapper: k.rtvHTMLWrapper
                            }
                        }, !0)
                    },
                    hcJSON: {
                        _FCconf: {
                            _userMax: k._userMax,
                            _userMin: k._userMin,
                            _userPMax: k._userPMax,
                            _userSMax: k._userSMax,
                            _userPMin: k._userPMin,
                            _userSMin: k._userSMin,
                            _chartState: k._chartState,
                            _rtCounter: k._rtCounter,
                            _startIndex: k._startIndex,
                            oriCatTmp: k.oriCatTmp,
                            x: {
                                catCount: x,
                                _labelY: m,
                                _labelX: l,
                                _yShipment: n,
                                _isStagger: s,
                                _rotation: r,
                                _textAlign: t,
                                _adjustedPx: u,
                                _staggerLines: B,
                                _labelHeight: q
                            },
                            0: {
                                min: h(gb, k[0] && k[0].min),
                                max: h(hb, k[0] && k[0].max)
                            },
                            1: {
                                min: h(Fa,
                                    k[1] && k[1].min),
                                max: h(W, k[1] && k[1].max)
                            }
                        }
                    }
                }, !0);
                if (!e) {
                    D._forceReflow && (D._forceReflow = !1, g = c.yAxis[0], m = g.plotBands.concat(g.plotLines), za(g, m), y.yAxis[0].realtimeUpdateY(g.min, g.max), k.isDual && (g = c.yAxis[1], m = g.plotBands.concat(g.plotLines), za(g, m), y.yAxis[1].realtimeUpdateY(g.min, g.max)), this.containerElement.resizeTo());
                    Y.call(this, c.xAxis, k.x, c, this.dataObj, k.x._canvasWidth, k.x._availableHeight, k.x._minCanvasWidth);
                    z && this.prepareRealtimeValueText();
                    y.xAxis[0].realtimeUpdateX(p);
                    f = 0;
                    for (J = Q.length; f <
                        J; f += 1) y.plots[f] && y.plots[f].realtimeUpdate && y.plots[f].realtimeUpdate(p, D._forceReflow);
                    this.realtimeDrawingLatency = new Date - cb
                }
            }
        },
        extractTrendLines: function (a) {
            var e = a.plotLines;
            a = a.plotBands;
            for (var c, d = e.length, b = [], f = []; d;) c = d - 1, c = e[c], c.isTrend && f.push(c), --d;
            for (d = a.length; d;) c = d - 1, e = a[c], e.isTrend && b.push(e), --d;
            return {
                trendLines: f,
                trendBands: b
            }
        }
    };
    Ea(kb.eiMethods, {
        clearChart: function (a) {
            a = a && a.toString && a.toString();
            this.feedData("clear=1");
            A.raiseEvent("ChartCleared", {
                source: a
            }, this.FusionCharts, [this.id, a])
        },
        getDataJSON: function () {
            return this.jsVars._rtLastUpdatedData || {
                values: []
            }
        },
        getData: function () {
            var a = this.jsVars.hcObj.options,
                e = a[P].oriCatTmp,
                c, d = [],
                b, f, k, g;
            if (!a || !a.series) return d;
            a = a.series;
            b = [];
            for (k = a.length; k--;)
                for (c = a[k], b[c.index] = c.name, f = c.data, g = e.length; g--;) c = d[g] || (d[g] = [e[g]]), c[k + 1] = f[g].y;
            b.unshift(null);
            d.unshift(b);
            return d
        }
    });
    z("realtimearea", Ea({
        friendlyName: "Realtime Data Streaming Area Chart",
        standaloneInit: !0,
        multisetRealtime: !0,
        defaultPlotShadow: 1,
        creditLabel: ja,
        rendererId: "realtimecartesian"
    }, kb), z.msareabase);
    z("realtimecolumn", Ea({
        friendlyName: "Realtime Data Streaming Column Chart",
        standaloneInit: !0,
        multisetRealtime: !0,
        creditLabel: ja,
        rendererId: "realtimecartesian"
    }, kb), z.mscolumn2dbase);
    z("realtimeline", Ea({
        friendlyName: "Realtime Data Streaming Line Chart",
        standaloneInit: !0,
        multisetRealtime: !0,
        creditLabel: ja,
        rendererId: "realtimecartesian"
    }, kb), z.mslinebase);
    z("realtimelinedy", Ea({
        friendlyName: "Realtime Data Streaming Dual Y-Axis Line Chart",
        standaloneInit: !0,
        multisetRealtime: !0,
        isDual: !0,
        creditLabel: ja,
        series: z.mscombibase,
        rendererId: "realtimecartesian"
    }, kb), z.mslinebase);
    z("realtimestackedarea", {
        friendlyName: "Realtime Data Streaming Stacked Area Chart",
        isStacked: !0,
        showSum: 0,
        areaAlpha: 100,
        creditLabel: ja
    }, z.realtimearea);
    z("realtimestackedcolumn", {
        friendlyName: "Realtime Data Streaming Column Chart",
        isStacked: !0,
        creditLabel: ja
    }, z.realtimecolumn);
    Mb = function (a, e) {
        return a.minvalue - e.minvalue
    };
    Xa.prototype = {
        getColorObj: function (a) {
            for (var e = this.colorArr,
                    c = 0, d = e.length, b, f, k = {}; c < d; c += 1) {
                k.index = c;
                b = e[c];
                f = e[c + 1];
                if (a < b.minvalue) return k.nextObj = b, k;
                if (a >= b.minvalue && a <= b.maxvalue) return k.colorObj = b, f && a == f.minvalue && (k.nextObj = f, k.isOnMeetPoint = !0), k;
                k.prevObj = b
            }
            k.index = c - 1;
            return k
        },
        getColorRangeArr: function (a, e) {
            var c, d = this.colorArr,
                b, f, k = [],
                g, p;
            if (!this.defaultAsigned && (a > e && (c = a, a = e, e = c), a < e && (b = this.getColorObj(a), f = this.getColorObj(e), b && f))) {
                c = a;
                b = b.index;
                for (f = f.index; b <= f; b += 1) g = V({}, d[b]), g.minvalue !== c && (g.minvalue = c), k.push(g), p = g,
                    c = g.maxvalue;
                p.maxvalue = e
            }
            return k
        }
    };
    Xa.prototype.constructor = Xa;
    Nb = function () {
        var a = {
                fluidHRatio: !0,
                fluidColor: !0,
                fluidAlpha: !0,
                fluidFill: !0
            },
            e = [],
            c = 0,
            d = function (a) {
                c = Boolean(a) ? a.duration : 0
            },
            b = function (b, d) {
                var f, m, l = this,
                    n, s, r = !1,
                    t = !1,
                    u = this._3dAttr;
                Za(b) && ia(d) && (f = b, b = {}, b[f] = d);
                if (Za(b)) l = a[b] ? l._3dAttr[b] : l._attr(b);
                else
                    for (f in b) m = b[f], a[f] ? ("fluidFill" === f ? (m && m.linearGradient && m.stops && m.stops[0] && (m = m.stops[0][1]), yb.test(m) ? (s = new rb(m), n = s.get("hex"), s = 100 * s.get("a")) : m && m.FCcolor ?
                        (n = m.FCcolor.color.split(v)[0], s = m.FCcolor.alpha.split(v)[0]) : vb.test(m) && (n = m.replace(jb, mb)), u.fluidColor = q(n, u.fluidColor, "000000"), u.fluidAlpha = h(s, u.fluidAlpha, 100), r = !0) : "fluidColor" === f ? (u.fluidColor = q(m, u.fluidColor, "000000"), r = !0) : "fluidAlpha" === f ? (u.fluidAlpha = h(m, u.fluidAlpha, 100), r = !0) : 0 <= m && 1 >= m && (u.fluidHRatio = m, t = !0), r && (m = ha(u.fluidColor, u.is2D ? 80 : 70), l.fluid.attr({
                        fill: F(m, u.fluidAlpha)
                    }), l.fluidTop.attr({
                        fill: F(m, u.fluidAlpha)
                    }), l.topLight.attr({
                        stroke: F(m, .4 * u.fluidAlpha)
                    }), l.topLightBorder.attr({
                        fill: R({
                            FCcolor: {
                                color: m +
                                    v + m,
                                alpha: "40,0",
                                ratio: "0,80",
                                radialGradient: !0,
                                cx: .5,
                                cy: 1,
                                r: "70%"
                            }
                        })
                    })), t && (m = u.scaleY + u.h * (1 - u.fluidHRatio), c ? (l.fluid.animate({
                        path: u.fluidPath.concat(["L", u.lx2, m, u.lx1, m, "Z"])
                    }, c, "easeIn"), l.fluidTop.animate({
                        path: e.concat(["M", u.lx1, m, "A", u.lCylWidthHalf, 1, 0, 1, 0, u.lx2, m, "Z"])
                    }, c, "easeIn")) : (l.fluid.attr({
                        path: u.fluidPath.concat(["L", u.lx2, m, u.lx1, m, "Z"])
                    }), l.fluidTop.attr({
                        path: e.concat(["M", u.lx1, m, "A", u.lCylWidthHalf, 1, 0, 1, 0, u.lx2, m, "Z"])
                    })))) : this._attr(f, m);
                return l
            },
            f = function (a, b, c) {
                this.border.shadow(a,
                    b, c)
            };
        return function (a, c, p, m, l, n, s, r, t, u, B, L, w) {
            var T, x, y, D, C, E, U, K, ca, H, I, J, A, z, N, Q;
            pb(a) && (c = a.y, p = a.r, m = a.h, n = a.renderer, s = a.fluidHRatio, r = a.conColor, t = a.conBorderColor, u = a.conBorderThickness, B = a.fluidColor, L = a.fluidAlpha, w = a.is2D, a = a.x);
            0 <= s && 1 >= s || (s = 0);
            r = q(r, "FFFFFF");
            t = q(t, "#000000");
            u = h(u, 1);
            B = q(B, "000000");
            L = h(L, 100);
            Q = {
                x: a,
                y: c,
                r: p,
                h: m,
                renderer: n,
                fluidHRatio: s,
                conColor: r,
                conBorderColor: t,
                conBorderThickness: u,
                fluidStroke: 3,
                fluidColor: B,
                is2D: w,
                fluidAlpha: L
            };
            l._attr = l.attr;
            l.attr = b;
            l._setAnimate =
                d;
            l.shadow = f;
            l._3dAttr = Q;
            T = ha(r, 80);
            B = ha(B, w ? 80 : 70);
            r = Y(r, 80);
            x = .643 * p;
            y = .33 * x;
            D = x - y;
            C = a - x;
            E = a + x;
            U = a - D;
            D = a + D;
            K = c + x;
            ca = K + m;
            H = ca + .766 * p;
            I = c + y;
            m = K + m * (1 - s);
            s = .9 * x;
            J = p + s - x;
            A = a - s;
            z = a + s;
            H -= Math.abs(Math.sqrt(J * J - s * s));
            N = parseInt(a - .6 * x, 10);
            x = a + x / 2;
            Q.fluidPath = ["M", A, H, "A", J, J, 0, 1, 0, z, H];
            Q.scaleY = K;
            Q.lx1 = A;
            Q.lx2 = z;
            Q.lCylWidthHalf = s;
            l.topLight = n.path(["M", A, K, "L", z, K], l).attr({
                "stroke-width": 1,
                stroke: F(B, 40)
            });
            l.topLightBorder = n.path(["M", A, K, "L", z, K, z, I, A, I, "Z"], l).attr({
                "stroke-width": 0,
                fill: R({
                    FCcolor: {
                        color: B +
                            v + B,
                        alpha: w ? "0,0" : "40,0",
                        ratio: "0,80",
                        radialGradient: !0,
                        cx: .5,
                        cy: 1,
                        r: "70%"
                    }
                })
            });
            l.fluid = n.path(Q.fluidPath.concat(["L", z, m, A, m, "Z"]), l).attr({
                "stroke-width": 0,
                fill: F(B, L)
            });
            l.fluidTop = n.path(e.concat(["M", A, m, "A", s, 1, 0, 1, 0, z, m, "Z"]), l).attr({
                "stroke-width": 0,
                fill: F(B, L)
            });
            l.border = n.path(e.concat(["M", U, c, "A", y, y, 0, 0, 0, C, I], ["L", C, ca], ["A", p, p, 0, 1, 0, E, ca], ["L", E, I], ["A", y, y, 0, 0, 0, D, c, "Z"]), l).attr({
                "stroke-width": u,
                stroke: t
            });
            w || (l.bulbBorderLight = n.path(e.concat(["M", C, ca, "A", p, p, 0, 0, 1, E, ca], ["M",
E, ca, "A", p, p, 0, 0, 0, C, ca], ["M", C, ca, "A", p, p, 0, 1, 0, E, ca, "Z"]), l).attr({
                "stroke-width": 0,
                stroke: "#00FF00",
                fill: R({
                    FCcolor: {
                        cx: .5,
                        cy: .5,
                        r: "50%",
                        color: T + v + r,
                        alpha: "0,50",
                        ratio: "78,30",
                        radialGradient: !0
                    }
                })
            }), l.bulbTopLight = n.path(e.concat(["M", C, ca, "A", p, p, 0, 0, 1, E, ca], ["A", p, p, 0, 0, 0, C, ca], ["A", p, p, 0, 1, 0, E, ca, "Z"]), l).attr({
                "stroke-width": 0,
                fill: R({
                    FCcolor: {
                        cx: .3,
                        cy: .1,
                        r: "100%",
                        color: r + v + T,
                        alpha: "60,0",
                        ratio: "0,30",
                        radialGradient: !0
                    }
                })
            }), l.bulbCenterLight = n.path(e.concat(["M", C, ca, "A", p, p, 0, 1, 0, E, ca], ["A",
p, p, 0, 0, 0, C, ca], ["A", p, p, 0, 0, 1, E, ca, "Z"]), l).attr({
                "stroke-width": 0,
                fill: R({
                    FCcolor: {
                        cx: .25,
                        cy: .7,
                        r: "100%",
                        color: r + v + T,
                        alpha: "80,0",
                        ratio: "0,70",
                        radialGradient: !0
                    }
                })
            }), l.cylLeftLight = n.path(e.concat(["M", a, c, "L", U, c], ["A", y, y, 0, 0, 0, C, I], ["L", C, ca, a, ca, "Z"]), l).attr({
                "stroke-width": 0,
                fill: R({
                    FCcolor: {
                        color: r + v + T,
                        alpha: "50,0",
                        ratio: "0,80",
                        angle: 0
                    }
                })
            }), l.cylRightLight = n.path(e.concat(["M", C, c, "L", D, c], ["A", y, y, 0, 0, 1, E, I], ["L", E, ca, C, ca, "Z"]), l).attr({
                "stroke-width": 0,
                fill: R({
                    FCcolor: {
                        color: r + v + T + v + T,
                        alpha: "50,0,0",
                        ratio: "0,40,60",
                        angle: 180
                    }
                })
            }), l.cylLeftLight1 = n.path(["M", N, I, "L", C, I, C, ca, N, ca, "Z"], l).attr({
                "stroke-width": 0,
                fill: R({
                    FCcolor: {
                        color: r + v + T,
                        alpha: "60,0",
                        ratio: "0,100",
                        angle: 180
                    }
                })
            }), l.cylRightLight1 = n.path(["M", N - .01, I, "L", x, I, x, ca, N - .01, ca, "Z"], l).attr({
                "stroke-width": 0,
                fill: R({
                    FCcolor: {
                        color: r + v + T,
                        alpha: "60,0",
                        ratio: "0,100",
                        angle: 0
                    }
                })
            }));
            return l
        }
    }();
    Ob = function () {
        var a = {
                fluidHRatio: !0,
                color: !0,
                alpha: !0,
                fill: !0
            },
            e = [],
            c = 0,
            d = function (a) {
                c = Boolean(a) ? a.duration : 0
            },
            b = function (b, d) {
                var f,
                    m, l = this,
                    n, s, r = !1,
                    t = !1,
                    u = this._3dAttr,
                    B, L, w, T, x, y, D, C;
                Za(b) && ia(d) && (f = b, b = {}, b[f] = d);
                if (Za(b)) l = a[b] ? l._3dAttr[b] : l._attr(b);
                else
                    for (f in b) m = b[f], a[f] ? ("fill" === f ? (m && m.linearGradient && m.stops && m.stops[0] && (m = m.stops[0][1]), yb.test(m) ? (s = new rb(m), n = s.get("hex"), s = 100 * s.get("a")) : m && m.FCcolor ? (n = m.FCcolor.color.split(v)[0], s = m.FCcolor.alpha.split(v)[0]) : vb.test(m) && (n = m.replace(jb, mb)), u.fluidColor = q(n, u.fluidColor, "000000"), u.fluidAlpha = h(s, u.fluidAlpha, 100), r = !0) : "color" === f ? (u.fluidColor = q(m,
                        u.fluidColor, "000000"), r = !0) : "alpha" === f ? (u.fluidAlpha = h(m, u.fluidAlpha, 100), r = !0) : 0 <= m && 1 >= m && (u.fluidHRatio = m, t = !0), r && (m = ha(u.fluidColor, 70), B = Y(u.fluidColor, 70), w = ha(u.conColor, 80), L = Y(u.conColor, 80), s = u.fluidAlpha, T = s + v + s, l.fluid.attr({
                        "stroke-width": 0,
                        fill: R({
                            FCcolor: {
                                cx: .5,
                                cy: 0,
                                r: "100%",
                                color: B + v + m,
                                alpha: T,
                                ratio: "0,100",
                                radialGradient: !0
                            }
                        })
                    }), l.fluidTop.attr({
                        "stroke-width": 3,
                        stroke: F(B, s),
                        fill: R({
                            FCcolor: {
                                cx: .5,
                                cy: .7,
                                r: "100%",
                                color: B + v + m,
                                alpha: T,
                                ratio: "0,100",
                                radialGradient: !0
                            }
                        })
                    }), l.btnBorderLight.attr({
                        fill: R({
                            FCcolor: {
                                color: L +
                                    v + w + v + L + v + L + v + w + v + m + v + w + v + L,
                                alpha: "50,50,50,50,50," + .7 * s + ",50,50",
                                ratio: "0,15,0,12,0,15,43,15",
                                angle: 0
                            }
                        })
                    })), t && (w = u.x, m = u.r, B = u.fluidStroke, L = B / 2, x = u.h * u.fluidHRatio, B = w - m, w += m, T = B + L, y = w - L, D = u.y + u.h, x = D - x, C = m * u.r3dFactor, L = m - L, c ? (l.fluid.animate({
                        path: e.concat(["M", B, D], ["A", m, Aa(C, 1), 0, 0, 0, w, D], ["L", w, x], ["A", m, Aa(C, 1), 0, 0, 0, B, x, "Z"])
                    }, c, "easeIn"), l.fluidTop.animate({
                        path: e.concat(["M", T, x], ["A", L, C, 0, 0, 0, y, x], ["L", y, x], ["A", L, C, 0, 0, 0, T, x, "Z"])
                    }, c, "easeIn")) : (l.fluid.attr({
                        path: e.concat(["M", B,
D], ["A", m, C, 0, 0, 0, w, D], ["L", w, x], ["A", m, C, 0, 0, 1, B, x, "Z"])
                    }), l.fluidTop.attr({
                        path: e.concat(["M", T, x], ["A", L, C, 0, 0, 0, y, x], ["L", y, x], ["A", L, C, 0, 0, 0, T, x, "Z"])
                    })))) : this._attr(f, m);
                return l
            },
            f = function () {};
        return function (a, c, p, m, l, n, s, r, t, u, B, L, w) {
            var T, x, y, D, C, E, U, K, ca, H, I, J, A, z, N, Q, S, G;
            pb(a) && (c = a.y, p = a.r, m = a.h, l = a.r3dFactor, n = a.parentGroup, s = a.renderer, r = a.fluidHRatio, t = a.conColor, u = a.conAlpha, B = a.fluidColor, L = a.fluidAlpha, a = a.x);
            l = h(l, .15);
            Ha.vml && (l = l || .001);
            0 <= r && 1 >= r || (r = 0);
            t = q(t, "FFFFFF");
            u =
                h(u, 30);
            B = q(B, "000000");
            L = h(L, 100);
            u = {
                x: a,
                y: c,
                r: p,
                h: m,
                r3dFactor: l,
                renderer: s,
                fluidHRatio: r,
                conColor: t,
                conAlpha: u,
                fluidStroke: 3,
                fluidColor: B,
                fluidAlpha: L
            };
            n = s.group("graphic", n);
            n._attr = n.attr;
            n.attr = b;
            n._setAnimate = d;
            n.shadow = f;
            n._3dAttr = u;
            l *= p;
            u = p - 1.5;
            T = c + m;
            m = T - m * r;
            r = a - p;
            x = a + p;
            y = r + 1.5;
            D = x - 1.5;
            C = r - 2;
            E = x + 2;
            U = p + 2;
            K = l + 2;
            ca = T + 4;
            H = ca + .001;
            I = ha(t, 80);
            J = ha(t, 90);
            t = Y(t, 80);
            A = ha(B, 70);
            B = Y(B, 70);
            z = ha(A, 90);
            N = .85 * p;
            Q = a - N;
            a += N;
            S = Math.sqrt((1 - N * N / (p * p)) * l * l);
            N = c + S;
            S = T + S;
            G = c - 1;
            n.btnBorder = s.path(e.concat(["M",
C, ca], ["A", U, K, 0, 0, 0, E, ca], ["L", E, H], ["A", U, K, 0, 0, 0, C, H, "Z"]), n).attr({
                "stroke-width": 4,
                stroke: F(I, 80)
            });
            n.btnBorder1 = s.path(e.concat(["M", r, ca], ["A", p, l, 0, 0, 0, x, ca], ["L", x, H], ["A", p, l, 0, 0, 0, r, H, "Z"]), n).attr({
                "stroke-width": 4,
                stroke: F(I, 50)
            });
            n.btnBorderLight = s.path(e.concat(["M", r, T], ["A", p, l, 0, 0, 0, x, T], ["A", p, l, 0, 0, 0, r, T, "Z"]), n).attr({
                "stroke-width": 0,
                fill: R({
                    FCcolor: {
                        color: t + v + I + v + t + v + t + v + I + v + A + v + I + v + t,
                        alpha: "50,50,50,50,50,70,50,50",
                        ratio: "0,15,0,12,0,15,43,15",
                        angle: 0
                    }
                })
            });
            C = w ? t + v + I + v + t + v +
                I + v + J + v + J + v + I + v + t : t + v + I + v + I + v + I + v + I + v + I + v + I + v + t;
            n.back = s.path(e.concat(["M", r, T], ["A", p, l, 0, 0, 0, x, T], ["L", x, c], ["A", p, l, 0, 0, 0, r, c, "Z"]), n).attr({
                "stroke-width": 1,
                stroke: F(I, 50),
                fill: R({
                    FCcolor: {
                        color: C,
                        alpha: "30,30,30,30,30,30,30,30",
                        ratio: "0,15,43,15,0,12,0,15",
                        angle: 0
                    }
                })
            });
            C = w ? B + v + A : A + v + A;
            n.fluid = s.path(e.concat(["M", r, T], ["A", p, Aa(l, 1), 0, 0, 0, x, T], ["L", x, m], ["A", p, Aa(l, 1), 0, 0, 0, r, m, "Z"]), n).attr({
                "stroke-width": 0,
                fill: R({
                    FCcolor: {
                        cx: .5,
                        cy: 0,
                        r: "100%",
                        color: C,
                        alpha: L + v + L,
                        ratio: "0,100",
                        radialGradient: !0
                    }
                })
            });
            C = w ? B + v + A : A + v + A;
            n.fluidTop = s.path(e.concat(["M", y, m], ["A", u, l, 0, 0, 0, D, m], ["L", D, m], ["A", u, l, 0, 0, 0, y, m, "Z"]), n).attr({
                "stroke-width": 2,
                stroke: w ? F(B, L) : F(z),
                fill: R({
                    FCcolor: {
                        cx: .5,
                        cy: .7,
                        r: "100%",
                        color: C,
                        alpha: L + v + L,
                        ratio: "0,100",
                        radialGradient: !0
                    }
                })
            });
            C = w ? t + v + I + v + t + v + t + v + I + v + t + v + I + v + t : I + v + I + v + I + v + I + v + I + v + I + v + I + v + I;
            n.front = s.path(e.concat(["M", r, T], ["A", p, l, 0, 0, 0, x, T], ["L", x, c], ["A", p, l, 0, 0, 1, r, c, "Z"]), n).attr({
                "stroke-width": 1,
                stroke: F(I, 50),
                fill: R({
                    FCcolor: {
                        color: C,
                        alpha: "30,30,30,30,30,30,30,30",
                        ratio: "0,15,0,12,0,15,43,15",
                        angle: 0
                    }
                })
            });
            w && (n.frontLight = s.path(e.concat(["M", r, T], ["A", p, l, 1, 0, 0, Q, S], ["L", Q, N], ["A", p, l, 0, 0, 1, r, c, "Z"]), n).attr({
                "stroke-width": 0,
                stroke: "#" + I,
                fill: R({
                    FCcolor: {
                        color: C,
                        alpha: "40,0",
                        ratio: "0,100",
                        angle: 0
                    }
                })
            }));
            w && (n.frontLight1 = s.path(e.concat(["M", a, S], ["A", p, l, 0, 0, 0, x, T], ["L", x, c], ["A", p, l, 1, 0, 0, a, N, "Z"]), n).attr({
                "stroke-width": 0,
                stroke: "#" + I,
                fill: R({
                    FCcolor: {
                        color: C,
                        alpha: "40,0",
                        ratio: "0,100",
                        angle: 180
                    }
                })
            }));
            n.cylinterTop = s.path(e.concat(["M", r, G], ["A", p, l, 0,
0, 0, x, G], ["L", x, G], ["A", p, l, 0, 0, 0, r, G, "Z"]), n).attr({
                "stroke-width": 2,
                stroke: F(I, 40)
            });
            return n
        }
    }();
    Pb = function () {
        var a = {
                value: !0
            },
            e = 0,
            c = function (a) {
                e = Boolean(a) ? a.duration : 0
            },
            d = function (b, c) {
                var d, p, m = this,
                    l = this._3dAttr,
                    n, h, r, t, u, B, q;
                Za(b) && ia(c) && (d = b, b = {}, b[d] = c);
                if (Za(b)) m = a[b] ? m._3dAttr[b] : m._attr(b);
                else
                    for (d in b)
                        if (p = b[d], a[d]) {
                            if (p >= l.minValue && p <= l.maxValue) {
                                l[d] = p;
                                n = (p - l.minValue) / l.perLEDValueLength;
                                p = ra(n) * l.sizeGapSum - l.ledGap;
                                if (l.LEDCase) {
                                    h = m.colorArr;
                                    t = h.length;
                                    for (r = 0; r < t; r += 1) u =
                                        h[r], u.maxLEDNoFrac <= n ? q = l.LEDLowerFN : B ? q = l.LEDUpperFN : (q = void 0, B = u), q && (u[q](), "show" === q && u.attr(u.oriShapeArg));
                                    B || (B = u);
                                    B.show();
                                    B.attr(B.hoverShapeArg)
                                }
                                m.darkShade && (n = {}, l.isXChange ? (n.width = Math.ceil(l.w - p), l.isIncrement && (n.x = l.x + p)) : (n.height = Math.ceil(l.h - p), l.isIncrement && (n.y = l.y + p)), e ? m.darkShade.animate(n, e, "easeIn") : m.darkShade.attr(n))
                            }
                        } else this._attr(d, p); return m
            },
            b = function () {};
        return function (a, e, g, p, m, l, n, s, r, t, u, B, L, w, T, x, y, D, C, E, U) {
            var K = function (a) {
                    var b = 0,
                        c, d;
                    return function () {
                        b =
                            0;
                        for (c = a.colorArr.length; b < c; b += 1) d = a.colorArr[b], d.attr(d.data("rollover"))
                    }
                },
                v = function (a) {
                    var b = 0,
                        c, d;
                    return function () {
                        b = 0;
                        for (c = a.colorArr.length; b < c; b += 1) d = a.colorArr[b], d.attr(d.data("rollout"))
                    }
                },
                H, I, J, A, z, N, Q, S, G, M, O, P, Z, X, aa, ba, pa, ga, ta, sa, xa, Sa, cb, Oa;
            pb(a) && (e = a.y, g = a.w, p = a.h, m = a.wGroup, l = a.renderer, n = a.value, s = a.gaugeFillColor, r = a.gaugeBorderColor, t = a.gaugeBorderAlpha, u = a.gaugeBorderThickness, B = a.colorRangeManager, L = a.minValue, w = a.maxValue, T = a.useSameFillColor, x = a.useSameFillBgColor,
                y = a.ledSize, D = a.ledGap, C = a.type, a = a.x);
            n >= L && n <= w || (n = L);
            s = q(s, "FFFFFF");
            r = q(r, "000000").replace(jb, mb);
            t = h(t, 1);
            u = h(u, 2);
            Oa = {
                x: a,
                y: e,
                w: g,
                h: p,
                wGroup: m,
                renderer: l,
                value: n,
                gaugeFillColor: s,
                gaugeBorderColor: r,
                gaugeBorderAlpha: t,
                gaugeBorderThickness: u,
                colorRangeManager: B,
                minValue: L,
                maxValue: w,
                ledGap: D,
                ledSize: y,
                type: C,
                useSameFillColor: T,
                useSameFillBgColor: x
            };
            m = l.group("graphic", m);
            m._attr = m.attr;
            m.attr = d;
            m._setAnimate = c;
            m.shadow = b;
            m._3dAttr = Oa;
            B = B.getColorRangeArr(L, w);
            H = a;
            I = e;
            A = J = !0;
            z = 2 === C || 4 === C ? p :
                g;
            N = D + y;
            Q = D / 2;
            S = Q / 2;
            G = z - y;
            M = w - L;
            w = 0;
            O = B.length;
            X = Z = 0;
            aa = !1;
            pa = ba = "show";
            ga = a;
            ta = e;
            sa = u / 2;
            xa = a - sa;
            Sa = e - sa;
            cb = a + g + sa;
            sa = e + p + sa;
            T && (X += 1, ba = "hide");
            x && (X += 2, pa = "hide");
            0 > G ? (T = 1, y = z) : (T = parseInt(G / N, 10) + 1, y += G % N / T, N = y + D);
            x = M / T;
            m.colorArr = [];
            z = [];
            1 === C ? ga += N - D / 2 : 2 === C ? (A = !1, ta += N - D / 2) : 3 === C ? (H = a + g, J = !1, ga += N - D / 2) : (I = e + p, A = J = !1, ta += N - D / 2);
            Oa.ledGap = D;
            Oa.ledSize = y;
            Oa.sizeGapSum = N;
            Oa.perLEDValueLength = x;
            Oa.isIncrement = J;
            Oa.isXChange = A;
            Oa.LEDLowerFN = ba;
            Oa.LEDUpperFN = pa;
            (Oa.LEDCase = X) && (3 === X ? P = {
                x: a,
                y: e,
                width: g,
                height: p
            } : aa = !0);
            for (m.border = l.path(["M", xa, Sa, "L", cb, Sa, cb, sa, xa, sa, "Z"], m).attr({
                    stroke: F(r, t),
                    "stroke-width": u
                }).shadow({
                    apply: E
                }); w < O; w += 1)
                if ((r = B[w]) && ia(r.maxvalue) && (t = ra((r.maxvalue - L) / x), y = t - Z, Z = t, 0 < y)) {
                    u = {
                        r: 0
                    };
                    aa && (P = {});
                    y *= N;
                    if (A)
                        if (u.y = I, u.width = y - D, u.height = p, J ? (u.x = H, H += y) : (u.x = H - u.width, H -= y), aa && (P.width = u.x - a, J && 1 === X || !J && 2 === X ? (P.x = a, P.width += u.width) : P.width = g - P.width), 0 === w || w === O - 1) {
                            if (u.width += S, J && w === O - 1 || !J && 0 === w) u.x -= S, u.width = Math.ceil(u.width)
                        } else u.width += Q, u.x -= S;
                    else if (u.x = H, u.width = g, u.height = y - D, J ? (u.y = I, I += y) : (u.y = I - u.height, I -= y), aa && (P.height = u.y - e, J && 1 === X || !J && 2 === X ? (P.y = e, P.height += u.height) : P.height = p - P.height), 0 === w || w === O - 1) {
                        if (u.height += S, J && w === O - 1 || !J && 0 === w) u.y -= S, u.height = Math.ceil(u.height)
                    } else u.height += Q, u.y -= S;
                    y = l.rect(u.x, u.y, u.width, u.height, m).attr({
                        "stroke-width": 0,
                        fill: R({
                            FCcolor: {
                                color: q(r.code, "000000"),
                                alpha: h(r.alpha, 100)
                            }
                        })
                    });
                    y.oriShapeArg = u;
                    y.hoverShapeArg = P;
                    y.maxLEDNo = t;
                    y.maxLEDNoFrac = (r.maxvalue - L) / x;
                    U && (y.data("rollover", {
                        "stroke-width": 0,
                        fill: R({
                            FCcolor: {
                                color: ha(q(r.code, "000000"), 80) + "," + Y(q(r.code, "000000"), 80),
                                alpha: h(r.alpha, 100),
                                angle: C % 2 ? 90 : 0
                            }
                        })
                    }), y.data("rollout", {
                        "stroke-width": 0,
                        fill: R({
                            FCcolor: {
                                color: q(r.code, "000000"),
                                alpha: h(r.alpha, 100)
                            }
                        })
                    }));
                    m.colorArr.push(y)
                }
            m.darkShade = l.rect(a, e, g, p, 0, m).attr({
                "stroke-width": 0,
                fill: F(s, 50)
            });
            for (w = 1; w < T; w += 1) A ? (z.push("M", ga, ta, "L", ga, ta + p), ga += N) : (z.push("M", ga, ta, "L", ga + g, ta), ta += N);
            m.LEDGap = l.path(z, m).attr({
                stroke: F(s, 100),
                "stroke-width": D
            });
            m.tracker = l.rect(a,
                e, g, p, 0, m).attr({
                fill: ka
            });
            U && m.tracker.hover(K(m), v(m));
            m.attr({
                value: n
            });
            return m
        }
    }();
    z("renderer.drawingpad", {
        deleteme: function (a) {
            this.container.innerHTML = "called from drawingpad: " + a
        }
    }, z["renderer.root"]);
    z("renderer.widgetbase", {
        drawLegend: function () {},
        drawGraph: function () {
            var a = this.elements,
                e = this.paper,
                c = this.layers,
                d = this.options,
                b = c.dataset;
            d.nativeMessage || (c.dataset || (b = a.widgetGroup = c.dataset = e.group("dataset"), c.tracker = e.group("hot"), c.tracker.insertAfter(c.dataset)), c.datalabels ||
                (c.datalabels = e.group("datalabels").insertAfter(b)), b.translate(this.canvasLeft, this.canvasTop), c.datalabels.translate(this.canvasLeft, this.canvasTop), d.tooltip && !1 !== d.tooltip.enabled && e.tooltip(d.tooltip.style, d.tooltip.shadow, d.tooltip.constrain), this.drawWidget(), this.drawScale(), this.drawValue())
        },
        drawWidgetValue: function () {},
        drawValue: function (a, e) {
            var c = this.options,
                d = e || c.plotOptions.series.animation,
                c = c.series && c.series[0] && c.series[0].data || [],
                b;
            if (c.length) {
                if (a && (b = a.length))
                    for (; b--;) c[b] &&
                        (c[b] = a[b]);
                this.drawWidgetValue(c, d);
                this.drawWidgetLabel(c, d)
            }
        },
        drawWidgetLabel: function (a) {
            var e = this.paper,
                c = this.options,
                d = c.chart,
                b = this.elements,
                f = this.layers;
            a = a[0];
            var f = f.datalabels || (f.datalabels = e.group("datalabels").insertAfter(f.dataset)),
                k = this.canvasWidth,
                g = this.canvasHeight,
                p = d.valuePadding,
                m = a.displayValue,
                l = h(d.yScaleRadius, 0),
                c = c.plotOptions.series.dataLabels.style,
                n = {
                    fontFamily: c.fontFamily,
                    fontSize: c.fontSize,
                    lineHeight: c.lineHeight,
                    fontWeight: c.fontWeight,
                    fontStyle: c.fontStyle
                },
                g = g + p + l;
            null !== a.y && !isNaN(a.y) && ia(m) && m !== O && (b.dataLabel ? b.dataLabel.attr({
                text: m
            }) : b.dataLabel = e.text(f).attr({
                "vertical-align": "top",
                text: m,
                x: k / 2,
                y: g,
                "text-anchor": Ba[Na],
                fill: c.color,
                direction: d.textDirection,
                title: a.originalText || "",
                "text-bound": [c.backgroundColor, c.borderColor, c.borderThickness, c.borderPadding, c.borderRadius, c.borderDash]
            }).css(n), e = b.dataLabel.getBBox(), 0 > e.x + d.spacingLeft && (e = e.width - d.spacingLeft, d.origW < e && (e = d.origW - d.spacingLeft), b.dataLabel.attr({
                x: e / 2
            })))
        },
        drawScale: function () {
            var a =
                this.paper,
                e = this.elements,
                c = this.layers.dataset,
                d = this.options,
                b = this.canvasWidth,
                f = this.canvasHeight,
                k = d.scale,
                g = k.minorTM,
                d = d.chart.textDirection,
                p = k.min,
                m = k.max,
                l = k.majorTM,
                n = k.axisPosition,
                h = k.minorTMHeight,
                r = k.majorTMHeight,
                t = k.connectorColor,
                u = k.connectorThickness,
                B = k.minorTMColor,
                q = k.minorTMThickness,
                w = k.majorTMColor,
                T = k.majorTMThickness,
                x = k.tickMarkDistance,
                y = k.tickValueDistance,
                D = k.placeTicksInside,
                C = k.placeValuesInside,
                E = Math.max(r, h),
                c = e.scaleGroup || (e.scaleGroup = a.group("scale", c)),
                U =
                La,
                K = Na,
                v = k.reverseScale,
                H = p,
                I = q / 2,
                J = T / 2,
                p = m - p,
                A = 0,
                z = 0,
                N = 0,
                Q = 0,
                F = 0,
                G = 0,
                M = 0,
                R = 0,
                P = 0,
                Z = 0,
                X = 0,
                aa = 0,
                ba = 0,
                pa = 0,
                ga = 0,
                ta = 0,
                sa, xa = {};
            D ? (x = -x, r = -r, h = -h, C ? (E = -E, y = -y) : E = -x) : C && (E = -x, y = -y);
            v && (p = -p, H = m);
            switch (n) {
                case 1:
                    A = b / p;
                    Q = -x;
                    G = Q - J;
                    R = Q - I;
                    Z = Q - r;
                    aa = Q - h;
                    pa = Q - E - y;
                    U = La;
                    K = C ? Ma : qb;
                    break;
                case 2:
                    z = f / p;
                    N = x;
                    F = N + J;
                    M = N + I;
                    P = N + r;
                    X = N + h;
                    ba = N + E + y;
                    ga = b;
                    U = C ? bb : Ia;
                    K = Na;
                    break;
                case 3:
                    A = b / p;
                    Q = x;
                    G = Q + J;
                    R = Q + I;
                    Z = Q + r;
                    aa = Q + h;
                    pa = Q + E + y;
                    ta = f;
                    U = La;
                    K = C ? qb : Ma;
                    break;
                case 4:
                    z = f / p, N = -x, F = N - J, M = N - I, P = N - r, X = N - h, ba = N - E - y, U = C ? Ia : bb, K = Na
            }
            e.minorTM ||
                (e.minorTM = []);
            e.majorTM || (e.majorTM = []);
            this.tmLabel || (e.tmLabel = []);
            if (h)
                for (b = 0, m = g.length; b < m; b += 1) r = g[b] - H, x = r * A, r *= z, e.minorTM[b] = a.path(["M", x + M, r + R, "L", x + X, r + aa], c).attr({
                    "shape-rendering": wb[1 > q],
                    stroke: B,
                    "stroke-linecap": "round",
                    "stroke-width": q
                });
            b = 0;
            for (m = l.length; b < m; b += 1)
                if (g = l[b], r = g.value - H, R = g.displayValue, x = r * A, r *= z, h && (e.majorTM[b] = a.path(["M", x + F, r + G, "L", x + P, r + Z], c).attr({
                        "shape-rendering": wb[1 > T],
                        stroke: w,
                        "stroke-linecap": "round",
                        "stroke-width": T
                    })), R !== O) {
                    q = 0 === b || b === m - 1 ? k.limitValues.style :
                        k.tickValues.style;
                    B = g.labelX || 0;
                    M = x + ba;
                    R = this.smartLabel.getSmartText(R, Number.POSITIVE_INFINITY, f);
                    xa[b] = R.width;
                    if (1 === n || 3 === n)
                        if (X = b === m - 1 ? M + B - R.width : M - (R.width / 2 + B), 0 === b ? aa = Number.NEGATIVE_INFINITY : (aa = void 0 === sa ? b - 1 : sa, y = y = x = void 0, 0 > aa ? aa = Number.NEGATIVE_INFINITY : (x = e.tmLabel[aa], y = xa[aa], y = 0 === aa ? x ? x.node.scrollWidth ? x.node.scrollWidth > y ? x.node.scrollWidth : y : y : 0 : x ? x.node.scrollWidth ? (x.node.scrollWidth > y ? x.node.scrollWidth : y) / 2 : y / 2 : 0, aa = x ? x.attrs.x + y : 0)), aa >= X)
                            if (b === m - 1) e.tmLabel[sa].remove();
                            else continue;
                    else sa = b;
                    e.tmLabel[b] = a.text(M + B, r + pa, R.text, c).attr({
                        "text-anchor": Ba[g.align || U],
                        direction: d,
                        "vertical-align": K,
                        title: g.originalText || ""
                    }).css(q)
                }
            u && (e.tmConnector = a.path(["M", N, Q, "L", p * A + N, p * z + Q], c).attr({
                "shape-rendering": wb[1 > u],
                stroke: t,
                "stroke-linecap": "round",
                "stroke-width": u
            }));
            c.translate(ga, ta);
            return c
        },
        realtimeUpdate: function (a) {
            if (a === this.lastUpdatedObj) return !1;
            var e = this.options,
                c = e.series,
                d = this.logic,
                c = c && c[0] && c[0].data,
                b = a.values || [],
                f = a.labels || [],
                k = a.toolTexts || [],
                g = a.showLabels || [],
                p = c && c.length || 0,
                m = [],
                l;
            if (p) {
                for (; p--;) l = {}, void 0 !== b[p] && "" !== b[p] ? (l.value = b[p], l.hasNewData = !0) : l.value = c[p].y, f[p] && (l.displayvalue = f[p], l.hasNewData = !0), k[p] && (l.tooltext = k[p], l.hasNewData = !0), l.hasNewData && (m[p] = d.getPointStub(l, p, e, this.definition)), "0" != g[p] && c[p].displayValue || (m[p].displayValue = O);
                m.length && (this.lastUpdatedObj = a) && this.drawValue(m);
                return Boolean(m.length)
            }
        }
    }, z["renderer.root"]);
    z("renderer.bulb", {
        drawWidget: function () {
            var a = this,
                e = a.options,
                c = e.chart,
                d = a.paper,
                b = a.elements,
                f = c.gaugeRadius,
                e = e.series[0] && e.series[0].data && e.series[0].data[0] || {},
                k = e.rolloverProperties || {},
                g = {
                    cx: c.gaugeOriginX,
                    cy: c.gaugeOriginY,
                    stroke: e.borderColor,
                    "stroke-linecap": "round",
                    "stroke-width": e.borderWidth,
                    r: c.animation ? .001 : f
                },
                p = {
                    r: f
                },
                m;
            null === e.y || isNaN(e.y) || (m = b.bulb = (m = b.bulb) ? m.attr(g) : d.circle(g, a.layers.dataset), c.animation && m.animate(p, c.animation.duration, "easeIn"), m.click(function (b) {
                ma.call(this, a, b)
            }).hover(function (b) {
                    ma.call(this, a, b, "DataPlotRollOver")
                },
                function (b) {
                    ma.call(this, a, b, "DataPlotRollOut")
                }), k.enabled && m.mouseover(function () {
                m.attr(k.hoverAttr);
                k.hoverAnimAttr && m.animate(k.hoverAnimAttr, 100, "easeIn")
            }).data("hoverAttr", k.hoverAttr).mouseout(function () {
                m.attr(k.outAttr);
                k.hoverAnimAttr ? m.animate(p, 100, "easeIn") : m.attr(p)
            }).data("outAttr", k.outAttr))
        },
        drawWidgetValue: function (a) {
            var e = this.elements;
            a = a[0];
            var c = a.rolloverProperties || {},
                d = c.hoverAttr,
                b = c.outAttr,
                f = {
                    fill: R(a.color),
                    ishot: !0
                },
                e = e.bulb,
                k = e.data("hoverAttr"),
                g = e.data("outAttr");
            c.enabled && (d && d.stroke && (k.stroke = d.stroke, g.stroke = b.stroke), d && d.fill && (k.fill = d.fill, g.fill = b.fill));
            e || this.drawWidget();
            c = {
                value: a.y,
                displayValue: a.displayValue,
                toolText: a.toolText
            };
            null === a.y || isNaN(a.y) || e.attr(f).tooltip(a.toolText).data("eventArgs", c)
        },
        drawScale: function () {},
        drawWidgetLabel: function (a) {
            var e = this.options.chart,
                c = this.paper,
                d = this.elements,
                b = this.layers,
                f = e.gaugeRadius,
                k = e.gaugeOriginX,
                g = e.gaugeOriginY;
            a = a[0];
            var p = d.dataLabel,
                m = e.dataLabels.style,
                l = {
                    fontFamily: m.fontFamily,
                    fontSize: m.fontSize,
                    lineHeight: m.lineHeight,
                    fontWeight: m.fontWeight,
                    fontStyle: m.fontStyle
                };
            b.datalabels || (b.datalabels = c.group("datalabels").insertAfter(b.dataset));
            e.placeValuesInside ? (b = g, f = Na) : (b = g + f + e.valuePadding, f = Ma);
            null === a.y || isNaN(a.y) || a.displayValue === O || (p || (d.dataLabel = p = c.text(this.layers.dataset)), p.attr({
                text: a.displayValue,
                "text-anchor": "middle",
                x: k,
                y: b,
                title: a.originalText || "",
                "vertical-align": f,
                fill: m.color,
                direction: e.textDirection,
                "text-bound": [m.backgroundColor, m.borderColor,
m.borderThickness, m.borderPadding, m.borderRadius, m.borderDash]
            }).css(l))
        }
    }, z["renderer.widgetbase"]);
    z("renderer.thermometer", {
        drawWidget: function () {
            var a = this.options,
                e = a.chart,
                c = this.paper,
                d = a.series[0].data[0],
                b = e.plotHoverEffects || {},
                f = e.thmBulbRadius,
                k = .643 * f,
                g = new rb(d.color),
                p = g.get("hex").replace(jb, O),
                g = 100 * g.get("a"),
                m;
            d.minValue = a.scale.min;
            d.maxValue = a.scale.max;
            m = this.elements.thermometer = Nb(0 + k, 0 - k, f, e.thmHeight, this.layers.dataset, c, 0, e.thmGlassColor, e.gaugeBorderColor, e.gaugeBorderThickness,
                p, g, e.use3DLighting);
            b.enabled && m.data("hoverInAttrs", {
                fluidColor: b.thmFillHoverColor,
                fluidAlpha: b.thmFillHoverAlpha
            }).data("hoverOutAttrs", {
                fluidColor: p,
                fluidAlpha: g
            }).hover(function () {
                m.attr(m.data("hoverInAttrs"))
            }, function () {
                m.attr(m.data("hoverOutAttrs"))
            })
        },
        drawWidgetValue: function (a, e) {
            var c = this,
                d = c.elements,
                b = c.options.scale,
                f = b.max,
                k = b.min,
                b = a[0],
                f = (h(b.y, k) - k) / (f - k),
                g;
            d.thermometer || c.drawWidget();
            b.fluidHRatio = f;
            k = {
                value: b.y,
                displayValue: b.displayValue,
                toolText: b.toolText
            };
            e && d.thermometer._setAnimate(e);
            d.thermometer.attr({
                fluidHRatio: f,
                ishot: !0
            }).click(function (a) {
                ma.call(this, c, a)
            }).hover(function (a) {
                ma.call(this, c, a, "DataPlotRollOver")
            }, function (a) {
                ma.call(this, c, a, "DataPlotRollOut")
            }).data("eventArgs", k);
            if (b.toolText && (g = d.thermometer.bottom)) {
                do g.tooltip(b.toolText); while (g = g.next)
            }
        }
    }, z["renderer.widgetbase"]);
    z("renderer.cylinder", {
        drawWidget: function () {
            var a = this.options,
                e = a.chart,
                c = e.plotHoverEffects || {},
                d = this.paper,
                b = this.elements,
                f = this.layers.dataset,
                k = a.scale,
                g = k.max,
                a = a.series[0].data[0],
                p, m;
            a.minValue = k.min;
            a.maxValue = g;
            b.cylinder = Ob(e.cylRadius, 0, e.cylRadius, e.cylHeight, e.cylYScale, f, d, 0, e.cylGlassColor, "100", e.cylFillColor, e.cylFillAlpha, e.cyl3DLighting);
            c.enabled && (p = {
                color: c.cylFillHoverColor,
                alpha: c.cylFillHoverAlpha
            }, m = {
                color: e.cylFillColor,
                alpha: e.cylFillAlpha
            }, b.cylinder.hover(function () {
                b.cylinder.attr(p)
            }, function () {
                b.cylinder.attr(m)
            }))
        },
        drawWidgetValue: function (a, e) {
            var c = this,
                d = c.elements,
                b = c.options.scale,
                f = b.max,
                k = b.min,
                b = a[0],
                f = (h(b.y, k) - k) / (f - k),
                g;
            d.cylinder || c.drawWidget();
            k = {
                value: b.y,
                displayValue: b.displayValue,
                toolText: b.toolText
            };
            b.fluidHRatio = f;
            e && d.cylinder._setAnimate(e);
            d.cylinder.attr({
                fluidHRatio: f,
                ishot: !0
            }).click(function (a) {
                ma.call(this, c, a)
            }).hover(function (a) {
                ma.call(this, c, a, "DataPlotRollOver")
            }, function (a) {
                ma.call(this, c, a, "DataPlotRollOut")
            }).data("eventArgs", k);
            if (b.toolText && (g = d.cylinder.bottom)) {
                do g.tooltip(b.toolText); while (g = g.next)
            }
        }
    }, z["renderer.widgetbase"]);
    z("renderer.led", {
        drawWidget: function () {
            var a = this.options,
                e = this.paper,
                c = this.logic,
                d = a.chart,
                b = this.elements,
                f = a.scale,
                k = f.max,
                g = f.min,
                a = a.series[0].data[0],
                h = this.layers.dataset;
            a.minValue = g;
            a.maxValue = k;
            b.led = Pb(0, 0, this.canvasWidth, this.canvasHeight, h, e, 0, d.gaugeFillColor, d.gaugeBorderColor, d.gaugeBorderAlpha, d.gaugeBorderThickness, c.colorRangeGetter, g, k, d.useSameFillColor, d.useSameFillBgColor, d.ledSize, d.ledGap, c.isHorizontal ? f.reverseScale ? 3 : 1 : f.reverseScale ? 4 : 2, d.showShadow, d.plotHoverEffect)
        },
        drawWidgetValue: function (a, e) {
            var c = this.elements,
                d = a[0].y;
            c.led || this.drawWidget();
            e && c.led._setAnimate(e);
            c.led.attr({
                value: d
            })
        }
    }, z["renderer.widgetbase"]);
    z("renderer.bullet", {
        drawWidget: function () {
            var a = this.options,
                e = this.paper,
                c = this.logic,
                d = a.chart,
                b = a.scale,
                a = this.elements,
                f = this.layers.dataset,
                k = this.canvasWidth,
                g = this.canvasHeight,
                p = b.min,
                m = b.max,
                l = b && b.trendPoint || [],
                n = d.colorRangeFillMix,
                s = d.colorRangeFillRatio,
                r = d.colorRangeBorderColor,
                t = d.colorRangeBorderAlpha,
                u = d.colorRangeBorderThickness,
                B = c.colorRangeGetter.getColorRangeArr(p, m),
                d = d.showShadow,
                q, w, T, x, y, D = c.colorManager,
                C, E, U;
            a.linear || (a.linear = q = e.group("colorrange", f), a.outerRect = e.rect(q));
            a.outerRect.attr({
                x: 0,
                y: 0,
                width: k,
                height: g,
                stroke: "none",
                r: 0
            });
            c = c.isHorizontal ? b.reverseScale ? 3 : 1 : b.reverseScale ? 4 : 2;
            1 === c ? (f = function (a, b) {
                return {
                    x: a * k / (m - p),
                    y: 0,
                    width: (b - a) * k / (m - p),
                    height: g
                }
            }, w = 270) : 2 === c ? (f = function (a, b) {
                return {
                    x: 0,
                    y: a * g / (m - p),
                    width: k,
                    height: (b - a) * g / (m - p)
                }
            }, w = 180) : 3 === c ? (f = function (a, b) {
                return {
                    x: k - b * k / (m - p),
                    y: 0,
                    width: (b - a) * k / (m - p),
                    height: g
                }
            }, w = 270) : (f = function (a, b) {
                return {
                    x: 0,
                    y: g - b * g / (m - p),
                    width: k,
                    height: (b -
                        a) * g / (m - p)
                }
            }, w = 180);
            a.colorRangeElems || (a.colorRangeElems = []);
            c = 0;
            for (b = B.length; c < b; c += 1) x = B[c], y = f(x.minvalue - p, x.maxvalue - p), x.x = y.x, x.y = y.y, x.width = y.width, x.height = y.height, T = x.code, T = F(Da(T, r), t), d && Math.max(x.alpha, t), C = D.parseColorMix(x.code, n), E = D.parseAlphaList(x.alpha, C.length), U = h(x.borderAlpha, t), x = E.split(v), x = Aa.apply(Math, x), x = Aa(u && U || 0, x), a.colorRangeElems[c] || (a.colorRangeElems[c] = e.rect(q)), a.colorRangeElems[c].attr({
                x: y.x,
                y: y.y,
                width: y.width,
                height: y.height,
                r: 0,
                "stroke-width": u,
                stroke: T,
                fill: R({
                    FCcolor: {
                        color: C.toString(),
                        ratio: s,
                        alpha: E,
                        angle: w
                    }
                })
            }).shadow({
                apply: d,
                opacity: x / 100
            });
            for (; a.colorRangeElems[c];) a.colorRangeElems[c].remove(), a.colorRangeElems.splice(c, 1);
            a.trendObjElems || (a.trendObjElems = []);
            c = 0;
            for (b = l.length; c < b; c += 1) n = l[c], y = f(n.startValue - p, n.endValue - p), n.isZone ? (a.trendObjElems[c] || (a.trendObjElems[c] = e.rect(q)), a.trendObjElems[c].attr({
                    x: y.x,
                    y: y.y,
                    width: 0 < y.width ? y.width : 0,
                    height: 0 < y.height ? y.height : 0,
                    r: 0,
                    fill: R({
                        FCcolor: {
                            color: n.color,
                            alpha: n.alpha
                        }
                    })
                })) :
                a.trendObjElems[c] = this.path(["M", y.x, y.y, "L", y.x, y.y + y.height], q).attr({
                    stroke: F(n.color, n.alpha),
                    "stroke-width": n.thickness,
                    "stroke-dasharray": n.dashStyle
                });
            for (; a.trendObjElems[c];) a.trendObjElems[c].remove(), a.trendObjElems.splice(c, 1)
        },
        drawWidgetValue: function (a) {
            var e = this,
                c = e.paper,
                d = e.layers.dataset,
                b = e.canvasWidth,
                f = e.canvasHeight,
                k = e.options.scale,
                g = k.max,
                p = k.min,
                m = g - p,
                l = a[0],
                n = a[1],
                s = k && k.trendPoint || [],
                r, t, u = n.borderWidth,
                q = e.logic.isHorizontal,
                L;
            t = a.length;
            var w = 0,
                T = 0,
                x = 0,
                y = 0,
                D = p,
                C, E,
                v, K, A, H;
            q ? (w = b / m, y = f / 2) : (T = f / m, x = b / 2);
            k.reverseScale && (w = -w, T = -T, D = g);
            for (; t--;) L = a[t], k = h(L.y, D) - D, L.plotX = L.origX = k * w + x, L.plotY = L.origY = k * T + y;
            for (t = s.length; t--;) L = s[t], k = L.startValue - p, L.plotX = L.origX = k * w + x, L.plotY = L.origY = k * T + y;
            k = function (a) {
                a = h(a, D) - D;
                return {
                    x: a * w + x,
                    y: a * T + y
                }
            }(Math.min(Math.max(p, 0), g));
            ia(l.y) && (l.plotAsDot ? (s = t = l.plotFillPercent / 100 * (q ? f : b), a = l.plotX - t / 2, g = l.plotY - s / 2, q ? (l.animInitAttr = {
                x: k.x
            }, l.animAttr = {
                x: a
            }) : (l.animInitAttr = {
                y: k.y
            }, l.animAttr = {
                y: g
            })) : (a = Math.min(l.plotX,
                k.x), g = Math.min(l.plotY, k.y), s = Math.abs(l.plotY - k.y), t = Math.abs(l.plotX - k.x), q ? (l.animInitAttr = {
                x: k.x,
                width: 0
            }, l.animAttr = {
                x: a,
                width: t
            }, s = l.plotFillPercent / 100 * f, g -= s / 2) : (l.animInitAttr = {
                y: k.y,
                height: 0
            }, l.animAttr = {
                y: g,
                height: s
            }, t = l.plotFillPercent / 100 * b, a -= t / 2)), p = {
                link: L.link,
                value: l.y,
                displayValue: l.displayValue,
                toolText: L.toolText
            }, L.shapeType = "rect", L.shapeArgs = {
                x: a,
                y: g,
                height: s,
                width: t,
                endY: r,
                r: 0
            }, v = l.rolloverProperties || {}, v.enabled && void 0 !== v.plotFillHoverPercent && (v.showHoverAnimation ? (C = {}, E = {}) : (C = v.hoverAttr, E = v.outAttr), l.plotAsDot ? (C.width = C.height = v.plotFillHoverPercent / 100 * (q ? f : b), C.x = l.plotX - C.width / 2, C.y = l.plotY - C.width / 2, E.width = E.height = t, E.x = a, E.y = g) : q ? (C.height = v.plotFillHoverPercent / 100 * f, C.y = Math.min(l.plotY, k.y) - C.height / 2, E.height = s, E.y = g) : (C.width = v.plotFillHoverPercent / 100 * b, C.x = Math.min(l.plotX, k.x) - C.width / 2, E.width = t, E.x = a)), L.graphic = c.rect(a, g, t, s, 0, d).attr({
                fill: L.color,
                stroke: L.borderColor,
                ishot: !0,
                "stroke-width": L.borderWidth
            }).click(function (a) {
                ma.call(this,
                    e, a)
            }).hover(function (a) {
                ma.call(this, e, a, "DataPlotRollOver");
                v.enabled && (this.attr(v.hoverAttr), v.showHoverAnimation && this.animate(C, 100, "easeOut"))
            }, function (a) {
                ma.call(this, e, a, "DataPlotRollOut");
                v.enabled && (this.attr(v.outAttr), v.showHoverAnimation && this.animate(E, 100, "easeOut"))
            }).tooltip(L.toolText).data("eventArgs", p));
            ia(n.y) && (q ? (t = f * n.targetFillPercent / 100, s = t / 2, l = a = n.plotX, p = g = n.plotY - s, r = n.plotY + s, s = t, t = u, L = a - u / 2, k = [a + u, n.plotY]) : (t = b * n.targetFillPercent / 100, s = t / 2, L = a = n.plotX - s, g = r = n.plotY,
                l = n.plotX + s, s = u, p = g - u / 2, k = [n.plotX, g + u + 10]), n.shapeType = "rect", n.tooltipPos = k, n.trackerArgs = {
                x: L,
                y: p,
                height: s,
                width: t,
                r: 0
            }, n.shapeArgs = ["M", a, g, "L", l, r], n.animInitAttr = {
                d: ["M", n.plotX, n.plotY, "L", n.plotX, n.plotY]
            }, n.animAttr = {
                d: n.shapeArgs
            }, p = {
                link: n.link,
                value: n.y,
                displayValue: n.displayValue,
                toolText: n.toolText
            }, K = n.rolloverProperties || {}, K.enabled && void 0 !== K.plotFillHoverPercent && (K.showHoverAnimation ? (H = {}, A = {
                d: n.shapeArgs
            }) : (H = K.hoverAttr, K.outAttr.d = n.shapeArgs), q ? (t = f * n.plotFillHoverPercent /
                100, s = t / 2, H.d = ["M", a, n.plotY - s, "L", l, n.plotY + s]) : (t = b * n.plotFillHoverPercent / 100, s = t / 2, H.d = ["M", n.plotX - s, g, "L", n.plotX + s, r])), n.graphic = c.path(n.shapeArgs, d).attr({
                stroke: n.borderColor,
                "stroke-width": u,
                "stroke-linecap": "round",
                ishot: !0,
                "shape-rendering": wb[1 > u]
            }).click(function (a) {
                ma.call(this, e, a)
            }).hover(function (a) {
                ma.call(this, e, a, "DataPlotRollOver");
                K.enabled && (this.attr(K.hoverAttr), K.showHoverAnimation && this.animate(H, 100, "easeOut"))
            }, function (a) {
                ma.call(this, e, a, "DataPlotRollOut");
                K.enabled &&
                    (this.attr(K.outAttr), K.showHoverAnimation && this.animate(A, 100, "easeOut"))
            }).tooltip(n.toolText).data("eventArgs", p))
        }
    }, z["renderer.widgetbase"]);
    z("renderer.hbullet", {
        drawWidgetLabel: function (a) {
            var e = this.options,
                c = e.chart,
                d = this.layers,
                b = this.paper,
                f = d.datalabels;
            a = a[0];
            var k = this.canvasWidth,
                g = this.canvasHeight,
                h = c.valuePadding,
                e = e.plotOptions.series.dataLabels.style,
                m = {
                    fontFamily: e.fontFamily,
                    fontSize: e.fontSize,
                    lineHeight: e.lineHeight,
                    fontWeight: e.fontWeight,
                    fontStyle: e.fontStyle
                };
            f || (f = d.datalabels =
                b.group("datalabels").insertAfter(d.dataset));
            d = k + h;
            void 0 === a.y || isNaN(a.y) || a.displayValue === O || (a.dataLabel = b.text(d, g / 2, a.displayValue, f).attr({
                "text-anchor": Ba[Ia],
                title: a.originalText || "",
                fill: e.color,
                direction: c.textDirection,
                "text-bound": [e.backgroundColor, e.borderColor, e.borderThickness, e.borderPadding, e.borderRadius, e.borderDash]
            }).css(m))
        }
    }, z["renderer.bullet"]);
    z("renderer.hlinear", {
        drawWidget: function () {
            var a = this.options,
                e = this.paper,
                c = this.logic,
                d = a.chart,
                b = a.scale,
                a = this.elements,
                f = this.layers.dataset,
                k = this.canvasWidth,
                g = this.canvasHeight,
                p = b.min,
                m = b.max,
                b = b && b.trendPoint || [],
                l = d.colorRangeFillMix,
                n = d.colorRangeFillRatio,
                s = d.colorRangeBorderColor,
                r = d.colorRangeBorderAlpha,
                t = d.colorRangeBorderThickness,
                u = c.colorRangeGetter.getColorRangeArr(p, m),
                B = d.showShadow,
                L, w, T, x, y, D, C = this.pointOrientation = {
                    top: 1,
                    bottom: 3
                },
                E = c.colorManager,
                U, K, A;
            a.linear || (a.linear = w = e.group("colorrange", f), a.outerRect = e.rect(w));
            a.outerRect.attr({
                x: 0,
                y: 0,
                width: k,
                height: g,
                stroke: "none",
                r: 0
            });
            T = function (a,
                b) {
                return {
                    x: a * k / (m - p),
                    y: 0,
                    width: (b - a) * k / (m - p),
                    height: g
                }
            };
            a.colorRangeElems || (a.colorRangeElems = []);
            c = 0;
            for (L = u.length; c < L; c += 1) y = u[c], D = T(y.minvalue - p, y.maxvalue - p), y.x = D.x, y.y = D.y, y.width = D.width, y.height = D.height, x = y.code, x = F(Da(q(y.bordercolor, x), s), h(y.borderalpha, r)), B && Math.max(y.alpha, r), U = E.parseColorMix(y.code, l), K = E.parseAlphaList(y.alpha, U.length), y = h(y.borderAlpha, r), A = K.split(v), A = Aa.apply(Math, A), A = Aa(t && y || 0, A), a.colorRangeElems[c] || (a.colorRangeElems[c] = e.rect(w)), a.colorRangeElems[c].attr({
                x: D.x,
                y: D.y,
                width: D.width,
                height: D.height,
                r: 0,
                "stroke-width": t,
                stroke: x,
                fill: R({
                    FCcolor: {
                        color: U.toString(),
                        ratio: n,
                        alpha: K,
                        angle: 270
                    }
                })
            }).shadow({
                apply: B,
                opacity: A / 100
            });
            for (; a.colorRangeElems[c];) a.colorRangeElems[c].remove(), a.colorRangeElems.splice(c, 1);
            a.trendObjElems || (a.trendObjElems = []);
            c = 0;
            for (L = b.length; c < L; c += 1) l = b[c], D = T(l.startValue - p, l.endValue - p), l.isZone ? (a.trendObjElems[c] || (a.trendObjElems[c] = e.rect(w)), a.trendObjElems[c].attr({
                x: D.x,
                y: D.y,
                width: 0 < D.width ? D.width : 0,
                height: 0 < D.height ? D.height : 0,
                r: 0,
                "stroke-width": 0,
                fill: R({
                    FCcolor: {
                        color: l.color,
                        alpha: l.alpha
                    }
                })
            }).tooltip(l.tooltext)) : a.trendObjElems[c] = e.path(["M", D.x, D.y, "L", D.x, D.y + D.height], w).attr({
                stroke: F(l.color, l.alpha),
                "stroke-width": l.thickness,
                "stroke-dasharray": l.dashStyle
            }).tooltip(l.tooltext), l.useMarker && (l.showOnTop ? (s = "bottom", n = 0) : (s = "top", n = g), s = 90 * C[s], l.graphic = e.polypath(3, D.x, n, l.markerRadius, s, 0, f).attr({
                fill: l.markerColor,
                stroke: l.markerBorderColor,
                "stroke-width": 1
            }).shadow({
                apply: d.showShadow
            }).tooltip(l.tooltext));
            for (; a.trendObjElems[c];) a.trendObjElems[c].remove(), a.trendObjElems.splice(c, 1)
        },
        drawWidgetValue: function (a, e) {
            var c = a && a.length || 0,
                d = this.options.chart,
                b = this.pointOrientation,
                f = {
                    point: [],
                    showPointerShadow: d.showPointerShadow
                },
                d = d.pointerOnOpp ? "top" : "bottom";
            for (this.dataById = {}; c--;) f.point[c] = {
                startAngle: 90 * b[d]
            };
            this.drawPointerValues(null, e, f)
        },
        drawPointerValues: function (a, e, c) {
            var d = this;
            a = d.layers.dataset;
            var b = d.options,
                f = d.elements,
                k = d.paper,
                g = b.scale,
                p = b.series && b.series[0] && b.series[0].data || [],
                m = d.canvasWidth,
                l = d.canvasHeight,
                l = b.chart.pointerOnOpp ? l : 0,
                n = b.chart.showPointerShadow,
                b = !1 !== b.tooltip.enabled,
                s = (g.max - g.min) / m,
                r = g.min,
                t = g.max,
                u = p.length,
                q, L, w, v, x = {
                    pageX: 0,
                    pageY: 0
                },
                y = function (a) {
                    L = d.fusionCharts.getDataJSON();
                    this.dragStartX = a
                },
                D = function () {
                    var a, b = d.fusionCharts;
                    (a = b && b.jsVars) && (a._rtLastUpdatedData = b.getDataJSON());
                    da.raiseEvent("RealTimeUpdateComplete", {
                            data: "&value=" + this.updatedValStr,
                            updateObject: {
                                values: [this.updatedValStr]
                            },
                            prevData: L.values,
                            source: "editMode",
                            url: null
                        },
                        b);
                    try {
                        na.FC_ChartUpdated && na.FC_ChartUpdated(b.id)
                    } catch (c) {
                        setTimeout(function () {
                            throw c;
                        }, 1)
                    }
                    this.graphic.tooltip(this.toolText)
                },
                C = function (a, b, c, e, f) {
                    a = Db && (Db && f.sourceEvent && f.sourceEvent.touches && f.sourceEvent.touches[0] || f) || x;
                    b = h(this.y, g.min);
                    e = b - (this.dragStartX - c) * s;
                    var k = 0,
                        l = [];
                    e < g.min ? e = g.min : e > g.max && (e = g.max);
                    for (; k < this.index; k += 1) l.push("");
                    l.push(e);
                    b !== e && d.realtimeUpdate({
                        values: l
                    }, {
                        duration: 0
                    }) && (this.updatedValStr = l.join("|"), this.dragStartX = c || f.pageX || a.pageX)
                },
                E, A, K, z, H,
                I;
            z = function (a) {
                ma.call(this, d, a)
            };
            H = function (a) {
                var b = this.data("rolloverProperties");
                b.enabled && (this.attr(b.hoverAttr), b.hoverAnimAttr && this.animate(b.hoverAnimAttr, 100, "easeIn"));
                ma.call(this, d, a, "DataPlotRollOver")
            };
            for (I = function (a) {
                    var b = this.data("rolloverProperties");
                    b.enabled && (this.attr(b.outAttr), b.outAnimAttr && this.animate(b.outAnimAttr, 100, "easeIn"));
                    ma.call(this, d, a, "DataPlotRollOut")
                }; u--;) q = p[u], A = q.rolloverProperties || {}, v = c && c.point[u] && c.point[u].startAngle || q._startAngle, v += .2,
                f.pointers || (f.pointers = []), f.pointers[u] || (void 0 !== q.id && (d.dataById[q.id] = {
                        index: u,
                        point: q
                    }), w = n ? {
                        opacity: Math.max(q.bgalpha, q.borderalpha) / 100
                    } : !1, E = q.editMode ? void 0 : q.link, K = {
                        link: E,
                        value: q.y,
                        displayValue: q.displayValue,
                        toolText: q.toolText
                    }, q.graphic = f.pointers[u] = k.polypath(q.sides, 0, l || 0, q.radius, v, 0, a).attr({
                        fill: q.color,
                        stroke: q.borderColor,
                        ishot: !0,
                        r: q.radius,
                        "stroke-width": q.borderWidth
                    }).shadow(!!w, w && w.opacity).click(z).hover(H, I).data("eventArgs", K).data("rolloverProperties", A), E &&
                    q.graphic.css({
                        cursor: "pointer",
                        _cursor: "hand"
                    }), q._startAngle = v, q.editMode && (q.index = u, q.graphic.css({
                        cursor: "pointer",
                        _cursor: "hand"
                    }).attr({
                        ishot: !0
                    }), q.graphic.drag(C, y, D, q, q, q))), q.graphic = f.pointers[u], b && q.graphic.tooltip(q.toolText), e && e.duration ? q.graphic.animate({
                    polypath: [q.sides, m * (h(q.y, r) - r) / (t - r), l || 0, q.radius, v, 0]
                }, e.duration, "easeIn") : q.graphic.attr({
                    polypath: [q.sides, m * (h(q.y, r) - r) / (t - r), l || 0, q.radius, v, 0]
                })
        },
        drawWidgetLabel: function (a, e) {
            var c = this.options,
                d = c.scale,
                b = this.layers,
                f = this.paper,
                k = c.chart,
                g = this.logic,
                b = b.datalabels || (b.datalabels = f.group("datalabels").insertAfter(b.dataset)),
                p = d.min,
                m = d.max,
                l = k.textDirection,
                n = g.colorRangeGetter.getColorRangeArr(p, m),
                g = g.numberFormatter,
                s = k.colorRangeStyle.style || {},
                r, t = this.canvasWidth,
                u = this.canvasHeight,
                d = d && d.trendPoint || [],
                B = k.pointerOnOpp,
                L = k.valueInsideGauge;
            r = k.showGaugeLabels;
            var w = c.plotOptions.series.dataLabels.style,
                v, x, y, D, C, E, A, K, z;
            K = !1;
            var c = this.smartLabel,
                H, I, J;
            J = h(parseInt(w.fontHeight, 10), parseInt(w.lineHeight,
                10), 12);
            var F = k.valuePadding + .5 * J,
                k = k.valuePadding,
                G = F,
                w = {
                    fontFamily: w.fontFamily,
                    fontSize: w.fontSize,
                    lineHeight: w.lineHeight,
                    fontWeight: w.fontWeight,
                    fontStyle: w.fontStyle
                },
                F = L === B ? F - J / 4 : F + J / 4;
            c.setStyle(w);
            I = c.getOriSize("W...").width;
            D = this.getPointerLabelXY = function (a, b, c, d) {
                return {
                    x: (a - p) * t / (m - p),
                    y: c ? b ? u - d - F : u + F : b ? F : -(F + d),
                    align: "middle"
                }
            };
            C = function (a, b) {
                return {
                    x: (a - p + (b - a) / 2) * t / (m - p),
                    y: u / 2,
                    width: (b - a) * t / (m - p),
                    height: u
                }
            };
            if (a && a.length)
                for (w = a.length; w--;)
                    if (y = a[w], 0 !== y.showvalue && y.displayValue !==
                        O && (H = c.getOriSize(y.displayValue), y.setWidth && (H = c.getSmartText(y.displayValue, y.setWidth, H.height, !0)), E = this.getPointerLabelXY(y.y, L, B, H.height / 2), y.isLabelString)) {
                        K = !1;
                        for (z = 1; !K;) {
                            A = a[w + z];
                            if (!A) break;
                            A.isLabelString ? K = !0 : z += 1
                        }
                        A && (K = c.getOriSize(A.displayValue), v = D(A.y, L, B, K.height / 2), z = v.x - K.width / 2 - (E.x + H.width / 2), v = v.x - E.x, 0 > z && (x = H.width + z, x > v && (y.setWidth = x = v), x > I ? (E = y.setWidth && y.setWidth <= x ? c.getSmartText(y.displayValue, y.setWidth, H.height, !0) : c.getSmartText(y.displayValue, x, H.height, !0), y.displayValue = E.text, E.tooltext && (y.originalText = E.tooltext)) : (E = c.getSmartText(y.displayValue, I, H.height, !0), y.displayValue = E.text, E.tooltext && (y.originalText = E.tooltext), z = 2 * z + I - 4), y.setWidth = null, x = K.width + z - 4, A.setWidth = x > v ? v : x > I ? x : I));
                        y.setWidth && (E = c.getSmartText(y.displayValue, y.setWidth, H.height, !0), y.displayValue = E.text, E.tooltext && (y.originalText = E.tooltext), y.setWidth = null)
                    }
            this.drawPointerLabels(null, e);
            s = s || {};
            c.setStyle(s);
            if (n && r)
                for (w = 0, B = n.length; w < B; w += 1) r = n[w], L = q(r.label,
                    r.name), ia(L) && L !== O && (E = C(r.minvalue, r.maxvalue), H = E.width - 4 > I && E.height - 4 > J ? c.getSmartText(L, E.width - 4, E.height - 4) : c.getSmartText(L, E.width, E.height), f.text(b).attr({
                    "text-anchor": Na,
                    title: H.tooltext || "",
                    "vertical-align": Na,
                    text: H.text,
                    x: E.x,
                    y: E.y,
                    direction: l,
                    fill: s.color
                }).css(s));
            if (d)
                for (w = 0, B = d.length; w < B; w += 1) {
                    n = d[w];
                    n.displayValue = q(n.displayValue, g.dataLabels(n.startValue));
                    c.setStyle(n.style);
                    J = c.getOriSize("Wg").height;
                    H = c.getOriSize(n.displayValue);
                    E = D(n.startValue, 0, !n.showOnTop);
                    n.setWidth &&
                        (H = c.getSmartText(n.displayValue, n.setWidth, H.height, !0));
                    K = !1;
                    for (z = 1; !K;) {
                        A = d[w + z];
                        if (!A) break;
                        A.showOnTop === n.showOnTop ? K = !0 : z += 1
                    }
                    A && (K = c.getOriSize(A.displayValue), v = D(A.startValue, 0, !A.showOnTop), z = v.x - K.width / 2 - (E.x + H.width / 2), 0 > z && (v = v.x - E.x, x = H.width + z, x > v && (n.setWidth = x = v), x > I ? (H = n.setWidth && n.setWidth <= x ? c.getSmartText(n.displayValue, n.setWidth, H.height, !0) : c.getSmartText(n.displayValue, H.width + z - 4, H.height, !0), n.displayValue = H.text, H.tooltext && (n.originalText = H.tooltext)) : (H = c.getSmartText(n.displayValue,
                        I, H.height, !0), n.displayValue = H.text, H.tooltext && (n.originalText = H.tooltext), z = 2 * z + I - 4), n.setWidth = null, x = K.width + z - 4, A.setWidth = x > v ? v : x > I ? x : I));
                    n.setWidth && (H = c.getSmartText(n.displayValue, n.setWidth, H.height, !0), n.displayValue = H.text, H.tooltext && (n.originalText = H.tooltext), n.setWidth = null);
                    J = n.showOnTop ? -(k + H.height / 2) : u + G;
                    s = n.isZone ? C(n.startValue, n.endValue).x : E.x;
                    n.dataLabel = f.text(0, J, n.displayValue, b).attr({
                        "text-anchor": Ba[E.align],
                        direction: l,
                        title: n.originalText || ""
                    }).css(n.style);
                    n.dataLabel.attr({
                        x: s
                    })
                }
        },
        drawPointerLabels: function (a, e) {
            for (var c = this.layers.datalabels, d = this.paper, b = this.options, f = b.chart, k = f.pointerOnOpp, g = f.valueInsideGauge, f = f.textDirection, h = this.smartLabel, m = b.series && b.series[0] && b.series[0].data || [], b = b.plotOptions.series.dataLabels.style, l = m.length, n = {
                    fontFamily: b.fontFamily,
                    fontSize: b.fontSize,
                    lineHeight: b.lineHeight,
                    fontWeight: b.fontWeight,
                    fontStyle: b.fontStyle
                }, s, r, t; l--;) r = m[l], s = r.displayValue, 0 !== r.showvalue && s !== O && (t = h.getOriSize(s), t = this.getPointerLabelXY(r.y, g,
                k, t.height / 2), r.dataLabel ? r.dataLabel.attr({
                text: s,
                title: r.originalText || ""
            }) : r.dataLabel = d.text(c).attr({
                "text-anchor": Ba[t.align],
                title: r.originalText || "",
                text: s,
                x: 0,
                y: t.y,
                fill: b.color,
                direction: f,
                "text-bound": [b.backgroundColor, b.borderColor, b.borderThickness, b.borderPadding, b.borderRadius, b.borderDash]
            }).css(n), e && e.duration ? r.dataLabel.animate({
                x: t.x
            }, e.duration, "easeIn") : r.dataLabel.attr({
                x: t.x
            }))
        },
        realtimeUpdate: function (a, e) {
            if (a === this.lastUpdatedObj) return !1;
            var c = this.options,
                d = c[P],
                b =
                c.series,
                f = this.numberFormatter,
                b = b && b[0] && b[0].data,
                k = a.values || [],
                g = a.labels || [],
                h = a.toolTexts || [],
                m = a.showLabels || [],
                l = b && b.length || 0,
                n, s, r = null,
                t = [],
                u;
            e = e || c.plotOptions.series.animation;
            if (l) {
                for (; l--;) c = {}, u = {}, n = b[l], void 0 !== k[l] && "" !== k[l] ? (c.value = u.value = k[l], r = u.displayvalue = u.tooltext = f.dataLabels(u.value), u.hasNewData = !0) : u.value = n.y, g[l] && (u.displayvalue = g[l], u.hasNewData = !0), "0" == m[l] && (u.displayvalue = O, u.hasNewData = !0), s = G($(q(n._tooltext, d.tooltext))), h[l] && (s = G($(h[l])), u.hasNewData = !0), u.hasNewData && (t[l] = u, V(n, {
                    y: u.value,
                    displayValue: n.displayValue || "1" == m[l] ? u.displayvalue : O,
                    toolText: void 0 !== s ? Ya(s, [1, 2], {
                        formattedValue: r
                    }, c) : r
                }));
                t.length && (this.lastUpdatedObj = a, this.drawPointerValues(b, e), this.drawPointerLabels(b, e));
                return Boolean(t.length)
            }
        }
    }, z["renderer.widgetbase"]);
    z("renderer.angular", {
        drawWidget: function () {
            var a = this.options,
                e = a.chart,
                c = a.scale,
                d = a.series[0],
                a = this.paper,
                b = this.elements,
                f = this.layers.dataset,
                k = d.gaugeOuterRadius,
                g = d.gaugeInnerRadius,
                p = d.gaugeFillRatio,
                m = e.gaugeBorderColor,
                l = e.gaugeBorderThickness,
                n = e.gaugeBorderAlpha,
                s = d.gaugeFillMix,
                r = d.gaugeOriginX,
                t = d.gaugeOriginY,
                u = e.gaugeStartAngle,
                B = e.gaugeEndAngle,
                L = e.showShadow,
                e = e.textDirection,
                w = c.min,
                A = c.max,
                x = this.logic,
                y = x.colorRangeGetter.getColorRangeArr(w, A),
                D = 0,
                C = y.length,
                E = A - w,
                B = B - u,
                z, K, G = u,
                H = Math.cos(u),
                I = Math.sin(u),
                J = r + k * H;
            K = t + k * I;
            var H = r + g * H,
                I = t + g * I,
                Ra, c = c.trendPoint,
                P;
            b.trendPointGroup || (b.trendPointGroup = a.group("trendpoint", f));
            for (; D < C; D += 1) z = y[D], K = u + (Math.min(z.maxvalue, A) - w) / E * B, H =
                x.parseColorMix(z.code, s), I = x.parseAlphaList(z.alpha, H.length), J = x.parseRatioList(g / k * 100 + p, H.length), P = z.bordercolor, Ra = h(z.borderAlpha, n), P = P && -1 == P.indexOf("{") ? F(P, Ra) : x.parseColorMix(z.code, q(P, m))[0], P = F(P, Ra), z = I.split(v), z = Aa.apply(Math, z), z = L ? Aa(l && Ra || 0, z) : 0, Ra = K, G > K && (G += K, K = G - K, G -= K), a.ringpath(r, t, k, g, G, K, f).attr({
                    fill: R({
                        FCcolor: {
                            cx: r,
                            cy: t,
                            r: k,
                            gradientUnits: "userSpaceOnUse",
                            color: H.join(),
                            alpha: I,
                            ratio: J,
                            radialGradient: !0
                        }
                    }),
                    "stroke-width": l,
                    stroke: P
                }).shadow({
                    apply: L,
                    opacity: z / 100
                }),
                G = Ra;
            b.tickMarkGroup || (b.tickMarkGroup = a.group("tickmark", f));
            b.trendMarkerGroup || (b.trendMarkerGroup = a.group("trendmarker", f));
            b.pointGroup || (b.pointGroup = a.group("pointers", f).translate(r, t));
            b.pivot || (b.pivot = a.circle(f));
            b.pivot.attr({
                cx: r,
                cy: t,
                r: d.pivotRadius,
                fill: R({
                    FCcolor: d.isRadialGradient ? {
                        color: d.pivotFillColor,
                        alpha: d.pivotFillAlpha,
                        ratio: d.pivotFillRatio,
                        radialGradient: !0,
                        angle: d.pivotFillAngle,
                        cx: .5,
                        cy: .5,
                        r: "50%"
                    } : {
                        color: d.pivotFillColor,
                        alpha: d.pivotFillAlpha,
                        ratio: d.pivotFillRatio,
                        radialGradient: !1,
                        angle: d.pivotFillAngle
                    }
                }),
                "stroke-width": d.pivotBorderThickness,
                stroke: d.pivotBorderColor
            }).shadow({
                apply: L
            });
            f = Math.cos(89.99 * db);
            p = -f;
            D = 0;
            for (C = c.length; D < C; D += 1) d = c[D], L = d.isZone, s = u + (d.startValue - w) / E * B, m = h(d.radius, k), l = h(d.innerRadius, L ? Math.max(g - 15, 0) : g), n = h(d.trendValueDistance, 0), H = Math.cos(s), I = Math.sin(s), J = r + m * H, K = t + m * I, H = r + l * H, I = t + l * I, L ? (I = u + (d.endValue - w) / E * B, s > I && (s += I, I = s - I, s -= I), d.graphic = a.ringpath(r, t, m, l, s, I, b.trendPointGroup).attr({
                    fill: F(d.color, d.alpha),
                    "stroke-width": d.showBorder ?
                        d.thickness : 0,
                    stroke: d.borderColor,
                    "stroke-dasharray": d.dashStyle
                })) : d.graphic = a.path(["M", J, K, "L", H, I], b.tickMarkGroup).attr({
                    "stroke-width": d.showBorder ? d.thickness : 0,
                    stroke: d.borderColor,
                    "stroke-linecap": "round",
                    "stroke-dasharray": d.dashStyle
                }), d.useMarker && (d.markerElement = a.polypath("3", J, K, d.markerRadius, (-s + Math.PI) / db, 0, b.trendMarkerGroup).attr({
                    fill: d.markerColor,
                    "stroke-width": 1,
                    stroke: d.markerBorderColor
                }), "" !== d.markerToolText && d.markerElement.tooltip(d.markerToolText)), d.displayValue !==
                O && (K = (d.endValue + d.startValue) / 2, I = u + (K - w) / E * B, H = Math.cos(I), I = Math.sin(I), d.valueInside ? (K = l - 2 - n, m = H > f ? bb : H < p ? Ia : La) : (K = m + 2 + n, m = H > f ? Ia : H < p ? bb : La), J = r + K * H, K = t + K * I, l = d.style, d.textElement = a.text(b.trendMarkerGroup).attr({
                    x: J,
                    y: K,
                    text: d.displayValue,
                    title: d.originalText || "",
                    direction: e,
                    "text-anchor": Ba[d.align || m],
                    "vertical-align": Ma
                }).css(l), J = d.textElement.getBBox(), J = J.height, K = H > f || H < p ? K + (-(J / 2) + .4 * J * I * (d.valueInside ? -1 : 1)) : d.valueInside ? K + -(0 > I ? 0 : J) : K + -(0 < I ? 0 : J), d.textElement.attr({
                    y: K
                }))
        },
        drawWidgetValue: function (a,
            e) {
            var c = this,
                d = c.options,
                b = d.chart,
                f = d.scale,
                k = d.series[0],
                g = c.paper,
                p = c.elements,
                m = Number(k.gaugeOriginX),
                l = Number(k.gaugeOriginY),
                n = b.gaugeStartAngle,
                s = b.gaugeEndAngle,
                b = b.showShadow,
                d = !1 !== d.tooltip.enabled,
                r = f.min,
                t = f.max,
                q = p.pointGroup,
                B = t - r,
                L = s - n,
                w = B / L,
                v = 0,
                x, y, D, C, E, A, z, F = a && a.length,
                H, I = cc(n, s),
                J = $b(c.container),
                G = function (a, b) {
                    var d;
                    d = [m, l];
                    d = Lb(d[1] - b + J.top, d[0] - a + J.left);
                    c.rotationStartAngle = d;
                    H = c.fusionCharts.getDataJSON()
                },
                O = function () {
                    var a = c.fusionCharts,
                        b;
                    (b = a && a.jsVars) && (b._rtLastUpdatedData =
                        a.getDataJSON());
                    da.raiseEvent("RealTimeUpdateComplete", {
                        data: "&value=" + this.updatedValStr,
                        updateObject: {
                            values: [this.updatedValStr]
                        },
                        prevData: H.values,
                        source: "editMode",
                        url: null
                    }, a);
                    try {
                        na.FC_ChartUpdated && na.FC_ChartUpdated(a.id)
                    } catch (d) {
                        setTimeout(function () {
                            throw d;
                        }, 1)
                    }
                },
                N = function (a, b, d, e) {
                    a = [m, l];
                    d = Lb(a[1] - e + J.top, a[0] - d + J.left);
                    e = c.rotationStartAngle;
                    var g;
                    e = 0 > d && 0 < e ? Bb(d) - c.rotationStartAngle : 0 < d && 0 > e ? Bb(c.rotationStartAngle) - d : c.rotationStartAngle - d;
                    e = this.y - e * w;
                    a = [];
                    b = 0;
                    g = this.index;
                    e <
                        f.min ? e = f.min : e > f.max && (e = f.max);
                    for (; b < g; b += 1) a.push("");
                    a.push(e);
                    e !== this.value && c.realtimeUpdate({
                        values: a
                    }, {
                        duration: 0
                    }) && (this.updatedValStr = a.join("|"), c.rotationStartAngle = d)
                },
                Q, S, R, M, P, V, Z, X, aa, ba;
            void 0 === c.dataById && (c.dataById = {});
            p.pointers || (p.pointers = []);
            X = function (a) {
                ma.call(this, c, a)
            };
            aa = function (a) {
                var b = this.data("rolloverProperties");
                ma.call(this, c, a, "DataPlotRollOver");
                b.enabled && (a = this.attr("transform"), this.attr("transform", ""), this.attr(b.hoverAttr), this.attr("transform",
                    a))
            };
            for (ba = function (a) {
                    var b = this.data("rolloverProperties");
                    ma.call(this, c, a, "DataPlotRollOut");
                    b.enabled && (a = this.attr("transform"), this.attr("transform", ""), this.attr(b.outAttr), this.attr("transform", a))
                }; v < F; v += 1) s = a[v], S = s.rolloverProperties || {}, ia(s.y) || (s.y = r, ia(s.toolText) || (s.toolText = r), " " === s.displayValue && (s.displayValue = r)), void 0 !== s.id && (c.dataById[s.id] = {
                    index: v,
                    point: s
                }), s.index = v, x = h(s.radius, (Number(k.gaugeOuterRadius) + Number(k.gaugeInnerRadius)) / 2), y = s.baseWidth, A = y / 2, D = s.topWidth,
                z = D / 2, E = s.rearExtension, C = s.baseRadius, s.tooltipPos = [m, l], p.pointers[v] ? C = p.pointers[v] : (Q = s.editMode ? void 0 : s.link, R = ["M", x, -z, "L", x, z, -E, A, -E, -A, "Z"], S.hasHoverSizeChange && (S.outAttr.path = R, M = h(S.hoverRadius, x), P = S.baseHoverWidth, P /= 2, V = S.topHoverWidth, V /= 2, Z = S.rearHoverExtension, S.hoverAttr.path = ["M", M, -V, "L", M, V, -Z, P, -Z, -P, "Z"]), Q = {
                    link: Q,
                    value: s.y,
                    displayValue: s.displayValue,
                    toolText: s.toolText
                }, p.pointers[v] = D ? g.path(R, q) : g.trianglepath(x, z, -E, A, -E, -A, 0, C, C, q), s.graphic = C = p.pointers[v], s.graphic.attr({
                    fill: s.color,
                    stroke: s.borderColor,
                    ishot: !0,
                    "stroke-width": s.borderThickness
                }).click(X).hover(aa, ba).data("eventArgs", Q).data("rolloverProperties", S), (y || D || s.borderThickness) && s.graphic.shadow({
                    apply: b
                }), C._attr = C.attr, C.attr = I, C._Attr = {
                    tooltipPos: s.tooltipPos,
                    cx: m,
                    cy: l,
                    toolTipRadius: x - E,
                    color: s.color
                }, x = n / db, C.attr({
                    angle: x
                }), s.editMode && (s.index = v, s.graphic.css({
                    cursor: "pointer",
                    _cursor: "hand"
                }).attr({
                    ishot: !0
                }), s.graphic.drag(N, G, O, s, s, s))), s.y >= r && s.y <= t && (x = (s.y - r) / B * L, x = (n + x) / db, C.attr({
                        angle: x
                    }, null, e),
                    d && C.tooltip(s.toolText))
        },
        drawWidgetLabel: function (a) {
            var e = this.paper,
                c = this.layers,
                d = c.datalabels,
                b = this.options,
                f = b.series[0],
                k = b.plotOptions.series.dataLabels.style,
                g = f.pivotRadius,
                p = h(parseInt(k.lineHeight, 10), 12),
                m = f.valueBelowPivot,
                l = f.gaugeOriginX,
                n = b.chart.textDirection,
                s = {
                    fontFamily: k.fontFamily,
                    fontSize: k.fontSize,
                    lineHeight: k.lineHeight,
                    fontWeight: k.fontWeight,
                    fontStyle: k.fontStyle
                },
                r, t, q, B = f.gaugeOriginY + (m ? p / 2 + g + 2 : -(p / 2) - g - 2);
            d || (d = c.datalabels = e.group("datalabels").insertAfter(c.dataset));
            bc(a, function (a, b) {
                r = a.displayValue;
                q = a.valueY;
                t = h(a.valueX, l);
                ia(q) || (q = m ? B + p * b : B - p * b);
                ia(r) && r !== O && (a.dataLabel ? a.dataLabel.attr({
                    text: r,
                    title: a.originalText || ""
                }) : a.dataLabel = e.text(d).attr({
                    x: t,
                    y: q,
                    text: r,
                    "text-anchor": Ba[La],
                    direction: n,
                    title: a.originalText || "",
                    fill: k.color,
                    "text-bound": [k.backgroundColor, k.borderColor, k.borderThickness, k.borderPadding, k.borderRadius, k.borderDash]
                }).css(s))
            })
        },
        drawScale: function () {
            var a = this.options,
                e = a.chart,
                c = a.scale,
                d = this.paper,
                b = this.elements,
                f = a.series[0],
                a = Number(f.gaugeOriginX),
                k = Number(f.gaugeOriginY),
                g = e.gaugeStartAngle,
                p = c.min,
                m = e.textDirection,
                l = Number(f.gaugeInnerRadius),
                n = Number(f.gaugeOuterRadius),
                f = c.max - p,
                e = e.gaugeEndAngle - g,
                s = 0,
                r = c.majorTM,
                t = c.minorTM,
                q = b.tickMarkGroup,
                B, L, w, v, x, y, D = Math.cos,
                C = Math.sin,
                E = Number(c.minorTMHeight),
                A = Number(c.majorTMHeight),
                z = c.placeTicksInside,
                s = c.placeValuesInside;
            x = c.tickValueDistance;
            var G, H, I = c.limitValues.style,
                J = c.tickValues.style,
                O = .75 * h(parseInt(I.lineHeight, 10), 12),
                R = .75 * h(parseInt(J.lineHeight, 10),
                    12);
            z ? (z = l, E = z + E, A = z + A) : (z = n, E = z - E, A = z - A);
            G = s ? l - x : n + x;
            b.majorTM || (b.majorTM = []);
            b.tmLabel || (b.tmLabel = []);
            s = 0;
            for (l = r.length; s < l; s += 1) n = r[s], B = n.value, x = n.displayValue, y = (B - p) * e / f + g, H = D(y), y = C(y), B = a + z * H, L = k + z * y, w = a + A * H, v = k + A * y, b.majorTM[s] = d.path(["M", B, L, "L", w, v], q).attr({
                stroke: F(c.majorTMColor, c.majorTMAlpha),
                "stroke-width": c.majorTMThickness,
                "stroke-linecap": "round"
            }), "" !== x && (0 === s || s === l - 1 ? (w = I, L = k + G * y + (n.y || 0) - O) : (w = J, L = k + G * y + (n.y || 0) - R), B = a + G * H + (n.x || 0), b.tmLabel[s] = d.text(B, L, x, q).attr({
                "text-anchor": Ba[n.align ||
                    La],
                title: n.originalText || "",
                direction: m,
                "vertical-align": Ma
            }).css(w));
            b.minorTM || (b.minorTM = []);
            s = 0;
            for (l = t.length; s < l; s += 1) B = t[s], y = (B - p) * e / f + g, B = a + z * D(y), L = k + z * C(y), w = a + E * D(y), v = k + E * C(y), b.minorTM[s] = d.path(["M", B, L, "L", w, v], q).attr({
                stroke: F(c.minorTMColor, c.minorTMAlpha),
                "stroke-width": c.minorTMThickness,
                "stroke-linecap": "round"
            })
        },
        realtimeUpdate: function (a, e) {
            if (a === this.lastUpdatedObj) return !1;
            var c = this.options,
                d = c[P],
                b = c.series,
                f = this.numberFormatter,
                b = b && b[0] && b[0].data,
                k = a.values || [],
                g =
                a.labels || [],
                h = a.toolTexts || [],
                m = a.showLabels || [],
                l = b && b.length || 0,
                n, s, r = null,
                t = [],
                u, B;
            e = e || c.plotOptions.series.animation;
            if (l) {
                for (; l--;) u = {}, c = {}, B = !1, n = b[l], s = n.id && (n.id.toLowerCase && n.id.toLowerCase() || n.id), void 0 !== k[l] && "" !== k[l] && (B = !0) || s && a[s] ? (c.value = u.value = B ? k[l] : a[s], r = u.displayvalue = u.tooltext = f.dataLabels(u.value), u.hasNewData = !0) : u.value = n.y, g[l] && (u.displayvalue = g[l], u.hasNewData = !0), "0" == m[l] && (u.displayvalue = O, u.hasNewData = !0), s = G($(q(n._tooltext, d.tooltext))), h[l] && (s = G($(h[l])),
                    u.hasNewData = !0), u.hasNewData && (t[l] = u, V(n, {
                    y: u.value,
                    displayValue: n.displayValue || "1" === m[l] ? u.displayvalue : O,
                    toolText: void 0 !== s ? Ya(s, [1, 2], {
                        formattedValue: r
                    }, c) : r
                }));
                t.length && (this.lastUpdatedObj = a, this.drawWidgetValue(b, e), this.drawWidgetLabel(b, e));
                return Boolean(t.length)
            }
        }
    }, z["renderer.widgetbase"]);
    z("renderer.funnel", {
        type: "funnel",
        pyramidFunnelShape: function () {
            var a = {
                    y: !0,
                    R1: !0,
                    R2: !0,
                    h: !0,
                    r3dFactor: !0,
                    color: !0,
                    opacity: !0,
                    fill: !0,
                    stroke: !0,
                    strokeColor: !0,
                    strokeAlpha: !0,
                    "stroke-width": !0
                },
                e = function (a, c, d, e, h, m, l, n, s, r) {
                    pb(a) && (c = a.y, d = a.R1, e = a.R2, h = a.h, m = a.r3dFactor, l = a.is2D, r = a.isHollow, s = a.isFunnel, a = a.x);
                    n = a - d;
                    var t = a + d,
                        q = a - e,
                        B = a + e,
                        v = c + h,
                        w, z;
                    if (l) w = {
                        silhuette: ["M", n, c, "L", t, c, B, v, q, v, "Z"]
                    }, s || (w.lighterHalf = ["M", n, c, "L", a, c, a, v, q, v, "Z"], w.darkerHalf = ["M", a, c, "L", t, c, B, v, a, v, "Z"]);
                    else if (s) {
                        q = a;
                        B = c;
                        c = d || .01;
                        t = e || .01;
                        a = r;
                        n = c * m;
                        m *= t;
                        h = B + h;
                        v = la(t, 2) - la(c, 2);
                        d = -2 * (la(t, 2) * B - la(c, 2) * h);
                        e = la(c * m, 2) + la(t * B, 2) - la(t * n, 2) - la(c * h, 2);
                        r = ob(la(d, 2) - 4 * v * e);
                        e = (-d + r) / (2 * v);
                        v = (-d - r) / (2 * v);
                        e < h &&
                            e > B ? z = v : v < h && v > B && (z = e);
                        e = ob((la(z - B, 2) - la(n, 2)) / la(c, 2));
                        d = -e;
                        v = {
                            x: ra(la(c, 2) * e / (z - B) * 100) / 100,
                            y: ra(100 * (la(n, 2) / (z - B) + B)) / 100
                        };
                        e = {
                            x: ra(la(t, 2) * e / (z - h) * 100) / 100,
                            y: ra(100 * (la(m, 2) / (z - h) + h)) / 100
                        };
                        r = {
                            x: ra(la(c, 2) * d / (z - B) * 100) / 100,
                            y: ra(100 * (la(n, 2) / (z - B) + B)) / 100
                        };
                        z = {
                            x: ra(la(t, 2) * d / (z - h) * 100) / 100,
                            y: ra(100 * (la(m, 2) / (z - h) + h)) / 100
                        };
                        v = {
                            topLeft: r,
                            bottomLeft: z,
                            topRight: v,
                            bottomRight: e
                        };
                        for (w in v)
                            if (isNaN(v[w].x) || isNaN(v[w].y)) v[w].x = "topLeft" === w || "bottomLeft" === w ? -c : c, v[w].y = "bottomRight" === w || "bottomLeft" ===
                                w ? h : B;
                        h = v.topLeft;
                        d = v.bottomLeft;
                        w = q + h.x;
                        z = q + v.topRight.x;
                        B = q + d.x;
                        q += v.bottomRight.x;
                        h = h.y;
                        d = d.y;
                        v = ["A", c, n, 0, 0, 0, z, h];
                        e = ["A", c, n, 0, 1, 1, z, h];
                        r = ["A", t, m, 0, 0, 1, B, d];
                        t = ["A", t, m, 0, 1, 0, B, d];
                        t = {
                            front: ["M", w, h].concat(v, ["L", q, d], r, ["Z"]),
                            back: ["M", w, h].concat(e, ["L", q, d], t, ["Z"]),
                            silhuette: ["M", w, h].concat(e, ["L", q, d], r, ["Z"])
                        };
                        a || (t.top = ["M", w, h].concat(v, ["L", z, h], ["A", c, n, 0, 1, 0, w, h], ["Z"]));
                        w = t
                    } else w = d * m, z = e * m, h = Ka(5, d), d = Ka(2, 2 * w), e = Ka(2, d), m = e / m, w = {
                        top: ["M", n, c, "L", a, c + w, t, c, a, c - w, "Z"],
                        front: ["M",
n, c, "L", a, c + w, t, c, B, v, a, v + z, q, v, "Z"],
                        topLight: ["M", n, c + .5, "L", a, c + w + .5, a, c + w - d, n + m, c, "Z"],
                        topLight1: ["M", t, c + .5, "L", a, c + w + .5, a, c + w - e, t - m, c, "Z"],
                        silhuette: ["M", n, c, "L", a, c - w, t, c, B, v, a, v + z, q, v, "Z"],
                        centerLight: ["M", a, c + w, "L", a, v + z, a - 5, v + z, a - h, c + w, "Z"],
                        centerLight1: ["M", a, c + w, "L", a, v + z, a + 5, v + z, a + h, c + w, "Z"]
                    };
                    return w
                },
                c = function (b, c) {
                    var d, g, p = this,
                        m, l, n = !1,
                        s = !1,
                        r = this._3dAttr,
                        q;
                    Za(b) && ia(c) && (d = b, b = {}, b[d] = c);
                    if (Za(b)) p = a[b] ? this._3dAttr[b] : this._attr(b);
                    else {
                        for (d in b) g = b[d], a[d] ? (r[d] = g, "fill" ===
                            d ? (g && g.linearGradient && g.stops && g.stops[0] && (g = g.stops[0][1]), yb.test(g) ? (l = new rb(g), m = l.get("hex"), l = 100 * l.get("a")) : g && g.FCcolor ? (m = g.FCcolor.color.split(v)[0], l = g.FCcolor.opacity.split(v)[0]) : vb.test(g) && (m = g.replace(jb, mb), l = h(r.opacity, 100)), r.color = m, r.opacity = l, s = !0) : "color" === d || "opacity" === d ? (r.fill = R(F(r.color, h(r.opacity, 100))), s = !0) : "stroke" === d || "strokeColor" === d || "strokeAlpha" === d ? r.is2D && ("stroke" === d ? (g && g.linearGradient && g.stops && g.stops[0] && (g = g.stops[0][1]), yb.test(g) ? (l = new rb(g),
                                m = l.get("hex"), l = 100 * l.get("a")) : g && g.FCcolor ? (m = g.FCcolor.color.split(v)[0], l = g.FCcolor.opacity.split(v)[0]) : vb.test(g) && (m = g.replace(jb, mb), l = h(r.opacity, 100)), r.strokeColor = m, r.strokeAlpha = l) : r.stroke = F(r.strokeColor, h(r.strokeAlpha, 100)), r.isFunnel ? this.funnel2D.attr("stroke", r.stroke) : this.borderElement.attr("stroke", r.stroke)) : "stroke-width" === d ? r.is2D && (r.isFunnel ? this.funnel2D.attr(d, g) : this.borderElement.attr(d, g)) : n = !0) : this._attr(d, g);
                        r.is2D ? (n && (m = e(r.x, r.y, r.R1, r.R2, r.h, r.r3dFactor, r.is2D),
                            p.shadowElement.attr({
                                path: m.silhuette
                            }), r.isFunnel ? p.funnel2D.attr({
                                path: m.silhuette
                            }) : (p.lighterHalf.attr({
                                path: m.lighterHalf
                            }), p.darkerHalf.attr({
                                path: m.darkerHalf
                            }), p.borderElement.attr({
                                path: m.silhuette
                            }))), s && (r.isFunnel ? p.funnel2D.attr("fill", R(F(r.color, h(r.opacity, 100)))) : (m = ha(r.color, 80), l = Y(r.color, 80), p.lighterHalf.attr("fill", R(F(l, h(r.opacity, 100)))), p.darkerHalf.attr("fill", R(F(m, h(r.opacity, 100))))))) : (n && (m = e(r.x, r.y, r.R1, r.R2, r.h, r.r3dFactor, r.is2D), p.shadowElement.attr("path",
                            m.silhuette), r.isFunnel ? (p.front.attr("path", m.front), p.back.attr("path", m.back), p.toptop && m.top && p.toptop.attr("path", m.top)) : (p.front.attr("path", m.front), p.toptop.attr("path", m.top), p.topLight.attr("path", m.topLight), p.topLight1.attr("path", m.topLight1), p.centerLight.attr("path", m.centerLight), p.centerLight1.attr("path", m.centerLight1))), s && (m = r.color, l = r.opacity, r.isFunnel ? (s = Y(m, 60), n = ha(m, 60), p.back.attr("fill", R({
                            FCcolor: {
                                color: n + v + s + v + m,
                                alpha: l + v + l + v + l,
                                ratio: "0,60,40",
                                angle: 0
                            }
                        })), p.front.attr("fill",
                            R({
                                FCcolor: {
                                    color: m + v + s + v + n,
                                    alpha: l + v + l + v + l,
                                    ratio: "0,40,60",
                                    angle: 0
                                }
                            })), p.toptop && p.toptop.attr("fill", R({
                            FCcolor: {
                                color: s + v + n,
                                alpha: l + v + l,
                                ratio: "0,100",
                                angle: -65
                            }
                        }))) : (s = Y(m, 80), d = Y(m, 70), n = ha(m, 80), g = "0," + l, q = m + v + d, r = 5 / (r.R1 * r.r3dFactor) * 100, p.centerLight.attr("fill", R({
                            FCcolor: {
                                color: q,
                                alpha: g,
                                ratio: "0,100",
                                angle: 0
                            }
                        })), p.centerLight1.attr("fill", R({
                            FCcolor: {
                                color: q,
                                alpha: g,
                                ratio: "0,100",
                                angle: 180
                            }
                        })), p.topLight.attr("fill", R({
                            FCcolor: {
                                color: d + v + d + v + m + v + m,
                                alpha: l + v + l + v + 0 + v + 0,
                                ratio: "0,50," + r + v + (50 -
                                    r),
                                angle: -45
                            }
                        })), p.topLight1.attr("fill", R({
                            FCcolor: {
                                color: d + v + m + v + n,
                                alpha: l + v + l + v + l,
                                ratio: "0,50,50",
                                angle: 0
                            }
                        })), p.front.attr("fill", R({
                            FCcolor: {
                                color: m + v + m + v + n + v + n,
                                alpha: l + v + l + v + l + v + l,
                                ratio: "0,50,0,50",
                                angle: 0
                            }
                        })), p.toptop.attr("fill", R({
                            FCcolor: {
                                color: s + v + m + v + n + v + n,
                                alpha: l + v + l + v + l + v + l,
                                ratio: "0,25,30,45",
                                angle: -45
                            }
                        })))))
                    }
                    return p
                },
                d = function () {
                    var a = this.shadowElement;
                    d && a.shadow.apply(a, arguments)
                };
            return function (a, f, k, g, p, m, l, n, s, r, q) {
                var u = this.layers.dataset;
                pb(a) && (f = a.y, k = a.R1, g = a.R2, p = a.h,
                    m = a.r3dFactor, l = a.gStr, n = a.is2D, s = a.renderer, q = a.isHollow, r = a.isFunnel, a = a.x);
                m = h(m, .15);
                a = {
                    x: a,
                    y: f,
                    R1: k,
                    R2: g,
                    h: p,
                    r3dFactor: m,
                    is2D: n,
                    isHollow: q,
                    isFunnel: r,
                    renderer: s
                };
                f = e(a);
                l = s.group(l, u);
                l.Shapeargs = f;
                l.shadowElement = s.path(f.silhuette, l).attr({
                    fill: ka,
                    stroke: "none"
                });
                l._attr = l.attr;
                l.attr = c;
                l.shadow = d;
                l._3dAttr = a;
                r ? n ? l.funnel2D = s.path(f.silhuette, l) : (l.back = s.path(f.back, l).attr({
                    "stroke-width": 0,
                    stroke: "none"
                }), l.front = s.path(f.front, l).attr({
                    "stroke-width": 0,
                    stroke: "none"
                }), f.top && (l.toptop =
                    s.path(f.top, l).attr({
                        "stroke-width": 0,
                        stroke: "none"
                    }))) : n ? (l.lighterHalf = s.path(f.lighterHalf, l).attr({
                    "stroke-width": 0
                }), l.darkerHalf = s.path(f.darkerHalf, l).attr({
                    "stroke-width": 0
                }), l.borderElement = s.path(f.silhuette, l).attr({
                    fill: ka,
                    stroke: "none"
                })) : (l.front = s.path(f.front, l).attr({
                    "stroke-width": 0
                }), l.centerLight = s.path(f.centerLight, l).attr({
                    "stroke-width": 0
                }), l.centerLight1 = s.path(f.centerLight1, l).attr({
                    "stroke-width": 0
                }), l.toptop = s.path(f.top, l).attr({
                    "stroke-width": 0
                }), l.topLight = s.path(f.topLight,
                    l).attr({
                    "stroke-width": 0
                }), l.topLight1 = s.path(f.topLight1, l).attr({
                    "stroke-width": 0
                }));
                return l
            }
        }(),
        getPlotData: function (a) {
            var e = this.datasets[0],
                c = e.data[a],
                d = e.userData || (e.userData = []),
                e = "y name color alpha borderColor borderWidth link displayValue toolText".split(" "),
                b;
            if (d[a]) a = d[a];
            else {
                a = d[a] = {};
                for (d = 0; d < e.length; d++) a[b = e[d]] = c[b];
                a.value = a.y;
                a.label = a.name;
                delete a.y;
                delete a.name
            }
            return a
        },
        translate: function () {
            function a() {
                var b = [],
                    c = 0;
                this.set = function (a, d) {
                    c++;
                    b[a] = d
                };
                this.get = function (a) {
                    return b[a]
                };
                this.getAll = function () {
                    return b
                };
                this.mergeWith = function (c) {
                    var d, e, f = b.slice(0);
                    if (!(c instanceof Array))
                        if (c instanceof a) c = c.getAll();
                        else return;
                    for (d in c) e = c[d], f[d] || (f[d] = e);
                    return f
                };
                this.getEffectiveLength = function () {
                    return c
                }
            }

            function e(a) {
                this.distributionLength = a;
                this.distributedMatrix = [];
                this.altDistributedMatrix = [];
                this.nonDistributedMatrix = {};
                this.forcePushObj = {};
                this.flags = {
                    exhaustion: !1
                }
            }

            function c(a, c) {
                var e, f, h, m = !1,
                    p = 0,
                    r;
                e = {
                    flag: !1,
                    point: void 0,
                    sLabel: void 0,
                    setAll: function (a,
                        b, c) {
                        this.flag = a;
                        this.point = b;
                        this.sLabel = c
                    }
                };
                var s = {
                        point: void 0,
                        sLabel: void 0,
                        set: function (a, b) {
                            return function (c, d) {
                                var e, f;
                                c.dontPlot || (this.point && this.sLabel ? (e = a(this.point, this.sLabel), f = a(c, d), b(e, f) && (this.point = c, this.sLabel = d)) : (this.point = c, this.sLabel = d))
                            }
                        }
                    },
                    M = {},
                    S = {},
                    ba = {},
                    X = {};
                da.extend(M, e);
                da.extend(S, e);
                M.setAll = function (a, b, c) {
                    var d = this.point,
                        e = this.sLabel;
                    this.flag = a;
                    d && e ? (a = d.labelX - (e.oriTextWidth - e.width), d = b.labelX - (c.oriTextWidth - c.width), a > d && (this.point = b, this.sLabel =
                        c)) : (this.point = b, this.sLabel = c)
                };
                S.setAll = function (a, b, c) {
                    var d = this.point,
                        e = this.sLabel;
                    this.flag = a;
                    d && e ? (a = d.labelX + e.oriTextWidth, d = b.labelX + c.oriTextWidth, a < d && (this.point = b, this.sLabel = c)) : (this.point = b, this.sLabel = c)
                };
                da.extend(ba, s);
                da.extend(X, s);
                ba.set = function () {
                    return s.set.apply(ba, [function (a) {
                        return a.labelX
                    }, function (a, b) {
                        return a > b ? !0 : !1
                    }])
                }();
                X.set = function () {
                    return s.set.apply(X, [function (a, b) {
                        return a.labelX + b.oriTextWidth
                    }, function (a, b) {
                        return a < b ? !0 : !1
                    }])
                }();
                e = 0;
                for (f = a.length; e <
                    f; e++)
                    if (h = a[e])(h.x = e) ? (c && (m = !m), h.isSliced && (I = h.x, 1 < I && !G[I] && (G[I] = !0, J += 1), I < n && (G[I + 1] = !0, J += 1)), K ? (z = 1 == k.useSameSlantAngle ? q ? l * h.y / q : l : q ? l * ob(h.y / q) : l, w = u * (g[e - 1].y - h.y) || 1) : (C += w = u * g[e].y, z = l * (1 - C * H)), h.shapeArgs = {
                            x: O,
                            y: A,
                            R1: v,
                            R2: z,
                            h: w || 1,
                            r3dFactor: x,
                            isHollow: y,
                            gStr: "point",
                            is2D: D,
                            renderer: E,
                            isFunnel: !0
                        }, b.smartLabel.setStyle(h.style), h.oriText = h.displayValue, r = r = b.smartLabel.getSmartText(h.displayValue, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), R ? (h.labelAline = "middle", h.labelX =
                            O, h.labelY = (D ? A : A + x * v) + w / 2 + N) : (h.labelAline = "start", (h.alignmentSwitch = m) ? (h.labelX = O - (F + z + 3 + r.width), ba.set(h, r)) : (h.labelX = O + F + z + 3, X.set(h, r)), h.distributionFactor = h.distributionFactor || 0, p = h.distributionFactor * Q, h.labelY = A + N + w + p), c && (m && 0 > h.labelX ? (p = h.labelX + r.width, p = b.smartLabel.getSmartText(h.displayValue, p, Number.POSITIVE_INFINITY, !0), h.labelX = 2, h.isLabelTruncated = !0, h.displayValue = p.text, h.virtualWidth = p.maxWidth, M.setAll(!0, h, p)) : !m && h.labelX + r.width > b.chartWidth && (p = b.smartLabel.getSmartText(h.displayValue,
                            b.chartWidth - h.labelX, Number.POSITIVE_INFINITY, !0), h.isLabelTruncated = !0, h.displayValue = p.text, h.virtualWidth = p.maxWidth, S.setAll(!0, h, p))), h.pWidth = h.virtualWidth = h.virtualWidth || r.width, A += w, v = z) : (h.oriText = h.displayValue, z = 1 == k.useSameSlantAngle ? q ? l * g[0].y / q : l : q ? l * ob(g[0].y / q) : l, h.labelWidht > 2 * z && !c ? (h.labelAline = "start", h.labelX = 0) : (h.labelAline = "middle", h.labelX = O), r = 2 * F, h.displayValue = b.smartLabel.getSmartText(h.displayValue, 2 * z + r, Number.POSITIVE_INFINITY, !0).text, h.labelY = (D ? A : A - x * v) - N - 3),
                        h.plotX = O, h.plotY = A;
                d(a, {
                    lTrimmedInfo: M,
                    rTrimmedInfo: S,
                    lLargestLabel: ba,
                    rLargestLabel: X
                })
            }

            function d(a, c) {
                var d = 0,
                    e = c.lTrimmedInfo,
                    f = c.rTrimmedInfo,
                    g = c.lLargestLabel,
                    h = c.rLargestLabel,
                    k = 0;
                if (!e.flag || !f.flag) {
                    if (f.flag) {
                        if (!g.point) return;
                        d = f.sLabel;
                        d = d.oriTextWidth - d.width;
                        g = g.point.labelX - 3;
                        d = -Math.ceil(Math.min(d, g))
                    } else if (e.flag) {
                        if (!h.point) return;
                        d = e.sLabel;
                        d = d.oriTextWidth - d.width;
                        g = aa - (h.point.labelX + h.sLabel.width);
                        d = Math.ceil(Math.min(d, g))
                    }
                    if (d)
                        for (h = 0, e = a.length; h < e; h++) g = a[h], !h && K ?
                            g.labelX += d : (g.alignmentSwitch ? (f = 0 > d ? b.smartLabel.getSmartText(g.oriText, g.pWidth, Number.POSITIVE_INFINITY, !0) : b.smartLabel.getSmartText(g.oriText, g.pWidth + d, Number.POSITIVE_INFINITY, !0), g.isLabelTruncated && (k = f.width - g.pWidth)) : f = 0 < d ? b.smartLabel.getSmartText(g.oriText, g.pWidth, Number.POSITIVE_INFINITY, !0) : b.smartLabel.getSmartText(g.oriText, g.pWidth - d, Number.POSITIVE_INFINITY, !0), g.virtualWidth = f.width, g.displayValue = f.text, g.labelX += d - k, g.shapeArgs && (g.shapeArgs.x += d), k = 0);
                    else
                        for (h = 0, e = a.length; h <
                            e; h++) g = a[h], 0 < (k = g.labelX + g.pWidth - aa) && (g.lOverflow = k, g.labelX -= k, b.isLegendRight ? g.displayValue = b.smartLabel.getSmartText(g.oriText, g.pWidth - k, Number.POSITIVE_INFINITY, !0).text : (g.lOverflow = k, g.labelX -= k))
                }
            }
            var b = this,
                f = b.options,
                k = b.datasets[0],
                g = k.data,
                p = b.canvasWidth,
                m = b.canvasHeight,
                l = p / 2,
                n = g.length - 1,
                s = g[0],
                r = s && g[n].y,
                q = s && g[0].y,
                u, v, z, w, A = b.canvasTop,
                x = k.yScale,
                y = k.isHollow,
                D = k.is2d,
                C = 0,
                E = b.paper,
                G = {},
                K = k.streamlinedData,
                F = k.labelDistance,
                H = .8 / m,
                I, J = 0,
                O = l + b.canvasLeft,
                R = k.showLabelsAtCenter,
                N = .3 * h(parseInt(f.plotOptions.series.dataLabels.style.fontSize, 10), 10),
                Q = Number(b.options.plotOptions.series.dataLabels.style.lineHeight.split(/px/)[0]),
                S, P = 0,
                M, ea, V, Z, X, aa = b.chartWidth - 3,
                s = 0,
                ba;
            Object.keys || (Object.keys = function () {
                var a = Object.prototype.hasOwnProperty,
                    b = !{
                        toString: null
                    }.propertyIsEnumerable("toString"),
                    c = "toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),
                    d = c.length;
                return function (e) {
                    if ("object" !== typeof e && ("function" !== typeof e ||
                            null === e)) throw new TypeError("Object.keys called on non-object");
                    var f = [],
                        g;
                    for (g in e) a.call(e, g) && f.push(g);
                    if (b)
                        for (g = 0; g < d; g++) a.call(e, c[g]) && f.push(c[g]);
                    return f
                }
            }());
            Array.prototype.forEach || (Array.prototype.forEach = function (a, b) {
                var c, d, e, f, g;
                if (null == this) throw new TypeError(" this is null or not defined");
                e = Object(this);
                f = e.length >>> 0;
                if ("function" !== typeof a) throw new TypeError(a + " is not a function");
                1 < arguments.length && (c = b);
                for (d = 0; d < f;) d in e && (g = e[d], a.call(c, g, d, e)), d++
            });
            if (K) {
                u =
                    m / (q - r);
                M = 0;
                for (r = g.length; M < r; M++) s += g[M].y;
                M = s ? m / s : m
            } else u = q ? m / q : m;
            v = l;
            b.globalMinXShift = 0;
            b.alignmentType = {};
            try {
                Object.defineProperty(b.alignmentType, "default", {
                    configurable: !1,
                    enumerable: !0,
                    get: function () {
                        return 1
                    }
                })
            } catch (pa) {
                b.alignmentType["default"] = 1
            }
            try {
                Object.defineProperty(b.alignmentType, "alternate", {
                    configurable: !1,
                    enumerable: !0,
                    get: function () {
                        return 2
                    }
                })
            } catch (ga) {
                b.alignmentType.alternate = 2
            }
            a.prototype.constructor = a;
            e.prototype.constructor = e;
            e.prototype.push = function (a, b) {
                this.nonDistributedMatrix[b] =
                    this.nonDistributedMatrix[b] || [];
                this.nonDistributedMatrix[b].push(a)
            };
            e.prototype.forcePush = function (a, b) {
                this.forcePushObj[b] = a
            };
            e.prototype.distribute = function (b) {
                var c, d = !0,
                    e = new a,
                    f = new a,
                    h = new a,
                    k = new a,
                    l = this.flags,
                    m, n, p, r, s, q = 0;
                if (b) {
                    if (0 < g.length - this.distributionLength)
                        for (n in this.nonDistributedMatrix)
                            for (c = this.nonDistributedMatrix[n], r = 1; r < c.length; r++) s = c[r], s.dontPlot = !0, s.displayValue = ""
                } else if (0 < g.length - 2 * this.distributionLength)
                    for (n in this.nonDistributedMatrix)
                        for (c = this.nonDistributedMatrix[n],
                            r = 1; r < c.length - 1; r++) s = c[r], s.dontPlot = !0, s.displayValue = "";
                if (g.length > this.distributionLength && !b) {
                    l.exhaustion = !0;
                    for (n in this.nonDistributedMatrix)
                        for (c = this.nonDistributedMatrix[n], r = 0, b = c.length; r < b; r++) s = c[r], s.dontPlot ? d ? m = h : m = k : (d ? m = e : m = f, m.getEffectiveLength() > parseInt(n, 10) ? s.distributionFactor = m.getEffectiveLength() - 1 - n : s.distributionFactor = 0), m.set(q++, s), d = !d;
                    this.distributedMatrix = e.mergeWith(h);
                    this.altDistributedMatrix = f.mergeWith(k)
                } else {
                    for (p in this.nonDistributedMatrix)
                        for (c =
                            this.nonDistributedMatrix[p], r = 0, b = c.length; r < b; r++) s = c[r], s.dontPlot ? m = h : (m = e, m.getEffectiveLength() > parseInt(p, 10) ? s.distributionFactor = m.getEffectiveLength() - 1 - p : s.distributionFactor = 0), m.set(q++, s);
                    this.distributedMatrix = e.mergeWith(h)
                }
            };
            e.prototype.getDistributedResult = function () {
                var a, c = [],
                    d = (a = b.options.legend) && "right" === a.align && 1 || 0;
                a.width ? d && (aa -= a.width + f.chart.spacingRight) : d = 0;
                b.isLegendRight = d;
                this.distribute(d);
                d ? (a = b.alignmentType["default"], c.push(this.distributedMatrix)) : (a = this.flags.exhaustion ?
                    b.alignmentType.alternate : b.alignmentType["default"], this.flags.exhaustion ? [].push.call(c, this.distributedMatrix, this.altDistributedMatrix) : c.push(this.distributedMatrix));
                return {
                    forceMatrix: this.forcePushObj,
                    suggestion: a,
                    matrix: c
                }
            };
            S = new e(Math.floor(m / Q));
            ba = K ? M : u;
            g.forEach(function (a, b) {
                var c;
                c = 0;
                !K && 0 === b || !K && b === g.length - 1 ? S.forcePush(a, b) : (c = a.y * ba, P += a.y * ba, c = P - c + c / 2, c = Math.floor(c / Q), S.push(a, c))
            });
            m = S.getDistributedResult();
            g.length = 0;
            if (void 0 === m.matrix[1])[].push.apply(g, m.matrix[0]);
            else
                for (M = m.matrix[0], ea = m.matrix[1], r = Math.max(M.length, ea.length), s = 0; s < r; s++) Z = M[s], V = ea[s], g.push(Z ? Z : V);
            if (0 < Object.keys(m.forceMatrix).length)
                for (X in m.forceMatrix)[].splice.apply(g, [parseInt(X, 10), 0].concat(m.forceMatrix[X]));
            switch (m.suggestion) {
                case b.alignmentType["default"]:
                    c(g, !1);
                    break;
                case b.alignmentType.alternate:
                    b.labelAlignment = b.alignmentType.alternate, l = p / 3, b.canvasLeft = b.chartWidth / 2 - l, O = b.canvasLeft + l, v = l, c(g, !0)
            }
            k._temp = {
                slicingGapPosition: G,
                noOfGap: J
            }
        },
        drawPlotFunnel: function (a,
            e) {
            this.translate();
            var c = this,
                d = a.items,
                b = a.data,
                f = c.options,
                h = f.plotOptions,
                g = c.elements.plots[0],
                p = h.series.dataLabels,
                m = c.paper,
                l = f.tooltip || {},
                l = l && !1 !== l.enabled,
                n, h = h.series.animation.duration || 0,
                s = c.layers,
                r = s.tracker,
                s = s.datalabels || (s.datalabels = m.group("datalabels").insertAfter(s.dataset)),
                q = g.showLabelsAtCenter,
                u = e._temp || {},
                v = u.slicingGapPosition,
                u = u.noOfGap,
                z = e.SlicingDistance,
                w, A = z / 2,
                x = 0,
                y = f.chart.issliced,
                f = f.chart.textDirection,
                D = p.style,
                D = {
                    fontFamily: D.fontFamily,
                    fontSize: D.fontSize,
                    lineHeight: D.lineHeight,
                    fontWeight: D.fontWeight,
                    fontStyle: D.fontStyle
                },
                C = function (a, b) {
                    return function (d) {
                        a.graphic.attr(b);
                        ma.call(this, c, d, "DataPlotRollOver")
                    }
                },
                E = function (a, b) {
                    return function (d) {
                        a.graphic.attr(b);
                        ma.call(this, c, d, "DataPlotRollOut")
                    }
                },
                G, K, F, H, I, J, O, R;
            if (!(F = c.datasets[0].streamlinedData && 2 > b.length)) {
                u && (w = Ka(1.5 * A, z / u), x = A);
                z = function (a) {
                    return function () {
                        c.legendClick(a, !0, !1)
                    }
                };
                A = function (a) {
                    return function () {
                        return c.getEventArgs(a)
                    }
                };
                R = function (a) {
                    return function () {
                        a.attr({
                            visibility: "visible"
                        })
                    }
                };
                b && b.length || (b = []);
                g.singletonCase = F && 2 == b.length || 1 == b.length;
                e.data || (e.data = []);
                for (O = b.length; O--;) H = b[O], G = H.y, K = H.displayValue, n = H.toolText, J = !!H.link, I = y ? 0 : H.isSliced, null !== G && void 0 !== G && H.shapeArgs ? ((F = d[O]) || (e.data[O].plot = F = d[O] = {
                    value: G,
                    displayValue: K,
                    sliced: !!I,
                    chart: c,
                    plotItems: d,
                    seriesData: g,
                    cursor: J ? "pointer" : "",
                    x: H.x,
                    index: O,
                    graphic: c.pyramidFunnelShape(H.shapeArgs).attr({
                        fill: H.color,
                        opacity: 0,
                        "stroke-width": H.borderWidth,
                        stroke: H.borderColor
                    }),
                    dataLabel: m.text(s).attr({
                        text: K,
                        title: H.originalText || "",
                        ishot: !0,
                        cursor: J ? "pointer" : "",
                        direction: f,
                        x: 0,
                        y: 0
                    }).css(D),
                    trackerObj: m.path(r)
                }, e.data[O].legendClick = z(F), e.data[O].getEventArgs = A(F), G = K = {}, H.hoverEffects && (G = {
                    color: H.color,
                    opacity: H.alpha,
                    "stroke-width": H.borderWidth,
                    stroke: H.borderColor
                }, K = H.rolloverProperties, K = {
                    color: K.color,
                    opacity: K.alpha,
                    "stroke-width": K.borderWidth,
                    stroke: K.borderColor
                }), !H.doNotSlice && F.trackerObj.click(c.slice, F), F.trackerObj.mouseup(c.plotMouseUp, F), F.trackerObj.hover(C(F, K), E(F, G)), F.dataLabel.hover(C(F,
                    K), E(F, G)), l && F.trackerObj.tooltip(n), !H.doNotSlice && F.dataLabel.click(c.slice, F), F.dataLabel.mouseup(c.plotMouseUp, F), q && 0 === O && "funnel" == c.type && g.streamlinedData || (F.connector = m.path(s).attr({
                    "stroke-width": p.connectorWidth,
                    stroke: p.connectorColor,
                    ishot: !0,
                    cursor: J ? "pointer" : ""
                }).click(c.slice, F).mouseup(c.plotMouseUp, F).hover(C(F, K), E(F, G))), F.dy = 0, u && (x && (F._startTranslateY = n = "t0," + x, F.dy = F.DistanceAvailed = x, F.graphic.attr({
                        transform: n
                    }), F.dataLabel.attr({
                        transform: n
                    }), F.connector.attr({
                        transform: n
                    })),
                    v[H.x] && (x -= w))), h ? (s.attr({
                    visibility: "hidden"
                }), F.graphic.animate({
                    opacity: H.alpha
                }, h, "easeIn", O === b.length - 1 && R(s))) : F.graphic.attr({
                    opacity: H.alpha
                })) : e.data[O].plot = d[O] = {
                    dataLabel: m.text(s).attr({
                        text: K,
                        title: H.originalText || "",
                        direction: f,
                        x: 0,
                        y: 0
                    }).css(D)
                };
                c.drawDataLabels();
                c.drawTracker(a, e)
            }
        },
        slice: function (a, e, c, d) {
            var b = this.chart;
            a = b.datasets[0].SlicingDistance / 2;
            c = e = 0;
            var f = this.plotItems,
                h = f.length,
                g, p, m, l, n, s, r, q;
            s = {
                hcJSON: {
                    chart: {
                        issliced: !1
                    },
                    series: []
                }
            };
            s.hcJSON.series[0] = {
                data: m = []
            };
            d = this.sliced = ia(d) ? d : !this.sliced;
            r = -a;
            q = function (a, c) {
                return function () {
                    da.raiseEvent("SlicingEnd", {
                        slicedState: a,
                        data: b.getPlotData(c)
                    }, b.logic.chartInstance)
                }
            };
            for (e = 0; e < h; e += 1) p = f[e], p !== this ? (p.sliced = !1, m[e] = {
                isSliced: !1
            }, l = !1) : (m[e] = {
                isSliced: d
            }, l = !0, n = e), p.graphic && (g = p.dy, g = -g, d && (p.x < this.x ? (g += r, c += 1) : p.x == this.x ? c ? e == h - 1 && (g += .5 * a) : g += .5 * -a : g += a), p.graphic.attr({
                transform: "t0," + p.dy
            }), p.dy += g, g = {
                transform: "...t0," + g
            }, l && da.raiseEvent("SlicingStart", {
                    slicedState: !d,
                    data: b.getPlotData(n)
                },
                b.logic.chartInstance), p.graphic.animate(g, 300, "easeIn", l && q(d, n)), p.dataLabel && p.dataLabel.animate(g, 300, "easeIn"), p.connector && p.connector.animate(g, 300, "easeIn"), p.trackerObj && p.trackerObj.animate(g, 300, "easeIn"), 1 == e && !f[0].graphic && f[0].dataLabel && f[0].dataLabel.animate(g, 300, "easeIn"));
            V(b.logic.chartInstance.jsVars._reflowData, s, !0)
        },
        drawDataLabels: function () {
            var a = this.datasets[0],
                e = a.data,
                c = this.options.plotOptions.series.dataLabels,
                d = this.elements.plots[0].items,
                b, f, k, g, p = a.showLabelsAtCenter,
                m = Number(c.style.lineHeight.split(/px/)[0]),
                l = h(parseInt(c.style.fontSize, 10), 10),
                n = .3 * l,
                s = .3 * m,
                r, q, u, v, z = a.labelDistance,
                w, A, x = {};
            for (v = e.length - 1; 0 <= v; --v) g = e[v], A = g.displayValue, c = d[v], f = g.labelY, b = g.labelX, k = g.labelAline, w = g.style, l = h(parseInt(w.fontSize, 10), 10), n = .3 * l, l = {
                fontFamily: w.fontFamily,
                fontSize: w.fontSize,
                lineHeight: w.lineHeight,
                fontWeight: w.fontWeight,
                fontStyle: w.fontStyle
            }, p ? f = 0 === v && "funnel" == this.type && a.streamlinedData ? f - s + (d[1].DistanceAvailed || 0) : f - s + (c.DistanceAvailed || 0) : (u =
                f - n - g.distributionFactor * m, n = f - n, q = x[g.alignmentSwitch], void 0 !== r && void 0 !== q && q - n < m && (f = n = q - m), g.displayValue && (x[g.alignmentSwitch] = n), r = g.plotY, this.labelAlignment === this.alignmentType.alternate ? g.alignmentSwitch ? (q = b + 3 + g.virtualWidth, g = q + z + g.distributionFactor * this.globalMinXShift) : (q = b - 3, g = q - (z - (g.lOverflow || 0)) - g.distributionFactor * this.globalMinXShift) : (q = b - 3, g = q - (z - (g.lOverflow || 0)) - g.distributionFactor * this.globalMinXShift), "undefined" === typeof A || A === O || 0 === v && "funnel" == this.type && a.streamlinedData ||
                (g = ["M", g, u, "L", q, n], c.connector.attr({
                    path: g,
                    "shape-rendering": u === n && 1 > n ? "crisp" : ""
                })), f = 0 === v && "funnel" == this.type && a.streamlinedData ? f + (d[1].DistanceAvailed || 0) : n + (c.DistanceAvailed || 0)), A !== O && c.dataLabel.attr({
                transform: "t" + b + "," + f,
                "text-anchor": Ba[k],
                text: A,
                fill: w.color,
                "font-size": w.fontSize,
                "text-bound": [w.backgroundColor, w.borderColor, w.borderThickness, w.borderPadding, w.borderRadius, w.borderDash]
            }).css(l)
        },
        drawTracker: function (a) {
            var e = this.paper,
                c = a.items;
            a = a.data;
            for (var d, b, f = +new Date,
                    h = a.length - 1, g, p = this.layers.tracker, m; 0 <= h; --h) g = c[h], m = a[h], b = g.trackerObj, g.graphic && (d = g.graphic.Shapeargs.silhuette, m = {
                link: m.link,
                value: m.y,
                displayValue: m.displayValue,
                categoryLabel: m.categoryLabel,
                toolText: m.toolText
            }, b ? b.attr({
                path: d,
                isTracker: f,
                fill: ka,
                stroke: "none",
                transform: "t0," + (g._startTranslateY || 0),
                ishot: !0,
                cursor: g.cursor
            }) : g.trackerObj = e.path(d, p).attr({
                isTracker: f,
                fill: ka,
                stroke: "none",
                transform: "t0," + (g._startTranslateY || 0),
                ishot: !0,
                cursor: g.cursor
            }), b.data("eventArgs", m))
        },
        getEventArgs: function (a) {
            return a.chart.getPlotData(a.index)
        },
        legendClick: function (a) {
            var e = a.chart;
            e.slice.call(e.plots[0].items[a.index])
        },
        plotMouseUp: function (a) {
            ma.call(this.trackerObj, this.chart, a)
        }
    }, z["renderer.piebase"]);
    z("renderer.pyramid", {
        type: "pyramid",
        translate: function () {
            function a() {
                var b = [],
                    c = 0;
                this.set = function (a, d) {
                    c++;
                    b[a] = d
                };
                this.get = function (a) {
                    return b[a]
                };
                this.getAll = function () {
                    return b
                };
                this.mergeWith = function (c) {
                    var d, e, f = b.slice(0);
                    if (!(c instanceof Array))
                        if (c instanceof a) c = c.getAll();
                        else return;
                    for (d in c) e = c[d], f[d] || (f[d] = e);
                    return f
                };
                this.getEffectiveLength = function () {
                    return c
                }
            }

            function e(a) {
                this.distributionLength = a;
                this.distributedMatrix = [];
                this.altDistributedMatrix = [];
                this.nonDistributedMatrix = {};
                this.flags = {
                    exhaustion: !1
                }
            }

            function c(a, c) {
                var e, f, g, h, k = 0,
                    m = !1;
                e = {
                    flag: !1,
                    point: void 0,
                    sLabel: void 0,
                    setAll: function (a, b, c) {
                        this.flag = a;
                        this.point = b;
                        this.sLabel = c
                    }
                };
                var p = {
                        point: void 0,
                        sLabel: void 0,
                        set: function (a, b) {
                            return function (c, d) {
                                var e, f;
                                c.dontPlot || (this.point && this.sLabel ? (e = a(this.point, this.sLabel), f = a(c, d),
                                    b(e, f) && (this.point = c, this.sLabel = d)) : (this.point = c, this.sLabel = d))
                            }
                        }
                    },
                    J = {},
                    N = {},
                    M = {},
                    O = {};
                da.extend(J, e);
                da.extend(N, e);
                J.setAll = function (a, b, c) {
                    var d = this.point,
                        e = this.sLabel;
                    this.flag = a;
                    d && e ? (a = d.labelX - (e.oriTextWidth - e.width), d = b.labelX - (c.oriTextWidth - c.width), a > d && (this.point = b, this.sLabel = c)) : (this.point = b, this.sLabel = c)
                };
                N.setAll = function (a, b, c) {
                    var d = this.point,
                        e = this.sLabel;
                    this.flag = a;
                    d && e ? (a = d.labelX + e.oriTextWidth, d = b.labelX + c.oriTextWidth, a < d && (this.point = b, this.sLabel = c)) : (this.point =
                        b, this.sLabel = c)
                };
                da.extend(M, p);
                da.extend(O, p);
                M.set = function () {
                    return p.set.apply(M, [function (a) {
                        return a.labelX
                    }, function (a, b) {
                        return a > b ? !0 : !1
                    }])
                }();
                O.set = function () {
                    return p.set.apply(O, [function (a, b) {
                        return a.labelX + b.oriTextWidth
                    }, function (a, b) {
                        return a < b ? !0 : !1
                    }])
                }();
                e = 0;
                for (f = a.length; e < f; e++)
                    if (g = e, h = a[e]) h.x = g, c && (m = !m), h.isSliced && ((x = h.x) && !y[x] && (y[x] = !0, D += 1), x < n && (y[x + 1] = !0, D += 1)), h.oriText = h.displayValue, b.smartLabel.setStyle(h.style), g = b.smartLabel.getSmartText(h.displayValue, Number.POSITIVE_INFINITY,
                        Number.POSITIVE_INFINITY), A += h.y, s = l * A / w, r = G * h.y, h.shapeArgs = {
                        x: K,
                        y: q,
                        R1: I,
                        R2: s,
                        h: r,
                        r3dFactor: u,
                        gStr: "point",
                        is2D: v,
                        renderer: z
                    }, E ? (h.labelAline = "middle", h.labelX = K, h.labelY = (v ? q : q + u * I) + r / 2 + F) : (h.labelAline = "start", (h.alignmentSwitch = m) ? (h.labelX = K - ((I + s) / 2 + 3 + C + g.width), h.labelX -= h.distributionFactor * b.globalMinXShift, M.set(h, g)) : (h.labelX = K + C + (I + s) / 2 + 3, h.labelX += h.distributionFactor * b.globalMinXShift, O.set(h, g)), c && (m && 0 > h.labelX ? (k = h.labelX + g.width, k = b.smartLabel.getSmartText(h.displayValue, k, Number.POSITIVE_INFINITY, !0), h.labelX = 2, h.displayValue = k.text, h.virtualWidth = k.width, J.setAll(!0, h, k)) : !m && h.labelX + g.width > b.chartWidth && (k = b.smartLabel.getSmartText(h.displayValue, b.chartWidth - h.labelX, Number.POSITIVE_INFINITY, !0), h.displayValue = k.text, h.virtualWidth = k.width, N.setAll(!0, h, k))), h.pWidth = h.virtualWidth || g.width, k = h.distributionFactor * H, h.labelY = q + F + r / 2 + k), q += r, h.plotX = K, h.plotY = q - r / 2, I = s, h.virtualWidth = h.virtualWidth || g.width;
                d(a, {
                    lTrimmedInfo: J,
                    rTrimmedInfo: N,
                    lLargestLabel: M,
                    rLargestLabel: O
                })
            }

            function d(a,
                c) {
                var d = 0,
                    e = c.lTrimmedInfo,
                    f = c.rTrimmedInfo,
                    g = c.lLargestLabel,
                    h = c.rLargestLabel;
                if (!e.flag || !f.flag) {
                    if (f.flag) {
                        if (!g.point) return;
                        d = f.sLabel;
                        d = d.oriTextWidth - d.width;
                        h = g.point.labelX - 3;
                        d = -Math.ceil(Math.min(d, h))
                    } else if (e.flag) {
                        if (!h.point) return;
                        g = e.point;
                        d = e.sLabel;
                        d = d.oriTextWidth - d.width;
                        h = N - (h.point.labelX + h.sLabel.width);
                        d = Math.ceil(Math.min(d, h));
                        g.labelX -= d
                    }
                    if (d)
                        for (g = 0, e = a.length; g < e; g++) h = a[g], f = h.alignmentSwitch ? 0 > d ? b.smartLabel.getSmartText(h.oriText, h.pWidth, Number.POSITIVE_INFINITY, !0) : b.smartLabel.getSmartText(h.oriText, h.pWidth + d, Number.POSITIVE_INFINITY, !0) : 0 < d ? b.smartLabel.getSmartText(h.oriText, h.pWidth, Number.POSITIVE_INFINITY, !0) : b.smartLabel.getSmartText(h.oriText, h.pWidth - d, Number.POSITIVE_INFINITY, !0), h.virtualWidth = f.width, h.displayValue = f.text, h.labelX += d, h.shapeArgs.x += d;
                    else
                        for (g = 0, e = a.length; g < e; g++) h = a[g], 0 < (d = h.labelX + h.pWidth - N) && (b.isLegendRight ? h.displayValue = b.smartLabel.getSmartText(h.oriText, h.pWidth - d, Number.POSITIVE_INFINITY, !0).text : (h.lOverflow = d,
                            h.labelX -= d))
                }
            }
            var b = this,
                f = b.options,
                k = b.datasets[0],
                g = k.data,
                p = b.canvasWidth,
                m = b.canvasHeight,
                l = p / 2,
                n = g.length - 1,
                s, r, q = b.canvasTop,
                u = k.yScale,
                v = k.is2d,
                z = b.paper,
                w = k.valueSum ? k.valueSum : 1,
                A = 0,
                x, y = {},
                D = 0,
                C = k.labelDistance,
                E = k.showLabelsAtCenter,
                F = .3 * h(parseInt(f.plotOptions.series.dataLabels.style.fontSize, 10), 10),
                K = 0,
                G = m / w,
                H = Number(b.options.plotOptions.series.dataLabels.style.lineHeight.split(/px/)[0]),
                I = 0,
                J, O = 0,
                R, N = b.chartWidth - 3,
                Q, S, P, M, V;
            Array.prototype.forEach || (Array.prototype.forEach = function (a,
                b) {
                var c, d, e, f, g;
                if (null == this) throw new TypeError(" this is null or not defined");
                e = Object(this);
                f = e.length >>> 0;
                if ("function" !== typeof a) throw new TypeError(a + " is not a function");
                1 < arguments.length && (c = b);
                for (d = 0; d < f;) d in e && (g = e[d], a.call(c, g, d, e)), d++
            });
            R = Math.atan(l / 2 / m);
            b.globalMinXShift = Math.floor(H / Math.cos(R));
            b.alignmentType = {};
            try {
                Object.defineProperty(b.alignmentType, "default", {
                    configurable: !1,
                    enumerable: !0,
                    get: function () {
                        return 1
                    }
                })
            } catch (Y) {
                b.alignmentType["default"] = 1
            }
            try {
                Object.defineProperty(b.alignmentType,
                    "alternate", {
                        configurable: !1,
                        enumerable: !0,
                        get: function () {
                            return 2
                        }
                    })
            } catch (Z) {
                b.alignmentType.alternate = 2
            }
            a.prototype.constructor = a;
            e.prototype.constructor = e;
            e.prototype.push = function (a, b) {
                this.nonDistributedMatrix[b] = this.nonDistributedMatrix[b] || [];
                this.nonDistributedMatrix[b].push(a)
            };
            e.prototype.distribute = function (b) {
                var c, d = !0,
                    e = new a,
                    f = new a,
                    h = new a,
                    k = new a,
                    l = this.flags,
                    m, n, p, r, q, s = 0;
                if (b) {
                    if (0 < g.length - this.distributionLength)
                        for (n in this.nonDistributedMatrix)
                            for (c = this.nonDistributedMatrix[n],
                                r = 1; r < c.length; r++) q = c[r], q.dontPlot = !0, q.displayValue = ""
                } else if (0 < g.length - 2 * this.distributionLength)
                    for (n in this.nonDistributedMatrix)
                        for (c = this.nonDistributedMatrix[n], r = 1; r < c.length - 1; r++) q = c[r], q.dontPlot = !0, q.displayValue = "";
                if (g.length > this.distributionLength && !b) {
                    l.exhaustion = !0;
                    for (n in this.nonDistributedMatrix)
                        for (c = this.nonDistributedMatrix[n], r = 0, b = c.length; r < b; r++) q = c[r], q.dontPlot ? d ? m = h : m = k : (d ? m = e : m = f, m.getEffectiveLength() > parseInt(n, 10) ? q.distributionFactor = m.getEffectiveLength() -
                            1 - n : q.distributionFactor = 0), m.set(s++, q), d = !d;
                    this.distributedMatrix = e.mergeWith(h);
                    this.altDistributedMatrix = f.mergeWith(k)
                } else {
                    for (p in this.nonDistributedMatrix)
                        for (c = this.nonDistributedMatrix[p], r = 0, b = c.length; r < b; r++) q = c[r], q.dontPlot ? m = h : (m = e, m.getEffectiveLength() > parseInt(p, 10) ? q.distributionFactor = m.getEffectiveLength() - 1 - p : q.distributionFactor = 0), m.set(s++, q);
                    this.distributedMatrix = e.mergeWith(h)
                }
            };
            e.prototype.getDistributedResult = function () {
                var a, c = [],
                    d = (a = b.options.legend) && "right" ===
                    a.align && 1 || 0;
                a.width ? d && (N -= a.width + f.chart.spacingRight) : d = 0;
                b.isLegendRight = d;
                this.distribute(d);
                d ? (a = b.alignmentType["default"], c.push(this.distributedMatrix)) : (a = this.flags.exhaustion ? b.alignmentType.alternate : b.alignmentType["default"], this.flags.exhaustion ? [].push.call(c, this.distributedMatrix, this.altDistributedMatrix) : c.push(this.distributedMatrix));
                return {
                    suggestion: a,
                    matrix: c
                }
            };
            J = new e(Math.floor(m / H));
            g.forEach(function (a) {
                var b = 0,
                    b = a.y * G;
                O += a.y * G;
                J.push(a, Math.floor((O - b + b / 2) / H))
            });
            m =
                J.getDistributedResult();
            g.length = 0;
            if (void 0 === m.matrix[1])[].push.apply(g, m.matrix[0]);
            else
                for (Q = m.matrix[0], S = m.matrix[1], P = Math.max(Q.length, S.length), R = 0; R < P; R++) V = Q[R], M = S[R], g.push(V ? V : M);
            switch (m.suggestion) {
                case b.alignmentType["default"]:
                    K = b.canvasLeft + l;
                    c(g, !1);
                    break;
                case b.alignmentType.alternate:
                    b.labelAlignment = b.alignmentType.alternate, l = p / 3, b.canvasLeft = b.chartWidth / 2 - l, K = b.canvasLeft + l, c(g, !0)
            }
            k._temp = {
                slicingGapPosition: y,
                noOfGap: D
            }
        },
        drawPlotPyramid: function (a, e) {
            this.translate();
            var c = this,
                d = a.items,
                b = a.data,
                f = c.options,
                h = f.plotOptions,
                g = c.elements.plots[0],
                p = c.datasets[0],
                m = h.series.dataLabels,
                l = g.showLabelsAtCenter,
                h = h.series.animation.duration || 0,
                n = c.paper,
                q = f.tooltip || {},
                q = q && !1 !== q.enabled,
                r, t = c.layers,
                u = t.tracker,
                t = t.datalabels || (t.datalabels = n.group("datalabels").insertAfter(t.dataset)),
                v = p._temp || {},
                z = v.slicingGapPosition,
                v = v.noOfGap,
                w = p.SlicingDistance,
                A, x = w / 2,
                p = 0,
                y = f.chart.issliced,
                f = f.chart.textDirection,
                D = m.style,
                D = {
                    fontFamily: D.fontFamily,
                    fontSize: D.fontSize,
                    lineHeight: D.lineHeight,
                    fontWeight: D.fontWeight,
                    fontStyle: D.fontStyle
                },
                C = function (a, b) {
                    return function (d) {
                        a.graphic.attr(b);
                        ma.call(this, c, d, "DataPlotRollOver")
                    }
                },
                E = function (a, b) {
                    return function (d) {
                        a.graphic.attr(b);
                        ma.call(this, c, d, "DataPlotRollOut")
                    }
                },
                F, K, G, H, I, J, O, R;
            J = function (a) {
                return function () {
                    c.legendClick(a, !0, !1)
                }
            };
            O = function (a) {
                return function () {
                    return c.getEventArgs(a)
                }
            };
            R = function (a) {
                return function () {
                    a.attr({
                        visibility: "visible"
                    })
                }
            };
            v && (A = Ka(1.5 * x, w / v), p = x);
            b && b.length || (b = []);
            g.singletonCase =
                1 == b.length;
            for (I = b.length; I--;) x = b[I], F = x.y, K = x.displayValue, r = x.toolText, G = !!x.link, H = y ? 0 : x.isSliced, null !== F && void 0 !== F && x.shapeArgs ? ((w = d[I]) || (e.data[I].plot = w = d[I] = {
                value: F,
                sliced: !!H,
                cursor: G ? "pointer" : "",
                chart: c,
                plotItems: d,
                seriesData: g,
                x: x.x,
                index: I,
                graphic: c.pyramidFunnelShape(x.shapeArgs).attr({
                    fill: x.color,
                    opacity: h ? 0 : x.alpha,
                    "stroke-width": x.borderWidth,
                    stroke: x.borderColor
                }),
                dataLabel: n.text(t).attr({
                    text: K,
                    title: x.originalText || "",
                    direction: f,
                    ishot: !0,
                    cursor: G ? "pointer" : "",
                    x: 0,
                    y: 0
                }).css(D),
                trackerObj: n.path(u)
            }, F = K = {}, x.hoverEffects && (F = {
                color: x.color,
                opacity: x.alpha,
                "stroke-width": x.borderWidth,
                stroke: x.borderColor
            }, K = x.rolloverProperties, K = {
                color: K.color,
                opacity: K.alpha,
                "stroke-width": K.borderWidth,
                stroke: K.borderColor
            }), e.data[I].legendClick = J(w), e.data[I].getEventArgs = O(w), !x.doNotSlice && w.trackerObj.click(c.slice, w), w.trackerObj.mouseup(c.plotMouseUp, w).hover(C(w, K), E(w, F)), q && w.trackerObj.tooltip(r), !x.doNotSlice && w.dataLabel.click(c.slice, w), w.dataLabel.mouseup(c.plotMouseUp,
                w).hover(C(w, K), E(w, F)), l && 0 === I && "funnel" == c.type && g.streamlinedData || (w.connector = n.path(t).attr({
                "stroke-width": m.connectorWidth,
                stroke: m.connectorColor,
                ishot: !0,
                cursor: G ? "pointer" : ""
            }).click(c.slice, w).mouseup(c.plotMouseUp, w).hover(C(w, K), E(w, F))), w.dy = 0, v && (p && (w._startTranslateY = r = "t,0," + p, w.dy = w.DistanceAvailed = p, w.graphic.attr({
                transform: r
            }), w.dataLabel.attr({
                transform: r
            }), w.connector.attr({
                transform: r
            })), z[x.x] && (p -= A))), h && (t.attr("visibility", "hidden"), w.graphic.animate({
                    opacity: x.alpha
                },
                h, "easeIn", I === b.length - 1 && R(t)))) : e.data[I].plot = d[I] = {
                dataLabel: n.text(t).attr({
                    text: K,
                    title: x.originalText || "",
                    direction: f,
                    x: 0,
                    y: 0
                }).css(D)
            };
            c.drawDataLabels();
            c.drawTracker(a, e)
        }
    }, z["renderer.funnel"]);
    z("renderer.sparkline", {
        callbacks: [function () {
            if (!this.options.nativeMessage) {
                var a = this.options,
                    e = this.layers,
                    c = this.paper,
                    d = a.series[0] && a.series[0].data && a.series[0].data[0],
                    b = e.limitlabels,
                    f = this.smartLabel,
                    a = a.chart,
                    h = a.highLowValue.highLabel,
                    g = a.highLowValue.lowLabel,
                    p = a.valuePadding,
                    m = this.canvasHeight /
                    2,
                    l;
                d && (b || (b = e.limitlabels = c.group("limitlabels").insertAfter(e.dataset)), b.translate(this.canvasLeft, this.canvasTop), ia(a.openValue.label) && (d.openValue = c.text(-p, m, a.openValue.label, b).attr({
                        direction: a.textDirection,
                        "text-anchor": Ba[bb]
                    }).css(a.openValue.style)), e = a.closeValue.label, l = this.canvasWidth + p, ia(e) && (d.closeValue = c.text(this.canvasWidth + p, m, e, b).attr({
                        direction: a.textDirection,
                        "text-anchor": Ba[Ia]
                    }).css(a.closeValue.style), f.setStyle(a.closeValue.style), l += f.getOriSize(e).width + p),
                    ia(h) && (c.text(l, m, "[", b).attr({
                        direction: a.textDirection,
                        "text-anchor": Ba[Ia]
                    }).css(a.highLowValue.style), f.setStyle(a.highLowValue.style), l += f.getOriSize("[").width + 1, d.highLabel = c.text(l, m, h, b).attr({
                        direction: a.textDirection,
                        "text-anchor": Ba[Ia]
                    }).css(a.highLowValue.style).css({
                        color: a.highColor
                    }), l += f.getOriSize(h).width + 1), ia(g) && (c.text(l, m, "|", b).attr({
                        direction: a.textDirection,
                        "text-anchor": Ba[Ia]
                    }).css(a.highLowValue.style), l += f.getOriSize("|").width + 1, d.dataLabel = c.text(l, m, g, b).attr({
                        direction: a.textDirection,
                        "text-anchor": Ba[Ia]
                    }).css(a.highLowValue.style).css({
                        color: a.lowColor
                    }), l += f.getOriSize(g).width + 1, c.text(l, m, "]", b).attr({
                        direction: a.textDirection,
                        "text-anchor": Ba[Ia]
                    }).css(a.highLowValue.style)))
            }
        }]
    }, z["renderer.cartesian"]);
    z("renderer.sparkwinloss", {
        callbacks: [function () {
            if (!this.options.nativeMessage) {
                var a = this.options,
                    e = this.layers,
                    c = this.paper,
                    d = a.series[0] && a.series[0].data && a.series[0].data[0],
                    b = e.limitlabels,
                    f = a.plotOptions.series.dataLabels && a.plotOptions.series.dataLabels.style || {},
                    a = a.chart,
                    h = a.closeValue.label,
                    g = {
                        fontFamily: f.fontFamily,
                        fontSize: f.fontSize,
                        lineHeight: f.lineHeight,
                        fontWeight: f.fontWeight,
                        fontStyle: f.fontStyle
                    };
                d && (b || (b = e.limitlabels = c.group("limitlabels").insertAfter(e.dataset)), b.translate(this.canvasLeft, this.canvasTop), ia(h) && h !== O && (d.dataLabel = c.text(this.canvasWidth + a.valuePadding, this.canvasHeight / 2, h, b).attr({
                    "text-anchor": Ba[Ia],
                    fill: f.color,
                    direction: a.textDirection,
                    "text-bound": [f.backgroundColor, f.borderColor, f.borderThickness, f.borderPadding,
f.borderRadius, f.borderDash]
                }).css(g)))
            }
        }]
    }, z["renderer.cartesian"]);
    z("renderer.realtimecartesian", {
        updatePlotColumn: function (a, e, c) {
            var d = this,
                b = a.data,
                f = b.length,
                k = a.items,
                g = a.graphics || (a.graphics = []),
                p = d.paper,
                m = d.layers,
                l = d.options,
                n = l.chart,
                q = !1 !== (l.tooltip || {}).enabled,
                r = d.definition.chart,
                l = l.plotOptions.series,
                t = d.xAxis[e.xAxis || 0],
                u = d.yAxis[e.yAxis || 0],
                v = d.logic.isStacked,
                z = e.numColumns || 1,
                w = e.columnPosition || 0,
                A = n.canvasBorderOpacity = Ha.color(n.plotBorderColor).opacity,
                x = d.canvasBorderWidth,
                A = n.isCanvasBorder || (n.isCanvasBorder = 0 !== A && 0 < x),
                y, x = !1 === e.visible ? "hidden" : "visible",
                D = n.overlapColumns,
                C = t.getAxisPosition(0),
                E = t.getAxisPosition(1) - C,
                F = r && r.plotspacepercent,
                K = l.groupPadding,
                G = l.maxColWidth,
                C = h(r && r.plotpaddingpercent),
                F = (1 - .01 * F) * E || Ka(E * (1 - 2 * K), G * z),
                E = F / 2,
                F = F / z,
                D = Ka(F - 1, 1 < z ? D || void 0 !== C ? 0 < C ? F * C / 100 : 0 : 4 : 0),
                z = F - D,
                w = w * F - E + D / 2,
                E = u.max,
                F = u.min,
                D = 0 < E && 0 <= F,
                C = 0 >= E && 0 > F,
                E = 0 > E && 0 > F ? E : 0 < E && 0 < F ? F : 0,
                n = h(n.useRoundEdges, 0),
                H = m.dataset = m.dataset || p.group("dataset-orphan"),
                m = m.tracker,
                F =
                d.canvasTop,
                K = d.canvasLeft,
                G = d.canvasBottom,
                I = d.canvasRight,
                J, P, V, N, Q, S, Y, M, ea, W, Z, X, aa, ba, $ = h(r.variableindex, 1),
                ga = -1,
                r = function (a, b) {
                    return function (c) {
                        a.attr(b);
                        ma.call(this, d, c, "dataplotrollover")
                    }
                };
            aa = function (a, b) {
                return function (c) {
                    a.attr(b);
                    ma.call(this, d, c, "dataplotrollout")
                }
            };
            ba = function (a) {
                ma.call(this, d, a)
            };
            v && (W = H.shadows || (H.shadows = p.group("shadows", H).toBack()));
            H = H.column = H.column || p.group("columns", H);
            if (Z = c.numUpdate || 0)
                for (c = 0; c < Z; c += 1)(J = k.shift()) && delete J._state, J && delete J.tracker,
                    k.push(J);
            for (c = 0; c < f; c += 1) {
                Y = c + Z;
                P = b[c];
                S = P.y;
                J = h(P.x, c);
                M = t.getAxisPosition(J) + w;
                J = k[c];
                Q = P.toolText;
                V = P.link;
                N = P.displayValue || O;
                y = Wb(P.borderWidth) || 0;
                ea = parseInt($) ? J && J.index || (ga + 1) % f : c;
                X = {
                    index: ea,
                    link: V,
                    value: S,
                    displayValue: P.displayValue,
                    categoryLabel: P.categoryLabel,
                    toolText: Q,
                    id: a.userID,
                    datasetIndex: a.index,
                    datasetName: a.name,
                    visible: a.visible
                };
                Y >= f && (J || (J = k[c] = {
                    index: ea,
                    value: S,
                    width: z,
                    graphic: null,
                    dataLabel: null,
                    tracker: null
                }), J && (J.valueBelowPlot = 0 > S), Y = ea = {}, P.hoverEffects && (Y = {
                    fill: R(P.color),
                    stroke: R(P.borderColor),
                    "stroke-width": y,
                    "stroke-dasharray": P.dashStyle
                }, ea = P.rolloverProperties, ea = {
                    fill: R(ea.color),
                    stroke: R(ea.borderColor),
                    "stroke-width": ea.borderWidth,
                    "stroke-dasharray": ea.dashStyle
                }), J.graphic || (J.graphic = p.rect(H).attr({
                    visibility: x
                }), g.push(J.graphic), J.graphic.shadow(l.shadow && P.shadow, W)), J.graphic.attr({
                    r: n,
                    fill: R(P.color || ""),
                    stroke: R(P.borderColor || ""),
                    "stroke-width": y,
                    "stroke-dasharray": P.dashStyle,
                    "stroke-linejoin": "miter"
                }), J.tracker || (J.tracker = p.rect(m).attr({
                    stroke: ka,
                    fill: ka,
                    visibility: x
                }), g.push(J.tracker)), J._attrHoverInFn && J.tracker.unhover(J._attrHoverInFn, J._attrHoverOutFn), J._attrClickFn && J.tracker.unclick(J._attrClickFn), J.tracker.attr({
                    height: 0,
                    width: 0,
                    r: n,
                    "stroke-width": y,
                    stroke: ka,
                    cursor: V ? "pointer" : "",
                    ishot: !0
                }).data("eventArgs", X).click(J._attrClickFn = ba).hover(J._attrHoverInFn = r(J.graphic, ea), J._attrHoverOutFn = aa(J.graphic, Y)).tooltip(Q));
                if (null === S) J && (J.graphic && J.graphic.attr({
                        height: 0,
                        "stroke-width": 0
                    }), J.tracker && J.tracker.attr({
                        height: 0,
                        "stroke-width": 0
                    }),
                    J.dataLabel && J.dataLabel.attr({
                        text: ""
                    }));
                else if (Y = P.previousY, ea = u.getAxisPosition(Y || E), P = u.getAxisPosition(S + (Y || 0)), Q = Bb(P - ea), 0 > S && (P = ea), Xb(P) <= F && (Q -= F - P - +A, P = F - +A), ra(P + Q) >= G && (Q -= ra(P + Q) - G + +!!y + +A), 1 >= y && (ra(M) <= K && (z += M, M = K - y / 2 + +!!y - +A, z -= M), ra(M + z) >= I && (z = I - M + y / 2 - +!!y + +A)), ea = Ha.crispBound(M, P, z, Q, y), M = ea.x, P = ea.y, z = ea.width, Q = ea.height, A && !ia(Y) && (C ? (y = P - (F - y / 2), Q += y, P -= y) : D && (Q = G - P + y / 2)), 1 >= Q && (Q = 1, P += 0 > S ? 0 : -Q), J && J.graphic && (J.graphic.attr({
                        x: M,
                        y: P,
                        width: z,
                        height: Q
                    }).data("BBox",
                        ea), J.tracker.data("eventArgs", X), J.dataLabel && J.dataLabel.attrs.text !== N && J.dataLabel.attr({
                        text: N
                    }), d.drawPlotColumnLabel(a, e, c, M, P), V || q)) !v && Q < Eb && (P -= (Eb - Q) / 2, Q = Eb), J.tracker && J.tracker.attr({
                    x: M,
                    y: P,
                    width: z,
                    height: Q
                });
                ga = J && (ga = J.index) || ga
            }
            return a
        },
        updatePlotLine: function (a, e, c) {
            var d = this,
                b = d.paper,
                f = d.options,
                k = f.chart,
                g = f.plotOptions.series,
                p = a.items,
                m = a.graphics || (a.graphics = []),
                l, n = d.xAxis[e.xAxis || 0],
                q = d.yAxis[e.yAxis || 0],
                r = !1 !== (f.tooltip || {}).enabled,
                f = a.data,
                t = !1 === e.visible ? "hidden" :
                "visible",
                u = f.length,
                z = g.connectNullData,
                A, w, F, x, y, D, C, E = null,
                G, K = e.lineWidth,
                P = e.color,
                H, I, J, V, Y, N, Q, S, W, M, ea = d.layers,
                $ = ea.dataset = ea.dataset || b.group("dataset-orphan"),
                ea = ea.tracker,
                Z, X, aa, ba, da, ga, ha, ia, fa, ja, la, oa, ra, qa;
            ja = function (a) {
                ma.call(this, d, a)
            };
            la = function (a) {
                return function (b) {
                    d.hoverPlotAnchor(this, b, "DataPlotRollOver", a, d)
                }
            };
            oa = function (a) {
                return function (b) {
                    d.hoverPlotAnchor(this, b, "DataPlotRollOut", a, d)
                }
            };
            qa = function (b, c, f, g, h, l, k, n, p) {
                return function () {
                    var l = f.imageUrl,
                        q = f.imageScale,
                        s = f.imageAlpha,
                        u = k.imageHoverAlpha,
                        v = k.imageHoverScale,
                        w = this.width * q * .01,
                        x = this.width * v * .01;
                    W = {
                        x: b - this.width * q * .005,
                        y: c - this.height * q * .005,
                        width: w,
                        height: this.height * q * .01,
                        alpha: s
                    };
                    M = {
                        x: b - this.width * v * .005,
                        y: c - this.height * v * .005,
                        width: x,
                        height: this.height * v * .01,
                        alpha: u
                    };
                    u = x > w ? M : W;
                    g.graphic && g.graphic.attr(W).attr("src", l).css({
                        opacity: .01 * s
                    }).data("alwaysInvisible", 0 === q).data("setRolloverProperties", k).data("setRolloverAttr", M).data("setRolloutAttr", W).data("anchorRadius", q).data("anchorHoverRadius",
                        v);
                    if (p || r || k) g.tracker.attr(u).attr({
                        cursor: p ? "pointer" : "",
                        stroke: ka,
                        "stroke-width": f.lineWidth,
                        fill: ka,
                        ishot: !0,
                        visibility: t
                    }).data("eventArgs", h), d.drawTracker && d.drawTracker.call(d, a, e, n);
                    (Z = g.dataLabel = d.drawPlotLineLabel(a, e, n, b, c)) && m.push(Z)
                }
            };
            ra = function (b, c, f, g, h, k, l, n) {
                return function () {
                    (Z = g.dataLabel = d.drawPlotLineLabel(a, e, n, b, c)) && m.push(Z)
                }
            };
            X = $.line || ($.line = b.group("line-connector", $));
            aa = a.lineShadowLayer || (a.lineShadowLayer = b.group("connector-shadow", X));
            ba = a.anchorShadowLayer ||
                (a.anchorShadowLayer = b.group("anchor-shadow", X));
            $ = a.lineLayer || (a.lineLayer = b.group("connector", X));
            X = a.anchorLayer || (a.anchorLayer = b.group("anchors", X));
            if (ha = c.numUpdate || 0)
                for (c = 0; c < ha; c += 1)(l = p.shift()) && delete l._state, p.push(l);
            for (c = 0; c < u; c += 1)
                if (ga = c + ha, A = f[c], D = A.y, y = h(A.x, c), y = n.getAxisPosition(y), x = A.toolText, w = A.link, F = A.displayValue || O, I = A.marker || {}, J = V = I.radius || 0, da = I.shadow, Y = I.lineWidth || 0, N = I.fillColor || "", Q = I.lineColor || "", l = I.imageUrl, fa = !!l, l = p[c], l._state || (l._state = {}), ga >=
                    u && (l || (l = p[c] = {
                        index: c,
                        value: D,
                        graphic: null,
                        connector: null,
                        dataLabel: null,
                        tracker: null
                    }), l.graphic && "image" === l.graphic.type && !fa && (l.graphic && l.graphic.remove(), l.tracker && l.tracker.remove(), l.graphic = l.tracker = null), l.graphic || (l.graphic = (fa ? b.image(X) : b.polypath(X)).attr({
                        visibility: t
                    }), m.push(l.graphic)), fa || l.graphic.attr({
                        fill: R(N),
                        "stroke-width": Y,
                        stroke: R(Q)
                    }), l.connector || (l.connector = b.path($).attr({
                        visibility: t
                    }), l.connector.shadow(g.shadow && A.shadow, aa), m.push(l.connector)), l.connector.attr({
                        "stroke-dasharray": H,
                        stroke: R(G || P),
                        "stroke-width": K,
                        "stroke-linecap": "round",
                        "stroke-linejoin": 2 < K ? "round" : "miter"
                    }), l.tracker || (l.tracker = (fa ? b.rect(ea) : b.circle(ea)).attr({
                        stroke: ka,
                        fill: ka,
                        visibility: t
                    }), m.push(l.tracker)), V = Aa(V, S && S.radius || 0, k.anchorTrackingRadius), ia = {
                        index: c,
                        link: w,
                        value: A.y,
                        displayValue: A.displayValue,
                        categoryLabel: A.categoryLabel,
                        toolText: A.toolText,
                        id: a.userID,
                        datasetIndex: a.index,
                        datasetName: a.name,
                        visible: a.visible
                    }, l._attrClickFn && l.tracker.unclick(l._attrClickFn), l._attrHoverInFn && l.tracker.unhover(l._attrHoverInFn,
                        l._attrHoverOutFn), l.tracker.attr({
                        r: V,
                        "stroke-width": Y,
                        stroke: ka,
                        cursor: w ? "pointer" : "",
                        ishot: !0
                    }).data("eventArgs", ia).click(l._attrClickFn = ja).hover(l._attrHoverInFn = la(l), l._attrHoverOutFn = oa(l)).tooltip(x)), l && (l.index = c), null === D) l && (l.graphic && l.graphic.attr({
                    polypath: [2, 0, 0, 0, 0, 0],
                    "stroke-width": 0
                }), l.dataLabel && l.dataLabel.attr({
                    text: ""
                }), l.connector && l.connector.attr({
                    path: "M-9999,-9999Lh-1",
                    "stroke-width": 0
                }), l.tracker && l.tracker.attr({
                    r: 0,
                    "stroke-width": 0
                })), 0 === z && (E = null);
                else {
                    G = q.getAxisPosition(D);
                    if (I && I.enabled)
                        if (H = I.symbol.split("_"), D = l.graphic, W = M = {}, S = A.rolloverProperties, fa) ga >= u ? (H = new na.Image, H.onload = qa(y, G, I, l, ia, x, S, c, w), H.onerror = ra(y, G, I, l, ia, x, S, c), H.src = I.imageUrl) : (M = D.data("setRolloverAttr"), W = D.data("setRolloutAttr"), M && (M.x = y - .5 * M.width, M.y = G - .5 * M.height, D && D.stop(), l.dataLabel && l.dataLabel.stop(), W.x = y - .5 * W.width, W.y = G - .5 * W.height, D.attr(W), l.tracker && l.tracker.attr({
                            x: W.x,
                            y: W.y,
                            fill: ka
                        })));
                        else {
                            if (S = A.rolloverProperties) W = {
                                polypath: [H[1] || 2, y, G, J, I.startAngle, 0],
                                fill: R(I.fillColor),
                                "stroke-width": I.lineWidth,
                                stroke: R(I.lineColor)
                            }, S = A.rolloverProperties, M = {
                                polypath: [S.sides || 2, y, G, S.radius, S.startAngle, S.dip],
                                fill: R(S.fillColor),
                                "stroke-width": S.lineWidth,
                                stroke: R(S.lineColor)
                            };
                            D && D.attr({
                                polypath: [H[1] || 2, y, G, J, I.startAngle, 0],
                                visibility: 0 === J ? "hidden" : t
                            }).data("isRealtime", !0).data("alwaysInvisible", 0 === J).data("setRolloverProperties", S).data("setRolloverAttr", M).data("setRolloutAttr", W).data("anchorRadius", J).data("anchorHoverRadius", S && S.radius).shadow(da || !1, ba);
                            (w || r) &&
                            l.tracker && l.tracker.attr({
                                cx: y,
                                cy: G
                            })
                        }
                    l.dataLabel && l.dataLabel.attrs.text != F && l.dataLabel.attr({
                        text: F
                    });
                    Z = d.drawPlotLineLabel(a, e, c, y, G);
                    null !== E ? (C = ["M", C, v, E], C.push("L", y, v, G), (E = l.connector) && E.attr({
                        path: C,
                        "stroke-width": K
                    })) : l.connector && l.connector.attr({
                        path: "M-9999,-9999Lh-1",
                        "stroke-width": 0
                    });
                    C = y;
                    E = G;
                    G = A.color;
                    H = A.dashStyle || e.dashStyle
                }
            return a
        },
        updatePlotArea: function (a, e, c) {
            var d = this,
                b = d.paper,
                f = d.options,
                k = f.chart,
                g = d.logic,
                p = f.plotOptions.series,
                m = a.items,
                l = a.graphics || (a.graphics = []),
                n, q = d.xAxis[e.xAxis || 0],
                r = d.yAxis[e.yAxis || 0],
                t = r.axisData.reversed,
                u = g.isStacked,
                z = !1 !== (f.tooltip || {}).enabled,
                f = "0" === d.definition.chart.drawfullareaborder,
                g = a.data,
                A = !1 === e.visible ? "hidden" : "visible",
                w = g.length,
                F = p.connectNullData,
                x, y, D, C, E, G, K, P = r.max,
                H = r.min,
                t = r.getAxisPosition(0 < P && 0 < H ? t ? P : H : 0 > P && 0 > H ? t ? H : P : t ? P : 0),
                P = null,
                I, H = e.lineWidth,
                J = e.dashStyle,
                V = R(e.lineColor),
                W = 0,
                N, Q, S, Y, M, ea, $, Z = [],
                X = [],
                aa = [],
                ba = d.layers,
                da = ba.dataset = ba.dataset || b.group("dataset-orphan"),
                ba = ba.tracker,
                ga, ha, ia,
                fa, ja, la, oa, ra, qa, ua, va, wa, ya, za;
            r.yBasePos = t;
            ua = function (a) {
                ma.call(this, d, a)
            };
            va = function (a) {
                return function (b) {
                    d.hoverPlotAnchor(this, b, "DataPlotRollOver", a, d)
                }
            };
            wa = function (a) {
                return function (b) {
                    d.hoverPlotAnchor(this, b, "DataPlotRollOut", a, d)
                }
            };
            ya = function (b, c, f, g, h, k, m, n, p) {
                return function () {
                    var k = f.imageUrl,
                        q = f.imageScale,
                        r = f.imageAlpha,
                        s = m.imageHoverAlpha,
                        t = m.imageHoverScale,
                        u = this.width * q * .01,
                        v = this.width * t * .01;
                    ea = {
                        x: b - this.width * q * .005,
                        y: c - this.height * q * .005,
                        width: u,
                        height: this.height * q *
                            .01,
                        alpha: r
                    };
                    $ = {
                        x: b - this.width * t * .005,
                        y: c - this.height * t * .005,
                        width: v,
                        height: this.height * t * .01,
                        alpha: s
                    };
                    s = v > u ? $ : ea;
                    g.graphic && g.graphic.attr(ea).attr("src", k).css({
                        opacity: .01 * r
                    }).data("alwaysInvisible", 0 === q).data("setRolloverProperties", m).data("setRolloverAttr", $).data("setRolloutAttr", ea).data("anchorRadius", q).data("anchorHoverRadius", t);
                    if (p || z || m) g.tracker.attr(s).attr({
                            cursor: p ? "pointer" : "",
                            stroke: ka,
                            "stroke-width": f.lineWidth,
                            fill: ka,
                            ishot: !0,
                            visibility: A
                        }).data("eventArgs", h), d.drawTracker &&
                        d.drawTracker.call(d, a, e, n);
                    (fa = g.dataLabel = d.drawPlotLineLabel(a, e, n, b, c)) && l.push(fa)
                }
            };
            za = function (b, c, f, g, h, k, m, n) {
                return function () {
                    (fa = g.dataLabel = d.drawPlotLineLabel(a, e, n, b, c)) && l.push(fa)
                }
            };
            u && (ia = da.shadows || (da.shadows = b.group("shadows", da).toBack()));
            ga = da.line || (da.line = b.group("line-connector", da));
            a.lineShadowLayer || (a.lineShadowLayer = b.group("connector-shadow", ga));
            da = a.anchorShadowLayer || (a.anchorShadowLayer = b.group("anchor-shadow", ga));
            u = a.lineLayer || (a.lineLayer = b.group("connector",
                ga));
            ga = a.anchorLayer || (a.anchorLayer = b.group("anchors", ga));
            if (la = c.numUpdate || 0)
                for (c = 0; c < la; c += 1)(n = m.shift()) && delete n._state, m.push(n);
            for (c = 0; c < w; c += 1) ja = c + la, x = g[c], E = x.y, n = h(x.x, c), I = q.getAxisPosition(n), C = x.toolText, y = x.link, D = x.displayValue || O, N = x.marker || {}, Q = K = N.radius || 0, ha = N.shadow, G = N.lineWidth || 0, S = N.fillColor || "", Y = N.lineColor || "", ra = N.imageUrl, qa = !!ra, n = m[c], ja >= w && (n || (n = m[c] = {
                    index: c,
                    graphic: null,
                    connector: null,
                    dataLabel: null,
                    tracker: null
                }), n.graphic && "image" === n.graphic.type &&
                !qa && (n.graphic && n.graphic.remove(), n.tracker && n.tracker.remove(), n.graphic = n.tracker = null), n.graphic || (n.graphic = (qa ? b.image(ga) : b.polypath(ga)).attr({
                    visibility: A
                }), l.push(n.graphic)), qa || n.graphic.attr({
                    fill: R(S),
                    "stroke-width": G,
                    stroke: R(Y)
                }), n.tracker || (n.tracker = (qa ? b.rect(ba) : b.circle(ba)).attr({
                    stroke: ka,
                    fill: ka,
                    visibility: A
                }), l.push(n.tracker)), K = Aa(K, M && M.radius || 0, k.anchorTrackingRadius), oa = {
                    index: c,
                    link: y,
                    value: x.y,
                    displayValue: x.displayValue,
                    categoryLabel: x.categoryLabel,
                    toolText: x.toolText,
                    id: a.userID,
                    datasetIndex: a.index,
                    datasetName: a.name,
                    visible: a.visible
                }, n._attrHoverInFn && n.tracker.unhover(n._attrHoverInFn, n._attrHoverOutFn), n._attrClickFn && n.tracker.unclick(n._attrClickFn), n.tracker.attr({
                    r: K,
                    "stroke-width": G,
                    cursor: y ? "pointer" : "",
                    ishot: !0
                }).data("eventArgs", oa).click(n._attrClickFn = ua).hover(n._attrHoverInFn = va(n), n._attrHoverOutFn = wa(n)).tooltip(C)), n && (n.index = c), null === E ? (n && (n.graphic && n.graphic.attr({
                    polypath: [2, 0, 0, 0, 0, 0],
                    "stroke-width": 0
                }), n.dataLabel && n.dataLabel.attr({
                    text: ""
                }),
                n.tracker && n.tracker.attr({
                    r: 0,
                    "stroke-width": 0
                })), 0 === F && (P = null, 0 < W && (1 === W ? Z.splice(-8, 8) : (Z = Z.concat(X), Z.push("Z")), X = []))) : (y = x.link, G = x.previousY, K = (K = r.getAxisPosition(G) || null) || t, E = r.getAxisPosition(E + (G || 0)), N && N.enabled && (G = N.symbol.split("_"), S = n.graphic, ea = $ = {}, M = x.rolloverProperties, qa && S ? ja >= w ? (ja = new na.Image, ja.onload = ya(I, E, N, n, oa, C, M, c, y), ja.onerror = za(I, E, N, n, oa, C, M, c), ja.src = ra) : ($ = S.data("setRolloverAttr"), ea = S.data("setRolloutAttr"), S && S.stop(), n.dataLabel && n.dataLabel.stop(),
                $ && ($.x = I - .5 * $.width, $.y = E - .5 * $.height, ea.x = I - .5 * ea.width, ea.y = E - .5 * ea.height, S.attr(ea), n.tracker && n.tracker.attr({
                    x: ea.x,
                    y: ea.y,
                    fill: ka
                }))) : (M && (ea = {
                polypath: [G[1] || 2, I, E, Q, N.startAngle, 0],
                fill: R(N.fillColor),
                "stroke-width": N.lineWidth,
                stroke: R(N.lineColor)
            }, M = x.rolloverProperties, $ = {
                polypath: [M.sides || 2, I, E, M.radius, M.startAngle, M.dip],
                fill: R(M.fillColor),
                "stroke-width": M.lineWidth,
                stroke: R(M.lineColor)
            }), S && S.attr({
                polypath: [G[1] || 2, I, E, Q, N.startAngle, 0],
                visibility: 0 === Q ? "hidden" : A
            }).data("isRealtime", !0).data("alwaysInvisible", 0 === Q).data("setRolloverProperties", M).data("setRolloverAttr", $).data("setRolloutAttr", ea).data("anchorRadius", Q).data("anchorHoverRadius", M && M.radius).shadow(ha || !1, da), (y || z) && n.tracker && n.tracker.attr({
                cx: I,
                cy: E
            }))), n.dataLabel && n.dataLabel.attrs.text !== D && n.dataLabel.attr({
                text: D
            }), fa = d.drawPlotLineLabel(a, e, c, I, E), null === P ? (aa.push("M", I, v, E), Z.push("M", I, v, K), W = 0) : aa.push("L", I, v, E), Z.push("L", I, v, E), X.unshift("L", I, v, K), W++, P = E);
            0 < W && (1 === W ? Z.splice(-8, 8) : (Z = Z.concat(X),
                Z.push("Z")));
            a.graphic || (a.graphic = b.path(void 0).attr({
                "stroke-dasharray": J,
                "stroke-width": f ? 0 : H,
                stroke: V,
                "stroke-linecap": "round",
                "stroke-linejoin": 2 < H ? "round" : "miter"
            }).shadow(p.shadow && x.shadow, ia), l.push(a.graphic));
            a.graphic.attr({
                path: Z
            });
            f && (a.connector || (a.connector = b.path(u).attr({
                "stroke-dasharray": J,
                "stroke-width": H,
                stroke: V,
                "stroke-linecap": "round",
                "stroke-linejoin": 2 < H ? "round" : "miter"
            }), l.push(a.connector)), a.connector.attr({
                path: aa
            }));
            return a
        }
    }, z["renderer.cartesian"])
}, [3, 2, 0, "sr2"]]);
