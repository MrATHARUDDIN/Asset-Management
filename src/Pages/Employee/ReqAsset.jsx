import { useContext, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Components/firebase config/Private";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ReqAsset = () => {
  const axiosSecure = useAxiosSecure();
  const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const {user} = useContext(AuthContext)
  const { data: Assets = [],  } = useQuery({
    queryKey: ["Assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/Asset");
      return res.data;
    },
  });
 
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log("Selected category:", event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = Assets.filter((brand) => {
    return (
      (selectedCategory === "All" || brand.type === selectedCategory) &&
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  const handleRequest = (asset) => {
    // Extract user email from the user object
    const userEmail = user.email;

    // Use SweetAlert2 to confirm the request
    Swal.fire({
      title: 'Confirm Request',
      text: `Do you want to request ${asset.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed the request, proceed with making the request
        axiosSecure
          .post("/Request", {
            useremail :userEmail,
            name: asset.name,
            price: asset.price,
            type: asset.type,
            Status: "Pending",
            reqdate: formattedDate,
          })
          .then((response) => {
            console.log('Request successful:', response.data);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Request Success.',
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            // Handle errors
            console.error('Error making request:', error);
          });
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>Asset Management || AssetRequest</title>
      </Helmet>
      
      <div>
        <input
          type="text"
          placeholder="Type here"
          id="searchBar"
          value={searchQuery}
          onChange={handleSearch}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="categorySelect" className="mr-2">
          Select Type:
        </label>
        <select id="categorySelect" onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>
      <div className="overflow-x-auto mt-10">
        <table className="table table-zebra bg-orange-100 w-full">
          <thead>
            <tr>
              <th></th>
              <th>Asset Name</th>
              <th>Type</th>
              <th>Availability</th>
              <th>Request</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((asset, index) => (
              <tr key={asset._id}>
                <th>{index + 1}</th>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td className="text-green-600">Available</td>
                <td className="">
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                  className="btn bg-red-400"
                  onClick={() => {
                    handleRequest(asset);
                  }}
                >
                  Request
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReqAsset;
