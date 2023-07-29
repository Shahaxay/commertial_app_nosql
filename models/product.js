const database=require('../util/database');

class Product{
  constructor(title,price,description,imageUrl){
    this.title=title,
    this.price=price,
    this.description=description,
    this.imageUrl=imageUrl
  }

  save(){
    const db=database.getDb();
    return db.collection('Product').insertOne(this);
  }
}
module.exports=Product;