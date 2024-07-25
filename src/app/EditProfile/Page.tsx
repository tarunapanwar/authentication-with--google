"use client"
import React from "react";
import { ConfirmationModel, TextField } from "../Components";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import axios from "axios";

interface IEditProps {
    recordId: string
    onDismiss: (val?: any) => void;
}

interface IProfile {
    fullname?: string,
    displayName?: string,
    title?: string,
    number?: string,
    about?: string,
    file?: any,
    profilePicture?: string,
    isPicUploaded?: boolean
}

export const EditProfile = ({ recordId, onDismiss }: IEditProps) => {
    const imgRef = React.useRef<any>();
    const [values, setValues] = React.useState<IProfile>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [showModel, setShowModel] = React.useState<{type: 'confirm' | undefined, params: any, onDismiss?: (val?: any) => void}>({type: undefined, params: {}});

    React.useEffect(() => {
        if (recordId) {
            const getUser = async () => {
                const response = await axios.get(`api/users/signup/${recordId}`);
                if (response && response?.data && response?.data?.success && response?.data?.result) {
                    setValues({...response?.data?.result, profilePicture: response?.data?.result?.profilePicture ? `data:image/jpeg;base64,${response?.data?.result?.profilePicture}` : undefined, isPicUploaded: response?.data?.result?.profilePicture ? true : false});
                }
            }
            getUser();
        }
    }, [recordId])

    const updateUser = async (id: string, value: IProfile) => {
        if (id && value) {
            setLoading(true);
            const formData = new FormData();
            if (value?.file) formData.append('file', value.file);
            for(let key in values){
                formData.append(key, (values as any)[key]);
            }
            let response = await axios.put(`api/users/signup/${recordId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            if (response && response?.data && response?.data?.success) onDismiss();
            else alert('Failed update user');
            setLoading(false);
        }
    }

    return (
        <>
            <div className='shadow-2xl w-35 z-1 flex flex-col justify-between absolute top-40 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-2'>
                <div>
                    <div className="flex justify-between">
                        <h1 className='text-md p-1 font-bold text-gray-500'>Edit Profile</h1>
                        <div className="w-10 p-2 cursor-pointer"><IoClose className="h-5 w-5 text-gray-400" onClick={() => onDismiss()} /></div>
                    </div>
                    <hr className="w-full" />
                    <div className="flex p-1">
                        <div className="w-3/4">
                            <TextField title={'Full name'} name={'fullname'} value={values?.fullname} onChange={(v) => setValues({ ...values, fullname: v })} />
                            <TextField title={'Display name'} name={'displayName'} value={values?.displayName} onChange={(v) => setValues({ ...values, displayName: v })} />
                            <div className="text-xs text-gray-400 py-1 font-medium">This could be your first name or nickname - however you'd like people to refer to you in Slack</div>
                            <TextField title={'Title'} name={'title'} value={values?.title} onChange={(v) => setValues({ ...values, title: v })} />
                            <div className="text-xs text-gray-400 py-1 font-medium">Let people know what you do at workSpace</div>
                            <TextField title={'Phone number'} name={'number'} value={values?.number} onChange={(v) => setValues({ ...values, number: v })} />
                            <TextField title={'About'} name={'about'} value={values?.about} onChange={(v) => setValues({ ...values, about: v })} />
                        </div>
                        <div className="w-1/4 px-5">
                            <div className="float-right">
                                <div className="font-medium text-gray-500 text-sm pb-1">Profile photo</div>
                                <div className="w-full h-40 bg-darkestGreen border rounded-lg mb-2 overflow-hidden">
                                    {values?.profilePicture 
                                        ? <img src={values?.profilePicture} className="w-full h-40"/> 
                                        : <FaUser className="h-50 w-full text-white" style={{ height: '100%', padding: "10px 5px 0px 5px" }} />
                                    }
                                </div>
                                <div className="w-full text-sm font-bold text-gray-400 border-2 border p-1 rounded-lg text-center cursor-pointer" onClick={(e) => imgRef?.current?.click()}>Upload Photo</div>
                                <input 
                                    ref={imgRef} 
                                    type="file" 
                                    className="hidden" 
                                    onChange={(e: any) => {
                                        if(e?.target?.files && e?.target?.files?.length > 0){
                                            const reader = new FileReader();
                                            reader.readAsDataURL(e?.target?.files[0]);
                                            reader.onloadend = () => {
                                                setValues({ ...values, file: e?.target?.files?.[0], profilePicture: reader?.result as string });
                                            }
                                            reader.onerror = (error) => {
                                                console.error('Error reading file:', error);
                                            };
                                        }
                                    }} 
                                />
                                {values?.profilePicture && 
                                <button 
                                    className="w-full text-sm font-normal py-2 text-blue-400" 
                                    onClick={(e) => setShowModel({ 
                                        type: 'confirm', 
                                        params: {message: 'Are you sure, you want to delete your photo'}, 
                                        onDismiss: async (val: any) => {
                                            if(val){
                                                if(values?.isPicUploaded){
                                                    const response = await axios.delete(`api/users/signup/${recordId}`);
                                                    if(response && response?.data && response?.data?.success) {
                                                        setValues({...values, profilePicture: undefined});
                                                        alert('Profile removed successfully');
                                                    }
                                                    else alert('Failed to remove profile')
                                                } 
                                                else {
                                                    setValues({...values, profilePicture: undefined});
                                                    alert('Profile removed successfully');
                                                }
                                            } else setShowModel({ type: undefined, params: {} })
                                        } 
                                    })}>Remove Photo</button>
                                }
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
            {showModel?.type === 'confirm' && 
                <ConfirmationModel 
                    message={showModel?.params?.message} 
                    onDismiss={(val) => {
                        if(showModel?.onDismiss) showModel?.onDismiss(val);
                        setShowModel({type: undefined, params: {}})
                    }}
                />
            }
        </>
    )
}
