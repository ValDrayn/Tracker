import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const navbarItem = [
  {
    name: "Home",
    icon: "bx bxs-home",
    route: "/home",
  },
  {
    name: "Dashboard",
    icon: "bx bx-chalkboard",
    route: "/dashboard",
  },
];

export default function Navbar({ ...props }) {
  const navigate = useNavigate();
  const [isAnimated, setIsAnimated] = useState(true);

  const { pathname } = useLocation();

  useEffect(() => {
    setIsAnimated(false); 

    const timeout = setTimeout(() => {
      setIsAnimated(true);
    }, 200);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div
      className={cn(
        "bg-[#FAFBEA] grid grid-cols-2 py-[0.5rem] w-full place-items-center border-t-[1px] border-dark-green",
        props.className
      )}
    >
      {navbarItem.map((item, index) => {
        const isActive = pathname.includes(item.route);
        return (
          <div
            key={item.route}
            className="relative rounded-xl overflow-hidden"
          >
            <span
              className={cn(
                `absolute w-full h-full -z-[1] transition-transform duration-500 ease-out`,
                isActive && `bg-[#E9F3CA] ${isAnimated ? "scale-x-100" : "scale-x-0"}`
              )}
            ></span>
            <button
              className={cn(
                `flex flex-col items-center cursor-pointer transition-transform duration-500 ease-out relative px-[0.5rem] ${
                  pathname.includes(item.route) &&
                  "rounded-2xl overflow-hidden" && isAnimated && "px-[1.25rem]"
                }`
              )}
              onClick={() => navigate(item.route)}
              key={index}
            >
              <i
                className={cn(
                  item.icon,
                  "text-[1.375rem]",
                  pathname.includes(item.route)
                    ? `transition-colors duration-500 ease-out ${
                        isAnimated ? "text-dark-green" : "text-slate-500"
                      }`
                    : "text-slate-500"
                )}
              />

              <p
                className={cn(
                  "font-medium text-[0.75rem]",
                  pathname.includes(item.route)
                    ? `transition-colors duration-500 ease-out ${
                        isAnimated ? "text-dark-green" : "text-slate-500"
                      }`
                    : "text-slate-500"
                )}
              >
                {item.name}
              </p>
            </button>
          </div>
        );
      })}
    </div>
  );
}
