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
                    <div className="px-2 text-lightestGreen text-sm cursor-pointer" onClick={() => {setShowModel({type: 'editUser', params: {}})}}><CiUser className="h-5 w-5" /></div>
                </div>
            </div>
            {showModel?.type === 'editUser' && <EditProfile />}
        </>
    )
}