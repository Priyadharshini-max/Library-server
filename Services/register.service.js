const mongo = require("../Shared/mongo");

const service = {
     createRegisterUser(data){
return mongo.db.collection("register").insertOne(data);
    },
    displayRegisterUser(){
        return mongo.db.collection("register").find().toArray();
    }
}

module.exports = service;