
import { call, put, all, StrictEffect, takeEvery } from 'redux-saga/effects';
import fetchAPI from '@utils/fetchAPI';
import DomainByEnv from '@utils/domainByEnv';
import * as actionTypes from '../actionTypes';
import * as actions from '../actions';
// 網域domain路徑
// 目前只有 提供json 檔, 之後再拿api 做替換
const orderRoute = `${DomainByEnv()}/order`;
declare const window: any;

//抓取BusSeatReservationPage頁面資料
function* fetch_getbusinfojson(action: any): Generator<StrictEffect, any, any> {
    const data = yield call(fetchAPI, {
        url: `${orderRoute}/getbusinfojson`,
        req: action.payload,
    });

    // yield put(actions.FetchPassengerPurpose(data));
    yield put({ type: 'set_OrderInfoDataReducer', payload: data });
}

//處理跳下一頁API
function* jumpNext(action: any): Generator<StrictEffect, any, any> {
    const isSuccess = yield call(fetchAPI, {
        url: `${orderRoute}/submitbusseatsjson`,
        req: action.payload,
    });

    if (isSuccess.Result) {
        window.SubmitNext();
    }
}

//取得座位表
function* fetch_getbusseatlistjson(action: any): Generator<StrictEffect, any, any> {
    const data = yield call(fetchAPI, {
        url: `${orderRoute}/getbusseatlistjson`,
        req: {...action.payload, type: 'aaa'},
    });

    yield put(actions.Fetch_SeatList(data));
}

// 使用 type 註冊 saga function
// 使用時 呼叫 dispatch({type: })
function* watchSetBusSeatInfo() {
    yield takeEvery('fetch_getbusinfojson', fetch_getbusinfojson);
    yield takeEvery(actionTypes.GO_NEXT, jumpNext);
    yield takeEvery('fetch_getbusseatlistjson', fetch_getbusseatlistjson);
}

export default function* rootSaga() {
    yield all([watchSetBusSeatInfo()]);
}
