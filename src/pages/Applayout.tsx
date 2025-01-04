import HeaderProfile from "@/components/ui/HeaderProfile";
import Navbar from "@/components/ui/Navbar";
import { Select } from "antd";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { url, validRoutes } from "../lib/data";
import { cn } from "../lib/utils";

const headers = {
  "/home": <HeaderProfile />,
} as const;

export default function AppLayout() {
  const [selectedValue, setSelectedValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const header = headers[location.pathname as keyof typeof headers] || null;
  const isValid = validRoutes.some((route) => route.path === location.pathname);

  const containerRef = useRef(null);

  const mainControls = useAnimation();

  useEffect(() => {
    if (location.pathname === "/home") {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
    if (selectedValue && location.pathname !== `/${selectedValue.toLowerCase().replace(/\s+/g, "-")}`) {
      setSelectedValue("");
    }
  }, [location.pathname, mainControls, selectedValue]);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    navigate(`/${value.toLowerCase().replace(/\s+/g, "-")}`);
  };
  
  
  return (
    <div className={cn(`max-w-[26.875rem] w-full min-w-[23.5rem] h-[100vh] flex flex-col items-center p-4 bg-[#FFFEFA] relative overflow-hidden`)}>
      <section ref={containerRef}>
        <motion.div
          key={location.pathname}
          animate={mainControls}
          initial="hidden"
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: -50 },
          }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {header}
        </motion.div>
      </section>
      {isValid && (
        <Select
          showSearch
          placeholder="Select Province's"
          optionFilterProp="label"
          size="large"
          value={selectedValue || undefined}
          options={url.map((item) => ({
            label: item,
            value: item,
          }))}
          style={{ width: "100%" }}
          onChange={(value) => handleChange(value)}
        />
      )}
      {isValid && (
        <div className="w-full items-start my-[1.25rem]">
          <span
            className="font-bold text-[1.125rem] font-body"
            style={{ color: "#989053" }}
          >
            {location.pathname == "/home" && <span>Top 3 p</span>}{location.pathname != "/home" && "P"}redicted price next month
          </span>
        </div>
      )}
      <Outlet />
      <Navbar className={cn(`absolute bottom-0 z-[100]`)} />
    </div>
  );
}
