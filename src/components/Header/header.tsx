import { Logo } from "../logo/logo";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Switcher } from "../mood-toggle";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollableArea } from "../ScrollableContent";
import { PublishedBtn } from "../publishVidBtn";
import { InputSearch } from "../ui/inputSearch";
import { useNavigate } from "react-router-dom";
import React from "react";
import axios from "axios";


export interface UserChannelProfile{
  _id?:string;
  username?:string;
  email?:string;
  fullName?:string;
  avatar?:string;
  coverImage?:string;
  subscriberCount?:number;
  subscribedToCount?:number;
  isSubscribed?:boolean
}

export const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state:RootState) => state.authorization.userData);
  const channelUserName = userInfo?.username;

  const [data,setData] = React.useState<UserChannelProfile|null>(null)
  React.useEffect(()=>{
     axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/c/${channelUserName}`,{
      withCredentials:true
     })
     .then(res => res.data.data)
     .then(data => {
       setData(data);
       return ;
     })
     .catch(err => {
      console.log(err?.response?.data?.message)
      return ;
     })
  },[channelUserName])
  // important to remember here channelUserName might take some time to fetch as we are going through server requests therefore we pass it through the dependency array so as to to update it 
  // console.log(data);

  return (
    <div className=" px-2  w-full h-full items-center justify-around grid grid-cols-10 ">
      <div
        className="col-span-2 flex ml-3 items-center gap-4 cursor-pointer"
        onClick={() => {
           navigate("/")
        }}
      >
        <Logo />
        <p className="text-red-600 font-bold text-2xl">ClipSync</p>
      </div>
    
      <div className="col-span-5 flex justify-center items-center gap-4">
        <InputSearch  />
      </div>

      <div className="col-span-1">
        <PublishedBtn />
      </div>

      <div className="col-span-1">
        <Switcher />
      </div>

      <div className="col-span-1 px-2 flex justify-center">
        <Avatar>
          <HoverCard>
            <HoverCardTrigger>
              <AvatarImage
                src={userInfo?.avatar}
                onClick={() => {
                  navigate("/")
                }}
              />
              <AvatarFallback>CN</AvatarFallback>
            </HoverCardTrigger>
            <HoverCardContent className="p-0">
              <ScrollableArea 
               {...data}
              />
            </HoverCardContent>
          </HoverCard>
        </Avatar>
      </div>
    </div>
  );
};
