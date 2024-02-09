import { SkeletonCard } from "../Card/skeletonCard"
import { VideoCardMain } from "../Card/videoCard"

export const Content = () =>{
     return (
          <div className="p-2 grid grid-cols-3 overflow-y-scroll h-[90vh] scrollbar scrollbar-thin dark:scrollbar-track-[#09090b] scrollbar-thumb-red-600 scrollbar-track-white ">
          {/* <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/>
          <SkeletonCard/> 
           write conditional of loading here 
         
          */}
         
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />

          <VideoCardMain />
          <VideoCardMain />

           <VideoCardMain />
           <VideoCardMain />
           <VideoCardMain />
          </div>
     )
}