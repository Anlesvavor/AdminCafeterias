const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Objectid = Schema.ObjectId;
const mongoosePaginate = require('mongoose-paginate-v2');


const schema = new Schema({
    _firstName: {
        type: String
    },
    _lastName: {
        type: String
    },
    _email: {
        type: String,
        required: true,
        index : {
            unique: true
        }
    },
    _password: {
        type: String,
        required: true
    },
    _role: {
        type: String
    }
});

class User{
    constructor(id, email, password, firstName, lastName, role) {
        this._id = id;
        this._email = email;
        this._password = password;
        this._firstName = firstName;
        this._lastName = lastName;
        this._role = role;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }
}

schema.plugin(mongoosePaginate);
schema.loadClass(User);
module.exports = mongoose.model('User', schema)