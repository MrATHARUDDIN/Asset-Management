import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Components/firebase config/Private";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: employeeData = [], refetch } = useQuery({
    queryKey: ["Employee"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const [formData, setFormData] = useState({
    fullName: user.displayName || "",
    // Add other form fields as needed
  });
  // Access user data from the context
  const employeeInfo = employeeData.find((employee) => employee.email === user?.email);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.patch(`/user/${employeeInfo._id}`, formData);
      if (res.statusText === "OK") {
        Swal.fire({
          title: "Success!",
          text: "Profile Updated Successfully",
          icon: "success",
          confirmButtonText: "Close",
        });
        refetch(); // Refetch data to update UI
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to update profile",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Helmet>
        <title>Asset Management || Profile</title>
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-8">Profile</h1>

      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="text-lg font-bold mb-2 mr-2">Full Name:</label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-92 max-w-xs"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center mb-4">
          <label className="text-xl font-bold mr-2">User Email:</label>
          <p className="font-bold text-lg ">{user.email}</p>
        </div>
        <div className="flex justify-center mb-4">
          <label className="text-lg font-bold">Date of Birth:</label>
          <p className="mt-[2px] ml-1">{employeeInfo?.date || "Not available"}</p>
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default Profile;
