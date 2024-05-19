"use client"
import React from "react";
import "./globals.css";

export default function Home() {
  const [showDialog, setShowDialog] = React.useState<{type: 'login' | undefined, params?: any, onDismiss?: (v: any) => void}>();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {/* <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setShowDialog({ type: 'login'})}>
          Login
        </button> */}
        <Login />
      </div>
      {showDialog?.type === 'login' && <Login />}
    </main>
  );
}

const Login = () => {
  return(
    <div className="mainLoginContainer">
      <div className='loginContainer'>
          <div className="loginContainerHeadng">LOGIN</div>
          <form className='formContainer'>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <div className="w-full flex justify-between pl-4 pr-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-600 h-3 w-3" />
                <span className=" text-xs ml-2 text-gray-700">Remember me</span>
              </label>
              <div className="flex items-center">
                <div className="text-xs text-blue-700">Forgot password</div>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
          <div className="flex flex-col items-center justify-between pt-2">
            <div className="text-blue-700 text-sm">sign up</div>
            <div className="flex justify-center items center pt-2">
              <div className="loginIcons">G</div>
              <div className="loginIcons">L</div>
              <div className="loginIcons">T</div>
            </div>
          </div>
      </div>
      <div className="sideContainer">Join with us</div>
    </div>
  )
}
