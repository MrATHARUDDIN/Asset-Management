import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import useAxiosSecure from "../Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Heading from "../Sheare/Heading";

const COLORS = ["#FF444A", "#00C49F"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Mypie = () => {
  const axiosSecure = useAxiosSecure();
  const { data: requests = [] } = useQuery({
    queryKey: ["Request"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/Request`);
      return res.data;
    },
  });

  const getTypeCounts = (data) => {
    const typeCounts = data.reduce((acc, request) => {
      acc[request.type] = (acc[request.type] || 0) + 1;
      return acc;
    }, {});
    return typeCounts;
  };

  const typeCounts = getTypeCounts(requests);

  const data = Object.keys(typeCounts).map(type => ({
    name: type,
    value: typeCounts[type],
  }));

  return (
    <div>
      <Heading title={`Pie Chart`}></Heading>
      <div
        className="chart-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Mypie;
