import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Components/firebase config/Private";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../Sheare/Heading";

const Myteam = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: employeeData = [] } = useQuery({
    queryKey: ["Employee"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users`);
        return res.data;
      } catch (error) {
        console.error("Error fetching employee data:", error);
        return [];
      }
    },
  });

  const userEmployeeData = employeeData && employeeData.filter(
    (employee) => employee.email === user?.email
  );
  const companyInfo = userEmployeeData.map((employee) => ({
    CompanyName: employee.CompanyName,
    logo: employee.logo,
  }));
  const { logo } = companyInfo[0] || {};

  const [delayedData, setDelayedData] = useState([]);

  useEffect(() => {
    const fetchDataWithDelay = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const res = await axiosSecure.get(`/users?logo=${logo}`);
        setDelayedData(res.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setDelayedData([]);
      }
    };

    fetchDataWithDelay();
  }, [axiosSecure, logo]);
  
  const upcomingBirthdays = delayedData && delayedData.filter((employee) => {
    const birthdayMonth = new Date(employee.date).getMonth() + 1;
    const currentMonth = new Date().getMonth() + 1;
    return birthdayMonth === currentMonth;
  });

  return (
    <div>
      <Helmet>
        <title>Asset Management || My Team</title>
      </Helmet>
      {delayedData.length == 0 && <div>
        <h1 className="mt-32 font-bold text-6xl text-center">You Are Not in Team</h1>
      </div>}
     {delayedData.length > 0 && <div>
       <Heading title={`Upcoming Events`}></Heading>
        <section className="mb-32 mt-20">
          {
            upcomingBirthdays.length == 0 &&
            <h1 className="font-bold text-4xl ">No Event in This Month</h1>
          }
          <ul>
            {upcomingBirthdays.length > 0 && upcomingBirthdays.map((member, index) => (
              <li key={index}>
                <section className="lg:grid-cols-3 grid-cols-2 ">
                <div className="bg-green-200 w-96 p-4">
                <img src={member.image}/>
                  <p className="mt-1 text-xl text-left ml-10 p-2 font-semibold">Name : {member.name}</p>
                  <p className="mt-1 text-xl text-left ml-10 p-2 font-semibold">Date of Birth : {member.date}</p>
                </div>
                </section>
              </li>
            ))}
          </ul>
        </section>
      </div>}
      { delayedData.length > 0 && <div className="overflow-x-auto mt-10">
      <Heading title={`My Team Member List`}></Heading>
        <table className="table table-zebra mt-20 bg-red-200 w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Request Date</th>
              <th>Approval Date</th>
              <th>Request Status</th>
            </tr>
          </thead>
          <tbody>
            {delayedData.map((member, index) => (
              <tr key={member._id}>
                <th>{index + 1}</th>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.requestDate}</td>
                <td>{member.approvalDate}</td>
                <td>{member.requestStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </div>
  );
};

export default Myteam;
