const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

let schema = new Schema({
  _name: String
});

class Unity{

  constructor(name){
    this._name = name;
  }

  get name(){
    return this._name;
  }

  set name(v){
    this._name = v;
  }
}

schema.plugin(mongoosePaginate);
schema.loadClass(Unity);
module.exports = mongoose.model('Unity', schema);
