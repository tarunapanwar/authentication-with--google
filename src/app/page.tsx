"use client"
import React from "react";
import "./globals.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState<{type: 'login' | undefined, params?: any, onDismiss?: (v: any) => void}>();

  const handleLogout = async(e: any) => {
    try{
      setLoading(true);
      const res = await axios.get('api/users/logout');
      if(res && res?.data && res?.data?.success) router.push('/login');
      else throw new Error(res?.data?.error ?? 'Failed to logout');
    }
    catch(err){
      throw new Error("Failed to logout");
    }
    finally{
      setLoading(false);
    }
  }
  
  return (
    <div className="h-screen">
      <div style={{height: '10%'}} className="flex item-center justify-end px-5">
        <button 
          className="my-4 bg-blue-500 text-white cursor-pointer w-50 py-1 px-5 rounded-full mt-4" 
          type="submit"
          onClick={handleLogout}
        >Sign out</button>
      </div>
      <div style={{height: '90%'}} className="flex items-center justify-center bg-gray-100 text-blue-700 font-bold text-6xl">
        Welcome to my new app 
      </div>
    </div>
  );
}