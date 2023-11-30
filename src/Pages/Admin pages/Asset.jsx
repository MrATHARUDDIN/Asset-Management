import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { FaTrashAlt } from 'react-icons/fa';
import { TiEdit } from "react-icons/ti";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Asset = () => {
    const axiosSecure = useAxiosSecure();
    const { data: Assets = [], refetch } = useQuery({
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
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = Assets.filter(brand => {
    return (selectedCategory === "All" || brand.type === selectedCategory) &&
           (brand.name.toLowerCase().includes(searchQuery.toLowerCase()));
  });
    const handleDeleteAsset = (asset) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.delete(`/Asset/${asset._id}`).then((res) => {
              if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
              }
            });
          }
        });
      };

  return (
    <div>
       <Helmet>
        <title>Asset Management || All Asset</title>
      </Helmet>
        <div>
      <input type="text" placeholder="Type here"  id="searchBar"  value={searchQuery}
          onChange={handleSearch} className="input input-bordered w-full max-w-xs" />
      </div>
      <div className="mt-4">
        <label htmlFor="categorySelect" className="mr-2">Select Type:</label>
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
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((asset, index) => (
              <tr key={asset._id}>
                <th>{index + 1}</th>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.dateAdded}</td>
                <td className="">
                <Link
                    to={{
                      pathname: `/UpdateAssetByAdmin/${asset._id}`,
                      state: { Assets: Assets },
                    }}
                    className="btn btn-ghost btn-lg"
                  >
                    <TiEdit className="text-red-600" />
                  </Link>
                  <button
                    onClick={() => handleDeleteAsset(asset)}
                    className="btn btn-ghost btn-lg"
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
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

export default Asset;
