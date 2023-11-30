import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Heading from "../Sheare/Heading";
import { Link } from "react-router-dom";

const RecentReq = () => {
    const axiosSecure = useAxiosSecure();
    const { data: Request = [], } = useQuery({
      queryKey: ["Request"],
      queryFn: async () => {
        const res = await axiosSecure.get("/Request");
        return res.data;
      },
    });
    const req = Request.filter((req) => req.Status === "Pending");
    const pendingRequests= req.slice(0, 4);
    return (
        <div className="mt-10 mb-32">
            <Heading title={"Pending requests"}></Heading>
            {pendingRequests.length == 0 &&
            <div>
                <h1 className="mt-20 font-semibold text-3xl text-center ">No Pending Resuest</h1>
            </div> 
            }
            {!pendingRequests.length == 0 &&
            <div>
               <div className="overflow-x-auto mt-10">
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
              {pendingRequests.map((Req, index) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link className="btn bg-pink-400 text-white mt-20" to={`Allrequests`}>View Request</Link>
            </div> 
            }
        </div>
    );
};

export default RecentReq;