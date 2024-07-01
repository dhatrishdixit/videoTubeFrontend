import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import axios from "axios";
import { logIn, UserState } from "@/features/authentication/auth.slice";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

interface AuthLayoutProps {
    authentication: boolean;
    children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    authentication,
    children
}) => {

    const dispatch = useDispatch<AppDispatch>();
    const authStatus = useSelector((state: RootState) => state.authorization.authStatus);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    
    const AuthHandler = async (): Promise<boolean> => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/get-current-user`, {
                withCredentials: true
            });
            
            dispatch(logIn(res.data.data as UserState));
        
            return true;
        } catch (error) {
            console.error("Auth error:", error);
            try {
                // toast({
                //     variant:"default",
                //     type: "foreground",
                //     description: "checking refreshToken for auto login"
                // })
                await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/refresh-token`,null, {
                    withCredentials: true
                });
                // If refresh succeeds, try to get user data again
                const retryRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/get-current-user`, {
                    withCredentials: true
                });
                dispatch(logIn(retryRes.data.data as UserState));
                //     toast({
                //     variant: "success",
                //     type: "foreground",
                //     description: "Logged in successfully."
                // })
                return true;
            } catch (refreshError) {
                console.error("Refresh token error:", refreshError);
                return false;
            }
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            if (!authStatus) {
                setLoading(true);
                const isAuthed = await AuthHandler();
                setLoading(false);
                
                if (authentication && !isAuthed) navigate('/login');
                else if (!authentication && isAuthed) navigate('/');
            } else {
                if (authentication && !authStatus) navigate('/login');
                else if (!authentication && authStatus) navigate('/');
            }
        };
        
        checkAuth();
    }, [authStatus, authentication, navigate]);

    if (loading) {
        return  <div className=' flex justify-center items-center h-screen w-screen'>
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
        </div>;
    }

    return <>{children}</>;
};