const express = require("express");
const router = express.Router();

const RegisterService = require("../Services/register.service");

router.post("/",async(req,res)=>{
    const registerUser =  await  RegisterService.createRegisterUser(req.body);
    res.send(registerUser);
})

router.get("/",async(req,res)=>{
    const registerUser = await RegisterService.displayRegisterUser();
    res.send(registerUser);
})

module.exports=router;