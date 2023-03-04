import { actionTypes } from '.';
import { PageType } from './interfaces';

export const setPageType = (payload: PageType) => ({
    type: actionTypes.SET_PAGE_TYPE,
    payload,
});

export type I_PageTypeAction = ReturnType<typeof setPageType>;
