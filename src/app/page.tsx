"use client"
import React, { useContext } from "react";
import "./globals.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Header } from "./Components";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  // const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

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
      <Header />
    </div>
  );
}