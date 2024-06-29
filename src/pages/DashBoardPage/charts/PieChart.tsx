import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart as ReChartsPieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  TooltipProps,
  ResponsiveContainer
} from "recharts";

interface DataSchema {
  name: string;
  value: number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload?.length) {
    return (
      <div className="p-3 shadow bg-[#f0f0f0] text-[#333] dark:bg-gray-800 dark:text-white rounded">
        <span className="font-semibold">Total Likes</span>
        <br />
        {payload?.map((ele, index) => (
          <div key={index}>
            <small>
              {ele.name}: <span className="font-bold">{ele.value}</span>
            </small>
            <br />
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface PieChartProps {
  reload: number;
}

const COLORS = ["#FF5733", "#FFBD33", "#C7EE41"]

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const PieChart: React.FC<PieChartProps> = ({ reload }) => {
  const [data, setData] = useState<DataSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/v1/dashboard/likes`, {
        withCredentials: true,
      })
      .then((res) => {
        setData([
          {
            name: "Video",
            value: res.data.data.totalVideoLikes
          },
          {
            name: "Comment",
            value: res.data.data.totalCommentLikes
          },
          {
            name: "Community Posts",
            value: res.data.data.totalTweetsLikes
          }
        ]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [reload]);

  if (loading) {
    return (
      <div
        style={{
          position: "relative",
          width: 600,
          height: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  
  if(data.length == 0){
    return(
      <div className="text-center text-2xl font-bold">No data available</div>
    )
  }

  return (
    <ResponsiveContainer width="80%" height="100%">
      <ReChartsPieChart 
      width={600} 
      height={600}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 40,
      }}
      >
        <Pie
      data={data}
      cx="50%" // This will center the pie chart horizontally
      cy="60%" // This will center the pie chart vertically
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={120} // Increase this value to make the pie chart larger
      fill="#8884d8"
      dataKey="value"
    >
          {data?.map((_,index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS?.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="top" />
      </ReChartsPieChart>
    </ResponsiveContainer>
  );
};
