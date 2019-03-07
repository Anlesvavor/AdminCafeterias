const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

let schema = new Schema({
  _cantidad : Number,
  _unidad : String,
  _producto : String
});

class Order{

  constructor(cantidad, unidad, producto){
    this._cantidad = cantidad;
    this._unidad = unidad;
    this._producto = producto;
  }

  get cantidad(){
    return this._cantidad;
  }

  set cantidad(v){
    this._cantidad = v;
  }

  get unidad(){
    return this._unidad;
  }

  set unidad(v){
    this._unidad = v;
  }

  get producto(){
    return this._producto;
  }

  set producto(v){
    this._producto = v;
  }
}

schema.plugin(mongoosePaginate);
schema.loadClass(Order);
module.exports = mongoose.model('Order', schema);
