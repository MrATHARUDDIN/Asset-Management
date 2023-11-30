import { useContext } from "react";
import { AuthContext } from "../../Components/firebase config/Private";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const MyEmployee = () => {
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
    return brand.CompanyName;
  });


  const removeEmployee = async (data) => {
    const updatedData = {
      CompanyName: null,
      logo: null,
    };
    try {
      await axiosSecure.patch(`/users/${data._id}`,updatedData);
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.name} is remove From The Team`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error removing employee:", error);
  
      // Display error alert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while removing the employee. Please try again.',
      });
    }
  };
  
  return (
    <div>
      <Helmet>
        <title>Asset Management || My Employee list</title>
      </Helmet>
      <div className="overflow-x-auto mt-10">
        <h1 className="text-4xl font-bold mb-20">
          Total Member : {filterData.length}
        </h1>
        <table className="table table-zebra bg-green-200 w-full">
          <thead>
            <tr>
              <th></th>
              <th>Member Name</th>
              <th>Remove From Team Button</th>
            </tr>
          </thead>
          <tbody>
            {filterData.map((data, index) => (
              <tr key={data._id}>
                <th>{index + 1}</th>
                <td>
                  {data.img}
                  {data.name}
                </td>

                <td className="">
                  <button className="btn-error btn text-white" onClick={() => removeEmployee(data)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployee;
