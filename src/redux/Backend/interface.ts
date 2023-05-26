import { I_getallproduct } from "@Redux/App/interfaces"

export interface I_RootState {
    productdetail?: I_getallproduct;
    isLoading: boolean;
}