import {BrowserRouter,Link,Switch,Route,Redirect} from 'react-router-dom'
import AddProduct from "./products/AddProduct";
import ViewProduct from "./products/ViewProduct";
function Products(){
   
    return(
        <BrowserRouter>
      {/* Buttons */}
      <div className="d-block float-end mt-2 me-4">
        <button className="btn btn-dark ms-3">
        <Link className="nav-link text-light" to="/products">VIEW PRODUCTS</Link>
        </button>
      </div>
      <br></br>
      {/* Routing */}
      <Switch>
      <Route path="/products/viewproducts">
          <ViewProduct />
        </Route>
        <Route path="/products">
          <Redirect to="/products/viewproducts" />
        </Route>
      </Switch>
      </BrowserRouter>
    )
}

export default Products;