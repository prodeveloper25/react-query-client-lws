import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ProductDetails = ({ id }) => {
  const retrieveProduct = async ({ queryKey }) => {
    const response = await axios.get(
      `http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
    );
    return response.data;
  };
  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: retrieveProduct,
  });
  if (isLoading) {
    return (
      <div className="w-full font-semibold mt-40 text-center text-3xl text-cyan-300 flex justify-center items-center">
        Fetching Products...
      </div>
    );
  } else if (error) {
    return (
      <div className="w-full font-semibold mt-40 text-center text-3xl text-cyan-300 flex justify-center items-center">
        An error occured: {error.message}
      </div>
    );
  }
  return (
    <div className="w-1/5">
      <h1 className="text-3xl text-red-400 font-semibold text-center my-2">
        PRODUCT DETAILS
      </h1>
      {/* content  */}
      <div className="flex flex-col justify-center items-center m-2 border rounded-lg bg-gray-100 p-2">
        <img
          className="object-cover h-64 w-96"
          src={product.thumbnail}
          alt="img"
        />
        <h2 className="my-3 text-2xl">{product.title}</h2>
        <p className="my-2">{product.description}</p>
        <p className="text-xl">USD: ${product.price}</p>
        <p className="text-lg">{product.rating}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
