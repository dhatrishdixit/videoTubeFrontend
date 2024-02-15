import { ContentSearch } from "@/components/Content/content";
import React from "react"
import ReactPlayer, { ReactPlayerProps } from "react-player";

import { Player } from "@/components/CustomVideoPlayer/Player";

//important things to add in this 
//

interface VideoPageProps{
    videoId :string ;
    userId :string ;
}



export const MainVideoPage:React.FC<ReactPlayerProps> = ({
    //props:VideoPageProps
}) =>{
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
        videoFile: "https://res.cloudinary.com/dviowskng/video/upload/v1706475402/dblmur3eunms5re2qytm.mp4",
        thumbnail: "https://res.cloudinary.com/dviowskng/image/upload/v1706475404/by6yqexxdae9bmdqtwgs.png",
        owner: "65b63db59ea6a235c4b6ece1",
        title: "first video",
        duration: 13.504,
        views: 0,
        channel: "dhatrish2",
        channelFullName: "sample1",
        channelAvatar: "http://res.cloudinary.com/dviowskng/image/upload/v1706442163/degk5k7iklrne5hg5cf4.png",
        description:"Hello this is my first video how do you like it hey there guys ggkfsdkljgklskjflksdjlkgjdslkjflksdlksjgksjdflkjsdkjlksdjglksdjflksdj "
    }
    const vidRef = React.useRef<HTMLVideoElement>()

   return (
    <div className="m-2 grid grid-cols-10">
     <div className="col-span-7">
    <Player
    className='react-player'
    url={data.videoFile}
    light={data.thumbnail}
    ></Player>
     like
      
     comment section 
     </div>
     <div className="col-span-3">
     video recomended from same channel 
     {/* <ContentSearch/> */}
     </div>

    </div>
   )
}