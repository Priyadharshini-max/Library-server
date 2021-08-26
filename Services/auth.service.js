const bcrypt = require("bcrypt");
const schema = require("../Shared/schema");
const mongo = require("../Shared/mongo");
const jwt = require("jsonwebtoken");

const service = {
    async register(req, res) {

        try {
            let data = req.body;

            // Input Validation
            const { error } = schema.register.validate(data);
            if (error) return res.status(400).send(error.details[0].message)

            // Email Validation
            const userEmail = await service.findEmail(data.email);
            if (userEmail) return res.status(400).send({ error: "User already registered" });

            const salt = await bcrypt.genSalt(8);
            data.password = await bcrypt.hash(data.password, salt);

            await mongo.db.collection("register").insertOne(data);
            res.send({ message: "Registered successfully !" })
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ error: "Internal server error" })
        }

    },
    async login(req, res) {
        try {
            let data = req.body;

            // Input Validation
            const { error } = schema.login.validate(data);
            if (error) return res.status(400).send(error.details[0].message);

            // Email Validation
            const user = await service.findEmail(data.email);
            if (!user) return res.status(403).send({ error: "Mail id doesn't exist" });

            // Compare Password
            const isValid = await bcrypt.compare(data.password, user.password);
            if (!isValid) return res.status(403).send({ error: "Invalid password" });

            // Generate JWT
            const token = jwt.sign({ userId: user._id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "8h" });
            // await mongo.db.collection("login").insertOne(data);
            res.send({ token });
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ error: "Internal server error" });
        }
    },

    findEmail(email) {
        return mongo.db.collection("register").findOne({ email });
    }
}


module.exports = service;