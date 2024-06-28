import { formatDate } from '@/utils/DateFormat';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { cn } from '@/lib/utils';
import axios, { AxiosError } from 'axios';
import { useToast } from '../ui/use-toast';

export interface VideoPropsMain {
  _id: string;
  videoFile: string;
  thumbnail: string;
  owner: string;
  title: string;
  duration: number;
  views: number;
  channel: string;
  channelId:string;
  channelFullName: string;
  channelAvatar: string;
  createdAt: Date;
}

function manageString(str: string): string {
  if (str?.length <= 70) {
    return str;
  }

  return str?.slice(0, 69) + '....';
}

export const VideoCardMain = React.forwardRef<HTMLDivElement, VideoPropsMain>(
  (props, ref) => {
    const [isHover, setHover] = useState<boolean>(false);
    const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | undefined>(undefined);
    const navigate = useNavigate();
    const divRef = useRef<HTMLDivElement>(null);
    // console.log(ref);
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(divRef.current);
        } else {
          ref.current = divRef.current;
        }
      }
    }, [ref]);

    return (
      <div
        ref={divRef}
        className={`w-[55vh] bg-white ${!isHover ? 'rounded-lg' : ''} dark:bg-[#09090b] h-[60vh] p-2 cursor-pointer`}
        // onClick={() => {
        //    navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
        // }}
      >
        <div
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
            <div onClick={()=>{
              navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
            }}>
            <ReactPlayer
              className="react-player"
              url={props.videoFile}
              playing={true}
              width="100%"
              height="40vh"
            /></div>
          ) : (
            <img
              className="rounded-t-lg h-[40vh]"
              src={props.thumbnail}
              alt={props.title}
              onClick={() => {
                navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
              }}
            />
          )}
        </div>
        <div className="flex py-2 px-2 gap-4">
          <div>
            <img
              src={props.channelAvatar}
              className="h-8 w-8 rounded-full"
              onClick={() => {
                navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
              }}
            />
          </div>
          <div className="flex flex-col">
            <h5
              className="text-xl font-bold tracking-tight text-left text-gray-900 dark:text-white truncate"
              onClick={() => {
                navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
              }}
            >
              {props.title.substring(0,22)}{props.title.length >= 23 ? "...":""}
            </h5>

            <p
              className="mb -1 font-normal text-gray-700 dark:text-gray-400 text-left"
              onClick={() => {
                navigate(`/channel/${props.channel}`)
              }}
            >
              {props.channelFullName}
            </p>
            <p className="mb -1 font-normal text-gray-700 dark:text-gray-400">
              {' '}
              {props.views} views • {formatDate(props.createdAt)}
            </p>
          </div>
        </div>
      </div>
    );
  }
);
  export interface VideoPropsSearch {
    _id: string;
    videoFile: string;
    thumbnail: string;
    owner: string;
    title: string;
    duration: number;
    views: number;
    channel: string; //  @ type
    channelFullName: string;
    channelAvatar: string;
    createdAt: Date;
    description: string;
    channelId:string
  }

