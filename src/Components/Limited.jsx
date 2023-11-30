import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Heading from "../Sheare/Heading";

const Limited = () => {
  const axiosSecure = useAxiosSecure();
  const { data: Asset = [] } = useQuery({
    queryKey: ["Asset"],
    queryFn: async () => {
      const res = await axiosSecure.get("/Asset");
      return res.data;
    },
  });

  // Filter items with quantity less than 10
  const sortedItems = Asset.filter(item => item.quantity < 10);
  const limitedStockItems = sortedItems.slice(0, 4)

  return (
    <div className='mt-40 mb-32'>
      <Heading title={"Limited Stock Items"}></Heading>

      {limitedStockItems.length === 0 && (
        <div>
          <h1 className="mt-20 font-semibold text-3xl text-center">
            No Limited Stock Items
          </h1>
        </div>
      )}

      {limitedStockItems.length > 0 && (
       <div className='mt-7'>
       <table className="table w-full">
         <thead>
           <tr>
             <th className="text-left">Item Name</th>
             <th className="text-left">Number of Requests</th>
           </tr>
         </thead>
         <tbody>
           {limitedStockItems.map((item, index) => (
             <tr key={index}>
               <td className="text-2xl">{item.name}</td>
               <td className="text-2xl">{item.quantity}</td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
      )}
    </div>
  );
};

export default Limited;
