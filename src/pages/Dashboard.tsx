import { useState } from "react";
import dataAOL from "../../public/data/databaseAOL.json";
import { countUrl, produce } from "@/lib/data";
import { useDialog } from "@/components/ui/Dialog";
import { cn } from "@/lib/utils";
import { Select } from "antd";
import DashboardList from "@/components/ui/dashboardList";

export default function Dashboard() {
  const [selected, setSelected] = useState("");
  const { showDialog } = useDialog();

  const handleChange = (value: string) => {
    setSelected(value);
  };

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
      <div className="h-[58%] overflow-y-auto scrollbar-hide gap-[7px] flex flex-col py-[0.2rem]">
        {dataAOL.data
          .filter((item) => !selected || item.Komoditas === selected) 
          .map((item, index) => {

            return (
              // <div
              //   className="flex justify-between items-center"
              //   key={item.Komoditas+index}
              // >
              //   <div className="flex items-baseline">
              //     <p className="text-[1rem] text-[#B09B82] font-body">
              //       {item.Komoditas}&nbsp;
              //     </p>
              //     <p className="text-[0.625rem] text-[#B09B82] font-body">
              //       {" "}
              //       ({item.Provinsi})
              //     </p>
              //   </div>

              //   <div className="flex relative items-center justify-center gap-[6px]">
              //     <p className="text-[1rem] font-medium text-[#B09B82]">
              //       Rp.{formattedPrice}
              //     </p>
              //     {item.price[4].value > item.price[5].value ? (
              //       <i
              //         className={cn(
              //           `bx bx-trending-down z-[4] text-[2rem] !text-red-500 `
              //         )}
              //       ></i>
              //     ) : item.price[4].value == item.price[5].value ? (
              //       <i className="bx bx-minus text-[2rem] text-slate-500"></i>
              //     ) : (
              //       <i
              //         className={cn(
              //           `bx bx-trending-up z-[4] text-[2rem] !text-green-500`
              //         )}
              //       ></i>
              //     )}
              //   </div>
              // </div>
              <DashboardList index={index} komoditas={item.Komoditas} price={item.price} provinsi={item.Provinsi}/>
            );
          })}
      </div>
    </div>
  );
}
