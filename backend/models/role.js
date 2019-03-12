const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

let schema = new Schema({
  _name: String,
  _value: Number
});

class Role{

  constructor(name, value){
    this._name = name;
    this._value = value;
  }

  get name(){
    return this._name;
  }

  set name(v){
    this._name = v;
  }

  get value(){
    return this._value;
  }

  set value(v){
    this._value = v;
  }

}

schema.plugin(mongoosePaginate);
schema.loadClass(Role);
module.exports = mongoose.model('Role', schema);
