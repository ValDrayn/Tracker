import HeaderProfile from "@/components/ui/HeaderProfile";
import Navbar from "@/components/ui/Navbar";
import { Select } from "antd";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import "../../App.css"

const headers = {
  "/home": <HeaderProfile />,
} as const;

const url = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan",
  "Bengkulu", "Lampung", "Kepulauan Bangka Belitung", "Kepulauan Riau", "Jakarta",
  "Jawa Barat", "Jawa Tengah", "Yogyakarta", "Jawa Timur", "Banten", "Bali",
  "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat", "Kalimantan Tengah",
  "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara",
  "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat",
  "Maluku", "Maluku Utara", "Papua Barat", "Papua", "Papua Barat Daya", "Papua Pegunungan",
  "Papua Tengah", "Papua Selatan"
];

// const validRoutesa = [
//   { path: "/home", component: "Home" },
//   { path: "/jakarta", component: "Jakarta" },
//   { path: "/palembang", component: "Palembang" },
//   { path: "/sulawesi", component: "Sulawesi" },
//   { path: "/bangka", component: "Bangka" },
//   { path: "/kalimantan", component: "Kalimantan" },
// ];

const validRoutes = [
  { path: "/home", component: "Home" },
  { path: "/aceh", component: "Aceh" },
  { path: "/sumatera-utara", component: "Sumatera-Utara" },
  { path: "/sumatera-barat", component: "Sumatera-Barat" },
  { path: "/riau", component: "Riau" },
  { path: "/jambi", component: "Jambi" },
  { path: "/sumatera-selatan", component: "Sumatera-Selatan" },
  { path: "/bengkulu", component: "Bengkulu" },
  { path: "/lampung", component: "Lampung" },
  { path: "/kepulauan-bangka-belitung", component: "Kepulauan-Bangka-Belitung" },
  { path: "/kepulauan-riau", component: "Kepulauan-Riau" },
  { path: "/jakarta", component: "Jakarta" },
  { path: "/jawa-barat", component: "Jawa-Barat" },
  { path: "/jawa-tengah", component: "Jawa-Tengah" },
  { path: "/yogyakarta", component: "Yogyakarta" },
  { path: "/jawa-timur", component: "Jawa-Timur" },
  { path: "/banten", component: "Banten" },
  { path: "/bali", component: "Bali" },
  { path: "/nusa-tenggara-barat", component: "Nusa-Tenggara-Barat" },
  { path: "/nusa-tenggara-timur", component: "Nusa-Tenggara-Timur" },
  { path: "/kalimantan-barat", component: "Kalimantan-Barat" },
  { path: "/kalimantan-tengah", component: "Kalimantan-Tengah" },
  { path: "/kalimantan-selatan", component: "Kalimantan-Selatan" },
  { path: "/kalimantan-timur", component: "Kalimantan-Timur" },
  { path: "/kalimantan-utara", component: "Kalimantan-Utara" },
  { path: "/sulawesi-utara", component: "Sulawesi-Utara" },
  { path: "/sulawesi-tengah", component: "Sulawesi-Tengah" },
  { path: "/sulawesi-selatan", component: "Sulawesi-Selatan" },
  { path: "/sulawesi-tenggara", component: "Sulawesi-Tenggara" },
  { path: "/gorontalo", component: "Gorontalo" },
  { path: "/sulawesi-barat", component: "Sulawesi-Barat" },
  { path: "/maluku", component: "Maluku" },
  { path: "/maluku-utara", component: "Maluku-Utara" },
  { path: "/papua-barat", component: "Papua-Barat" },
  { path: "/papua", component: "Papua" },
  { path: "/papua-barat-daya", component: "Papua-Barat-Daya" },
  { path: "/papua-pegunungan", component: "Papua-Pegunungan" },
  { path: "/papua-tengah", component: "Papua-Tengah" },
  { path: "/papua-selatan", component: "Papua-Selatan" },
];



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
    <div className="max-w-[26.875rem] w-full min-w-[24.5rem] h-[100vh] flex flex-col items-center p-4 bg-[#FFFEFA] relative overflow-hidden">
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
          placeholder="Select a city"
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
            className="font-bold text-[1.125rem]"
            style={{ color: "#989053" }}
          >
            {location.pathname == "/home" && <span>Top 3 </span>}Largest price increase next month
          </span>
        </div>
      )}
      <Outlet />
      <Navbar className="absolute bottom-0 z-[100]" />
    </div>
  );
}
