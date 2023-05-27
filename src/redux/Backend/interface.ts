import { I_getallproduct } from "@Redux/App/interfaces"
import { I_listshipping } from "@Redux/Order/interfaces";

export interface I_RootState {
    productdetail?: I_getallproduct;
    isLoading: boolean;
    orderdetail?: I_listshipping;
}