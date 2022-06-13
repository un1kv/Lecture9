const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("../models/user");
const taskRouter = require("../models/task");

const router = new express.Router();
//נתיב למציאת כל המשימות
router.get("/api/tasks", async (req, res) => {
    const allTasks = await taskRouter.find({});
    console.log(allTasks)
    res.send(allTasks);
    
  });
//נתיב ליצירת משימה
  router.post("/api/task", async (req, res) => {
    try {
      console.log(req.body);
      const newTask = new taskRouter(req.body);
      await newTask.save();
      console.log(newTask);
     
      const userOfTask = req.body.users;
      console.log(userOfTask);
      userOfTask.map(async (el) => {
      
     const user=await userRouter.findOne({idUser:el})
      console.log(user)
      const tasksUser = user.tasks
      console.log(tasksUser);
      await user.updateOne({tasks:tasksUser.push(req.body.idTask)})
      console.log(tasksUser);
      await userRouter.findOneAndUpdate({idUser:el},{tasks:tasksUser})
     });
    
    res.send("ok")

      }

     catch (error) {
      res.send(error);
    }
  
  });
//נתיב לעידכון פרטי משימה
  router.post("/api/task/:idTask",async (req,res)=>{
    try{
        console.log(req.params)
        const { idTask } = req.params
        console.log(req.body)
        
        await taskRouter.findOneAndUpdate({ idTask },req.body);
       
        res.send("succses")
    }
    catch(error){
        res.send(error)
    }
})
//נתיב למחיקת משימה
router.post("/api/taskDelete/:idTask",async (req,res)=>{
    try{
      console.log(req.params)
      const { idTask } = req.params
      const task = await taskRouter.find({idTask})
    console.log(task)
    const usersOfTask = task[0].users
    console.log(usersOfTask);
    usersOfTask.map(async(el)=>{ 
      const user = await userRouter.find({idUser:el})
      const tasksOfUser = user[0].tasks
      console.log(tasksOfUser);
      const newTasksOfUser = tasksOfUser.filter((task)=>{
        return task!=idTask
      })
      
      console.log(newTasksOfUser);
     await userRouter.findOneAndUpdate({idUser:el},{tasks:newTasksOfUser})
      
   res.send("deleted")
    })
  }    
    catch{
      res.send("not")
    }

  })

//נתיב למציאת משימה והצגת המשתמשים של המשימה 
router.get("/api/findTask/:idTask", async(req,res)=>{
  const findTask = await taskRouter.find({idTask:req.params.idTask})
  console.log(findTask);
  console.log(findTask[0].idTask)
  res.send(findTask[0].users)
})
//נתיב למציאת משתמש,בדיקה האם המשימה קיימת ולהוסיף אם לא
router.post("/api/updateTask/:idUser/:idTask",async(req,res)=>{
  const {idUser,idTask} = req.params
  const user = await userRouter.find ({idUser})
  console.log(user);
  user[0].tasks.includes(idTask)? res.send("Already exists") :

   await userRouter.findOneAndUpdate({idUser},{tasks:[...user[0].tasks,idTask]})
   res.send("updated")
  })




module.exports= router