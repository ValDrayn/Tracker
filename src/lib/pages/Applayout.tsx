import HeaderProfile from "@/components/ui/HeaderProfile";
import Navbar from "@/components/ui/Navbar";
import { Select } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import "../../App.css"

const headers = {
  "/home": <HeaderProfile />,
} as const;

const dummy = ["Jakarta", "Palembang", "Sulawesi", "Bangka", "Kalimantan"];

const validRoutes = [
  { path: "/home", component: "Home" },
  { path: "/jakarta", component: "Jakarta" },
  { path: "/palembang", component: "Palembang" },
  { path: "/sulawesi", component: "Sulawesi" },
  { path: "/bangka", component: "Bangka" },
  { path: "/kalimantan", component: "Kalimantan" }
];

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const header = headers[location.pathname as keyof typeof headers] || null;
  const isValid = validRoutes.some(route => route.path === location.pathname);

  // const checkRoutes = isValid.includes(location.pathname);

  const handleChange = (value: string) => {
    navigate(`/${value.toLowerCase()}`);
  };

  return (
    <div className="max-w-[26.875rem] w-full min-w-[24.5rem] h-[100vh] flex flex-col items-center p-4 bg-[#FFFEFA] relative">
      {header}
      {isValid && (
        <Select
          showSearch
          placeholder="Select a city"
          optionFilterProp="label"
          size="large"
          options={dummy.map((item) => ({
            label: item,
            value: item,
          }))}
          style={{ width: "100%" }}
          onChange={handleChange}
        />
      )}
      {isValid && (
        <div className="w-full items-start my-[1.25rem]">
          <h1
            className="font-bold text-[1.125rem]"
            style={{ color: "#989053" }}
          >
            Largest Price Increase in next week
          </h1>
        </div>
      )}
      <Outlet />

      <Navbar className="absolute bottom-0 z-[100]" />
    </div>
  );
}
