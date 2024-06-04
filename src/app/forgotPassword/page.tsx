"use client"
import { IApiResponse } from "@/Interfaces/auth";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const ResetPassword = () =>{
    const router = useRouter();
    const [data, setData] = React.useState<{email: string}>({email: ''});
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try{
            setLoading(true);
            const response = await axios.post<IApiResponse>('api/auth/forgotPassword', data);
            if(response && response.data && response.data.success) router.push('/login');
            else throw new Error("Failed to send reset password request");
        }
        catch(err){
            throw new Error("Failed to send reset password request");
        }
        finally{
            setLoading(false);
        }
    }

    return(
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="flex items-center justify-center">
                    <div className='w-400 p-10 shadow-lg rounded-lg'>
                        <h1 className="card-title">Forgot Password</h1>
                        <form className='flex flex-col items-center'>
                            <input 
                                className="my-4 px-2 pb-1 border-b border-gray-300 w-full" 
                                type="text" 
                                name="email" 
                                placeholder="Email"
                                value={data?.email}
                                onChange={(e) => setData({...data, email: e.target.value})}
                                required 
                            />
                            <button onClick={handleSubmit} className="my-4 bg-blue-500 text-white cursor-pointer w-72 py-1 px-5 rounded-full mt-4" type="submit">Submit</button>
                            <div className="text-xs pt-5">
                                Remembered your password?{' '}
                                <Link href="/login">
                                    <button className="link">Sign in</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ResetPassword;