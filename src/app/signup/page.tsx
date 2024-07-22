"use client"
import React from "react";
import "../globals.css";
import { useRouter } from "next/navigation";
import { IApiResponse, IAuthantication } from "@/Interfaces/auth";
import axios from "axios";
import { TextField } from "../Components";
import { signIn } from "next-auth/react";

export default function Signup() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [initialValues, setInitialValues] = React.useState<IAuthantication>({
        fullname: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        confirmTermsAndConditions: false,
        isRememberUser: false,
        number: '',
        code: '',
        token: ''
    });

    const steps = [
        { id: 1, label: '1' },
        { id: 2, label: '2' },
        { id: 3, label: '3' },
    ];

    const sendVerificationCode = async(email: string) => {
        if(email){
            setLoading(true);
            const response = await axios.post<IApiResponse>('api/auth/verificationCode', { email });
            if(response && response?.data && response?.data?.success && response?.data?.result){
                setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev));
                setInitialValues({ ...initialValues, token: response?.data?.result});
            }
            setLoading(false);
        }
    }

    const verifyCode = async(token: string, code: string) => {
        if(token && code){
            setLoading(true);
            const response = await axios.get<IApiResponse>('api/auth/verificationCode', {params: {token: token, code: code}});
            if(response && response?.data && response?.data?.success) setCurrentStep((prev) => (prev < steps.length ? prev + 1 : prev));
            else alert('Invalid code');
            setLoading(false);
        } else alert('token and code are required');
    }

    const onSignup = async(e: any, values: IAuthantication) => {
        e.preventDefault()
        try{
            if(values){
                setLoading(true);
                const varifyPassword = values?.password === values?.confirmPassword;
                const checkTerms = values?.confirmTermsAndConditions;
                if(!varifyPassword) alert('Password and Confirm Password must be same');
                if(!checkTerms) alert('accept term & conditions');
                if(varifyPassword && checkTerms) {
                    const response = await axios.post<IApiResponse>('api/users/signup', values);
                    if(response && response?.data && response?.data?.success) router.push('/');
                    else alert('Failed signup');
                }
                else alert('Failed signup');
            } else alert('Failed signup');
        }
        catch(err) {
            throw alert(`${err}` ?? 'Failed signup');
        }
        finally{
            setLoading(false);
        }
      }

    return (
        <>
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <div className="w-25 flex flex-col items-center justify-center p-10 shadow-2xl rounded-xl">
                    <div className=" w-full  text-center py-2 text-xl font-bold text-darkestGreen text-capitalize capitalize">welcome to slack</div>
                    {currentStep === 1 && (
                        <div className="w-full">
                            <TextField placeholder={'Enter you email'} name={'email'} value={initialValues?.email} onChange={(v: any) => setInitialValues({...initialValues, email: v})} />
                        </div> 
                    )}  
                    {currentStep === 2 && (
                        <div className="w-full">
                            <TextField placeholder={'Enter OTP'} name={'otp'} value={initialValues?.code} onChange={(v: any) => setInitialValues({...initialValues, code: v})} />
                        </div> 
                    )}  
                    {currentStep === 3 && (
                        <div className="w-full">
                            <TextField placeholder={'Enter your username'} name={'username'} value={initialValues?.username} onChange={(v: any) => setInitialValues({...initialValues, username: v})} />
                            <TextField placeholder={'Enter your password'} name={'password'} value={initialValues?.password} onChange={(v: any) => setInitialValues({...initialValues, password: v})} />
                            <TextField placeholder={'Confirm password'} name={'confirmPassword'} value={initialValues?.confirmPassword} onChange={(v: any) => setInitialValues({...initialValues, confirmPassword: v})} />
                            <div className="my-4 w-full pl-4 pr-4">
                                <label className="inline-flex items-center">
                                    <input 
                                        type="checkbox" 
                                        className="form-checkbox text-blue-600 h-3 w-3" 
                                        checked={initialValues?.confirmTermsAndConditions ?? false}
                                        onChange={(e) => setInitialValues({ ...initialValues, confirmTermsAndConditions: e?.target?.checked })}
                                    />
                                    <span className=" text-xs ml-2 text-gray-700">I agree to the <b>terms and conditions</b></span>
                                </label>
                            </div>
                        </div> 
                    )}  
                    <div className="w-full mt-10 pt-2">
                        <div className="float-right">
                            {currentStep !== 1 && currentStep !== 3 && <button className="border bg-gray-100 py-1 px-5 rounded mr-2" onClick={() => setCurrentStep((prev) => (prev <= steps.length ? prev - 1 : prev))}>Back</button>}
                            <button 
                                className="border bg-darkestGreen text-white py-1 px-5 rounded" 
                                onClick={(e: any) => {
                                    if(currentStep === 1) {
                                        if(initialValues && initialValues?.email) sendVerificationCode(initialValues?.email);
                                        else alert('Enter email');
                                    }
                                    else if(currentStep === 2) {
                                        if(initialValues && initialValues?.code && initialValues?.token) verifyCode(initialValues?.token, initialValues?.code);
                                        else alert('enter code');
                                    } else onSignup(e, initialValues!);
                                }}
                            >{currentStep !== 3 ? `Continue` : `Submit`}</button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between pt-4">
                        <hr className="border-t w-80 border-gray-300 my-5" />
                        <div className="flex items-center justify-center w-full cursor-pointer">
                            <div onClick={(e) => signIn('google')} className="flex justify-center items-center border-2 border-gray-300 rounded px-3 py-1">
                            <img className="w-[20px]" src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google logo" />
                            <div className="pl-2">Google</div>
                            </div>
                            <div onClick={(e) => signIn('google')} className="flex justify-center items-center border-2 border-gray-300 rounded px-3 py-1 ml-5 cursor-pointer">
                            <img className="w-[20px]" src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft logo" />
                            <div className="pl-2">Microsoft</div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    );
}