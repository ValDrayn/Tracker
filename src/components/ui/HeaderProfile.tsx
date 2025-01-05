import { useEffect, useState } from "react";
import logo from "/TrackerLogo.png"
import { cn } from "../../lib/utils";

export default function HeaderProfile() {
    const [isHeight, setIsHeight] = useState<number>(window.innerHeight);

    const smallDevice = 720;

    useEffect(() => {
        const handleResize = () => {
            setIsHeight(window.innerHeight);
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    return <div className={cn(`flex flex-col justify-center items-center w-full ${isHeight < smallDevice ? "scale-90" : "scale-95 mb-3" }`)}>
        <img src={logo} alt="Logo" />
        <p className="font-header text-[4rem] tracking-wider leading-none" style={{color: "#80A217"}}>TRACKER</p>
    </div>;
}