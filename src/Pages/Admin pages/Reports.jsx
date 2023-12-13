import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const Reports = () => {
  const axiosSecure = useAxiosSecure();
  const { data: Reports = [], refetch } = useQuery({
    queryKey: ["Reports"],
    queryFn: async () => {
      const res = await axios.get("https://asset-server-side.vercel.app/Reports");
      return res.data;
    },
  });

  const handleDelete = async (reportId) => {
    try {
      await axios.delete(`https://asset-server-side.vercel.app/Reports/${reportId}`);
      refetch();
      Swal.fire({
        icon: "success",
        title: "Report Deleted!",
        text: "The report has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting report:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the report.",
      });
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mt-10 text-red-600">Reports</h1>
      {Reports.length === 0 ? (
        <p>No reports available.</p>
      ) : (
        Reports.map((report, index) => (
          <div key={index} className="text-white bg-red-500 w-96 p-10 mb-4">
            <h1>Reports title :- {report.name}</h1>
            <h1>Reports description :- {report.description}</h1>
            <button
              onClick={() => handleDelete(report._id)}
              className="bg-green-400 p-2 mt-2"
            >
              Solve
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Reports;
