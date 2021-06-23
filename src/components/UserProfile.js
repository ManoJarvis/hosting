import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import '../App.css'
import ViewProduct from './products/ViewProduct';
function UserProfile(){
    let url=useParams()
    let [user,setuser]=useState({})
    
    useEffect(()=>{
        setuser(JSON.parse(localStorage.getItem('user')))
    },[url.name])
    return(
        <div>
        <h1 className="text-light bg-secondary rounded shadow-lg p-3 me-5 float-end mt-3">Welcome {user.name}
            <span> <img className="icn" src={user.profileImg} width="30px"></img></span>
        </h1>
        <br></br>
        <br></br>
        {/* User Card */}
        <div className="container row mt-5">
            <div className="col-4 d-block mx-auto">
                <div className="card bg-secondary shadow-lg text-light">
                    <img src={user.profileImg} width="100%" className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-text">Name: {user.name}</h5>
                        <h5 className="card-text">Email: {user.email}</h5>
                        <h5 className="card-text">DOB: {user.date}</h5>
                    </div>
                </div>
            </div>
        </div>
        <hr className="text-light"></hr>
        <ViewProduct />
        </div>
    )
}

export default UserProfile;