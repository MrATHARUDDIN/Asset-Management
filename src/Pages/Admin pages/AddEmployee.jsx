import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../Components/firebase config/Private";
import { Helmet } from "react-helmet-async";
import Package from "../../Components/Package";

const AddEmployee = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: Employee = [], refetch } = useQuery({
    queryKey: ["Employee"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const filteredData = Employee.filter((brand) => {
    return !brand.CompanyName || brand.CompanyName === null;
  });
  const filterData = Employee.filter((brand) => {
    if (brand.email === user?.email) {
      return brand;
    }
  });

  const handleMakeTeam = (Employees) => {

    const companyInfo = filterData.map((employee) => ({
      CompanyName: employee.CompanyName,
      logo: employee.logo, 
    }));
   
    // Assuming you want to use the first item from filterData
    const { CompanyName, logo } = companyInfo[0];
    console.log(CompanyName, logo)
    axiosSecure.patch(`/users/${Employees._id}`,
    {
      CompanyName,
      logo,
    }
    )
   
    .then((res) => {
      
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${Employees.name} is in Team Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div>
       <Helmet>
        <title>Asset Management || Add Employee</title>
      </Helmet>
      <div>
        <h1 className="mt-10 mb-32 font-bold text-5xl text-center">Pakege Option</h1>
        <Package></Package>
      </div>
      <h1 className="mt-32 font-bold text-5xl text-center">Add Employee</h1>
      <div className="overflow-x-auto mt-20">
        <table className="table table-zebra bg-orange-100 w-full">
          <thead>
            <tr>
              <th></th>
              <th>Employee Name</th>
              <th>Email</th>
              <th>Date Added</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((Employees, index) => (
              <tr key={Employees._id}>
                <th>{index + 1}</th>
                <td>{Employees.name}</td>
                <td>{Employees.email}</td>
                <td>{Employees.dateAdded}</td>
                <td className="">
                  {<button
                    onClick={() => handleMakeTeam(Employees)}
                    className="btn btn-ghost btn-lg"
                  >
                    Add to Team
                  </button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddEmployee;
