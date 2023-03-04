const CarInfoData = [
    {
        CarTypeName: '44人大巴',
        CarTypeDescription: '迪士尼巴士四排椅座位表 客座44座',
        CarTypeCode: 'Bus44',
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
                    idx: 88,
                    type: 'door',
                    text: '前門',
                    row: 1,
                    col: 2,
                },
                {
                    idx: 0,
                    type: 'aisl',
                    text: '',
                    row: 12,
                    col: 1,
                },
                {
                    idx: 99,
                    type: 'driv',
                    text: '駕駛',
                    row: 1,
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
                    idx: 35,
                    type: 'seat',
                    text: '1C',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 20,
                    type: 'seat',
                    text: '1D',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 3,
                    type: 'disabled',
                    text: '2A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 4,
                    type: 'seat',
                    text: '2B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 21,
                    type: 'seat',
                    text: '2C',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 22,
                    type: 'seat',
                    text: '2D',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 5,
                    type: 'seat',
                    text: '3A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 6,
                    type: 'seat',
                    text: '3B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 23,
                    type: 'seat',
                    text: '3C',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 24,
                    type: 'seat',
                    text: '3D',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 7,
                    type: 'seat',
                    text: '4A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 8,
                    type: 'seat',
                    text: '4B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 25,
                    type: 'seat',
                    text: '4C',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 26,
                    type: 'seat',
                    text: '4D',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 9,
                    type: 'seat',
                    text: '5A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 10,
                    type: 'disabled',
                    text: '5B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 27,
                    type: 'seat',
                    text: '5C',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 28,
                    type: 'seat',
                    text: '5D',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 11,
                    type: 'seat',
                    text: '6A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 12,
                    type: 'seat',
                    text: '6B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 29,
                    type: 'seat',
                    text: '6C',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 30,
                    type: 'seat',
                    text: '6D',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 13,
                    type: 'seat',
                    text: '7A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 14,
                    type: 'seat',
                    text: '7B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 19,
                    type: 'seat',
                    text: '7C',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 33,
                    type: 'seat',
                    text: '7D',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 15,
                    type: 'seat',
                    text: '8A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 16,
                    type: 'seat',
                    text: '8B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 34,
                    type: 'seat',
                    text: '8C',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 36,
                    type: 'seat',
                    text: '8D',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 17,
                    type: 'seat',
                    text: '9A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 18,
                    type: 'seat',
                    text: '9B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 31,
                    type: 'seat',
                    text: '9C',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 32,
                    type: 'seat',
                    text: '9D',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 37,
                    type: 'seat',
                    text: '10A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 38,
                    type: 'seat',
                    text: '10B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 39,
                    type: 'seat',
                    text: '10C',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 40,
                    type: 'seat',
                    text: '10D',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 41,
                    type: 'seat',
                    text: '11A',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 42,
                    type: 'seat',
                    text: '11B',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 43,
                    type: 'seat',
                    text: '11C',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 44,
                    type: 'seat',
                    text: '11D',
                    row: 1,
                    col: 1,
                },
            ],
        ],
    },
];
module.exports = CarInfoData;
