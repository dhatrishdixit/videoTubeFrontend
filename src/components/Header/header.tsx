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
import { ModeToggle } from "../mood-toggle"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollableArea } from "../ScrollableContent"

export const Navbar = () =>{
    return (
  <NavigationMenu className="w-screen ">
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <Input type="text" placeholder="search" className=""/>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <ModeToggle/>
    </NavigationMenuItem>
    <NavigationMenuItem>
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
    </NavigationMenuItem>
  
  </NavigationMenuList>
</NavigationMenu>

    )
}