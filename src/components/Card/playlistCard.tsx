import { useState } from "react";

function stringShortener(str:string):string {

     return str?.length >= 50 ? str?.substring(0,49) : str ;
  }



const props = {
    video0:{
        thumbnail:"https://res.cloudinary.com/dviowskng/image/upload/v1683962030/samples/ecommerce/leather-bag-gray.jpg",
    },
    video1:{
        thumbnail:"https://res.cloudinary.com/dviowskng/image/upload/v1683962030/samples/ecommerce/car-interior-design.jpg"
    },
    video2:{
        thumbnail:"https://res.cloudinary.com/dviowskng/image/upload/v1683962021/samples/ecommerce/analog-classic.jpg"
    },
    video3:{
        thumbnail:"https://res.cloudinary.com/dviowskng/image/upload/v1683962033/samples/landscapes/nature-mountains.jpg"
    },
    createdAt: "3 days ago",
    name:"my first playlist",
    description:"this is my first playlist",
    // owner:"65b63db59ea6a235c4b6ece1",
    // channel:"dhatrish2",
    // channelFullName:"sample1",
    // channelAvatar:"http://res.cloudinary.com//image/upload/v1706442163/degk5k7iklrne5hg5cf4.png",
    // views:0,
}

// blur transformation : https://res.cloudinary.com/dviowskng/prod/image/upload/e_blur:1500/me/v1706442163/degk5k7iklrne5hg5cf4.png

// onHover make it darker 

export function PlaylistCard(){
    const [hover,setHover] = useState<boolean>(false);
    return(
        <div className="m-2">
          <img src={props.video0.thumbnail}/>
        </div>
    )
}