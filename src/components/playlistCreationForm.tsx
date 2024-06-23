import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'


interface PlaylistCreationFormProps {
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setReloadPlaylist: React.Dispatch<React.SetStateAction<number>>
}
const FormSchema = z.object({
  playlist_name: z.string(),
  is_public: z.boolean().default(true),
  playlist_description: z.string()  
})

export function PlaylistCreationForm({setFormOpen,setReloadPlaylist}:PlaylistCreationFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues:{
        playlist_name:"",
        is_public: true,
        playlist_description:"description"
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    //{{localServer}}/playlist
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    setFormOpen(false);
    setReloadPlaylist(Math.random());
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 " id="create-playlist">
        <div>
          <h3 className="mb-4 text-lg font-medium">Playlist Creation</h3>
          <div className="space-y-4">
          <FormField
          control={form.control}
          name="playlist_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormDescription>
                This is your playlist name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="playlist_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea  placeholder="description" {...field} />
              </FormControl>
              <FormDescription>
                This is your playlist description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
              control={form.control}
              name="is_public"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Access to the playlist
                    </FormLabel>
                    <FormDescription>
                      <p className="text-sm text-gray-500">
                        Public playlists are visible to everyone.
                      </p>
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
        
          </div>
        </div>
        <div className='flex justify-between'>
        <Button type="submit" form="create-playlist">Create Playlist</Button>
        <Button onClick={()=>{
            setFormOpen(false)            
        }}
         className="tabular-nums"
         variant = "outline"
        >Cancel</Button>
        </div>
      </form>
    </Form>
  )
}



