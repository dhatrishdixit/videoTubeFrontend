import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { LineChart } from "../charts/LineChart";
import { Button } from "@/components/ui/button";
import { FiRefreshCw } from "react-icons/fi";
import CountUp from 'react-countup';
import axios from "axios";
import { PieChart } from "../charts/PieChart";

interface basicAnalyticsSchema {
  totalViews: number;
  totalVideos: number;
  totalLikes: number;
  totalSubscribers: number;
}

export function Analytics(){
    
    
  
    
    const [basicAnalytics,setBasicAnalytics] = useState<basicAnalyticsSchema>({
      totalViews: 0,
      totalVideos: 0,
      totalLikes: 0,
      totalSubscribers: 0
    });

    useEffect(()=>{
       axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/dashboard/stats`,{
          withCredentials:true
       })
       .then(res => setBasicAnalytics(res.data.data as basicAnalyticsSchema))
       .catch(err => console.log(err));
    },[])

    return(
      <div>
        <div className="py-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        <Card >
                <CardHeader className="flex justify-between w-full flex-row">
                  <CardTitle>Total Views</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center font-semibold text-4xl">
                <CountUp end={basicAnalytics.totalViews} duration={3} />
                </CardContent>
              </Card>
              <Card >
                <CardHeader className="flex justify-between w-full flex-row">
                  <CardTitle>Total Videos</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center font-semibold text-4xl">
                <CountUp end={basicAnalytics.totalVideos} duration={3} />
                </CardContent>
              </Card>
              <Card >
                <CardHeader className="flex justify-between w-full flex-row">
                  <CardTitle>Total Subscribers</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center font-semibold text-4xl">
                <CountUp end={basicAnalytics.totalSubscribers} duration={3} />
                </CardContent>
              </Card>
              <Card >
                <CardHeader className="flex justify-between w-full flex-row">
                  <CardTitle>Total Likes</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center font-semibold text-4xl">
                <CountUp end={basicAnalytics.totalLikes} duration={3} />
                </CardContent>
              </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <LineChartDashBoard/>
            <PieChartDashBoard/>
              <Card className="h-[50vh]">
                <CardHeader className="flex justify-between w-full flex-row">
                  <CardTitle>Subscriptions per Day</CardTitle>
                  <Button variant="ghost" size="icon">
                            <FiRefreshCw className="w-6 h-6 text-muted-foreground" />
            </Button>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-full">
    
                </CardContent>
              </Card>
        </div>
        </div>
     
    )

}

export function PieChartDashBoard(){
  const [reload,setReload] = useState<number>(0);
  const handleReload = () =>{
    setReload(prev => prev+1);
  }

  return (
    <Card className="h-[80vh] w-full">
                <CardHeader className="flex justify-between w-full flex-row">
                  <CardTitle>Like Stats</CardTitle>
                  <Button variant="ghost" size="icon">
                            <FiRefreshCw className="w-6 h-6 text-muted-foreground" onClick={handleReload}/>
            </Button>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[80%]">
                <PieChart reload={reload}/>
                </CardContent>
              </Card>
  )
}

export function LineChartDashBoard(){
  
  const [reload,setReload] = useState<number>(0);
  const handleReload = () =>{
    setReload(prev => prev+1);
  }

  return (
    <Card className="h-[80vh] w-full">
                <CardHeader className="flex justify-between w-full flex-row">
                  <CardTitle>Video Stats</CardTitle>
                  <Button variant="ghost" size="icon">
                            <FiRefreshCw className="w-6 h-6 text-muted-foreground" onClick={handleReload}/>
            </Button>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[80%]">
                  <LineChart reload={reload}/>
                </CardContent>
              </Card>
  )

}