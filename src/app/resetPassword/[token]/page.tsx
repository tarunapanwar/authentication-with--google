"use client"
import { IApiResponse } from "@/Interfaces/auth";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const ResetPassword = () =>{
    const router = useRouter();
    const [data, setData] = React.useState<{newPassword: string, confirmPassword: string, token: string}>({
        newPassword: '', 
        confirmPassword: '',
        token: ''
    });
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault(); 
        try{
            setLoading(true); 
            const token = window.location.href.split('/').pop();
            const res = await axios.post<IApiResponse>('/api/auth/resetPassword', {...data, token: token});
            if(res && res.data && res.data.success) router.push('/login');
            else throw new Error('Failed to reset password');
        }
        catch(err){
            throw new Error("Failed to reset password");
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
                        <h1 className="card-title">Reset Password</h1>
                        <form className='flex flex-col items-center'>
                            <input 
                                className="my-4 px-2 pb-1 border-b border-gray-300 w-full" 
                                type="text" 
                                name="newPassword" 
                                placeholder="New Password"
                                value={data?.newPassword}
                                onChange={(e) => setData({...data, newPassword: e.target.value})}
                                required 
                            />
                            <input 
                                className="my-4 px-2 pb-1 border-b border-gray-300 w-full" 
                                type="text" 
                                name="confirmPassword" 
                                placeholder="Confirm Password"
                                value={data?.confirmPassword}
                                onChange={(e) => setData({...data, confirmPassword: e.target.value})}
                                required 
                            />
                            <button onClick={handleSubmit} className="my-4 bg-blue-500 text-white cursor-pointer w-72 py-1 px-5 rounded-full mt-4" type="submit">Reset Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ResetPassword;