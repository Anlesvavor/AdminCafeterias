const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    _name: String
});

class Category {
    constructor(name) {
        this._name = name;

    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

}

schema.plugin(mongoosePaginate);
schema.loadClass(Category);
module.exports = mongoose.model('Category', schema);
