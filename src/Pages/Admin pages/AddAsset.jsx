import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { Helmet } from 'react-helmet-async';


const AddAsset = () => {
    const axiosSecure = useAxiosSecure();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const type = e.target.type.value;
    const Quantity0 = e.target.Quantity.value;
    const Quantity = parseInt(Quantity0);
    const price0 = e.target.Price.value;
    const Price = parseInt(price0);

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    const asset = {
      dateAdded: formattedDate,
      name,
      type,
      Quantity,
      price:Price,
    };

    axiosSecure
      .post("/Asset", asset)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Asset Added Successfully',
          icon: 'success',
          confirmButtonText: 'Close',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle the error, e.g., show an error message to the user
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while adding the asset',
          icon: 'error',
          confirmButtonText: 'Close',
        });
      });
  };
  

  return (
  <div className="flex justify-center items-center">
      <Helmet>
      <title>Asset Management || Add Asset</title>
    </Helmet>
    <div className="bg-orange-300  mt-10 w-9/11 h-3/4 p-20">
      <h1 className="font-bold mb-10 text-center text-4xl">Add Product</h1>
      <form onSubmit={handleFormSubmit}>
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
              name="Quantity"
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
              name="Price"
              required
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium text-lg">Type</span>
          </label>
          <label className="input-group grid">
            <select id="categorySelect" name="type" className="p-3 w-32">
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </label>
        </div>
        <button type="submit" className="btn bg-green-400 mt-5 text-white">
        Add Product
        </button>
      </form>
    </div>
  </div>
  );
};

export default AddAsset;
