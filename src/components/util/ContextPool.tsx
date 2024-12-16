import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function ContextPool() {
  const [isHeightTooSmall, setIsHeightTooSmall] = useState(false);

  useEffect(() => {
    const MIN_HEIGHT = 720;
    const handleResize = () => {
      setIsHeightTooSmall(window.innerHeight < MIN_HEIGHT);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="w-full h-full flex justify-center"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      {isHeightTooSmall && (
        <div className="fixed top-0 left-0 w-full h-full bg-slate-600 bg-opacity-100 flex items-center justify-center z-[99999] p-[2rem] flex-col">
          <i className='bx bx-mobile-alt text-white text-[5rem] animate-rotateInfinite'></i>
          <p className="text-white text-center text-lg font-body font-semibold ">
            Please use Portrait Mode for better experience
          </p>
        </div>
      )}

      <Outlet />
    </div>
  );
}
