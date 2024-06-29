import { useEffect,useState } from "react";
import axios from "axios";
import { PlaylistCard } from "@/components/Card/playlistCard";
import { TailSpin } from 'react-loader-spinner';
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
  

  return loading ? <div className=' h-[90vh] flex justify-center items-center'>
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
    playlists?.length == 0 ? (
      <div className='flex justify-center items-center w-full h-[90vh]'>
      <p className='text-pretty font-bold text-3xl mb-2'>You haven't created any playlists yet
      </p>    
 </div>
    ) : (
        <div>
    <div className='grid md:grid-cols-4 grid-cols-2 overflow-y-scroll h-[90vh]  scrollbar-thin dark:scrollbar-track-[#19191d] scrollbar-thumb-red-600 scrollbar-track-white'>
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

