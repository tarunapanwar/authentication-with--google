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
      {/* <div className="relative h-35 w-full bg-cover bg-center" style={{ backgroundImage:`url('/pexels-thelazyartist-4164088.jpg')` }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div>
            <p className="text-white text-9xl font-bold">Centered Text</p>
            <button className="bg-white w-7 h-7.5">View Products</button>
          </div>
        </div>
      </div> */}
    </div>
  );
}