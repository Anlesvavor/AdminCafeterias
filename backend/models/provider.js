const mongoose = require('mongoose');

const Schema = mongoose.Shema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    _name: String,
    _contact: String,
    _telephoneNumber: String,
    _email: String,
    _rfc: String,
    _PC: String,
    _street: String,
    _number: String,
    _extNumber: String,
    _colony: String
});

class Provider {
    constructor(name, contact, telephoneNumber, email, rfc, PC, street, number, extNumber, colony) {
        this._name = name;
        this._contact = contact;
        this._telephoneNumber = telephoneNumber;
        this._email = email;
        this._rfc = rfc;
        this._PC = PC;
        this._street = street;
        this._number = number;
        this._extNumber = extNumber;
        this._colony = colony;
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get contact() {
        return this._contact;
    }

    set contact(value) {
        this._contact = value;
    }

    get telephoneNumber() {
        return this._telephoneNumber;
    }

    set telephoneNumber(value) {
        this._telephoneNumber = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get rfc() {
        return this._rfc;
    }

    set rfc(value) {
        this._rfc = value;
    }

    get PC() {
        return this._PC;
    }

    set PC(value) {
        this._PC = value;
    }

    get street() {
        return this._street;
    }

    set street(value) {
        this._street = value;
    }

    get number() {
        return this._number;
    }

    set number(value) {
        this._number = value;
    }

    get extNumber() {
        return this._extNumber;
    }

    set extNumber(value) {
        this._extNumber = value;
    }

    get colony() {
        return this._colony;
    }

    set colony(value) {
        this._colony = value;
    }
}

schema.plugin(mongoosePaginate);
schema.loadClass(Provider);
module.exports = mongoose.model('Provider', schema);