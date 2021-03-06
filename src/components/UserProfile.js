import { useEffect, useState } from 'react';
import { useHistory, useParams, useRouteMatch} from 'react-router-dom'
import {BrowserRouter,Link,Switch,Route,Redirect} from 'react-router-dom'
import '../App.css'
import axios from 'axios';
import ViewProduct from './products/ViewProduct';
import UserCart from './UserCart';
function UserProfile(){
    let [user,setUser]=useState({})
    let [cartObj,setCartObj]=useState([])
    let [cartLength,setCartLength]=useState(0)
    let [stateMonitor,setStateMonitor]=useState(1)
    let pathInfo=useRouteMatch()
    let history=useHistory()
     // For finding cart items and passing it to the UserCart
    useEffect(()=>{
        setUser(JSON.parse(localStorage.getItem('user')))
        let user=JSON.parse(localStorage.getItem('user'))
        axios.get(`/users/getproducts/${user.name}`)
            .then(res=>{
                setCartObj(res.data.message.products)
                if(cartObj!==[]){
                    setCartLength(res.data.message.products.length)
                }
            })
            .catch(err=>console.log(err))
    },[stateMonitor])
    
    // Function to add product to cart
    const addProductToCart=(prdObj)=>{
        let name=user.name
        let newObj={name,prdObj}
       
        // Make post req
        axios.post('/users/addtocart',newObj)
        .then(res=>{
            let responseObj=res.data
            alert(responseObj.message)
            setStateMonitor(stateMonitor+1)
            history.push(`${pathInfo.url}/cart`)
        })
        .catch(err=>console.log(err))
    }
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
        <BrowserRouter>
        <ul class="nav nav-pills nav-fill bg-light p-1 shadow-lg rounded">
        <li class="nav-item ms-3 bg-dark rounded">
            <Link className="nav-link text-light" to={`${pathInfo.url}/viewproducts`}>VIEW PRODUCTS</Link>
        </li>
        <li class="nav-item ms-3 bg-dark rounded">
            <Link className="nav-link text-light" to={`${pathInfo.url}/cart`}>CART
            <span className="text-light"> ({cartLength})</span></Link>
        </li>    
        </ul>
      <Switch>
        <Route path={`${pathInfo.url}/viewproducts`}>
          <ViewProduct addProductToCart={addProductToCart} />
        </Route>
        <Route path={`${pathInfo.url}/cart`}>
          <UserCart cartObj={cartObj}/>
        </Route>
        <Route path='/'>
          <Redirect to={`${pathInfo.url}/viewproducts`} />
        </Route>
       </Switch>
        </BrowserRouter>
        </div>
    )
}

export default UserProfile;