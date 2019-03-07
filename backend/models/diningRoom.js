const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

let schema = new Schema({
  _name: String,
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  _description: String
});

class DiningRoom{

  constructor(name, user, description){
    this._name = name;
    this._user = user;
    this._description = description;
  }

  get name(){
    return this._name;
  }

  set name(v){
    this._name = v;
  }

  get user(){
    return this._user;
  }

  set user(v){
    this._user = v;
  }

  get description(){
    return this._description;
  }

  set description(v){
    this._description = v;
  }

}

schema.plugin(mongoosePaginate);
schema.loadClass(DiningRoom);
module.exports = mongoose.model('DiningRoom', schema);
