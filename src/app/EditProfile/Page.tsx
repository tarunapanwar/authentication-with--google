"use client"
import React from "react";
import { TextField } from "../Components";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import axios from "axios";

interface IEditProps {
    recordId: string
    onDismiss: (val?: any) => void;
}

interface IProfile {
    fullname: string,
    displayName: string,
    title: string
}

export const EditProfile = ({recordId, onDismiss}: IEditProps) => {
    const imgRef = React.useRef<any>();
    const [values, setValues] = React.useState<IProfile>();
    const [loading, setLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        if(recordId){
            const getUser = async() => {
                const response = await axios.get(`api/users/signup/${recordId}`);
                if(response && response?.data && response?.data?.success && response?.data?.result){
                    setValues(response?.data?.result);
                }
            }
            getUser();
        }
    }, [recordId])

    const updateUser = async(id: string, value: IProfile) => {
        if(id && value){
            setLoading(true);
            let response = await axios.put(`api/users/signup/${recordId}`, value);
            if(response && response?.data && response?.data?.success) onDismiss();
            else throw new Error('Failed update user');
            setLoading(false);
        }
    }

    return(
        <div className='w-35 h-25 z-10 flex flex-col justify-between absolute top-40 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-2'>
            <div>
                <div className="flex justify-between">
                    <h1 className='text-md p-1 font-bold text-gray-500'>Edit Profile</h1>
                    <div className="w-10 p-2 cursor-pointer"><IoClose className="h-5 w-5 text-gray-400" onClick={() => onDismiss()}/></div>
                </div>
                <hr className="w-full"/>
                <div className="flex p-1">
                    <div className="w-3/4">
                        <TextField title={'Full name'} name={'fullname'} value={values?.fullname} onChange={(e) => setValues({...values, fullname: e?.target?.value} as any) } />
                        <TextField title={'Display name'} name={'displayName'} value={values?.displayName} onChange={(e) => setValues({...values, displayName: e?.target?.value} as any) } />
                        <div className="text-xs text-gray-400 py-1 font-medium">This could be your first name or nickname - however you'd like people to refer to you in Slack</div>
                        <TextField title={'Title'} name={'title'} value={values?.title} onChange={(e) => { } } />
                        <div className="text-xs text-gray-400 py-1 font-medium">Let people know what you do at workSpace</div>
                    </div>
                    <div className="w-1/4 px-5">
                        <div className="float-right">
                            <div className="font-medium text-gray-500 text-sm pb-1">Profile photo</div>
                            <div className="w-full h-40 bg-darkestGreen border rounded-lg mb-2">
                                <FaUser className="h-50 w-full text-white" style={{height:'100%',padding:"10px 5px 0px 5px"}}/>
                            </div>
                            <div className="w-full text-sm font-bold text-gray-400 border-2 border p-1 rounded-lg text-center cursor-pointer" onClick={(e) => imgRef?.current?.click()}>Upload Photo</div>
                            <input ref={imgRef} type="file" className="hidden"/>
                            <button className="w-full text-sm font-normal py-2 text-blue-400">Remove Photo</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t w-full pt-2">
                <div className="float-right">
                    <button className="border bg-gray-100 py-1 px-5 rounded mr-2" disabled={loading} onClick={(e) => onDismiss()}>Cancel</button>
                    <button className="border bg-darkestGreen text-white py-1 px-5 rounded" disabled={loading} onClick={(e) => updateUser(recordId, values!)}>Save</button>
                </div>
            </div>
        </div>
    )
}