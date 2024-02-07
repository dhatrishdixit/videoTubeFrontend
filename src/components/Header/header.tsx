import {Logo} from "../logo/logo"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { Input } from "../ui/input"
import { ModeToggle, Switcher } from "../mood-toggle"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollableArea } from "../ScrollableContent"
import { Button } from "../ui/button"
import { PublishedBtn } from "../publishVidBtn"

export const Navbar = () =>{
    return (
      <div className=" px-2 flex w-full h-full items-center justify-around grid grid-cols-10">
      {/* <Button variant="destructive">logout</Button> */}
      <div className="col-span-3 flex ml-3 items-center gap-4"
           onClick={()=>{
            // navigate to home page 
           }}
      >
        <Logo/><p className="text-red-600 font-bold text-2xl">Video Tube</p>
        </div>
      <div className="flex gap-8 items-center">
        <div>
        <Input type="text" placeholder="search" className="w-[400px]"/>
        </div>
        <div>
          <PublishedBtn/>
        </div>
        <div className="w-full">
        <Switcher/>
        </div>
     
        <div>
        <Avatar>
       <HoverCard>
       <HoverCardTrigger>
       <AvatarImage 
       src="https://github.com/shadcn.png" 
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
      </div>
    )
}

     // write custom header with all these components
     <NavigationMenu className="w-screen flex items-stretch">
     <NavigationMenuList className="justify-between min-w-[800px]">
       <NavigationMenuItem>
         <Button variant="destructive">logout</Button>
       </NavigationMenuItem>
       <NavigationMenuItem>
         <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
         <NavigationMenuContent>
           <NavigationMenuLink> <Button variant="destructive">logout</Button></NavigationMenuLink>
         </NavigationMenuContent>
       </NavigationMenuItem>
       <NavigationMenuItem>
         <Input type="text" placeholder="search" className="w-[400px]"/>
       </NavigationMenuItem>
       <NavigationMenuItem>
         <ModeToggle/>
       </NavigationMenuItem>
       <NavigationMenuItem>
     
       </NavigationMenuItem>
     
     </NavigationMenuList>
   </NavigationMenu>
   