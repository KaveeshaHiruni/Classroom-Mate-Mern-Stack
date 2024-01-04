import React,{useState} from "react";
import axios from 'axios';

function AddStudent(){

    const[name,setName] = useState("")
    const[age,setAge] = useState(0)
    const[gender,setGender] = useState("")


    function sendData(e){
        e.preventDefault();

        const newStudent = {
            name,
            age,
            gender
        }
        axios.post("http://localhost:8070/student/add",newStudent)
        .then(()=>{
            alert("Student Added!!")
        })
        .catch((err) => {
            alert(err)
        })
    }

    return(
        <div className="container">
            <form onSubmit={sendData}>
                <br/>
                <h1>Add Student</h1>
                <br/>
                <div className="mb-3">
                    <label for="entername" >Student Name</label>
                    <input type="text" className="form-control" id="entername" placeholder="Enter Student Name.." 
                    onChange={(e) => {
                        setName(e.target.value)
                    }}/>
                </div>
                <div className="mb-3">
                    <label for="enterage">Student Age</label>
                    <input type="text" className="form-control" id="enterage" placeholder = "Enter Student Age.." 
                    onChange={(e) => {
                        setAge(e.target.value)}
                    }/>
                </div>
                <div className="mb-3">
                    <label for="entergender">Student Gender</label>
                    <input type="text" className="form-control" id="entergender" placeholder="Enter Student Gender.." 
                    onChange={(e) => {
                        setGender(e.target.value)
                    }}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddStudent;