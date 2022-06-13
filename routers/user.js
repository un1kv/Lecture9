const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("../models/user");
const taskRouter = require("../models/task");

const router = new express.Router();
//נתיב שמחזיר את כל המשתמשים
router.get("/api/user", async (req, res) => {
    const allUsers = await userRouter.find({});
    res.send(allUsers);
    console.log(allUsers);
  });
//נתיב שיוצר משתמש
  router.post("/api/user", async (req, res) => {
    try {
      console.log(req.body);
      const newUser = new userRouter(req.body);
      console.log(newUser);
      await newUser.save();
      
      res.send("");
    } catch (error) {
      res.send(error);
    }
  });

//נתיב לעידכון פרטי משתמש
router.post("/api/user/:name",async (req,res)=>{
    try{
        console.log(req.params)
        const { name } = req.params
        console.log(req.body)
        
        await userRouter.findOneAndUpdate({ name },req.body);
       
        res.send()
    }
    catch(error){
        res.send(error)
    }
})
//נתיב למחיקת משתמש
router.post("/api/userDelete/:name",async (req,res)=>{
    try{
        console.log(req.params)
        const { name } = req.params
        await userRouter.findOneAndDelete({ name });
       
        res.send("succses")
    }
    catch(error){
        res.send(error)
    }
})

router.get("/api/findUser/:id", async(req,res)=>{
  const findUser = await userRouter.find({id:req.params.id})
  console.log(findUser);
  console.log(findUser[0].id)
  res.send(findUser[0].tasks)
})



module.exports= router