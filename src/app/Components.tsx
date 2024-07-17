import React from "react"
import { BsArrowReturnLeft, BsCart2 } from "react-icons/bs"
import { CiHeadphones, CiUser } from "react-icons/ci"
import { LiaShippingFastSolid } from "react-icons/lia"
import { RiHome4Line } from "react-icons/ri"
import { VscHeart, VscSearch } from "react-icons/vsc"
import { EditProfile } from "./EditProfile/Page"
import { FaUser } from "react-icons/fa"

export const Header = () => {
    const [showModel, setShowModel] = React.useState<{type: 'editUser' | undefined, params: any, onDismiss?: (val?: any) => void}>({type: undefined, params: {}});

    return (
        <>
            <div className="p-1 bg-customLightestGreen">
                <div className="flex justify-between items-center w-1/2 mx-auto">   
                    <div className="flex items-center text-lightestGreen text-sm"><CiHeadphones className="h-6 w-6 px-1" /> Helpline: <b>001 234-567-890</b></div>
                    <div className="flex items-center text-lightestGreen text-sm"><LiaShippingFastSolid className="h-6 w-6 px-1" />Free shipping worldwide for orders over $50</div>
                    <div className="flex items-center text-lightestGreen text-sm"><BsArrowReturnLeft  className="h-6 w-6 px-1" />30 days return period</div>
                </div>
            </div>
            <div className="flex p-0.1 w-3/4 mx-auto">
                <div className="flex items-center w-1/4">
                    <div className="text-lightestGreen text-sm pr-2 cursor-pointer"><RiHome4Line className="h-5 w-5"/></div>
                    <div className="text-lightestGreen text-sm pr-2 cursor-pointer">Cloths</div>
                    <div className="text-lightestGreen text-sm pr-2 cursor-pointer">Shoes</div>
                    <div className="text-lightestGreen text-sm pr-2 cursor-pointer">Accessories</div>
                    <div className="text-lightestGreen text-sm pr-2 cursor-pointer">Contact</div>
                </div>
                <div className="flex justify-center items-center w-2/4">
                    <img src={`/large-removebg-preview.png`} width={100} height={100}/>
                </div>
                <div className="flex justify-end items-center w-1/4">
                    <div className="px-2 text-lightestGreen text-sm cursor-pointer"><VscSearch className="h-5 w-5" /></div>
                    <div className="px-2 text-lightestGreen text-sm cursor-pointer"><VscHeart className="h-5 w-5" /></div>
                    <div className="px-2 text-lightestGreen text-sm cursor-pointer"><BsCart2 className="h-5 w-5" /></div>
                    <div className="px-2 text-lightestGreen text-sm cursor-pointer" 
                        onClick={() => {
                            setShowModel({
                                type: 'editUser', 
                                params: { recordId: document.cookie.split('=')[1] },
                                onDismiss: (val) => {
                                    setShowModel({type: undefined, params: {}})
                                }
                            })
                        }}
                    >
                        <CiUser className="h-5 w-5" />
                    </div>
                </div>
            </div>
            {showModel?.type === 'editUser' && 
                <EditProfile 
                    recordId={showModel?.params?.recordId}
                    onDismiss={(v) => {
                        if(showModel?.onDismiss) showModel?.onDismiss(v);
                        else setShowModel({type: undefined, params: {}})
                    }}
                />
            }
        </>
    )
}

interface ITextField {
    name: String;
    type?: String;
    placeholder?: String;
    isFieldNameHorizontal?: boolean;
    title?: String;
    value: any;
    onChange: (v: any) => void; 
}

export const TextField = ({name, type, placeholder, title, isFieldNameHorizontal, value, onChange}: ITextField) => {
    return(
        <div className={isFieldNameHorizontal ? 'flex py-1' : 'py-1'}>
            <div className="font-medium text-gray-500 text-sm pb-1">{title}</div>
            <input 
                className="p-1 border rounded border-gray-300 w-full" 
                type={type ? `${type}` : 'text'}
                name={`${name}`}
                placeholder={placeholder ? `${placeholder}` : ''} 
                value={value}
                onChange={(e) => {if(onChange) onChange(e?.target?.value)}}
                required 
            />
        </div>
    )
}

export const Step1 = () => {
    return(
        <div>
            <div className="font-bold text-2xl text-gray-800">Enter your email</div>
            <TextField name={'email'} value={''} onChange={() => {}} />
        </div>
    )
}

export const Step2 = () => {
    return(
        <div>
            <div className="font-bold text-2xl text-gray-800">Enter code</div>
            <div className="text-sm text-gray-500 py-2">We've sent a 6 digit code to email address the code expires shortly, so please enter it soon.</div>
            <TextField name={'code'} value={''} onChange={() => {}} />
        </div>
    )
}

export const Step3 = () => {
    return(
        <div>
            <div className="font-bold text-2xl text-gray-800">Enter your company or team name</div>
            <TextField name={'companyName'} value={''} onChange={() => {}} />
        </div>
    )
}

export const Step4 = () => {
    const imgRef = React.useRef<any>();

    return(
        <div>
            <div className="font-bold text-2xl text-gray-800">Enter your name</div>
            <TextField name={'name'} value={''} onChange={() => {}} />
            <div className="w-1/4">
                <div className="font-medium text-gray-500 text-sm pb-1">Profile photo</div>
                <div className="w-full h-40 bg-darkestGreen border rounded-lg mb-2">
                    <FaUser className="h-50 w-full text-white" style={{height:'100%',padding:"10px 5px 0px 5px"}}/>
                </div>
                <div className="w-full text-sm font-bold text-gray-400 border-2 border p-1 rounded-lg text-center cursor-pointer" onClick={(e) => imgRef?.current?.click()}>Upload Photo</div>
                <input ref={imgRef} type="file" className="hidden"/>
            </div>
        </div>
    )
}

export const Step5 = () => {
    return(
        <div>
            <div className="font-bold text-2xl text-gray-800">Add your team members</div>
            <TextField name={'teammembers'} value={''} onChange={() => {}} />
        </div>
    )
}

export const Step6 = () => {
    return(
        <div>
            <div className="font-bold text-2xl text-gray-800">Add project name</div>
            <TextField name={'projectname'} value={''} onChange={() => {}} />
        </div>
    )
}


