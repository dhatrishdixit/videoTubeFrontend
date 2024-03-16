import { ContentSearch } from "@/components/Content/FrontPageContent";
import React from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { IoMdSend } from "react-icons/io";
import { Player } from "@/components/CustomVideoPlayer/Player";
import { Button } from "@/components/ui/button";
import { PiThumbsUpDuotone } from "react-icons/pi";
import { PiThumbsUpFill } from "react-icons/pi";
import { Input } from "@/components/ui/input";
import { InputPost } from "@/components/ui/inputPost";
import { CommentCard } from "@/components/Card/commentCard";
import { VideoCardRelated, VideoCardSearch } from "@/components/Card/videoCard";

//important things to add in this
//

interface VideoPageProps {
  videoId: string;
  userId: string;
}

export const MainVideoPage: React.FC<ReactPlayerProps> = (
  {
    //props:VideoPageProps
  },
) => {
  // this is my strategy to deal with main page
  // make a fetch request based on the video Id
  // update backend to check for whether the user has liked the video or not on that basis have a variable to store that
  // also use useEffect to track like on video

  // then for comments have a comment section for that you need whole lot of info
  // comment section will have arrays of comments for each of them you have to check whether liked by user or not for that also make a separate comment component
  // and use smart data fetching techniques for this

  //fetch request from here for the video

  const data = {
    _id: "65b6bf8d5bc50568f33c12b3",
    videoFile:
      "https://res.cloudinary.com/dviowskng/video/upload/v1706475402/dblmur3eunms5re2qytm.mp4",
    thumbnail:
      "https://res.cloudinary.com/dviowskng/image/upload/v1706475404/by6yqexxdae9bmdqtwgs.png",
    owner: "65b63db59ea6a235c4b6ece1",
    title: "first video",
    duration: 13.504,
    views: 0,
    channel: "dhatrish2",
    channelFullName: "sample1",
    channelAvatar:
      "http://res.cloudinary.com/dviowskng/image/upload/v1706442163/degk5k7iklrne5hg5cf4.png",
    description:
      "Hello this is my first video how do you like it hey there guys   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati accusantium veritatis incidunt unde fugit magni voluptatem porro id rem ex quaerat dignissimos architecto similique modi animi nihil adipisci, consectetur perferendisSequi sed odit aliquam harum officia perferendis. Dignissimos molestiae nemo odio sint eaque voluptate modi fugiat, cumque beatae velit consequuntur quodNostrum quis repellat labore commodi pariatur rerum amet DoloremLibero tempora odit ad facere veniam tempore esse maiores aliquam autem aliquid, necessitatibus dolore placeat aut vel obcaecati saepeUnde deserunt necessitatibus odit inventore praesentium odio ullam adipisci blanditiis atque. Officiis quod unde consequatur tempore dignissimos eius, rerum pariatur Aliquam praesentium, rerum doloribus ipsum repellendus sapiente cumque fugiat, ratione natus nam alias libero tenetur placeat quos repellat mollitia? Cupiditate, ration Es Excepturriatur dignissimos quae commodi harum perferendis ducimus veniam voluptate ea quaeraquasi corrupti iusto dolore maxime numquam consequatur alias utNihil explicaboaccusamus dolor sint architecto fugia",
    subscriptions: 100,
    likeCount : 10,
    isLiked: false,
    isSubscribed:true,
    createdAt: "12 Feb 2016",
    commentsCount: 12000,
    userAvatar:"https://res.cloudinary.com/dviowskng/image/upload/v1683962028/samples/animals/three-dogs.jpg"
  };
  // also should get user id from fetch request
 // remember updating subscriber count when subcribed by the user
  const [collapse,setCollapse] = React.useState<boolean>(true) ;
  function stringShortener(str:string):string {
           return str.substring(0,100);
  }

  return (
    <div className="mx-4 my-2 grid grid-cols-10 h-[90vh] overflow-y-scroll scrollbar-thin dark:scrollbar-track-[#09090b] scrollbar-track-white scrollbar-thumb-red-600">
      <div className="col-span-6">
        <Player
          className="react-player"
          url={data.videoFile}
          thumbnail={data.thumbnail}
        ></Player>
        <p className="text-3xl font-bold text-left mt-2">{data.title}</p>
       <div className="mt-2 h-12 grid grid-cols-10 items-center">
       <img src={data.channelAvatar} className="h-12 w-12 rounded-full  col-span-1"/>
       <div className="flex col-span-6 items-center gap-4">
        <div>
        <p className="text-lg text-bold text-left">{data.channelFullName}</p>
         <p className="text-slate-500 text-sm text-left">{data.subscriptions} subscribers</p></div>
         <Button variant="secondary" className={`${!data.isSubscribed?"rounded-xl":""} w-[96px]`}>{data.isSubscribed?"subcribed":"subcribe"}</Button>
       </div>
       <Button variant="secondary" onClick={()=>{
        // toggle like button
       }}> 
       {
        // change this also
        data.isLiked?<PiThumbsUpDuotone className="scale-150"/>:<PiThumbsUpFill className="scale-150"/>
       }
        </Button>
       <p className="ml-2">{data.likeCount}</p>
       </div>
       <div className="w-[95%] dark:bg-[#272727] rounded-md my-4 bg-[#f1f1f1] pr-4">
        {
          // description with more and less information
          // TODO: remember to update views as well
          // TODO: owner of channelOwnerId === userId than provide accesss to tweet section to the owner  
        }
        <p className="text-left pl-4 text-lg font-semibold pt-2">{data.views} views • {data.createdAt}</p>
        <p className="text-left py-2 px-4">
        {
          data.description.length <= 99 ? data.description : (
            <>
            {collapse? stringShortener(data.description) : data.description}
            <Button variant="outline" className="dark:bg-[#272727] bg-[#f1f1f1] border-none border-0 text-gray-400" onClick={()=>{
                 setCollapse(prev => !prev);          
            }}>{collapse?"...more":"show less"}</Button>
            </>
          )
        }
        </p>

   
       </div>

       {
        // comment section make a comment section page and comment section component 
      }
       <div className=" w-[95%] dark:bg-[#272727] rounded-md my-4 bg-[#f1f1f1] text-left px-4 py-4">
          <p className="text-xl font-bold">{data.commentsCount.toLocaleString("en-US")} Comments</p>
          <div className="my-4 flex items-center ">
            <img src={data.userAvatar} className="h-12 w-12 rounded-full "/>
          
            <InputPost placeholder="comment" className="w-[80%] ml-6 border-b"/>
          </div>
        {/*iterate over comments*/}
          <CommentCard/>
          <CommentCard/>
          <CommentCard/>
          <CommentCard/>
          <CommentCard/>
          <CommentCard/>
          <CommentCard/>
          <CommentCard/>
        </div>
        
      </div>
    
    
      <div className="col-span-4 ">
        video recomended from same channel
        {/* <ContentSearch/> i.e. same channel videos*/}
        <VideoCardRelated />
        <VideoCardRelated />
        <VideoCardRelated />
        <VideoCardRelated />
      </div>


    </div>
  );
};
