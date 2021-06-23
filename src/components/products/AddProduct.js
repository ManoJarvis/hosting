import axios from 'axios';
import { useState } from 'react';
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'
function AddProduct(){
    let {register,handleSubmit,formState:{errors}} = useForm();
    let history=useHistory();
    let [file,setFile]=useState(null);
    // Function to save the data
    const onFormSubmit=(prdObj)=>{
        // create form obj
        let formData=new FormData;
        // add imgs to form data
        formData.append('pimg',file,file.name)
        // Add prdObj to Form data
        formData.append('prdObj',JSON.stringify(prdObj))
        // Pass data to backend
        axios.post('/products/createproducts',formData)
        .then(res=>{
            if(res.data.message==="Product Inserted"){
                alert(res.data.message)
                history.push('/products/viewproducts')  
            }else{
                alert(res.data.message)
            }
        })
        .catch(err=>console.log(err))
        
    }
    // for file upload
    const onFileSubmit=(event)=>{
      setFile(event.target.files[0])
    }

    return(
        <div>
            <h1 className="text-light text-center h1 mt-5">Product Registration Form</h1>
            <form className="form text-secondary w-75 mx-auto mt-5 pb-4 shadow" onSubmit={handleSubmit(onFormSubmit)}>
            {/* product name */}
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="pn" placeholder="productname" autoComplete="off"
                {...register('productname',{required:true})}/>
                {errors.productname?.type==="required" && <p className="text-light">Product name is required</p>}
                <label htmlFor="pn">Product Name</label>
            </div>
            {/* category */}
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="cat" placeholder="category" autoComplete="off"
                {...register('category',{required:true})}/>
                {errors.category?.type==="required" && <p className="text-light">category is required</p>}
                <label htmlFor="cat">category</label>
            </div>
            {/* model */}
            <div className="form-floating mb-3">
                <input type="text" className="form-control p-3" id="model" placeholder="Model" autoComplete="off"
                {...register('model',{required:true})}/>
                {errors.model?.type==="required" && <p className="text-light">model is required</p>}
                <label htmlFor="model">Model</label>
            </div>
            {/* Upload foto */}
            <input type="file" className="form-control mb-3" name="pimg" onChange={e=>onFileSubmit(e)} />
             {/* Price */}
             <div className="form-floating mb-3">
                <input type="text" className="form-control" id="price" placeholder="price" autoComplete="off"
                {...register('price',{required:true})}/>
                {errors.price?.type==="required" && <p className="text-light">Price is required</p>}
                <label htmlFor="price">Price</label>
            </div>
            {/* SUBMIT */}
            <button type="submit" className="btn btn-dark mt-4 d-block mx-auto">SUBMIT</button>
            </form>
        </div>
    )
}

export default AddProduct;