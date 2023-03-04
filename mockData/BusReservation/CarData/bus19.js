const CarInfoData = [
    {
        CarTypeName: '19人小巴',
        CarTypeDescription: '巴士三排椅座位表 客座19座',
        CarTypeCode: 'Bus19',
        // CarTypeCode: Bus19 19座巴士, Bus19_S1 19座小可愛, Bus19_Sp 19座巴士(梅花座), Bus25 25座小可愛, Bus32 32人大巴
        // Bus34 34人大巴, Bus41 41人大巴, Bus41_Sp 41人大巴(梅花座), Bus43 43人大巴, Bus45 45人大巴
        // Sunrise_6Car 鳴日號(6節), Sunrise_BusinessCar 鳴日號(商務車廂), Sunrise_LivingCar 鳴日號(客廳車廂)
        // TranBike_6Car 兩鐵(6節), TranBike_BikeCar 兩鐵(人車車廂),TranBike_BusinessCar 兩鐵(一般車廂)
        CarNumber: null,
        //type:driv:駕駛,guid:導遊,aisl:走道,door:前門後門安全門,seat:可選,selected:你的座位,disabled:已選
        //row:向下幾行
        //col:向右幾欄
        Seats: [
            [
                {
                    idx: 99,
                    type: 'driv',
                    text: '駕駛',
                    row: 1,
                    col: 2,
                },
                {
                    idx: 0,
                    type: 'aisl',
                    text: '',
                    row: 7,
                    col: 1,
                },
                {
                    idx: 98,
                    type: 'guid',
                    text: '導遊',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 1,
                    type: 'seat',
                    text: '1A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 2,
                    type: 'seat',
                    text: '1B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 3,
                    type: 'seat',
                    text: '1C',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 4,
                    type: 'disabled',
                    text: '2A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 5,
                    type: 'seat',
                    text: '2B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 0,
                    type: 'door',
                    text: '前門',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 6,
                    type: 'seat',
                    text: '3A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 7,
                    type: 'seat',
                    text: '3B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 8,
                    type: 'seat',
                    text: '3C',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 9,
                    type: 'seat',
                    text: '4A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 10,
                    type: 'seat',
                    text: '4B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 11,
                    type: 'seat',
                    text: '4C',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 12,
                    type: 'seat',
                    text: '5A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 13,
                    type: 'disabled',
                    text: '5B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 14,
                    type: 'seat',
                    text: '5C',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 15,
                    type: 'seat',
                    text: '6A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 16,
                    type: 'seat',
                    text: '6B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 17,
                    type: 'seat',
                    text: '6C',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 18,
                    type: 'seat',
                    text: '7A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 0,
                    type: 'door',
                    text: '安全門',
                    row: 1,
                    col: 2,
                },
                {
                    idx: 19,
                    type: 'seat',
                    text: '7C',
                    row: 1,
                    col: 1,
                },
            ],
        ],
    },
];

module.exports = CarInfoData;
