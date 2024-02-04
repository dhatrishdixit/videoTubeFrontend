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
        <ResizablePanel defaultSize={50}>
          <div className="flex h-screen items-center justify-center p-6">
            <span className="font-semibold">SideBar

            {/*build a custom side bar for this with buttons */}
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">
                    <Navbar/>
                </span>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
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
