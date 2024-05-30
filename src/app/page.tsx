"use client"
import React from "react";
import "./globals.css";

export default function Home() {
  const [showDialog, setShowDialog] = React.useState<{type: 'login' | undefined, params?: any, onDismiss?: (v: any) => void}>();
  
  return (
    <div className="h-screen">
      <div style={{height: '8%'}} className="flex item-center justify-end px-5">
        <button 
          className="my-4 bg-blue-500 text-white cursor-pointer w-50 py-1 px-5 rounded-full mt-4" 
          type="submit"
          onClick={() => {}}
        >Sign out</button>
      </div>
      <div style={{height: '92%'}} className="flex items-center justify-center bg-gray-100 text-blue-700 font-bold text-6xl">
        Welcome to my new app 
      </div>
    </div>
  );
}