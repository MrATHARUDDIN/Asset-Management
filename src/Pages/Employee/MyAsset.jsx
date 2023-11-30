import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Components/firebase config/Private";
import { PDFViewer } from '@react-pdf/renderer';
import Pdf from "./Pdf";

const MyAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: Requests = [], refetch } = useQuery({
    queryKey: ["Requests"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Request?email=${user.email}`);
      return res.data;
    },
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPdf, setShowPdf] = useState(false);
  const [pdfData, setPdfData] = useState(null);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePrintDetails = (asset) => {
    setShowPdf(true);
    setPdfData(asset);
  };

  const filteredData = Requests.filter((brand) => {
    return (
      (selectedCategory === "All" || brand.type === selectedCategory) &&
      brand.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleDeleteAsset = (req) => {
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
        axiosSecure.delete(`/Request/${req._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Printed Value</h3>
    <div className="modal-action">
    {showPdf && (
        <PDFViewer className="w-[30rem] grid justify-center h-screen">
          <Pdf asset={pdfData} />
        </PDFViewer>
      )}
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
      <Helmet>
        <title>Asset Management || My Asset</title>
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
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Request Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((asset, index) => (
              <tr key={asset._id}>
                <th>{index + 1}</th>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.reqdate}</td>
                <td>{asset.AppDate}</td>
                <td>{asset.Status}</td>
                <td className="">
                  {asset.Status === "Pending" && (
                    <button
                      onClick={() => handleDeleteAsset(asset)}
                      className="btn-lg text-red-500 font-bold hover:text-green-400"
                    >
                      Cancel
                    </button>
                  )}
                  {asset.Status === "Approved" && (
                    <button
                      onClick={() => handlePrintDetails(asset)}
                      className="btn-lg text-green-400 font-bold hover:text-red-400"
                    >
<button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}> Print Details</button>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default MyAsset;
