import axios from 'axios';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Components/firebase config/Private';
import useAxiosSecure from '../../Hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AddProject = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: Employee = [], refetch } = useQuery({
    queryKey: ["Employee"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const filterData = Employee.filter((brand) => {
    if (brand.email === user?.email) {
      return brand;
    }
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const companyInfo = filterData.map((employee) => ({
      CompanyName: employee.CompanyName,
    }));
    const { CompanyName, } = companyInfo[0];

    const name = e.target.name.value;
    const description = e.target.description.value;
    const asset = {name , description ,CompanyName}
    
    axios.post("https://asset-server-side.vercel.app/Project", asset)
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Project Added Successfully',
          icon: 'success',
          confirmButtonText: 'Close',
        });
        e.target.reset();
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
    }
  return (
    <div>
      <h1 className="mt-32 font-bold text-center text-3xl">Add a Project</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text relative top-12 ml-20 font-medium text-lg">Project Name</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              placeholder="Project Name"
              className="input input-bordered bg-gray-50 w-[40rem]"
              name="name"
              required
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium relative ml-20 top-10 text-lg">Project Description</span>
          </label>
          <label className="input-group">
            <textarea
              type="text"
              placeholder="Project Description"
              className="input input-bordered bg-gray-50 h-32 w-[40rem]"
              name="description"
              required
            />
          </label>
        </div>
        <button type="submit" className="btn bg-green-400 mt-5 text-white">
          Add Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
