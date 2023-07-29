const database=require('../util/database');

class Order{
    constructor(orderItems,userId){
        this.orderItems=orderItems,
        this.userId=userId
    }
    save(){
        const db=database.getDb();
        return db.collection('Order').insertOne(this);
    }

    // getOrder(){
    //     //can have many order
    //     //many items in each order

    // }
}

module.exports=Order;