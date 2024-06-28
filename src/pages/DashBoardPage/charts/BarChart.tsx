import axios from "axios";
import { useEffect, useState } from "react";
import {
    BarChart as ReChartBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    TooltipProps
  } from "recharts";
  
  interface CustomTooltipProps extends TooltipProps<number, string> {}

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  
    if (active && payload && payload.length) {
      return (
        <div className="p-3 shadow bg-[#f0f0f0] text-[#333] dark:bg-gray-800 dark:text-white rounded">
          <span className="font-semibold">{payload[0].payload ? `${payload[0].payload.month},${payload[0].payload.year}` : "Subscriptions"}</span>
          <br />
          {payload.map((ele, index) => (
            <div key={index}>
              <small>
                Subscription : <span className="font-bold">{ele.value}</span>
              </small>
              <br />
            </div>
          ))}
        </div>
      );
    }
    return null;
  };


  interface DataSchema{
     month:string,
     year:number,
     SubscriptionsByMonth:number,
  }
  
  export function BarChart({reload}:{reload:number}) {
    const [data,setData] = useState<DataSchema[]>([]);
    const [loading,setLoading] = useState<boolean>(false);
    useEffect(()=>{
      setLoading(true);
      axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/dashboard/subscription`,{
        withCredentials:true
     }).
     then(res => setData(res.data.data)).
     catch(err => console.log(err)).
     finally(()=>setLoading(false))
    },[reload])
    
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



    return (
    <ResponsiveContainer width="100%" height="100%">
      <ReChartBarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" strokeOpacity={0.5}/>
        <XAxis dataKey="name" tickLine={false} />
        <YAxis dataKey="SubscriptionsByMonth" tickLine={false}  />
        <Tooltip
          content={<CustomTooltip />}
          shared={false}
          isAnimationActive={true}
        />
        <Legend verticalAlign="top" />
        <Bar dataKey="SubscriptionsByMonth" fill="#4299E1" />
      </ReChartBarChart>
      </ResponsiveContainer>
    );
  }
  