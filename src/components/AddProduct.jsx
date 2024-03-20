import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const AddProduct = () => {
  const queryClient = useQueryClient();

  const [formManage, setFormManage] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 5,
    thumbnail: "",
  });

  const mutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post("http://localhost:3000/products", newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newData = { ...formManage, id: crypto.randomUUID().toString() };
    mutation.mutate(newData);
    setFormManage({
      title: "",
      description: "",
      price: 0,
      rating: 5,
      thumbnail: "",
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
    setFormManage({
      ...formManage,
      [name]: value,
    });
  };

  if (mutation.isLoading) {
    return (
      <div className="w-full font-semibold mt-40 text-center text-3xl text-cyan-300 flex justify-center items-center">
        Submitting...
      </div>
    );
  } else if (mutation.isError) {
    return (
      <div className="w-full font-semibold mt-40 text-center text-3xl text-cyan-300 flex justify-center items-center">
        An error occured: {mutation.error.message}
      </div>
    );
  }
  return (
    <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
      <h1 className="text-3xl text-red-400 font-semibold text-center my-2">
        ADD A PRODUCT
      </h1>
      <form className="flex flex-col" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="title"
          value={formManage.title}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product name"
        />
        <textarea
          type="text"
          name="description"
          value={formManage.description}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Description"
        />
        <input
          type="number"
          name="price"
          value={formManage.price}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Price"
        />
        <input
          type="text"
          name="thumbnail"
          value={formManage.thumbnail}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Thumbnail"
        />
        <button
          type="submit"
          className="bg-black m-auto text-white p-1 rounded-md"
        >
          Add a Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
