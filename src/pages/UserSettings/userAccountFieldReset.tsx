import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { RootState } from "@/app/store";
import axios, { AxiosError } from "axios";
import { UpdateUserPayload,updateUserData } from "@/features/authentication/auth.slice";
import {AppDispatch } from "@/app/store";
const MAX_FILE_SIZE = 1024 * 1024 * 50;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

interface UserDataSchema {
  _id?: string;
  username?: string;
  email?: string;
  fullName?: string;
  avatar?: string;
  coverImage?: string;
  watchHistory?: string[];
  createdAt?: Date;
}

export function UserAccountFieldReset() {
  const urlToFile = async (url: string, fileName: string, mimeType: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
  };

  const filesToFileList = (files: File[]): FileList => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
  };
  
  const dispatch = useDispatch<AppDispatch>();
  const { toast } = useToast();
  const { userData } = useSelector((root: RootState) => root.authorization);
  const [disableSubBtn,setDisableSubBtn] = useState<boolean>(true);
  const [avatarChanged, setAvatarChanged] = useState(false);
const [coverImageChanged, setCoverImageChanged] = useState(false);
  //console.log(userData);
  const schema = z.object({
    email: z.string().email().optional(),
    fullName: z.string().optional(),
    avatar: z
      .instanceof(FileList)
      .refine(
        (fileList) => !fileList?.length || fileList[0].size <= MAX_FILE_SIZE,
        "max image size is 50MB"
      )
      .refine(
        (fileList) => !fileList?.length || ACCEPTED_IMAGE_TYPES.includes(fileList[0].type),
        "only .jpg, .jpeg, .png and .webp formats are supported"
      )
      .optional(),
    coverImage: z
      .instanceof(FileList)
      .refine(
        (fileList) => !fileList?.length || fileList[0].size <= MAX_FILE_SIZE,
        "max image size is 50MB"
      )
      .refine(
        (fileList) => !fileList?.length || ACCEPTED_IMAGE_TYPES.includes(fileList[0].type),
        "only.jpg,.jpeg,.png and.webp formats are supported"
      )
      .optional(),
  });

  type formFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState,
    reset,
  } = useForm<formFields>({
    resolver: zodResolver(schema),
  });

  const [initialAvatar, setInitialAvatar] = useState<string | undefined>(undefined);
  const [initialCoverImage, setInitialCoverImage] = useState<string | undefined>(undefined);

  useEffect(()=>{
     setInitialAvatar(userData.avatar);
  },[userData.avatar]);

  useEffect(()=>{
      setInitialCoverImage(userData.coverImage);
      console.log(initialCoverImage);
  },[userData.coverImage])

  async function resetUserData(userData: UserDataSchema) {
    const avatar = userData?.avatar ? await urlToFile(userData.avatar, "avatar.jpg", "image/jpeg") : undefined;
    const coverImage = userData?.coverImage ? await urlToFile(userData.coverImage, "coverImage.jpg", "image/jpeg") : undefined;

    setInitialAvatar(userData.avatar);
    setInitialCoverImage(userData.coverImage);

    return {
      email: userData?.email,
      fullName: userData?.fullName,
      avatar: avatar ? filesToFileList([avatar]) : undefined,
      coverImage: coverImage ? filesToFileList([coverImage]) : undefined,
    };
  }


  const { dirtyFields,isDirty,errors, isSubmitting } = formState;
  const userAccountFieldResetSubmitHandler: SubmitHandler<formFields> = async (data) => {
    console.log("data",data);
    try {
      const changes:UpdateUserPayload = {} ;
      if(avatarChanged && data?.avatar?.[0]){
         const formData = new FormData();
         formData.append("avatar",data.avatar[0]);
         const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/update-avatar`,formData,{
          withCredentials:true
         });
         changes.avatar = response.data.data.user.avatar;
      }

      if(coverImageChanged && data?.coverImage?.[0]){
         const formData = new FormData();
         formData.append("coverImage",data.coverImage[0]);
         const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/update-coverImage`,formData,{
          withCredentials:true
         });
         changes.coverImage = response.data.data.user.coveImage
       
      }
      let emailChanged = false ;

      if(dirtyFields.email || dirtyFields.fullName){
         const formData:any = {};
         if(dirtyFields.fullName && data?.fullName){
            formData.fullName = data.fullName;
            changes.fullName = data.fullName;
            // console.log("inside if formData :" ,formData);
         }
         if(dirtyFields.email && data?.email){
            formData.email = data.email;
            emailChanged = true;
            changes.email = data.email;
         }
         console.log("formData : ",formData)
         await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/update-user`,formData,{
          withCredentials:true
         });
         if(emailChanged){
          await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/send-email-for-verification`,{
            email:data.email
          },{
            withCredentials:true
          });
         }
      }
      
      toast({
        variant:"success",
        type:"foreground",
        description: emailChanged == true ? "Fields updated & a mail sent to verify email":"Fields updated successfully",
      })
      console.log("changes ",changes);
      dispatch(updateUserData(changes));

    } catch (error) {
      if(error instanceof AxiosError){
        toast({
          variant:"destructive",
          type:"foreground",
          description:error?.response?.data?.message
        })
        setError(
          "root",{
            message:error?.response?.data?.message
          }
        )
      }
     
    }
  };
  useEffect(() => {
    resetUserData(userData).then((data) => {
      reset(data);
    });
 
  }, [userData]);
  
  useEffect(()=>{
    if(!isDirty  && !avatarChanged && !coverImageChanged) {
      setDisableSubBtn(true);
  }else{
    setDisableSubBtn(false);
  }
  },[isDirty,avatarChanged,coverImageChanged])
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form onSubmit={handleSubmit(userAccountFieldResetSubmitHandler)} id="userAccountFieldReset">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="fullName"
                placeholder="FullName"
                type="text"
                autoComplete="off"
                {...register("fullName")}
              />
              {errors.fullName && <p className="text-red-600">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="email"
                type="text"
                autoComplete="off"
                {...register("email")}
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="avatar">Avatar</Label>
              {initialAvatar && (
                <div className="mb-2">
                  <img src={initialAvatar} alt="Avatar Preview" className="h-20 w-20 object-cover" />
                </div>
              )}
              <Input
                id="avatar"
                placeholder="avatar"
                type="file"
                autoComplete="off"
                {...register("avatar",{
                  onChange:() => {
                    setAvatarChanged(true);
                  }
                })}
              />
              {errors.avatar && <p className="text-red-600">{errors.avatar.message}</p>}
            </div>
            <div className="space-y-1">
              <Label htmlFor="coverImage">Cover Image</Label>
              {initialCoverImage && (
                <div className="mb-2">
                  <img src={initialCoverImage} alt="Cover Image Preview" className="h-20 w-20 object-cover" />
                </div>
              )}
              <Input
                id="coverImage"
                placeholder="coverImage"
                type="file"
                autoComplete="off"
                {...register("coverImage",{
                  onChange:()=>{
                    setCoverImageChanged(true);
                  }
                })}
              />
              {errors.coverImage && <p className="text-red-600">{errors.coverImage.message}</p>}
            </div>
            {errors.root && (
              <p className="text-red-600 text-center mt-4">
                {JSON.stringify(errors.root.message)}
              </p>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button size="lg" className="mt-6 mb-4" disabled={isSubmitting||disableSubBtn} type="submit" form="userAccountFieldReset">
            {isSubmitting ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Change Settings"
              //TODO: think of adding resend option here as well
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
