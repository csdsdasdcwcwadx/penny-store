export default (isProxy: boolean = true) => {
    if (process.env.STORYBOOK) {
        return '/mockData';
    }

    switch (process.env.ENV) {
        case 'prod':
        case 'rel':
            return '';
        // if 是要藉由 proxy 抓取 IT API，則不用傳參數
        // else 不須需要 proxy，要在本機上直接連到 u 機
        //      例如點擊 本機 <a> 標籤，要導到 u 機的產品頁，則傳入 false
        default:
            return isProxy ? '/ub2b-travel' : '//ub2b-travel.liontravel.com';
    }
};

export const member = (() => {
    switch (process.env.ENV) {
        case 'prod':
            return '//member.liontravel.com';
        case 'rel':
            return '//umember.liontravel.com';
        default:
            return '/umember';
    }
})();
