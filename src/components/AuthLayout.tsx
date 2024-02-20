import React from 'react';


interface AuthLayoutProps {
    authentication:boolean,
    children:React.ReactNode
}
export const AuthLayout : React.FC<AuthLayoutProps> = ({
    authentication,
    children
}) => {

    return (
        <div>
        {children}
        </div>
    )
}