const { ObjectId } = require("mongodb");
const mongo = require("../Shared/mongo");


const service = {

    displayLoginUser(id) {
        return mongo.db.collection("register").findOne
        ({ _id: ObjectId(id) },
        {projection : {_id :0, username : 1,email:1}});
    }
}

module.exports = service;