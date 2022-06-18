const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("../models/user");
const taskRouter = require("../models/task");
const task = require("../models/task");

const router = new express.Router();
//נתיב שמחזיר את כל המשתמשים
router.get("/api/user", async (req, res) => {
    const allUsers = await userRouter.find({});
    res.send(allUsers);
    console.log(allUsers);
  });
//נתיב שיוצר משתמש
router.post("/api/task", async (req, res) => {
  try {
    console.log(req.body);
    const newUser = new userRouter(req.body);
    await newUser.save();
    console.log(newUser);
   
    const tasksOfUser = req.body.users;
    console.log(tasksOfUser);
    tasksOfUser.map(async (el) => {
    
   const task=await taskRouter.findOne({idUser:el})
    console.log(task)
    const usersTask = task.users
    console.log(usersTask);
    await task.updateOne({users:usersTask.push(req.body.idUser)})
    console.log(usersTask);
    await taskRouter.findOneAndUpdate({idTask:el},{users:usersTask})
 

    })
      
      res.send("");
    } catch (error) {
      res.send(error);
    }
  });

//נתיב לעידכון פרטי משתמש
router.post("/api/user/:iduser",async (req,res)=>{
    try{
        console.log(req.params)
        const { name } = req.params
        console.log(req.body)
        
        await userRouter.findOneAndUpdate({ iduser },req.body);
       
        res.send()
    }
    catch(error){
        res.send(error)
    }
})
//נתיב למחיקת משתמש
router.post("/api/taskDelete/:idUser",async (req,res)=>{
  try{
    console.log(req.params)
    const { idUser } = req.params
    const user = await userRouter.find({idUser})
  console.log(user)
  const tasksOfUser = user[0].tasks
  console.log(tasksOfUser);
  tasksOfUser.map(async(el)=>{ 
    const task = await taskRouter.find({idTask:el})
    const usersOfTask = task[0].users
    console.log(usersOfTask);
    const newUsersOfTask = usersOfTask.filter((user)=>{
      return user!=idUser
    })
    
    console.log(newUsersOfTask);
   await taskRouter.findOneAndUpdate({idTask:el},{users:newUsersOfTask})
    
 res.send("deleted")
  })
}    
  catch{
    res.send("not")
  }

})

//נתיב למציאת משתמש והצגת המשימות של המשתמש
router.get("/api/findUser/:idUser", async(req,res)=>{
  const findUser = await userRouter.find({idUser:req.params.id})
  console.log(findUser);
  console.log(findUser[0].idUser)
  res.send(findUser[0].tasks)
})



module.exports= router