# 如何請 IT 將前端打包後的資源放在 MVC 的 View 上

## 1. 先在本地測試打包後的資料

執行

```
npm run release
```

打包出測試機的環境

&nbsp;

## 2. 對 dist 中要上 u 機的頁面 (ex: newPage.html) 用 Live Server 看能不能顯示部分資源

&nbsp;

## 3. 將該頁面用到的資源，請 IT 放到頁面上

```html
<!-- /public/newPage.html -->
<html lang="en">
    <head>
        <!-- React, React-DOM CDN -->
        <script crossorigin src="/_webassets/consoleap/library/react.production.min.js"></script>
        <script
            crossorigin
            src="/_webassets/consoleap/library/react-dom.production.min.js"
        ></script>
        <!-- jQuery CDN -->

        <script src="/_webassets/consoleap/library/jquery/dist/jquery.min.js"></script>
        <title>新頁面</title>
        <!-- 對應頁面的 CSS -->
        <link
            href="/_webassets/lightspeed/subsitebundles/Travel-React/newPage/css/style.s.css"
            rel="stylesheet"
        />
    </head>
    <body>
        <!-- 前端 code 渲染節點 -->
        <div id="root"></div>
        <!-- Create-React-App 生成的一堆 script，不確定作用是什麼 -->
        <!-- 這段程式在每次新增頁面時都會有些微變動，新增頁面時須請他們每個頁面重新引入這段 -->
        <!-- 比較 js 檔案網址：https://www.diffchecker.com/diff -->
        <!-- 後續看要不要用 monorepo 更改環境設定(類似 Lion-Design 專案)，每一個頁面有自己的 npm, webpack 設定，可能可以改善此問題 -->
        <script>
            !(function (e) {
                function r(r) {
                    for (var n, l, a = r[0], i = r[1], c = r[2], p = 0, s = []; p < a.length; p++)
                        (l = a[p]),
                            Object.prototype.hasOwnProperty.call(o, l) && o[l] && s.push(o[l][0]),
                            (o[l] = 0);
                    for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
                    for (f && f(r); s.length; ) s.shift()();
                    return u.push.apply(u, c || []), t();
                }
                function t() {
                    for (var e, r = 0; r < u.length; r++) {
                        for (var t = u[r], n = !0, a = 1; a < t.length; a++) {
                            var i = t[a];
                            0 !== o[i] && (n = !1);
                        }
                        n && (u.splice(r--, 1), (e = l((l.s = t[0]))));
                    }
                    return e;
                }
                var n = {},
                    o = { 5: 0 },
                    u = [];
                function l(r) {
                    if (n[r]) return n[r].exports;
                    var t = (n[r] = { i: r, l: !1, exports: {} });
                    return e[r].call(t.exports, t, t.exports, l), (t.l = !0), t.exports;
                }
                (l.m = e),
                    (l.c = n),
                    (l.d = function (e, r, t) {
                        l.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: t });
                    }),
                    (l.r = function (e) {
                        'undefined' != typeof Symbol &&
                            Symbol.toStringTag &&
                            Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                            Object.defineProperty(e, '__esModule', { value: !0 });
                    }),
                    (l.t = function (e, r) {
                        if ((1 & r && (e = l(e)), 8 & r)) return e;
                        if (4 & r && 'object' == typeof e && e && e.__esModule) return e;
                        var t = Object.create(null);
                        if (
                            (l.r(t),
                            Object.defineProperty(t, 'default', { enumerable: !0, value: e }),
                            2 & r && 'string' != typeof e)
                        )
                            for (var n in e)
                                l.d(
                                    t,
                                    n,
                                    function (r) {
                                        return e[r];
                                    }.bind(null, n)
                                );
                        return t;
                    }),
                    (l.n = function (e) {
                        var r =
                            e && e.__esModule
                                ? function () {
                                      return e.default;
                                  }
                                : function () {
                                      return e;
                                  };
                        return l.d(r, 'a', r), r;
                    }),
                    (l.o = function (e, r) {
                        return Object.prototype.hasOwnProperty.call(e, r);
                    }),
                    (l.p = '/_webassets/lightspeed/subsitebundles/Travel-React/');
                var a = (this['webpackJsonpLionTravel-Travel-React'] =
                        this['webpackJsonpLionTravel-Travel-React'] || []),
                    i = a.push.bind(a);
                (a.push = r), (a = a.slice());
                for (var c = 0; c < a.length; c++) r(a[c]);
                var f = i;
                t();
            })([]);
        </script>
        <!-- 對應頁面的 JS -->
        <script src="/_webassets/lightspeed/subsitebundles/Travel-React/newPage/js/index.js"></script>
    </body>
</html>
```
