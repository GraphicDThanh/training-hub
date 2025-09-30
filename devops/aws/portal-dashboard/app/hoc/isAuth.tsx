'use client';

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { userPool } from "@/app/services/cognito";

export default function isAuth(Component: any) {
  return function Auth(props: any) {
    const authUser = userPool.getCurrentUser();
    useEffect(() => {
      if (!authUser) {
        return redirect('/login');
      }
    }, [])
    
    if (!authUser) {
      return null;
    }
    return (<Component {...props} />);
  };
}