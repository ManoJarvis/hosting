import axios from "axios";
import { useEffect, useState } from "react";
function ViewProduct(props){
    // Props to add product to cart
    let addProductToCart=props.addProductToCart;
    let [productlist,setProductList]=useState([])
    let [user,setuser]=useState({})
    useEffect(()=>{
        axios.get('/products/getproducts')
        .then(res=>{
            setProductList(res.data.message);
        })
        .catch(err=>console.log(err.message))
        setuser(JSON.parse(localStorage.getItem('user')))
    },[])
    return(
        <div className="container">
        <div className="row row-cols-1 row-cols-md-3 mt-5">
            {
                productlist.map(prdObj=>{
                    return(
                        <div className="col mb-3">
                            <div className="card bg-secondary shadow-lg text-light">
                                <img src={prdObj.prdImg} width="100%" className="card-img-top"/>
                                <div className="card-body">
                                    <h5 className="card-title">PRODUCT NAME: {prdObj.productname}</h5>
                                    <p className="card-text">MODEL: {prdObj.model}</p>
                                    <p className="card-text">CATEGORY: {prdObj.category}</p>
                                    <p className="card-text">PRICE: {prdObj.price}</p>
                                    {
                                        user.userType==="user"?
                                        <button className="btn btn-dark float-end"
                                         onClick={()=>addProductToCart(prdObj)}>ADD TO CART</button>:
                                         <button className="btn btn-dark float-end"
                                         >EDIT/DELETE</button>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
    )
}

export default ViewProduct;