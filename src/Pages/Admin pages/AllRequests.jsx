import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { data: Request = [], refetch } = useQuery({
    queryKey: ["Request"],
    queryFn: async () => {
      const res = await axiosSecure.get("/Request");
      return res.data;
    },
  });
  const [searchQuery, setSearchQuery] = useState("");


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = Request.filter((brand) => {
    return (
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.useremail.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  const handleApprove = (req) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/Request/${req._id}`, { Status: "Approved", AppDate :formattedDate, })
          .then((res) => {
            if (res.data.message === "Status updated successfully") {
              refetch();
              Swal.fire({
                title: "Request Approved",
                text: "The request has been Approved.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  const handleReject = (req) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put(`/Request/${req._id}`, { Status: "Rejected" })
          .then((res) => {
            if (res.data.message === "Status updated successfully") {
              refetch();
              Swal.fire({
                title: "Request Rejected",
                text: "The request has been Rejected.",
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
        <title>Asset Management || All Request</title>
      </Helmet>
      <div>
      <div>
        <label className="mr-3 font-semibold mt-4 text-3xl">Filter Requests</label>
      <input type="text" placeholder="Type here"  id="searchBar"  value={searchQuery}
          onChange={handleSearch} className="input input-bordered w-full max-w-xs" />
      </div>
        <div className="overflow-x-auto mt-24">
          <table className="table table-zebra bg-green-200 w-full">
            <thead>
              <tr>
                <th></th>
                <th>Asset Name</th>
                <th>Asset Type</th>
                <th> Email of requester</th>
                <th>Request Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((Req, index) => (
                <tr key={Req._id}>
                  <th>{index + 1}</th>
                  <td>{Req.name}</td>
                  <td>{Req.type}</td>
                  <td>{Req.useremail}</td>
                  <td>{Req.reqdate}</td>
                  <td
                    className="text-lg"
                    style={{
                      color:
                        Req.Status === "Approved"
                          ? "green"
                          : Req.Status === "Rejected"
                          ? "red"
                          : "",
                    }}
                  >
                    {Req.Status}
                  </td>
                  <td className="">
                    <button
                      className="w-32 p-2 rounded-2xl bg-green-400"
                      onClick={() => handleApprove(Req)}
                      disabled={
                        Req.Status === "Approved" || Req.Status === "Rejected"
                      }
                      style={{
                        backgroundColor:
                          Req.Status === "Approved" || Req.Status === "Rejected"
                            ? "gray"
                            : "",
                        color:
                          Req.Status === "Approved" || Req.Status === "Rejected"
                            ? "white"
                            : "black",
                      }}
                    >
                      Approve Button
                    </button>
                  </td>
                  <td className="">
                    <button
                      className="w-32 p-2 rounded-2xl bg-red-500"
                      onClick={() => handleReject(Req)}
                      disabled={
                        Req.Status === "Approved" || Req.Status === "Rejected"
                      }
                      style={{
                        backgroundColor:
                          Req.Status === "Approved" || Req.Status === "Rejected"
                            ? "gray"
                            : "",
                        color:
                          Req.Status === "Approved" || Req.Status === "Rejected"
                            ? "white"
                            : "black",
                      }}
                    >
                      Reject Button
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllRequests;
