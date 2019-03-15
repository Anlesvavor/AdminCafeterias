const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

let schema = new Schema({
  _name: String,
  _unities: [],
  _category: String,
  _description: String,
  _price: Number,
  _provider : []
});

class Product{

  constructor(name, unities, category, description, price, provider){
    this._name = name;
    this._unities = unities;
    this._category = category;
    this._description = description;
    this._price = price;
    this._provider = provider;
  }

  get name(){
    return this._name;
  }

  set name(v){
    this._name = v;
  }

  get unities(){
    return this._unities;
  }

  set unities(v){
    this._unities = v;
  }

  get category(){
    return this._category;
  }

  set category(v){
    this._category = v;
  }

  get description(){
    return this._description;
  }

  set description(v){
    this._description = v;
  }

  get price(){
    return this._price;
  }

  set price(v){
    this._price = v;
  }


  get provider() {
      return this._provider;
  }

  set provider(value) {
      this._provider = value;
  }
}

schema.plugin(mongoosePaginate);
schema.loadClass(Product);
module.exports = mongoose.model('Product', schema);
