import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const retrieveProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`
  );
  return response.data;
};

const ProductList = ({ onDetailsId }) => {
  const [page, setPage] = useState(1);

  const {
    data: products,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retrieveProducts,
    staleTime: 5000,
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
    <div className="flex flex-col justify-center items-center w-3/5">
      <h1 className="text-3xl text-red-400 font-semibold text-center my-2">
        PRODUCT LIST
      </h1>
      <ul className="flex flex-wrap justify-center items-center">
        {products.data &&
          products.data.map((product) => (
            <li
              key={product.id}
              className="flex flex-col items-center m-2 border rounded-lg"
            >
              <img
                className="object-cover h-64 w-96"
                src={product.thumbnail}
                alt="img"
              />
              <h2 className="my-3 text-3xl">{product.title}</h2>
              <a
                onClick={() => onDetailsId(product.id)}
                className="my-2 cursor-pointer text-blue-600 underline"
              >
                Show Details
              </a>
            </li>
          ))}
      </ul>
      <div>
        {
          <button
            disabled={!products.prev}
            className={`${
              !products.prev
                ? "bg-gray-200 mx-1 cursor-pointer rounded-md px-3 py-1 text-black"
                : "bg-black mx-1 cursor-pointer rounded-md px-3 py-1 text-white"
            }`}
            onClick={() => setPage(products.prev)}
          >
            Prev
          </button>
        }
        {
          <button
            disabled={!products.next}
            className={`${
              !products.next
                ? "bg-gray-200 mx-1 cursor-pointer rounded-md px-3 py-1 text-black"
                : "bg-black mx-1 cursor-pointer rounded-md px-3 py-1 text-white"
            }`}
            onClick={() => setPage(products.next)}
          >
            Next
          </button>
        }
      </div>
    </div>
  );
};

export default ProductList;
