import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/useAxiosSecure";
import useAuth from "../Hook/useAuth";
import Heading from "../Sheare/Heading";

const Monthly = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: request = [], } = useQuery({
    queryKey: ["Request"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/Request?email=${user?.email}`);
        return res.data;
      } catch (error) {
        throw new Error("Error fetching monthly requests");
      }
    },
  });

  const monthlyRequest = request.filter((employee) => {
    const dateParts = employee.reqdate.split('-');
    const thisMonth = parseInt(dateParts[1], 10);
    const currentMonth = new Date().getMonth() + 1;
    console.log(thisMonth);
    return thisMonth === currentMonth;
  });
  
  
    return (
        <div className='mt-40 mb-32'>
        <Heading title={"Monthly Request"}></Heading>
  
        {monthlyRequest.length === 0 && (
          <div>
            <h1 className="mt-20 font-semibold text-3xl text-center">
              No Request in this Month
            </h1>
          </div>
        )}
  
        {monthlyRequest.length > 0 && (
         <div className='mt-7'>
         <table className="table w-full">
           <thead>
             <tr>
               <th className="text-left">Item Name</th>
               <th className="text-left">Item type</th>
             </tr>
           </thead>
           <tbody>
             {monthlyRequest.map((item, index) => (
               <tr key={index}>
                 <td className="text-2xl">{item.name}</td>
                 <td className="text-2xl">{item.type}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
        )}
      </div>
    );
};

export default Monthly;