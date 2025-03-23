import logo from "/TrackerLogo.png"

export default function HeaderProfile() {
    return <div className=" flex flex-col justify-center items-center w-full mb-3 scale-95">
        <img src={logo} alt="Logo" />
        <p className="font-header text-[4rem] tracking-wider leading-none" style={{color: "#80A217"}}>TRACKER</p>
    </div>;
}