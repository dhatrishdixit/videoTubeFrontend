import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCardMain() {
  return (
    <div className="flex flex-col space-y-3 my-2">
      <Skeleton className="h-[40vh] w-[50vh] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export const SkeletonCardSearch = () =>{
    return(
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
    )
}