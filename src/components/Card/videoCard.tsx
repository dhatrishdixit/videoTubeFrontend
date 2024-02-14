// you will have to pass props in place of this dummy data 

const props = {
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

import { useNavigate } from "react-router-dom";
import React from "react";
import ReactPlayer from "react-player"
interface videoPropsMain {
    key:string;
    _id:string;
    videoFile:string;
    thumbnail:string;
    ownerId:string;
    title:string;
    duration:number;
    views:number;
    channelUniqueName: string;  //  @ type
    channelFullName: string;
    channelAvatar:string;
    createdAt:Date;
}
interface videoPropsSearch {
    key:string;
    _id:string;
    videoFile:string;
    thumbnail:string;
    ownerId:string;
    title:string;
    duration:number;
    views:number;
    channelUniqueName: string;  //  @ type
    channelFullName: string;
    channelAvatar:string;
    createdAt:Date;
    description:string;
}


function manageString(str:string):string{
            
    if(str.length <= 70){
        return str ;
    }
    
    return str.slice(0,69)+"...."

}

export const VideoCardMain = (
    //props:videoProps

    )=>{
    // TODO:created at  --- add through pipeLine
    // add hover effect to play video 
        const [isHover,setHover] = React.useState<boolean>(false);
        const [hoverTimer,setHoverTimer] = React.useState<NodeJS.Timeout|undefined>(undefined);


    return(
        <div className={`w-[55vh] bg-white  ${ !isHover ? "rounded-lg":""}  dark:bg-[#09090b]  h-[60vh]  p-2 cursor-pointer` }onClick={()=>{
            console.log('clicked')
            //direct to video 
            // useNavigate from react router dom 
        }}>
        
        <div 
        onMouseEnter={()=>{
            const timeOutId = setTimeout(()=>{
                setHover(true);
            },500)
            setHoverTimer(timeOutId);
        }}
        onMouseLeave={()=>{
            clearTimeout(hoverTimer);
            setHover(false);
        }}
        >
        
        {
            isHover ? 
            <ReactPlayer
            className='react-player'
            url={props.videoFile}
            playing={true}
            width='100%'
            height='40vh'
          /> :
        <img className="rounded-t-lg h-[40vh] " src={props.thumbnail} alt={props.title} 
        onClick={()=>{
            console.log('clicked')
            //direct to video 
            // useNavigate from react router dom 
        }}
        
        />
    }
        </div>
        <div className="flex py-2 px-2 gap-4">
        <div>
       <img src={props.channelAvatar} className="h-8 w-8 rounded-full"
          onClick={()=>{
              console.log('clicked')
              //direct to channel home page  
              // useNavigate from react router dom 
          }}
          />
        
       
   
            </div>
        <div className="flex flex-col"> 
        <h5 className="text-xl font-bold tracking-tight text-left text-gray-900 dark:text-white"
        onClick={()=>{
            console.log('clicked')
            //direct to video 
            // useNavigate from react router dom 
        }}
        >
            {props.title}
        </h5>
        
            <p className="mb -1 font-normal text-gray-700 dark:text-gray-400 text-left"
            onClick={()=>{
                console.log('clicked')
                //direct to channel home page 
                // useNavigate from react router dom 
            }}
            >
                {props.channelFullName}
            </p>
            <p className="mb -1 font-normal text-gray-700 dark:text-gray-400"> {props.views} views • 3 months ago</p>
            
            </div>

      
        </div>
    </div>
    )
  
}

export const VideoCardSearch = (
   // props:videoPropsSearch
) =>{
     // TODO:created at  --- add through pipeLine
    // add hover effect to play video 
    const [isHover,setHover] = React.useState<boolean>(false);
    const [hoverTimer,setHoverTimer] = React.useState<NodeJS.Timeout|undefined>(undefined);

return(
    <div className={` bg-white  ${ !isHover ? "rounded-lg":""}  dark:bg-[#09090b]   cursor-pointer flex my-2 border p-1` }onClick={()=>{
        console.log('clicked')
        //direct to video 
        // useNavigate from react router dom 
    }}>
    
    <div 
    onMouseEnter={()=>{
        const timeOutId = setTimeout(()=>{
            setHover(true);
        },500)
        setHoverTimer(timeOutId);
    }}
    onMouseLeave={()=>{
        clearTimeout(hoverTimer);
        setHover(false);
    }}
    >
    
    {
        isHover ? 
        <ReactPlayer
        className='react-player'
        url={props.videoFile}
        playing={true}
        width='30vw'
        height='15vw'
      /> :
    <img className="rounded-lg h-[15vw] w-[30vw] " src={props.thumbnail} alt={props.title} 
    onClick={()=>{
        console.log('clicked')
        //direct to video 
        // useNavigate from react router dom 
    }}
    
    />
}
    </div>
    <div className="flex py-2 px-2 gap-4 pl-6">

    <div className="flex flex-col"> 
    <h5 className="text-xl font-bold tracking-tight text-left text-gray-900 dark:text-white"
    onClick={()=>{
        console.log('clicked')
        //direct to video 
        // useNavigate from react router dom 
    }}
    >
        {props.title}
    </h5>
    

        <p className="mb -1 font-normal text-gray-700 dark:text-gray-400 text-left"> {props.views} views • {/*TODO: here use created at  */}3 months ago</p>
        <div className="mt-2 flex gap-6">
        <img src={props.channelAvatar} className="h-8 w-8 rounded-full"
      onClick={()=>{
          console.log('clicked')
          //direct to channel home page  
          // useNavigate from react router dom 
      }}
      />
        <p className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-left"
        onClick={()=>{
            console.log('clicked')
            //direct to channel home page 
            // useNavigate from react router dom 
        }}
        >
            {props.channelFullName}
        </p>
        
        </div>
        <p className="mt-6 font-normal text-gray-700 dark:text-gray-400 text-left">{manageString(props.description)}</p>
        </div>

  
    </div>
</div>
)
}