import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserChannelProfile } from "./Header/header";



export const ScrollableArea:React.FC<UserChannelProfile> = (props:UserChannelProfile) => {
  
  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">User Info</h4>
        {
          Object.entries(props).filter(prop=> prop[0] !== "_id" && prop[0] !== "avatar" && prop[0] !== "coverImage" && prop[0] !=="isSubscribed").map((prop,ind)=>{
          return(
            <>
            <div key={ind}><span className="font-bold">{prop[0].toUpperCase()} :</span>{" "+prop[1]}</div>
            <Separator className="my-2 font-semibold"/>
            </>
          )   
        })
        }
      </div>
    </ScrollArea>
  );
}
