import {Logo} from "../logo/logo"

import { Switcher } from "../mood-toggle"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollableArea } from "../ScrollableContent"
import { PublishedBtn } from "../publishVidBtn"
import { InputSearch } from "../ui/inputSearch"
import { FilterBtn } from "../filterBtn"

export const Navbar = () =>{
    return (
      <div className=" px-2  w-full h-full items-center justify-around grid grid-cols-10 ">
      
      <div className="col-span-2 flex ml-3 items-center gap-4"
           onClick={()=>{
            //TODO: navigate to home page 
           }}
      >
        <Logo/><p className="text-red-600 font-bold text-xl">VideoTube</p>
        </div>
        <div className="col-span-1">
        <FilterBtn/>
        </div>
        <div className="col-span-4">
        <InputSearch className="w-full"/>
        </div>

        <div className="col-span-1">
          <PublishedBtn/>
        </div>

        <div className="col-span-1">
        <Switcher/>
        </div>
     
        <div className="col-span-1 px-2 flex justify-center">
        <Avatar>
       <HoverCard>
       <HoverCardTrigger>
       <AvatarImage 
       //TODO:add actual image url here 
       src="https://github.com/shadcn.png" 
       //fetch these images from avatar 
       onClick={
        ()=>{
         console.log('clicked')
        }
       }/>
       <AvatarFallback>CN</AvatarFallback>
       </HoverCardTrigger>
       <HoverCardContent className="p-0">
       <ScrollableArea/>
       </HoverCardContent>
       </HoverCard>
       </Avatar>
       </div>
       </div>
   
    )
}

 