export const VideoCardSearch = React.forwardRef<HTMLDivElement,VideoPropsSearch>((props,ref) =>
  {
    const navigate  = useNavigate();
    const [isHover, setHover] = React.useState<boolean>(false);
    const [hoverTimer, setHoverTimer] = React.useState<
      NodeJS.Timeout | undefined
    >(undefined);
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(divRef.current);
        } else {
          ref.current = divRef.current;
        }
      }
    }, [ref]);

    return (
      <div
        ref={divRef}
        className={` bg-white  ${!isHover ? "rounded-lg" : ""}  dark:bg-[#09090b]   cursor-pointer flex my-2 border p-1`}
    
      >
        <div
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
              width="30vw"
              height="15vw"
              onClick={()=>{
                navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
              }}
            />
          ) : (
            <img
              className="rounded-lg h-[15vw] w-[30vw] "
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
              className="text-xl font-bold tracking-tight text-left text-gray-900 dark:text-white truncate"
              onClick={() => {
                navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
              }}
            >
              {props.title}
            </h5>

            <p className="mb -1 font-normal text-gray-700 dark:text-gray-400 text-left">
              {" "}
              {props.views} views • {formatDate(props.createdAt)}
            </p>
            <div className="mt-2 flex gap-6">
              <img
                src={props.channelAvatar}
                className="h-8 w-8 rounded-full"
                onClick={() => {
                  navigate(`/channel/${props.channel}`)
                }}
              />
              <p
                className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-left"
                onClick={() => {
                  navigate(`/channel/${props.channel}`)
                }}
              >
                {props.channelFullName}
              </p>
            </div>
            <p className="mt-6 font-normal text-gray-700 dark:text-gray-400 text-left">
              {manageString(props.description)}
            </p>
          </div>
        </div>
      </div>
    );
  })

  export interface WatchHistorySchema{
    _id: string,
    videoFile: string,
    thumbnail: string,
    owner: {
        _id: string,
        username: string,
        fullName: string,
        avatar: string
    },
    title: string,
    description: string,
    duration: number,
    views: number,
    isPublic: boolean,
    createdAt: string,
    updatedAt: string,
    __v: number,
    thumbnailPublicId: string,
    videoFilePublicId: string
  }
  export const VideoCardWatchHistory = React.forwardRef<HTMLDivElement,WatchHistorySchema>((props,ref) =>
    {
      const navigate  = useNavigate();
      const [isHover, setHover] = React.useState<boolean>(false);
      const [hoverTimer, setHoverTimer] = React.useState<
        NodeJS.Timeout | undefined
      >(undefined);
      const divRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(divRef.current);
          } else {
            ref.current = divRef.current;
          }
        }
      }, [ref]);
  
      return (
        <div
          ref={divRef}
          className={` bg-white  ${!isHover ? "rounded-lg" : ""}  dark:bg-[#09090b]   cursor-pointer flex my-2 border p-1`}
        >
          <div
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
                width="30vw"
                height="15vw"
                onClick={()=>{
                  navigate(`/video/${props._id}`,{ state: { channelId: props.owner._id } });
                }}
              />
            ) : (
              <img
                className="rounded-lg h-[15vw] w-[30vw] "
                src={props.thumbnail}
                alt={props.title}
                onClick={() => {
                  navigate(`/video/${props._id}`,{ state: { channelId: props.owner._id } });
                }}
              />
            )}
          </div>
          <div className="flex py-2 px-2 gap-4 pl-6">
            <div className="flex flex-col">
              <h5
                className="text-xl font-bold tracking-tight text-left text-gray-900 dark:text-white truncate"
                onClick={() => {
                  navigate(`/video/${props._id}`,{ state: { channelId: props.owner._id } });
                }}
              >
                {props.title}
              </h5>
  
              <p className="mb -1 font-normal text-gray-700 dark:text-gray-400 text-left">
                {" "}
                {props.views} views • {formatDate(props.createdAt)}
              </p>
              <div className="mt-2 flex gap-6">
                <img
                  src={props.owner.avatar}
                  className="h-8 w-8 rounded-full"
                  onClick={() => {
                    console.log("username : ",props.owner.username)
                    navigate(`/channel/${props.owner.username}`)
                  }}
                />
                <p
                  className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-left"
                  onClick={() => {
                    navigate(`/channel/${props.owner.username}}`)
                  }}
                >
                  {props.owner.fullName}
                </p>
              </div>
              <p className="mt-6 font-normal text-gray-700 dark:text-gray-400 text-left">
                {manageString(props.description)}
              </p>
            </div>
          </div>
        </div>
      );
    })

  export const VideoCardPlaylist = React.forwardRef<HTMLDivElement,VideoPropsSearch&{
    owner:string,
    setReload:React.Dispatch<React.SetStateAction<number>>,
    playlistOwnerId:string,
    playlistId:string
  }>((props) =>
    {
      const navigate  = useNavigate();
      const [isHover, setHover] = React.useState<boolean>(false);
      const { toast } = useToast();
      const [hoverTimer, setHoverTimer] = React.useState<
        NodeJS.Timeout | undefined
      >(undefined);
      const [hoverDiv,setHoverDiv] = React.useState<boolean>(false);
      const divRef = React.useRef<HTMLDivElement|null>(null);
      const userId = useSelector((state:RootState)=>state.authorization.userData._id);
      const permission = props.playlistOwnerId === userId;
      const deleteHandler = async () => {
          try {
            const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/playlist/remove/${props._id}/${props.playlistId}`,null,{
              withCredentials:true
            })
            props.setReload(Math.random());
            toast({
              variant:"success",
              type:"foreground",
              description:res.data.message
            })
          } catch (error) {
            if(error instanceof AxiosError){
                  toast({
              variant:"destructive",
              type:"foreground",
              description:error?.response?.data?.message
            })
            }
          }
      };
      return (
        <div
          className={` bg-white  ${!isHover ? "rounded-lg" : ""}  dark:bg-[#09090b]   cursor-pointer flex my-2 border p-1`}
          ref={divRef}
          onMouseEnter={()=>{
            setHoverDiv(true);
          }}
          onMouseLeave={(event)=>{
             if(divRef.current && event.relatedTarget instanceof Node && !divRef.current.contains(event.relatedTarget)){
                setHoverDiv(false);
             }
          }}
        >
          <div
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
                width="30vw"
                height="15vw"
                onClick={()=>{
                  navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
                }}
              />
            ) : (
              <img
                className="rounded-lg h-[15vw] w-[30vw] "
                src={props.thumbnail}
                alt={props.title}
                onClick={() => {
                  navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
                }}
              />
            )}
          </div>
          <div className="flex w-full justify-between py-2 px-2 gap-4 pl-6">
            <div className="flex flex-col">
              <h5
                className="text-xl font-bold tracking-tight text-left text-gray-900 dark:text-white"
                onClick={() => {
                  navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
                }}
              >
                {props.title}
              </h5>
  
              <p className="mb -1 font-normal text-gray-700 dark:text-gray-400 text-left">
                {" "}
                {props.views} views • {formatDate(props.createdAt)}
                ago
              </p>
              <div className="mt-2 flex gap-6">
                <img
                  src={props.channelAvatar}
                  className="h-8 w-8 rounded-full"
                  onClick={() => {
                    navigate(`/channel/${props.channel}`)
                  }}
                />
                <p
                  className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-left"
                  onClick={() => {
                    navigate(`/channel/${props.channel}`)
                  }}
                >
                  {props.channelFullName}
                </p>
              </div>
              <p className="mt-6 font-normal text-gray-700 dark:text-gray-400 text-left">
                {manageString(props.description)}
              </p>
            </div>
            <div>
      {
          (hoverDiv == true) && permission == true ? (
            <div className='mt-4 cursor-pointer'>
         <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button> <BsThreeDotsVertical /></button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 cursor-pointer")}>
            <DropdownMenu.Item
                className={cn(
                  "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 pl-8 bg-red-500 cursor-pointer", 
                )}
             onClick={deleteHandler}
            >Delete</DropdownMenu.Item>
      
          </DropdownMenu.Content>
        </DropdownMenu.Root>
         </div>
          ):null
        }
            </div>
            
          </div>
        </div>
      );
    })

  
export const VideoCardRecommendation = React.forwardRef<HTMLDivElement,VideoPropsSearch>((props,ref) =>
{
  const [isHover, setHover] = React.useState<boolean>(false);
  const [hoverTimer, setHoverTimer] = React.useState<
    NodeJS.Timeout | undefined
  >(undefined);
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(divRef.current);
      } else {
        ref.current = divRef.current;
      }
    }
  }, [ref]);

  return (
    <div
      ref={divRef}
      className={` bg-white  ${!isHover ? "rounded-lg" : ""}  dark:bg-[#09090b]   cursor-pointer flex my-2 border p-1`}
 
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
            onClick={() => {
              navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
            }}
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
            className="text-xl font-bold tracking-tight text-left text-gray-900 dark:text-white truncate"
            onClick={() => {
              navigate(`/video/${props._id}`,{ state: { channelId: props.channelId } });
            }}
          >
            {props.title}
          </h5>

  
          <div className="mt-2 flex gap-6">
       
            <p
              className="mb-1 font-normal text-gray-700 dark:text-gray-400 text-left"
              onClick={()=>{
             
                navigate(`/channel/${props.channel}`)
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
  );
})
