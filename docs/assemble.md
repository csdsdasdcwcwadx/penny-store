# 頁面拼裝 (/pages 底下的檔案)

請於 src/pages/detail/index.tsx 中的拼裝自己所負責的模組：

1. Group (團況區塊)
2. Itinerary (日行程區塊)
3. Recommends (推薦行程區塊)

&nbsp;

## 樣式

請於 src/pages/detail/styles.scss 撰寫需要的樣式，使用樣式名稱為

1. gruop (團況區塊)
2. itinerary (日行程區塊)
3. recommends (推薦行程)

&nbsp;

### 改寫模組樣式

若想藉由外部改變模組樣式，請用下列規則更改：

```css
/* 若想改寫 GroupDetail 模組樣式 (第一層 className 為 "group_detail") */

.group {
    &_detail {
        /* 需要更改的樣式 */
        &_lightBox {
        }
    }
}

/* 若想改寫 RecommendCards 模組樣式 (第一層 className 為 "recommend_cards") */

.recommend {
    &_cards {
        /* 需要更改的樣式 */
    }
}
```

1. 以分區塊但不用多重 className 的方式，以避免之後難以覆寫，往後需要用更高的權重改寫
2. 以改模組最外層樣式為原則，若想要更改模組內部樣式，請直接更改模組本身的樣式

&nbsp;

## API 資料

1. 檔案名稱和變數名稱需全部小寫 (因目前 u 機 API 為全小寫才能取得)

&nbsp;
&nbsp;

### u 機 API

設定於 src/setupProxy.js，以 http://localhost:3636/utravel 下的網址取得 https://utravel.liontravel.com 下的 API

```js
app.use(
    '/utravel',
    createProxyMiddleware({
        target: 'https://utravel.liontravel.com/',
        changeOrigin: true,
        pathRewrite: { '/utravel': '' },
    })
);
```

範例：

```js
// 若想要取得 https://utravel.liontravel.com/detail/travelinfojson
// 則需 fetch 的網址為 /utravel/detail/travelinfojson
// /utravel 會藉由 Proxy 取得 https://utravel.liontravel.com 網域下的資料

fetch('/utravel/detail/travelinfojson', {
    GroupID: '21TE320CC-T',
})
    .then((res) => res.json)
    .then((data) => console.log(data));
```

&nbsp;

#### 參考資料

https://create-react-app.dev/docs/proxying-api-requests-in-development/

&nbsp;
&nbsp;

### 正式機 API

若要測試正式機 API，可以將 target 部分改為 travel.liontravel.com 即可，
其他程式碼不需要更改

```js
app.use(
    '/utravel',
    createProxyMiddleware({
        target: 'https://travel.liontravel.com/',
        ...
    })
);
```
