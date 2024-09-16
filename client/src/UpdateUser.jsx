import axios from "axios";
import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";


function UpdateUser() {
    const {id}=useParams();
    const[name, setName]= useState();
    const[email, setEmail]= useState(); 
    const[age, setAge]= useState(); 
    const navigate= useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3001/getUser/"+id)
       .then(response => {console.log(response.data)
        setName(response.data.name)
        setEmail(response.data.email)
        setAge(response.data.age)
       
    })
       .catch(error => console.log(error))
       
    }, [])

    const Update = (e) => {
        e.preventDefault();
        const user = {
            name: name,
            email: email,
            age: age
        }
        axios.put("http://localhost:3001/updateUser/"+id, {name, email, age})
           .then(res =>{
             console.log(res.data)
             navigate("/")
           }
            )
           .catch(err => console.log(err))
    }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Update}>
                    <h2>update User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" className="form-control" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input type="text" className="form-control" placeholder="Enter age" value={age} onChange={(e)=>setAge(e.target.value)} />
                    </div>
                    <button className="btn btn-success"> Update</button>

                </form>
            </div>

        </div>
)}

export default UpdateUser;