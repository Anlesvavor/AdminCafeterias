const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

let schema = new Schema({
    _diner : String,
    _date : Date,
    _orders : [],
    _status : String,
    _approvedBy : String,
    _dateApproved : Date,
    _requisitionOrig : []

});

class Requisition{

    constructor(diner, date, orders, status, approvedBy, dateApproved, requisitionOrig){
        this._diner = diner;
        this._date = date;
        this._orders = orders;
        this._status = status;
        this._approvedBy = approvedBy;
        this._dateApproved = dateApproved;
        this._requisitionOrig = requisitionOrig;
    }


    get diner() {
        return this._diner;
    }

    set diner(value) {
        this._diner = value;
    }

    get orders() {
        return this._orders;
    }

    set orders(value) {
        this._orders = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get approvedBy() {
        return this._approvedBy;
    }

    set approvedBy(value) {
        this._approvedBy = value;
    }

    get dateApproved() {
        return this._dateApproved;
    }

    set dateApproved(value) {
        this._dateApproved = value;
    }

    get date() {
        return this._date;
    }

    get requisitionOrig() {
        return this._requisitionOrig;
    }

    set requisitionOrig(value) {
        this._requisitionOrig = value;
    }
}

schema.plugin(mongoosePaginate);
schema.loadClass(Requisition);
module.exports = mongoose.model('Requisition', schema);
