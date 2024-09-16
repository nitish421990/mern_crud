import axios from "axios";
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";


function Users() {
    const [users, setUsers]= useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001")
       .then(response => setUsers(response.data))
       .catch(error => console.log(error))
       
    }, [])
    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/'+id)
       .then(response => {console.log(response.data)
        window.location.reload()})
       .catch(error => console.log(error))
    }
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <Link to="/create"  className="btn btn-success">Add+</Link>
            <table className="table">
                <thead> 
                
                    <tr>
                        <td>Name</td>
                        <td>Email</td>    
                        <td>Age</td>    
                        <td>Action</td>    
                    </tr> 
                    </thead> 
                    <tbody> 
                        {
                            users.map((user, index) => {
                               return  <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td> 
                                        <Link to={`/update/${user._id}` } className="btn btn-success">Update</Link>
                                        <button className="btn btn-danger" onClick={(e) => handleDelete(user._id)}>Delete</button>   
                                        </td>
                                    </tr>
                        })
                        }
                        
                </tbody>
            </table>

        </div>
        </div>
   )
}

export default Users;