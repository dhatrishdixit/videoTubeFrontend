import { useEffect, useRef, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { formatCount } from '@/utils/CountFormat';
import { Button } from '@/components/ui/button';
import { ChannelPageNavbar } from "@/components/Header/channelPageNavbar";
import { ChannelStateContextProvider } from '@/hooks/ChannelState';
import { TailSpin } from 'react-loader-spinner';
import { ToastAction } from '@/components/ui/toast';

interface ChannelInfoSchema {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
  coverImage: string;
  videos: number;
  subscriberCount: number;
  subscribedToCount: number;
  isSubscribed: boolean;
}

interface SubscriptionSchema {
  isSubscribed: boolean;
  subscriberCount: number;
}

export interface ChannelCountSchema {
  videoCount: number;
  tweetCount: number;
  playlistCount: number;
}

export function ChannelPage() {
  const { toast } = useToast();
  const { channelUsername } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [channelInfo, setChannelInfo] = useState<ChannelInfoSchema | null>(null);
  const [subscribeState, setSubscribeState] = useState<SubscriptionSchema | null>(null);
  const [channelCount, setChannelCount] = useState<ChannelCountSchema | null>(null);
  const currentIsSubscribed = useRef<boolean | null>(null);
  const initialIsSubscribed = useRef<boolean | null>(null);
  const channelId = useRef<string | null>(null);
  // const [reload,setReload] = useState<number>(0);

  // useEffect(()=>{
  //   setReload(Math.random());
  // },[])

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/c/${channelUsername}`, {
        withCredentials: true
      })
      .then(res => {
        setChannelInfo(res.data.data);
        setSubscribeState({
          isSubscribed: res.data.data.isSubscribed,
          subscriberCount: res.data.data.subscriberCount
        });
        setChannelCount({
          videoCount: res.data.data.videos,
          tweetCount: res.data.data.tweets,
          playlistCount: res.data.data.playlists
        });
        setLoading(false);
        initialIsSubscribed.current = res.data.data.isSubscribed;
        currentIsSubscribed.current = res.data.data.isSubscribed;
        channelId.current = res.data.data._id;
      })
      .catch(err => {
        setLoading(false);
        toast({
          variant: "destructive",
          type: "foreground",
          description: err?.response?.data?.message,
        });
      });
  }, []);

  useEffect(() => {
    return () => {
      if (currentIsSubscribed.current !== initialIsSubscribed.current) {
        axios
          .post(`${import.meta.env.VITE_BASE_URL}/api/v1/subscriptions/c/${channelId?.current as string}`, null, {
            withCredentials: true
          })
          .then(res => {
            toast({
              variant: "success",
              type: "foreground",
              description: `channel ${currentIsSubscribed.current ? "subscribed" : "unsubscribed"}`,
              action : <ToastAction altText="undo" onClick={()=>{
                axios
                .post(`${import.meta.env.VITE_BASE_URL}/api/v1/subscriptions/c/${channelId?.current as string}`, null, {
                  withCredentials: true
                })
                .then(res => console.log(res))
                .catch(err => console.log(err));
              }}>undo</ToastAction>,
            });
          })
          .catch(err => {
            toast({
              variant: "destructive",
              type: "foreground",
              description: err?.response?.data?.message
            });
          });
      }
    };
  }, [toast]);

  const handleSubscribeToggle = () => {
    currentIsSubscribed.current = !currentIsSubscribed.current;
    setSubscribeState(prev => {
      return {
        isSubscribed: !prev?.isSubscribed,
        subscriberCount: prev?.isSubscribed ? (prev?.subscriberCount - 1) : (prev?.subscriberCount as number + 1)
      };
    });
  };

  return loading ? (
    <div className='w-[100vw] flex justify-center items-center h-[90vh]'>
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#272727"
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </div>
  ) : (
    <div className='w-[100vw] h-[90vh] flex justify-center overflow-y-scroll dark:scrollbar-track-[#09090b] scrollbar-thumb-red-600 scrollbar-track-white scrollbar-thin pt-4 mb-4'>
      <div className='w-[80vw]'>
        <img src={channelInfo?.coverImage || "https://flowbite.com/docs/images/examples/image-1@2x.jpg"} className='w-[80vw] h-[40vh] bg-cover rounded-sm pt-4' />
        <div className="flex pt-4">
          <img src={channelInfo?.avatar} className="h-36 w-36 rounded-full" />
          <span className='p-4'>
            <p className='font-bold text-4xl'>
              {channelInfo?.fullName}
            </p>
            <p>
              {`@${channelInfo?.username} • ${formatCount(subscribeState?.subscriberCount as number)} subscribers • ${channelInfo?.videos} videos`}
            </p>
            <div className='pt-2'>
              <Button
                variant="ghost"
                className={`rounded-3xl ${subscribeState?.isSubscribed ? "bg-secondary/80" : "bg-red-600"}`}
                onClick={handleSubscribeToggle}
              >
                {subscribeState?.isSubscribed ? "subscribed" : "subscribe"}
              </Button>
            </div>
          </span>
        </div>
        <ChannelStateContextProvider
          videoCount={channelCount?.videoCount as number}
          tweetCount={channelCount?.tweetCount as number}
          playlistCount={channelCount?.playlistCount as number}
        >
          <ChannelPageNavbar />
          <Outlet />
        </ChannelStateContextProvider>
      </div>
    </div>
  );
}
