//import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"

export const PublishedBtn = () => {

    return (
        <Button variant="outline" className=" hover:bg-red-600"
           onClick={()=>{
             // publish a new video ke liye form 
           }}
        >
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.3em" width="1.3em" xmlns="http://www.w3.org/2000/svg"><path d="M2.667 3h6.666C10.253 3 11 3.746 11 4.667v6.666c0 .92-.746 1.667-1.667 1.667H2.667C1.747 13 1 12.254 1 11.333V4.667C1 3.747 1.746 3 2.667 3z"></path><path d="M7.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L7.404 7.304a.802.802 0 000 1.393z"></path></svg>
        </Button>
    )
}

