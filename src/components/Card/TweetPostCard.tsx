import { formatDate } from "@/utils/DateFormat"
import { useState } from "react";
import { Button } from "../ui/button";
import { PiThumbsUpDuotone } from "react-icons/pi";
import { PiThumbsUpFill } from "react-icons/pi";
import { formatCount } from "@/utils/CountFormat";

const props = {
    ownerAvatar: "https://res.cloudinary.com/dviowskng/image/upload/v1683962023/samples/food/fish-vegetables.jpg",
    ownerFullname:"checking this",
    content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vulputate, ante nec interdum fermentum, diam dolor sollicitudin odio, quis consectetur justo elit vel quam. In hac habitasse platea dictumst. Aenean a justo nec dui dignissim tristique. Nulla facilisi. Ut vitae purus vel augue dictum convallis. Quisque vel mauris id tortor gravida blandit ac ut justo. Proin vel eros bibendum, tristique ipsum non, interdum magna. Duis pharetra tellus nec nunc mattis eleifend. Maecenas tempor massa id diam vestibulum, sit amet sollicitudin odio tempor. Cras non eros quis elit tempus posuere. Nam nec ex eget sem congue consectetur. Curabitur ultrices ultrices mauris, ut luctus felis vulputate non. Donec sit amet felis vitae risus commodo vestibulum. Fusce vel eros nec libero posuere faucibus. Aenean mattis massa id lectus convallis, at fringilla velit placerat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut malesuada felis vel nisi rhoncus, vel malesuada libero semper. Donec vehicula arcu et ex congue, quis porttitor risus sollicitudin. Vivamus id leo sapien. Integer a urna a nulla consequat posuere. Nam nec metus vitae felis suscipit volutpat. Cras eu metus vitae est consectetur sagittis. Proin et urna quis libero convallis facilisis. Aenean lacinia ut lacus ac fermentum. Quisque sit amet faucibus nisi. Maecenas condimentum, enim ut laoreet accumsan, nunc elit venenatis justo, ut commodo justo nunc sed elit. Suspendisse quis condimentum tortor, non accumsan nisi. Morbi vestibulum massa vitae consequat cursus. Maecenas sed arcu nec arcu auctor gravida. Fusce id lacinia ipsum. Sed vestibulum erat sed massa faucibus commodo. Pellentesque nec convallis ligula. Cras luctus lectus at scelerisque tempor. Phasellus at ex nec ligula faucibus malesuada. Vivamus nec orci fermentum, dapibus felis in, eleifend mi. Fusce rhoncus leo vel metus varius, nec gravida enim pharetra. Donec mattis libero sit amet vestibulum egestas. Sed sodales libero eget sollicitudin viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut vehicula euismod odio, in condimentum est fermentum sed. Curabitur varius ultrices consequat. Proin vel risus vitae lacus consequat consequat vel sit amet lacus. Ut tempor, elit non vulputate vehicula, eros leo ultricies justo, eget ultricies dolor tortor quis lorem. Nullam tincidunt dolor sed dui tempus dictum. Donec quis mauris eget tortor rutrum laoreet non a enim. Sed malesuada ut nisl ac cursus. Vivamus id dui rutrum, scelerisque elit non, finibus nisl. Sed pulvinar diam vel ligula vulputate, a ultricies sapien lacinia. Sed vestibulum luctus risus, at fermentum risus volutpat in. Fusce nec sapien risus. Nulla eget elit sed metus malesuada luctus. Pellentesque id pretium nisi, sit amet egestas libero. Nulla facilisi. Sed ullamcorper neque ac lectus lobortis, quis dictum quam molestie. Maecenas pretium elit sed eros laoreet fringilla. Quisque a semper nulla, non convallis lectus. Sed vehicula ligula nec quam bibendum lobortis. Cras dignissim, ligula quis tincidunt rutrum, nunc dui accumsan risus, vel hendrerit justo mi sit amet orci. Nulla facilisi. Curabitur maximus justo at tincidunt fermentum. Proin eleifend odio ut augue suscipit auctor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc vehicula tellus sit amet lacus fermentum, nec ultricies neque dignissim. Proin id nisi quis elit sollicitudin consequat ut eget enim. In volutpat odio sit amet felis viverra, non hendrerit ligula blandit. Sed sollicitudin malesuada ipsum, sit amet tempus ex auctor non. Curabitur et malesuada nulla. In nec hendrerit orci. Integer fermentum, velit eu convallis lacinia, purus lorem vestibulum lorem, eget fringilla est ex nec metus. Nullam nec risus lacinia, lobortis neque nec, ultrices lorem. Curabitur fermentum erat vitae est vehicula laoreet. Quisque lobortis elit sit amet dolor tempor, vitae finibus libero facilisis. Sed eget est in arcu dignissim suscipit. Aliquam erat volutpat. Aliquam convallis, leo sed varius hendrerit, metus mauris dictum eros, id iaculis quam eros eget risus. Integer sit amet arcu sit amet nunc ultrices rutrum. In sit amet placerat nulla. Vestibulum lobortis turpis eget nibh lacinia, eu ultricies elit efficitur. Vivamus quis purus a lorem vehicula fermentum. Cras non ante nec quam rutrum egestas. Fusce euismod consectetur libero, eget egestas magna commodo sed. Integer auctor, ipsum sit amet dapibus pharetra, quam nisi eleifend tortor, at scelerisque turpis leo at leo. Nulla in ultricies nunc. Morbi luctus nunc et purus aliquet, id rutrum libero fringilla. Fusce vel risus vitae purus cursus vehicula eget nec libero. Morbi posuere turpis vel quam cursus, eu bibendum ex bibendum. Sed vel magna eu ligula convallis ultrices vel eget magna. Maecenas non orci tempo",
    isLiked:true,
    likes:100,
    createdAt: "2 days ago"
}


function stringShortener(str:string):string {
    return str?.substring(0,400);
  }


export function TweetCard(){
    const [collapse,setCollapse] = useState<boolean>(true);
    const [isLiked,setIsLiked] = useState<boolean>(props.isLiked)
    return(
        <div className="border border-slate-600 rounded-2xl my-4 flex gap-2 p-2">
            <img src={props.ownerAvatar} className="rounded-full w-12 h-12 ml-2"/>
            <div className="flex flex-col" >
               <div className="font-semibold text-xl my-2 flex gap-2">
                <div>{props.ownerFullname}</div>
                <div className=" text-slate-400 font-normal text-sm mt-1">{props.createdAt}</div>
                </div>
               <div>   {
          (props.content  as string)?.length <= 99 ? props.content  : (
            <>
            {collapse? stringShortener(props.content as string) : props.content }
            <Button variant="outline" className="bg-transparent border-none border-0 text-gray-400" onClick={()=>{
                 setCollapse(prev => !prev);          
            }}>{collapse?"...more":"show less"}</Button>
            </>
          )
        }</div><p onClick={()=>{
            setIsLiked(prev => !prev)
        }}
        className="flex"
        >{
             <div>{isLiked ? <PiThumbsUpFill scale="300" className="mb-2 text-xl"/> : <PiThumbsUpDuotone scale="300" className="mb-2 text-xl"/>}</div>
        }<span className="ml-2 font-normal text-sm text-slate-500 select-none">{formatCount(props.likes)}</span></p>
            </div>
        </div>
    )
}