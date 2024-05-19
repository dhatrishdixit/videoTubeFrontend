import { useState, useEffect } from 'react'
import axios from 'axios'
import { VideoPropsMain, VideoPropsSearch } from '@/components/Card/videoCard'
import { CommentCardSchema } from '@/pages/CommentPage/CommentPage'
interface ErrorSchema {
    message? : string ,
  }
  
  
interface VideoSchema {
     id:string,
     videoFile:string,
     thumbnail:string,
     owner:string,
     title:string,
     duration:number,
     views:number,
     createdAt:Date,
     channel:string,
     channelFullName:string,
     channelAvatar:string,
     channelId:string,
  }

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`
})

export const getPostsPage = async (pageParam = 0,limit = 9,params:string|null = null, options = {},URL="/videos",digDeep:string) => {
    let url = `${URL}?limit=${limit}&page=${pageParam}`;
    if(params) {
        url += `&${params}`
    }
    console.log("url: ",url);
    const response = await api.get(url, options)
    console.log("response :",response.data.data);
    if(digDeep) return response.data[digDeep] 
    return response.data.data
}

const usePosts = (pageNum = 0,limit=9,params:string|null = null,URL:string="/videos",reRender:number = 0,digDeep:string="") => {
    const [results, setResults] = useState<VideoPropsMain[]|VideoPropsSearch[]|CommentCardSchema[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState<ErrorSchema>({})
    const [hasNextPage, setHasNextPage] = useState(false)
    console.log("reRender inside lazy loading ",reRender)
    useEffect(() => {
        //setResults([]);
        setIsLoading(true)
        setIsError(false)
        setError({})

        const controller = new AbortController()
        const { signal } = controller

        getPostsPage(pageNum,limit, params,{ withCredentials:true ,signal},URL,digDeep)
            .then(data => {
                setResults(prev => [...prev, ...data])
                setHasNextPage(Boolean(data.length))
                setIsLoading(false)
            })
            .catch(e => {
                // console.log(e)
                setIsLoading(false)
                if (signal.aborted) return
                setIsError(true)
                setError({ message: e.response.data.message })
            })

        return () => controller.abort()

    }, [pageNum,reRender])

    return { isLoading, isError, error, results, hasNextPage }
}

export default usePosts