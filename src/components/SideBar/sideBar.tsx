import { Button } from "../ui/button"

// in place of this have user info 
const arr:string[] = new Array(20).fill("checking");

[
  {
    name:"Home",
    click:function (){
      // navigate to home page 
    }
  },{
    
  },{

  },{
    
  }
]

export function SideBar() {
  return (
    <div className=" h-screen overflow-x-hidden
        dark:scrollbar-track-[#09090b] scrollbar-thumb-red-600 scrollbar-track-white scrollbar-thin ">
  
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

