import axios from "axios";
import { useEffect } from "react";

function Test(){

    // Get token
    let token=localStorage.getItem("token")
    // API url
    let apiURL="http://localhost:5000"
    // Create axios Obj
    let authAxios=axios.create({
        baseURL:apiURL,
        headers:{
            authorization:`bearer ${token}`
        }
    })
    // // Adding token to header of the req obj
    // axios.interceptors.request.use(
    //     config=>{
    //         config.headers.authorization=`bearer ${token}`;
    //         return config
    //     },
    //     error=>{
    //         return Promise.reject(error)
    //     }
    // )
    // sample fetching data
    useEffect(()=>{
        authAxios.get('/users/test')
        .then(res=>{
        let result=res.data.message
        console.log(result)
        alert(result)
    }) 
    .catch(err=>alert(err))
    })
    return(
        <h1>test</h1>
    )
}

export default Test;