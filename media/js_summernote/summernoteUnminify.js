! function (a) {
    "use strict";
    var b = navigator.appVersion.indexOf("Mac") > -1,
        c = navigator.userAgent.indexOf("MSIE") > -1,
        d = function () {
            var a = function (a) {
                return function (b) {
                    return a === b
                }
            }, b = function (a, b) {
                    return a === b
                }, c = function () {
                    return !1
                };
            return {
                eq: a,
                eq2: b,
                fail: c
            }
        }(),
        e = function () {
            var a = function (a) {
                return a[0]
            }, b = function (a) {
                    return a[a.length - 1]
                }, c = function (a) {
                    return a.slice(0, a.length - 1)
                }, d = function (a) {
                    return a.slice(1)
                }, e = function (c, e) {
                    if (0 === c.length) return [];
                    var f = d(c);
                    return f.reduce(function (a, c) {
                        var d = b(a);
                        return e(b(d), c) ? d[d.length] = c : a[a.length] = [c], a
                    }, [
                        [a(c)]
                    ])
                }, f = function (a) {
                    for (var b = [], c = 0, d = a.length; d > c; c++) a[c] && b.push(a[c]);
                    return b
                };
            return {
                head: a,
                last: b,
                initial: c,
                tail: d,
                compact: f,
                clusterBy: e
            }
        }(),
        f = function () {
            var b = function (a) {
                return function (b) {
                    return b && b.nodeName === a
                }
            }, c = function (a) {
                    return a && /^P|^LI|^H[1-7]/.test(a.nodeName)
                }, f = function (a) {
                    return a && /^UL|^OL/.test(a.nodeName)
                }, g = function (b) {
                    return b && a(b).hasClass("note-editable")
                }, h = function (b) {
                    return b && a(b).hasClass("note-control-sizing")
                }, i = function (a, b) {
                    for (; a;) {
                        if (b(a)) return a;
                        a = a.parentNode
                    }
                    return null
                }, j = function (a, b) {
                    b = b || d.fail;
                    var c = [];
                    return i(a, function (a) {
                        return c.push(a), b(a)
                    }), c
                }, k = function (b, c) {
                    for (var d = j(b), e = c; e; e = e.parentNode)
                        if (a.inArray(e, d) > -1) return e;
                    return null
                }, l = function (a, b) {
                    for (var c, d = [], e = k(a, b), f = document.createNodeIterator(e, NodeFilter.SHOW_ALL, null, !1), g = !1;
                        (c = f.nextNode()) && (a === c && (g = !0), g && d.push(c), b !== c););
                    return d
                }, m = function (a, b) {
                    b = b || d.fail;
                    for (var c = []; a && (c.push(a), a !== b);) a = a.nextSibling;
                    return c
                }, n = function (a, b) {
                    var c = b.nextSibling,
                        d = b.parentNode;
                    return c ? d.insertBefore(a, c) : d.appendChild(a), a
                }, o = function (b, c) {
                    return a.each(c, function (a, c) {
                        b.appendChild(c)
                    }), b
                }, p = b("#text"),
                q = function (a) {
                    return p(a) ? a.nodeValue.length : a.childNodes.length
                }, r = function (a) {
                    for (var b = 0; a = a.previousSibling;) b += 1;
                    return b
                }, s = function (b, c) {
                    var f = e.initial(j(c, d.eq(b)));
                    return a.map(f, r).reverse()
                }, t = function (a, b) {
                    for (var c = a, d = 0, e = b.length; e > d; d++) c = c.childNodes[b[d]];
                    return c
                }, u = function (a, b) {
                    if (0 === b) return a;
                    if (b >= q(a)) return a.nextSibling;
                    if (p(a)) return a.splitText(b);
                    var c = a.childNodes[b];
                    return a = n(a.cloneNode(!1), a), o(a, m(c))
                }, v = function (a, b, c) {
                    var e = j(b, d.eq(a));
                    return 1 === e.length ? u(b, c) : e.reduce(function (a, d) {
                        var e = d.cloneNode(!1);
                        return n(e, d), a === b && (a = u(a, c)), o(e, m(a)), e
                    })
                };
            return {
                isText: p,
                isPara: c,
                isList: f,
                isEditable: g,
                isControlSizing: h,
                isAnchor: b("A"),
                isDiv: b("DIV"),
                isSpan: b("SPAN"),
                isB: b("B"),
                isU: b("U"),
                isS: b("S"),
                isI: b("I"),
                isImg: b("IMG"),
                ancestor: i,
                listAncestor: j,
                listNext: m,
                commonAncestor: k,
                listBetween: l,
                insertAfter: n,
                position: r,
                makeOffsetPath: s,
                fromOffsetPath: t,
                split: v
            }
        }(),
        g = !! document.createRange,
        h = function (b, c, h, i) {
            if (0 === arguments.length && document.getSelection) {
                var j = document.getSelection().getRangeAt(0);
                b = j.startContainer, c = j.startOffset, h = j.endContainer, i = j.endOffset
            }
            this.sc = b, this.so = c, this.ec = h, this.eo = i;
            var k = function () {
                if (g) {
                    var a = document.createRange();
                    return a.setStart(b, c), a.setEnd(h, i), a
                }
            };
            this.select = function () {
                var a = k();
                if (g) {
                    var b = document.getSelection();
                    b.rangeCount > 0 && b.removeAllRanges(), b.addRange(a)
                }
            }, this.listPara = function () {
                var c = f.listBetween(b, h),
                    g = e.compact(a.map(c, function (a) {
                        return f.ancestor(a, f.isPara)
                    }));
                return a.map(e.clusterBy(g, d.eq2), e.head)
            }, this.isOnList = function () {
                var a = f.ancestor(b, f.isList),
                    c = f.ancestor(h, f.isList);
                return a && a === c
            }, this.isOnAnchor = function () {
                var a = f.ancestor(b, f.isAnchor),
                    c = f.ancestor(h, f.isAnchor);
                return a && a === c
            }, this.isCollapsed = function () {
                return b === h && c === i
            }, this.insertNode = function (a) {
                var b = k();
                g && b.insertNode(a)
            }, this.surroundContents = function (b) {
                var c = a("<" + b + " />")[0],
                    d = k();
                return g && d.surroundContents(c), c
            }, this.toString = function () {
                var a = k();
                return g ? a.toString() : void 0
            }, this.bookmark = function (a) {
                return {
                    s: {
                        path: f.makeOffsetPath(a, b),
                        offset: c
                    },
                    e: {
                        path: f.makeOffsetPath(a, h),
                        offset: i
                    }
                }
            }
        }, i = function (a, b) {
            return new h(f.fromOffsetPath(a, b.s.path), b.s.offset, f.fromOffsetPath(a, b.e.path), b.e.offset)
        }, j = function () {
            this.styleFont = function (b, c) {
                var d = b.surroundContents("span");
                a.each(c, function (a, b) {
                    d.style[a] = b
                })
            }, this.stylePara = function (b, c) {
                var d = b.listPara();
                a.each(d, function (b, d) {
                    a.each(c, function (a, b) {
                        d.style[a] = b
                    })
                })
            }, this.current = function (b, c) {
                var d = a(f.isText(b.sc) ? b.sc.parentNode : b.sc),
                    e = d.css(["font-size", "font-weight", "font-style", "text-decoration", "text-align", "list-style-type", "line-height"]) || {};
                if (e["font-size"] = parseInt(e["font-size"]), isNaN(parseInt(e["font-weight"])) || (e["font-weight"] = e["font-weight"] > 400 ? "bold" : "normal"), b.isOnList()) {
                    var g = ["circle", "disc", "disc-leading-zero", "square"],
                        h = a.inArray(e["list-style-type"], g) > -1;
                    e["list-style"] = h ? "unordered" : "ordered"
                } else e["list-style"] = "none";
                var i = f.ancestor(b.sc, f.isPara);
                if (i && i.style["line-height"]) e["line-height"] = i.style.lineHeight;
                else {
                    var j = parseInt(e["line-height"]) / parseInt(e["font-size"]);
                    e["line-height"] = j.toFixed(1)
                }
                return e.image = f.isImg(c) && c, e.anchor = b.isOnAnchor() && f.ancestor(b.sc, f.isAnchor), e.aAncestor = f.listAncestor(b.sc, f.isEditable), e
            }
        }, k = function () {
            var a = [],
                b = [],
                c = function (a) {
                    var b = a[0],
                        c = new h;
                    return {
                        contents: a.html(),
                        bookmark: c.bookmark(b),
                        scrollTop: a.scrollTop()
                    }
                }, d = function (a, b) {
                    a.html(b.contents).scrollTop(b.scrollTop), i(a[0], b.bookmark).select()
                };
            this.undo = function (e) {
                var f = c(e);
                0 !== a.length && (d(e, a.pop()), b.push(f))
            }, this.redo = function (e) {
                var f = c(e);
                0 !== b.length && (d(e, b.pop()), a.push(f))
            }, this.recordUndo = function (d) {
                b = [], a.push(c(d))
            }
        }, l = function () {
            var b = new j;
            this.currentStyle = function (a) {
                return 0 == document.getSelection().rangeCount ? null : b.current(new h, a)
            }, this.undo = function (a) {
                a.data("NoteHistory").undo(a)
            }, this.redo = function (a) {
                a.data("NoteHistory").redo(a)
            };
            for (var d = this.recordUndo = function (a) {
                a.data("NoteHistory").recordUndo(a)
            }, e = ["bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "insertOrderedList", "insertUnorderedList", "indent", "outdent", "formatBlock", "removeFormat", "backColor", "foreColor", "insertImage", "insertHorizontalRule"], g = 0, i = e.length; i > g; g++) this[e[g]] = function (a) {
                return function (b, c) {
                    d(b), document.execCommand(a, !1, c)
                }
            }(e[g]);
            this.tab = function (a) {
                var b = new h;
                return b.isOnList() || !b.isCollapsed() ? this.indent(a) : void 0
            }, this.fontSize = function (a, b) {
                d(a), document.execCommand("fontSize", !1, 3);
                var c = a.find("font[size=3]");
                c.removeAttr("size").css("font-size", b + "px")
            }, this.lineHeight = function (a, c) {
                d(a), b.stylePara(new h, {
                    lineHeight: c
                })
            }, this.unlink = function (a) {
                var b = new h;
                if (b.isOnAnchor()) {
                    d(a);
                    var c = f.ancestor(b.sc, f.isAnchor);
                    b = new h(c, 0, c, 1), b.select(), document.execCommand("unlink")
                }
            }, this.setLinkDialog = function (a, b) {
                var c = new h;
                if (c.isOnAnchor()) {
                    var e = f.ancestor(c.sc, f.isAnchor);
                    c = new h(e, 0, e, 1)
                }
                b({
                    range: c,
                    text: c.toString(),
                    url: c.isOnAnchor() ? f.ancestor(c.sc, f.isAnchor).href : ""
                }, function (b) {
                    c.select(), d(a), 0 !== b.toLowerCase().indexOf("http://") && (b = "http://" + b), document.execCommand("createlink", !1, b)
                })
            }, this.color = function (a, b) {
                var c = JSON.parse(b);
                this.foreColor(a, c.foreColor), this.backColor(a, c.backColor)
            }, this.insertTable = function (b, e) {
                d(b);
                for (var f, g = e.split("x"), i = g[0], j = g[1], k = [], l = c ? "&nbsp;" : "<br/>", m = 0; i > m; m++) k.push("<td>" + l + "</td>");
                f = k.join("");
                for (var n, o = [], p = 0; j > p; p++) o.push("<tr>" + f + "</tr>");
                n = o.join("");
                var q = '<table class="table table-bordered">' + n + "</table>";
                (new h).insertNode(a(q)[0])
            }, this.float = function (a, b, c) {
                d(a), c.style.cssFloat = b
            }, this.resize = function (a, b, c) {
                d(a), c.style.width = a.width() * b + "px", c.style.height = ""
            }, this.resizeTo = function (a, b) {
                b.style.width = a.x + "px", b.style.height = a.y + "px"
            }
        }, m = function () {
            this.update = function (b, c) {
                var d = function (b, c) {
                    b.find(".dropdown-menu li a").each(function () {
                        var b = a(this).attr("data-value") == c;
                        this.className = b ? "checked" : ""
                    })
                }, e = b.find(".note-fontsize");
                e.find(".note-current-fontsize").html(c["font-size"]), d(e, parseFloat(c["font-size"]));
                var f = b.find(".note-line-height");
                d(f, parseFloat(c["line-height"]));
                var g = function (a, c) {
                    var d = b.find(a);
                    d[c() ? "addClass" : "removeClass"]("active")
                };
                g('button[data-event="bold"]', function () {
                    return "bold" === c["font-weight"]
                }), g('button[data-event="italic"]', function () {
                    return "italic" === c["font-style"]
                }), g('button[data-event="underline"]', function () {
                    return "underline" === c["text-decoration"]
                }), g('button[data-event="justifyLeft"]', function () {
                    return "left" === c["text-align"] || "start" === c["text-align"]
                }), g('button[data-event="justifyCenter"]', function () {
                    return "center" === c["text-align"]
                }), g('button[data-event="justifyRight"]', function () {
                    return "right" === c["text-align"]
                }), g('button[data-event="justifyFull"]', function () {
                    return "justify" === c["text-align"]
                }), g('button[data-event="insertUnorderedList"]', function () {
                    return "unordered" === c["list-style"]
                }), g('button[data-event="insertOrderedList"]', function () {
                    return "ordered" === c["list-style"]
                })
            }, this.updateRecentColor = function (b, c, d) {
                var e = a(b).closest(".note-color"),
                    f = e.find(".note-recent-color"),
                    g = JSON.parse(f.attr("data-value"));
                g[c] = d, f.attr("data-value", JSON.stringify(g));
                var h = "backColor" === c ? "background-color" : "color";
                f.find("i").css(h, d)
            }
        }, n = function () {
            this.update = function (b, c) {
                var d = b.find(".note-link-popover"),
                    e = b.find(".note-image-popover");
                if (c.anchor) {
                    var f = d.find("a");
                    f.attr("href", c.anchor.href).html(c.anchor.href);
                    var g = c.anchor.getBoundingClientRect();
                    d.css({
                        display: "block",
                        left: g.left,
                        top: a(document).scrollTop() + g.bottom
                    })
                } else d.hide(); if (c.image) {
                    var g = c.image.getBoundingClientRect();
                    e.css({
                        display: "block",
                        left: g.left,
                        top: a(document).scrollTop() + g.bottom
                    })
                } else e.hide()
            }, this.hide = function (a) {
                a.children().hide()
            }
        }, o = function () {
            this.update = function (b, c) {
                var d = b.find(".note-control-selection");
                if (c.image) {
                    var e = c.image.getBoundingClientRect();
                    d.css({
                        display: "block",
                        left: e.left + "px",
                        top: a(document).scrollTop() + e.top + "px",
                        width: e.width + "px",
                        height: e.height + "px"
                    }).data("target", c.image);
                    var f = e.width + "x" + e.height;
                    d.find(".note-control-selection-info").text(f)
                } else d.hide()
            }, this.hide = function (a) {
                a.children().hide()
            }
        }, p = function () {
            this.showImageDialog = function (b, c, d) {
                var e = b.find(".note-image-dialog"),
                    f = b.find(".note-dropzone"),
                    g = b.find(".note-image-input");
                e.on("shown", function () {
                    f.on("dragenter dragover dragleave", !1), f.on("drop", function (a) {
                        c(a), e.modal("hide")
                    }), g.on("change", function () {
                        d(this.files), a(this).val(""), e.modal("hide")
                    })
                }).on("hidden", function () {
                    f.off("dragenter dragover dragleave drop"), g.off("change")
                }).modal("show")
            }, this.showLinkDialog = function (a, b, c) {
                var d = a.find(".note-link-dialog"),
                    e = d.find(".note-link-text"),
                    f = d.find(".note-link-url"),
                    g = d.find(".note-link-btn");
                d.on("shown", function () {
                    e.html(b.text), f.val(b.url).keyup(function () {
                        f.val() ? g.removeClass("disabled").attr("disabled", !1) : g.addClass("disabled").attr("disabled", !0), b.text || e.html(f.val())
                    }).trigger("focus"), g.click(function (a) {
                        d.modal("hide"), c(f.val()), a.preventDefault()
                    })
                }).on("hidden", function () {
                    f.off("keyup"), d.off("shown hidden"), g.off("click")
                }).modal("show")
            }
        }, q = function () {
            var c = new l,
                d = new m,
                e = new n,
                g = new o,
                h = new p,
                i = {
                    BACKSPACE: 8,
                    TAB: 9,
                    ENTER: 13,
                    SPACE: 32,
                    NUM0: 48,
                    NUM1: 49,
                    NUM4: 52,
                    NUM7: 55,
                    NUM8: 56,
                    B: 66,
                    E: 69,
                    I: 73,
                    J: 74,
                    K: 75,
                    L: 76,
                    R: 82,
                    U: 85,
                    Y: 89,
                    Z: 90,
                    BACKSLACH: 220
                }, j = function (b) {
                    var c = a(b).closest(".note-editor");
                    return {
                        editor: function () {
                            return c
                        },
                        editable: function () {
                            return c.find(".note-editable")
                        },
                        toolbar: function () {
                            return c.find(".note-toolbar")
                        },
                        popover: function () {
                            return c.find(".note-popover")
                        },
                        handle: function () {
                            return c.find(".note-handle")
                        },
                        dialog: function () {
                            return c.find(".note-dialog")
                        }
                    }
                }, k = function (a) {
                    var d = b ? a.metaKey : a.ctrlKey,
                        e = a.shiftKey,
                        f = a.keyCode,
                        g = d || e || f === i.TAB,
                        k = g ? j(a.target) : null;
                    if (d && (e && f === i.Z || f === i.Y)) c.redo(k.editable());
                    else if (d && f === i.Z) c.undo(k.editable());
                    else if (d && f === i.B) c.bold(k.editable());
                    else if (d && f === i.I) c.italic(k.editable());
                    else if (d && f === i.U) c.underline(k.editable());
                    else if (d && f === i.BACKSLACH) c.removeFormat(k.editable());
                    else if (d && f === i.K) c.setLinkDialog(k.editable(), function (a, b) {
                        h.showLinkDialog(k.dialog(), a, b)
                    });
                    else if (d && e && f === i.L) c.justifyLeft(k.editable());
                    else if (d && e && f === i.E) c.justifyCenter(k.editable());
                    else if (d && e && f === i.R) c.justifyRight(k.editable());
                    else if (d && e && f === i.J) c.justifyFull(k.editable());
                    else if (d && e && f === i.NUM7) c.insertUnorderedList(k.editable());
                    else if (d && e && f === i.NUM8) c.insertOrderedList(k.editable());
                    else if (e && f === i.TAB) c.outdent(k.editable());
                    else if (f === i.TAB) c.tab(k.editable());
                    else if (d && f === i.NUM0) c.formatBlock(k.editable(), "P");
                    else if (d && i.NUM1 <= f && f <= i.NUM4) {
                        var l = "H" + String.fromCharCode(f);
                        c.formatBlock(k.editable(), l)
                    } else {
                        if (!d || f !== i.ENTER) return (f === i.BACKSPACE || f === i.ENTER || f === i.SPACE) && c.recordUndo(j(a.target).editable()), void 0;
                        c.insertHorizontalRule(k.editable())
                    }
                    a.preventDefault()
                }, q = function (b, d) {
                    a.each(d, function (a, d) {
                        var e = new FileReader;
                        e.onload = function (a) {
                            c.insertImage(b, a.target.result)
                        }, e.readAsDataURL(d)
                    })
                }, r = function (a) {
                    var b = a.originalEvent.dataTransfer;
                    if (b && b.files) {
                        var c = j(a.currentTarget || a.target);
                        q(c.editable(), b.files)
                    }
                    a.stopPropagation(), a.preventDefault()
                }, s = function (a) {
                    f.isImg(a.target) && a.preventDefault()
                }, t = function (a) {
                    var b = j(a.currentTarget || a.target),
                        f = c.currentStyle(a.target);
                    f && (d.update(b.toolbar(), f), e.update(b.popover(), f), g.update(b.handle(), f))
                }, u = function (a) {
                    var b = j(a.currentTarget || a.target);
                    e.hide(b.popover()), g.hide(b.handle())
                }, v = function (b) {
                    if (f.isControlSizing(b.target)) {
                        var d, h = j(b.target),
                            i = h.handle(),
                            k = h.popover(),
                            l = h.editable(),
                            m = h.editor(),
                            n = i.find(".note-control-selection").data("target"),
                            o = a(n).offset(),
                            p = a(document).scrollTop();
                        m.on("mousemove", function (a) {
                            d = {
                                x: a.clientX - o.left,
                                y: a.clientY - (o.top - p)
                            }, c.resizeTo(d, n), g.update(i, {
                                image: n
                            }), e.update(k, {
                                image: n
                            })
                        }).on("mouseup", function () {
                            m.off("mousemove").off("mouseup")
                        }), c.recordUndo(l), b.stopPropagation(), b.preventDefault()
                    }
                }, w = function (b) {
                    var c = a(b.target).closest("[data-event]");
                    c.length > 0 && b.preventDefault()
                }, x = function (b) {
                    var e = a(b.target).closest("[data-event]");
                    if (e.length > 0) {
                        var f, g = e.attr("data-event"),
                            i = e.attr("data-value"),
                            k = j(b.target),
                            l = k.dialog(),
                            m = k.editable();
                        if (-1 !== a.inArray(g, ["resize", "float"])) {
                            var n = k.handle(),
                                o = n.find(".note-control-selection");
                            f = o.data("target")
                        }
                        c[g] && (m.trigger("focus"), c[g](m, i, f)), -1 !== a.inArray(g, ["backColor", "foreColor"]) ? d.updateRecentColor(e[0], g, i) : "showLinkDialog" === g ? c.setLinkDialog(m, function (a, b) {
                            h.showLinkDialog(l, a, b)
                        }) : "showImageDialog" === g && h.showImageDialog(l, r, function (a) {
                            q(m, a)
                        }), t(b)
                    }
                }, y = 18,
                z = function (b) {
                    var c, d = a(b.target.parentNode),
                        e = d.next(),
                        f = d.find(".note-dimension-picker-mousecatcher"),
                        g = d.find(".note-dimension-picker-highlighted"),
                        h = d.find(".note-dimension-picker-unhighlighted");
                    if (void 0 === b.offsetX) {
                        var i = a(b.target).offset();
                        c = {
                            x: b.pageX - i.left,
                            y: b.pageY - i.top
                        }
                    } else c = {
                        x: b.offsetX,
                        y: b.offsetY
                    };
                    var j = {
                        c: Math.ceil(c.x / y) || 1,
                        r: Math.ceil(c.y / y) || 1
                    };
                    g.css({
                        width: j.c + "em",
                        height: j.r + "em"
                    }), f.attr("data-value", j.c + "x" + j.r), 3 < j.c && j.c < 20 && h.css({
                        width: j.c + 1 + "em"
                    }), 3 < j.r && j.r < 20 && h.css({
                        height: j.r + 1 + "em"
                    }), e.html(j.c + " x " + j.r)
                };
            this.attach = function (a) {
                a.editable.on("keydown", k), a.editable.on("mousedown", s), a.editable.on("keyup mouseup", t), a.editable.on("scroll", u), a.editable.on("dragenter dragover dragleave", !1), a.editable.on("drop", r), a.handle.on("mousedown", v), a.toolbar.on("click", x), a.popover.on("click", x), a.toolbar.on("mousedown", w), a.popover.on("mousedown", w);
                var b = a.toolbar,
                    c = b.find(".note-dimension-picker-mousecatcher");
                c.on("mousemove", z)
            }, this.dettach = function (a) {
                a.editable.off(), a.toolbar.off(), a.handle.off(), a.popover.off()
            }
        }, r = function () {
            var c = '<div class="note-toolbar btn-toolbar"><div class="note-insert btn-group"><button type="button" class="btn btn-small" title="Picture" data-event="showImageDialog" tabindex="-1"><i class="icon-picture"></i></button><button type="button" class="btn btn-small" title="Link" data-event="showLinkDialog" data-shortcut="Ctrl+K" data-mac-shortcut="⌘+K" tabindex="-1"><i class="icon-link"></i></button></div><div class="note-table btn-group"><button type="button" class="btn btn-small dropdown-toggle" title="Table" data-toggle="dropdown" tabindex="-1"><i class="icon-table"></i> <span class="caret"></span></button><ul class="dropdown-menu"><div class="note-dimension-picker"><div class="note-dimension-picker-mousecatcher" data-event="insertTable" data-value="1x1"></div><div class="note-dimension-picker-highlighted"></div><div class="note-dimension-picker-unhighlighted"></div></div><div class="note-dimension-display"> 1 x 1 </div></ul></div><div class="note-style btn-group"><button type="button" class="btn btn-small dropdown-toggle" title="Style" data-toggle="dropdown" tabindex="-1"><i class="icon-magic"></i> <span class="caret"></span></button><ul class="dropdown-menu"><li><a data-event="formatBlock" data-value="p">Paragraph</a></li><li><a data-event="formatBlock" data-value="blockquote"><blockquote>Quote</blockquote></a></li><li><a data-event="formatBlock" data-value="pre">Code</a></li><li><a data-event="formatBlock" data-value="h1"><h1>Header 1</h1></a></li><li><a data-event="formatBlock" data-value="h2"><h2>Header 2</h2></a></li><li><a data-event="formatBlock" data-value="h3"><h3>Header 3</h3></a></li><li><a data-event="formatBlock" data-value="h4"><h4>Header 4</h4></a></li></ul></div><div class="note-fontsize btn-group"><button type="button" class="btn btn-small dropdown-toggle" data-toggle="dropdown" title="Font Size" tabindex="-1"><span class="note-current-fontsize">11</span> <b class="caret"></b></button><ul class="dropdown-menu"><li><a data-event="fontSize" data-value="8"><i class="icon-ok"></i> 8</a></li><li><a data-event="fontSize" data-value="9"><i class="icon-ok"></i> 9</a></li><li><a data-event="fontSize" data-value="10"><i class="icon-ok"></i> 10</a></li><li><a data-event="fontSize" data-value="11"><i class="icon-ok"></i> 11</a></li><li><a data-event="fontSize" data-value="12"><i class="icon-ok"></i> 12</a></li><li><a data-event="fontSize" data-value="14"><i class="icon-ok"></i> 14</a></li><li><a data-event="fontSize" data-value="18"><i class="icon-ok"></i> 18</a></li><li><a data-event="fontSize" data-value="24"><i class="icon-ok"></i> 24</a></li><li><a data-event="fontSize" data-value="36"><i class="icon-ok"></i> 36</a></li></ul></div><div class="note-color btn-group"><button type="button" class="btn btn-small note-recent-color" title="Recent Color" data-event="color" data-value=\'{"foreColor":"black","backColor":"yellow"}\' tabindex="-1"><i class="icon-font" style="color:black;background-color:yellow;"></i></button><button type="button" class="btn btn-small dropdown-toggle" title="More Color" data-toggle="dropdown" tabindex="-1"><span class="caret"></span></button><ul class="dropdown-menu"><li><div class="btn-group"><div class="note-palette-title">BackColor</div><div class="note-color-palette" data-target-event="backColor"></div></div><div class="btn-group"><div class="note-palette-title">FontColor</div><div class="note-color-palette" data-target-event="foreColor"></div></div></li></ul></div><div class="note-style btn-group"><button type="button" class="btn btn-small" title="Bold" data-shortcut="Ctrl+B" data-mac-shortcut="⌘+B" data-event="bold" tabindex="-1"><i class="icon-bold"></i></button><button type="button" class="btn btn-small" title="Italic" data-shortcut="Ctrl+I" data-mac-shortcut="⌘+I" data-event="italic" tabindex="-1"><i class="icon-italic"></i></button><button type="button" class="btn btn-small" title="Underline" data-shortcut="Ctrl+U" data-mac-shortcut="⌘+U" data-event="underline" tabindex="-1"><i class="icon-underline"></i></button><button type="button" class="btn btn-small" title="Remove Font Style" data-shortcut="Ctrl+\\" data-mac-shortcut="⌘+\\" data-event="removeFormat" tabindex="-1"><i class="icon-eraser"></i></button></div><div class="note-para btn-group"><button type="button" class="btn btn-small" title="Unordered list" data-shortcut="Ctrl+Shift+8" data-mac-shortcut="⌘+⇧+7" data-event="insertUnorderedList" tabindex="-1"><i class="icon-list-ul"></i></button><button type="button" class="btn btn-small" title="Ordered list" data-shortcut="Ctrl+Shift+7" data-mac-shortcut="⌘+⇧+8" data-event="insertOrderedList" tabindex="-1"><i class="icon-list-ol"></i></button><button type="button" class="btn btn-small dropdown-toggle" title="Paragraph" data-toggle="dropdown" tabindex="-1"><i class="icon-align-left"></i>  <span class="caret"></span></button><ul class="dropdown-menu right"><li><div class="note-align btn-group"><button type="button" class="btn btn-small" title="Align left" data-shortcut="Ctrl+Shift+L" data-mac-shortcut="⌘+⇧+L" data-event="justifyLeft" tabindex="-1"><i class="icon-align-left"></i></button><button type="button" class="btn btn-small" title="Align center" data-shortcut="Ctrl+Shift+E" data-mac-shortcut="⌘+⇧+E" data-event="justifyCenter" tabindex="-1"><i class="icon-align-center"></i></button><button type="button" class="btn btn-small" title="Align right" data-shortcut="Ctrl+Shift+R" data-mac-shortcut="⌘+⇧+R" data-event="justifyRight" tabindex="-1"><i class="icon-align-right"></i></button><button type="button" class="btn btn-small" title="Justify full" data-shortcut="Ctrl+Shift+J" data-mac-shortcut="⌘+⇧+J" data-event="justifyFull" tabindex="-1"><i class="icon-align-justify"></i></button></div></li><li><div class="note-list btn-group"><button type="button" class="btn btn-small" title="Outdent" data-shortcut="Shift+TAB" data-mac-shortcut="⇧+TAB" data-event="outdent" tabindex="-1"><i class="icon-indent-left"></i></button><button type="button" class="btn btn-small" title="Indent" data-shortcut="TAB" data-mac-shortcut="TAB" data-event="indent" tabindex="-1"><i class="icon-indent-right"></i></button></li></ul></div><div class="note-line-height btn-group"><button type="button" class="btn btn-small dropdown-toggle" data-toggle="dropdown" title="Line Height" tabindex="-1"><i class="icon-text-height"></i>&nbsp; <b class="caret"></b></button><ul class="dropdown-menu right"><li><a data-event="lineHeight" data-value="1.0"><i class="icon-ok"></i> 1.0</a></li><li><a data-event="lineHeight" data-value="1.2"><i class="icon-ok"></i> 1.2</a></li><li><a data-event="lineHeight" data-value="1.4"><i class="icon-ok"></i> 1.4</a></li><li><a data-event="lineHeight" data-value="1.5"><i class="icon-ok"></i> 1.5</a></li><li><a data-event="lineHeight" data-value="1.6"><i class="icon-ok"></i> 1.6</a></li><li><a data-event="lineHeight" data-value="1.8"><i class="icon-ok"></i> 1.8</a></li><li><a data-event="lineHeight" data-value="2.0"><i class="icon-ok"></i> 2.0</a></li><li><a data-event="lineHeight" data-value="3.0"><i class="icon-ok"></i> 3.0</a></li></ul></div></div>',
                d = '<div class="note-popover"><div class="note-link-popover popover fade bottom in" style="display: none;"><div class="arrow"></div><div class="popover-content note-link-content"><a href="http://www.google.com" target="_blank">www.google.com</a>&nbsp;&nbsp;<div class="note-insert btn-group"><button type="button" class="btn btn-small" title="Edit" data-event="showLinkDialog" tabindex="-1"><i class="icon-edit"></i></button><button type="button" class="btn btn-small" title="Unlink" data-event="unlink" tabindex="-1"><i class="icon-unlink"></i></button></div></div></div><div class="note-image-popover popover fade bottom in" style="display: none;"><div class="arrow"></div><div class="popover-content note-image-content"><div class="btn-group"><button type="button" class="btn btn-small" title="Resize Full" data-event="resize" data-value="1" tabindex="-1"><i class="icon-resize-full"></i></button><button type="button" class="btn btn-small" title="Resize Half" data-event="resize" data-value="0.5" tabindex="-1">½</button><button type="button" class="btn btn-small" title="Resize Thrid" data-event="resize" data-value="0.33" tabindex="-1">⅓</button><button type="button" class="btn btn-small" title="Resize Quarter" data-event="resize" data-value="0.25" tabindex="-1">¼</button></div><div class="btn-group"><button type="button" class="btn btn-small" title="Float Left" data-event="float" data-value="left" tabindex="-1"><i class="icon-align-left"></i></button><button type="button" class="btn btn-small" title="Float Right" data-event="float" data-value="right" tabindex="-1"><i class="icon-align-right"></i></button><button type="button" class="btn btn-small" title="Float None" data-event="float" data-value="none" tabindex="-1"><i class="icon-reorder"></i></button></div></div></div></div>',
                e = '<div class="note-handle"><div class="note-control-selection"><div class="note-control-selection-bg"></div><div class="note-control-holder note-control-nw"></div><div class="note-control-holder note-control-ne"></div><div class="note-control-holder note-control-sw"></div><div class="note-control-sizing note-control-se"></div><div class="note-control-selection-info"></div></div></div>',
                f = '<div class="note-dialog"><div class="note-image-dialog modal hide in" aria-hidden="false"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" tabindex="-1">×</button><h4>Insert Image</h4></div><div class="modal-body"><div class="row-fluid"><div class="note-dropzone span12">Drag an image here</div><div>or if you prefer...</div><input class="note-image-input" type="file" class="note-link-url" type="text" /></div></div></div><div class="note-link-dialog modal hide in" aria-hidden="false"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" tabindex="-1">×</button><h4>Edit Link</h4></div><div class="modal-body"><div class="row-fluid"><label>Text to display</label><span class="note-link-text input-xlarge uneditable-input" /><label>To what URL should this link go?</label><input class="note-link-url span12" type="text" /></div></div><div class="modal-footer"><a href="#" class="btn disabled note-link-btn" disabled="disabled">Link</a></div></div></div>',
                g = function (c, d) {
                    c.find("button").each(function (c, d) {
                        var e = a(d),
                            f = e.attr(b ? "data-mac-shortcut" : "data-shortcut");
                        f && e.attr("title", function (a, b) {
                            return b + " (" + f + ")"
                        })
                    }).tooltip({
                        container: "body",
                        placement: d || "top"
                    })
                }, h = [
                    ["#000000", "#424242", "#636363", "#9C9C94", "#CEC6CE", "#EFEFEF", "#EFF7F7", "#FFFFFF"],
                    ["#FF0000", "#FF9C00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#9C00FF", "#FF00FF"],
                    ["#F7C6CE", "#FFE7CE", "#FFEFC6", "#D6EFD6", "#CEDEE7", "#CEE7F7", "#D6D6E7", "#E7D6DE"],
                    ["#E79C9C", "#FFC69C", "#FFE79C", "#B5D6A5", "#A5C6CE", "#9CC6EF", "#B5A5D6", "#D6A5BD"],
                    ["#E76363", "#F7AD6B", "#FFD663", "#94BD7B", "#73A5AD", "#6BADDE", "#8C7BC6", "#C67BA5"],
                    ["#CE0000", "#E79439", "#EFC631", "#6BA54A", "#4A7B8C", "#3984C6", "#634AA5", "#A54A7B"],
                    ["#9C0000", "#B56308", "#BD9400", "#397B21", "#104A5A", "#085294", "#311873", "#731842"],
                    ["#630000", "#7B3900", "#846300", "#295218", "#083139", "#003163", "#21104A", "#4A1031"]
                ],
                i = function (b) {
                    b.find(".note-color-palette").each(function () {
                        for (var b = a(this), c = b.attr("data-target-event"), d = "", e = 0, f = h.length; f > e; e++) {
                            for (var g = h[e], i = "<div>", j = 0, k = g.length; k > j; j++) {
                                var l = g[j],
                                    m = ['<button type="button" class="note-color-btn" style="background-color:', l, ';" data-event="', c, '" data-value="', l, '" title="', l, '" data-toggle="button" tabindex="-1"></button>'].join("");
                                i += m
                            }
                            i += "</div>", d += i
                        }
                        b.html(d)
                    })
                };
            this.createLayout = function (b, h, j) {
                if (!b.next().hasClass("note-editor")) {
                    var l = a('<div class="note-editor"></div>'),
                        m = a('<div class="note-editable" contentEditable="true"></div>').prependTo(l);
                    j && m.attr("tabIndex", j), h && m.height(h), m.html(b.html()), m.data("NoteHistory", new k);
                    var n = a(c).prependTo(l);
                    i(n), g(n, "bottom");
                    var o = a(d).prependTo(l);
                    g(o), a(e).prependTo(l), a(f).prependTo(l), l.insertAfter(b), b.hide()
                }
            };
            var j = this.layoutInfoFromHolder = function (a) {
                var b = a.next();
                if (b.hasClass("note-editor")) return {
                    editor: b,
                    editable: b.find(".note-editable"),
                    toolbar: b.find(".note-toolbar"),
                    popover: b.find(".note-popover"),
                    handle: b.find(".note-handle"),
                    dialog: b.find(".note-dialog")
                }
            };
            this.removeLayout = function (a) {
                var b = j(a);
                b && (a.html(b.editable.html()), b.editor.remove(), a.show())
            }
        }, s = new r,
        t = new q;
    a.fn.extend({
        summernote: function (b) {
            b = b || {}, this.each(function (c, d) {
                var e = a(d);
                s.createLayout(e, b.height, b.tabIndex);
                var f = s.layoutInfoFromHolder(e);
                t.attach(f), b.focus && f.editable.focus()
            })
        },
        code: function (b) {
            return void 0 === b ? this.map(function (b, c) {
                var d = s.layoutInfoFromHolder(a(c)),
                    e = !(!d || !d.editable);
                return e ? d.editable.html() : a(c).html()
            }) : (this.each(function (c, d) {
                var e = s.layoutInfoFromHolder(a(d));
                e && e.editable && e.editable.html(b)
            }), void 0)
        },
        destroy: function () {
            this.each(function (b, c) {
                var d = a(c),
                    e = s.layoutInfoFromHolder(d);
                e && e.editable && (t.dettach(e), s.removeLayout(d))
            })
        },
        summernoteInner: function () {
            return {
                dom: f,
                list: e,
                func: d
            }
        }
    })
}(jQuery);


