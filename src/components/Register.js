import axios from 'axios';
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
function Register(){
    let {register,handleSubmit,formState:{errors}} = useForm();
    let history=useHistory();
    let [file,setFile]=useState(null);
    // Function to save the data
    const onFormSubmit=(userObj)=>{
        // create form obj
        let formData=new FormData;
        // add imgs to form data
        formData.append('dp',file,file.name)
        // Add userObj to Form data
        formData.append('userObj',JSON.stringify(userObj))
        // Pass data to backend
        axios.post('/users/createusers',formData)
        .then(res=>alert(res.data.message))
        .catch(err=>console.log(err))
        history.push('/login')  
    }
    // for file upload
    const onFileSubmit=(event)=>{
      setFile(event.target.files[0])
    }

    return(
        <div>
            <form className="form w-75 mx-auto mt-5 pb-4 shadow" onSubmit={handleSubmit(onFormSubmit)}>
            {/* username */}
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="un" placeholder="username" autoComplete="off"
                {...register('name',{required:true,minLength:4,maxLength:12})}/>
                {errors.username?.type==="required" && <p className="text-light">Username is required</p>}
                {errors.username?.type==="minLength" && <p className="text-light">Username should be min 4 and max 12 length</p>}
                {errors.username?.type==="maxLength" && <p className="text-light">Username should be min 4 and max 12 length</p>}
                <label htmlFor="un">USERNAME</label>
            </div>
            {/* password */}
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="pw" placeholder="password" autoComplete="off"
                {...register('password',{required:true,minLength:8})}/>
                {errors.password?.type==="required" && <p className="text-light">password is required</p>}
                {errors.password?.type==="minLength" && <p className="text-light">Password length should be min 8</p>}
                <label htmlFor="pw">PASSWORD</label>
            </div>
            {/* Email */}
            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="em" placeholder="email" autoComplete="off"
                {...register('email',{required:true})}/>
                {errors.email?.type==="required" && <p className="text-light">email is required</p>}
                <label htmlFor="em">EMAIL</label>
            </div>
            {/* Date */}
            <input type="date" className="form-control mb-3 p-3" id="date" placeholder="date" autoComplete="off"
                {...register('date',{required:true})}/>
                {errors.date?.type==="required" && <p className="text-light">date is required</p>}
            {/* Upload foto */}
            <input type="file" className="form-control" name="dp" onChange={e=>onFileSubmit(e)} />
            {/* SUBMIT */}
            <button type="submit" className="btn btn-dark mt-4 d-block mx-auto">SUBMIT</button>
            </form>
        </div>
    )
}

export default Register;