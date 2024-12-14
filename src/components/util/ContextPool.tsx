import { Outlet } from "react-router-dom";

export default function ContextPool() {
  return (
    <div className="w-full h-full flex justify-center" style={{backgroundColor: "#F5F5F5"}}>
      <Outlet />
    </div>
  );
}
