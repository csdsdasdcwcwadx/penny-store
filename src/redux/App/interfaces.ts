export interface I_AppState {
    listOpen: boolean;
    page: E_Page;
}

export enum E_Page {
    HOME = 'home',
    SHOPALL = 'shop_all',
    SALE = 'sale',
    RESTOCK = 'restock',
    WEAR = 'wear',
    MORE = 'more',
}
