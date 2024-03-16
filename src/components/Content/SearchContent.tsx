import { SkeletonCardSearch } from "../Card/skeletonCard";
import { VideoCardSearch } from "../Card/videoCard";

export const ContentSearch = () => {
    return (
      <div
        className="mx-2 h-[90vh] overflow-y-scroll scrollbar-thin  scrollbar-thumb-red-600 
             scrollbar-track-white
             dark:scrollbar-track-[#09090b]
            "
      >
        <SkeletonCardSearch/>
                <SkeletonCardSearch/>
                <SkeletonCardSearch/>
                <SkeletonCardSearch/>
                <SkeletonCardSearch/>
                <SkeletonCardSearch/>
                <SkeletonCardSearch/>
                <SkeletonCardSearch/>
                <SkeletonCardSearch/>
                <SkeletonCardSearch/>
                <SkeletonCardSearch/>
                <SkeletonCardSearch/>
                 <SkeletonCardSearch/> 
        {/* <SkeletonCardSearch/>
        {/* <VideoCardSearch />
        <VideoCardSearch />
        <VideoCardSearch />
        <VideoCardSearch />
        <VideoCardSearch />
        <VideoCardSearch />
        <VideoCardSearch />
        <VideoCardSearch />
        <VideoCardSearch />
        <VideoCardSearch />
        <VideoCardSearch /> */}
      </div>
    );
  };
  