import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home");
          }, 2000);

          const timerAlert = setTimeout(() => {
            alert("Redirecting to Home page");
          }, 100);
      
          return () => {clearTimeout(timer), clearTimeout(timerAlert)};
    },[])

    return <div className="h-full w-full flex justify-center items-center">
        <h1 className="text-[4rem] font-header font-extrabold tracking-wide" style={{color: "#66a631"}}>404: Page Not Found</h1>
    </div>;
}