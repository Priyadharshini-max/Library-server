const express = require("express");
const router = express.Router();
const loginService = require("../Services/Login.service");

router.get("/", async (req, res) => {
    const loginUser = await loginService.displayAllLoginData();
    res.send(loginUser);
})

router.get("/:id", async (req, res) => {
    const loginUser = await loginService.displayLoginData(req.params.id);
    res.send(loginUser);
})

router.post("/", async (req, res) => {
    const loginUser = await loginService.createLoginData(req.body);
    res.send(loginUser);
})

router.put("/:id",async(req,res)=>{
    const loginUser = await loginService.updateLoginData(req.params.id, req.body)
    res.send(loginUser);
})

router.delete("/:id",async(req,res)=>{
    const loginUser = await loginService.deleteLoginData(req.params.id);
    res.send(loginUser);
})

module.exports = router;