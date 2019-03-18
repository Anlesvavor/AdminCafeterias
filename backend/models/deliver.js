const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    _dinerId : String,
    _dateSent: Date,
    _dateReceived: Date,
    _orderSent: [],
    _orderReceived: [],
    _observations: String,
    _status: String,
    _truckId: String
});

class Deliver {
    constructor(dinerId, dateSent, dateReceived, orderSent, orderReceived, observations, status, truckId) {
        this._dinerId = dinerId;
        this._dateSent = dateSent;
        this._dateReceived = dateReceived;
        this._orderSent = orderSent;
        this._orderReceived = orderReceived;
        this._observations = observations;
        this._status = status;
        this._truckId = truckId;
    }


    get dinerId() {
        return this._dinerId;
    }

    set dinerId(value) {
        this._dinerId = value;
    }

    get dateSent() {
        return this._dateSent;
    }

    set dateSent(value) {
        this._dateSent = value;
    }

    get dateReceived() {
        return this._dateReceived;
    }

    set dateReceived(value) {
        this._dateReceived = value;
    }

    get orderSent() {
        return this._orderSent;
    }

    set orderSent(value) {
        this._orderSent = value;
    }

    get orderReceived() {
        return this._orderReceived;
    }

    set orderReceived(value) {
        this._orderReceived = value;
    }

    get observations() {
        return this._observations;
    }

    set observations(value) {
        this._observations = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get truckId() {
        return this._truckId;
    }

    set truckId(value) {
        this._truckId = value;
    }
}

schema.plugin(mongoosePaginate);
schema.loadClass(Deliver);
module.exports = mongoose.model('Deliver', schema);
