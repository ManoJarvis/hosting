import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {BrowserRouter,Link,Switch,Route,Redirect} from 'react-router-dom'
import AddProduct from "./products/AddProduct";
import ViewProduct from "./products/ViewProduct";
function AdminProfile(){
    let url=useParams()
    let [user,setuser]=useState({})
    
    useEffect(()=>{
        setuser(JSON.parse(localStorage.getItem('user')))
    },[url.name])
    return(
        <div>
        <div className="m-5 bg-secondary text-center text-light shadow rounded p-3">
            <h1>User Details!</h1>
            <h4></h4>
            <h4>Name: {user.name}</h4>
            <h4>Email: {user.email}</h4>
            <h4>DOB: {user.date}</h4>
        </div>
            <hr></hr>
    <BrowserRouter>
      {/* Nav  */}
      <div className="d-block float-end mt-2 me-4">
      <ul class="nav nav-pills nav-fill bg-light p-1 shadow-lg rounded">
        <li class="nav-item bg-dark rounded">
            <Link className="nav-link text-light" to="/admin/addproducts">ADD PRODUCTS</Link>
        </li>
        <li class="nav-item ms-3 bg-dark rounded">
            <Link className="nav-link text-light" to="/admin/viewproducts">VIEW PRODUCTS</Link>
        </li>  
      </ul>
      </div>
      <br></br>
      {/* Routing */}
      <Switch>
      <Route path="/admin/addproducts">
            <AddProduct />
      </Route>
      <Route path="/admin/viewproducts">
          <ViewProduct />
        </Route>
        <Route path="/adminprofile/admin">
          <Redirect to="/admin/viewproducts" />
        </Route>
      </Switch>
      </BrowserRouter>
        </div>
    )
}

export default AdminProfile;