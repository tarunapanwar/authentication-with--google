"use client"
import React from "react";
import "../globals.css";
import { TextField } from "../Components";
import { FaUser } from "react-icons/fa";
import { IOrganization } from "@/Interfaces/organization";
import axios from "axios";
import { IApiResponse } from "@/Interfaces/auth";
import { RxCross2 } from "react-icons/rx";

const AddOrganization = () => {
  const imgRef = React.useRef<any>();
  const [currentStep, setCurrentStep] = React.useState({step: 1, isBackDisabled: true});
  const [token, setToken] = React.useState('');
  const [initialValues, setInitialValues] = React.useState<IOrganization>({
    teamName: '',
    logo: '',
    projectName: '',
    allTeamMembers: '',
    email: '',
    code: '',
    isAdmin: [{id: '', name: ''}]
  });
  const [loading, setLoading] = React.useState(false);

  const steps = [
    { id: 1, label: '1' },
    { id: 2, label: '2' },
    { id: 3, label: '3' },
    { id: 4, label: '4' },
    { id: 5, label: '5' },
    { id: 6, label: '6' }
  ];

  const getProgressBarWidth = () => {
    switch (currentStep?.step) {
      case 1:
        return 'w-0';
      case 2:
        return 'w-1/5';
      case 3:
        return 'w-2/5';
      case 4:
        return 'w-3/5';
      case 5:
        return 'w-4/5';
      case 6:
        return 'w-full';
      default:
        return 'w-0';
    }
  };

  const handleSubmit = async(values: IOrganization) => {
    if(values){
      setLoading(true);
      const response = await axios.post<IApiResponse>('api/organizations', values);
      if(response && response.data && response.data?.success) alert(`Workspace with name ${response?.data?.result?.name} created successfully`);
      else alert(`Failed to create workspace`);
      setLoading(false);
    }
  }

  const sendVerificationCode = async(email: string) => {
    if(email){
      setLoading(true);
      const response = await axios.post<IApiResponse>('api/auth/verificationCode', { email });
      if(response && response?.data && response?.data?.success && response?.data?.result){
        setCurrentStep((prev) => (prev?.step < steps.length ? { step: prev?.step + 1, isBackDisabled: false } : prev));
        setToken(response?.data?.result);
      }
      setLoading(false);
    }
  }

  const verifyCode = async(token: string, code: string) => {
    if(token && code){
      setLoading(true);
      const response = await axios.get<IApiResponse>('api/auth/verificationCode', {params: {token: token, code: code}});
      if(response && response?.data && response?.data?.success) setCurrentStep((prev) => (prev?.step < steps.length ? { step: prev?.step + 1, isBackDisabled: true } : prev));
      else alert('Invalid code');
      setLoading(false);
    } else alert('token and code are required');
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <div>
        <div className="relative w-35 h-1 bg-gray-300 rounded-full">
            <div
            className={`absolute h-full bg-darkestGreen rounded-full transition-width duration-500 ease-in-out ${getProgressBarWidth()}`}
            ></div>
        </div>
        <div className="absolute top-0 w-35 flex justify-between mt-5">
            {steps.map((step) => (
            <div
                key={step.id}
                className={`flex items-center justify-center w-10 h-10 border rounded-full transition-colors duration-500 ease-in-out 
                ${currentStep?.step >= step.id ? 'bg-darkestGreen text-white' : 'bg-gray-50 text-gray-500'}`}
            >
                {step.label}
            </div>
            ))}
        </div>
      </div>
      <div className="flex flex-col justify-between w-35 max-h-35 m-auto p-10 mt-20 shadow-xl rounded-xl overflow-auto">
        {currentStep?.step === 1 ? 
          <div>
              <div className="font-bold text-2xl text-gray-800">Enter your email</div>
              <TextField name={'email'} value={initialValues?.email} onChange={(v) => setInitialValues({...initialValues, email: v})} />
          </div> 
          : currentStep?.step === 2 ? 
          <div>
              <div className="font-bold text-2xl text-gray-800">Enter code</div>
              <div className="text-sm text-gray-500 py-2">We've sent a 6 digit code to email address the code expires shortly, so please enter it soon.</div>
              <TextField name={'code'} value={initialValues?.code} onChange={(v) => setInitialValues({...initialValues, code: v})} />
          </div> 
          : currentStep?.step === 3 ? 
          <div>
              <div className="font-bold text-2xl text-gray-800">Enter your company or team name</div>
              <TextField name={'teamName'} value={initialValues?.teamName} onChange={(v) => setInitialValues({...initialValues, teamName: v})} />
          </div>
          : currentStep?.step === 4 ? 
          <div>
              <div className="font-bold text-2xl text-gray-800">Enter your name</div>
              <TextField name={'name'} value={initialValues?.isAdmin![0]?.name} onChange={(v) => setInitialValues({...initialValues, isAdmin: [{id: document.cookie.split('=')[1], name: v}]})} />
              <div className="w-1/4">
                  <div className="font-medium text-gray-500 text-sm pb-1">Profile photo</div>
                  <div className="w-full h-40 bg-darkestGreen border rounded-lg mb-2">
                      <FaUser className="h-50 w-full text-white" style={{height:'100%',padding:"10px 5px 0px 5px"}}/>
                  </div>
                  <div className="w-full text-sm font-bold text-gray-400 border-2 border p-1 rounded-lg text-center cursor-pointer" onClick={(e) => imgRef?.current?.click()}>Upload Photo</div>
                  <input ref={imgRef} type="file" className="hidden"/>
              </div>
          </div>
          : currentStep?.step === 5 ? 
          <div>
            <div className="font-bold text-2xl text-gray-800">Add your team members</div>
            <textarea className="border rounded-md w-full mt-2 resize-none p-2" name="allTeamMembers" rows={5} onChange={(e) => setInitialValues({ ...initialValues, allTeamMembers: e?.currentTarget?.value })} />
          </div>
          : <div>
              <div className="font-bold text-2xl text-gray-800">Add project name</div>
              <TextField name={'projectname'} value={initialValues?.projectName} onChange={(v) => setInitialValues({...initialValues, projectName: v})} />
          </div>
        }
       <div className="w-full mt-10 pt-2">
            <div className="float-right">
                {!currentStep?.isBackDisabled && currentStep?.step !== 1 && currentStep?.step !== 3 && <button className="border bg-gray-100 py-1 px-5 rounded mr-2" onClick={() => setCurrentStep((prev) => (prev?.step <= steps.length ? {step: prev?.step - 1, isBackDisabled: false} : prev))}>Back</button>}
                <button 
                  className="border bg-darkestGreen text-white py-1 px-5 rounded" 
                  onClick={() => {
                    if(currentStep?.step === 1) {
                      if(initialValues && initialValues?.email) sendVerificationCode(initialValues?.email);
                      else alert('Enter email');
                    }
                    else if(currentStep?.step === 2) {
                      if(initialValues && initialValues?.code && token) verifyCode(token, initialValues?.code);
                      else alert('enter code');
                    }
                    else if(currentStep?.step !== 6) setCurrentStep((prev) => (prev?.step < steps.length ? {step: prev?.step + 1, isBackDisabled: false} : prev));
                    else handleSubmit(initialValues!);
                  }}>
                    {currentStep?.step !== 6 ? `Next` : `Submit`}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AddOrganization;
