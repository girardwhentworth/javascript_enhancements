! function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = "function" == typeof require && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n || e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
    return s
}({
    1: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = {
            Treat: function(response) {
                var retData = {};
                try {
                    retData.rock = JSON.parse(decodeURIComponent(QueryString.rock))
                } catch (e) {
                    return console.error("Could not parse rock: ", e), null
                }
                retData.user = {}, void 0 !== retData.rock.Age && (retData.user.Age = retData.rock.Age), void 0 !== retData.rock.Gender && (retData.user.Gender = retData.rock.Gender), void 0 !== retData.rock.fid && (retData.user.FeedID = retData.rock.fid), void 0 !== retData.rock.key && (retData.user.PlacementID = retData.rock.key);
                try {
                    retData.user.EUID = QueryString.euid.split("$")[0]
                } catch (e) {
                    return console.error("Could not parse EUID: ", e), null
                }
                try {
                    retData.user.tid = QueryString.tid.split("$")[0]
                } catch (e) {
                    return console.error("Could not parse TID: ", e), null
                }
                if (retData.client = response.client, retData.campaigns = response.campaigns, retData.pixelServer = response.pixelServer, retData.task = {}, retData.task.total = retData.client.e + (retData.client.disableReload ? 0 : 1), 1 == retData.client.timeoutSetting || 2 == retData.client.timeoutSetting) {
                    var maxTimeout = parseInt(retData.client.maxTimeout),
                        minTimeout = parseInt(retData.client.minTimeout);
                    retData.client.timeout = Math.floor(Math.random() * maxTimeout - minTimeout + 1) + minTimeout
                }
                return retData
            }
        }
    }, {}],
    2: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var makeid = function() {
            for (var text = "", possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text
        };
        exports.default = {
            Treat: function(link, user, pixelServer, doNext) {
                console.log("treating");
                var retUrls = [];
                if ("jsonp" == link.type) {
                    var url = link.url;
                    if (-1 !== url.indexOf("{{UID}}") && user.PublisherUID && (url = url.replace("{{UID}}", user.PublisherUID)), -1 !== url.indexOf("{{IP}}") && void 0 !== QueryString.ip && "" !== QueryString.ip) {
                        var ip = QueryString.ip;
                        url = url.replace("{{IP}}", ip)
                    } - 1 !== url.indexOf("{{CUA}}") && (url = url.replace("{{CUA}}", encodeURI(navigator.userAgent))), -1 !== url.indexOf("{{REF}}") && (url = url.replace("{{REF}}", encodeURI(document.domain))), console.log("link", link), $.ajax({
                        url: url,
                        jsonp: "callback",
                        dataType: "jsonp",
                        success: function(response) {
                            for (var i = 0; i < response.length; i++) {
                                var newData = {},
                                    res = response[i],
                                    time = (new Date).getTime() + i,
                                    traPixel = link.trackingPixel;
                                traPixel += "&tid=" + QueryString.tid, traPixel += "&_cb=" + time, traPixel += "&paper=" + QueryString.paper, traPixel += "&encl=" + QueryString.encl, traPixel += "&transig=" + QueryString.transig, newData.body = res.body, newData.title = res.title, newData.hash = link.hash, newData.trackingUrl = traPixel, newData.click_url = res.click_url, newData.image_url = res.image_url, console.log("newData", newData), retUrls.push(newData)
                            }
                            doNext(retUrls)
                        }
                    })
                }
                "links" == link.type && (-1 !== link.link.indexOf("&") ? link.link += "&tid=" + QueryString.tid + "&paper=" + QueryString.paper + "&transig=" + QueryString.transig + "&encl=" + QueryString.encl : link.link += "?tid=" + QueryString.tid + "&paper=" + QueryString.paper + "&transig=" + QueryString.transig + "&encl=" + QueryString.encl, retUrls.push(link), doNext(retUrls))
            },
            AddMetrics: function(parentLink, childLink) {
                console.log("parentLink", parentLink), childLink += "&_cb=" + makeid();
                var c_wh = $(window).height(),
                    c_ww = $(window).width(),
                    c_sh = window.screen.height,
                    c_sw = window.screen.width,
                    now = new Date,
                    c_timer = (now - new Date) / 1e3;
                return childLink += "&c_my=0", childLink += "&c_mx=0", childLink += "&c_wh=" + c_wh, childLink += "&c_ww=" + c_ww, childLink += "&c_sh=" + c_sh, childLink += "&c_sw=" + c_sw, childLink += "&c_dh=" + ("hidden" in document ? document.hidden ? "h1" : "v1" : "webkitHidden" in document ? document.webkitHidden ? "h2" : "v2" : "u1"), childLink += "&c_timer=" + c_timer, childLink += "&c_timerActive=0", childLink += "&prevUrlLike=0", childLink += "&campaign_id=" + parentLink.campaign_id
            }
        }
    }, {}],
    3: [function(require, module, exports) {
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            }
        }
        var __vueify_insert__ = require("vueify/lib/insert-css"),
            __vueify_style__ = __vueify_insert__.insert("\nhtml,body {font-family: \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif;font-weight: 300;}\nbody{background:#fff url('http://cdn.ngage-media.com/guide_logo.png') 15px 15px no-repeat;}\n.container { text-align:center; max-width:800px;margin: 0px auto 25px auto;position: relative;top: 35px;}\n.container table {width:500px;margin: 0 auto 10px auto;}\n.title { font-size: 48px; padding:0; margin:0; color: #666;}\n.small { font-size:24px;}\n.ngage-desc{font-weight: 800;font-size: 16px;color: #000;text-align: left;width: 550px;margin: 10px auto 20px auto;}\n.mainMessage{color:#666;\tpadding: 10px 0px 15px;}\n.task-tracking{font-size: 22px;padding-bottom:10px;}\n.discovery-switch{ border-top: 1px solid #ccc;  border-bottom: 1px solid #ccc;  background: url(/img/encrave_fs_off.jpg) no-repeat 10px center;  padding: 10px;  text-align: left;  padding-left: 50px; font-weight: 100;  position: relative;  color: #c7c7cc; width: 30%; margin: 0px auto;}\n.discovery-switch.playall {  background: url(/img/encrave_pa_off.png) no-repeat 10px center;  }\n.discovery-switch.active {  background: url(/img/encrave_fs.jpg) no-repeat 10px center;  color: #434b57;  }\n.discovery-switch.active.playall {  background: url(/img/encrave_pa.png) no-repeat 10px center;  }\n.discovery-switch .switch {  position: absolute;  top: 0;  right: 0;  bottom: 0;  width: 100px;  background: url(/img/encrave_fsswitch_on.jpg) center center no-repeat;  cursor: pointer;  }\n.discovery-switch .switch.active {  background: url(/img/encrave_fsswitch_off.jpg) center center no-repeat;  }\ntable .graphic{width:120px;padding-right:30px;}\ntable .desc { text-align:left; vertical-align: top; font-size:22px; color:#666666;}\n.warn { color:red;}\n.desc_graphic { padding-top:20px;}\n#guide_w2w { background:url('http://cdn.ngage-media.com/gude_w2w.png') center 24px no-repeat; height:106px; width:120px;}\n#guide_amazcontent { background:url('http://cdn.ngage-media.com/guide_amazcontent.png') center 18px no-repeat; height:104px; width:120px;}\n#guide_navigate { background:url('http://cdn.ngage-media.com/guide_navigate.png') center  no-repeat; height:72px; width:120px;}\n#guide_navigate { background:url('http://cdn.ngage-media.com/guide_popup.png') center  no-repeat; height:72px; width:120px;}\n#startEarning, #discoverMore, #nowDiscovering { text-align:center; width:272px; height:54px; display:inline-block; line-height:54px; text-decoration:none; color:#ffffff; font-size:18px; font-weight:600; border-radius: 30px;}\n.rewarded { font-size:52px; color:#0bd318;}\n.success { background-color: #0bd318;  }\n.error { background-color: red; }\n.wait { background-color: #aaaaaa; }\n#stdFinished { padding-top:50px; }\n#stdFinished .title{ font-size: 22px; margin: 20px 0px;}\n.timer {font-size:72px; font-weight:500;}\ndiv.inactive-user { background-color: red;color:white; text-align:center; font-size:22px;margin: 10px 0 20px 0px;padding: 10px;border-radius: 10px;}\n#info {width:520px;margin: 0 auto;}\n#info h3 { font-size:27px; color:#333333; font-weight:400; margin:14px 0; padding:0; }\n#info p { font-size:18px; color: #666666; line-height:26px; font-weight:200;}\n#loader, #message { background: #ffffff url('http://cdn.ngage-media.com/img/loading_wh.gif') center center no-repeat; top:0; left:0; position:fixed; width:100%; height:100%; z-index:99999999;}\n");
        Object.defineProperty(exports, "__esModule", {
            value: !0
        });
        var _typeof2 = require("babel-runtime/helpers/typeof"),
            _typeof3 = _interopRequireDefault(_typeof2),
            _MainContent = require("./components/MainContent.vue"),
            _MainContent2 = _interopRequireDefault(_MainContent),
            _getdata = require("../common/getdata.js"),
            _getdata2 = _interopRequireDefault(_getdata),
            _preplinks = require("../common/preplinks.js"),
            _preplinks2 = _interopRequireDefault(_preplinks);
        exports.default = {
            components: {
                "main-content": _MainContent2.default
            },
            ready: function() {
                if ("object" !== (0, _typeof3.default)(window.Ncrave) || !window.Ncrave) return void console.error("nCrave not able to load");
                var vueThis = this,
                    Ncrave = window.Ncrave,
                    eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
                (0, window[eventMethod])("attachEvent" == eventMethod ? "onmessage" : "message", function(e) {
                    "string" == typeof e.data && (0 == e.data.indexOf("encaction") && vueThis.beginCountdown(!0), vueThis.client.timerPause && (vueThis.linkIsOpen = !0, 0 == e.data.indexOf("encsuccess") && vueThis.handleEncSuccess(), 0 == e.data.indexOf("enconblur") && vueThis.handleBlur(), 0 == e.data.indexOf("enconfocus") && vueThis.handleFocus()))
                }, !1), this.$http.get(Ncrave.promoServer + "ncrave/promo/getdata/" + Ncrave.key + "/200?v=1&tid=" + QueryString.tid + "&paper=" + QueryString.paper).then(function(response) {
                    var treated = _getdata2.default.Treat(response.data);
                    if (!treated) return void console.error("nCrave not able to load");
                    console.info("Treated: ", treated), vueThis.dataLoaded = !0, vueThis.rock = treated.rock, vueThis.user = treated.user, vueThis.client = treated.client, vueThis.campaigns = treated.campaigns, vueThis.activeCampaigns = treated.activeCampaigns, vueThis.pixelServer = treated.pixelServer, vueThis.task.total = treated.task.total, vueThis.mainMessage = Ncrave.mainMessage, window.onbeforeunload = function() {
                        if (!window.placementIsComplete) {
                            var pingUrl = vueThis.pixelServer + "f/t/closeSession?tid=" + QueryString.tid + "&paper=" + QueryString.paper + "&rock=" + QueryString.rock + "&encl=" + QueryString.encl;
                            (new Image).src = pingUrl
                        }
                    }, !0 === vueThis.client.stripOutReferer && vueThis.stripOutReferer(), vueThis.client.startedAutoPlaylist = vueThis.client.autoPlaylist, vueThis.client.autoPlaylist && (vueThis.client.autoPlaylist = !vueThis.client.autoPlaylistPaused), vueThis.client.isNgageTV = vueThis.client.popupOpen, vueThis.setBodyClass(vueThis.client && vueThis.client.theme), vueThis.client.autoStart && (vueThis.client.autoPlaylist || vueThis.client.isNgageTV) && vueThis.nextLink()
                    //Edit-004
                    //setInterval(function() {
                        //Edit-002
                    //    console.log("|---JS---| Incrementing the thing.")
                    //    vueThis.started && (vueThis.idleTimer++, 0 == vueThis.idleWarned && vueThis.idleTimer == vueThis.client.timeout + 240 && (vueThis.idleWarned = !0, alert("Please continue onto the next link before your session becomes inactive")), 1 == vueThis.idleWarned && vueThis.idleTimer == vueThis.client.timeout + 300 && (alert("Your session is inactive, you will not be rewarded for this activity"), document.body.innerHTML = ""))
                    //}, 1e3)
 
                })
            },
            data: function() {
                return {
                    idleTimer: 0,
                    idleWarned: !1,
                    dataLoaded: !1,
                    linkIndex: 0,
                    rock: "",
                    user: {},
                    client: {},
                    links: {},
                    activeLinks: {},
                    pixelServer: "",
                    keepCravingAuto: !1,
                    currentLink: "",
                    queuedLinks: [],
                    visitedLinks: 0,
                    currentIndex: 0,
                    navLinkIndex: 0,
                    pageTimeout: 0,
                    completed: !1,
                    currentEngagementCount: 0,
                    showNextUrlInfo: !1,
                    keepCraving: "",
                    keepCravingCountdown: 0,
                    completeReward: 0,
                    completeCurrency: "",
                    canContinueLink: !1,
                    mainMessage: "",
                    engageTimer: 0,
                    taskLabel: "",
                    task: {
                        total: 0
                    },
                    started: !1,
                    linkIsOpen: !1,
                    isInBlur: !1,
                    child: null,
                    errorState: {
                        code: 0,
                        msg: ""
                    },
                    hostName: window.location.host
                }
            },
            methods: {
                setBodyClass: function(className) {
                    className = className || "", document.body.className = className
                },
                stripOutReferer: function() {
                    var meta = document.createElement("meta");
                    meta.name = "referrer", meta.content = "no-referrer", document.getElementsByTagName("head")[0].appendChild(meta)
                },
                createChildWindow: function() {
                    var vueThis = this;
                    vueThis.client.resizeChildWindow && null != vueThis.child && (vueThis.child.close(), vueThis.child = null), null == vueThis.child && (vueThis.child = window.open("http://" + window.location.host + "/redirecting.html", "linkWindow" + window.Ncrave.key, "location=0,menubar=0,scrollbars=1,scrolling=yes,status=0,titlebar=0,toolbar=0,resizable=0,height=" + window.screen.availHeight + ", width=" + window.screen.availWidth)), vueThis.child.focus()
                },
                handleEncSuccess: function() {},
                handleBlur: function() {
                    var vueThis = this;
                //  vueThis.pageTimeout > 0 && vueThis.linkIsOpen && (vueThis.isInBlur = !0, vueThis.handleError(3), clearInterval(vueThis.linkTimer))
                },
                handleFocus: function() {
                    var vueThis = this;
                //  vueThis.linkIsOpen && (vueThis.resetError(), vueThis.isInBlur && (vueThis.isInBlur = !1, vueThis.pageTimeout = vueThis.client.timeout, vueThis.beginCountdown()))
                },
                handleError: function(code) {
                    var vueThis = this;
                    switch (code) {
                        //case 4:
                        //    vueThis.errorState.code = code, vueThis.errorState.msg = "Your browser window is currently too small to complete this activity. Please resize.";
                        //    break;
                        //case 3:
                        //    vueThis.errorState.code = code, vueThis.errorState.msg = "In order to complete this activity, you must keep the window active at all times.  The experience will be paused until you view the content again.";
                        //    break;
                        //case 2:
                        //    vueThis.errorState.code = code, vueThis.errorState.msg = "We understand that you are in a rush, but discovering stuff is more fun when you take your time. Give it a try.";
                        //    break;
                        default:
                            vueThis.errorState.code = code, vueThis.errorState.msg = "We're sorry, this activity is not available at this time."
                    }
                },
                resetError: function(code) {
                    this.errorState = {
                        code: 0,
                        msg: ""
                    }
                },
                clearTimers: function() {
                    var vueThis = this;
                    clearInterval(vueThis.linkTimer), clearInterval(vueThis.childWindowTimer)
                },
                resetChild: function() {
                    var vueThis = this;
                    vueThis.child.closed || vueThis.child.close(), vueThis.linkIsOpen = !1, clearInterval(vueThis.encInit), vueThis.clearTimers(), vueThis.child = null
                },
                checkChild: function() {
                    var vueThis = this;
                    vueThis.child.closed && (vueThis.resetError(), vueThis.resetChild())
                },
                startTimer: function() {
                    var vueThis = this;
                    vueThis.linkIsOpen && (clearInterval(vueThis.linkTimer), vueThis.linkTimer = setInterval(function() {
                        if (0 == --vueThis.pageTimeout) {
                            if (vueThis.clearTimers(), vueThis.visitedLinks == vueThis.client.displayLimit) return vueThis.placementComplete(), void vueThis.child.close();
                            (vueThis.client.autoPlaylist || vueThis.client.isNgageTV) && vueThis.nextLink()
                        }
                    }, 1e3))
                },
                beginCountdown: function(fromEngagement) {
                    var vueThis = this;
                    if (fromEngagement && ++vueThis.currentEngagementCount, !(vueThis.client.e > 0 && vueThis.client.e > vueThis.currentEngagementCount || 0 !== vueThis.client.e && vueThis.currentEngagementCount !== vueThis.client.e))
                        if (0 === vueThis.client.e) vueThis.startTimer();
                        else {
                            console.log("user", vueThis.user);
                            var pingUrl = vueThis.pixelServer + "f/t/trackEngage?tid=" + QueryString.tid + "&cid=" + vueThis.user.ClickID + "&paper=" + QueryString.paper;
                            $.ajax({
                                url: pingUrl,
                                jsonp: "callback",
                                dataType: "jsonp",
                                success: function(d) {
                                    d.success ? setTimeout(function() {
                                        vueThis.canContinueLink = !0, vueThis.startTimer()
                                    }, 1e3) : console.error("cannot validate engagement", e)
                                },
                                error: function(xhr) {
                                    vueThis.child.close(), alert("Page refresh was detected, please close the card and restart"), self.close()
                                }
                            })
                        }
                },
                findMoreLinks: function() {
                    var vueThis = this,
                        deferred = $.Deferred();
                    if (vueThis.queuedLinks.length > 0) return deferred.resolve();
                    if (vueThis.linkIndex > vueThis.campaigns.length - 1) return deferred.reject();
                    return function createQueuedLinks(cb) {
                        vueThis.navLinkIndex = 0, _preplinks2.default.Treat(vueThis.campaigns[vueThis.linkIndex], vueThis.user, vueThis.pixelServer, function(data) {
                            vueThis.linkIndex++, vueThis.currentIndex = vueThis.linkIndex - 1, vueThis.queuedLinks = data, vueThis.queuedLinks.length <= 0 ? createQueuedLinks(cb) : cb()
                        })
                    }(function() {
                        return deferred.resolve()
                    }), deferred.promise()
                },
                placementComplete: function() {
                    var vueThis = this,
                        completeURL = vueThis.pixelServer + "f/t/pixel?tid=" + QueryString.tid + "&paper=" + QueryString.paper + "&rock=" + QueryString.rock + "&encl=" + QueryString.encl + "&urrMet=" + QueryString.urrMet;
                    $.ajax({
                        url: completeURL,
                        jsonp: "callback",
                        dataType: "jsonp",
                        success: function(d) {
                            if (window.placementIsComplete = !0, !d.success || !0 !== d.success) return vueThis.handleError(1), vueThis.child.close(), void vueThis.resetChild();
                            if (vueThis.resetError(), vueThis.completed = !0, vueThis.keepCraving = d.KeepCraving, vueThis.completeReward = d.Reward, vueThis.completeCurrency = d.Currency, vueThis.keepCravingCountdown = 5, clearInterval(vueThis.encInit), vueThis.clearTimers(), vueThis.keepCraving.length > 0 && (vueThis.client.isNgageTV || vueThis.client.autoPlaylist && vueThis.client.keepCravingAuto))
                                if (vueThis.client.isNgageTV) window.location.href = vueThis.keepCraving;
                                else if (vueThis.client.autoPlaylist && vueThis.client.keepCravingAuto) {
                                var countdownInterval = setInterval(function() {
                                    vueThis.keepCravingCountdown > 0 && 0 == --vueThis.keepCravingCountdown && clearInterval(countdownInterval)
                                }, 1e3);
                                setTimeout(function() {
                                    window.location.href = vueThis.keepCraving
                                }, 5e3)
                            }
                        }
                    })
                },
                displayAdWindow: function() {
                    var vueThis = this;
                    vueThis.started || (vueThis.started = !0), vueThis.visitedLinks <= vueThis.client.displayLimit && (vueThis.child.location.replace(vueThis.currentLink), vueThis.child.focus(), clearInterval(vueThis.childWindowTimer), vueThis.childWindowTimer = setInterval(vueThis.checkChild, 500), clearInterval(vueThis.encInit), vueThis.encInit = setInterval(function() {
                        vueThis.child.postMessage("message", "*")
                    }, 100), vueThis.linkIsOpen = !0, vueThis.idleTimer = 0, vueThis.idleWarned = !1, vueThis.beginCountdown(!1))
                },
                nextLink: function() {
                    var vueThis = this;
                    return vueThis.resetError(), vueThis.createChildWindow(), vueThis.visitedLinks >= vueThis.client.displayLimit && vueThis.pageTimeout <= 0 ? void vueThis.placementComplete() : vueThis.pageTimeout > 0 && vueThis.currentLink.length > 1 ? void(vueThis.linkIsOpen || (vueThis.pageTimeout = vueThis.client.timeout, vueThis.displayAdWindow())) : void vueThis.findMoreLinks().done(function() {
                        vueThis.currentEngagementCount = 0, vueThis.canContinueLink = !1;
                        var ad = vueThis.queuedLinks[vueThis.navLinkIndex],
                            adLink = "string" == typeof ad.trackingUrl ? ad.trackingUrl : ad.link;
                        adLink = _preplinks2.default.AddMetrics(vueThis.campaigns[vueThis.currentIndex], adLink), $.ajax({
                            url: adLink,
                            jsonp: "callback",
                            dataType: "jsonp"
                        }).done(function(d) {
                            if (!d.success || !0 !== d.success) {
                                var errCode = 1;
                                return errCode = "string" == typeof d.errorMsg && "ConcurrentClicking" == d.errorMsg ? 2 : errCode, errCode = "string" == typeof d.errorMsg && "BrowserSize" == d.errorMsg ? 4 : errCode, vueThis.handleError(errCode), void vueThis.resetChild()
                            }
                            vueThis.user.ClickID = d.cid, void 0 !== ad.redirecturl ? vueThis.currentLink = ad.redirectUrl : void 0 === ad.trackingUrl ? vueThis.currentLink = d.redirectUrl : vueThis.currentLink = ad.click_url, void 0 !== ad.tos ? vueThis.client.timeout = ad.tos : 1 != vueThis.client.timeoutSetting && 2 != vueThis.client.timeoutSetting || (vueThis.client.timeout = Math.floor(Math.random() * (parseInt(vueThis.client.maxTimeout) - parseInt(vueThis.client.minTimeout) + 1)) + parseInt(vueThis.client.minTimeout)), vueThis.client.timeout = parseInt(vueThis.client.timeout), vueThis.pageTimeout = vueThis.client.timeout, vueThis.visitedLinks++, vueThis.queuedLinks.shift(), vueThis.displayAdWindow()
                        }).fail(function() {
                            vueThis.handleError(1), vueThis.resetChild()
                        })
                    }).fail(function() {
                        vueThis.handleError(1), vueThis.resetChild()
                    })
                }
            }
        }, module.exports.__esModule && (module.exports = module.exports.default), ("function" == typeof module.exports ? module.exports.options : module.exports).template = '\n<main-content :page-timeout.sync="pageTimeout" :main-message="mainMessage" :task="task" :completed="completed" :started="started" :link-is-open.sync="linkIsOpen" :client="client" :current-engagement-count="currentEngagementCount" :visited-links="visitedLinks" :nav-to-next-link.sync="nextLink" :keep-craving="keepCraving" :keep-craving-countdown="keepCravingCountdown" :complete-reward="completeReward" :complete-currency="completeCurrency" :can-continue-link="canContinueLink" :error-state="errorState" :host-name="hostName">\n</main-content>\n', module.hot && function() {
            module.hot.accept();
            var hotAPI = require("vue-hot-reload-api");
            hotAPI.install(require("vue"), !0), hotAPI.compatible && (module.hot.dispose(function() {
                __vueify_insert__.cache["\nhtml,body {font-family: \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif;font-weight: 300;}\nbody{background:#fff url('http://cdn.ngage-media.com/guide_logo.png') 15px 15px no-repeat;}\n.container { text-align:center; max-width:800px;margin: 0px auto 25px auto;position: relative;top: 35px;}\n.container table {width:500px;margin: 0 auto 10px auto;}\n.title { font-size: 48px; padding:0; margin:0; color: #666;}\n.small { font-size:24px;}\n.ngage-desc{font-weight: 800;font-size: 16px;color: #000;text-align: left;width: 550px;margin: 10px auto 20px auto;}\n.mainMessage{color:#666;\tpadding: 10px 0px 15px;}\n.task-tracking{font-size: 22px;padding-bottom:10px;}\n.discovery-switch{ border-top: 1px solid #ccc;  border-bottom: 1px solid #ccc;  background: url(/img/encrave_fs_off.jpg) no-repeat 10px center;  padding: 10px;  text-align: left;  padding-left: 50px; font-weight: 100;  position: relative;  color: #c7c7cc; width: 30%; margin: 0px auto;}\n.discovery-switch.playall {  background: url(/img/encrave_pa_off.png) no-repeat 10px center;  }\n.discovery-switch.active {  background: url(/img/encrave_fs.jpg) no-repeat 10px center;  color: #434b57;  }\n.discovery-switch.active.playall {  background: url(/img/encrave_pa.png) no-repeat 10px center;  }\n.discovery-switch .switch {  position: absolute;  top: 0;  right: 0;  bottom: 0;  width: 100px;  background: url(/img/encrave_fsswitch_on.jpg) center center no-repeat;  cursor: pointer;  }\n.discovery-switch .switch.active {  background: url(/img/encrave_fsswitch_off.jpg) center center no-repeat;  }\ntable .graphic{width:120px;padding-right:30px;}\ntable .desc { text-align:left; vertical-align: top; font-size:22px; color:#666666;}\n.warn { color:red;}\n.desc_graphic { padding-top:20px;}\n#guide_w2w { background:url('http://cdn.ngage-media.com/gude_w2w.png') center 24px no-repeat; height:106px; width:120px;}\n#guide_amazcontent { background:url('http://cdn.ngage-media.com/guide_amazcontent.png') center 18px no-repeat; height:104px; width:120px;}\n#guide_navigate { background:url('http://cdn.ngage-media.com/guide_navigate.png') center  no-repeat; height:72px; width:120px;}\n#guide_navigate { background:url('http://cdn.ngage-media.com/guide_popup.png') center  no-repeat; height:72px; width:120px;}\n#startEarning, #discoverMore, #nowDiscovering { text-align:center; width:272px; height:54px; display:inline-block; line-height:54px; text-decoration:none; color:#ffffff; font-size:18px; font-weight:600; border-radius: 30px;}\n.rewarded { font-size:52px; color:#0bd318;}\n.success { background-color: #0bd318;  }\n.error { background-color: red; }\n.wait { background-color: #aaaaaa; }\n#stdFinished { padding-top:50px; }\n#stdFinished .title{ font-size: 22px; margin: 20px 0px;}\n.timer {font-size:72px; font-weight:500;}\ndiv.inactive-user { background-color: red;color:white; text-align:center; font-size:22px;margin: 10px 0 20px 0px;padding: 10px;border-radius: 10px;}\n#info {width:520px;margin: 0 auto;}\n#info h3 { font-size:27px; color:#333333; font-weight:400; margin:14px 0; padding:0; }\n#info p { font-size:18px; color: #666666; line-height:26px; font-weight:200;}\n#loader, #message { background: #ffffff url('http://cdn.ngage-media.com/img/loading_wh.gif') center center no-repeat; top:0; left:0; position:fixed; width:100%; height:100%; z-index:99999999;}\n"] = !1, document.head.removeChild(__vueify_style__)
            }), module.hot.data ? hotAPI.update("_v-701fd0cd", module.exports, ("function" == typeof module.exports ? module.exports.options : module.exports).template) : hotAPI.createRecord("_v-701fd0cd", module.exports))
        }()
    }, {
        "../common/getdata.js": 1,
        "../common/preplinks.js": 2,
        "./components/MainContent.vue": 4,
        "babel-runtime/helpers/typeof": 7,
        vue: 41,
        "vue-hot-reload-api": 39,
        "vueify/lib/insert-css": 42
    }],
    4: [function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = {
            props: ["pageTimeout", "mainMessage", "task", "currentEngagementCount", "completed", "started", "linkIsOpen", "client", "visitedLinks", "navToNextLink", "keepCraving", "completeReward", "completeCurrency", "canContinueLink", "errorState", "hostName", "keepCravingCountdown"],
            methods: {
                getElapsedTimeString: function(total_seconds) {
                    function pretty_time_string(num) {
                        return (num < 10 ? "0" : "") + num
                    }
                    var hours = Math.floor(total_seconds / 3600);
                    total_seconds %= 3600;
                    var minutes = Math.floor(total_seconds / 60);
                    total_seconds %= 60;
                    var seconds = Math.floor(total_seconds);
                    return hours = pretty_time_string(hours), minutes = pretty_time_string(minutes), seconds = pretty_time_string(seconds), minutes + ":" + seconds
                },
                isButtonEnabled: function() {
                    return !this.completed && (!this.started || (!this.client.isNgageTV || !this.linkIsOpen))
                },
                getButtonText: function() {
                    return this.started ? this.pageTimeout > 0 ? this.linkIsOpen ? "Now Discovering" : "Reopen URL" : "Next Page" : "Start Earning"
                },
                getButtonClass: function() {
                    return this.started && this.pageTimeout > 0 ? this.linkIsOpen ? "wait" : "error" : "success"
                },
                getDiscoveryClass: function() {
                    var retVal = "discovery-switch";
                    return retVal += this.client.autoPlaylist ? " active" : "", retVal += this.client.e > 0 ? " playall" : ""
                },
                decodeEncodedHtml: function(escapedHtml) {
                    var txt = document.createElement("textarea");
                    return txt.innerHTML = escapedHtml, txt.value
                }
            }
        }, module.exports.__esModule && (module.exports = module.exports.default), ("function" == typeof module.exports ? module.exports.options : module.exports).template = '\n    <div id="intro" v-show="!started &amp;&amp; !completed">\n        <p class="title">Get Started</p>\n        \x3c!--\n        This table is in initial view for all states\n        --\x3e\n        <table>\n            <tbody><tr>\n                <td class="graphic"><div id="guide_w2w"></div></td>\n                <td class="desc desc_graphic">Your content will open in a separate window</td>\n            </tr>\n            <tr>\n                <td class="graphic"><div id="guide_amazcontent"></div></td>\n                <td class="desc" style="padding-top:20px;">Navigate to that window to discover amazing content</td>\n            </tr>\n            <tr>\n                <td class="graphic"><div id="guide_navigate"></div></td>\n                <td class="desc" style="padding-top:10px;">This window will remain open and will help you navigate the experience</td>\n            </tr>\n        </tbody></table>\n        \x3c!--\n        isNgageTV only\n        --\x3e\n        <div class="ngage-desc" v-show="client.isNgageTV || this.client.autoPlaylist">\n            <span>Directions:</span>\n            <ol>\n                <li><span class="warn">Note: In order to use nGage, you need to allow popups.</span></li>\n                <li>On your computer, open Chrome.</li>\n                <li>Find a page that has pop-ups blocked for you.</li>\n                <li>In the address bar, click Pop-ups blocked <img src="http://img.syn.entertainmentcrave.com/tools/formatImage?url=https%3A%2F%2Flh3.googleusercontent.com%2FXwfWobfXD_zcXU4tEwzxHPuK6dTTPG200fLzsZU7QcguWbIQzm4tk7sLDutpAUWFMA%3Dh18&amp;w=18&amp;h=18">.</li>\n                <li>Click the link for the pop-up window you\'d like to see.</li>\n                <li>To always see pop-ups for the site, select Always show pop-ups from [site] and then Done.</li>\n            </ol>\n            <span>\n                Chrome users, click <a href="https://support.google.com/chrome/answer/95472?co=GENIE.Platform%3DDesktop&amp;hl=en" target="_blank">here</a> to learn more on how to enable pop-ups for {{hostName}}\n            </span>\n        </div>\n\n    </div>\n    <div id="stdExploring">\n         <div v-show="started &amp;&amp; !completed">\n             \x3c!--\n             Main Timer View\n             --\x3e\n            <p class="title" style="padding-bottom:0px;" v-show="(client.e == 0 || (client.e != 0 &amp;&amp; canContinueLink &amp;&amp; client.e <= currentEngagementCount))">\n                <span class="timer">{{getElapsedTimeString(pageTimeout)}}</span>\n                 </p><div>(You are on step <span class="progress">{{visitedLinks}}</span> of <span class="total">{{client.displayLimit}}</span>)</div>\n             <p></p>\n             \x3c!--\n             Task Tracking View\n             --\x3e\n            <p class="task-tracking" v-show="(client.e != 0 &amp;&amp; canContinueLink == false &amp;&amp; currentEngagementCount <= client.e)">\n                {{client.taskLabel}} {{currentEngagementCount + 1}} of <span class="total">{{task.total}}</span>\n            </p>\n             \x3c!--\n            Discovery Mode Switch View\n            --\x3e\n             <div class="{{getDiscoveryClass()}}" v-show="client.startedAutoPlaylist">\n                 {{(client.e &gt; 0)? \'Play All Mode\' : \'Discovery Mode\' }}\n                 <span class="switch {{(client.autoPlaylist)? \'active\': \'\'}}" v-on:click="client.autoPlaylist = !client.autoPlaylist"></span>\n             </div>\n            \x3c!--\n            Main Message View\n            --\x3e\n            <div v-show="mainMessage &amp;&amp; mainMessage.length > 0" class="mainMessage">{{{decodeEncodedHtml(mainMessage)}}}</div>\n\n        </div>\n    </div>\n    \x3c!--\n    Error Container View\n    --\x3e\n    <div class="inactive-user" v-show="started &amp;&amp; errorState.code > 0">\n       {{errorState.msg}}\n    </div>\n    \x3c!--\n    Call To Action Button/Link View - \'Start Earning\'\n    --\x3e\n    <a v-show="isButtonEnabled()" href="#" id="startEarning" v-on:click="navToNextLink();return false;" class="{{getButtonClass();}}">{{getButtonText();}}</a>\n    \x3c!--\n    How It Works View\n    --\x3e\n    <div id="info" v-show="started &amp;&amp; !completed">\n        <h3>How It Works</h3>\n        <p>Your content has been opened in a separate window.  Please navigate to that window to view.  This window will remain open and will help you navigate the experience.</p>\n        <p v-show="client.isNgageTV"><strong>This NgageTV experience will <em>only</em> work if {{hostName}} is whitelisted from your ad blocker and pop-up blocker</strong></p><strong>\n    </strong></div><strong>\n    \x3c!--\n    Completed View\n    --\x3e\n    <div id="stdFinished" v-show="completed">\n        <p class="title">Thanks for discovering content with nGage.</p>\n        <p class="title rewarded">You earned {{ completeReward }} {{ completeCurrency }}</p>\n        <a v-show="keepCraving.length > 0" href="{{keepCraving}}" id="discoverMore" class="success">Continue nGaging</a>\n        <p class="title" v-show="client.autoPlaylist &amp;&amp; client.keepCravingAuto">Automatically continuing in {{keepCravingCountdown}} seconds...</p>\n    </div>\n\n</strong>', module.hot && function() {
            module.hot.accept();
            var hotAPI = require("vue-hot-reload-api");
            hotAPI.install(require("vue"), !0), hotAPI.compatible && (module.hot.data ? hotAPI.update("_v-f8eb6e6a", module.exports, ("function" == typeof module.exports ? module.exports.options : module.exports).template) : hotAPI.createRecord("_v-f8eb6e6a", module.exports))
        }()
    }, {
        vue: 41,
        "vue-hot-reload-api": 39
    }],
    5: [function(require, module, exports) {
        "use strict";

        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            }
        }
        var _vue = require("vue"),
            _vue2 = _interopRequireDefault(_vue),
            _App = require("./App.vue"),
            _App2 = _interopRequireDefault(_App);
        _vue2.default.use(require("vue-resource")), _vue2.default.transition("fade", {
            css: !1,
            enter: function(el, done) {
                $(el).css("opacity", 0).animate({
                    opacity: 1
                }, 1e3, done)
            },
            enterCancelled: function(el) {
                $(el).stop()
            },
            leave: function(el, done) {
                $(el).animate({
                    opacity: 0
                }, 1e3, done)
            },
            leaveCancelled: function(el) {
                $(el).stop()
            }
        }), new _vue2.default({
            el: "body",
            components: {
                App: _App2.default
            }
        })
    }, {
        "./App.vue": 3,
        vue: 41,
        "vue-resource": 40
    }],
    6: [function(require, module, exports) {
        module.exports = {
            default: require("core-js/library/fn/symbol"),
            __esModule: !0
        }
    }, {
        "core-js/library/fn/symbol": 8
    }],
    7: [function(require, module, exports) {
        "use strict";
        var _Symbol = require("babel-runtime/core-js/symbol").default;
        exports.default = function(obj) {
            return obj && obj.constructor === _Symbol ? "symbol" : typeof obj
        }, exports.__esModule = !0
    }, {
        "babel-runtime/core-js/symbol": 6
    }],
    8: [function(require, module, exports) {
        require("../../modules/es6.symbol"), require("../../modules/es6.object.to-string"), module.exports = require("../../modules/$.core").Symbol
    }, {
        "../../modules/$.core": 12,
        "../../modules/es6.object.to-string": 36,
        "../../modules/es6.symbol": 37
    }],
    9: [function(require, module, exports) {
        module.exports = function(it) {
            if ("function" != typeof it) throw TypeError(it + " is not a function!");
            return it
        }
    }, {}],
    10: [function(require, module, exports) {
        var isObject = require("./$.is-object");
        module.exports = function(it) {
            if (!isObject(it)) throw TypeError(it + " is not an object!");
            return it
        }
    }, {
        "./$.is-object": 25
    }],
    11: [function(require, module, exports) {
        var toString = {}.toString;
        module.exports = function(it) {
            return toString.call(it).slice(8, -1)
        }
    }, {}],
    12: [function(require, module, exports) {
        var core = module.exports = {
            version: "1.2.6"
        };
        "number" == typeof __e && (__e = core)
    }, {}],
    13: [function(require, module, exports) {
        var aFunction = require("./$.a-function");
        module.exports = function(fn, that, length) {
            if (aFunction(fn), void 0 === that) return fn;
            switch (length) {
                case 1:
                    return function(a) {
                        return fn.call(that, a)
                    };
                case 2:
                    return function(a, b) {
                        return fn.call(that, a, b)
                    };
                case 3:
                    return function(a, b, c) {
                        return fn.call(that, a, b, c)
                    }
            }
            return function() {
                return fn.apply(that, arguments)
            }
        }
    }, {
        "./$.a-function": 9
    }],
    14: [function(require, module, exports) {
        module.exports = function(it) {
            if (void 0 == it) throw TypeError("Can't call method on  " + it);
            return it
        }
    }, {}],
    15: [function(require, module, exports) {
        module.exports = !require("./$.fails")(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    }, {
        "./$.fails": 18
    }],
    16: [function(require, module, exports) {
        var $ = require("./$");
        module.exports = function(it) {
            var keys = $.getKeys(it),
                getSymbols = $.getSymbols;
            if (getSymbols)
                for (var key, symbols = getSymbols(it), isEnum = $.isEnum, i = 0; symbols.length > i;) isEnum.call(it, key = symbols[i++]) && keys.push(key);
            return keys
        }
    }, {
        "./$": 26
    }],
    17: [function(require, module, exports) {
        var global = require("./$.global"),
            core = require("./$.core"),
            ctx = require("./$.ctx"),
            $export = function(type, name, source) {
                var key, own, out, IS_FORCED = type & $export.F,
                    IS_GLOBAL = type & $export.G,
                    IS_STATIC = type & $export.S,
                    IS_PROTO = type & $export.P,
                    IS_BIND = type & $export.B,
                    IS_WRAP = type & $export.W,
                    exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
                    target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {}).prototype;
                IS_GLOBAL && (source = name);
                for (key in source)(own = !IS_FORCED && target && key in target) && key in exports || (out = own ? target[key] : source[key], exports[key] = IS_GLOBAL && "function" != typeof target[key] ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? function(C) {
                    var F = function(param) {
                        return this instanceof C ? new C(param) : C(param)
                    };
                    return F.prototype = C.prototype, F
                }(out) : IS_PROTO && "function" == typeof out ? ctx(Function.call, out) : out, IS_PROTO && ((exports.prototype || (exports.prototype = {}))[key] = out))
            };
        $export.F = 1, $export.G = 2, $export.S = 4, $export.P = 8, $export.B = 16, $export.W = 32, module.exports = $export
    }, {
        "./$.core": 12,
        "./$.ctx": 13,
        "./$.global": 20
    }],
    18: [function(require, module, exports) {
        module.exports = function(exec) {
            try {
                return !!exec()
            } catch (e) {
                return !0
            }
        }
    }, {}],
    19: [function(require, module, exports) {
        var toIObject = require("./$.to-iobject"),
            getNames = require("./$").getNames,
            toString = {}.toString,
            windowNames = "object" == typeof window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
            getWindowNames = function(it) {
                try {
                    return getNames(it)
                } catch (e) {
                    return windowNames.slice()
                }
            };
        module.exports.get = function(it) {
            return windowNames && "[object Window]" == toString.call(it) ? getWindowNames(it) : getNames(toIObject(it))
        }
    }, {
        "./$": 26,
        "./$.to-iobject": 33
    }],
    20: [function(require, module, exports) {
        var global = module.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = global)
    }, {}],
    21: [function(require, module, exports) {
        var hasOwnProperty = {}.hasOwnProperty;
        module.exports = function(it, key) {
            return hasOwnProperty.call(it, key)
        }
    }, {}],
    22: [function(require, module, exports) {
        var $ = require("./$"),
            createDesc = require("./$.property-desc");
        module.exports = require("./$.descriptors") ? function(object, key, value) {
            return $.setDesc(object, key, createDesc(1, value))
        } : function(object, key, value) {
            return object[key] = value, object
        }
    }, {
        "./$": 26,
        "./$.descriptors": 15,
        "./$.property-desc": 29
    }],
    23: [function(require, module, exports) {
        var cof = require("./$.cof");
        module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
            return "String" == cof(it) ? it.split("") : Object(it)
        }
    }, {
        "./$.cof": 11
    }],
    24: [function(require, module, exports) {
        var cof = require("./$.cof");
        module.exports = Array.isArray || function(arg) {
            return "Array" == cof(arg)
        }
    }, {
        "./$.cof": 11
    }],
    25: [function(require, module, exports) {
        module.exports = function(it) {
            return "object" == typeof it ? null !== it : "function" == typeof it
        }
    }, {}],
    26: [function(require, module, exports) {
        var $Object = Object;
        module.exports = {
            create: $Object.create,
            getProto: $Object.getPrototypeOf,
            isEnum: {}.propertyIsEnumerable,
            getDesc: $Object.getOwnPropertyDescriptor,
            setDesc: $Object.defineProperty,
            setDescs: $Object.defineProperties,
            getKeys: $Object.keys,
            getNames: $Object.getOwnPropertyNames,
            getSymbols: $Object.getOwnPropertySymbols,
            each: [].forEach
        }
    }, {}],
    27: [function(require, module, exports) {
        var $ = require("./$"),
            toIObject = require("./$.to-iobject");
        module.exports = function(object, el) {
            for (var key, O = toIObject(object), keys = $.getKeys(O), length = keys.length, index = 0; length > index;)
                if (O[key = keys[index++]] === el) return key
        }
    }, {
        "./$": 26,
        "./$.to-iobject": 33
    }],
    28: [function(require, module, exports) {
        module.exports = !0
    }, {}],
    29: [function(require, module, exports) {
        module.exports = function(bitmap, value) {
            return {
                enumerable: !(1 & bitmap),
                configurable: !(2 & bitmap),
                writable: !(4 & bitmap),
                value: value
            }
        }
    }, {}],
    30: [function(require, module, exports) {
        module.exports = require("./$.hide")
    }, {
        "./$.hide": 22
    }],
    31: [function(require, module, exports) {
        var def = require("./$").setDesc,
            has = require("./$.has"),
            TAG = require("./$.wks")("toStringTag");
        module.exports = function(it, tag, stat) {
            it && !has(it = stat ? it : it.prototype, TAG) && def(it, TAG, {
                configurable: !0,
                value: tag
            })
        }
    }, {
        "./$": 26,
        "./$.has": 21,
        "./$.wks": 35
    }],
    32: [function(require, module, exports) {
        var global = require("./$.global"),
            store = global["__core-js_shared__"] || (global["__core-js_shared__"] = {});
        module.exports = function(key) {
            return store[key] || (store[key] = {})
        }
    }, {
        "./$.global": 20
    }],
    33: [function(require, module, exports) {
        var IObject = require("./$.iobject"),
            defined = require("./$.defined");
        module.exports = function(it) {
            return IObject(defined(it))
        }
    }, {
        "./$.defined": 14,
        "./$.iobject": 23
    }],
    34: [function(require, module, exports) {
        var id = 0,
            px = Math.random();
        module.exports = function(key) {
            return "Symbol(".concat(void 0 === key ? "" : key, ")_", (++id + px).toString(36))
        }
    }, {}],
    35: [function(require, module, exports) {
        var store = require("./$.shared")("wks"),
            uid = require("./$.uid"),
            Symbol = require("./$.global").Symbol;
        module.exports = function(name) {
            return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)("Symbol." + name))
        }
    }, {
        "./$.global": 20,
        "./$.shared": 32,
        "./$.uid": 34
    }],
    36: [function(require, module, exports) {}, {}],
    37: [function(require, module, exports) {
        "use strict";
        var $ = require("./$"),
            global = require("./$.global"),
            has = require("./$.has"),
            DESCRIPTORS = require("./$.descriptors"),
            $export = require("./$.export"),
            redefine = require("./$.redefine"),
            $fails = require("./$.fails"),
            shared = require("./$.shared"),
            setToStringTag = require("./$.set-to-string-tag"),
            uid = require("./$.uid"),
            wks = require("./$.wks"),
            keyOf = require("./$.keyof"),
            $names = require("./$.get-names"),
            enumKeys = require("./$.enum-keys"),
            isArray = require("./$.is-array"),
            anObject = require("./$.an-object"),
            toIObject = require("./$.to-iobject"),
            createDesc = require("./$.property-desc"),
            getDesc = $.getDesc,
            setDesc = $.setDesc,
            _create = $.create,
            getNames = $names.get,
            $Symbol = global.Symbol,
            $JSON = global.JSON,
            _stringify = $JSON && $JSON.stringify,
            setter = !1,
            HIDDEN = wks("_hidden"),
            isEnum = $.isEnum,
            SymbolRegistry = shared("symbol-registry"),
            AllSymbols = shared("symbols"),
            useNative = "function" == typeof $Symbol,
            ObjectProto = Object.prototype,
            setSymbolDesc = DESCRIPTORS && $fails(function() {
                return 7 != _create(setDesc({}, "a", {
                    get: function() {
                        return setDesc(this, "a", {
                            value: 7
                        }).a
                    }
                })).a
            }) ? function(it, key, D) {
                var protoDesc = getDesc(ObjectProto, key);
                protoDesc && delete ObjectProto[key], setDesc(it, key, D), protoDesc && it !== ObjectProto && setDesc(ObjectProto, key, protoDesc)
            } : setDesc,
            wrap = function(tag) {
                var sym = AllSymbols[tag] = _create($Symbol.prototype);
                return sym._k = tag, DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
                    configurable: !0,
                    set: function(value) {
                        has(this, HIDDEN) && has(this[HIDDEN], tag) && (this[HIDDEN][tag] = !1), setSymbolDesc(this, tag, createDesc(1, value))
                    }
                }), sym
            },
            isSymbol = function(it) {
                return "symbol" == typeof it
            },
            $defineProperty = function(it, key, D) {
                return D && has(AllSymbols, key) ? (D.enumerable ? (has(it, HIDDEN) && it[HIDDEN][key] && (it[HIDDEN][key] = !1), D = _create(D, {
                    enumerable: createDesc(0, !1)
                })) : (has(it, HIDDEN) || setDesc(it, HIDDEN, createDesc(1, {})), it[HIDDEN][key] = !0), setSymbolDesc(it, key, D)) : setDesc(it, key, D)
            },
            $defineProperties = function(it, P) {
                anObject(it);
                for (var key, keys = enumKeys(P = toIObject(P)), i = 0, l = keys.length; l > i;) $defineProperty(it, key = keys[i++], P[key]);
                return it
            },
            $create = function(it, P) {
                return void 0 === P ? _create(it) : $defineProperties(_create(it), P)
            },
            $propertyIsEnumerable = function(key) {
                var E = isEnum.call(this, key);
                return !(E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]) || E
            },
            $getOwnPropertyDescriptor = function(it, key) {
                var D = getDesc(it = toIObject(it), key);
                return !D || !has(AllSymbols, key) || has(it, HIDDEN) && it[HIDDEN][key] || (D.enumerable = !0), D
            },
            $getOwnPropertyNames = function(it) {
                for (var key, names = getNames(toIObject(it)), result = [], i = 0; names.length > i;) has(AllSymbols, key = names[i++]) || key == HIDDEN || result.push(key);
                return result
            },
            $getOwnPropertySymbols = function(it) {
                for (var key, names = getNames(toIObject(it)), result = [], i = 0; names.length > i;) has(AllSymbols, key = names[i++]) && result.push(AllSymbols[key]);
                return result
            },
            $stringify = function(it) {
                if (void 0 !== it && !isSymbol(it)) {
                    for (var replacer, $replacer, args = [it], i = 1, $$ = arguments; $$.length > i;) args.push($$[i++]);
                    return replacer = args[1], "function" == typeof replacer && ($replacer = replacer), !$replacer && isArray(replacer) || (replacer = function(key, value) {
                        if ($replacer && (value = $replacer.call(this, key, value)), !isSymbol(value)) return value
                    }), args[1] = replacer, _stringify.apply($JSON, args)
                }
            },
            buggyJSON = $fails(function() {
                var S = $Symbol();
                return "[null]" != _stringify([S]) || "{}" != _stringify({
                    a: S
                }) || "{}" != _stringify(Object(S))
            });
        useNative || ($Symbol = function() {
            if (isSymbol(this)) throw TypeError("Symbol is not a constructor");
            return wrap(uid(arguments.length > 0 ? arguments[0] : void 0))
        }, redefine($Symbol.prototype, "toString", function() {
            return this._k
        }), isSymbol = function(it) {
            return it instanceof $Symbol
        }, $.create = $create, $.isEnum = $propertyIsEnumerable, $.getDesc = $getOwnPropertyDescriptor, $.setDesc = $defineProperty, $.setDescs = $defineProperties, $.getNames = $names.get = $getOwnPropertyNames, $.getSymbols = $getOwnPropertySymbols, DESCRIPTORS && !require("./$.library") && redefine(ObjectProto, "propertyIsEnumerable", $propertyIsEnumerable, !0));
        var symbolStatics = {
            for: function(key) {
                return has(SymbolRegistry, key += "") ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key)
            },
            keyFor: function(key) {
                return keyOf(SymbolRegistry, key)
            },
            useSetter: function() {
                setter = !0
            },
            useSimple: function() {
                setter = !1
            }
        };
        $.each.call("hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), function(it) {
            var sym = wks(it);
            symbolStatics[it] = useNative ? sym : wrap(sym)
        }), setter = !0, $export($export.G + $export.W, {
            Symbol: $Symbol
        }), $export($export.S, "Symbol", symbolStatics), $export($export.S + $export.F * !useNative, "Object", {
            create: $create,
            defineProperty: $defineProperty,
            defineProperties: $defineProperties,
            getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
            getOwnPropertyNames: $getOwnPropertyNames,
            getOwnPropertySymbols: $getOwnPropertySymbols
        }), $JSON && $export($export.S + $export.F * (!useNative || buggyJSON), "JSON", {
            stringify: $stringify
        }), setToStringTag($Symbol, "Symbol"), setToStringTag(Math, "Math", !0), setToStringTag(global.JSON, "JSON", !0)
    }, {
        "./$": 26,
        "./$.an-object": 10,
        "./$.descriptors": 15,
        "./$.enum-keys": 16,
        "./$.export": 17,
        "./$.fails": 18,
        "./$.get-names": 19,
        "./$.global": 20,
        "./$.has": 21,
        "./$.is-array": 24,
        "./$.keyof": 27,
        "./$.library": 28,
        "./$.property-desc": 29,
        "./$.redefine": 30,
        "./$.set-to-string-tag": 31,
        "./$.shared": 32,
        "./$.to-iobject": 33,
        "./$.uid": 34,
        "./$.wks": 35
    }],
    38: [function(require, module, exports) {
        function defaultSetTimout() {
            throw new Error("setTimeout has not been defined")
        }

        function defaultClearTimeout() {
            throw new Error("clearTimeout has not been defined")
        }

        function runTimeout(fun) {
            if (cachedSetTimeout === setTimeout) return setTimeout(fun, 0);
            if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) return cachedSetTimeout = setTimeout, setTimeout(fun, 0);
            try {
                return cachedSetTimeout(fun, 0)
            } catch (e) {
                try {
                    return cachedSetTimeout.call(null, fun, 0)
                } catch (e) {
                    return cachedSetTimeout.call(this, fun, 0)
                }
            }
        }

        function runClearTimeout(marker) {
            if (cachedClearTimeout === clearTimeout) return clearTimeout(marker);
            if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) return cachedClearTimeout = clearTimeout, clearTimeout(marker);
            try {
                return cachedClearTimeout(marker)
            } catch (e) {
                try {
                    return cachedClearTimeout.call(null, marker)
                } catch (e) {
                    return cachedClearTimeout.call(this, marker)
                }
            }
        }

        function cleanUpNextTick() {
            draining && currentQueue && (draining = !1, currentQueue.length ? queue = currentQueue.concat(queue) : queueIndex = -1, queue.length && drainQueue())
        }

        function drainQueue() {
            if (!draining) {
                var timeout = runTimeout(cleanUpNextTick);
                draining = !0;
                for (var len = queue.length; len;) {
                    for (currentQueue = queue, queue = []; ++queueIndex < len;) currentQueue && currentQueue[queueIndex].run();
                    queueIndex = -1, len = queue.length
                }
                currentQueue = null, draining = !1, runClearTimeout(timeout)
            }
        }

        function Item(fun, array) {
            this.fun = fun, this.array = array
        }

        function noop() {}
        var cachedSetTimeout, cachedClearTimeout, process = module.exports = {};
        ! function() {
            try {
                cachedSetTimeout = "function" == typeof setTimeout ? setTimeout : defaultSetTimout
            } catch (e) {
                cachedSetTimeout = defaultSetTimout
            }
            try {
                cachedClearTimeout = "function" == typeof clearTimeout ? clearTimeout : defaultClearTimeout
            } catch (e) {
                cachedClearTimeout = defaultClearTimeout
            }
        }();
        var currentQueue, queue = [],
            draining = !1,
            queueIndex = -1;
        process.nextTick = function(fun) {
            var args = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
            queue.push(new Item(fun, args)), 1 !== queue.length || draining || runTimeout(drainQueue)
        }, Item.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, process.title = "browser", process.browser = !0, process.env = {}, process.argv = [], process.version = "", process.versions = {}, process.on = noop, process.addListener = noop, process.once = noop, process.off = noop, process.removeListener = noop, process.removeAllListeners = noop, process.emit = noop, process.prependListener = noop, process.prependOnceListener = noop, process.listeners = function(name) {
            return []
        }, process.binding = function(name) {
            throw new Error("process.binding is not supported")
        }, process.cwd = function() {
            return "/"
        }, process.chdir = function(dir) {
            throw new Error("process.chdir is not supported")
        }, process.umask = function() {
            return 0
        }
    }, {}],
    39: [function(require, module, exports) {
        function patchView(View) {
            var unbuild = View.unbuild;
            View.unbuild = function(defer) {
                if (!this.hotUpdating) {
                    removeView(this.childVM && this.childVM.constructor, this), defer && addView(this.Component, this)
                }
                return unbuild.call(this, defer)
            }
        }

        function addView(Component, view) {
            var id = Component && Component.options.hotID;
            id && (map[id] || (map[id] = {
                Component: Component,
                views: [],
                instances: []
            }), map[id].views.push(view))
        }

        function removeView(Component, view) {
            var id = Component && Component.options.hotID;
            id && map[id].views.$remove(view)
        }

        function makeOptionsHot(id, options) {
            options.hotID = id, injectHook(options, "created", function() {
                var record = map[id];
                record.Component || (record.Component = this.constructor), record.instances.push(this)
            }), injectHook(options, "beforeDestroy", function() {
                map[id].instances.$remove(this)
            })
        }

        function injectHook(options, name, hook) {
            var existing = options[name];
            options[name] = existing ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook] : [hook]
        }

        function updateView(view, Component) {
            if (view._bound) {
                view.Component = Component, view.hotUpdating = !0, view.vm._isCompiled = !1;
                var state = extractState(view.childVM),
                    keepAlive = view.keepAlive;
                view.keepAlive = !1, view.mountComponent(), view.keepAlive = keepAlive, restoreState(view.childVM, state, !0), view.vm._isCompiled = !0, view.hotUpdating = !1
            }
        }

        function extractState(vm) {
            return {
                cid: vm.constructor.cid,
                data: vm.$data,
                children: vm.$children.map(extractState)
            }
        }

        function restoreState(vm, state, isRoot) {
            var oldAsyncConfig;
            isRoot && (oldAsyncConfig = Vue.config.async, Vue.config.async = !1), isRoot || !vm._props ? vm.$data = state.data : Object.keys(state.data).forEach(function(key) {
                vm._props[key] || (vm.$data[key] = state.data[key])
            }), vm.$children.every(function(c, i) {
                return state.children[i] && state.children[i].cid === c.constructor.cid
            }) && vm.$children.forEach(function(c, i) {
                restoreState(c, state.children[i])
            }), isRoot && (Vue.config.async = oldAsyncConfig)
        }

        function format(id) {
            var match = id.match(/[^\/]+\.vue$/);
            return match ? match[0] : id
        }
        var Vue, map = Object.create(null),
            shimmed = !1,
            isBrowserify = !1;
        exports.install = function(vue, browserify) {
            if (!shimmed) {
                if (shimmed = !0, Vue = vue, isBrowserify = browserify, exports.compatible = !!Vue.internalDirectives, !exports.compatible) return void console.warn("[HMR] vue-loader hot reload is only compatible with Vue.js 1.0.0+.");
                patchView(Vue.internalDirectives.component), console.log("[HMR] Vue component hot reload shim applied.");
                var routerView = Vue.elementDirective("router-view");
                routerView && (patchView(routerView), console.log("[HMR] vue-router <router-view> hot reload shim applied."))
            }
        }, exports.createRecord = function(id, options) {
            "function" == typeof options && (options = options.options), "string" != typeof options.el && "object" != typeof options.data && (makeOptionsHot(id, options), map[id] = {
                Component: null,
                views: [],
                instances: []
            })
        }, exports.update = function(id, newOptions, newTemplate) {
            var record = map[id];
            if (!record || record.instances.length && !record.views.length) {
                if (console.log("[HMR] Root or manually-mounted instance modified. Full reload may be required."), isBrowserify) return;
                window.location.reload()
            }
            isBrowserify || console.log("[HMR] Updating component: " + format(id));
            var Component = record.Component;
            newOptions && (Component = record.Component = "function" == typeof newOptions ? newOptions : Vue.extend(newOptions), makeOptionsHot(id, Component.options)), newTemplate && (Component.options.template = newTemplate), Component.options.name && (Component.options.components[Component.options.name] = Component), Component.linker = null, record.views.forEach(function(view) {
                updateView(view, Component)
            }), window.__VUE_DEVTOOLS_GLOBAL_HOOK__ && window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit("flush")
        }
    }, {}],
    40: [function(require, module, exports) {
        "use strict";

        function Util(Vue) {
            util = Vue.util, config = Vue.config
        }

        function warn(msg) {
            console && util.warn && (!config.silent || config.debug) && console.warn("[VueResource warn]: " + msg)
        }

        function error(msg) {
            console && console.error(msg)
        }

        function nextTick(cb, ctx) {
            return util.nextTick(cb, ctx)
        }

        function trim(str) {
            return str.replace(/^\s*|\s*$/g, "")
        }

        function toLower(str) {
            return str ? str.toLowerCase() : ""
        }

        function isString(val) {
            return "string" == typeof val
        }

        function isFunction(val) {
            return "function" == typeof val
        }

        function isObject(obj) {
            return null !== obj && "object" === (void 0 === obj ? "undefined" : _typeof(obj))
        }

        function isPlainObject(obj) {
            return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype
        }

        function options(fn, obj, opts) {
            return opts = opts || {}, isFunction(opts) && (opts = opts.call(obj)), merge(fn.bind({
                $vm: obj,
                $options: opts
            }), fn, {
                $options: opts
            })
        }

        function each(obj, iterator) {
            var i, key;
            if ("number" == typeof obj.length)
                for (i = 0; i < obj.length; i++) iterator.call(obj[i], obj[i], i);
            else if (isObject(obj))
                for (key in obj) obj.hasOwnProperty(key) && iterator.call(obj[key], obj[key], key);
            return obj
        }

        function extend(target) {
            return array.slice.call(arguments, 1).forEach(function(arg) {
                _merge(target, arg)
            }), target
        }

        function merge(target) {
            return array.slice.call(arguments, 1).forEach(function(arg) {
                _merge(target, arg, !0)
            }), target
        }

        function _merge(target, source, deep) {
            for (var key in source) deep && (isPlainObject(source[key]) || isArray(source[key])) ? (isPlainObject(source[key]) && !isPlainObject(target[key]) && (target[key] = {}), isArray(source[key]) && !isArray(target[key]) && (target[key] = []), _merge(target[key], source[key], deep)) : void 0 !== source[key] && (target[key] = source[key])
        }

        function root(options, next) {
            var url = next(options);
            return isString(options.root) && !url.match(/^(https?:)?\//) && (url = options.root + "/" + url), url
        }

        function query(options, next) {
            var urlParams = Object.keys(Url.options.params),
                query = {},
                url = next(options);
            return each(options.params, function(value, key) {
                -1 === urlParams.indexOf(key) && (query[key] = value)
            }), query = Url.params(query), query && (url += (-1 == url.indexOf("?") ? "?" : "&") + query), url
        }

        function legacy(options, next) {
            var variables = [],
                url = next(options);
            return url = url.replace(/(\/?):([a-z]\w*)/gi, function(match, slash, name) {
                return warn("The `:" + name + "` parameter syntax has been deprecated. Use the `{" + name + "}` syntax instead."), options.params[name] ? (variables.push(name), slash + encodeUriSegment(options.params[name])) : ""
            }), variables.forEach(function(key) {
                delete options.params[key]
            }), url
        }

        function encodeUriSegment(value) {
            return encodeUriQuery(value, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
        }

        function encodeUriQuery(value, spaces) {
            return encodeURIComponent(value).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, spaces ? "%20" : "+")
        }

        function expand(url, params, variables) {
            var tmpl = parse(url),
                expanded = tmpl.expand(params);
            return variables && variables.push.apply(variables, tmpl.vars), expanded
        }

        function parse(template) {
            var operators = ["+", "#", ".", "/", ";", "?", "&"],
                variables = [];
            return {
                vars: variables,
                expand: function(context) {
                    return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function(_, expression, literal) {
                        if (expression) {
                            var operator = null,
                                values = [];
                            if (-1 !== operators.indexOf(expression.charAt(0)) && (operator = expression.charAt(0), expression = expression.substr(1)), expression.split(/,/g).forEach(function(variable) {
                                    var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
                                    values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3])), variables.push(tmp[1])
                                }), operator && "+" !== operator) {
                                var separator = ",";
                                return "?" === operator ? separator = "&" : "#" !== operator && (separator = operator), (0 !== values.length ? operator : "") + values.join(separator)
                            }
                            return values.join(",")
                        }
                        return encodeReserved(literal)
                    })
                }
            }
        }

        function getValues(context, operator, key, modifier) {
            var value = context[key],
                result = [];
            if (isDefined(value) && "" !== value)
                if ("string" == typeof value || "number" == typeof value || "boolean" == typeof value) value = value.toString(), modifier && "*" !== modifier && (value = value.substring(0, parseInt(modifier, 10))), result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
                else if ("*" === modifier) Array.isArray(value) ? value.filter(isDefined).forEach(function(value) {
                result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null))
            }) : Object.keys(value).forEach(function(k) {
                isDefined(value[k]) && result.push(encodeValue(operator, value[k], k))
            });
            else {
                var tmp = [];
                Array.isArray(value) ? value.filter(isDefined).forEach(function(value) {
                    tmp.push(encodeValue(operator, value))
                }) : Object.keys(value).forEach(function(k) {
                    isDefined(value[k]) && (tmp.push(encodeURIComponent(k)), tmp.push(encodeValue(operator, value[k].toString())))
                }), isKeyOperator(operator) ? result.push(encodeURIComponent(key) + "=" + tmp.join(",")) : 0 !== tmp.length && result.push(tmp.join(","))
            } else ";" === operator ? result.push(encodeURIComponent(key)) : "" !== value || "&" !== operator && "?" !== operator ? "" === value && result.push("") : result.push(encodeURIComponent(key) + "=");
            return result
        }

        function isDefined(value) {
            return void 0 !== value && null !== value
        }

        function isKeyOperator(operator) {
            return ";" === operator || "&" === operator || "?" === operator
        }

        function encodeValue(operator, value, key) {
            return value = "+" === operator || "#" === operator ? encodeReserved(value) : encodeURIComponent(value), key ? encodeURIComponent(key) + "=" + value : value
        }

        function encodeReserved(str) {
            return str.split(/(%[0-9A-Fa-f]{2})/g).map(function(part) {
                return /%[0-9A-Fa-f]/.test(part) || (part = encodeURI(part)), part
            }).join("")
        }

        function template(options) {
            var variables = [],
                url = expand(options.url, options.params, variables);
            return variables.forEach(function(key) {
                delete options.params[key]
            }), url
        }

        function Url(url, params) {
            var transform, self = this || {},
                options = url;
            return isString(url) && (options = {
                url: url,
                params: params
            }), options = merge({}, Url.options, self.$options, options), Url.transforms.forEach(function(handler) {
                transform = factory(handler, transform, self.$vm)
            }), transform(options)
        }

        function factory(handler, next, vm) {
            return function(options) {
                return handler.call(vm, options, next)
            }
        }

        function serialize(params, obj, scope) {
            var hash, array = isArray(obj),
                plain = isPlainObject(obj);
            each(obj, function(value, key) {
                hash = isObject(value) || isArray(value), scope && (key = scope + "[" + (plain || hash ? key : "") + "]"), !scope && array ? params.add(value.name, value.value) : hash ? serialize(params, value, key) : params.add(key, value)
            })
        }

        function Promise$2(executor) {
            this.state = PENDING, this.value = void 0, this.deferred = [];
            var promise = this;
            try {
                executor(function(x) {
                    promise.resolve(x)
                }, function(r) {
                    promise.reject(r)
                })
            } catch (e) {
                promise.reject(e)
            }
        }

        function Promise$1(executor, context) {
            this.promise = executor instanceof PromiseObj ? executor : new PromiseObj(executor.bind(context)), this.context = context
        }

        function xdrClient(request) {
            return new Promise$1(function(resolve) {
                var handler, xdr = new XDomainRequest,
                    response = {
                        request: request
                    };
                request.cancel = function() {
                    xdr.abort()
                }, xdr.open(request.method, Url(request), !0), handler = function(event) {
                    response.data = xdr.responseText, response.status = xdr.status, response.statusText = xdr.statusText || "", resolve(response)
                }, xdr.timeout = 0, xdr.onload = handler, xdr.onabort = handler, xdr.onerror = handler, xdr.ontimeout = function() {}, xdr.onprogress = function() {}, xdr.send(request.data)
            })
        }

        function crossOrigin(request) {
            var requestUrl = Url.parse(Url(request));
            return requestUrl.protocol !== originUrl.protocol || requestUrl.host !== originUrl.host
        }

        function jsonpClient(request) {
            return new Promise$1(function(resolve) {
                var handler, script, callback = "_jsonp" + Math.random().toString(36).substr(2),
                    response = {
                        request: request,
                        data: null
                    };
                request.params[request.jsonp] = callback, request.cancel = function() {
                    handler({
                        type: "cancel"
                    })
                }, script = document.createElement("script"), script.src = Url(request), script.type = "text/javascript", script.async = !0, window[callback] = function(data) {
                    response.data = data
                }, handler = function(event) {
                    "load" === event.type && null !== response.data ? response.status = 200 : "error" === event.type ? response.status = 404 : response.status = 0, resolve(response), delete window[callback], document.body.removeChild(script)
                }, script.onload = handler, script.onerror = handler, document.body.appendChild(script)
            })
        }

        function interceptor(handler, vm) {
            return function(client) {
                return isFunction(handler) && (handler = handler.call(vm, Promise$1)),
                    function(request) {
                        return isFunction(handler.request) && (request = handler.request.call(vm, request)), when(request, function(request) {
                            return when(client(request), function(response) {
                                return isFunction(handler.response) && (response = handler.response.call(vm, response)), response
                            })
                        })
                    }
            }
        }

        function when(value, fulfilled, rejected) {
            var promise = Promise$1.resolve(value);
            return arguments.length < 2 ? promise : promise.then(fulfilled, rejected)
        }

        function xhrClient(request) {
            return new Promise$1(function(resolve) {
                var handler, xhr = new XMLHttpRequest,
                    response = {
                        request: request
                    };
                request.cancel = function() {
                    xhr.abort()
                }, xhr.open(request.method, Url(request), !0), handler = function(event) {
                    response.data = "response" in xhr ? xhr.response : xhr.responseText, response.status = 1223 === xhr.status ? 204 : xhr.status, response.statusText = trim(xhr.statusText || ""), response.headers = xhr.getAllResponseHeaders(), resolve(response)
                }, xhr.timeout = 0, xhr.onload = handler, xhr.onabort = handler, xhr.onerror = handler, xhr.ontimeout = function() {}, xhr.onprogress = function() {}, isPlainObject(request.xhr) && extend(xhr, request.xhr), isPlainObject(request.upload) && extend(xhr.upload, request.upload), each(request.headers || {}, function(value, header) {
                    xhr.setRequestHeader(header, value)
                }), xhr.send(request.data)
            })
        }

        function Client(request) {
            var response = (request.client || xhrClient)(request);
            return Promise$1.resolve(response).then(function(response) {
                if (response.headers) {
                    var headers = parseHeaders(response.headers);
                    response.headers = function(name) {
                        return name ? headers[toLower(name)] : headers
                    }
                }
                return response.ok = response.status >= 200 && response.status < 300, response
            })
        }

        function parseHeaders(str) {
            var value, name, i, headers = {};
            return isString(str) && each(str.split("\n"), function(row) {
                i = row.indexOf(":"), name = trim(toLower(row.slice(0, i))), value = trim(row.slice(i + 1)), headers[name] ? isArray(headers[name]) ? headers[name].push(value) : headers[name] = [headers[name], value] : headers[name] = value
            }), headers
        }

        function Http(url, options) {
            var request, promise, self = this || {},
                client = Client;
            return Http.interceptors.forEach(function(handler) {
                client = interceptor(handler, self.$vm)(client)
            }), options = isObject(url) ? url : extend({
                url: url
            }, options), request = merge({}, Http.options, self.$options, options), promise = client(request).bind(self.$vm).then(function(response) {
                return response.ok ? response : Promise$1.reject(response)
            }, function(response) {
                return response instanceof Error && error(response), Promise$1.reject(response)
            }), request.success && promise.success(request.success), request.error && promise.error(request.error), promise
        }

        function Resource(url, params, actions, options) {
            var self = this || {},
                resource = {};
            return actions = extend({}, Resource.actions, actions), each(actions, function(action, name) {
                action = merge({
                    url: url,
                    params: params || {}
                }, options, action), resource[name] = function() {
                    return (self.$http || Http)(opts(action, arguments))
                }
            }), resource
        }

        function opts(action, args) {
            var data, success, error, options = extend({}, action),
                params = {};
            switch (args.length) {
                case 4:
                    error = args[3], success = args[2];
                case 3:
                case 2:
                    if (!isFunction(args[1])) {
                        params = args[0], data = args[1], success = args[2];
                        break
                    }
                    if (isFunction(args[0])) {
                        success = args[0], error = args[1];
                        break
                    }
                    success = args[1], error = args[2];
                case 1:
                    isFunction(args[0]) ? success = args[0] : /^(POST|PUT|PATCH)$/i.test(options.method) ? data = args[0] : params = args[0];
                    break;
                case 0:
                    break;
                default:
                    throw "Expected up to 4 arguments [params, data, success, error], got " + args.length + " arguments"
            }
            return options.data = data, options.params = extend({}, options.params, params), success && (options.success = success), error && (options.error = error), options
        }

        function plugin(Vue) {
            plugin.installed || (Util(Vue), Vue.url = Url, Vue.http = Http, Vue.resource = Resource, Vue.Promise = Promise$1, Object.defineProperties(Vue.prototype, {
                $url: {
                    get: function() {
                        return options(Vue.url, this, this.$options.url)
                    }
                },
                $http: {
                    get: function() {
                        return options(Vue.http, this, this.$options.http)
                    }
                },
                $resource: {
                    get: function() {
                        return Vue.resource.bind(this)
                    }
                },
                $promise: {
                    get: function() {
                        var _this = this;
                        return function(executor) {
                            return new Vue.Promise(executor, _this)
                        }
                    }
                }
            }))
        }
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
                return typeof obj
            } : function(obj) {
                return obj && "function" == typeof Symbol && obj.constructor === Symbol ? "symbol" : typeof obj
            },
            util = {},
            config = {},
            array = [],
            console = window.console,
            isArray = Array.isArray,
            ie = document.documentMode,
            el = document.createElement("a");
        Url.options = {
            url: "",
            root: null,
            params: {}
        }, Url.transforms = [template, legacy, query, root], Url.params = function(obj) {
            var params = [],
                escape = encodeURIComponent;
            return params.add = function(key, value) {
                isFunction(value) && (value = value()), null === value && (value = ""), this.push(escape(key) + "=" + escape(value))
            }, serialize(params, obj), params.join("&").replace(/%20/g, "+")
        }, Url.parse = function(url) {
            return ie && (el.href = url, url = el.href), el.href = url, {
                href: el.href,
                protocol: el.protocol ? el.protocol.replace(/:$/, "") : "",
                port: el.port,
                host: el.host,
                hostname: el.hostname,
                pathname: "/" === el.pathname.charAt(0) ? el.pathname : "/" + el.pathname,
                search: el.search ? el.search.replace(/^\?/, "") : "",
                hash: el.hash ? el.hash.replace(/^#/, "") : ""
            }
        };
        var PENDING = 2;
        Promise$2.reject = function(r) {
            return new Promise$2(function(resolve, reject) {
                reject(r)
            })
        }, Promise$2.resolve = function(x) {
            return new Promise$2(function(resolve, reject) {
                resolve(x)
            })
        }, Promise$2.all = function(iterable) {
            return new Promise$2(function(resolve, reject) {
                var count = 0,
                    result = [];
                0 === iterable.length && resolve(result);
                for (var i = 0; i < iterable.length; i += 1) Promise$2.resolve(iterable[i]).then(function(i) {
                    return function(x) {
                        result[i] = x,
                            (count += 1) === iterable.length && resolve(result)
                    }
                }(i), reject)
            })
        }, Promise$2.race = function(iterable) {
            return new Promise$2(function(resolve, reject) {
                for (var i = 0; i < iterable.length; i += 1) Promise$2.resolve(iterable[i]).then(resolve, reject)
            })
        };
        var p$1 = Promise$2.prototype;
        p$1.resolve = function(x) {
            var promise = this;
            if (promise.state === PENDING) {
                if (x === promise) throw new TypeError("Promise settled with itself.");
                var called = !1;
                try {
                    var then = x && x.then;
                    if (null !== x && "object" === (void 0 === x ? "undefined" : _typeof(x)) && "function" == typeof then) return void then.call(x, function(x) {
                        called || promise.resolve(x), called = !0
                    }, function(r) {
                        called || promise.reject(r), called = !0
                    })
                } catch (e) {
                    return void(called || promise.reject(e))
                }
                promise.state = 0, promise.value = x, promise.notify()
            }
        }, p$1.reject = function(reason) {
            var promise = this;
            if (promise.state === PENDING) {
                if (reason === promise) throw new TypeError("Promise settled with itself.");
                promise.state = 1, promise.value = reason, promise.notify()
            }
        }, p$1.notify = function() {
            var promise = this;
            nextTick(function() {
                if (promise.state !== PENDING)
                    for (; promise.deferred.length;) {
                        var deferred = promise.deferred.shift(),
                            onResolved = deferred[0],
                            onRejected = deferred[1],
                            resolve = deferred[2],
                            reject = deferred[3];
                        try {
                            0 === promise.state ? resolve("function" == typeof onResolved ? onResolved.call(void 0, promise.value) : promise.value) : 1 === promise.state && ("function" == typeof onRejected ? resolve(onRejected.call(void 0, promise.value)) : reject(promise.value))
                        } catch (e) {
                            reject(e)
                        }
                    }
            })
        }, p$1.then = function(onResolved, onRejected) {
            var promise = this;
            return new Promise$2(function(resolve, reject) {
                promise.deferred.push([onResolved, onRejected, resolve, reject]), promise.notify()
            })
        }, p$1.catch = function(onRejected) {
            return this.then(void 0, onRejected)
        };
        var PromiseObj = window.Promise || Promise$2;
        Promise$1.all = function(iterable, context) {
            return new Promise$1(PromiseObj.all(iterable), context)
        }, Promise$1.resolve = function(value, context) {
            return new Promise$1(PromiseObj.resolve(value), context)
        }, Promise$1.reject = function(reason, context) {
            return new Promise$1(PromiseObj.reject(reason), context)
        }, Promise$1.race = function(iterable, context) {
            return new Promise$1(PromiseObj.race(iterable), context)
        };
        var p = Promise$1.prototype;
        p.bind = function(context) {
            return this.context = context, this
        }, p.then = function(fulfilled, rejected) {
            return fulfilled && fulfilled.bind && this.context && (fulfilled = fulfilled.bind(this.context)), rejected && rejected.bind && this.context && (rejected = rejected.bind(this.context)), this.promise = this.promise.then(fulfilled, rejected), this
        }, p.catch = function(rejected) {
            return rejected && rejected.bind && this.context && (rejected = rejected.bind(this.context)), this.promise = this.promise.catch(rejected), this
        }, p.finally = function(callback) {
            return this.then(function(value) {
                return callback.call(this), value
            }, function(reason) {
                return callback.call(this), PromiseObj.reject(reason)
            })
        }, p.success = function(callback) {
            return warn("The `success` method has been deprecated. Use the `then` method instead."), this.then(function(response) {
                return callback.call(this, response.data, response.status, response) || response
            })
        }, p.error = function(callback) {
            return warn("The `error` method has been deprecated. Use the `catch` method instead."), this.catch(function(response) {
                return callback.call(this, response.data, response.status, response) || response
            })
        }, p.always = function(callback) {
            warn("The `always` method has been deprecated. Use the `finally` method instead.");
            var cb = function(response) {
                return callback.call(this, response.data, response.status, response) || response
            };
            return this.then(cb, cb)
        };
        var originUrl = Url.parse(location.href),
            supportCors = "withCredentials" in new XMLHttpRequest,
            exports$1 = {
                request: function(_request) {
                    return null === _request.crossOrigin && (_request.crossOrigin = crossOrigin(_request)), _request.crossOrigin && (supportCors || (_request.client = xdrClient), _request.emulateHTTP = !1), _request
                }
            },
            exports$2 = {
                request: function(_request) {
                    return _request.emulateJSON && isPlainObject(_request.data) && (_request.headers["Content-Type"] = "application/x-www-form-urlencoded", _request.data = Url.params(_request.data)), isObject(_request.data) && /FormData/i.test(_request.data.toString()) && delete _request.headers["Content-Type"], isPlainObject(_request.data) && (_request.data = JSON.stringify(_request.data)), _request
                },
                response: function(_response) {
                    try {
                        _response.data = JSON.parse(_response.data)
                    } catch (e) {}
                    return _response
                }
            },
            exports$3 = {
                request: function(_request) {
                    return "JSONP" == _request.method && (_request.client = jsonpClient), _request
                }
            },
            exports$4 = {
                request: function(_request) {
                    return isFunction(_request.beforeSend) && _request.beforeSend.call(this, _request), _request
                }
            },
            exports$5 = {
                request: function(_request) {
                    return _request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(_request.method) && (_request.headers["X-HTTP-Method-Override"] = _request.method, _request.method = "POST"), _request
                }
            },
            exports$6 = {
                request: function(_request) {
                    return _request.method = _request.method.toUpperCase(), _request.headers = extend({}, Http.headers.common, _request.crossOrigin ? {} : Http.headers.custom, Http.headers[_request.method.toLowerCase()], _request.headers), isPlainObject(_request.data) && /^(GET|JSONP)$/i.test(_request.method) && (extend(_request.params, _request.data), delete _request.data), _request
                }
            },
            exports$7 = function() {
                var timeout;
                return {
                    request: function(_request) {
                        return _request.timeout && (timeout = setTimeout(function() {
                            _request.cancel()
                        }, _request.timeout)), _request
                    },
                    response: function(_response) {
                        return clearTimeout(timeout), _response
                    }
                }
            },
            jsonType = {
                "Content-Type": "application/json"
            };
        Http.options = {
            method: "get",
            data: "",
            params: {},
            headers: {},
            xhr: null,
            upload: null,
            jsonp: "callback",
            beforeSend: null,
            crossOrigin: null,
            emulateHTTP: !1,
            emulateJSON: !1,
            timeout: 0
        }, Http.headers = {
            put: jsonType,
            post: jsonType,
            patch: jsonType,
            delete: jsonType,
            common: {
                Accept: "application/json, text/plain, */*"
            },
            custom: {
                "X-Requested-With": "XMLHttpRequest"
            }
        }, Http.interceptors = [exports$4, exports$7, exports$3, exports$5, exports$2, exports$6, exports$1], ["get", "put", "post", "patch", "delete", "jsonp"].forEach(function(method) {
            Http[method] = function(url, data, success, options) {
                return isFunction(data) && (options = success, success = data, data = void 0), isObject(success) && (options = success, success = void 0), this(url, extend({
                    method: method,
                    data: data,
                    success: success
                }, options))
            }
        }), Resource.actions = {
            get: {
                method: "GET"
            },
            save: {
                method: "POST"
            },
            query: {
                method: "GET"
            },
            update: {
                method: "PUT"
            },
            remove: {
                method: "DELETE"
            },
            delete: {
                method: "DELETE"
            }
        }, "undefined" != typeof window && window.Vue && window.Vue.use(plugin), module.exports = plugin
    }, {}],
    41: [function(require, module, exports) {
        (function(process) {
            "use strict";

            function set(obj, key, val) {
                if (hasOwn(obj, key)) return void(obj[key] = val);
                if (obj._isVue) return void set(obj._data, key, val);
                var ob = obj.__ob__;
                if (!ob) return void(obj[key] = val);
                if (ob.convert(key, val), ob.dep.notify(), ob.vms)
                    for (var i = ob.vms.length; i--;) {
                        var vm = ob.vms[i];
                        vm._proxy(key), vm._digest()
                    }
                return val
            }

            function del(obj, key) {
                if (hasOwn(obj, key)) {
                    delete obj[key];
                    var ob = obj.__ob__;
                    if (!ob) return void(obj._isVue && (delete obj._data[key], obj._digest()));
                    if (ob.dep.notify(), ob.vms)
                        for (var i = ob.vms.length; i--;) {
                            var vm = ob.vms[i];
                            vm._unproxy(key), vm._digest()
                        }
                }
            }

            function hasOwn(obj, key) {
                return hasOwnProperty.call(obj, key)
            }

            function isLiteral(exp) {
                return literalValueRE.test(exp)
            }

            function isReserved(str) {
                var c = (str + "").charCodeAt(0);
                return 36 === c || 95 === c
            }

            function _toString(value) {
                return null == value ? "" : value.toString()
            }

            function toNumber(value) {
                if ("string" != typeof value) return value;
                var parsed = Number(value);
                return isNaN(parsed) ? value : parsed
            }

            function toBoolean(value) {
                return "true" === value || "false" !== value && value
            }

            function stripQuotes(str) {
                var a = str.charCodeAt(0);
                return a !== str.charCodeAt(str.length - 1) || 34 !== a && 39 !== a ? str : str.slice(1, -1)
            }

            function camelize(str) {
                return str.replace(camelizeRE, toUpper)
            }

            function toUpper(_, c) {
                return c ? c.toUpperCase() : ""
            }

            function hyphenate(str) {
                return str.replace(hyphenateRE, "$1-$2").replace(hyphenateRE, "$1-$2").toLowerCase()
            }

            function classify(str) {
                return str.replace(classifyRE, toUpper)
            }

            function bind(fn, ctx) {
                return function(a) {
                    var l = arguments.length;
                    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx)
                }
            }

            function toArray(list, start) {
                start = start || 0;
                for (var i = list.length - start, ret = new Array(i); i--;) ret[i] = list[i + start];
                return ret
            }

            function extend(to, from) {
                for (var keys = Object.keys(from), i = keys.length; i--;) to[keys[i]] = from[keys[i]];
                return to
            }

            function isObject(obj) {
                return null !== obj && "object" == typeof obj
            }

            function isPlainObject(obj) {
                return toString.call(obj) === OBJECT_STRING
            }

            function def(obj, key, val, enumerable) {
                Object.defineProperty(obj, key, {
                    value: val,
                    enumerable: !!enumerable,
                    writable: !0,
                    configurable: !0
                })
            }

            function _debounce(func, wait) {
                var timeout, args, context, timestamp, result, later = function later() {
                    var last = Date.now() - timestamp;
                    last < wait && last >= 0 ? timeout = setTimeout(later, wait - last) : (timeout = null, result = func.apply(context, args), timeout || (context = args = null))
                };
                return function() {
                    return context = this, args = arguments, timestamp = Date.now(), timeout || (timeout = setTimeout(later, wait)), result
                }
            }

            function indexOf(arr, obj) {
                for (var i = arr.length; i--;)
                    if (arr[i] === obj) return i;
                return -1
            }

            function cancellable(fn) {
                var cb = function cb() {
                    if (!cb.cancelled) return fn.apply(this, arguments)
                };
                return cb.cancel = function() {
                    cb.cancelled = !0
                }, cb
            }

            function looseEqual(a, b) {
                return a == b || !(!isObject(a) || !isObject(b)) && JSON.stringify(a) === JSON.stringify(b)
            }

            function isNative(Ctor) {
                return /native code/.test(Ctor.toString())
            }

            function Cache(limit) {
                this.size = 0, this.limit = limit, this.head = this.tail = void 0, this._keymap = Object.create(null)
            }

            function peek() {
                return str.charCodeAt(index + 1)
            }

            function next() {
                return str.charCodeAt(++index)
            }

            function eof() {
                return index >= len
            }

            function eatSpace() {
                for (; peek() === spaceChr;) next()
            }

            function isStringStart(chr) {
                return chr === doubleChr || chr === singleChr
            }

            function isExpStart(chr) {
                return expStartChr[chr]
            }

            function isExpEnd(start, chr) {
                return expChrPair[start] === chr
            }

            function parseString() {
                for (var chr, stringQuote = next(); !eof();)
                    if ((chr = next()) === escapeChr) next();
                    else if (chr === stringQuote) break
            }

            function parseSpecialExp(chr) {
                for (var inExp = 0, startChr = chr; !eof();)
                    if (chr = peek(), isStringStart(chr)) parseString();
                    else if (startChr === chr && inExp++, isExpEnd(startChr, chr) && inExp--, next(), 0 === inExp) break
            }

            function parseExpression() {
                for (var start = index; !eof();)
                    if (chr = peek(), isStringStart(chr)) parseString();
                    else if (isExpStart(chr)) parseSpecialExp(chr);
                else if (chr === pipeChr) {
                    if (next(), (chr = peek()) !== pipeChr) {
                        state !== startState && state !== filterArgState || (state = filterState);
                        break
                    }
                    next()
                } else {
                    if (chr === spaceChr && (state === filterNameState || state === filterArgState)) {
                        eatSpace();
                        break
                    }
                    state === filterState && (state = filterNameState), next()
                }
                return str.slice(start + 1, index) || null
            }

            function parseFilterList() {
                for (var filters = []; !eof();) filters.push(parseFilter());
                return filters
            }

            function parseFilter() {
                var args, filter = {};
                return state = filterState, filter.name = parseExpression().trim(), state = filterArgState, args = parseFilterArguments(), args.length && (filter.args = args), filter
            }

            function parseFilterArguments() {
                for (var args = []; !eof() && state !== filterState;) {
                    var arg = parseExpression();
                    if (!arg) break;
                    args.push(processFilterArg(arg))
                }
                return args
            }

            function processFilterArg(arg) {
                if (reservedArgRE.test(arg)) return {
                    value: toNumber(arg),
                    dynamic: !1
                };
                var stripped = stripQuotes(arg),
                    dynamic = stripped === arg;
                return {
                    value: dynamic ? arg : stripped,
                    dynamic: dynamic
                }
            }

            function parseDirective(s) {
                var hit = cache$1.get(s);
                if (hit) return hit;
                str = s, dir = {}, len = str.length, index = -1, chr = "", state = startState;
                var filters;
                return str.indexOf("|") < 0 ? dir.expression = str.trim() : (dir.expression = parseExpression().trim(), filters = parseFilterList(), filters.length && (dir.filters = filters)), cache$1.put(s, dir), dir
            }

            function escapeRegex(str) {
                return str.replace(regexEscapeRE, "\\$&")
            }

            function compileRegex() {
                var open = escapeRegex(config.delimiters[0]),
                    close = escapeRegex(config.delimiters[1]),
                    unsafeOpen = escapeRegex(config.unsafeDelimiters[0]),
                    unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
                tagRE = new RegExp(unsafeOpen + "((?:.|\\n)+?)" + unsafeClose + "|" + open + "((?:.|\\n)+?)" + close, "g"), htmlRE = new RegExp("^" + unsafeOpen + "((?:.|\\n)+?)" + unsafeClose + "$"), cache = new Cache(1e3)
            }

            function parseText(text) {
                cache || compileRegex();
                var hit = cache.get(text);
                if (hit) return hit;
                if (!tagRE.test(text)) return null;
                for (var match, index, html, value, first, oneTime, tokens = [], lastIndex = tagRE.lastIndex = 0; match = tagRE.exec(text);) index = match.index, index > lastIndex && tokens.push({
                    value: text.slice(lastIndex, index)
                }), html = htmlRE.test(match[0]), value = html ? match[1] : match[2], first = value.charCodeAt(0), oneTime = 42 === first, value = oneTime ? value.slice(1) : value, tokens.push({
                    tag: !0,
                    value: value.trim(),
                    html: html,
                    oneTime: oneTime
                }), lastIndex = index + match[0].length;
                return lastIndex < text.length && tokens.push({
                    value: text.slice(lastIndex)
                }), cache.put(text, tokens), tokens
            }

            function tokensToExp(tokens, vm) {
                return tokens.length > 1 ? tokens.map(function(token) {
                    return formatToken(token, vm)
                }).join("+") : formatToken(tokens[0], vm, !0)
            }

            function formatToken(token, vm, single) {
                return token.tag ? token.oneTime && vm ? '"' + vm.$eval(token.value) + '"' : inlineFilters(token.value, single) : '"' + token.value + '"'
            }

            function inlineFilters(exp, single) {
                if (filterRE.test(exp)) {
                    var dir = parseDirective(exp);
                    return dir.filters ? "this._applyFilters(" + dir.expression + ",null," + JSON.stringify(dir.filters) + ",false)" : "(" + exp + ")"
                }
                return single ? exp : "(" + exp + ")"
            }

            function appendWithTransition(el, target, vm, cb) {
                applyTransition(el, 1, function() {
                    target.appendChild(el)
                }, vm, cb)
            }

            function beforeWithTransition(el, target, vm, cb) {
                applyTransition(el, 1, function() {
                    before(el, target)
                }, vm, cb)
            }

            function removeWithTransition(el, vm, cb) {
                applyTransition(el, -1, function() {
                    remove(el)
                }, vm, cb)
            }

            function applyTransition(el, direction, op, vm, cb) {
                var transition = el.__v_trans;
                if (!transition || !transition.hooks && !transitionEndEvent || !vm._isCompiled || vm.$parent && !vm.$parent._isCompiled) return op(), void(cb && cb());
                transition[direction > 0 ? "enter" : "leave"](op, cb)
            }

            function query(el) {
                if ("string" == typeof el) {
                    var selector = el;
                    el = document.querySelector(el), el || "production" !== process.env.NODE_ENV && warn("Cannot find element: " + selector)
                }
                return el
            }

            function inDoc(node) {
                if (!node) return !1;
                var doc = node.ownerDocument.documentElement,
                    parent = node.parentNode;
                return doc === node || doc === parent || !(!parent || 1 !== parent.nodeType || !doc.contains(parent))
            }

            function getAttr(node, _attr) {
                var val = node.getAttribute(_attr);
                return null !== val && node.removeAttribute(_attr), val
            }

            function getBindAttr(node, name) {
                var val = getAttr(node, ":" + name);
                return null === val && (val = getAttr(node, "v-bind:" + name)), val
            }

            function hasBindAttr(node, name) {
                return node.hasAttribute(name) || node.hasAttribute(":" + name) || node.hasAttribute("v-bind:" + name)
            }

            function before(el, target) {
                target.parentNode.insertBefore(el, target)
            }

            function after(el, target) {
                target.nextSibling ? before(el, target.nextSibling) : target.parentNode.appendChild(el)
            }

            function remove(el) {
                el.parentNode.removeChild(el)
            }

            function prepend(el, target) {
                target.firstChild ? before(el, target.firstChild) : target.appendChild(el)
            }

            function replace(target, el) {
                var parent = target.parentNode;
                parent && parent.replaceChild(el, target)
            }

            function on(el, event, cb, useCapture) {
                el.addEventListener(event, cb, useCapture)
            }

            function off(el, event, cb) {
                el.removeEventListener(event, cb)
            }

            function getClass(el) {
                var classname = el.className;
                return "object" == typeof classname && (classname = classname.baseVal || ""), classname
            }

            function setClass(el, cls) {
                isIE9 && !/svg$/.test(el.namespaceURI) ? el.className = cls : el.setAttribute("class", cls)
            }

            function addClass(el, cls) {
                if (el.classList) el.classList.add(cls);
                else {
                    var cur = " " + getClass(el) + " ";
                    cur.indexOf(" " + cls + " ") < 0 && setClass(el, (cur + cls).trim())
                }
            }

            function removeClass(el, cls) {
                if (el.classList) el.classList.remove(cls);
                else {
                    for (var cur = " " + getClass(el) + " ", tar = " " + cls + " "; cur.indexOf(tar) >= 0;) cur = cur.replace(tar, " ");
                    setClass(el, cur.trim())
                }
                el.className || el.removeAttribute("class")
            }

            function extractContent(el, asFragment) {
                var child, rawContent;
                if (isTemplate(el) && isFragment(el.content) && (el = el.content), el.hasChildNodes())
                    for (trimNode(el), rawContent = asFragment ? document.createDocumentFragment() : document.createElement("div"); child = el.firstChild;) rawContent.appendChild(child);
                return rawContent
            }

            function trimNode(node) {
                for (var child; child = node.firstChild, isTrimmable(child);) node.removeChild(child);
                for (; child = node.lastChild, isTrimmable(child);) node.removeChild(child)
            }

            function isTrimmable(node) {
                return node && (3 === node.nodeType && !node.data.trim() || 8 === node.nodeType)
            }

            function isTemplate(el) {
                return el.tagName && "template" === el.tagName.toLowerCase()
            }

            function createAnchor(content, persist) {
                var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? " " : "");
                return anchor.__v_anchor = !0, anchor
            }

            function findRef(node) {
                if (node.hasAttributes())
                    for (var attrs = node.attributes, i = 0, l = attrs.length; i < l; i++) {
                        var name = attrs[i].name;
                        if (refRE.test(name)) return camelize(name.replace(refRE, ""))
                    }
            }

            function mapNodeRange(node, end, op) {
                for (var next; node !== end;) next = node.nextSibling, op(node), node = next;
                op(end)
            }

            function removeNodeRange(start, end, vm, frag, cb) {
                function onRemoved() {
                    if (removed++, done && removed >= nodes.length) {
                        for (var i = 0; i < nodes.length; i++) frag.appendChild(nodes[i]);
                        cb && cb()
                    }
                }
                var done = !1,
                    removed = 0,
                    nodes = [];
                mapNodeRange(start, end, function(node) {
                    node === end && (done = !0), nodes.push(node), removeWithTransition(node, vm, onRemoved)
                })
            }

            function isFragment(node) {
                return node && 11 === node.nodeType
            }

            function getOuterHTML(el) {
                if (el.outerHTML) return el.outerHTML;
                var container = document.createElement("div");
                return container.appendChild(el.cloneNode(!0)), container.innerHTML
            }

            function checkComponentAttr(el, options) {
                var tag = el.tagName.toLowerCase(),
                    hasAttrs = el.hasAttributes();
                if (commonTagRE.test(tag) || reservedTagRE.test(tag)) {
                    if (hasAttrs) return getIsBinding(el, options)
                } else {
                    if (resolveAsset(options, "components", tag)) return {
                        id: tag
                    };
                    var is = hasAttrs && getIsBinding(el, options);
                    if (is) return is;
                    if ("production" !== process.env.NODE_ENV) {
                        var expectedTag = options._componentNameMap && options._componentNameMap[tag];
                        expectedTag ? warn("Unknown custom element: <" + tag + "> - did you mean <" + expectedTag + ">? HTML is case-insensitive, remember to use kebab-case in templates.") : isUnknownElement(el, tag) && warn("Unknown custom element: <" + tag + '> - did you register the component correctly? For recursive components, make sure to provide the "name" option.')
                    }
                }
            }

            function getIsBinding(el, options) {
                var exp = el.getAttribute("is");
                if (null != exp) {
                    if (resolveAsset(options, "components", exp)) return el.removeAttribute("is"), {
                        id: exp
                    }
                } else if (null != (exp = getBindAttr(el, "is"))) return {
                    id: exp,
                    dynamic: !0
                }
            }

            function mergeData(to, from) {
                var key, toVal, fromVal;
                for (key in from) toVal = to[key], fromVal = from[key], hasOwn(to, key) ? isObject(toVal) && isObject(fromVal) && mergeData(toVal, fromVal) : set(to, key, fromVal);
                return to
            }

            function mergeAssets(parentVal, childVal) {
                var res = Object.create(parentVal || null);
                return childVal ? extend(res, guardArrayAssets(childVal)) : res
            }

            function guardComponents(options) {
                if (options.components) {
                    var def, components = options.components = guardArrayAssets(options.components),
                        ids = Object.keys(components);
                    if ("production" !== process.env.NODE_ENV) var map = options._componentNameMap = {};
                    for (var i = 0, l = ids.length; i < l; i++) {
                        var key = ids[i];
                        commonTagRE.test(key) || reservedTagRE.test(key) ? "production" !== process.env.NODE_ENV && warn("Do not use built-in or reserved HTML elements as component id: " + key) : ("production" !== process.env.NODE_ENV && (map[key.replace(/-/g, "").toLowerCase()] = hyphenate(key)), def = components[key], isPlainObject(def) && (components[key] = Vue.extend(def)))
                    }
                }
            }

            function guardProps(options) {
                var i, val, props = options.props;
                if (isArray(props))
                    for (options.props = {}, i = props.length; i--;) val = props[i], "string" == typeof val ? options.props[val] = null : val.name && (options.props[val.name] = val);
                else if (isPlainObject(props)) {
                    var keys = Object.keys(props);
                    for (i = keys.length; i--;) "function" == typeof(val = props[keys[i]]) && (props[keys[i]] = {
                        type: val
                    })
                }
            }

            function guardArrayAssets(assets) {
                if (isArray(assets)) {
                    for (var asset, res = {}, i = assets.length; i--;) {
                        asset = assets[i];
                        var id = "function" == typeof asset ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
                        id ? res[id] = asset : "production" !== process.env.NODE_ENV && warn('Array-syntax assets must provide a "name" or "id" field.')
                    }
                    return res
                }
                return assets
            }

            function mergeOptions(parent, child, vm) {
                function mergeField(key) {
                    var strat = strats[key] || defaultStrat;
                    options[key] = strat(parent[key], child[key], vm, key)
                }
                guardComponents(child), guardProps(child), "production" !== process.env.NODE_ENV && child.propsData && !vm && warn("propsData can only be used as an instantiation option.");
                var key, options = {};
                if (child.extends && (parent = "function" == typeof child.extends ? mergeOptions(parent, child.extends.options, vm) : mergeOptions(parent, child.extends, vm)), child.mixins)
                    for (var i = 0, l = child.mixins.length; i < l; i++) {
                        var mixin = child.mixins[i],
                            mixinOptions = mixin.prototype instanceof Vue ? mixin.options : mixin;
                        parent = mergeOptions(parent, mixinOptions, vm)
                    }
                for (key in parent) mergeField(key);
                for (key in child) hasOwn(parent, key) || mergeField(key);
                return options
            }

            function resolveAsset(options, type, id, warnMissing) {
                if ("string" == typeof id) {
                    var camelizedId, assets = options[type],
                        res = assets[id] || assets[camelizedId = camelize(id)] || assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
                    return "production" !== process.env.NODE_ENV && warnMissing && !res && warn("Failed to resolve " + type.slice(0, -1) + ": " + id, options), res
                }
            }

            function Dep() {
                this.id = uid$1++, this.subs = []
            }

            function withoutConversion(fn) {
                shouldConvert = !1, fn(), shouldConvert = !0
            }

            function Observer(value) {
                if (this.value = value, this.dep = new Dep, def(value, "__ob__", this), isArray(value)) {
                    (hasProto ? protoAugment : copyAugment)(value, arrayMethods, arrayKeys), this.observeArray(value)
                } else this.walk(value)
            }

            function protoAugment(target, src) {
                target.__proto__ = src
            }

            function copyAugment(target, src, keys) {
                for (var i = 0, l = keys.length; i < l; i++) {
                    var key = keys[i];
                    def(target, key, src[key])
                }
            }

            function observe(value, vm) {
                if (value && "object" == typeof value) {
                    var ob;
                    return hasOwn(value, "__ob__") && value.__ob__ instanceof Observer ? ob = value.__ob__ : shouldConvert && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue && (ob = new Observer(value)), ob && vm && ob.addVm(vm), ob
                }
            }

            function defineReactive(obj, key, val) {
                var dep = new Dep,
                    property = Object.getOwnPropertyDescriptor(obj, key);
                if (!property || !1 !== property.configurable) {
                    var getter = property && property.get,
                        setter = property && property.set,
                        childOb = observe(val);
                    Object.defineProperty(obj, key, {
                        enumerable: !0,
                        configurable: !0,
                        get: function() {
                            var value = getter ? getter.call(obj) : val;
                            if (Dep.target && (dep.depend(), childOb && childOb.dep.depend(), isArray(value)))
                                for (var e, i = 0, l = value.length; i < l; i++)(e = value[i]) && e.__ob__ && e.__ob__.dep.depend();
                            return value
                        },
                        set: function(newVal) {
                            newVal !== (getter ? getter.call(obj) : val) && (setter ? setter.call(obj, newVal) : val = newVal, childOb = observe(newVal), dep.notify())
                        }
                    })
                }
            }

            function getPathCharType(ch) {
                if (void 0 === ch) return "eof";
                var code = ch.charCodeAt(0);
                switch (code) {
                    case 91:
                    case 93:
                    case 46:
                    case 34:
                    case 39:
                    case 48:
                        return ch;
                    case 95:
                    case 36:
                        return "ident";
                    case 32:
                    case 9:
                    case 10:
                    case 13:
                    case 160:
                    case 65279:
                    case 8232:
                    case 8233:
                        return "ws"
                }
                return code >= 97 && code <= 122 || code >= 65 && code <= 90 ? "ident" : code >= 49 && code <= 57 ? "number" : "else"
            }

            function formatSubPath(path) {
                var trimmed = path.trim();
                return ("0" !== path.charAt(0) || !isNaN(path)) && (isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed)
            }

            function parse(path) {
                var c, newChar, key, type, transition, action, typeMap, keys = [],
                    index = -1,
                    mode = BEFORE_PATH,
                    subPathDepth = 0,
                    actions = [];
                for (actions[PUSH] = function() {
                        void 0 !== key && (keys.push(key), key = void 0)
                    }, actions[APPEND] = function() {
                        void 0 === key ? key = newChar : key += newChar
                    }, actions[INC_SUB_PATH_DEPTH] = function() {
                        actions[APPEND](), subPathDepth++
                    }, actions[PUSH_SUB_PATH] = function() {
                        if (subPathDepth > 0) subPathDepth--, mode = IN_SUB_PATH, actions[APPEND]();
                        else {
                            if (subPathDepth = 0, !1 === (key = formatSubPath(key))) return !1;
                            actions[PUSH]()
                        }
                    }; null != mode;)
                    if (index++, "\\" !== (c = path[index]) || ! function() {
                            var nextChar = path[index + 1];
                            if (mode === IN_SINGLE_QUOTE && "'" === nextChar || mode === IN_DOUBLE_QUOTE && '"' === nextChar) return index++, newChar = "\\" + nextChar, actions[APPEND](), !0
                        }()) {
                        if (type = getPathCharType(c), typeMap = pathStateMachine[mode], (transition = typeMap[type] || typeMap.else || ERROR) === ERROR) return;
                        if (mode = transition[0], (action = actions[transition[1]]) && (newChar = transition[2], newChar = void 0 === newChar ? c : newChar, !1 === action())) return;
                        if (mode === AFTER_PATH) return keys.raw = path, keys
                    }
            }

            function parsePath(path) {
                var hit = pathCache.get(path);
                return hit || (hit = parse(path)) && pathCache.put(path, hit), hit
            }

            function getPath(obj, path) {
                return parseExpression$1(path).get(obj)
            }

            function setPath(obj, path, val) {
                var original = obj;
                if ("string" == typeof path && (path = parse(path)), !path || !isObject(obj)) return !1;
                for (var last, key, i = 0, l = path.length; i < l; i++) last = obj, key = path[i], "*" === key.charAt(0) && (key = parseExpression$1(key.slice(1)).get.call(original, original)), i < l - 1 ? (obj = obj[key], isObject(obj) || (obj = {}, "production" !== process.env.NODE_ENV && last._isVue && warnNonExistent(path, last), set(last, key, obj))) : isArray(obj) ? obj.$set(key, val) : key in obj ? obj[key] = val : ("production" !== process.env.NODE_ENV && obj._isVue && warnNonExistent(path, obj), set(obj, key, val));
                return !0
            }

            function noop() {}

            function save(str, isString) {
                var i = saved.length;
                return saved[i] = isString ? str.replace(newlineRE, "\\n") : str, '"' + i + '"'
            }

            function rewrite(raw) {
                var c = raw.charAt(0),
                    path = raw.slice(1);
                return allowedKeywordsRE.test(path) ? raw : (path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path, c + "scope." + path)
            }

            function restore(str, i) {
                return saved[i]
            }

            function compileGetter(exp) {
                improperKeywordsRE.test(exp) && "production" !== process.env.NODE_ENV && warn("Avoid using reserved keywords in expression: " + exp), saved.length = 0;
                var body = exp.replace(saveRE, save).replace(wsRE, "");
                return body = (" " + body).replace(identRE, rewrite).replace(restoreRE, restore), makeGetterFn(body)
            }

            function makeGetterFn(body) {
                try {
                    return new Function("scope", "return " + body + ";")
                } catch (e) {
                    return "production" !== process.env.NODE_ENV && warn(e.toString().match(/unsafe-eval|CSP/) ? "It seems you are using the default build of Vue.js in an environment with Content Security Policy that prohibits unsafe-eval. Use the CSP-compliant build instead: http://vuejs.org/guide/installation.html#CSP-compliant-build" : "Invalid expression. Generated function body: " + body), noop
                }
            }

            function compileSetter(exp) {
                var path = parsePath(exp);
                if (path) return function(scope, val) {
                    setPath(scope, path, val)
                };
                "production" !== process.env.NODE_ENV && warn("Invalid setter expression: " + exp)
            }

            function parseExpression$1(exp, needSet) {
                exp = exp.trim();
                var hit = expressionCache.get(exp);
                if (hit) return needSet && !hit.set && (hit.set = compileSetter(hit.exp)), hit;
                var res = {
                    exp: exp
                };
                return res.get = isSimplePath(exp) && exp.indexOf("[") < 0 ? makeGetterFn("scope." + exp) : compileGetter(exp), needSet && (res.set = compileSetter(exp)), expressionCache.put(exp, res), res
            }

            function isSimplePath(exp) {
                return pathTestRE.test(exp) && !literalValueRE$1.test(exp) && "Math." !== exp.slice(0, 5)
            }

            function resetBatcherState() {
                queue.length = 0, userQueue.length = 0, has = {}, circular = {}, waiting = !1
            }

            function flushBatcherQueue() {
                for (var _again = !0; _again;) _again = !1, runBatcherQueue(queue), runBatcherQueue(userQueue), queue.length ? _again = !0 : (devtools && config.devtools && devtools.emit("flush"), resetBatcherState())
            }

            function runBatcherQueue(queue) {
                for (var i = 0; i < queue.length; i++) {
                    var watcher = queue[i],
                        id = watcher.id;
                    if (has[id] = null, watcher.run(), "production" !== process.env.NODE_ENV && null != has[id] && (circular[id] = (circular[id] || 0) + 1, circular[id] > config._maxUpdateCount)) {
                        warn('You may have an infinite update loop for watcher with expression "' + watcher.expression + '"', watcher.vm);
                        break
                    }
                }
                queue.length = 0
            }

            function pushWatcher(watcher) {
                var id = watcher.id;
                if (null == has[id]) {
                    var q = watcher.user ? userQueue : queue;
                    has[id] = q.length, q.push(watcher), waiting || (waiting = !0, nextTick(flushBatcherQueue))
                }
            }

            function Watcher(vm, expOrFn, cb, options) {
                options && extend(this, options);
                var isFn = "function" == typeof expOrFn;
                if (this.vm = vm, vm._watchers.push(this), this.expression = expOrFn, this.cb = cb, this.id = ++uid$2, this.active = !0, this.dirty = this.lazy, this.deps = [], this.newDeps = [], this.depIds = new _Set, this.newDepIds = new _Set, this.prevError = null, isFn) this.getter = expOrFn, this.setter = void 0;
                else {
                    var res = parseExpression$1(expOrFn, this.twoWay);
                    this.getter = res.get, this.setter = res.set
                }
                this.value = this.lazy ? void 0 : this.get(), this.queued = this.shallow = !1
            }

            function traverse(val, seen) {
                var i = void 0,
                    keys = void 0;
                seen || (seen = seenObjects, seen.clear());
                var isA = isArray(val),
                    isO = isObject(val);
                if ((isA || isO) && Object.isExtensible(val)) {
                    if (val.__ob__) {
                        var depId = val.__ob__.dep.id;
                        if (seen.has(depId)) return;
                        seen.add(depId)
                    }
                    if (isA)
                        for (i = val.length; i--;) traverse(val[i], seen);
                    else if (isO)
                        for (keys = Object.keys(val), i = keys.length; i--;) traverse(val[keys[i]], seen)
                }
            }

            function isRealTemplate(node) {
                return isTemplate(node) && isFragment(node.content)
            }

            function stringToFragment(templateString, raw) {
                var cacheKey = raw ? templateString : templateString.trim(),
                    hit = templateCache.get(cacheKey);
                if (hit) return hit;
                var frag = document.createDocumentFragment(),
                    tagMatch = templateString.match(tagRE$1),
                    entityMatch = entityRE.test(templateString),
                    commentMatch = commentRE.test(templateString);
                if (tagMatch || entityMatch || commentMatch) {
                    var tag = tagMatch && tagMatch[1],
                        wrap = map[tag] || map.efault,
                        depth = wrap[0],
                        prefix = wrap[1],
                        suffix = wrap[2],
                        node = document.createElement("div");
                    for (node.innerHTML = prefix + templateString + suffix; depth--;) node = node.lastChild;
                    for (var child; child = node.firstChild;) frag.appendChild(child)
                } else frag.appendChild(document.createTextNode(templateString));
                return raw || trimNode(frag), templateCache.put(cacheKey, frag), frag
            }

            function nodeToFragment(node) {
                if (isRealTemplate(node)) return stringToFragment(node.innerHTML);
                if ("SCRIPT" === node.tagName) return stringToFragment(node.textContent);
                for (var child, clonedNode = cloneNode(node), frag = document.createDocumentFragment(); child = clonedNode.firstChild;) frag.appendChild(child);
                return trimNode(frag), frag
            }

            function cloneNode(node) {
                if (!node.querySelectorAll) return node.cloneNode();
                var i, original, cloned, res = node.cloneNode(!0);
                if (hasBrokenTemplate) {
                    var tempClone = res;
                    if (isRealTemplate(node) && (node = node.content, tempClone = res.content), original = node.querySelectorAll("template"), original.length)
                        for (cloned = tempClone.querySelectorAll("template"), i = cloned.length; i--;) cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i])
                }
                if (hasTextareaCloneBug)
                    if ("TEXTAREA" === node.tagName) res.value = node.value;
                    else if (original = node.querySelectorAll("textarea"), original.length)
                    for (cloned = res.querySelectorAll("textarea"), i = cloned.length; i--;) cloned[i].value = original[i].value;
                return res
            }

            function parseTemplate(template, shouldClone, raw) {
                var node, frag;
                return isFragment(template) ? (trimNode(template), shouldClone ? cloneNode(template) : template) : ("string" == typeof template ? raw || "#" !== template.charAt(0) ? frag = stringToFragment(template, raw) : (frag = idSelectorCache.get(template)) || (node = document.getElementById(template.slice(1))) && (frag = nodeToFragment(node), idSelectorCache.put(template, frag)) : template.nodeType && (frag = nodeToFragment(template)), frag && shouldClone ? cloneNode(frag) : frag)
            }

            function Fragment(linker, vm, frag, host, scope, parentFrag) {
                this.children = [], this.childFrags = [], this.vm = vm, this.scope = scope, this.inserted = !1, this.parentFrag = parentFrag, parentFrag && parentFrag.childFrags.push(this), this.unlink = linker(vm, frag, host, scope, this), (this.single = 1 === frag.childNodes.length && !frag.childNodes[0].__v_anchor) ? (this.node = frag.childNodes[0], this.before = singleBefore, this.remove = singleRemove) : (this.node = createAnchor("fragment-start"), this.end = createAnchor("fragment-end"), this.frag = frag, prepend(this.node, frag), frag.appendChild(this.end), this.before = multiBefore, this.remove = multiRemove), this.node.__v_frag = this
            }

            function singleBefore(target, withTransition) {
                this.inserted = !0, (!1 !== withTransition ? beforeWithTransition : before)(this.node, target, this.vm), inDoc(this.node) && this.callHook(attach)
            }

            function singleRemove() {
                this.inserted = !1;
                var shouldCallRemove = inDoc(this.node),
                    self = this;
                this.beforeRemove(), removeWithTransition(this.node, this.vm, function() {
                    shouldCallRemove && self.callHook(detach), self.destroy()
                })
            }

            function multiBefore(target, withTransition) {
                this.inserted = !0;
                var vm = this.vm,
                    method = !1 !== withTransition ? beforeWithTransition : before;
                mapNodeRange(this.node, this.end, function(node) {
                    method(node, target, vm)
                }), inDoc(this.node) && this.callHook(attach)
            }

            function multiRemove() {
                this.inserted = !1;
                var self = this,
                    shouldCallRemove = inDoc(this.node);
                this.beforeRemove(), removeNodeRange(this.node, this.end, this.vm, this.frag, function() {
                    shouldCallRemove && self.callHook(detach), self.destroy()
                })
            }

            function attach(child) {
                !child._isAttached && inDoc(child.$el) && child._callHook("attached")
            }

            function detach(child) {
                child._isAttached && !inDoc(child.$el) && child._callHook("detached")
            }

            function FragmentFactory(vm, el) {
                this.vm = vm;
                var template, isString = "string" == typeof el;
                isString || isTemplate(el) && !el.hasAttribute("v-if") ? template = parseTemplate(el, !0) : (template = document.createDocumentFragment(), template.appendChild(el)), this.template = template;
                var linker, cid = vm.constructor.cid;
                if (cid > 0) {
                    var cacheId = cid + (isString ? el : getOuterHTML(el));
                    linker = linkerCache.get(cacheId), linker || (linker = compile(template, vm.$options, !0), linkerCache.put(cacheId, linker))
                } else linker = compile(template, vm.$options, !0);
                this.linker = linker
            }

            function findPrevFrag(frag, anchor, id) {
                var el = frag.node.previousSibling;
                if (el) {
                    for (frag = el.__v_frag; !(frag && frag.forId === id && frag.inserted || el === anchor);) {
                        if (!(el = el.previousSibling)) return;
                        frag = el.__v_frag
                    }
                    return frag
                }
            }

            function range(n) {
                for (var i = -1, ret = new Array(Math.floor(n)); ++i < n;) ret[i] = i;
                return ret
            }

            function getTrackByKey(index, key, value, trackByKey) {
                return trackByKey ? "$index" === trackByKey ? index : trackByKey.charAt(0).match(/\w/) ? getPath(value, trackByKey) : value[trackByKey] : key || value
            }

            function findVmFromFrag(frag) {
                var node = frag.node;
                if (frag.end)
                    for (; !node.__vue__ && node !== frag.end && node.nextSibling;) node = node.nextSibling;
                return node.__vue__
            }

            function getValue(el, multi, init) {
                for (var op, val, res = multi ? [] : null, i = 0, l = el.options.length; i < l; i++)
                    if (op = el.options[i], init ? op.hasAttribute("selected") : op.selected) {
                        if (val = op.hasOwnProperty("_value") ? op._value : op.value, !multi) return val;
                        res.push(val)
                    }
                return res
            }

            function indexOf$1(arr, val) {
                for (var i = arr.length; i--;)
                    if (looseEqual(arr[i], val)) return i;
                return -1
            }

            function keyFilter(handler, keys) {
                var codes = keys.map(function(key) {
                    var charCode = key.charCodeAt(0);
                    return charCode > 47 && charCode < 58 ? parseInt(key, 10) : 1 === key.length && (charCode = key.toUpperCase().charCodeAt(0)) > 64 && charCode < 91 ? charCode : keyCodes[key]
                });
                return codes = [].concat.apply([], codes),
                    function(e) {
                        if (codes.indexOf(e.keyCode) > -1) return handler.call(this, e)
                    }
            }

            function stopFilter(handler) {
                return function(e) {
                    return e.stopPropagation(), handler.call(this, e)
                }
            }

            function preventFilter(handler) {
                return function(e) {
                    return e.preventDefault(), handler.call(this, e)
                }
            }

            function selfFilter(handler) {
                return function(e) {
                    if (e.target === e.currentTarget) return handler.call(this, e)
                }
            }

            function normalize(prop) {
                if (propCache[prop]) return propCache[prop];
                var res = prefix(prop);
                return propCache[prop] = propCache[res] = res, res
            }

            function prefix(prop) {
                prop = hyphenate(prop);
                var camel = camelize(prop),
                    upper = camel.charAt(0).toUpperCase() + camel.slice(1);
                testEl || (testEl = document.createElement("div"));
                var prefixed, i = prefixes.length;
                if ("filter" !== camel && camel in testEl.style) return {
                    kebab: prop,
                    camel: camel
                };
                for (; i--;)
                    if ((prefixed = camelPrefixes[i] + upper) in testEl.style) return {
                        kebab: prefixes[i] + prop,
                        camel: prefixed
                    }
            }

            function normalize$1(value) {
                var res = [];
                if (isArray(value))
                    for (var i = 0, l = value.length; i < l; i++) {
                        var _key = value[i];
                        if (_key)
                            if ("string" == typeof _key) res.push(_key);
                            else
                                for (var k in _key) _key[k] && res.push(k)
                    } else if (isObject(value))
                        for (var key in value) value[key] && res.push(key);
                return res
            }

            function apply(el, key, fn) {
                if (key = key.trim(), -1 === key.indexOf(" ")) return void fn(el, key);
                for (var keys = key.split(/\s+/), i = 0, l = keys.length; i < l; i++) fn(el, keys[i])
            }

            function callActivateHooks(hooks, vm, cb) {
                function next() {
                    ++called >= total ? cb() : hooks[called].call(vm, next)
                }
                var total = hooks.length,
                    called = 0;
                hooks[0].call(vm, next)
            }

            function compileProps(el, propOptions, vm) {
                for (var options, name, attr, value, path, parsed, prop, props = [], propsData = vm.$options.propsData, names = Object.keys(propOptions), i = names.length; i--;)
                    if (name = names[i], options = propOptions[name] || empty, "production" === process.env.NODE_ENV || "$data" !== name)
                        if (path = camelize(name), identRE$1.test(path)) {
                            if (prop = {
                                    name: name,
                                    path: path,
                                    options: options,
                                    mode: propBindingModes.ONE_WAY,
                                    raw: null
                                }, attr = hyphenate(name), null === (value = getBindAttr(el, attr)) && (null !== (value = getBindAttr(el, attr + ".sync")) ? prop.mode = propBindingModes.TWO_WAY : null !== (value = getBindAttr(el, attr + ".once")) && (prop.mode = propBindingModes.ONE_TIME)), null !== value) prop.raw = value, parsed = parseDirective(value), value = parsed.expression, prop.filters = parsed.filters, isLiteral(value) && !parsed.filters ? prop.optimizedLiteral = !0 : (prop.dynamic = !0, "production" === process.env.NODE_ENV || prop.mode !== propBindingModes.TWO_WAY || settablePathRE.test(value) || (prop.mode = propBindingModes.ONE_WAY, warn("Cannot bind two-way prop with non-settable parent path: " + value, vm))), prop.parentPath = value, "production" !== process.env.NODE_ENV && options.twoWay && prop.mode !== propBindingModes.TWO_WAY && warn('Prop "' + name + '" expects a two-way binding type.', vm);
                            else if (null !== (value = getAttr(el, attr))) prop.raw = value;
                            else if (propsData && null !== (value = propsData[name] || propsData[path])) prop.raw = value;
                            else if ("production" !== process.env.NODE_ENV) {
                                var lowerCaseName = path.toLowerCase();
                                value = /[A-Z\-]/.test(name) && (el.getAttribute(lowerCaseName) || el.getAttribute(":" + lowerCaseName) || el.getAttribute("v-bind:" + lowerCaseName) || el.getAttribute(":" + lowerCaseName + ".once") || el.getAttribute("v-bind:" + lowerCaseName + ".once") || el.getAttribute(":" + lowerCaseName + ".sync") || el.getAttribute("v-bind:" + lowerCaseName + ".sync")), value ? warn("Possible usage error for prop `" + lowerCaseName + "` - did you mean `" + attr + "`? HTML is case-insensitive, remember to use kebab-case for props in templates.", vm) : !options.required || propsData && (name in propsData || path in propsData) || warn("Missing required prop: " + name, vm)
                            }
                            props.push(prop)
                        } else "production" !== process.env.NODE_ENV && warn('Invalid prop key: "' + name + '". Prop keys must be valid identifiers.', vm);
                else warn("Do not use $data as prop.", vm);
                return makePropsLinkFn(props)
            }

            function makePropsLinkFn(props) {
                return function(vm, scope) {
                    vm._props = {};
                    for (var prop, path, options, value, raw, inlineProps = vm.$options.propsData, i = props.length; i--;)
                        if (prop = props[i], raw = prop.raw, path = prop.path, options = prop.options, vm._props[path] = prop, inlineProps && hasOwn(inlineProps, path) && initProp(vm, prop, inlineProps[path]), null === raw) initProp(vm, prop, void 0);
                        else if (prop.dynamic) prop.mode === propBindingModes.ONE_TIME ? (value = (scope || vm._context || vm).$get(prop.parentPath), initProp(vm, prop, value)) : vm._context ? vm._bindDir({
                        name: "prop",
                        def: propDef,
                        prop: prop
                    }, null, null, scope) : initProp(vm, prop, vm.$get(prop.parentPath));
                    else if (prop.optimizedLiteral) {
                        var stripped = stripQuotes(raw);
                        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped, initProp(vm, prop, value)
                    } else value = options.type === Boolean && ("" === raw || raw === hyphenate(prop.name)) || raw, initProp(vm, prop, value)
                }
            }

            function processPropValue(vm, prop, rawValue, fn) {
                var isSimple = prop.dynamic && isSimplePath(prop.parentPath),
                    value = rawValue;
                void 0 === value && (value = getPropDefaultValue(vm, prop)), value = coerceProp(prop, value, vm);
                var coerced = value !== rawValue;
                assertProp(prop, value, vm) || (value = void 0), isSimple && !coerced ? withoutConversion(function() {
                    fn(value)
                }) : fn(value)
            }

            function initProp(vm, prop, value) {
                processPropValue(vm, prop, value, function(value) {
                    defineReactive(vm, prop.path, value)
                })
            }

            function updateProp(vm, prop, value) {
                processPropValue(vm, prop, value, function(value) {
                    vm[prop.path] = value
                })
            }

            function getPropDefaultValue(vm, prop) {
                var options = prop.options;
                if (!hasOwn(options, "default")) return options.type !== Boolean && void 0;
                var def = options.default;
                return isObject(def) && "production" !== process.env.NODE_ENV && warn('Invalid default value for prop "' + prop.name + '": Props with type Object/Array must use a factory function to return the default value.', vm), "function" == typeof def && options.type !== Function ? def.call(vm) : def
            }

            function assertProp(prop, value, vm) {
                if (!prop.options.required && (null === prop.raw || null == value)) return !0;
                var options = prop.options,
                    type = options.type,
                    valid = !type,
                    expectedTypes = [];
                if (type) {
                    isArray(type) || (type = [type]);
                    for (var i = 0; i < type.length && !valid; i++) {
                        var assertedType = assertType(value, type[i]);
                        expectedTypes.push(assertedType.expectedType), valid = assertedType.valid
                    }
                }
                if (!valid) return "production" !== process.env.NODE_ENV && warn('Invalid prop: type check failed for prop "' + prop.name + '". Expected ' + expectedTypes.map(formatType).join(", ") + ", got " + formatValue(value) + ".", vm), !1;
                var validator = options.validator;
                return !(validator && !validator(value)) || ("production" !== process.env.NODE_ENV && warn('Invalid prop: custom validator check failed for prop "' + prop.name + '".', vm), !1)
            }

            function coerceProp(prop, value, vm) {
                var coerce = prop.options.coerce;
                return coerce ? "function" == typeof coerce ? coerce(value) : ("production" !== process.env.NODE_ENV && warn('Invalid coerce for prop "' + prop.name + '": expected function, got ' + typeof coerce + ".", vm), value) : value
            }

            function assertType(value, type) {
                var valid, expectedType;
                return type === String ? (expectedType = "string", valid = typeof value === expectedType) : type === Number ? (expectedType = "number", valid = typeof value === expectedType) : type === Boolean ? (expectedType = "boolean", valid = typeof value === expectedType) : type === Function ? (expectedType = "function", valid = typeof value === expectedType) : type === Object ? (expectedType = "object", valid = isPlainObject(value)) : type === Array ? (expectedType = "array", valid = isArray(value)) : valid = value instanceof type, {
                    valid: valid,
                    expectedType: expectedType
                }
            }

            function formatType(type) {
                return type ? type.charAt(0).toUpperCase() + type.slice(1) : "custom type"
            }

            function formatValue(val) {
                return Object.prototype.toString.call(val).slice(8, -1)
            }

            function pushJob(job) {
                queue$1.push(job), queued || (queued = !0, nextTick(flush))
            }

            function flush() {
                for (var f = document.documentElement.offsetHeight, i = 0; i < queue$1.length; i++) queue$1[i]();
                return queue$1 = [], queued = !1, f
            }

            function Transition(el, id, hooks, vm) {
                this.id = id, this.el = el, this.enterClass = hooks && hooks.enterClass || id + "-enter", this.leaveClass = hooks && hooks.leaveClass || id + "-leave", this.hooks = hooks, this.vm = vm, this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null, this.justEntered = !1, this.entered = this.left = !1, this.typeCache = {}, this.type = hooks && hooks.type, "production" !== process.env.NODE_ENV && this.type && this.type !== TYPE_TRANSITION && this.type !== TYPE_ANIMATION && warn('invalid CSS transition type for transition="' + this.id + '": ' + this.type, vm);
                var self = this;
                ["enterNextTick", "enterDone", "leaveNextTick", "leaveDone"].forEach(function(m) {
                    self[m] = bind(self[m], self)
                })
            }

            function isHidden(el) {
                if (/svg$/.test(el.namespaceURI)) {
                    var rect = el.getBoundingClientRect();
                    return !(rect.width || rect.height)
                }
                return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
            }

            function compile(el, options, partial) {
                var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null,
                    childLinkFn = nodeLinkFn && nodeLinkFn.terminal || isScript(el) || !el.hasChildNodes() ? null : compileNodeList(el.childNodes, options);
                return function(vm, el, host, scope, frag) {
                    var childNodes = toArray(el.childNodes),
                        dirs = linkAndCapture(function() {
                            nodeLinkFn && nodeLinkFn(vm, el, host, scope, frag), childLinkFn && childLinkFn(vm, childNodes, host, scope, frag)
                        }, vm);
                    return makeUnlinkFn(vm, dirs)
                }
            }

            function linkAndCapture(linker, vm) {
                "production" === process.env.NODE_ENV && (vm._directives = []);
                var originalDirCount = vm._directives.length;
                linker();
                var dirs = vm._directives.slice(originalDirCount);
                sortDirectives(dirs);
                for (var i = 0, l = dirs.length; i < l; i++) dirs[i]._bind();
                return dirs
            }

            function sortDirectives(dirs) {
                if (0 !== dirs.length) {
                    var i, j, k, l, groupedMap = {},
                        index = 0,
                        priorities = [];
                    for (i = 0, j = dirs.length; i < j; i++) {
                        var dir = dirs[i],
                            priority = dir.descriptor.def.priority || DEFAULT_PRIORITY,
                            array = groupedMap[priority];
                        array || (array = groupedMap[priority] = [], priorities.push(priority)), array.push(dir)
                    }
                    for (priorities.sort(function(a, b) {
                            return a > b ? -1 : a === b ? 0 : 1
                        }), i = 0, j = priorities.length; i < j; i++) {
                        var group = groupedMap[priorities[i]];
                        for (k = 0, l = group.length; k < l; k++) dirs[index++] = group[k]
                    }
                }
            }

            function makeUnlinkFn(vm, dirs, context, contextDirs) {
                function unlink(destroying) {
                    teardownDirs(vm, dirs, destroying), context && contextDirs && teardownDirs(context, contextDirs)
                }
                return unlink.dirs = dirs, unlink
            }

            function teardownDirs(vm, dirs, destroying) {
                for (var i = dirs.length; i--;) dirs[i]._teardown(), "production" === process.env.NODE_ENV || destroying || vm._directives.$remove(dirs[i])
            }

            function compileAndLinkProps(vm, el, props, scope) {
                var propsLinkFn = compileProps(el, props, vm),
                    propDirs = linkAndCapture(function() {
                        propsLinkFn(vm, scope)
                    }, vm);
                return makeUnlinkFn(vm, propDirs)
            }

            function compileRoot(el, options, contextOptions) {
                var contextLinkFn, replacerLinkFn, containerAttrs = options._containerAttrs,
                    replacerAttrs = options._replacerAttrs;
                if (11 !== el.nodeType) options._asComponent ? (containerAttrs && contextOptions && (contextLinkFn = compileDirectives(containerAttrs, contextOptions)), replacerAttrs && (replacerLinkFn = compileDirectives(replacerAttrs, options))) : replacerLinkFn = compileDirectives(el.attributes, options);
                else if ("production" !== process.env.NODE_ENV && containerAttrs) {
                    var names = containerAttrs.filter(function(attr) {
                        return attr.name.indexOf("_v-") < 0 && !onRE.test(attr.name) && "slot" !== attr.name
                    }).map(function(attr) {
                        return '"' + attr.name + '"'
                    });
                    if (names.length) {
                        var plural = names.length > 1,
                            componentName = options.el.tagName.toLowerCase();
                        "component" === componentName && options.name && (componentName += ":" + options.name), warn("Attribute" + (plural ? "s " : " ") + names.join(", ") + (plural ? " are" : " is") + " ignored on component <" + componentName + "> because the component is a fragment instance: http://vuejs.org/guide/components.html#Fragment-Instance")
                    }
                }
                return options._containerAttrs = options._replacerAttrs = null,
                    function(vm, el, scope) {
                        var contextDirs, context = vm._context;
                        context && contextLinkFn && (contextDirs = linkAndCapture(function() {
                            contextLinkFn(context, el, null, scope)
                        }, context));
                        var selfDirs = linkAndCapture(function() {
                            replacerLinkFn && replacerLinkFn(vm, el)
                        }, vm);
                        return makeUnlinkFn(vm, selfDirs, context, contextDirs)
                    }
            }

            function compileNode(node, options) {
                var type = node.nodeType;
                return 1 !== type || isScript(node) ? 3 === type && node.data.trim() ? compileTextNode(node, options) : null : compileElement(node, options)
            }

            function compileElement(el, options) {
                if ("TEXTAREA" === el.tagName) {
                    if (null !== getAttr(el, "v-pre")) return skip;
                    var tokens = parseText(el.value);
                    tokens && (el.setAttribute(":value", tokensToExp(tokens)), el.value = "")
                }
                var linkFn, hasAttrs = el.hasAttributes(),
                    attrs = hasAttrs && toArray(el.attributes);
                return hasAttrs && (linkFn = checkTerminalDirectives(el, attrs, options)), linkFn || (linkFn = checkElementDirectives(el, options)), linkFn || (linkFn = checkComponent(el, options)), !linkFn && hasAttrs && (linkFn = compileDirectives(attrs, options)), linkFn
            }

            function compileTextNode(node, options) {
                if (node._skip) return removeText;
                var tokens = parseText(node.wholeText);
                if (!tokens) return null;
                for (var next = node.nextSibling; next && 3 === next.nodeType;) next._skip = !0, next = next.nextSibling;
                for (var el, token, frag = document.createDocumentFragment(), i = 0, l = tokens.length; i < l; i++) token = tokens[i], el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value), frag.appendChild(el);
                return makeTextNodeLinkFn(tokens, frag)
            }

            function removeText(vm, node) {
                remove(node)
            }

            function processTextToken(token, options) {
                function setTokenType(type) {
                    if (!token.descriptor) {
                        var parsed = parseDirective(token.value);
                        token.descriptor = {
                            name: type,
                            def: directives[type],
                            expression: parsed.expression,
                            filters: parsed.filters
                        }
                    }
                }
                var el;
                return token.oneTime ? el = document.createTextNode(token.value) : token.html ? (el = document.createComment("v-html"), setTokenType("html")) : (el = document.createTextNode(" "), setTokenType("text")), el
            }

            function makeTextNodeLinkFn(tokens, frag) {
                return function(vm, el, host, scope) {
                    for (var token, value, node, fragClone = frag.cloneNode(!0), childNodes = toArray(fragClone.childNodes), i = 0, l = tokens.length; i < l; i++) token = tokens[i], value = token.value, token.tag && (node = childNodes[i], token.oneTime ? (value = (scope || vm).$eval(value), token.html ? replace(node, parseTemplate(value, !0)) : node.data = _toString(value)) : vm._bindDir(token.descriptor, node, host, scope));
                    replace(el, fragClone)
                }
            }

            function compileNodeList(nodeList, options) {
                for (var nodeLinkFn, childLinkFn, node, linkFns = [], i = 0, l = nodeList.length; i < l; i++) node = nodeList[i], nodeLinkFn = compileNode(node, options), childLinkFn = nodeLinkFn && nodeLinkFn.terminal || "SCRIPT" === node.tagName || !node.hasChildNodes() ? null : compileNodeList(node.childNodes, options), linkFns.push(nodeLinkFn, childLinkFn);
                return linkFns.length ? makeChildLinkFn(linkFns) : null
            }

            function makeChildLinkFn(linkFns) {
                return function(vm, nodes, host, scope, frag) {
                    for (var node, nodeLinkFn, childrenLinkFn, i = 0, n = 0, l = linkFns.length; i < l; n++) {
                        node = nodes[n], nodeLinkFn = linkFns[i++], childrenLinkFn = linkFns[i++];
                        var childNodes = toArray(node.childNodes);
                        nodeLinkFn && nodeLinkFn(vm, node, host, scope, frag), childrenLinkFn && childrenLinkFn(vm, childNodes, host, scope, frag)
                    }
                }
            }

            function checkElementDirectives(el, options) {
                var tag = el.tagName.toLowerCase();
                if (!commonTagRE.test(tag)) {
                    var def = resolveAsset(options, "elementDirectives", tag);
                    return def ? makeTerminalNodeLinkFn(el, tag, "", options, def) : void 0
                }
            }

            function checkComponent(el, options) {
                var component = checkComponentAttr(el, options);
                if (component) {
                    var ref = findRef(el),
                        descriptor = {
                            name: "component",
                            ref: ref,
                            expression: component.id,
                            def: internalDirectives.component,
                            modifiers: {
                                literal: !component.dynamic
                            }
                        },
                        componentLinkFn = function(vm, el, host, scope, frag) {
                            ref && defineReactive((scope || vm).$refs, ref, null), vm._bindDir(descriptor, el, host, scope, frag)
                        };
                    return componentLinkFn.terminal = !0, componentLinkFn
                }
            }

            function checkTerminalDirectives(el, attrs, options) {
                if (null !== getAttr(el, "v-pre")) return skip;
                if (el.hasAttribute("v-else")) {
                    var prev = el.previousElementSibling;
                    if (prev && prev.hasAttribute("v-if")) return skip
                }
                for (var attr, name, value, modifiers, matched, dirName, rawName, arg, def, termDef, i = 0, j = attrs.length; i < j; i++) attr = attrs[i], name = attr.name.replace(modifierRE, ""), (matched = name.match(dirAttrRE)) && (def = resolveAsset(options, "directives", matched[1])) && def.terminal && (!termDef || (def.priority || DEFAULT_TERMINAL_PRIORITY) > termDef.priority) && (termDef = def, rawName = attr.name, modifiers = parseModifiers(attr.name), value = attr.value, dirName = matched[1], arg = matched[2]);
                return termDef ? makeTerminalNodeLinkFn(el, dirName, value, options, termDef, rawName, arg, modifiers) : void 0
            }

            function skip() {}

            function makeTerminalNodeLinkFn(el, dirName, value, options, def, rawName, arg, modifiers) {
                var parsed = parseDirective(value),
                    descriptor = {
                        name: dirName,
                        arg: arg,
                        expression: parsed.expression,
                        filters: parsed.filters,
                        raw: value,
                        attr: rawName,
                        modifiers: modifiers,
                        def: def
                    };
                "for" !== dirName && "router-view" !== dirName || (descriptor.ref = findRef(el));
                var fn = function(vm, el, host, scope, frag) {
                    descriptor.ref && defineReactive((scope || vm).$refs, descriptor.ref, null), vm._bindDir(descriptor, el, host, scope, frag)
                };
                return fn.terminal = !0, fn
            }

            function compileDirectives(attrs, options) {
                function pushDir(dirName, def, interpTokens) {
                    var hasOneTimeToken = interpTokens && hasOneTime(interpTokens),
                        parsed = !hasOneTimeToken && parseDirective(value);
                    dirs.push({
                        name: dirName,
                        attr: rawName,
                        raw: rawValue,
                        def: def,
                        arg: arg,
                        modifiers: modifiers,
                        expression: parsed && parsed.expression,
                        filters: parsed && parsed.filters,
                        interp: interpTokens,
                        hasOneTime: hasOneTimeToken
                    })
                }
                for (var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens, matched, i = attrs.length, dirs = []; i--;)
                    if (attr = attrs[i], name = rawName = attr.name, value = rawValue = attr.value, tokens = parseText(value), arg = null, modifiers = parseModifiers(name), name = name.replace(modifierRE, ""), tokens) value = tokensToExp(tokens), arg = name, pushDir("bind", directives.bind, tokens), "production" !== process.env.NODE_ENV && "class" === name && Array.prototype.some.call(attrs, function(attr) {
                        return ":class" === attr.name || "v-bind:class" === attr.name
                    }) && warn('class="' + rawValue + '": Do not mix mustache interpolation and v-bind for "class" on the same element. Use one or the other.', options);
                    else if (transitionRE.test(name)) modifiers.literal = !bindRE.test(name), pushDir("transition", internalDirectives.transition);
                else if (onRE.test(name)) arg = name.replace(onRE, ""), pushDir("on", directives.on);
                else if (bindRE.test(name)) dirName = name.replace(bindRE, ""), "style" === dirName || "class" === dirName ? pushDir(dirName, internalDirectives[dirName]) : (arg = dirName, pushDir("bind", directives.bind));
                else if (matched = name.match(dirAttrRE)) {
                    if (dirName = matched[1], arg = matched[2], "else" === dirName) continue;
                    dirDef = resolveAsset(options, "directives", dirName, !0), dirDef && pushDir(dirName, dirDef)
                }
                if (dirs.length) return makeNodeLinkFn(dirs)
            }

            function parseModifiers(name) {
                var res = Object.create(null),
                    match = name.match(modifierRE);
                if (match)
                    for (var i = match.length; i--;) res[match[i].slice(1)] = !0;
                return res
            }

            function makeNodeLinkFn(directives) {
                return function(vm, el, host, scope, frag) {
                    for (var i = directives.length; i--;) vm._bindDir(directives[i], el, host, scope, frag)
                }
            }

            function hasOneTime(tokens) {
                for (var i = tokens.length; i--;)
                    if (tokens[i].oneTime) return !0
            }

            function isScript(el) {
                return "SCRIPT" === el.tagName && (!el.hasAttribute("type") || "text/javascript" === el.getAttribute("type"))
            }

            function transclude(el, options) {
                return options && (options._containerAttrs = extractAttrs(el)), isTemplate(el) && (el = parseTemplate(el)), options && (options._asComponent && !options.template && (options.template = "<slot></slot>"), options.template && (options._content = extractContent(el), el = transcludeTemplate(el, options))), isFragment(el) && (prepend(createAnchor("v-start", !0), el), el.appendChild(createAnchor("v-end", !0))), el
            }

            function transcludeTemplate(el, options) {
                var template = options.template,
                    frag = parseTemplate(template, !0);
                if (frag) {
                    var replacer = frag.firstChild;
                    if (!replacer) return frag;
                    var tag = replacer.tagName && replacer.tagName.toLowerCase();
                    return options.replace ? (el === document.body && "production" !== process.env.NODE_ENV && warn("You are mounting an instance with a template to <body>. This will replace <body> entirely. You should probably use `replace: false` here."), frag.childNodes.length > 1 || 1 !== replacer.nodeType || "component" === tag || resolveAsset(options, "components", tag) || hasBindAttr(replacer, "is") || resolveAsset(options, "elementDirectives", tag) || replacer.hasAttribute("v-for") || replacer.hasAttribute("v-if") ? frag : (options._replacerAttrs = extractAttrs(replacer), mergeAttrs(el, replacer), replacer)) : (el.appendChild(frag), el)
                }
                "production" !== process.env.NODE_ENV && warn("Invalid template option: " + template)
            }

            function extractAttrs(el) {
                if (1 === el.nodeType && el.hasAttributes()) return toArray(el.attributes)
            }

            function mergeAttrs(from, to) {
                for (var name, value, attrs = from.attributes, i = attrs.length; i--;) name = attrs[i].name, value = attrs[i].value, to.hasAttribute(name) || specialCharRE.test(name) ? "class" === name && !parseText(value) && (value = value.trim()) && value.split(/\s+/).forEach(function(cls) {
                    addClass(to, cls)
                }) : to.setAttribute(name, value)
            }

            function resolveSlots(vm, content) {
                if (content) {
                    for (var el, name, contents = vm._slotContents = Object.create(null), i = 0, l = content.children.length; i < l; i++) el = content.children[i], (name = el.getAttribute("slot")) && (contents[name] || (contents[name] = [])).push(el), "production" !== process.env.NODE_ENV && getBindAttr(el, "slot") && warn('The "slot" attribute must be static.', vm.$parent);
                    for (name in contents) contents[name] = extractFragment(contents[name], content);
                    if (content.hasChildNodes()) {
                        var nodes = content.childNodes;
                        if (1 === nodes.length && 3 === nodes[0].nodeType && !nodes[0].data.trim()) return;
                        contents.default = extractFragment(content.childNodes, content)
                    }
                }
            }

            function extractFragment(nodes, parent) {
                var frag = document.createDocumentFragment();
                nodes = toArray(nodes);
                for (var i = 0, l = nodes.length; i < l; i++) {
                    var node = nodes[i];
                    !isTemplate(node) || node.hasAttribute("v-if") || node.hasAttribute("v-for") || (parent.removeChild(node), node = parseTemplate(node, !0)), frag.appendChild(node)
                }
                return frag
            }

            function noop$1() {}

            function Directive(descriptor, vm, el, host, scope, frag) {
                this.vm = vm, this.el = el, this.descriptor = descriptor, this.name = descriptor.name, this.expression = descriptor.expression, this.arg = descriptor.arg, this.modifiers = descriptor.modifiers, this.filters = descriptor.filters, this.literal = this.modifiers && this.modifiers.literal, this._locked = !1, this._bound = !1, this._listeners = null, this._host = host, this._scope = scope, this._frag = frag, "production" !== process.env.NODE_ENV && this.el && (this.el._vue_directives = this.el._vue_directives || [], this.el._vue_directives.push(this))
            }

            function Vue(options) {
                this._init(options)
            }

            function limitBy(arr, n, offset) {
                return offset = offset ? parseInt(offset, 10) : 0, n = toNumber(n), "number" == typeof n ? arr.slice(offset, offset + n) : arr
            }

            function filterBy(arr, search, delimiter) {
                if (arr = convertArray(arr), null == search) return arr;
                if ("function" == typeof search) return arr.filter(search);
                search = ("" + search).toLowerCase();
                for (var item, key, val, j, n = "in" === delimiter ? 3 : 2, keys = Array.prototype.concat.apply([], toArray(arguments, n)), res = [], i = 0, l = arr.length; i < l; i++)
                    if (item = arr[i], val = item && item.$value || item, j = keys.length) {
                        for (; j--;)
                            if ("$key" === (key = keys[j]) && contains(item.$key, search) || contains(getPath(val, key), search)) {
                                res.push(item);
                                break
                            }
                    } else contains(item, search) && res.push(item);
                return res
            }

            function orderBy(arr) {
                function baseCompare(a, b, sortKeyIndex) {
                    var sortKey = sortKeys[sortKeyIndex];
                    return sortKey && ("$key" !== sortKey && (isObject(a) && "$value" in a && (a = a.$value), isObject(b) && "$value" in b && (b = b.$value)), a = isObject(a) ? getPath(a, sortKey) : a, b = isObject(b) ? getPath(b, sortKey) : b), a === b ? 0 : a > b ? order : -order
                }
                var comparator = null,
                    sortKeys = void 0;
                arr = convertArray(arr);
                var args = toArray(arguments, 1),
                    order = args[args.length - 1];
                "number" == typeof order ? (order = order < 0 ? -1 : 1, args = args.length > 1 ? args.slice(0, -1) : args) : order = 1;
                var firstArg = args[0];
                return firstArg ? ("function" == typeof firstArg ? comparator = function(a, b) {
                    return firstArg(a, b) * order
                } : (sortKeys = Array.prototype.concat.apply([], args), comparator = function(a, b, i) {
                    return i = i || 0, i >= sortKeys.length - 1 ? baseCompare(a, b, i) : baseCompare(a, b, i) || comparator(a, b, i + 1)
                }), arr.slice().sort(comparator)) : arr
            }

            function contains(val, search) {
                var i;
                if (isPlainObject(val)) {
                    var keys = Object.keys(val);
                    for (i = keys.length; i--;)
                        if (contains(val[keys[i]], search)) return !0
                } else if (isArray(val)) {
                    for (i = val.length; i--;)
                        if (contains(val[i], search)) return !0
                } else if (null != val) return val.toString().toLowerCase().indexOf(search) > -1
            }
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                literalValueRE = /^\s?(true|false|-?[\d\.]+|'[^']*'|"[^"]*")\s?$/,
                camelizeRE = /-(\w)/g,
                hyphenateRE = /([^-])([A-Z])/g,
                classifyRE = /(?:^|[-_\/])(\w)/g,
                toString = Object.prototype.toString,
                OBJECT_STRING = "[object Object]",
                isArray = Array.isArray,
                hasProto = "__proto__" in {},
                inBrowser = "undefined" != typeof window && "[object Object]" !== Object.prototype.toString.call(window),
                devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__,
                UA = inBrowser && window.navigator.userAgent.toLowerCase(),
                isIE = UA && UA.indexOf("trident") > 0,
                isIE9 = UA && UA.indexOf("msie 9.0") > 0,
                isAndroid = UA && UA.indexOf("android") > 0,
                isIOS = UA && /iphone|ipad|ipod|ios/.test(UA),
                transitionProp = void 0,
                transitionEndEvent = void 0,
                animationProp = void 0,
                animationEndEvent = void 0;
            if (inBrowser && !isIE9) {
                var isWebkitTrans = void 0 === window.ontransitionend && void 0 !== window.onwebkittransitionend,
                    isWebkitAnim = void 0 === window.onanimationend && void 0 !== window.onwebkitanimationend;
                transitionProp = isWebkitTrans ? "WebkitTransition" : "transition", transitionEndEvent = isWebkitTrans ? "webkitTransitionEnd" : "transitionend", animationProp = isWebkitAnim ? "WebkitAnimation" : "animation", animationEndEvent = isWebkitAnim ? "webkitAnimationEnd" : "animationend"
            }
            var nextTick = function() {
                    function nextTickHandler() {
                        pending = !1;
                        var copies = callbacks.slice(0);
                        callbacks.length = 0;
                        for (var i = 0; i < copies.length; i++) copies[i]()
                    }
                    var callbacks = [],
                        pending = !1,
                        timerFunc = void 0;
                    if ("undefined" != typeof Promise && isNative(Promise)) {
                        var p = Promise.resolve(),
                            noop = function() {};
                        timerFunc = function() {
                            p.then(nextTickHandler), isIOS && setTimeout(noop)
                        }
                    } else if ("undefined" != typeof MutationObserver) {
                        var counter = 1,
                            observer = new MutationObserver(nextTickHandler),
                            textNode = document.createTextNode(String(counter));
                        observer.observe(textNode, {
                            characterData: !0
                        }), timerFunc = function() {
                            counter = (counter + 1) % 2, textNode.data = String(counter)
                        }
                    } else timerFunc = setTimeout;
                    return function(cb, ctx) {
                        var func = ctx ? function() {
                            cb.call(ctx)
                        } : cb;
                        callbacks.push(func), pending || (pending = !0, timerFunc(nextTickHandler, 0))
                    }
                }(),
                _Set = void 0;
            "undefined" != typeof Set && isNative(Set) ? _Set = Set : (_Set = function() {
                this.set = Object.create(null)
            }, _Set.prototype.has = function(key) {
                return void 0 !== this.set[key]
            }, _Set.prototype.add = function(key) {
                this.set[key] = 1
            }, _Set.prototype.clear = function() {
                this.set = Object.create(null)
            });
            var p = Cache.prototype;
            p.put = function(key, value) {
                var removed, entry = this.get(key, !0);
                return entry || (this.size === this.limit && (removed = this.shift()), entry = {
                    key: key
                }, this._keymap[key] = entry, this.tail ? (this.tail.newer = entry, entry.older = this.tail) : this.head = entry, this.tail = entry, this.size++), entry.value = value, removed
            }, p.shift = function() {
                var entry = this.head;
                return entry && (this.head = this.head.newer, this.head.older = void 0, entry.newer = entry.older = void 0, this._keymap[entry.key] = void 0, this.size--), entry
            }, p.get = function(key, returnEntry) {
                var entry = this._keymap[key];
                if (void 0 !== entry) return entry === this.tail ? returnEntry ? entry : entry.value : (entry.newer && (entry === this.head && (this.head = entry.newer), entry.newer.older = entry.older), entry.older && (entry.older.newer = entry.newer), entry.newer = void 0, entry.older = this.tail, this.tail && (this.tail.newer = entry), this.tail = entry, returnEntry ? entry : entry.value)
            };
            var str, dir, len, index, chr, state, cache$1 = new Cache(1e3),
                reservedArgRE = /^in$|^-?\d+/,
                startState = 0,
                filterState = 1,
                filterNameState = 2,
                filterArgState = 3,
                doubleChr = 34,
                singleChr = 39,
                pipeChr = 124,
                escapeChr = 92,
                spaceChr = 32,
                expStartChr = {
                    91: 1,
                    123: 1,
                    40: 1
                },
                expChrPair = {
                    91: 93,
                    123: 125,
                    40: 41
                },
                directive = Object.freeze({
                    parseDirective: parseDirective
                }),
                regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g,
                cache = void 0,
                tagRE = void 0,
                htmlRE = void 0,
                filterRE = /[^|]\|[^|]/,
                text = Object.freeze({
                    compileRegex: compileRegex,
                    parseText: parseText,
                    tokensToExp: tokensToExp
                }),
                delimiters = ["{{", "}}"],
                unsafeDelimiters = ["{{{", "}}}"],
                config = Object.defineProperties({
                    debug: !1,
                    silent: !1,
                    async: !0,
                    warnExpressionErrors: !0,
                    devtools: "production" !== process.env.NODE_ENV,
                    _delimitersChanged: !0,
                    _assetTypes: ["component", "directive", "elementDirective", "filter", "transition", "partial"],
                    _propBindingModes: {
                        ONE_WAY: 0,
                        TWO_WAY: 1,
                        ONE_TIME: 2
                    },
                    _maxUpdateCount: 100
                }, {
                    delimiters: {
                        get: function() {
                            return delimiters
                        },
                        set: function(val) {
                            delimiters = val, compileRegex()
                        },
                        configurable: !0,
                        enumerable: !0
                    },
                    unsafeDelimiters: {
                        get: function() {
                            return unsafeDelimiters
                        },
                        set: function(val) {
                            unsafeDelimiters = val, compileRegex()
                        },
                        configurable: !0,
                        enumerable: !0
                    }
                }),
                warn = void 0,
                formatComponentName = void 0;
            "production" !== process.env.NODE_ENV && function() {
                var hasConsole = "undefined" != typeof console;
                warn = function(msg, vm) {
                    hasConsole && !config.silent && console.error("[Vue warn]: " + msg + (vm ? formatComponentName(vm) : ""))
                }, formatComponentName = function(vm) {
                    var name = vm._isVue ? vm.$options.name : vm.name;
                    return name ? " (found in component: <" + hyphenate(name) + ">)" : ""
                }
            }();
            var transition = Object.freeze({
                    appendWithTransition: appendWithTransition,
                    beforeWithTransition: beforeWithTransition,
                    removeWithTransition: removeWithTransition,
                    applyTransition: applyTransition
                }),
                refRE = /^v-ref:/,
                commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/i,
                reservedTagRE = /^(slot|partial|component)$/i,
                isUnknownElement = void 0;
            "production" !== process.env.NODE_ENV && (isUnknownElement = function(el, tag) {
                return tag.indexOf("-") > -1 ? el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement : /HTMLUnknownElement/.test(el.toString()) && !/^(data|time|rtc|rb|details|dialog|summary)$/.test(tag)
            });
            var strats = config.optionMergeStrategies = Object.create(null);
            strats.data = function(parentVal, childVal, vm) {
                return vm ? parentVal || childVal ? function() {
                    var instanceData = "function" == typeof childVal ? childVal.call(vm) : childVal,
                        defaultData = "function" == typeof parentVal ? parentVal.call(vm) : void 0;
                    return instanceData ? mergeData(instanceData, defaultData) : defaultData
                } : void 0 : childVal ? "function" != typeof childVal ? ("production" !== process.env.NODE_ENV && warn('The "data" option should be a function that returns a per-instance value in component definitions.', vm), parentVal) : parentVal ? function() {
                    return mergeData(childVal.call(this), parentVal.call(this))
                } : childVal : parentVal
            }, strats.el = function(parentVal, childVal, vm) {
                if (!vm && childVal && "function" != typeof childVal) return void("production" !== process.env.NODE_ENV && warn('The "el" option should be a function that returns a per-instance value in component definitions.', vm));
                var ret = childVal || parentVal;
                return vm && "function" == typeof ret ? ret.call(vm) : ret
            }, strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = strats.activate = function(parentVal, childVal) {
                return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal
            }, config._assetTypes.forEach(function(type) {
                strats[type + "s"] = mergeAssets
            }), strats.watch = strats.events = function(parentVal, childVal) {
                if (!childVal) return parentVal;
                if (!parentVal) return childVal;
                var ret = {};
                extend(ret, parentVal);
                for (var key in childVal) {
                    var parent = ret[key],
                        child = childVal[key];
                    parent && !isArray(parent) && (parent = [parent]), ret[key] = parent ? parent.concat(child) : [child]
                }
                return ret
            }, strats.props = strats.methods = strats.computed = function(parentVal, childVal) {
                if (!childVal) return parentVal;
                if (!parentVal) return childVal;
                var ret = Object.create(null);
                return extend(ret, parentVal), extend(ret, childVal), ret
            };
            var defaultStrat = function(parentVal, childVal) {
                    return void 0 === childVal ? parentVal : childVal
                },
                uid$1 = 0;
            Dep.target = null, Dep.prototype.addSub = function(sub) {
                this.subs.push(sub)
            }, Dep.prototype.removeSub = function(sub) {
                this.subs.$remove(sub)
            }, Dep.prototype.depend = function() {
                Dep.target.addDep(this)
            }, Dep.prototype.notify = function() {
                for (var subs = toArray(this.subs), i = 0, l = subs.length; i < l; i++) subs[i].update()
            };
            var arrayProto = Array.prototype,
                arrayMethods = Object.create(arrayProto);
            ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"].forEach(function(method) {
                var original = arrayProto[method];
                def(arrayMethods, method, function() {
                    for (var i = arguments.length, args = new Array(i); i--;) args[i] = arguments[i];
                    var inserted, result = original.apply(this, args),
                        ob = this.__ob__;
                    switch (method) {
                        case "push":
                        case "unshift":
                            inserted = args;
                            break;
                        case "splice":
                            inserted = args.slice(2)
                    }
                    return inserted && ob.observeArray(inserted), ob.dep.notify(), result
                })
            }), def(arrayProto, "$set", function(index, val) {
                return index >= this.length && (this.length = Number(index) + 1), this.splice(index, 1, val)[0]
            }), def(arrayProto, "$remove", function(item) {
                if (this.length) {
                    var index = indexOf(this, item);
                    return index > -1 ? this.splice(index, 1) : void 0
                }
            });
            var arrayKeys = Object.getOwnPropertyNames(arrayMethods),
                shouldConvert = !0;
            Observer.prototype.walk = function(obj) {
                for (var keys = Object.keys(obj), i = 0, l = keys.length; i < l; i++) this.convert(keys[i], obj[keys[i]])
            }, Observer.prototype.observeArray = function(items) {
                for (var i = 0, l = items.length; i < l; i++) observe(items[i])
            }, Observer.prototype.convert = function(key, val) {
                defineReactive(this.value, key, val)
            }, Observer.prototype.addVm = function(vm) {
                (this.vms || (this.vms = [])).push(vm)
            }, Observer.prototype.removeVm = function(vm) {
                this.vms.$remove(vm)
            };
            var util = Object.freeze({
                    defineReactive: defineReactive,
                    set: set,
                    del: del,
                    hasOwn: hasOwn,
                    isLiteral: isLiteral,
                    isReserved: isReserved,
                    _toString: _toString,
                    toNumber: toNumber,
                    toBoolean: toBoolean,
                    stripQuotes: stripQuotes,
                    camelize: camelize,
                    hyphenate: hyphenate,
                    classify: classify,
                    bind: bind,
                    toArray: toArray,
                    extend: extend,
                    isObject: isObject,
                    isPlainObject: isPlainObject,
                    def: def,
                    debounce: _debounce,
                    indexOf: indexOf,
                    cancellable: cancellable,
                    looseEqual: looseEqual,
                    isArray: isArray,
                    hasProto: hasProto,
                    inBrowser: inBrowser,
                    devtools: devtools,
                    isIE: isIE,
                    isIE9: isIE9,
                    isAndroid: isAndroid,
                    isIOS: isIOS,
                    get transitionProp() {
                        return transitionProp
                    },
                    get transitionEndEvent() {
                        return transitionEndEvent
                    },
                    get animationProp() {
                        return animationProp
                    },
                    get animationEndEvent() {
                        return animationEndEvent
                    },
                    nextTick: nextTick,
                    get _Set() {
                        return _Set
                    },
                    query: query,
                    inDoc: inDoc,
                    getAttr: getAttr,
                    getBindAttr: getBindAttr,
                    hasBindAttr: hasBindAttr,
                    before: before,
                    after: after,
                    remove: remove,
                    prepend: prepend,
                    replace: replace,
                    on: on,
                    off: off,
                    setClass: setClass,
                    addClass: addClass,
                    removeClass: removeClass,
                    extractContent: extractContent,
                    trimNode: trimNode,
                    isTemplate: isTemplate,
                    createAnchor: createAnchor,
                    findRef: findRef,
                    mapNodeRange: mapNodeRange,
                    removeNodeRange: removeNodeRange,
                    isFragment: isFragment,
                    getOuterHTML: getOuterHTML,
                    mergeOptions: mergeOptions,
                    resolveAsset: resolveAsset,
                    checkComponentAttr: checkComponentAttr,
                    commonTagRE: commonTagRE,
                    reservedTagRE: reservedTagRE,
                    get warn() {
                        return warn
                    }
                }),
                uid = 0,
                pathCache = new Cache(1e3),
                APPEND = 0,
                PUSH = 1,
                INC_SUB_PATH_DEPTH = 2,
                PUSH_SUB_PATH = 3,
                BEFORE_PATH = 0,
                IN_SUB_PATH = 4,
                IN_SINGLE_QUOTE = 5,
                IN_DOUBLE_QUOTE = 6,
                AFTER_PATH = 7,
                ERROR = 8,
                pathStateMachine = [];
            pathStateMachine[BEFORE_PATH] = {
                ws: [BEFORE_PATH],
                ident: [3, APPEND],
                "[": [IN_SUB_PATH],
                eof: [AFTER_PATH]
            }, pathStateMachine[1] = {
                ws: [1],
                ".": [2],
                "[": [IN_SUB_PATH],
                eof: [AFTER_PATH]
            }, pathStateMachine[2] = {
                ws: [2],
                ident: [3, APPEND]
            }, pathStateMachine[3] = {
                ident: [3, APPEND],
                0: [3, APPEND],
                number: [3, APPEND],
                ws: [1, PUSH],
                ".": [2, PUSH],
                "[": [IN_SUB_PATH, PUSH],
                eof: [AFTER_PATH, PUSH]
            }, pathStateMachine[IN_SUB_PATH] = {
                "'": [IN_SINGLE_QUOTE, APPEND],
                '"': [IN_DOUBLE_QUOTE, APPEND],
                "[": [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
                "]": [1, PUSH_SUB_PATH],
                eof: ERROR,
                else: [IN_SUB_PATH, APPEND]
            }, pathStateMachine[IN_SINGLE_QUOTE] = {
                "'": [IN_SUB_PATH, APPEND],
                eof: ERROR,
                else: [IN_SINGLE_QUOTE, APPEND]
            }, pathStateMachine[IN_DOUBLE_QUOTE] = {
                '"': [IN_SUB_PATH, APPEND],
                eof: ERROR,
                else: [IN_DOUBLE_QUOTE, APPEND]
            };
            var warnNonExistent;
            "production" !== process.env.NODE_ENV && (warnNonExistent = function(path, vm) {
                warn('You are setting a non-existent path "' + path.raw + '" on a vm instance. Consider pre-initializing the property with the "data" option for more reliable reactivity and better performance.', vm)
            });
            var path = Object.freeze({
                    parsePath: parsePath,
                    getPath: getPath,
                    setPath: setPath
                }),
                expressionCache = new Cache(1e3),
                allowedKeywords = "Math,Date,this,true,false,null,undefined,Infinity,NaN,isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,parseInt,parseFloat",
                allowedKeywordsRE = new RegExp("^(" + allowedKeywords.replace(/,/g, "\\b|") + "\\b)"),
                improperKeywords = "break,case,class,catch,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,in,instanceof,let,return,super,switch,throw,try,var,while,with,yield,enum,await,implements,package,protected,static,interface,private,public",
                improperKeywordsRE = new RegExp("^(" + improperKeywords.replace(/,/g, "\\b|") + "\\b)"),
                wsRE = /\s/g,
                newlineRE = /\n/g,
                saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\"']|\\.)*`|`(?:[^`\\]|\\.)*`)|new |typeof |void /g,
                restoreRE = /"(\d+)"/g,
                pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/,
                identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g,
                literalValueRE$1 = /^(?:true|false|null|undefined|Infinity|NaN)$/,
                saved = [],
                expression = Object.freeze({
                    parseExpression: parseExpression$1,
                    isSimplePath: isSimplePath
                }),
                queue = [],
                userQueue = [],
                has = {},
                circular = {},
                waiting = !1,
                uid$2 = 0;
            Watcher.prototype.get = function() {
                this.beforeGet();
                var value, scope = this.scope || this.vm;
                try {
                    value = this.getter.call(scope, scope)
                } catch (e) {
                    "production" !== process.env.NODE_ENV && config.warnExpressionErrors && warn('Error when evaluating expression "' + this.expression + '": ' + e.toString(), this.vm)
                }
                return this.deep && traverse(value), this.preProcess && (value = this.preProcess(value)), this.filters && (value = scope._applyFilters(value, null, this.filters, !1)), this.postProcess && (value = this.postProcess(value)), this.afterGet(), value
            }, Watcher.prototype.set = function(value) {
                var scope = this.scope || this.vm;
                this.filters && (value = scope._applyFilters(value, this.value, this.filters, !0));
                try {
                    this.setter.call(scope, scope, value)
                } catch (e) {
                    "production" !== process.env.NODE_ENV && config.warnExpressionErrors && warn('Error when evaluating setter "' + this.expression + '": ' + e.toString(), this.vm)
                }
                var forContext = scope.$forContext;
                if (forContext && forContext.alias === this.expression) {
                    if (forContext.filters) return void("production" !== process.env.NODE_ENV && warn("It seems you are using two-way binding on a v-for alias (" + this.expression + "), and the v-for has filters. This will not work properly. Either remove the filters or use an array of objects and bind to object properties instead.", this.vm));
                    forContext._withLock(function() {
                        scope.$key ? forContext.rawValue[scope.$key] = value : forContext.rawValue.$set(scope.$index, value)
                    })
                }
            }, Watcher.prototype.beforeGet = function() {
                Dep.target = this
            }, Watcher.prototype.addDep = function(dep) {
                var id = dep.id;
                this.newDepIds.has(id) || (this.newDepIds.add(id), this.newDeps.push(dep), this.depIds.has(id) || dep.addSub(this))
            }, Watcher.prototype.afterGet = function() {
                Dep.target = null;
                for (var i = this.deps.length; i--;) {
                    var dep = this.deps[i];
                    this.newDepIds.has(dep.id) || dep.removeSub(this)
                }
                var tmp = this.depIds;
                this.depIds = this.newDepIds, this.newDepIds = tmp, this.newDepIds.clear(), tmp = this.deps, this.deps = this.newDeps, this.newDeps = tmp, this.newDeps.length = 0
            }, Watcher.prototype.update = function(shallow) {
                this.lazy ? this.dirty = !0 : this.sync || !config.async ? this.run() : (this.shallow = this.queued ? !!shallow && this.shallow : !!shallow, this.queued = !0, "production" !== process.env.NODE_ENV && config.debug && (this.prevError = new Error("[vue] async stack trace")), pushWatcher(this))
            }, Watcher.prototype.run = function() {
                if (this.active) {
                    var value = this.get();
                    if (value !== this.value || (isObject(value) || this.deep) && !this.shallow) {
                        var oldValue = this.value;
                        this.value = value;
                        var prevError = this.prevError;
                        if ("production" !== process.env.NODE_ENV && config.debug && prevError) {
                            this.prevError = null;
                            try {
                                this.cb.call(this.vm, value, oldValue)
                            } catch (e) {
                                throw nextTick(function() {
                                    throw prevError
                                }, 0), e
                            }
                        } else this.cb.call(this.vm, value, oldValue)
                    }
                    this.queued = this.shallow = !1
                }
            }, Watcher.prototype.evaluate = function() {
                var current = Dep.target;
                this.value = this.get(), this.dirty = !1, Dep.target = current
            }, Watcher.prototype.depend = function() {
                for (var i = this.deps.length; i--;) this.deps[i].depend()
            }, Watcher.prototype.teardown = function() {
                if (this.active) {
                    this.vm._isBeingDestroyed || this.vm._vForRemoving || this.vm._watchers.$remove(this);
                    for (var i = this.deps.length; i--;) this.deps[i].removeSub(this);
                    this.active = !1, this.vm = this.cb = this.value = null
                }
            };
            var seenObjects = new _Set,
                text$1 = {
                    bind: function() {
                        this.attr = 3 === this.el.nodeType ? "data" : "textContent"
                    },
                    update: function(value) {
                        this.el[this.attr] = _toString(value)
                    }
                },
                templateCache = new Cache(1e3),
                idSelectorCache = new Cache(1e3),
                map = {
                    efault: [0, "", ""],
                    legend: [1, "<fieldset>", "</fieldset>"],
                    tr: [2, "<table><tbody>", "</tbody></table>"],
                    col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"]
                };
            map.td = map.th = [3, "<table><tbody><tr>", "</tr></tbody></table>"], map.option = map.optgroup = [1, '<select multiple="multiple">', "</select>"], map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, "<table>", "</table>"], map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events"version="1.1">', "</svg>"];
            var tagRE$1 = /<([\w:-]+)/,
                entityRE = /&#?\w+?;/,
                commentRE = /<!--/,
                hasBrokenTemplate = function() {
                    if (inBrowser) {
                        var a = document.createElement("div");
                        return a.innerHTML = "<template>1</template>", !a.cloneNode(!0).firstChild.innerHTML
                    }
                    return !1
                }(),
                hasTextareaCloneBug = function() {
                    if (inBrowser) {
                        var t = document.createElement("textarea");
                        return t.placeholder = "t", "t" === t.cloneNode(!0).value
                    }
                    return !1
                }(),
                template = Object.freeze({
                    cloneNode: cloneNode,
                    parseTemplate: parseTemplate
                }),
                html = {
                    bind: function() {
                        8 === this.el.nodeType && (this.nodes = [], this.anchor = createAnchor("v-html"), replace(this.el, this.anchor))
                    },
                    update: function(value) {
                        value = _toString(value), this.nodes ? this.swap(value) : this.el.innerHTML = value
                    },
                    swap: function(value) {
                        for (var i = this.nodes.length; i--;) remove(this.nodes[i]);
                        var frag = parseTemplate(value, !0, !0);
                        this.nodes = toArray(frag.childNodes), before(frag, this.anchor)
                    }
                };
            Fragment.prototype.callHook = function(hook) {
                var i, l;
                for (i = 0, l = this.childFrags.length; i < l; i++) this.childFrags[i].callHook(hook);
                for (i = 0, l = this.children.length; i < l; i++) hook(this.children[i])
            }, Fragment.prototype.beforeRemove = function() {
                var i, l;
                for (i = 0, l = this.childFrags.length; i < l; i++) this.childFrags[i].beforeRemove(!1);
                for (i = 0, l = this.children.length; i < l; i++) this.children[i].$destroy(!1, !0);
                var dirs = this.unlink.dirs;
                for (i = 0, l = dirs.length; i < l; i++) dirs[i]._watcher && dirs[i]._watcher.teardown()
            }, Fragment.prototype.destroy = function() {
                this.parentFrag && this.parentFrag.childFrags.$remove(this), this.node.__v_frag = null, this.unlink()
            };
            var linkerCache = new Cache(5e3);
            FragmentFactory.prototype.create = function(host, scope, parentFrag) {
                var frag = cloneNode(this.template);
                return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag)
            };
            var uid$3 = 0,
                vFor = {
                    priority: 2200,
                    terminal: !0,
                    params: ["track-by", "stagger", "enter-stagger", "leave-stagger"],
                    bind: function() {
                        "production" !== process.env.NODE_ENV && this.el.hasAttribute("v-if") && warn("<" + this.el.tagName.toLowerCase() + ' v-for="' + this.expression + '" v-if="' + this.el.getAttribute("v-if") + '">: Using v-if and v-for on the same element is not recommended - consider filtering the source Array instead.', this.vm);
                        var inMatch = this.expression.match(/(.*) (?:in|of) (.*)/);
                        if (inMatch) {
                            var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
                            itMatch ? (this.iterator = itMatch[1].trim(), this.alias = itMatch[2].trim()) : this.alias = inMatch[1].trim(), this.expression = inMatch[2]
                        }
                        if (!this.alias) return void("production" !== process.env.NODE_ENV && warn('Invalid v-for expression "' + this.descriptor.raw + '": alias is required.', this.vm));
                        this.id = "__v-for__" + ++uid$3;
                        var tag = this.el.tagName;
                        this.isOption = ("OPTION" === tag || "OPTGROUP" === tag) && "SELECT" === this.el.parentNode.tagName, this.start = createAnchor("v-for-start"), this.end = createAnchor("v-for-end"), replace(this.el, this.end), before(this.start, this.end), this.cache = Object.create(null), this.factory = new FragmentFactory(this.vm, this.el)
                    },
                    update: function(data) {
                        this.diff(data), this.updateRef(), this.updateModel()
                    },
                    diff: function(data) {
                        var i, l, frag, key, value, primitive, item = data[0],
                            convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, "$key") && hasOwn(item, "$value"),
                            trackByKey = this.params.trackBy,
                            oldFrags = this.frags,
                            frags = this.frags = new Array(data.length),
                            alias = this.alias,
                            iterator = this.iterator,
                            start = this.start,
                            end = this.end,
                            inDocument = inDoc(start),
                            init = !oldFrags;
                        for (i = 0, l = data.length; i < l; i++) item = data[i], key = convertedFromObject ? item.$key : null, value = convertedFromObject ? item.$value : item, primitive = !isObject(value), frag = !init && this.getCachedFrag(value, i, key), frag ? (frag.reused = !0, frag.scope.$index = i, key && (frag.scope.$key = key), iterator && (frag.scope[iterator] = null !== key ? key : i), (trackByKey || convertedFromObject || primitive) && withoutConversion(function() {
                            frag.scope[alias] = value
                        })) : (frag = this.create(value, alias, i, key), frag.fresh = !init), frags[i] = frag, init && frag.before(end);
                        if (!init) {
                            var removalIndex = 0,
                                totalRemoved = oldFrags.length - frags.length;
                            for (this.vm._vForRemoving = !0, i = 0, l = oldFrags.length; i < l; i++) frag = oldFrags[i], frag.reused || (this.deleteCachedFrag(frag), this.remove(frag, removalIndex++, totalRemoved, inDocument));
                            this.vm._vForRemoving = !1, removalIndex && (this.vm._watchers = this.vm._watchers.filter(function(w) {
                                return w.active
                            }));
                            var targetPrev, prevEl, currentPrev, insertionIndex = 0;
                            for (i = 0, l = frags.length; i < l; i++) frag = frags[i], targetPrev = frags[i - 1], prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start, frag.reused && !frag.staggerCb ? (currentPrev = findPrevFrag(frag, start, this.id)) === targetPrev || currentPrev && findPrevFrag(currentPrev, start, this.id) === targetPrev || this.move(frag, prevEl) : this.insert(frag, insertionIndex++, prevEl, inDocument), frag.reused = frag.fresh = !1
                        }
                    },
                    create: function(value, alias, index, key) {
                        var host = this._host,
                            parentScope = this._scope || this.vm,
                            scope = Object.create(parentScope);
                        scope.$refs = Object.create(parentScope.$refs), scope.$els = Object.create(parentScope.$els), scope.$parent = parentScope, scope.$forContext = this, withoutConversion(function() {
                            defineReactive(scope, alias, value)
                        }), defineReactive(scope, "$index", index), key ? defineReactive(scope, "$key", key) : scope.$key && def(scope, "$key", null), this.iterator && defineReactive(scope, this.iterator, null !== key ? key : index);
                        var frag = this.factory.create(host, scope, this._frag);
                        return frag.forId = this.id, this.cacheFrag(value, frag, index, key), frag
                    },
                    updateRef: function() {
                        var ref = this.descriptor.ref;
                        if (ref) {
                            var refs, hash = (this._scope || this.vm).$refs;
                            this.fromObject ? (refs = {}, this.frags.forEach(function(frag) {
                                refs[frag.scope.$key] = findVmFromFrag(frag)
                            })) : refs = this.frags.map(findVmFromFrag), hash[ref] = refs
                        }
                    },
                    updateModel: function() {
                        if (this.isOption) {
                            var parent = this.start.parentNode,
                                model = parent && parent.__v_model;
                            model && model.forceUpdate()
                        }
                    },
                    insert: function(frag, index, prevEl, inDocument) {
                        frag.staggerCb && (frag.staggerCb.cancel(), frag.staggerCb = null);
                        var staggerAmount = this.getStagger(frag, index, null, "enter");
                        if (inDocument && staggerAmount) {
                            var anchor = frag.staggerAnchor;
                            anchor || (anchor = frag.staggerAnchor = createAnchor("stagger-anchor"), anchor.__v_frag = frag), after(anchor, prevEl);
                            var op = frag.staggerCb = cancellable(function() {
                                frag.staggerCb = null, frag.before(anchor), remove(anchor)
                            });
                            setTimeout(op, staggerAmount)
                        } else {
                            var target = prevEl.nextSibling;
                            target || (after(this.end, prevEl), target = this.end), frag.before(target)
                        }
                    },
                    remove: function(frag, index, total, inDocument) {
                        if (frag.staggerCb) return frag.staggerCb.cancel(), void(frag.staggerCb = null);
                        var staggerAmount = this.getStagger(frag, index, total, "leave");
                        if (inDocument && staggerAmount) {
                            var op = frag.staggerCb = cancellable(function() {
                                frag.staggerCb = null, frag.remove()
                            });
                            setTimeout(op, staggerAmount)
                        } else frag.remove()
                    },
                    move: function(frag, prevEl) {
                        prevEl.nextSibling || this.end.parentNode.appendChild(this.end), frag.before(prevEl.nextSibling, !1)
                    },
                    cacheFrag: function(value, frag, index, key) {
                        var id, trackByKey = this.params.trackBy,
                            cache = this.cache,
                            primitive = !isObject(value);
                        key || trackByKey || primitive ? (id = getTrackByKey(index, key, value, trackByKey), cache[id] ? "$index" !== trackByKey && "production" !== process.env.NODE_ENV && this.warnDuplicate(value) : cache[id] = frag) : (id = this.id, hasOwn(value, id) ? null === value[id] ? value[id] = frag : "production" !== process.env.NODE_ENV && this.warnDuplicate(value) : Object.isExtensible(value) ? def(value, id, frag) : "production" !== process.env.NODE_ENV && warn("Frozen v-for objects cannot be automatically tracked, make sure to provide a track-by key.")), frag.raw = value
                    },
                    getCachedFrag: function(value, index, key) {
                        var frag, trackByKey = this.params.trackBy,
                            primitive = !isObject(value);
                        if (key || trackByKey || primitive) {
                            var id = getTrackByKey(index, key, value, trackByKey);
                            frag = this.cache[id]
                        } else frag = value[this.id];
                        return frag && (frag.reused || frag.fresh) && "production" !== process.env.NODE_ENV && this.warnDuplicate(value), frag
                    },
                    deleteCachedFrag: function(frag) {
                        var value = frag.raw,
                            trackByKey = this.params.trackBy,
                            scope = frag.scope,
                            index = scope.$index,
                            key = hasOwn(scope, "$key") && scope.$key,
                            primitive = !isObject(value);
                        if (trackByKey || key || primitive) {
                            var id = getTrackByKey(index, key, value, trackByKey);
                            this.cache[id] = null
                        } else value[this.id] = null, frag.raw = null
                    },
                    getStagger: function(frag, index, total, type) {
                        type += "Stagger";
                        var trans = frag.node.__v_trans,
                            hooks = trans && trans.hooks,
                            hook = hooks && (hooks[type] || hooks.stagger);
                        return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10)
                    },
                    _preProcess: function(value) {
                        return this.rawValue = value, value
                    },
                    _postProcess: function(value) {
                        if (isArray(value)) return value;
                        if (isPlainObject(value)) {
                            for (var key, keys = Object.keys(value), i = keys.length, res = new Array(i); i--;) key = keys[i], res[i] = {
                                $key: key,
                                $value: value[key]
                            };
                            return res
                        }
                        return "number" != typeof value || isNaN(value) || (value = range(value)), value || []
                    },
                    unbind: function() {
                        if (this.descriptor.ref && ((this._scope || this.vm).$refs[this.descriptor.ref] = null), this.frags)
                            for (var frag, i = this.frags.length; i--;) frag = this.frags[i], this.deleteCachedFrag(frag), frag.destroy()
                    }
                };
            "production" !== process.env.NODE_ENV && (vFor.warnDuplicate = function(value) {
                warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if you are expecting duplicate values.', this.vm)
            });
            var vIf = {
                    priority: 2100,
                    terminal: !0,
                    bind: function() {
                        var el = this.el;
                        if (el.__vue__) "production" !== process.env.NODE_ENV && warn('v-if="' + this.expression + '" cannot be used on an instance root element.', this.vm), this.invalid = !0;
                        else {
                            var next = el.nextElementSibling;
                            next && null !== getAttr(next, "v-else") && (remove(next), this.elseEl = next), this.anchor = createAnchor("v-if"), replace(el, this.anchor)
                        }
                    },
                    update: function(value) {
                        this.invalid || (value ? this.frag || this.insert() : this.remove())
                    },
                    insert: function() {
                        this.elseFrag && (this.elseFrag.remove(), this.elseFrag = null), this.factory || (this.factory = new FragmentFactory(this.vm, this.el)), this.frag = this.factory.create(this._host, this._scope, this._frag), this.frag.before(this.anchor)
                    },
                    remove: function() {
                        this.frag && (this.frag.remove(), this.frag = null), this.elseEl && !this.elseFrag && (this.elseFactory || (this.elseFactory = new FragmentFactory(this.elseEl._context || this.vm, this.elseEl)), this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag), this.elseFrag.before(this.anchor))
                    },
                    unbind: function() {
                        this.frag && this.frag.destroy(), this.elseFrag && this.elseFrag.destroy()
                    }
                },
                show = {
                    bind: function() {
                        var next = this.el.nextElementSibling;
                        next && null !== getAttr(next, "v-else") && (this.elseEl = next)
                    },
                    update: function(value) {
                        this.apply(this.el, value), this.elseEl && this.apply(this.elseEl, !value)
                    },
                    apply: function(el, value) {
                        function toggle() {
                            el.style.display = value ? "" : "none"
                        }
                        inDoc(el) ? applyTransition(el, value ? 1 : -1, toggle, this.vm) : toggle()
                    }
                },
                text$2 = {
                    bind: function() {
                        var self = this,
                            el = this.el,
                            isRange = "range" === el.type,
                            lazy = this.params.lazy,
                            number = this.params.number,
                            debounce = this.params.debounce,
                            composing = !1;
                        if (isAndroid || isRange || (this.on("compositionstart", function() {
                                composing = !0
                            }), this.on("compositionend", function() {
                                composing = !1, lazy || self.listener()
                            })), this.focused = !1, isRange || lazy || (this.on("focus", function() {
                                self.focused = !0
                            }), this.on("blur", function() {
                                self.focused = !1, self._frag && !self._frag.inserted || self.rawListener()
                            })), this.listener = this.rawListener = function() {
                                if (!composing && self._bound) {
                                    var val = number || isRange ? toNumber(el.value) : el.value;
                                    self.set(val), nextTick(function() {
                                        self._bound && !self.focused && self.update(self._watcher.value)
                                    })
                                }
                            }, debounce && (this.listener = _debounce(this.listener, debounce)), this.hasjQuery = "function" == typeof jQuery, this.hasjQuery) {
                            var method = jQuery.fn.on ? "on" : "bind";
                            jQuery(el)[method]("change", this.rawListener), lazy || jQuery(el)[method]("input", this.listener)
                        } else this.on("change", this.rawListener), lazy || this.on("input", this.listener);
                        !lazy && isIE9 && (this.on("cut", function() {
                            nextTick(self.listener)
                        }), this.on("keyup", function(e) {
                            46 !== e.keyCode && 8 !== e.keyCode || self.listener()
                        })), (el.hasAttribute("value") || "TEXTAREA" === el.tagName && el.value.trim()) && (this.afterBind = this.listener)
                    },
                    update: function(value) {
                        (value = _toString(value)) !== this.el.value && (this.el.value = value)
                    },
                    unbind: function() {
                        var el = this.el;
                        if (this.hasjQuery) {
                            var method = jQuery.fn.off ? "off" : "unbind";
                            jQuery(el)[method]("change", this.listener), jQuery(el)[method]("input", this.listener)
                        }
                    }
                },
                radio = {
                    bind: function() {
                        var self = this,
                            el = this.el;
                        this.getValue = function() {
                            if (el.hasOwnProperty("_value")) return el._value;
                            var val = el.value;
                            return self.params.number && (val = toNumber(val)), val
                        }, this.listener = function() {
                            self.set(self.getValue())
                        }, this.on("change", this.listener), el.hasAttribute("checked") && (this.afterBind = this.listener)
                    },
                    update: function(value) {
                        this.el.checked = looseEqual(value, this.getValue())
                    }
                },
                select = {
                    bind: function() {
                        var _this = this,
                            self = this,
                            el = this.el;
                        this.forceUpdate = function() {
                            self._watcher && self.update(self._watcher.get())
                        };
                        var multiple = this.multiple = el.hasAttribute("multiple");
                        this.listener = function() {
                            var value = getValue(el, multiple);
                            value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value, self.set(value)
                        }, this.on("change", this.listener);
                        var initValue = getValue(el, multiple, !0);
                        (multiple && initValue.length || !multiple && null !== initValue) && (this.afterBind = this.listener), this.vm.$on("hook:attached", function() {
                            nextTick(_this.forceUpdate)
                        }), inDoc(el) || nextTick(this.forceUpdate)
                    },
                    update: function(value) {
                        var el = this.el;
                        el.selectedIndex = -1;
                        for (var op, val, multi = this.multiple && isArray(value), options = el.options, i = options.length; i--;) op = options[i], val = op.hasOwnProperty("_value") ? op._value : op.value, op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val)
                    },
                    unbind: function() {
                        this.vm.$off("hook:attached", this.forceUpdate)
                    }
                },
                checkbox = {
                    bind: function() {
                        function getBooleanValue() {
                            var val = el.checked;
                            return val && el.hasOwnProperty("_trueValue") ? el._trueValue : !val && el.hasOwnProperty("_falseValue") ? el._falseValue : val
                        }
                        var self = this,
                            el = this.el;
                        this.getValue = function() {
                            return el.hasOwnProperty("_value") ? el._value : self.params.number ? toNumber(el.value) : el.value
                        }, this.listener = function() {
                            var model = self._watcher.get();
                            if (isArray(model)) {
                                var val = self.getValue(),
                                    i = indexOf(model, val);
                                el.checked ? i < 0 && self.set(model.concat(val)) : i > -1 && self.set(model.slice(0, i).concat(model.slice(i + 1)))
                            } else self.set(getBooleanValue())
                        }, this.on("change", this.listener), el.hasAttribute("checked") && (this.afterBind = this.listener)
                    },
                    update: function(value) {
                        var el = this.el;
                        isArray(value) ? el.checked = indexOf(value, this.getValue()) > -1 : el.hasOwnProperty("_trueValue") ? el.checked = looseEqual(value, el._trueValue) : el.checked = !!value
                    }
                },
                handlers = {
                    text: text$2,
                    radio: radio,
                    select: select,
                    checkbox: checkbox
                },
                model = {
                    priority: 800,
                    twoWay: !0,
                    handlers: handlers,
                    params: ["lazy", "number", "debounce"],
                    bind: function() {
                        this.checkFilters(), this.hasRead && !this.hasWrite && "production" !== process.env.NODE_ENV && warn('It seems you are using a read-only filter with v-model="' + this.descriptor.raw + '". You might want to use a two-way filter to ensure correct behavior.', this.vm);
                        var handler, el = this.el,
                            tag = el.tagName;
                        if ("INPUT" === tag) handler = handlers[el.type] || handlers.text;
                        else if ("SELECT" === tag) handler = handlers.select;
                        else {
                            if ("TEXTAREA" !== tag) return void("production" !== process.env.NODE_ENV && warn("v-model does not support element type: " + tag, this.vm));
                            handler = handlers.text
                        }
                        el.__v_model = this, handler.bind.call(this), this.update = handler.update, this._unbind = handler.unbind
                    },
                    checkFilters: function() {
                        var filters = this.filters;
                        if (filters)
                            for (var i = filters.length; i--;) {
                                var filter = resolveAsset(this.vm.$options, "filters", filters[i].name);
                                ("function" == typeof filter || filter.read) && (this.hasRead = !0), filter.write && (this.hasWrite = !0)
                            }
                    },
                    unbind: function() {
                        this.el.__v_model = null, this._unbind && this._unbind()
                    }
                },
                keyCodes = {
                    esc: 27,
                    tab: 9,
                    enter: 13,
                    space: 32,
                    delete: [8, 46],
                    up: 38,
                    left: 37,
                    right: 39,
                    down: 40
                },
                on$1 = {
                    priority: 700,
                    acceptStatement: !0,
                    keyCodes: keyCodes,
                    bind: function() {
                        if ("IFRAME" === this.el.tagName && "load" !== this.arg) {
                            var self = this;
                            this.iframeBind = function() {
                                on(self.el.contentWindow, self.arg, self.handler, self.modifiers.capture)
                            }, this.on("load", this.iframeBind)
                        }
                    },
                    update: function(handler) {
                        if (this.descriptor.raw || (handler = function() {}), "function" != typeof handler) return void("production" !== process.env.NODE_ENV && warn("v-on:" + this.arg + '="' + this.expression + '" expects a function value, got ' + handler, this.vm));
                        this.modifiers.stop && (handler = stopFilter(handler)), this.modifiers.prevent && (handler = preventFilter(handler)), this.modifiers.self && (handler = selfFilter(handler));
                        var keys = Object.keys(this.modifiers).filter(function(key) {
                            return "stop" !== key && "prevent" !== key && "self" !== key && "capture" !== key
                        });
                        keys.length && (handler = keyFilter(handler, keys)), this.reset(), this.handler = handler, this.iframeBind ? this.iframeBind() : on(this.el, this.arg, this.handler, this.modifiers.capture)
                    },
                    reset: function() {
                        var el = this.iframeBind ? this.el.contentWindow : this.el;
                        this.handler && off(el, this.arg, this.handler)
                    },
                    unbind: function() {
                        this.reset()
                    }
                },
                prefixes = ["-webkit-", "-moz-", "-ms-"],
                camelPrefixes = ["Webkit", "Moz", "ms"],
                importantRE = /!important;?$/,
                propCache = Object.create(null),
                testEl = null,
                style = {
                    deep: !0,
                    update: function(value) {
                        "string" == typeof value ? this.el.style.cssText = value : isArray(value) ? this.handleObject(value.reduce(extend, {})) : this.handleObject(value || {})
                    },
                    handleObject: function(value) {
                        var name, val, cache = this.cache || (this.cache = {});
                        for (name in cache) name in value || (this.handleSingle(name, null), delete cache[name]);
                        for (name in value)(val = value[name]) !== cache[name] && (cache[name] = val, this.handleSingle(name, val))
                    },
                    handleSingle: function(prop, value) {
                        if (prop = normalize(prop))
                            if (null != value && (value += ""), value) {
                                var isImportant = importantRE.test(value) ? "important" : "";
                                isImportant ? ("production" !== process.env.NODE_ENV && warn("It's probably a bad idea to use !important with inline rules. This feature will be deprecated in a future version of Vue."), value = value.replace(importantRE, "").trim(), this.el.style.setProperty(prop.kebab, value, isImportant)) : this.el.style[prop.camel] = value
                            } else this.el.style[prop.camel] = ""
                    }
                },
                xlinkRE = /^xlink:/,
                disallowedInterpAttrRE = /^v-|^:|^@|^(?:is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/,
                attrWithPropsRE = /^(?:value|checked|selected|muted)$/,
                enumeratedAttrRE = /^(?:draggable|contenteditable|spellcheck)$/,
                modelProps = {
                    value: "_value",
                    "true-value": "_trueValue",
                    "false-value": "_falseValue"
                },
                bind$1 = {
                    priority: 850,
                    bind: function() {
                        var attr = this.arg,
                            tag = this.el.tagName;
                        attr || (this.deep = !0);
                        var descriptor = this.descriptor,
                            tokens = descriptor.interp;
                        if (tokens && (descriptor.hasOneTime && (this.expression = tokensToExp(tokens, this._scope || this.vm)), (disallowedInterpAttrRE.test(attr) || "name" === attr && ("PARTIAL" === tag || "SLOT" === tag)) && ("production" !== process.env.NODE_ENV && warn(attr + '="' + descriptor.raw + '": attribute interpolation is not allowed in Vue.js directives and special attributes.', this.vm), this.el.removeAttribute(attr), this.invalid = !0), "production" !== process.env.NODE_ENV)) {
                            var raw = attr + '="' + descriptor.raw + '": ';
                            "src" === attr && warn(raw + 'interpolation in "src" attribute will cause a 404 request. Use v-bind:src instead.', this.vm), "style" === attr && warn(raw + 'interpolation in "style" attribute will cause the attribute to be discarded in Internet Explorer. Use v-bind:style instead.', this.vm)
                        }
                    },
                    update: function(value) {
                        if (!this.invalid) {
                            var attr = this.arg;
                            this.arg ? this.handleSingle(attr, value) : this.handleObject(value || {})
                        }
                    },
                    handleObject: style.handleObject,
                    handleSingle: function(attr, value) {
                        var el = this.el,
                            interp = this.descriptor.interp;
                        if (this.modifiers.camel && (attr = camelize(attr)), !interp && attrWithPropsRE.test(attr) && attr in el) {
                            var attrValue = "value" === attr && null == value ? "" : value;
                            el[attr] !== attrValue && (el[attr] = attrValue)
                        }
                        var modelProp = modelProps[attr];
                        if (!interp && modelProp) {
                            el[modelProp] = value;
                            var model = el.__v_model;
                            model && model.listener()
                        }
                        if ("value" === attr && "TEXTAREA" === el.tagName) return void el.removeAttribute(attr);
                        enumeratedAttrRE.test(attr) ? el.setAttribute(attr, value ? "true" : "false") : null != value && !1 !== value ? "class" === attr ? (el.__v_trans && (value += " " + el.__v_trans.id + "-transition"), setClass(el, value)) : xlinkRE.test(attr) ? el.setAttributeNS("http://www.w3.org/1999/xlink", attr, !0 === value ? "" : value) : el.setAttribute(attr, !0 === value ? "" : value) : el.removeAttribute(attr)
                    }
                },
                el = {
                    priority: 1500,
                    bind: function() {
                        if (this.arg) {
                            var id = this.id = camelize(this.arg),
                                refs = (this._scope || this.vm).$els;
                            hasOwn(refs, id) ? refs[id] = this.el : defineReactive(refs, id, this.el)
                        }
                    },
                    unbind: function() {
                        var refs = (this._scope || this.vm).$els;
                        refs[this.id] === this.el && (refs[this.id] = null)
                    }
                },
                ref = {
                    bind: function() {
                        "production" !== process.env.NODE_ENV && warn("v-ref:" + this.arg + " must be used on a child component. Found on <" + this.el.tagName.toLowerCase() + ">.", this.vm)
                    }
                },
                cloak = {
                    bind: function() {
                        var el = this.el;
                        this.vm.$once("pre-hook:compiled", function() {
                            el.removeAttribute("v-cloak")
                        })
                    }
                },
                directives = {
                    text: text$1,
                    html: html,
                    for: vFor,
                    if: vIf,
                    show: show,
                    model: model,
                    on: on$1,
                    bind: bind$1,
                    el: el,
                    ref: ref,
                    cloak: cloak
                },
                vClass = {
                    deep: !0,
                    update: function(value) {
                        value ? "string" == typeof value ? this.setClass(value.trim().split(/\s+/)) : this.setClass(normalize$1(value)) : this.cleanup()
                    },
                    setClass: function(value) {
                        this.cleanup(value);
                        for (var i = 0, l = value.length; i < l; i++) {
                            var val = value[i];
                            val && apply(this.el, val, addClass)
                        }
                        this.prevKeys = value
                    },
                    cleanup: function(value) {
                        var prevKeys = this.prevKeys;
                        if (prevKeys)
                            for (var i = prevKeys.length; i--;) {
                                var key = prevKeys[i];
                                (!value || value.indexOf(key) < 0) && apply(this.el, key, removeClass)
                            }
                    }
                },
                component = {
                    priority: 1500,
                    params: ["keep-alive", "transition-mode", "inline-template"],
                    bind: function() {
                        this.el.__vue__ ? "production" !== process.env.NODE_ENV && warn('cannot mount component "' + this.expression + '" on already mounted element: ' + this.el) : (this.keepAlive = this.params.keepAlive, this.keepAlive && (this.cache = {}), this.params.inlineTemplate && (this.inlineTemplate = extractContent(this.el, !0)), this.pendingComponentCb = this.Component = null, this.pendingRemovals = 0, this.pendingRemovalCb = null, this.anchor = createAnchor("v-component"), replace(this.el, this.anchor), this.el.removeAttribute("is"), this.el.removeAttribute(":is"), this.descriptor.ref && this.el.removeAttribute("v-ref:" + hyphenate(this.descriptor.ref)), this.literal && this.setComponent(this.expression))
                    },
                    update: function(value) {
                        this.literal || this.setComponent(value)
                    },
                    setComponent: function(value, cb) {
                        if (this.invalidatePending(), value) {
                            var self = this;
                            this.resolveComponent(value, function() {
                                self.mountComponent(cb)
                            })
                        } else this.unbuild(!0), this.remove(this.childVM, cb), this.childVM = null
                    },
                    resolveComponent: function(value, cb) {
                        var self = this;
                        this.pendingComponentCb = cancellable(function(Component) {
                            self.ComponentName = Component.options.name || ("string" == typeof value ? value : null), self.Component = Component, cb()
                        }), this.vm._resolveComponent(value, this.pendingComponentCb)
                    },
                    mountComponent: function(cb) {
                        this.unbuild(!0);
                        var self = this,
                            activateHooks = this.Component.options.activate,
                            cached = this.getCached(),
                            newComponent = this.build();
                        activateHooks && !cached ? (this.waitingFor = newComponent, callActivateHooks(activateHooks, newComponent, function() {
                            self.waitingFor === newComponent && (self.waitingFor = null, self.transition(newComponent, cb))
                        })) : (cached && newComponent._updateRef(), this.transition(newComponent, cb))
                    },
                    invalidatePending: function() {
                        this.pendingComponentCb && (this.pendingComponentCb.cancel(), this.pendingComponentCb = null)
                    },
                    build: function(extraOptions) {
                        var cached = this.getCached();
                        if (cached) return cached;
                        if (this.Component) {
                            var options = {
                                name: this.ComponentName,
                                el: cloneNode(this.el),
                                template: this.inlineTemplate,
                                parent: this._host || this.vm,
                                _linkerCachable: !this.inlineTemplate,
                                _ref: this.descriptor.ref,
                                _asComponent: !0,
                                _isRouterView: this._isRouterView,
                                _context: this.vm,
                                _scope: this._scope,
                                _frag: this._frag
                            };
                            extraOptions && extend(options, extraOptions);
                            var child = new this.Component(options);
                            return this.keepAlive && (this.cache[this.Component.cid] = child), "production" !== process.env.NODE_ENV && this.el.hasAttribute("transition") && child._isFragment && warn("Transitions will not work on a fragment instance. Template: " + child.$options.template, child), child
                        }
                    },
                    getCached: function() {
                        return this.keepAlive && this.cache[this.Component.cid]
                    },
                    unbuild: function(defer) {
                        this.waitingFor && (this.keepAlive || this.waitingFor.$destroy(), this.waitingFor = null);
                        var child = this.childVM;
                        if (!child || this.keepAlive) return void(child && (child._inactive = !0, child._updateRef(!0)));
                        child.$destroy(!1, defer)
                    },
                    remove: function(child, cb) {
                        var keepAlive = this.keepAlive;
                        if (child) {
                            this.pendingRemovals++, this.pendingRemovalCb = cb;
                            var self = this;
                            child.$remove(function() {
                                self.pendingRemovals--, keepAlive || child._cleanup(), !self.pendingRemovals && self.pendingRemovalCb && (self.pendingRemovalCb(), self.pendingRemovalCb = null)
                            })
                        } else cb && cb()
                    },
                    transition: function(target, cb) {
                        var self = this,
                            current = this.childVM;
                        switch (current && (current._inactive = !0), target._inactive = !1, this.childVM = target, self.params.transitionMode) {
                            case "in-out":
                                target.$before(self.anchor, function() {
                                    self.remove(current, cb)
                                });
                                break;
                            case "out-in":
                                self.remove(current, function() {
                                    target.$before(self.anchor, cb)
                                });
                                break;
                            default:
                                self.remove(current), target.$before(self.anchor, cb)
                        }
                    },
                    unbind: function() {
                        if (this.invalidatePending(), this.unbuild(), this.cache) {
                            for (var key in this.cache) this.cache[key].$destroy();
                            this.cache = null
                        }
                    }
                },
                propBindingModes = config._propBindingModes,
                empty = {},
                identRE$1 = /^[$_a-zA-Z]+[\w$]*$/,
                settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/,
                bindingModes = config._propBindingModes,
                propDef = {
                    bind: function() {
                        var child = this.vm,
                            parent = child._context,
                            prop = this.descriptor.prop,
                            childKey = prop.path,
                            parentKey = prop.parentPath,
                            twoWay = prop.mode === bindingModes.TWO_WAY,
                            parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function(val) {
                                updateProp(child, prop, val)
                            }, {
                                twoWay: twoWay,
                                filters: prop.filters,
                                scope: this._scope
                            });
                        if (initProp(child, prop, parentWatcher.value), twoWay) {
                            var self = this;
                            child.$once("pre-hook:created", function() {
                                self.childWatcher = new Watcher(child, childKey, function(val) {
                                    parentWatcher.set(val)
                                }, {
                                    sync: !0
                                })
                            })
                        }
                    },
                    unbind: function() {
                        this.parentWatcher.teardown(), this.childWatcher && this.childWatcher.teardown()
                    }
                },
                queue$1 = [],
                queued = !1,
                TYPE_TRANSITION = "transition",
                TYPE_ANIMATION = "animation",
                transDurationProp = transitionProp + "Duration",
                animDurationProp = animationProp + "Duration",
                raf = inBrowser && window.requestAnimationFrame,
                waitForTransitionStart = raf ? function(fn) {
                    raf(function() {
                        raf(fn)
                    })
                } : function(fn) {
                    setTimeout(fn, 50)
                },
                p$1 = Transition.prototype;
            p$1.enter = function(op, cb) {
                this.cancelPending(), this.callHook("beforeEnter"), this.cb = cb, addClass(this.el, this.enterClass), op(), this.entered = !1, this.callHookWithCb("enter"), this.entered || (this.cancel = this.hooks && this.hooks.enterCancelled, pushJob(this.enterNextTick))
            }, p$1.enterNextTick = function() {
                var _this = this;
                this.justEntered = !0, waitForTransitionStart(function() {
                    _this.justEntered = !1
                });
                var enterDone = this.enterDone,
                    type = this.getCssTransitionType(this.enterClass);
                this.pendingJsCb ? type === TYPE_TRANSITION && removeClass(this.el, this.enterClass) : type === TYPE_TRANSITION ? (removeClass(this.el, this.enterClass), this.setupCssCb(transitionEndEvent, enterDone)) : type === TYPE_ANIMATION ? this.setupCssCb(animationEndEvent, enterDone) : enterDone()
            }, p$1.enterDone = function() {
                this.entered = !0, this.cancel = this.pendingJsCb = null, removeClass(this.el, this.enterClass), this.callHook("afterEnter"), this.cb && this.cb()
            }, p$1.leave = function(op, cb) {
                this.cancelPending(), this.callHook("beforeLeave"), this.op = op, this.cb = cb, addClass(this.el, this.leaveClass), this.left = !1, this.callHookWithCb("leave"), this.left || (this.cancel = this.hooks && this.hooks.leaveCancelled, this.op && !this.pendingJsCb && (this.justEntered ? this.leaveDone() : pushJob(this.leaveNextTick)))
            }, p$1.leaveNextTick = function() {
                var type = this.getCssTransitionType(this.leaveClass);
                if (type) {
                    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
                    this.setupCssCb(event, this.leaveDone)
                } else this.leaveDone()
            }, p$1.leaveDone = function() {
                this.left = !0, this.cancel = this.pendingJsCb = null, this.op(), removeClass(this.el, this.leaveClass), this.callHook("afterLeave"), this.cb && this.cb(), this.op = null
            }, p$1.cancelPending = function() {
                this.op = this.cb = null;
                var hasPending = !1;
                this.pendingCssCb && (hasPending = !0, off(this.el, this.pendingCssEvent, this.pendingCssCb), this.pendingCssEvent = this.pendingCssCb = null), this.pendingJsCb && (hasPending = !0, this.pendingJsCb.cancel(), this.pendingJsCb = null), hasPending && (removeClass(this.el, this.enterClass), removeClass(this.el, this.leaveClass)), this.cancel && (this.cancel.call(this.vm, this.el), this.cancel = null)
            }, p$1.callHook = function(type) {
                this.hooks && this.hooks[type] && this.hooks[type].call(this.vm, this.el)
            }, p$1.callHookWithCb = function(type) {
                var hook = this.hooks && this.hooks[type];
                hook && (hook.length > 1 && (this.pendingJsCb = cancellable(this[type + "Done"])), hook.call(this.vm, this.el, this.pendingJsCb))
            }, p$1.getCssTransitionType = function(className) {
                if (!(!transitionEndEvent || document.hidden || this.hooks && !1 === this.hooks.css || isHidden(this.el))) {
                    var type = this.type || this.typeCache[className];
                    if (type) return type;
                    var inlineStyles = this.el.style,
                        computedStyles = window.getComputedStyle(this.el),
                        transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
                    if (transDuration && "0s" !== transDuration) type = TYPE_TRANSITION;
                    else {
                        var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
                        animDuration && "0s" !== animDuration && (type = TYPE_ANIMATION)
                    }
                    return type && (this.typeCache[className] = type), type
                }
            }, p$1.setupCssCb = function(event, cb) {
                this.pendingCssEvent = event;
                var self = this,
                    el = this.el,
                    onEnd = this.pendingCssCb = function(e) {
                        e.target === el && (off(el, event, onEnd), self.pendingCssEvent = self.pendingCssCb = null, !self.pendingJsCb && cb && cb())
                    };
                on(el, event, onEnd)
            };
            var transition$1 = {
                    priority: 1100,
                    update: function(id, oldId) {
                        var el = this.el,
                            hooks = resolveAsset(this.vm.$options, "transitions", id);
                        id = id || "v", oldId = oldId || "v", el.__v_trans = new Transition(el, id, hooks, this.vm), removeClass(el, oldId + "-transition"), addClass(el, id + "-transition")
                    }
                },
                internalDirectives = {
                    style: style,
                    class: vClass,
                    component: component,
                    prop: propDef,
                    transition: transition$1
                },
                bindRE = /^v-bind:|^:/,
                onRE = /^v-on:|^@/,
                dirAttrRE = /^v-([^:]+)(?:$|:(.*)$)/,
                modifierRE = /\.[^\.]+/g,
                transitionRE = /^(v-bind:|:)?transition$/,
                DEFAULT_PRIORITY = 1e3,
                DEFAULT_TERMINAL_PRIORITY = 2e3;
            skip.terminal = !0;
            var specialCharRE = /[^\w\-:\.]/,
                compiler = Object.freeze({
                    compile: compile,
                    compileAndLinkProps: compileAndLinkProps,
                    compileRoot: compileRoot,
                    transclude: transclude,
                    resolveSlots: resolveSlots
                }),
                eventRE = /^v-on:|^@/;
            Directive.prototype._bind = function() {
                var name = this.name,
                    descriptor = this.descriptor;
                if (("cloak" !== name || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
                    var attr = descriptor.attr || "v-" + name;
                    this.el.removeAttribute(attr)
                }
                var def = descriptor.def;
                if ("function" == typeof def ? this.update = def : extend(this, def), this._setupParams(), this.bind && this.bind(), this._bound = !0, this.literal) this.update && this.update(descriptor.raw);
                else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
                    var dir = this;
                    this.update ? this._update = function(val, oldVal) {
                        dir._locked || dir.update(val, oldVal)
                    } : this._update = noop$1;
                    var preProcess = this._preProcess ? bind(this._preProcess, this) : null,
                        postProcess = this._postProcess ? bind(this._postProcess, this) : null,
                        watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, {
                            filters: this.filters,
                            twoWay: this.twoWay,
                            deep: this.deep,
                            preProcess: preProcess,
                            postProcess: postProcess,
                            scope: this._scope
                        });
                    this.afterBind ? this.afterBind() : this.update && this.update(watcher.value)
                }
            }, Directive.prototype._setupParams = function() {
                if (this.params) {
                    var params = this.params;
                    this.params = Object.create(null);
                    for (var key, val, mappedKey, i = params.length; i--;) key = hyphenate(params[i]), mappedKey = camelize(key), val = getBindAttr(this.el, key), null != val ? this._setupParamWatcher(mappedKey, val) : null != (val = getAttr(this.el, key)) && (this.params[mappedKey] = "" === val || val)
                }
            }, Directive.prototype._setupParamWatcher = function(key, expression) {
                var self = this,
                    called = !1,
                    unwatch = (this._scope || this.vm).$watch(expression, function(val, oldVal) {
                        if (self.params[key] = val, called) {
                            var cb = self.paramWatchers && self.paramWatchers[key];
                            cb && cb.call(self, val, oldVal)
                        } else called = !0
                    }, {
                        immediate: !0,
                        user: !1
                    });
                (this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch)
            }, Directive.prototype._checkStatement = function() {
                var expression = this.expression;
                if (expression && this.acceptStatement && !isSimplePath(expression)) {
                    var fn = parseExpression$1(expression).get,
                        scope = this._scope || this.vm,
                        handler = function(e) {
                            scope.$event = e, fn.call(scope, scope), scope.$event = null
                        };
                    return this.filters && (handler = scope._applyFilters(handler, null, this.filters)), this.update(handler), !0
                }
            }, Directive.prototype.set = function(value) {
                this.twoWay ? this._withLock(function() {
                    this._watcher.set(value)
                }) : "production" !== process.env.NODE_ENV && warn("Directive.set() can only be used inside twoWaydirectives.")
            }, Directive.prototype._withLock = function(fn) {
                var self = this;
                self._locked = !0, fn.call(self), nextTick(function() {
                    self._locked = !1
                })
            }, Directive.prototype.on = function(event, handler, useCapture) {
                on(this.el, event, handler, useCapture), (this._listeners || (this._listeners = [])).push([event, handler])
            }, Directive.prototype._teardown = function() {
                if (this._bound) {
                    this._bound = !1, this.unbind && this.unbind(), this._watcher && this._watcher.teardown();
                    var i, listeners = this._listeners;
                    if (listeners)
                        for (i = listeners.length; i--;) off(this.el, listeners[i][0], listeners[i][1]);
                    var unwatchFns = this._paramUnwatchFns;
                    if (unwatchFns)
                        for (i = unwatchFns.length; i--;) unwatchFns[i]();
                    "production" !== process.env.NODE_ENV && this.el && this.el._vue_directives.$remove(this), this.vm = this.el = this._watcher = this._listeners = null
                }
            };
            var filterRE$1 = /[^|]\|[^|]/;
            ! function(Vue) {
                Vue.prototype._init = function(options) {
                    options = options || {}, this.$el = null, this.$parent = options.parent, this.$root = this.$parent ? this.$parent.$root : this, this.$children = [], this.$refs = {}, this.$els = {}, this._watchers = [], this._directives = [], this._uid = uid++, this._isVue = !0, this._events = {}, this._eventsCount = {}, this._isFragment = !1, this._fragment = this._fragmentStart = this._fragmentEnd = null, this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = this._vForRemoving = !1, this._unlinkFn = null, this._context = options._context || this.$parent, this._scope = options._scope, this._frag = options._frag, this._frag && this._frag.children.push(this), this.$parent && this.$parent.$children.push(this), options = this.$options = mergeOptions(this.constructor.options, options, this), this._updateRef(), this._data = {}, this._callHook("init"), this._initState(), this._initEvents(), this._callHook("created"), options.el && this.$mount(options.el)
                }
            }(Vue),
            function(Vue) {
                function noop() {}

                function makeComputedGetter(getter, owner) {
                    var watcher = new Watcher(owner, getter, null, {
                        lazy: !0
                    });
                    return function() {
                        return watcher.dirty && watcher.evaluate(), Dep.target && watcher.depend(), watcher.value
                    }
                }
                Object.defineProperty(Vue.prototype, "$data", {
                    get: function() {
                        return this._data
                    },
                    set: function(newData) {
                        newData !== this._data && this._setData(newData)
                    }
                }), Vue.prototype._initState = function() {
                    this._initProps(), this._initMeta(), this._initMethods(), this._initData(), this._initComputed()
                }, Vue.prototype._initProps = function() {
                    var options = this.$options,
                        el = options.el,
                        props = options.props;
                    props && !el && "production" !== process.env.NODE_ENV && warn("Props will not be compiled if no `el` option is provided at instantiation.", this), el = options.el = query(el), this._propsUnlinkFn = el && 1 === el.nodeType && props ? compileAndLinkProps(this, el, props, this._scope) : null
                }, Vue.prototype._initData = function() {
                    var dataFn = this.$options.data,
                        data = this._data = dataFn ? dataFn() : {};
                    isPlainObject(data) || (data = {}, "production" !== process.env.NODE_ENV && warn("data functions should return an object.", this));
                    var i, key, props = this._props,
                        keys = Object.keys(data);
                    for (i = keys.length; i--;) key = keys[i], props && hasOwn(props, key) ? "production" !== process.env.NODE_ENV && warn('Data field "' + key + '" is already defined as a prop. To provide default value for a prop, use the "default" prop option; if you want to pass prop values to an instantiation call, use the "propsData" option.', this) : this._proxy(key);
                    observe(data, this)
                }, Vue.prototype._setData = function(newData) {
                    newData = newData || {};
                    var oldData = this._data;
                    this._data = newData;
                    var keys, key, i;
                    for (keys = Object.keys(oldData), i = keys.length; i--;)(key = keys[i]) in newData || this._unproxy(key);
                    for (keys = Object.keys(newData), i = keys.length; i--;) key = keys[i], hasOwn(this, key) || this._proxy(key);
                    oldData.__ob__.removeVm(this), observe(newData, this), this._digest()
                }, Vue.prototype._proxy = function(key) {
                    if (!isReserved(key)) {
                        var self = this;
                        Object.defineProperty(self, key, {
                            configurable: !0,
                            enumerable: !0,
                            get: function() {
                                return self._data[key]
                            },
                            set: function(val) {
                                self._data[key] = val
                            }
                        })
                    }
                }, Vue.prototype._unproxy = function(key) {
                    isReserved(key) || delete this[key]
                }, Vue.prototype._digest = function() {
                    for (var i = 0, l = this._watchers.length; i < l; i++) this._watchers[i].update(!0)
                }, Vue.prototype._initComputed = function() {
                    var computed = this.$options.computed;
                    if (computed)
                        for (var key in computed) {
                            var userDef = computed[key],
                                def = {
                                    enumerable: !0,
                                    configurable: !0
                                };
                            "function" == typeof userDef ? (def.get = makeComputedGetter(userDef, this), def.set = noop) : (def.get = userDef.get ? !1 !== userDef.cache ? makeComputedGetter(userDef.get, this) : bind(userDef.get, this) : noop, def.set = userDef.set ? bind(userDef.set, this) : noop), Object.defineProperty(this, key, def)
                        }
                }, Vue.prototype._initMethods = function() {
                    var methods = this.$options.methods;
                    if (methods)
                        for (var key in methods) this[key] = bind(methods[key], this)
                }, Vue.prototype._initMeta = function() {
                    var metas = this.$options._meta;
                    if (metas)
                        for (var key in metas) defineReactive(this, key, metas[key])
                }
            }(Vue),
            function(Vue) {
                function registerComponentEvents(vm, el) {
                    for (var name, value, handler, attrs = el.attributes, i = 0, l = attrs.length; i < l; i++) name = attrs[i].name, eventRE.test(name) && (name = name.replace(eventRE, ""), value = attrs[i].value, isSimplePath(value) && (value += ".apply(this, $arguments)"), handler = (vm._scope || vm._context).$eval(value, !0), handler._fromParent = !0, vm.$on(name.replace(eventRE), handler))
                }

                function registerCallbacks(vm, action, hash) {
                    if (hash) {
                        var handlers, key, i, j;
                        for (key in hash)
                            if (handlers = hash[key], isArray(handlers))
                                for (i = 0, j = handlers.length; i < j; i++) register(vm, action, key, handlers[i]);
                            else register(vm, action, key, handlers)
                    }
                }

                function register(vm, action, key, handler, options) {
                    var type = typeof handler;
                    if ("function" === type) vm[action](key, handler, options);
                    else if ("string" === type) {
                        var methods = vm.$options.methods,
                            method = methods && methods[handler];
                        method ? vm[action](key, method, options) : "production" !== process.env.NODE_ENV && warn('Unknown method: "' + handler + '" when registering callback for ' + action + ': "' + key + '".', vm)
                    } else handler && "object" === type && register(vm, action, key, handler.handler, handler)
                }

                function onAttached() {
                    this._isAttached || (this._isAttached = !0, this.$children.forEach(callAttach))
                }

                function callAttach(child) {
                    !child._isAttached && inDoc(child.$el) && child._callHook("attached")
                }

                function onDetached() {
                    this._isAttached && (this._isAttached = !1, this.$children.forEach(callDetach))
                }

                function callDetach(child) {
                    child._isAttached && !inDoc(child.$el) && child._callHook("detached")
                }
                Vue.prototype._initEvents = function() {
                    var options = this.$options;
                    options._asComponent && registerComponentEvents(this, options.el), registerCallbacks(this, "$on", options.events), registerCallbacks(this, "$watch", options.watch)
                }, Vue.prototype._initDOMHooks = function() {
                    this.$on("hook:attached", onAttached), this.$on("hook:detached", onDetached)
                }, Vue.prototype._callHook = function(hook) {
                    this.$emit("pre-hook:" + hook);
                    var handlers = this.$options[hook];
                    if (handlers)
                        for (var i = 0, j = handlers.length; i < j; i++) handlers[i].call(this);
                    this.$emit("hook:" + hook)
                }
            }(Vue),
            function(Vue) {
                Vue.prototype._updateRef = function(remove) {
                    var ref = this.$options._ref;
                    if (ref) {
                        var refs = (this._scope || this._context).$refs;
                        remove ? refs[ref] === this && (refs[ref] = null) : refs[ref] = this
                    }
                }, Vue.prototype._compile = function(el) {
                    var options = this.$options,
                        original = el;
                    if (el = transclude(el, options), this._initElement(el), 1 !== el.nodeType || null === getAttr(el, "v-pre")) {
                        var contextOptions = this._context && this._context.$options,
                            rootLinker = compileRoot(el, options, contextOptions);
                        resolveSlots(this, options._content);
                        var contentLinkFn, ctor = this.constructor;
                        options._linkerCachable && ((contentLinkFn = ctor.linker) || (contentLinkFn = ctor.linker = compile(el, options)));
                        var rootUnlinkFn = rootLinker(this, el, this._scope),
                            contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);
                        this._unlinkFn = function() {
                            rootUnlinkFn(), contentUnlinkFn(!0)
                        }, options.replace && replace(original, el), this._isCompiled = !0, this._callHook("compiled")
                    }
                }, Vue.prototype._initElement = function(el) {
                    isFragment(el) ? (this._isFragment = !0, this.$el = this._fragmentStart = el.firstChild, this._fragmentEnd = el.lastChild, 3 === this._fragmentStart.nodeType && (this._fragmentStart.data = this._fragmentEnd.data = ""), this._fragment = el) : this.$el = el, this.$el.__vue__ = this, this._callHook("beforeCompile")
                }, Vue.prototype._bindDir = function(descriptor, node, host, scope, frag) {
                    this._directives.push(new Directive(descriptor, this, node, host, scope, frag))
                }, Vue.prototype._destroy = function(remove, deferCleanup) {
                    if (this._isBeingDestroyed) return void(deferCleanup || this._cleanup());
                    var destroyReady, pendingRemoval, self = this,
                        cleanupIfPossible = function() {
                            !destroyReady || pendingRemoval || deferCleanup || self._cleanup()
                        };
                    remove && this.$el && (pendingRemoval = !0, this.$remove(function() {
                        pendingRemoval = !1, cleanupIfPossible()
                    })), this._callHook("beforeDestroy"), this._isBeingDestroyed = !0;
                    var i, parent = this.$parent;
                    for (parent && !parent._isBeingDestroyed && (parent.$children.$remove(this), this._updateRef(!0)), i = this.$children.length; i--;) this.$children[i].$destroy();
                    for (this._propsUnlinkFn && this._propsUnlinkFn(), this._unlinkFn && this._unlinkFn(), i = this._watchers.length; i--;) this._watchers[i].teardown();
                    this.$el && (this.$el.__vue__ = null), destroyReady = !0, cleanupIfPossible()
                }, Vue.prototype._cleanup = function() {
                    this._isDestroyed || (this._frag && this._frag.children.$remove(this), this._data && this._data.__ob__ && this._data.__ob__.removeVm(this), this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null, this._isDestroyed = !0, this._callHook("destroyed"), this.$off())
                }
            }(Vue),
            function(Vue) {
                Vue.prototype._applyFilters = function(value, oldValue, filters, write) {
                    var filter, fn, args, arg, offset, i, l, j, k;
                    for (i = 0, l = filters.length; i < l; i++)
                        if (filter = filters[write ? l - i - 1 : i], (fn = resolveAsset(this.$options, "filters", filter.name, !0)) && "function" == typeof(fn = write ? fn.write : fn.read || fn)) {
                            if (args = write ? [value, oldValue] : [value], offset = write ? 2 : 1, filter.args)
                                for (j = 0, k = filter.args.length; j < k; j++) arg = filter.args[j], args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
                            value = fn.apply(this, args)
                        }
                    return value
                }, Vue.prototype._resolveComponent = function(value, cb) {
                    var factory;
                    if (factory = "function" == typeof value ? value : resolveAsset(this.$options, "components", value, !0))
                        if (factory.options) cb(factory);
                        else if (factory.resolved) cb(factory.resolved);
                    else if (factory.requested) factory.pendingCallbacks.push(cb);
                    else {
                        factory.requested = !0;
                        var cbs = factory.pendingCallbacks = [cb];
                        factory.call(this, function(res) {
                            isPlainObject(res) && (res = Vue.extend(res)), factory.resolved = res;
                            for (var i = 0, l = cbs.length; i < l; i++) cbs[i](res)
                        }, function(reason) {
                            "production" !== process.env.NODE_ENV && warn("Failed to resolve async component" + ("string" == typeof value ? ": " + value : "") + ". " + (reason ? "\nReason: " + reason : ""))
                        })
                    }
                }
            }(Vue),
            function(Vue) {
                function clean(obj) {
                    return JSON.parse(JSON.stringify(obj))
                }
                Vue.prototype.$get = function(exp, asStatement) {
                    var res = parseExpression$1(exp);
                    if (res) {
                        if (asStatement) {
                            var self = this;
                            return function() {
                                self.$arguments = toArray(arguments);
                                var result = res.get.call(self, self);
                                return self.$arguments = null, result
                            }
                        }
                        try {
                            return res.get.call(this, this)
                        } catch (e) {}
                    }
                }, Vue.prototype.$set = function(exp, val) {
                    var res = parseExpression$1(exp, !0);
                    res && res.set && res.set.call(this, this, val)
                }, Vue.prototype.$delete = function(key) {
                    del(this._data, key)
                }, Vue.prototype.$watch = function(expOrFn, cb, options) {
                    var parsed, vm = this;
                    "string" == typeof expOrFn && (parsed = parseDirective(expOrFn), expOrFn = parsed.expression);
                    var watcher = new Watcher(vm, expOrFn, cb, {
                        deep: options && options.deep,
                        sync: options && options.sync,
                        filters: parsed && parsed.filters,
                        user: !options || !1 !== options.user
                    });
                    return options && options.immediate && cb.call(vm, watcher.value),
                        function() {
                            watcher.teardown()
                        }
                }, Vue.prototype.$eval = function(text, asStatement) {
                    if (filterRE$1.test(text)) {
                        var dir = parseDirective(text),
                            val = this.$get(dir.expression, asStatement);
                        return dir.filters ? this._applyFilters(val, null, dir.filters) : val
                    }
                    return this.$get(text, asStatement)
                }, Vue.prototype.$interpolate = function(text) {
                    var tokens = parseText(text),
                        vm = this;
                    return tokens ? 1 === tokens.length ? vm.$eval(tokens[0].value) + "" : tokens.map(function(token) {
                        return token.tag ? vm.$eval(token.value) : token.value
                    }).join("") : text
                }, Vue.prototype.$log = function(path) {
                    var data = path ? getPath(this._data, path) : this._data;
                    if (data && (data = clean(data)), !path) {
                        var key;
                        for (key in this.$options.computed) data[key] = clean(this[key]);
                        if (this._props)
                            for (key in this._props) data[key] = clean(this[key])
                    }
                    console.log(data)
                }
            }(Vue),
            function(Vue) {
                function insert(vm, target, cb, withTransition, op1, op2) {
                    target = query(target);
                    var targetIsDetached = !inDoc(target),
                        op = !1 === withTransition || targetIsDetached ? op1 : op2,
                        shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
                    return vm._isFragment ? (mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function(node) {
                        op(node, target, vm)
                    }), cb && cb()) : op(vm.$el, target, vm, cb), shouldCallHook && vm._callHook("attached"), vm
                }

                function query(el) {
                    return "string" == typeof el ? document.querySelector(el) : el
                }

                function append(el, target, vm, cb) {
                    target.appendChild(el), cb && cb()
                }

                function beforeWithCb(el, target, vm, cb) {
                    before(el, target), cb && cb()
                }

                function removeWithCb(el, vm, cb) {
                    remove(el), cb && cb()
                }
                Vue.prototype.$nextTick = function(fn) {
                    nextTick(fn, this)
                }, Vue.prototype.$appendTo = function(target, cb, withTransition) {
                    return insert(this, target, cb, withTransition, append, appendWithTransition)
                }, Vue.prototype.$prependTo = function(target, cb, withTransition) {
                    return target = query(target), target.hasChildNodes() ? this.$before(target.firstChild, cb, withTransition) : this.$appendTo(target, cb, withTransition), this
                }, Vue.prototype.$before = function(target, cb, withTransition) {
                    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition)
                }, Vue.prototype.$after = function(target, cb, withTransition) {
                    return target = query(target), target.nextSibling ? this.$before(target.nextSibling, cb, withTransition) : this.$appendTo(target.parentNode, cb, withTransition), this
                }, Vue.prototype.$remove = function(cb, withTransition) {
                    if (!this.$el.parentNode) return cb && cb();
                    var inDocument = this._isAttached && inDoc(this.$el);
                    inDocument || (withTransition = !1);
                    var self = this,
                        realCb = function() {
                            inDocument && self._callHook("detached"), cb && cb()
                        };
                    return this._isFragment ? removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb) : (!1 === withTransition ? removeWithCb : removeWithTransition)(this.$el, this, realCb), this
                }
            }(Vue),
            function(Vue) {
                function modifyListenerCount(vm, event, count) {
                    var parent = vm.$parent;
                    if (parent && count && !hookRE.test(event))
                        for (; parent;) parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count, parent = parent.$parent
                }
                Vue.prototype.$on = function(event, fn) {
                    return (this._events[event] || (this._events[event] = [])).push(fn), modifyListenerCount(this, event, 1), this
                }, Vue.prototype.$once = function(event, fn) {
                    function on() {
                        self.$off(event, on), fn.apply(this, arguments)
                    }
                    var self = this;
                    return on.fn = fn, this.$on(event, on), this
                }, Vue.prototype.$off = function(event, fn) {
                    var cbs;
                    if (!arguments.length) {
                        if (this.$parent)
                            for (event in this._events)(cbs = this._events[event]) && modifyListenerCount(this, event, -cbs.length);
                        return this._events = {}, this
                    }
                    if (!(cbs = this._events[event])) return this;
                    if (1 === arguments.length) return modifyListenerCount(this, event, -cbs.length), this._events[event] = null, this;
                    for (var cb, i = cbs.length; i--;)
                        if ((cb = cbs[i]) === fn || cb.fn === fn) {
                            modifyListenerCount(this, event, -1), cbs.splice(i, 1);
                            break
                        }
                    return this
                }, Vue.prototype.$emit = function(event) {
                    var isSource = "string" == typeof event;
                    event = isSource ? event : event.name;
                    var cbs = this._events[event],
                        shouldPropagate = isSource || !cbs;
                    if (cbs) {
                        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
                        var hasParentCbs = isSource && cbs.some(function(cb) {
                            return cb._fromParent
                        });
                        hasParentCbs && (shouldPropagate = !1);
                        for (var args = toArray(arguments, 1), i = 0, l = cbs.length; i < l; i++) {
                            var cb = cbs[i];
                            !0 !== cb.apply(this, args) || hasParentCbs && !cb._fromParent || (shouldPropagate = !0)
                        }
                    }
                    return shouldPropagate
                }, Vue.prototype.$broadcast = function(event) {
                    var isSource = "string" == typeof event;
                    if (event = isSource ? event : event.name, this._eventsCount[event]) {
                        var children = this.$children,
                            args = toArray(arguments);
                        isSource && (args[0] = {
                            name: event,
                            source: this
                        });
                        for (var i = 0, l = children.length; i < l; i++) {
                            var child = children[i];
                            child.$emit.apply(child, args) && child.$broadcast.apply(child, args)
                        }
                        return this
                    }
                }, Vue.prototype.$dispatch = function(event) {
                    var shouldPropagate = this.$emit.apply(this, arguments);
                    if (shouldPropagate) {
                        var parent = this.$parent,
                            args = toArray(arguments);
                        for (args[0] = {
                                name: event,
                                source: this
                            }; parent;) shouldPropagate = parent.$emit.apply(parent, args), parent = shouldPropagate ? parent.$parent : null;
                        return this
                    }
                };
                var hookRE = /^hook:/
            }(Vue),
            function(Vue) {
                function ready() {
                    this._isAttached = !0, this._isReady = !0, this._callHook("ready")
                }
                Vue.prototype.$mount = function(el) {
                    return this._isCompiled ? void("production" !== process.env.NODE_ENV && warn("$mount() should be called only once.", this)) : (el = query(el), el || (el = document.createElement("div")), this._compile(el), this._initDOMHooks(), inDoc(this.$el) ? (this._callHook("attached"), ready.call(this)) : this.$once("hook:attached", ready), this)
                }, Vue.prototype.$destroy = function(remove, deferCleanup) {
                    this._destroy(remove, deferCleanup)
                }, Vue.prototype.$compile = function(el, host, scope, frag) {
                    return compile(el, this.$options, !0)(this, el, host, scope, frag)
                }
            }(Vue);
            var slot = {
                    priority: 2300,
                    params: ["name"],
                    bind: function() {
                        var name = this.params.name || "default",
                            content = this.vm._slotContents && this.vm._slotContents[name];
                        content && content.hasChildNodes() ? this.compile(content.cloneNode(!0), this.vm._context, this.vm) : this.fallback()
                    },
                    compile: function(content, context, host) {
                        if (content && context) {
                            if (this.el.hasChildNodes() && 1 === content.childNodes.length && 1 === content.childNodes[0].nodeType && content.childNodes[0].hasAttribute("v-if")) {
                                var elseBlock = document.createElement("template");
                                elseBlock.setAttribute("v-else", ""), elseBlock.innerHTML = this.el.innerHTML, elseBlock._context = this.vm, content.appendChild(elseBlock)
                            }
                            var scope = host ? host._scope : this._scope;
                            this.unlink = context.$compile(content, host, scope, this._frag)
                        }
                        content ? replace(this.el, content) : remove(this.el)
                    },
                    fallback: function() {
                        this.compile(extractContent(this.el, !0), this.vm)
                    },
                    unbind: function() {
                        this.unlink && this.unlink()
                    }
                },
                partial = {
                    priority: 1750,
                    params: ["name"],
                    paramWatchers: {
                        name: function(value) {
                            vIf.remove.call(this), value && this.insert(value)
                        }
                    },
                    bind: function() {
                        this.anchor = createAnchor("v-partial"), replace(this.el, this.anchor), this.insert(this.params.name)
                    },
                    insert: function(id) {
                        var partial = resolveAsset(this.vm.$options, "partials", id, !0);
                        partial && (this.factory = new FragmentFactory(this.vm, partial), vIf.insert.call(this))
                    },
                    unbind: function() {
                        this.frag && this.frag.destroy()
                    }
                },
                elementDirectives = {
                    slot: slot,
                    partial: partial
                },
                convertArray = vFor._postProcess,
                digitsRE = /(\d{3})(?=\d)/g,
                filters = {
                    orderBy: orderBy,
                    filterBy: filterBy,
                    limitBy: limitBy,
                    json: {
                        read: function(value, indent) {
                            return "string" == typeof value ? value : JSON.stringify(value, null, arguments.length > 1 ? indent : 2)
                        },
                        write: function(value) {
                            try {
                                return JSON.parse(value)
                            } catch (e) {
                                return value
                            }
                        }
                    },
                    capitalize: function(value) {
                        return value || 0 === value ? (value = value.toString(), value.charAt(0).toUpperCase() + value.slice(1)) : ""
                    },
                    uppercase: function(value) {
                        return value || 0 === value ? value.toString().toUpperCase() : ""
                    },
                    lowercase: function(value) {
                        return value || 0 === value ? value.toString().toLowerCase() : ""
                    },
                    currency: function(value, _currency, decimals) {
                        if (value = parseFloat(value), !isFinite(value) || !value && 0 !== value) return "";
                        _currency = null != _currency ? _currency : "$", decimals = null != decimals ? decimals : 2;
                        var stringified = Math.abs(value).toFixed(decimals),
                            _int = decimals ? stringified.slice(0, -1 - decimals) : stringified,
                            i = _int.length % 3,
                            head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? "," : "") : "",
                            _float = decimals ? stringified.slice(-1 - decimals) : "";
                        return (value < 0 ? "-" : "") + _currency + head + _int.slice(i).replace(digitsRE, "$1,") + _float
                    },
                    pluralize: function(value) {
                        var args = toArray(arguments, 1),
                            length = args.length;
                        if (length > 1) {
                            var index = value % 10 - 1;
                            return index in args ? args[index] : args[length - 1]
                        }
                        return args[0] + (1 === value ? "" : "s")
                    },
                    debounce: function(handler, delay) {
                        if (handler) return delay || (delay = 300), _debounce(handler, delay)
                    }
                };
            ! function(Vue) {
                function createClass(name) {
                    return new Function("return function " + classify(name) + " (options) { this._init(options) }")()
                }
                Vue.options = {
                    directives: directives,
                    elementDirectives: elementDirectives,
                    filters: filters,
                    transitions: {},
                    components: {},
                    partials: {},
                    replace: !0
                }, Vue.util = util, Vue.config = config, Vue.set = set, Vue.delete = del, Vue.nextTick = nextTick, Vue.compiler = compiler, Vue.FragmentFactory = FragmentFactory, Vue.internalDirectives = internalDirectives, Vue.parsers = {
                    path: path,
                    text: text,
                    template: template,
                    directive: directive,
                    expression: expression
                }, Vue.cid = 0;
                var cid = 1;
                Vue.extend = function(extendOptions) {
                    extendOptions = extendOptions || {};
                    var Super = this,
                        isFirstExtend = 0 === Super.cid;
                    if (isFirstExtend && extendOptions._Ctor) return extendOptions._Ctor;
                    var name = extendOptions.name || Super.options.name;
                    "production" !== process.env.NODE_ENV && (/^[a-zA-Z][\w-]*$/.test(name) || (warn('Invalid component name: "' + name + '". Component names can only contain alphanumeric characaters and the hyphen.'), name = null));
                    var Sub = createClass(name || "VueComponent");
                    return Sub.prototype = Object.create(Super.prototype), Sub.prototype.constructor = Sub, Sub.cid = cid++, Sub.options = mergeOptions(Super.options, extendOptions), Sub.super = Super, Sub.extend = Super.extend, config._assetTypes.forEach(function(type) {
                        Sub[type] = Super[type]
                    }), name && (Sub.options.components[name] = Sub), isFirstExtend && (extendOptions._Ctor = Sub), Sub
                }, Vue.use = function(plugin) {
                    if (!plugin.installed) {
                        var args = toArray(arguments, 1);
                        return args.unshift(this), "function" == typeof plugin.install ? plugin.install.apply(plugin, args) : plugin.apply(null, args), plugin.installed = !0, this
                    }
                }, Vue.mixin = function(mixin) {
                    Vue.options = mergeOptions(Vue.options, mixin)
                }, config._assetTypes.forEach(function(type) {
                    Vue[type] = function(id, definition) {
                        return definition ? ("production" !== process.env.NODE_ENV && "component" === type && (commonTagRE.test(id) || reservedTagRE.test(id)) && warn("Do not use built-in or reserved HTML elements as component id: " + id), "component" === type && isPlainObject(definition) && (definition.name || (definition.name = id), definition = Vue.extend(definition)), this.options[type + "s"][id] = definition, definition) : this.options[type + "s"][id]
                    }
                }), extend(Vue.transition, transition)
            }(Vue), Vue.version = "1.0.28", setTimeout(function() {
                config.devtools && (devtools ? devtools.emit("init", Vue) : "production" !== process.env.NODE_ENV && inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent) && console.log("Download the Vue Devtools for a better development experience:\nhttps://github.com/vuejs/vue-devtools"))
            }, 0), module.exports = Vue
        }).call(this, require("_process"))
    }, {
        _process: 38
    }],
    42: [function(require, module, exports) {
        var inserted = exports.cache = {};
        exports.insert = function(css) {
            if (!inserted[css]) {
                inserted[css] = !0;
                var elem = document.createElement("style");
                return elem.setAttribute("type", "text/css"), "textContent" in elem ? elem.textContent = css : elem.styleSheet.cssText = css, document.getElementsByTagName("head")[0].appendChild(elem), elem
            }
        }
    }, {}]
}, {}, [5]);
