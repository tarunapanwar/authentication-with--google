"use client"
import React from "react";
import "../globals.css";
import { useRouter } from "next/navigation";
import { IApiResponse, IAuthantication } from "@/Interfaces/auth";
import { signIn } from 'next-auth/react'
import axios from "axios";

export default function Home() {
  const [showDialog, setShowDialog] = React.useState<{type: 'login' | undefined, params?: any, onDismiss?: (v: any) => void}>();
  
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <Login />
      </div>
      {showDialog?.type === 'login' && <Login />}</>
  );
}

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<IAuthantication>({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    confirmTermsAndConditions: false,
    isRememberUser: false
  });
  const [isSignin, setSignin] = React.useState(true);

  const onSignup = async(e: any) => {
    e.preventDefault()
    try{
        setLoading(true);
        const varifyPassword = user?.password === user?.confirmPassword;
        const checkTerms = user?.confirmTermsAndConditions;
        if(!varifyPassword) throw new Error('Password and Confirm Password must be same');
        if(!checkTerms) throw new Error('accept term & conditions');
        if(varifyPassword && checkTerms) {
            const response = await axios.post<IApiResponse>('api/users/signup', user);
            if(response && response?.data && response?.data?.success) setSignin(true);
            else throw new Error('Failed signup');
        }
        else throw new Error('Failed signup');
    }
    catch(err) {
        console.log(err ?? 'Failed signup');
    }
    finally{
        setLoading(false);
    }
  }

  const onSignin = async(e: any) => {
    e.preventDefault();
    try{
        setLoading(true);
        const response = await axios.post<IApiResponse>('/api/users/login', user);
        debugger;
        router.push('/');
    }
    catch(err) {
       console.log(err ?? 'Failed to signin'); 
    }
    finally{
        setLoading(false);
    }
  }

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
              <input 
                className="my-4 px-2 pb-1 border-b border-gray-300 w-full" 
                type="text" 
                name="email" 
                placeholder="Email" 
                value={user?.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                required 
              />
              <div className="flex w-full">
                <input 
                    className="my-4 px-2 pb-1 border-b border-gray-300 w-full" 
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    placeholder="Password" 
                    value={user?.password}
                    onChange={(e) => setUser({ ...user, password: e?.currentTarget?.value  })}
                    required 
                />
                <button className="bg-light-blue w-7 h-7.5 mt-4.25" type="button" onClick={(e) => setShowPassword(!showPassword)}>
                    {showPassword ? (
                        <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19.5c-4.633 0-8.655-2.973-10.125-7.5 1.164-2.893 3.15-5.229 5.625-6.68m4.875 13.68l4.379-4.379m0 0A10.05 10.05 0 0019.5 12c0-4.633-2.973-8.655-7.5-10.125M12 4.5v.01m0 15.99v.01M4.5 12H4.51M19.5 12h.01" />
                        </svg>
                        ) : (
                        <svg className="h-4 w-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    )}
                </button>
              </div>
              <div className="my-4 w-full flex justify-between pl-4 pr-4">
                <label className="inline-flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox text-blue-600 h-3 w-3"
                    checked={user?.isRememberUser}
                    onChange={(e) => setUser({ ...user, isRememberUser: e?.target?.checked  })}
                  />
                  <span className=" text-xs ml-2 text-gray-700">Remember me</span>
                </label>
                <div className="flex items-center">
                  <div onClick={() => router.push('/forgotPassword')} className="text-xs text-blue-700">Forgot password</div>
                </div>
              </div>
              <button onClick={onSignin} className="my-4 bg-blue-500 text-white cursor-pointer w-24 py-1 px-5 rounded-full mt-4" type="submit">Sign in</button>
            </form>
            <div className="flex flex-col items-center justify-between pt-4">
              <div className="text-xs">New User?<b> Register</b></div>
              <hr className="border-t w-80 border-gray-300 my-5" />
              <div className="flex justify-center items center">
                <div onClick={(e) => signIn('google')} className="text-center p-2 border border-gray-300 text-blue-500 m-2 mt-0 rounded-full w-10 h-10 transition duration-300 ease-in-out transform hover:bg-gray-100 hover:border-gray-400 hover:text-blue-600">G</div>
                <div onClick={(e) => {}} className="text-center p-2 border border-gray-300 text-blue-500 m-2 mt-0 rounded-full w-10 h-10 transition duration-300 ease-in-out transform hover:bg-gray-100 hover:border-gray-400 hover:text-blue-600">L</div>
                <div className="text-center p-2 border border-gray-300 text-blue-500 m-2 mt-0 rounded-full w-10 h-10 transition duration-300 ease-in-out transform hover:bg-gray-100 hover:border-gray-400 hover:text-blue-600">T</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <form className='flex flex-col items-center'>
              <input 
                className="my-4 px-2 pb-1 border-b border-gray-300 w-full" 
                type="text"
                name="fullname" 
                placeholder="Full Name"
                value={user?.fullname}
                onChange={(e) => setUser({ ...user, fullname: e?.currentTarget?.value })} 
                required 
              />
              <input 
                className="my-4 px-2 pb-1 border-b border-gray-300 w-full" 
                type="email" 
                name="email" 
                placeholder="Email"
                value={user?.email}
                onChange={(e) => setUser({ ...user, email: e?.currentTarget?.value })} 
                required 
              />
              <input 
                className="my-4 px-2 pb-1 border-b border-gray-300 w-full" 
                type="text" 
                name="username" 
                placeholder="Username" 
                value={user?.username}
                onChange={(e) => setUser({ ...user, username: e?.currentTarget?.value })}
                required 
              />
              <input 
                className="my-4 px-2 pb-1 border-b border-gray-300 w-full" 
                type={showPassword ? "text" : "password"} 
                name="password" 
                placeholder="Password" 
                value={user?.password}
                onChange={(e) => setUser({ ...user, password: e?.currentTarget?.value })}
                required 
              />
              <input 
                className="my-4 px-2 pb-1 border-b border-gray-300 w-full" 
                type="text" 
                name="confirmPassword" 
                placeholder="Confirm Password" 
                value={user?.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e?.currentTarget?.value })}
                required 
              />
              <div className="my-4 w-full pl-4 pr-4">
                <label className="inline-flex items-center">
                  <input 
                    type="checkbox" 
                    className="form-checkbox text-blue-600 h-3 w-3" 
                    checked={user?.confirmTermsAndConditions ?? false}
                    onChange={(e) => setUser({ ...user, confirmTermsAndConditions: e?.target?.checked })}
                  />
                  <span className=" text-xs ml-2 text-gray-700">I agree to the <b>terms and conditions</b></span>
                </label>
              </div>
              <button 
                className="my-4 bg-blue-500 text-white cursor-pointer w-50 py-1 px-5 rounded-full mt-4" 
                type="submit"
                onClick={onSignup}
              >Sign up</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
