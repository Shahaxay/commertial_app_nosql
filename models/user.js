const mongoDb=require('mongodb');

const database=require('../util/database');

class OS_user{
    constructor(name,email){
        this.name=name,
        this.email=email
    }
    save(){
        const db=database.getDb();
        return db.collection('User').insertOne(this);
    }
    static findUserByID(userId){
        const db=database.getDb();
        return db.collection('User').findOne({_id:new mongoDb.ObjectId(userId)});
    }
}

module.exports=OS_user;