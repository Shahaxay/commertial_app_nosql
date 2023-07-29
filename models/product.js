const mongoDb=require('mongodb');
const database=require('../util/database');

class Product{
  constructor(title,price,description,imageUrl,id){
    this.title=title,
    this.price=price,
    this.description=description,
    this.imageUrl=imageUrl,
    this._id=new mongoDb.ObjectId(id);
  }

  save(){
    const db=database.getDb();
    if(this._id){
      //update
      return db.collection('Product').updateOne({_id:this._id},{$set:this});
    }else{
      //insert
      return db.collection('Product').insertOne(this);
    }
  }

  static findAll(){
    const db=database.getDb();
    return db.collection('Product').find().toArray();
  }

  static findByPk(prodId){
    const db=database.getDb();
    return db.collection('Product').findOne({_id:new mongoDb.ObjectId(prodId)});
  }

  static deleteById(prodId){
    const db=database.getDb();
    return db.collection('Product').deleteOne({_id:new mongoDb.ObjectId(prodId)});
  }
}
module.exports=Product; 