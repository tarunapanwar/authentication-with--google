"use client"
import React from "react";
import "./globals.css";

export default function Home() {
  const [showDialog, setShowDialog] = React.useState<{type: 'login' | undefined, params?: any, onDismiss?: (v: any) => void}>();
  
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        {/* <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setShowDialog({ type: 'login'})}>
          Login
        </button> */}
        <Login />
      </div>
      {showDialog?.type === 'login' && <Login />}</>
  );
}

const Login = () => {
  const [isSignin, setSignin] = React.useState(true);

  return(
    <div className="flex items-center justify-center">
      <div className='w-400 p-10 shadow-lg rounded-lg'>
        <div className="flex flex-col justify-center items-center pb-10">
          <div className="flex items-center rounded-full w-60 bg-gray-300">
            <div onClick={(e) => setSignin(true)} className={`cursor-pointer text-center p-2 w-1/2 ${isSignin ? 'bg-blue-700 text-white rounded-full' : ''}`}>Sign in</div>
            <div onClick={(e) => setSignin(false)} className={`cursor-pointer text-center p-2 w-1/2 ${!isSignin ? 'bg-blue-700 text-white rounded-full' : ''}`}>Sign up</div>
          </div>
        </div>
        {isSignin ? (
          <>
            <form className='flex flex-col items-center'>
              <input className="my-4 px-2 pb-1 border-b border-gray-300 w-full" type="text" name="name" placeholder="Name" required />
              <input className="my-4 px-2 pb-1 border-b border-gray-300 w-full" type="email" name="email" placeholder="Email" required />
              <div className="my-4 w-full flex justify-between pl-4 pr-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox text-blue-600 h-3 w-3" />
                  <span className=" text-xs ml-2 text-gray-700">Remember me</span>
                </label>
                <div className="flex items-center">
                  <div className="text-xs text-blue-700">Forgot password</div>
                </div>
              </div>
              <button className="my-4 bg-blue-500 text-white cursor-pointer w-24 py-1 px-5 rounded-full mt-4" type="submit">Sign in</button>
            </form>
            <div className="flex flex-col items-center justify-between pt-4">
              <div className="text-xs">New User?<b>Register</b></div>
              <hr className="border-t w-80 border-gray-300 my-5" />
              <div className="flex justify-center items center">
                <div className="text-center p-2 border border-gray-300 text-blue-500 m-2 mt-0 rounded-full w-10 h-10 transition duration-300 ease-in-out transform hover:bg-gray-100 hover:border-gray-400 hover:text-blue-600">G</div>
                <div className="text-center p-2 border border-gray-300 text-blue-500 m-2 mt-0 rounded-full w-10 h-10 transition duration-300 ease-in-out transform hover:bg-gray-100 hover:border-gray-400 hover:text-blue-600">L</div>
                <div className="text-center p-2 border border-gray-300 text-blue-500 m-2 mt-0 rounded-full w-10 h-10 transition duration-300 ease-in-out transform hover:bg-gray-100 hover:border-gray-400 hover:text-blue-600">T</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <form className='flex flex-col items-center'>
              <input className="my-4 px-2 pb-1 border-b border-gray-300 w-full" type="text" name="fullName" placeholder="Full Name" required />
              <input className="my-4 px-2 pb-1 border-b border-gray-300 w-full" type="email" name="email" placeholder="Email" required />
              <input className="my-4 px-2 pb-1 border-b border-gray-300 w-full" type="text" name="username" placeholder="Username" required />
              <input className="my-4 px-2 pb-1 border-b border-gray-300 w-full" type="password" name="password" placeholder="Password" required />
              <input className="my-4 px-2 pb-1 border-b border-gray-300 w-full" type="password" name="password" placeholder="Password" required />
              <div className="my-4 w-full pl-4 pr-4">
                <label className="inline-flex items-center">
                  <input type="checkbox" className="form-checkbox text-blue-600 h-3 w-3" />
                  <span className=" text-xs ml-2 text-gray-700">I agree to the <b>terms and conditions</b></span>
                </label>
              </div>
              <button className="my-4 bg-blue-500 text-white cursor-pointer w-50 py-1 px-5 rounded-full mt-4" type="submit">Sign up</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
