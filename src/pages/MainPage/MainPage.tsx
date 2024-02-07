import React from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"
import { SideBar } from '@/components/SideBar/sideBar'
  import { Navbar } from '@/components/Header/header'


  export function ResizableMain() {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full h-screen rounded-lg border-none"
      >
        <ResizablePanel defaultSize={15}>
          <div className="flex h-screen items-center justify-center p-6">
            <span className="font-semibold">SideBar

            {/*build a custom side bar for this with buttons */}
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={85}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={10}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">
                    <Navbar/>
                </span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={90}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">
                    videos
                    {/* fetch all videos here with there card */}
                </span>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }


  export const MainPage = () =>{
    return(
      <div>
      <div className='grid grid-cols-12 h-screen '>
        <div className=' col-span-2'><SideBar/></div>
        <div className=' grid grid-rows-10  col-span-10'>
         <div className='row-span-1'><Navbar/></div>
         <div className='row-span-9'>content</div>

        </div>

      </div>
      </div>
      
    )
  }
