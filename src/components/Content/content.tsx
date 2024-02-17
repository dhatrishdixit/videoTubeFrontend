import { SkeletonCardMain, SkeletonCardSearch } from "../Card/skeletonCard";
import { VideoCardMain, VideoCardSearch } from "../Card/videoCard";

export const ContentMain = () => {
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
           <VideoCardMain /> */}
    </div>
  );
};

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
