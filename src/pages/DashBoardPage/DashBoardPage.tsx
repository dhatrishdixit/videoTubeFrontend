import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ScrollableArea } from '@/components/ScrollableContent';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { UserChannelProfile } from '@/components/Header/header';
import { VideoDashboard } from './Tabs/Video';
import { CommunityPostDashBoard } from './Tabs/CommunityPost';
import { Analytics } from './Tabs/Analytics';
import { Switcher } from '@/components/mood-toggle';
import { Logo } from "@/components/logo/logo";
import { IoArrowForwardOutline } from "react-icons/io5";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function DashBoardPage() {
  

  const navigate = useNavigate();
  const userInfo = useSelector((state:RootState) => state?.authorization?.userData);

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
      console.log(err?.response?.data?.message)
      return ;
     })
  },[userInfo])

  return (
    <div className='overflow-y-scroll h-[100vh] scrollbar-thin dark:scrollbar-track-[#19191d] scrollbar-thumb-red-600 scrollbar-track-white '>
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
    </div>
  )
}




