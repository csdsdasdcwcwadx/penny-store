# 產品頁

## 各項 API 所需要參數

### 單團

1. TourInfoJson (行程清單)

    | 參數名稱    | 必填 | 資料類型 |
    | ----------- | ---- | -------- |
    | NormGroupID | V    | string   |
    | GoDateStart |      | string   |
    | GoDateEnd   |      | string   |

2. GroupCalendarJson (日曆行程清單)

    | 參數名稱    | 必填 | 資料類型 |
    | ----------- | ---- | -------- |
    | NormGroupID | V    | string   |
    | GoDateStart |      | string   |
    | GoDateEnd   |      | string   |
    | TourID      |      | string   |

3. TravelInfoJson (單團清單)

    | 參數名稱    | 必填 | 資料類型 |
    | ----------- | ---- | -------- |
    | NormGroupID |      | string   |
    | GroupID     | V    | string   |

### 日行程 & 特色

1. DayTripInfoJson (日行程 & 特色)

    | 參數名稱   | 必填 | 資料類型 |
    | ---------- | ---- | -------- |
    | TourID     |      | string   |
    | GroupID    | V    | string   |
    | TravelType | V    | string   |

2. StationInfoJson (上下車地點)

    | 參數名稱 | 必填 | 資料類型 |
    | -------- | ---- | -------- |
    | GroupID  | V    | string   |
    | TourID   |      | string   |

3. OptionalInfoJson (自費行程)

    | 參數名稱 | 必填 | 資料類型 |
    | -------- | ---- | -------- |
    | GroupID  | V    | string   |

4. NoticeInfoJson (其他注意事項)

    | 參數名稱 | 必填 | 資料類型 |
    | -------- | ---- | -------- |
    | GroupID  |      | string   |

### 推薦行程

1. PopularInfoJson

&nbsp;

## 渲染邏輯

&nbsp;

1. 切換行程

    點選行程

    -> fetch GroupCalendarJson (日曆行程清單)

    | 參數名稱    | 送出 | 資料來源 | 資料類型 |
    | ----------- | ---- | -------- | -------- |
    | NormGroupID | V    | 頁面固定 | string   |
    | GoDateStart | V    |          | string   |
    | GoDateEnd   | V    |          | string   |
    | TourID      | V    |          | string   |

    ->

&nbsp;

2. 切換月曆月份

    點選月曆月份按鈕

    -> 更換月份 (保留選取日期)

    -> 判斷是否為主題團 (一開始頁面的 ProductType === '1' )

    -> 主題團：一開始皆顯示列表

    其它：依據當月比數顯示列表或月曆
    比數 < 8:
    顯示列表
    比數 >= 8:
    顯示月曆

&nbsp;

3. 切換月曆模式

    -> 更換月曆模式

&nbsp;

4. 切換日期

    點選日期

    -> 取得 GroupID

    -> fetch

    TravelInfoJson (單團清單)

    | 參數名稱    | 送出 | 資料來源           | 資料類型 |
    | ----------- | ---- | ------------------ | -------- |
    | NormGroupID |      |                    | string   |
    | GroupID     | V    | 點選日期的 GroupID | string   |

    &nbsp;

    DayTripInfoJson (日行程 & 特色)

    | 參數名稱   | 送出 | 資料來源                 | 資料類型 |
    | ---------- | ---- | ------------------------ | -------- |
    | TourID     |      |                          | string   |
    | GroupID    | V    | 點選日期的 GroupID       | string   |
    | TravelType | V    | 現有 Redux 的 TravelType | string   |

    &nbsp;

    StationInfoJson (上下車地點)

    | 參數名稱 | 送出 | 資料來源           | 資料類型 |
    | -------- | ---- | ------------------ | -------- |
    | GroupID  | V    | 點選日期的 GroupID | string   |
    | TourID   |      |                    | string   |

    &nbsp;

    OptionalInfoJson (自費行程)

    | 參數名稱 | 送出 | 資料來源           | 資料類型 |
    | -------- | ---- | ------------------ | -------- |
    | GroupID  | V    | 點選日期的 GroupID | string   |

    &nbsp;

    NoticeInfoJson (其他注意事項)

    | 參數名稱 | 送出 | 資料來源           | 資料類型 |
    | -------- | ---- | ------------------ | -------- |
    | GroupID  |      | 點選日期的 GroupID | string   |

## 月曆邏輯

1. 不論主題團或一般團

    - \> 8 團，預設顯示月曆
    - < 8 團，預設顯示列表
    - \> 8 團的列表會顯示卷軸可以查看更多筆數

&nbsp;

2. 不論列表模式或月曆模式

    - 切換箭頭的功能為切換上下月
