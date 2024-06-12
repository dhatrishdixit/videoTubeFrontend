import { useEffect,useState } from "react";
import axios from "axios";
import { PlaylistCard } from "@/components/Card/playlistCard";
import { TailSpin } from 'react-loader-spinner';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { PlaylistCardProps } from '@/components/Card/playlistCard';

export function UserPlaylistPage() {
  const [playlists, setPlaylists] = useState<PlaylistCardProps[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/v1/playlist/owner/playlists`,{
      withCredentials:true,
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(res=>{
      setPlaylists(res.data.data);
      setLoading(false);
    })
    .catch(err => console.log(err))
  },[])
  

  return loading ? <div className=' flex justify-center items-end'>
<TailSpin
visible={true}
height="80"
width="80"
color="#272727"
ariaLabel="tail-spin-loading"
radius="1"
wrapperStyle={{}}
wrapperClass=""
/> 
</div> : (
    playlists.length == 0 ? (
        <div className='text-center font-semibold h-[40vh]'>
        You haven't created any playlists
      </div>
    ) : (
        <div>
    <div className='grid md:grid-cols-4 grid-cols-2'>
       {
           playlists.map(playlistProps => (
            <PlaylistCard {...playlistProps as PlaylistCardProps}/>
           ))
       }
    </div>
    </div>
    )
  )
}

