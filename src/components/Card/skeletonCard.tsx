import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCardMain() {
  return (
    <div className="flex flex-col space-y-3 my-2">
      <Skeleton className="h-[40vh] w-[50vh] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export const SkeletonCardSearch = () => {
  return (
    <>
      <div className="flex flex-row space-y-3 mt-2">
        <Skeleton className="h-[15vw] w-[30vw] rounded-xl" />
        <div className="space-y-2 ml-2">
          <Skeleton className="h-4 w-[450px]" />
          <Skeleton className="h-4 w-[450px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </>
  );
};


{/* <div
ref={divRef}
className={` bg-white  ${!isHover ? "rounded-lg" : ""}  dark:bg-[#09090b]   cursor-pointer flex my-2 border p-1`}
onClick={() => {
  navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
  
}}
>
<div
  className="h-[15vw] w-[30vw]"
  onMouseEnter={() => {
    const timeOutId = setTimeout(() => {
      setHover(true);
    }, 500);
    setHoverTimer(timeOutId);
  }}
  onMouseLeave={() => {
    clearTimeout(hoverTimer);
    setHover(false);
  }}
>
  {isHover ? (
    <ReactPlayer
      className="react-player"
      url={props.videoFile}
      playing={true}
      width="100%"
      height="100%"
    />
  ) : (
    <img
      className="rounded-lg h-full w-full "
      src={props.thumbnail}
      alt={props.title}
      onClick={() => {
        navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
      }}
    />
  )}
</div>
<div className="flex py-2 px-2 gap-4 pl-6">
  <div className="flex flex-col">
    <h5
      className="text-xl font-bold tracking-tight text-left text-gray-900 dark:text-white"
      onClick={() => {
        console.log("clicked");
        navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
      }}
    >
      {props.title}
    </h5>


    <div className="mt-2 flex gap-6">
 
      <p
        className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-left"
        onClick={() => {
          console.log("clicked");
          //direct to channel home page
          // useNavigate from react router dom
        }}
      >
        {props.channelFullName}
      </p>
    </div>
    <p className="mb -1 font-normal text-gray-700 dark:text-gray-400 text-left">
      {" "}
      {props.views} views • {formatDate(props.createdAt)} ago
    </p>
 
  </div>
</div>
</div>
); */}


export function SkeletonCardRecommended(){
   
  return(
    <div className="h-[15vw] w-[30vw] flex m-2">
     <Skeleton className="h-[15vw] w-[17vw] mr-2"/>
     <div className="w-max flex flex-col">
      <Skeleton className="h-[5vw] w-[13vw] mb-2"/>
      <Skeleton className="h-[5vw] w-[13vw]"/>
     </div>
    </div>
  )

}