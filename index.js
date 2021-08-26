const express = require("express");
const app = express();
require("dotenv").config();
const mongo = require("./Shared/mongo");
const jwt = require("jsonwebtoken");

const authRoute = require("./Routes/auth.route");
const registerRoute = require("./Routes/register.route");
const loginRoute = require("./Routes/login.route");
const profileRoute = require("./Routes/profile.route");


app.listen(process.env.PORT, () => {
    console.log(`Connected to ${process.env.PORT} Server...`);
});

async function loadApp() {
    try {
        await mongo.connect();
        app.use(express.json());
        app.use("/auth", authRoute);

        app.use((req, res, next) => {
          const token = req.headers["access-token"];
          
         if(token){
             try{
              const {userId} =   jwt.verify(token,process.env.JWT_PRIVATE_KEY);
             req.user = userId;
                next();
             }
             catch(error){
                res.status(401).send({ error: "Invalid token"});
             }
         }else{
            res.status(401).send({error : "Token is missing"});
         }
           
        });

        app.use("/register", registerRoute);
        app.use("/login", loginRoute);
       app.use("/profile",profileRoute);

    }
    catch (err) {
        console.error(err);
        process.exit();
    }
}

loadApp();