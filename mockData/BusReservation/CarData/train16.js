const CarInfoData = [
    {
        CarTypeName: '16人車廂',
        CarTypeDescription: '1~5節 人車同行車廂(16座位、15車架)',
        CarTypeCode: 'TranBike_BikeCar',
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
                    idx: 18,
                    type: 'seat',
                    text: '18',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 20,
                    type: 'seat',
                    text: '20',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 0,
                    type: 'aisl',
                    text: '乘客座位區',
                    row: 4,
                    col: 1,
                },
                {
                    idx: 19,
                    type: 'seat',
                    text: '19',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 17,
                    type: 'seat',
                    text: '17',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 14,
                    type: 'seat',
                    text: '14',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 16,
                    type: 'seat',
                    text: '16',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 15,
                    type: 'disabled',
                    text: '15',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 13,
                    type: 'seat',
                    text: '13',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 10,
                    type: 'seat',
                    text: '10',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 12,
                    type: 'seat',
                    text: '12',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 11,
                    type: 'seat',
                    text: '11',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 9,
                    type: 'seat',
                    text: '9',
                    row: 1,
                    col: 1,
                },
            ],
            [
                {
                    idx: 6,
                    type: 'seat',
                    text: '6',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 8,
                    type: 'seat',
                    text: '8',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 7,
                    type: 'seat',
                    text: '7',
                    row: 1,
                    col: 1,
                },
                {
                    idx: 5,
                    type: 'seat',
                    text: '5',
                    row: 1,
                    col: 1,
                },
            ],
        ],
    },
];

module.exports = CarInfoData;
