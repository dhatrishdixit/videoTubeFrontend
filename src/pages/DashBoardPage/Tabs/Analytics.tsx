import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import LineChartDashBoard from "../charts/LineChart";
import { Button } from "@/components/ui/button";
import { FiRefreshCw } from "react-icons/fi";
import CountUp from 'react-countup';
import axios from "axios";
import { CustomActiveShapePieChart } from "../charts/CustomActiveShapePieChart";

interface basicAnalyticsSchema {
  totalViews: number;
  totalVideos: number;
  totalLikes: number;
  totalSubscribers: number;
}

export function Analytics(){
    
    const [reload,setReload] = useState<number>(0);
    const handleReload = () => {
        setReload(prev => prev + 1);
    }
    
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
            <Card className="h-[50vh]">
                <CardHeader className="flex justify-between w-full flex-row">
                  <CardTitle>Subscriptions per Day</CardTitle>
                  <Button variant="ghost" size="icon" onClick={handleReload}>
                            <FiRefreshCw className="w-6 h-6 text-muted-foreground" />
            </Button>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-full">
                  <LineChartDashBoard/>
                </CardContent>
              </Card>
              <Card className="h-fit">
                <CardHeader className="flex justify-between w-full flex-row">
                  <CardTitle>Subscriptions per Day</CardTitle>
                  <Button variant="ghost" size="icon" onClick={handleReload}>
                            <FiRefreshCw className="w-6 h-6 text-muted-foreground" />
            </Button>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-full">
                  <CustomActiveShapePieChart/>
                </CardContent>
              </Card>
              <Card className="h-[50vh]">
                <CardHeader className="flex justify-between w-full flex-row">
                  <CardTitle>Subscriptions per Day</CardTitle>
                  <Button variant="ghost" size="icon" onClick={handleReload}>
                            <FiRefreshCw className="w-6 h-6 text-muted-foreground" />
            </Button>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-full">
                  <LineChartDashBoard/>
                </CardContent>
              </Card>
        </div>
        </div>
     
    )

}