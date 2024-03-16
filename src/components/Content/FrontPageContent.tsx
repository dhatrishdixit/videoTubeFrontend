import { SkeletonCardMain } from "../Card/skeletonCard";
import { VideoCardMain } from "../Card/videoCard";
import { useLoading } from "@/hooks/LazyLoading";

export const ContentLoading = () => {
  // check where we are using react router dom hooks and acccordingly use the div
  return (
    <div className="p-2 grid grid-cols-3 overflow-y-scroll h-[90vh] scrollbar-thin dark:scrollbar-track-[#09090b] scrollbar-thumb-red-600 scrollbar-track-white place-items-center">
      <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain />
    
      {/* write conditional of loading here  */}

      {/*          
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
       */}
    </div>
  );
};
