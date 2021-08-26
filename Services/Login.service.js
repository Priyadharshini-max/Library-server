const { ObjectId } = require("mongodb");
const mongo = require("../Shared/mongo");


const service = {

    displayAllLoginData() {
        return mongo.db.collection("login").find().toArray();
    },
    displayLoginData(id) {
        return mongo.db.collection("login").findOne({ _id: ObjectId(id) });
    },
    createLoginData(data){
        return mongo.db.collection("login").insertOne(data);
    },
    updateLoginData(id, data) {
        return mongo.db
          .collection("login")
          .findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: data },
            { returnDocument: "after" }
          );
      },
      deleteLoginData(id){
          return mongo.db.collection("login").remove({_id: ObjectId(id)})
      }
   
}

module.exports = service;