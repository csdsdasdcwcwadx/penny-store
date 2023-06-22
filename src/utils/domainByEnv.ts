export default () => {
    if (process.env.STORYBOOK) {
        return '/mockData';
    }

    switch (process.env.ENV) {
        case 'prod':
        case 'rel':
            return 'https://penny.londoner.tw';
        // if 是要藉由 proxy 抓取 IT API，則不用傳參數
        // else 不須需要 proxy，要在本機上直接連到 u 機
        //      例如點擊 本機 <a> 標籤，要導到 u 機的產品頁，則傳入 false
        default:
            return '/local';
    }
};

export const handlepath = () => {
    switch (process.env.ENV) {
        case 'prod':
        case 'rel':
            return 'https://www.londoner.tw';
        default:
            return '/penny-store';

    }
}
