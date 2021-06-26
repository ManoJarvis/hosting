import axios from "axios";
import { useEffect, useState } from "react";
import '../App.css'
import emptyCart from '../imgs/emptyCart.png'
function UserCart(props){
    // Getting cart details from the props
    let cart=props.cartObj
    let [cartObj,setCartObj]=useState([])
    useEffect(()=>{
        // setting cart items to cartObj
        setCartObj(cart)    
    },[])
    return(
       <div className=" mt-5 text-center p-5">
           <table className="table table-dark rounded">
               <thead className="bg-secondary">
                   <th>Product Name</th>
                   <th>Model</th>
                   <th>Image</th>
               </thead>
                <tbody>
                {cartObj?
                    cartObj.map((prdObj,ind)=>{
                        return(
                            <tr>
                                <td>{prdObj.productname}</td>
                                <td>{prdObj.model}</td>
                                <td><img src={prdObj.prdImg} width="60px"/></td>
                            </tr>
                        )
                    }):<tr className="">
                            <td></td>
                            <td><img src={emptyCart}  width="100px"></img></td>
                            <td></td>
                       </tr>                
                }
                </tbody>
           </table>
       </div>
    )
}

export default UserCart;