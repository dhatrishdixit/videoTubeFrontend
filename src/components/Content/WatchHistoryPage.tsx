import axios from "axios";
import { useEffect } from "react";


export const WatchHistoryPage = () => {
    useEffect(()=>{
        //{{localServer}}/users/watch-history
        axios.get(``)
    },[])
    return (
        <div>
            watch history 
        </div>
    )
}

// update authorization store || have separate api calls for watch history