import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart as ReChartsLineChart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts";
import axios from "axios";

interface DataSchema {
  title: string;
  views: number;
  likes: number;
  comments: number;
}

interface eleSchema {
  title: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 shadow bg-[#f0f0f0] text-[#333] dark:bg-gray-800 dark:text-white rounded">
        <span className="font-semibold">{payload[0].payload.title}</span>
        <br />
        {payload.map((ele, index) => (
          <div key={index}>
            <small>
              {ele.name} : {ele.value}
            </small>
            <br />
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface LineChartProps{
  reload:number
}



export const LineChart: React.FC<LineChartProps> = ({reload}) => {
  const [data, setData] = useState<DataSchema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/v1/dashboard/videoInfo`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(()=>{
          return res.data.data.map((ele:eleSchema)=>{
            return {
              title:ele.title,
              views:ele.viewsCount,
              likes:ele.likesCount,
              comments:ele.commentsCount
            }
          })
        });
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
    <ResponsiveContainer width="100%" height="100%">
    <ReChartsLineChart 
      width={600}
      height={400} 
      data={data}
      margin={{
        top: 20,
        right: 20,
        left: 20,
        bottom: 20,
      }} >
      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5}/>
      <YAxis tickLine={false}/>
    
      <Tooltip content={<CustomTooltip/>} />
      <Legend margin={{
              top: 10,
              left: 0,
              right: 0,
              bottom: 0,
      }} 
      verticalAlign = "top"
      />
      <Line
        type="monotone"
        dataKey="views"
        stroke="#ff7300"
        fill="#ff7300"
      />
      <Line
        type="monotone"
        dataKey="likes"
        stroke="#387908"
        fill="#387908"
      />
      <Line
        type="monotone"
        dataKey="comments"
        stroke="#8884d8"
        fill="#387908"
      />
    </ReChartsLineChart>
   </ResponsiveContainer>
  );
};
