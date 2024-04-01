import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { formatCount } from '@/utils/CountFormat';
import { Button } from '@/components/ui/button';

interface VideoInfoSchema {
  _id: string;
  videoFile: string;
  thumbnail: string;
  owner: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ChannelInfoSchema {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  videos: VideoInfoSchema[];
  subscriberCount: number;
  subscribedToCount: number;
  isSubscribed: boolean;
}

interface SubscriptionSchema {
  isSubscribed: boolean;
  subscriberCount: number ;
}
export function ChannelPage() {
  const { toast } = useToast();
  const { channelUsername } = useParams();
  const [channelInfo, setChannelInfo] = useState<ChannelInfoSchema | null>(null);
  const [subscribeState,setSubscribeState] = useState<SubscriptionSchema|null>(null);

  useEffect(()=>{
     axios
     .get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/c/${channelUsername}`
     ,{
        withCredentials:true
       })
     .then(res => {
      setChannelInfo(res.data.data)
      setSubscribeState({
        isSubscribed:res.data.data.isSubscribed,
        subscriberCount:res.data.data.subscriberCount
      })
    })
     .catch(err => {
         toast({
           variant:"destructive",
           type:"foreground",
           description:err?.response?.data?.message
         })
     })

     return () => {
        if(subscribeState?.isSubscribed !== channelInfo?.isSubscribed){
          axios
          .post(`${import.meta.env.VITE_BASE_URL}/api/v1/subscriptions/c/${channelInfo?._id as string}`,null,{
           withCredentials:true
         })
          .then(res=> {
           console.log(res.data.message);
          })
          .catch(err=>{
           toast({
             variant:"destructive",
             type:"foreground",
             description:err?.response?.data?.message
           })
           console.log(err)
 
          })
        }
     }
     
  },[channelUsername]);
  // right now only think videos , playlist , channel subscribed to and posts 
  //video recent watch 
  //videos all with three filters - recent , old , top(most viewed) and most liked 
  //playlist
  //tweet 
  // TODO: think of adding location to this also 
  return (
    <div className='w-[100vw] flex justify-center'>
         <div className='w-[80vw]'>
         <img src={channelInfo?.coverImage || "https://flowbite.com/docs/images/examples/image-1@2x.jpg"} className='w-[80vw] h-[40vh] bg-cover rounded-sm pt-4'/>
         <div 
         className="flex pt-4"
         >
           <img src={channelInfo?.avatar}
                className="h-36 w-36 rounded-full"
                
            />
            <span className='p-4'>
              <p className='font-bold text-4xl'>
              {
                channelInfo?.fullName
              }
              </p>
              <p>
              {
                `@${channelInfo?.username} • ${formatCount(subscribeState?.subscriberCount as number)} subscribers • ${channelInfo?.videos.length} videos`
              }
              </p>
              <div className='pt-2'>
                <Button 
                variant="ghost" 
                className={`rounded-3xl ${
                  subscribeState?.isSubscribed? "bg-secondary/80" : "bg-red-600"
                } `}
                onClick={()=>{
                  setSubscribeState(prev =>{
                    return {
                      isSubscribed:!prev?.isSubscribed,
                      subscriberCount: prev?.isSubscribed == true ? (prev.subscriberCount as number - 1) : (prev?.subscriberCount as number + 1)
                    }
                  })
                }}
                >{
                  subscribeState?.isSubscribed ? "subscribed" : "subscribe"
                }</Button>
              </div>
          
            </span>
           
         </div>
         </div>
         


    </div>
  )
}

