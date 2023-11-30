import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Heading from "../Sheare/Heading";
import { AuthContext } from './firebase config/Private';

const Frequently = () => {
    const {user} =useContext(AuthContext)
  const axiosSecure = useAxiosSecure();
  const { data: requests = [] } = useQuery({
    queryKey: ["Request"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Request?email=${user?.email}`);
      return res.data;
    },
  });

  console.log(requests)

  // Determine the most requested items based on the number of requests
  const getMostRequestedItems = () => {
    const requestCounts = {};
    requests.forEach((req) => {
      if (!requestCounts[req.name]) {
        requestCounts[req.name] = 1;
      } else {
        requestCounts[req.name]++;
      }
    });
    
    // Convert the counts into an array of objects
    const mostRequestedItems = Object.keys(requestCounts).map((itemName) => ({
      itemName,
      count: requestCounts[itemName],
    }));

    // Sort the items by the count in descending order
    const sortedItems = mostRequestedItems.sort((a, b) => b.count - a.count);

    // Return only the top 4 items
    return sortedItems.slice(0, 4);
  };

  // State to store the most requested items
  const [mostRequestedItems, setMostRequestedItems] = useState([]);

  useEffect(() => {
    setMostRequestedItems(getMostRequestedItems());
  }, [requests]);

  return (
    <div>
      <Heading title={"Top Most Requested Items"}></Heading>

      {mostRequestedItems.length === 0 && (
        <div>
          <h1 className="mt-20 font-semibold text-3xl text-center">
            No Most Requested Items
          </h1>
        </div>
      )}

      {mostRequestedItems.length > 0 && (
         <div className='mt-7'>
         <table className="table w-full">
           <thead>
             <tr>
               <th className="text-left">Item Name</th>
               <th className="text-left">Number of Requests</th>
             </tr>
           </thead>
           <tbody>
             {mostRequestedItems.map((item, index) => (
               <tr key={index}>
                 <td className="text-2xl">{item.itemName}</td>
                 <td className="text-2xl">{item.count}</td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
      )}
    </div>
  );
};

export default Frequently;
