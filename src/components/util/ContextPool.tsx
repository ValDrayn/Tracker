import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { DialogComponents, DialogProvider } from "../ui/Dialog";
import TotalRegion from "../ui/TotalRegion";
import TotalProduce from "../ui/TotalProduce";
import { cn } from "../../lib/utils";

export default function ContextPool() {
  const [isHeightTooSmall, setIsHeightTooSmall] = useState(false);
  const [isWidthTooSmall, setIsWidthTooSmall] = useState(false);

  useEffect(() => {
    const MIN_HEIGHT = 720;
    const MIN_WIDTH = 380;
    const handleResize = () => {
      setIsHeightTooSmall(window.innerHeight < MIN_HEIGHT);
      setIsWidthTooSmall(window.innerWidth < MIN_WIDTH);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dialog: DialogComponents = [
    { component: <TotalRegion/>, name: "Region" },
    { component: <TotalProduce />, name: "Produce" },
  ];

  return (
    <DialogProvider components={dialog}>
      <div
        className={cn(`w-full h-[100dvh] max-h-[100dvh] flex justify-center`)}
        style={{ backgroundColor: "#F5F5F5" }}
      >
        {isHeightTooSmall && (
          <div className="fixed top-0 left-0 w-full h-dvh bg-slate-600 bg-opacity-100 flex items-center justify-center z-[99999] p-[2rem] flex-col">
            <i className="bx bx-mobile-alt text-white text-[5rem] animate-rotateInfinite"></i>
            <p className="text-white text-center text-lg font-body font-semibold ">
              Please use Portrait Mode for better experience
            </p>
          </div>
        )}

        {isWidthTooSmall && (
          <div className="fixed top-0 left-0 w-full h-dvh bg-slate-600 bg-opacity-100 flex items-center justify-center z-[99999] p-[2rem] flex-col">
            <i className="bx bxs-message-alt-x text-white text-[5rem] animate-popUpInfinite"></i>
            <p className="text-white text-center text-lg font-body font-semibold ">
              Your Device width is too small
            </p>
          </div>
        )}

        <Outlet />
      </div>
    </DialogProvider>
  );
}
