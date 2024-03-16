import React from 'react';
//TODO: add getCurrent User here update that when you complete this 

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