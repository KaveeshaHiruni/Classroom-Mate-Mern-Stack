const router = require("express").Router(); 
let Student = require("../models/Student.js");

//insert student
//http://localhost:8070/student/add
router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        name,
        age,
        gender
    })

    newStudent.save().then(()=>{
        res.json("Student Added!!")
    }).catch(()=>{
        console.log(err);
    })
})

//get student details 
//http://localhost:8070/student/
router.route("/").get((req,res) => {

    Student.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        console.log(err)
    })
})

//update student details
//http://localost:8070/student/update/{id}
router.route("/update/:studentId").put(async(req,res) => {
    let userId = req.params.studentId;
    //destructure 
    const {name,age,gender} = req.body;

   const updateStudent = {
        name,
        age,
        gender
   }

   //send updated data to the frontend (user : update)
   await Student.findByIdAndUpdate(userId,updateStudent)
   .then(()=>{
        res.status(200).send({status : "User updated!!"})
   }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error with user updating data!!",error : err.message});
   })
})

//delete
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status : "User deteled!!"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Error deleting data!!",error : err.message});
    })
})

//fetch one user
router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;

    await Student.findById(userId)
    .then((student)=>{
        res.status(200).send({status : "User fetched!!",student})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Error fetching data!!", error : err.message});
    })
})

module.exports = router;