import { useEffect, useState } from "react";
import dataAOL from "../../public/data/databaseAOL.json";
import { countUrl, produce } from "@/lib/data";
import { useDialog } from "@/components/ui/Dialog";
import { Select } from "antd";
import DashboardList from "@/components/ui/dashboardList";

export default function Dashboard() {
  const [isHeight, setIsHeight] = useState<number>(window.innerHeight);
  const [selected, setSelected] = useState("Bawang Putih");
  const { showDialog } = useDialog();

  const handleChange = (value: string) => {
    setSelected(value);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsHeight(Math.round(window.innerHeight * (window.innerHeight >= 1050 ? 0.64 : window.innerHeight >= 958 ? 0.60 : window.innerHeight >= 858 ? 0.55 : window.innerHeight >= 795 ? 0.50 : 0.46)));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

 

  return (
    <div className="w-full h-full">
      <h1 className="font-body text-[1.75rem] font-bold text-[#80A217] p-2">
        Dashboard
      </h1>
      <div className="flex justify-between mb-[1.5rem]">
        <div
          className="w-[11.375rem] h-[11.5625rem] rounded-[1.25rem] py-[0.65rem] px-[0.75rem] bg-[#E9F3CA] scale-95 shadow-[2px_2px_8px_rgba(0,0,0,0.25)] relative cursor-pointer hover:scale-105 active:scale-95 xs:scale-100"
          onClick={() => showDialog("Region")}
        >
          <h1 className="font-body text-[1.3125rem] font-bold text-[#80A217]">
            Total Region
          </h1>
          <h1 className="font-body text-[3.5rem] font-bold text-[#80A217] absolute bottom-0 right-[0.625rem]">
            {countUrl.data.split(",").length}
          </h1>
        </div>
        <div
          className="w-[11.375rem] h-[11.5625rem] rounded-[1.25rem] py-[0.65rem] px-[0.75rem] bg-[#E9F3CA] scale-95 shadow-[2px_2px_8px_rgba(0,0,0,0.25)] relative cursor-pointer hover:scale-105 active:scale-95 xs:scale-100"
          onClick={() => showDialog("Produce")}
        >
          <h1 className="font-body text-[1.3125rem] font-bold text-[#80A217]">
            Total Produce
          </h1>
          <h1 className="font-body text-[3.5rem] font-bold text-[#80A217] absolute bottom-0 right-[0.625rem]">
            8
          </h1>
        </div>
      </div>

      <div className="flex justify-between items-center mb-2">
        <p className="text-[1.25rem] font-bold text-body text-[#80A217]">
          Item List
        </p>
        <Select
          placeholder="Select item"
          optionFilterProp="label"
          size="small"
          value={selected || undefined}
          options={produce.map((item) => ({
            label: item,
            value: item,
          }))}
          style={{ width: "40%" }}
          onChange={(value) => handleChange(value)}
        />
        
      </div>
      <div className="overflow-y-auto scrollbar-hide flex flex-col py-[0.2rem]" style={{height:`${isHeight}px`}}>
        {dataAOL.data
          .filter((item) => !selected || item.Komoditas === selected) 
          .map((item, index) => {
            return (
              <DashboardList index={index} komoditas={item.Komoditas} price={item.price} provinsi={item.Provinsi}/>
            );
          })}
      </div>
    </div>
  );
}
