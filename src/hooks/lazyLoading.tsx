import { useState, useEffect } from 'react'
import axios from 'axios'
import { VideoPropsMain } from '@/components/Card/videoCard'
export const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`
})

export const getPostsPage = async (pageParam = 0,limit = 9, options = {}) => {
    const response = await api.get(`/videos?limit=${limit}&page=${pageParam}`, options)
    // console.log(response.data.data);
    return response.data.data
}
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
  }

const usePosts = (pageNum = 0) => {
    const [results, setResults] = useState<VideoPropsMain[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState<ErrorSchema>({})
    const [hasNextPage, setHasNextPage] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError({})

        const controller = new AbortController()
        const { signal } = controller

        getPostsPage(pageNum,9, { withCredentials:true ,signal})
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

    }, [pageNum])

    return { isLoading, isError, error, results, hasNextPage }
}

export default usePosts