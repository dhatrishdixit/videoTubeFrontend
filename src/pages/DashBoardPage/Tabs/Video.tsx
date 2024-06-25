import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import axios, { AxiosError } from "axios";
import { TrashIcon } from "../icons/TrashIcon"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { formatDate } from "@/utils/DateFormat"
import { FiRefreshCw } from "react-icons/fi"
import { Skeleton } from "@/components/ui/skeleton"

//TODO: finish this with disable and all that 

export interface videoDataSchema {
    _id: string;
    videoFile: string;
    thumbnail: string;
    owner: string;
    title: string;
    description: string;
    duration: number;
    views: number;
    isPublic: boolean;
    createdAt: string;
    channel: string;
    channelAvatar: string;
    channelFullName: string;
    likesCount: number;
}

interface VideoRowSchema{
    video : videoDataSchema,
    setReload : React.Dispatch<React.SetStateAction<number>>
}

const VideoRow = ({ video,setReload }:VideoRowSchema) => {

    const { toast } = useToast();
    const [publicAccess, setPublicAccess] = useState<boolean>(video.isPublic);
    
    const toggleHandler = async (videoId: string) => {
        axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/videos/toggle/publish/${videoId}`, null, {
            withCredentials: true
        })
        .then(res => {
            toast({
                variant: "success",
                type: "foreground",
                description: "Video public access changed"
            });
        })
        .catch(err => {
            if (err instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    type: "foreground",
                    description: err?.response?.data?.message
                });
            }
        });
    }

    const deleteHandler = (videoId: string) => {
        axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/videos/${videoId}`, {
            withCredentials: true
        })
        .then(res => {
            toast({
                variant: "success",
                type: "foreground",
                description: "Video deleted successfully"
            });
            setReload(prev => prev+1);
        })
        .catch(err => {
            if (err instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    type: "foreground",
                    description: err?.response?.data?.message
                });
            }
        });
    }

    return (
        <TableRow key={video._id}>
            <TableCell className="font-medium">{video.title}</TableCell>
            <TableCell>{video.likesCount}</TableCell>
            <TableCell>{video.views}</TableCell>
            <TableCell>{formatDate(video.createdAt)}</TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Switch
                        id={`video-${video._id}-toggle`}
                        aria-label="Toggle video visibility"
                        checked={publicAccess}
                        onCheckedChange={() => {
                            setPublicAccess(prev => !prev);
                            toggleHandler(video._id);
                        }}
                    />
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Label htmlFor={`video-${video._id}-previously`} className="text-sm font-medium">
                        <Badge variant={publicAccess ? "public" : "private"} className="text-white w-[58px] text-center">
                            {publicAccess ? "public" : "private"}
                        </Badge>
                    </Label>
                </div>
            </TableCell>
            <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => deleteHandler(video._id)}>
                    <TrashIcon className="w-5 h-5 text-muted-foreground" />
                </Button>
            </TableCell>
        </TableRow>
    );
}

export function VideoDashboard() {
    const { toast } = useToast();
    const [videoData, setVideoData] = useState<videoDataSchema[]>([]);
    const [reload, setReload] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/dashboard/videos`, {
            withCredentials: true
        })
        .then(res => {
            setVideoData(res.data.data as videoDataSchema[]);
        })
        .catch(err => {
            if (err instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    type: "foreground",
                    description: err?.response?.data?.message
                });
            }
        })
        .finally(() => {
            setLoading(false);
        });
    }, [reload]);

   
    const handleReload = () => {
        //console.log("handle reload called");
        setReload(prev => prev + 1);
    }

    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-4xl font-bold">Video Management</CardTitle>
                        <Button variant="ghost" size="icon" onClick={handleReload}>
                            <FiRefreshCw className="w-6 h-6 text-muted-foreground" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Total Likes</TableHead>
                                <TableHead>Total Views</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Toggle</TableHead>
                                <TableHead>Visibility</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        {
                            loading == true ? 
                           (
                             <TableBody>
                                {
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <TableRow key={index}>
                                          <TableCell className="w-[200px]">
                                            <Skeleton className="h-4 w-full" />
                                          </TableCell>
                                          <TableCell className="w-[100px]">
                                            <Skeleton className="h-4 w-full" />
                                          </TableCell>
                                          <TableCell className="w-[100px]">
                                            <Skeleton className="h-4 w-full" />
                                          </TableCell>
                                          <TableCell className="w-[150px]">
                                            <Skeleton className="h-4 w-full" />
                                          </TableCell>
                                          <TableCell className="w-[100px]">
                                            <Skeleton className="h-4 w-full" />
                                          </TableCell>
                                          <TableCell className="w-[100px]">
                                            <Skeleton className="h-4 w-full" />
                                          </TableCell>
                                          <TableCell className="w-[100px]">
                                            <Skeleton className="h-4 w-full" />
                                          </TableCell>
                                        </TableRow>
                                      ))
                                }
                             </TableBody>
                           )
                                :
                                <TableBody>
                                {videoData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7}>No videos available</TableCell>
                                    </TableRow>
                                ) : (
                                    videoData.map(video => (
                                        <VideoRow
                                            key={video._id}
                                            video={video}
                                            setReload={setReload}
                                        />
                                    ))
                                )}
                            </TableBody>
                            
                        }
                      
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
