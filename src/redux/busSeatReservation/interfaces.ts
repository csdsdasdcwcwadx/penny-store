export interface I_RootState {
    CarData: I_CarInfo[]; // Array 裡面包 object
}

export interface I_CarInfo {
    CabinName: string;
    CarTypeName: string; // 標籤來源是從左側篩選區塊還是上方標籤區塊
    CarTypeDescription: string;
    CarTypeCode: string;
    // CarTypeCode: Bus19 19座巴士, Bus19_S1 19座小可愛, Bus19_Sp 19座巴士(梅花座), Bus25 25座小可愛, Bus32 32人大巴
    // Bus34 34人大巴, Bus41 41人大巴, Bus41_Sp 41人大巴(梅花座), Bus43 43人大巴, Bus45 45人大巴
    // Sunrise_6Car 鳴日號(6節), Sunrise_BusinessCar 鳴日號(商務車廂), Sunrise_LivingCar 鳴日號(客廳車廂)
    // TranBike_6Car 兩鐵(6節), TranBike_BikeCar 兩鐵(人車車廂),TranBike_BusinessCar 兩鐵(一般車廂)

    CarNumber: number | null | string; //如果是巴士 CarNumber就是null, 如果是火車 就會有幾節車廂

    Seats: I_SeatsData[][];
}

// search/DepthInfoJson (取得進階搜尋項目)
export interface I_SeatsData {
    idx: number;
    type: string; //type:driv:駕駛,guid:導遊,aisl:走道,door:前門後門安全門,seat:可選,selected:你的座位,disabled:已選
    text: string;
    row: number; //row:向下幾行
    col: number; //col:向右幾欄
    OrdrYear: number;
    OrdrNo: number;
    csm02_seq: number;
    csm02_cname: null;
    Mstfn: null;
    Mdate: null;
}

export interface I_FetchTourReducer {
    FetchTourReducer?: []; // Array 裡面包 object
}

//設定觀光客回傳選為人名資料型態
export interface I_Tourists {
    Seq: number;
    Name?: string;
    SeatNumber: string;
}

export interface I_PassengerPurpose {
    OrderID: string;
    GroupID: string;
    TourName: string;
    GoDate: string;
    BackDate: string;
    TourDays: number;
    BusGType: string;
    CarList: I_CarList[];
    PassengerList: I_Tourists[]; //可刪除
    Message: string;
}

export interface I_CarList {
    csm00_csno: string;
    csm00_cartype: string;
    csm00_bdt: string;
    ImgName: string;
    ImgNameList: [string];
}

export interface I_changeSeatSuccess {
    Result: any;
    Message: string;
}
