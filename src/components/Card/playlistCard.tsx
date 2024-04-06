import { useState } from "react";
import { IoVideocamSharp } from "react-icons/io5";
function stringShortener(str: string): string {
  return str?.length >= 50 ? str?.substring(0, 49)+"..." : str;
}


const defaultImageUrl = "https://flowbite.com/docs/images/examples/image-1@2x.jpg" ;


export interface PlaylistCardProps{
   _id:string;
   name:string;
   description:string;
   ownerId:string;
   ownerUsername:string;
   ownerFullname:string;
   FirstVideoThumbnail?:string;
   videos:number
}

export function PlaylistCard(props:PlaylistCardProps) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div
      className="m-2 relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={
          props.FirstVideoThumbnail || defaultImageUrl
        }
        className={`w-[240px] h-[128px] transition-all duration-300 rounded-sm ${
          hover ? "brightness-75 rounded-2xl blur-sm " : ""
        }`}
        alt="playlist card"
      />
      {hover && (
        <div className="absolute inset-0 flex flex-col justify-between p-2 transition-opacity duration-300 cursor-pointer">
         
          <p className="text-slate-200 flex w-full flex-col ">
            <div>{stringShortener(props.description)}
            </div>
            <div className="flex items-center gap-2 flex-end">{props.videos}<IoVideocamSharp /></div>

          </p>
         
         

        </div>
      )}
       <p className="text-slate-200 font-semibold">{props.name}</p>
    </div>
  );
}