import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import LineChartDashBoard from "../charts/LineChart";
import { Button } from "@/components/ui/button";
import { FiRefreshCw } from "react-icons/fi";



export function Analytics(){
    
    const [reload,setReload] = useState<number>(0);
    const handleReload = () => {
        setReload(prev => prev + 1);
    }

    return(
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
      
     
    )

}