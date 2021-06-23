import axios from 'axios';
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
function Login(props){
    let {register,handleSubmit,formState:{errors}} = useForm();
    let history=useHistory();
    // Function to save the data
    const onLoginSubmit=(userObj)=>{
        // User type Admin
           axios.post(`${userObj.userType}/login`,userObj)
           .then(res=>{
            let responseObj=res.data
            if(responseObj.message==="login successfull"){
                // Save token to browser's local memory
                localStorage.setItem("token",responseObj.token)
                localStorage.setItem("user",JSON.stringify(responseObj.user))
                // To change state of user status for logout funcinalaty
                props.setUserStatus(true)
                // Moving to userprofile or adminprofile
                if(userObj.userType==="admin"){
                    history.push(`/adminprofile/${responseObj.user.name}`)
                }
                if(userObj.userType==="users"){
                    history.push(`/userprofile/${responseObj.user.name}`)
                }
            }else{ 
                alert(responseObj.message)
             }   
           })

        }
    return(
        <div className="mt-5">
            <h1 className="h1 text-center text-light">Login form</h1>
             <form className="form w-75 mx-auto mt-5 pb-4 shadow" onSubmit={handleSubmit(onLoginSubmit)}>
            
            {/* User Or Admin */}
            <div className="form-check form-check-inline mb-3 text-light ms-5">
                <input className="form-check-input" type="radio" name="usertype" id="user" value="users" checked
                {...register('userType')} />
                <label className="form-check-label" htmlFor="user">USER</label>
            </div>
            <div className="form-check form-check-inline mb-3 text-light ms-5">
                <input className="form-check-input" type="radio" name="usertype" id="admin" value="admin" 
                {...register('userType')}/>
                <label className="form-check-label" htmlFor="admin">ADMIN</label>
            </div>

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
                {/* SUBMIT */}
            <button type="submit" className="btn btn-dark mt-4 d-block mx-auto">SUBMIT</button>
            </div>
            </form>
        </div>
    )
}

export default Login;