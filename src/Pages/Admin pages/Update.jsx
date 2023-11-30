import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import axios from "axios";

const Update = () => {
  const Myloaderdata = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const {
    name,
    type,
    price,
    quantity,
    _id,
  } = Myloaderdata;
 
  const handleSubmit = (e) => {
    e.preventDefault();
      const form = e.target;
      const name = form.name.value;
      const type = form.type.value;
      const Price0 = form.price.value;
      const price = parseInt(Price0);
      const Quantity0 = form.quantity.value;
      const quantity = parseInt(Quantity0);

      const UpdateProduct = {name,type,price,quantity};
      console.log(UpdateProduct)
      axiosSecure.patch(`Asset/${_id}`,UpdateProduct)
        .then((data) => {
          console.log(data);
          if (data.statusText === "Ok") {
            Swal.fire({
              title: 'Success!',
              text: 'Coffee Updated Successfully',
              icon: 'success',
              confirmButtonText: 'Close',
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
  return (
    <div className="flex justify-center items-center">
      <Helmet>
        <title>Asset Management || Update Asset</title>
      </Helmet>
      <div className="bg-orange-300 mt-10 w-9/11 h-3/4 p-20">
        <h1 className="font-bold mb-10 text-center text-4xl">Update Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-lg">Product Name</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Product Name"
                className="input input-bordered  bg-gray-50 w-[40rem]"
                name="name"
                defaultValue={name}
                required
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-lg">Product Quantity</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Product Quantity"
                className="input input-bordered  bg-gray-50 w-[40rem]"
                name="quantity"
                defaultValue={quantity}
                required
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-lg">Product Price</span>
            </label>
            <label className="input-group">
              <input
                type="text"
                placeholder="Product Price"
                className="input input-bordered  bg-gray-50 w-[40rem]"
                name="price"
                defaultValue={price}
                required
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-lg">Type</span>
            </label>
            <label className="input-group grid">
              <select
                id="categorySelect"
                defaultValue={type}
                name="type"
                className="p-3 w-32"
              >
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </label>
          </div>
          <button type="submit" className="btn bg-green-400 mt-5 text-white">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
