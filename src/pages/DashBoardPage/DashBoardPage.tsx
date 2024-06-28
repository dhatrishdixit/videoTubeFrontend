import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/store';
import axios from 'axios';

export function DashBoardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(()=>{
       axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/get-current-user`,{
     withCredentials:true
    })
    .then(res => {
       dispatch(logIn(res.data.data as UserState));
    })
  },[])
  

  return (
    <div className='overflow-y-scroll h-[100vh] scrollbar-thin dark:scrollbar-track-[#19191d] scrollbar-thumb-red-600 scrollbar-track-white '><Component/></div>
  )
}
import { Logo } from "@/components/logo/logo";
import { Input } from "@/components/ui/input"
import { IoArrowForwardOutline } from "react-icons/io5";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

//TODO: remove this nivo line 
import { ResponsiveLine } from "@nivo/line"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsivePie } from "@nivo/pie"
import { ResponsiveScatterPlot } from "@nivo/scatterplot"
import { ResponsiveHeatMap } from "@nivo/heatmap"

//TODO: after completing this you have to do authentication , and at the end fix the search error 
// then finally deploy 
// correct subscriber function also mainly in video page 
// remove both chartjs and react-charts-js2 or something and nivo after this 
// take a look into forms which caused the error 
export default function Component() {

  const {toast} = useToast();
  const navigate = useNavigate();
  const userInfo = useSelector((state:RootState) => state?.authorization?.userData!);

  const [data,setData] = React.useState<UserChannelProfile|null>(null)
  React.useEffect(()=>{
     const channelUserName = userInfo.username;
     axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/c/${channelUserName}`,{
      withCredentials:true
     })
     .then(res => res.data.data)
     .then(data => {
       setData(data);
       return ;
     })
     .catch(err => {
      toast({
        variant:"destructive",
        type:"foreground",
        description:err?.response?.data?.message
      })
      return ;
     })
  },[userInfo])

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a 
          href="#" 
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          onClick={(e)=>{
             e.preventDefault();
             navigate('/');
          }}
          >
          <Logo/>
            <span className="sr-only"></span>
          </a>
          <a href="#" className="font-bold"
          onClick={(e)=>{
              e.preventDefault();
          }}
          >
            Dashboard
          </a>
      
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="flex-1 ml-auto sm:flex-initial">
            <div className="relative flex items-center">
            <Switcher />
             <Button
             onClick={()=>{
              navigate('/');
             }}
             >Home<IoArrowForwardOutline/> </Button>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
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
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-8 p-10">
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-3 border-b">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          <TabsContent value="analytics" className="p-6">
              <Analytics/>
          </TabsContent>
          <TabsContent value="videos" className="p-6">
         <VideoDashboard/>
          </TabsContent>
          <TabsContent value="community" className="p-6">
          <CommunityPostDashBoard/>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}



import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ScrollableArea } from '@/components/ScrollableContent';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

import { UserChannelProfile } from '@/components/Header/header';

import { logIn, UserState } from '@/features/authentication/auth.slice';
import { VideoDashboard } from './Tabs/Video';
import { CommunityPostDashBoard } from './Tabs/CommunityPost';
import { Analytics } from './Tabs/Analytics';
import { Switcher } from '@/components/mood-toggle';

