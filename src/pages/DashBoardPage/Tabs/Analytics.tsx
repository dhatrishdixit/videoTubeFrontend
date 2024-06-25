import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { LineChartDashBoard } from "../charts/LineChart";


export function Analytics(){

    return(
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader>
                  <CardTitle>Subscriptions per Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChartDashBoard/>
                </CardContent>
              </Card>
        </div>
    )

}