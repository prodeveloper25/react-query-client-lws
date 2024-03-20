import { useState } from "react";
import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

function App() {
  const [detailsId, setDetailsId] = useState(1);
  return (
    <div className="flex m-2">
      <AddProduct />
      <ProductList onDetailsId={setDetailsId} />
      <ProductDetails id={detailsId} />
    </div>
  );
}

export default App;
