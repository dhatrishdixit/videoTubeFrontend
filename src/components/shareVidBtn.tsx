import { CiShare2 } from "react-icons/ci";
import { Button } from "./ui/button";
import { 
    AlertDialog, 
    AlertDialogTrigger, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogFooter, 
    AlertDialogCancel } from "./ui/alert-dialog";

import { useToast } from "./ui/use-toast";
import { Separator } from "./ui/separator";
import {
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    RedditIcon,
    RedditShareButton,
    TumblrIcon,
    TumblrShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    VKIcon,
    VKShareButton,
    XIcon
  } from "react-share";
import { useEffect, useState } from "react";


export function ShareVidBtn() {
   const { toast } = useToast();
   const [shareUrl,setShareUrl] = useState<string>(window.location.href);
  
   useEffect(()=>{
      setShareUrl(window.location.href);
   },[window.location.href])
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button variant="link">
        <CiShare2 className="scale-150 text-black dark:text-white"/>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-row justify-between items-center">
          <AlertDialogTitle>Share This Video</AlertDialogTitle>
          <AlertDialogCancel className="rounded-full border-none w-10 h-10">
          <Button variant="ghost" size="icon">
              <XIconClose className="h-4 w-4" />
              <span className="sr-only">Close</span>
          </Button>
          </AlertDialogCancel>
         
        </AlertDialogHeader>
        <div>
          <p className="text-muted-foreground">Copy this link to share with others:</p>
          <div className="mt-2 flex items-center rounded-md bg-muted px-3 py-2">
            <span className="text-sm font-medium truncate">{window.location.href.length>59 ?window.location.href.substring(0,56)+"...":window.location.href}</span>
            <Button variant="ghost" size="icon" className="ml-auto rounded-full" onClick={()=>{
                window.navigator.clipboard.writeText(window.location.href);
                toast({
                    variant:"success",
                    type:"foreground",
                    description: "Shareable Link copied successfully",
                })
            }}>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <Button onClick={()=>{
             window.navigator.clipboard.writeText(window.location.href);
             toast({
                 variant:"success",
                 type:"foreground",
                 description: "Shareable Link copied successfully",
             })
          }}>Copy Link</Button>
        </AlertDialogFooter>
        <Separator orientation="vertical" />
        Share on : 
       <div className="flex gap-3 w-full items-center justify-center">
       <FacebookShareButton
          url={shareUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>

    
        <FacebookMessengerShareButton
          url={shareUrl}
          appId="521270401588372"
        >
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
        <TwitterShareButton
          url={shareUrl}
        >
          <XIcon size={32} round />
        </TwitterShareButton>

        <TelegramShareButton
          url={shareUrl}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>

        <WhatsappShareButton
          url={shareUrl}
          separator=":: "
        >
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={shareUrl}
        >
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <RedditShareButton
          url={shareUrl}
          windowWidth={660}
          windowHeight={460}
        >
          <RedditIcon size={32} round />
        </RedditShareButton>
        <TumblrShareButton
          url={shareUrl}
        >
          <TumblrIcon size={32} round />
        </TumblrShareButton>
        <VKShareButton
          url={shareUrl}
        >
          <VKIcon size={32} round />
        </VKShareButton>
       </div>
     
      </AlertDialogContent>
    </AlertDialog>
  )
}

    function CopyIcon(props?:{className:string}) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}


function XIconClose(props?:{className:string}) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
