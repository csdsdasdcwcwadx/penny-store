# 1. 加入 HTML 範本設定

## 在 /public 下新增相對應的 html 範本，並加入 <div id="root">

ex : newPage.html

```html
<!-- /public/newPage.html -->
<div id="root"></div>
```

&nbsp;

## 引入 React 和 jQuery CDN (為了搜尋引擎和站長 header, footer)

```html
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
<script
    src="https://code.jquery.com/jquery-3.6.0.min.js"
    integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
    crossorigin="anonymous"
></script>
```

&nbsp;

## 引入需要的其他資源(ex: 搜尋引擎、header、footer)

### 搜尋引擎

```html
<script src="https://utravel.liontravel.com/_webassets/plugins/searchpanel/app.js"></script>
```

&nbsp;

### Header

```html
<!-- Header CSS 和 JS -->
<link
    href="/_webassets/consoleap/templates/header_lion/theme/default.css?1.1.50"
    rel="preload"
    as="style"
/>
<link
    href="/_webassets/consoleap/templates/header_lion/theme/default.css?1.1.50"
    rel="stylesheet"
/>
<script
    type="text/javascript"
    src="/_webassets/consoleap/templates/header_lion/module.js?1.1.50"
    defer
></script>
<!-- Header 標籤 -->
<header
    id="header_lion"
    class="pge_conl"
    data-pc-fix="false"
    data-pc-fix-start="false"
    data-header-title=""
    data-simple-pcheader="false"
    data-mobile-menu="true"
    data-home-icon="true"
    data-header-visibility=""
    data-toggle-search="false"
    data-mobile-fix="true"
    data-mobile-fix-start="false"
    data-mobile-top-transparent=""
    data-mobile-bg-white=""
    data-mobile-changeColor-height=""
></header>
```

### Footer

<!-- Footer CSS 和 JS -->

```html
<link
    href="/_webassets/consoleap/templates/footer_lion/theme/default.css?1.1.50"
    rel="preload"
    as="style"
/>
<link
    href="/_webassets/consoleap/templates/footer_lion/theme/default.css?1.1.50"
    rel="stylesheet"
/>
<script
    type="text/javascript"
    src="/_webassets/consoleap/templates/footer_lion/module.js?1.1.50"
    defer
></script>
<!-- Footer 標籤 -->
<footer id="footer_lion" class="pge_conl" data-footer-visibility="mobileHide"></footer>
```

&nbsp;
&nbsp;

# 2. 更改 Webpack 設定

## 在 Webpack 加入 HTML template

```js
{
    plugins: [
        ...,
        new HtmlWebpackPlugin(
                Object.assign(
                    {},
                    {
                        inject: true,
                        filename: 'newPage.html', // 打包後的 HTML 檔案名稱
                        template: paths.appNewPageHtml, // 載入的 HTML 範本路徑
                        chunks: ['newPage'], // 載入的分包 js 名稱
                    },
                    isEnvProduction
                        ? {
                              minify: {
                                  removeComments: true,
                                  collapseWhitespace: true,
                                  removeRedundantAttributes: true,
                                  useShortDoctype: true,
                                  removeEmptyAttributes: true,
                                  removeStyleLinkTypeAttributes: true,
                                  keepClosingSlash: true,
                                  minifyJS: true,
                                  minifyCSS: true,
                                  minifyURLs: true,
                              },
                          }
                        : undefined
                )
            ),
    ]
}
```

&nbsp;

## 在 Webpack 載入當頁的 JS

```js
{
    entry: {
        ...
        newPage: paths.appNewPageJs,
    }
}
```

&nbsp;

## 在 /config/paths 設定 Js 和 HTML 範本的路徑

```js
module.exports = {
    ...
    appNewPageHtml: resolveApp('public/newPage.html'),
    appNewPageJs: resolveModule(resolveApp, 'src/pages/newPage/index'),
}
```

&nbsp;
&nbsp;

# 3. 加入 React 檔案

## 在 /src/pages 加入 newPage 資料夾，並在裡面加入 index.tsx

```js
// /src/pages/newPage
import React from 'react';

function NewPage() {
    return <h1>New Page</h1>;
}

ReactDOM.render(
    <React.StrictMode>
        <NewPage />
    </React.StrictMode>,
    document.getElementById('root')
);
```

&nbsp;

## 就可以開啟 devServer，在 http://localhost:3636/newPage.html 看到新頁面了

&nbsp;

### 補充：可在 /src/index.tsx 加入新頁面連結，後面方便開發時點入

```tsx
// src/index.tsx
ReactDOM.render(
    <React.StrictMode>
        <h1>Index Page</h1>
        <ul>
            ...
            <li>
                <a href="/newPage.html">新的頁面</a>
            </li>
        </ul>
    </React.StrictMode>,
    document.getElementById('root')
);
```

&nbsp;
&nbsp;

# 4. 加入 Redux

## 在 /redux 下加入 newPage 資料夾，結構如下

```
NewPage
    ├── saga
    │   └── index.tsx
    ├── actions.ts
    │── actionTypes.ts
    │── interfaces.ts
    │── reducer.ts
    └── store.ts
```

建立 Redux 可參考 /docs/component.md 第 3 點

&nbsp;

## 將 Redux 加入到對應的 tsx 中

```tsx
import { store } from '@Redux/newPage/store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <NewPage />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
```
