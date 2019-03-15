const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    _name: String,
    _driver: String,
    _plateNumber: String,
    _driverPhoneNumber: String,
    _capacity: String
});

class DeliveryTruck {
    constructor(name, driver, plateNumber, driverPhoneNumber, capacity) {
        this._name = name;
        this._driver = driver;
        this._plateNumber = plateNumber;
        this._driverPhoneNumber = driverPhoneNumber;
        this._capacity = capacity;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get driver() {
        return this._driver;
    }

    set driver(driver) {
        this._driver = driver;
    }

    get plateNumber() {
        return this._plateNumber;
    }

    set plateNumber(plateNumber) {
        this._plateNumber = plateNumber;
    }

    get driverPhoneNumber(){
        return this._driverPhoneNumber
    }

    set driverPhoneNumber(driverPhoneNumber){
        this._driverPhoneNumber = driverPhoneNumber;
    }

    get capacity(){
        return this._capacity
    }

    set capacity(capacity){
        this._capacity = capacity;
    }
}

schema.plugin(mongoosePaginate);
schema.loadClass(DeliveryTruck);
module.exports = mongoose.model('DeliveryTruck', schema);
