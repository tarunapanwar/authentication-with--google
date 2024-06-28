// import './app/globals.css';
export const Header = () => {
    return (
        <>
            <div className="p-1 bg-customLightestGreen">
                <div className="flex justify-between items-center w-1/2 mx-auto">   
                    <div className="text-lightestGreen text-sm">Hotline: <b>001 234-567-890</b></div>
                    <div className="text-lightestGreen text-sm">Free shipping worldwide for orders over $50</div>
                    <div className="text-lightestGreen text-sm">30 days return period</div>
                </div>
            </div>
            <div className="flex p-2 w-3/4 mx-auto">
                <div className="flex justify-between items-center w-1/4">
                    <div className="text-lightestGreen text-sm">Home</div>
                    <div className="text-lightestGreen text-sm">Cloths</div>
                    <div className="text-lightestGreen text-sm">Shoes</div>
                    <div className="text-lightestGreen text-sm">Accessories</div>
                    <div className="text-lightestGreen text-sm">Contact</div>
                </div>
                <div className="flex justify-center items-center w-2/4">
                    <img src={`/large-removebg-preview.png`} width={100} height={100}/>
                </div>
                <div className="flex justify-end items-center w-1/4">
                    <div className="px-2 text-lightestGreen text-sm">Search</div>
                    <div className="px-2 text-lightestGreen text-sm">Cart</div>
                    <div className="px-2 text-lightestGreen text-sm">Wishlist</div>
                    <div className="px-2 text-lightestGreen text-sm">Profile</div>
                </div>
            </div>
        </>
    )
}