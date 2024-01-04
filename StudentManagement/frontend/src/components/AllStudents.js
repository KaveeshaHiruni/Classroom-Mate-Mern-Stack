import React,{useState,useEffect} from "react";
import axios from "axios"; 
import '../student.css';
import { useNavigate } from "react-router-dom";

export default function AllStudents(){
    const navigate = useNavigate();
    const [students,setStudents] = useState([])

    useEffect(()=>{
        function getStudents(){
            axios.get("http://localhost:8070/student/")
            .then((res)=>{
                setStudents(res.data)
            }).catch((err) => {
                alert(err.message)
            })
        }
        getStudents();
    },[])  

    function handleDelete(id) {  
        axios.delete(`http://localhost:8070/student/delete/${id}`)
        .then(()=>{
            alert("Deleted")
            setStudents(students.filter(student => student._id !== id));
        }).catch((err)=>{
            console.log(err.message)
        })
    };

    return (
        <div className="container bg">
            <br />
            <button onClick={() => navigate('/add')} className="btn btn-success mb-4" style={{ color: "white" }}> Add Student</button>
            <br /><br />
            <h2>All Students</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                            <td>{student.gender}</td>
                            <td>
                                <button type="button" className="btn btn-primary btn-gap" onClick={() => navigate(`/update/${student._id}`)}>Update</button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDelete(student._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}