"use client";
import { SessionProvider } from "next-auth/react";

const AuthContext = ({children}) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default AuthContext;