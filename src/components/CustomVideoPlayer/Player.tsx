import ReactPlayer,{ ReactPlayerProps } from "react-player";
import React from "react";
import { PlayArrowRounded } from "@mui/icons-material";

import BsPlayFill from "./PlayIcon";
export const Player: React.FC<ReactPlayerProps> = (props: ReactPlayerProps) => {
   const {url,thumbnail} = props;
 

  return (
    <div>
    <ReactPlayer 
      url={url}
      light={thumbnail}
      controls={true}
      playIcon={<BsPlayFill/>}
      width="95%"
    ></ReactPlayer>
    </div>
  )
};
