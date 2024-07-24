import React from "react"
import { BsArrowReturnLeft, BsCart2 } from "react-icons/bs"
import { CiHeadphones, CiUser } from "react-icons/ci"
import { LiaShippingFastSolid } from "react-icons/lia"
import { RiHome4Line } from "react-icons/ri"
import { VscHeart, VscSearch } from "react-icons/vsc"
import { EditProfile } from "./EditProfile/Page"

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
    onBlur?: (v: any) => void;
}

export const TextField = ({name, type, placeholder, title, isFieldNameHorizontal, value, onChange, onBlur}: ITextField) => {
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
                onBlur={(e) => {if(onBlur) onBlur(e?.target?.value)}}
                required 
            />
        </div>
    )
}

interface IConfirmationModel {
    message: string,
    onDismiss: (val?: any) => void
}

export const ConfirmationModel = ({message, onDismiss}: IConfirmationModel) => {
    const [loading, setLoading] = React.useState(false);

    return(
        <div className="flex w-full h-screen bg-black bg-opacity-50 items-center justify-center absolute inset-0">
            <div className="flex flex-col items-center justify-between w-25 p-10 border rounded-lg shadow-lg bg-white">
                <div className="text-sm pb-10">{message}</div>
                <div className="border-t w-full pt-2">
                    <div className="float-right">
                        <button className="border bg-gray-100 py-1 px-5 rounded mr-2" disabled={loading} onClick={(e) => onDismiss()}>Cancel</button>
                        <button className="border bg-darkestGreen text-white py-1 px-5 rounded" disabled={loading} onClick={(e) => onDismiss(true)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

