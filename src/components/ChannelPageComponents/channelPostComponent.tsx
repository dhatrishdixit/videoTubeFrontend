import React from 'react';
import { TweetCard } from '../Card/TweetPostCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TailSpin } from 'react-loader-spinner';
import { useChannelStateContext } from '@/hooks/ChannelState';
import { useParams } from 'react-router-dom';
import { VideoCardSearch, VideoPropsSearch } from '../Card/videoCard';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Button } from '../ui/button';


export function ChannelPostComponent() {
  const {channelUsername} = useParams();
  const {tweetCount} = useChannelStateContext();
  //{{localServer}}/tweets/u/post/:username

  return (
    <div className='py-4'>
      
      {/* <TweetCard/> */}
      
      </div>
  )
}

