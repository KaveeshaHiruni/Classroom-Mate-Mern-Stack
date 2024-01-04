import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateStudent() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:8070/student/get/${id}`)
            .then((res) => {
                console.log("Response:", res.data); // Log the response to check the data structure
                const studentData = res.data.student;
                setName(studentData.name);
                setAge(studentData.age);
                setGender(studentData.gender);
            })
            .catch((err) => {
                console.error("Error fetching student data:", err);
                alert("Error fetching student data");
            });
    }, [id]);

 
    function sendData(e){
        e.preventDefault();
        const newStudent = {
            name,
            age,
            gender
        }
        axios.put(`http://localhost:8070/student/update/${id}`,newStudent)
        .then(()=>{
            alert("Student Updated!!")
        })
        .catch((err) => {
            alert(err)
        })
    }

    return (
        <div className="container">
            <form onSubmit={sendData}>
                <br />
                <h1>Edit Student</h1>
                <br />
                <div className="mb-3">
                    <label htmlFor="entername">Student Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="entername"
                        placeholder="Enter Student Name.."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="enterage">Student Age</label>
                    <input
                        type="text"
                        className="form-control"
                        id="enterage"
                        placeholder="Enter Student Age.."
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="entergender">Student Gender</label>
                    <input
                        type="text"
                        className="form-control"
                        id="entergender"
                        placeholder="Enter Student Gender.."
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default UpdateStudent;
