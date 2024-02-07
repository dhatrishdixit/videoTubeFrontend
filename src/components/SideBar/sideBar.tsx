import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "../ui/button"

// in place of this have user info 
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)
const arr:string[] = new Array(20).fill("checking");

export function SideBar() {
  return (
    <div className=" h-screen overflow-x-hidden
      scrollbar scrollbar-thin dark:scrollbar-track-[#09090b] scrollbar-thumb-red-600 scrollbar-track-white ">
  
    {
       arr.map(curr=>(
        <Button variant="outline" className="w-full mt-2  hover:bg-red-600  ">
        {curr}
      </Button>
       ))
    }
    </div>
  )
}


<ScrollArea className="h-72 w-full rounded-md border">
<div className="p-4">
  <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
  {tags.map((tag) => (
    <>
      <div key={tag} className="text-sm">
        {tag}
      </div>
      <Separator className="my-2" />
    </>
  ))}
</div>
</ScrollArea>