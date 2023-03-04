const Bus19_s1 = require('./CarData/bus19_s1');
const Bus19 = require('./CarData/Bus19');
const Bus25 = require('./CarData/Bus25');
const Bus32 = require('./CarData/Bus32');
const Bus34 = require('./CarData/Bus34');
const Bus41 = require('./CarData/Bus41');
const Bus43 = require('./CarData/Bus43');
const Bus44 = require('./CarData/Bus44');
const Sunrise_6Car = require('./CarData/Sunrise_6Car');
const TranBike_BikeCar = require('./CarData/train16');
const TranBike_BusinessCar = require('./CarData/train52');
const getbusseatlistjson = require('./getbusseatlistjson.json');

module.exports = (CarTypeName)=> {
    switch(CarTypeName){
        case 'Bus19_s1':
            return Bus19_s1;
        case 'Bus19':
            return Bus19;
        case 'Bus25':
            return Bus25;
        case 'Bus32':
            return Bus32;
        case 'Bus34':
            return Bus34;
        case 'Bus41':
            return Bus41;
        case 'Bus43':
            return Bus43;
        case 'Bus44':
            return Bus44;
        case 'Sunrise_6Car':
            return Sunrise_6Car;
        case 'TranBike_BikeCar':
            return TranBike_BikeCar;
        case 'TranBike_BusinessCar':
            return TranBike_BusinessCar;
        default:
            return getbusseatlistjson;
    }
}