import { useState } from "react";
import dataAOL from "../../public/data/databaseAOL.json";
import { countUrl } from "@/lib/data";
import { useDialog } from "@/components/ui/Dialog";

export default function Dashboard() {
    const { showDialog } = useDialog();
  return (
    <div className="w-full h-full">
      <h1 className="font-body text-[1.75rem] font-bold text-[#80A217] p-2">
        Dashboard
      </h1>
      <div className="flex justify-between">
        <div className="w-[11.375rem] h-[11.5625rem] rounded-[1.25rem] py-[0.65rem] px-[0.75rem] bg-[#E9F3CA] scale-95 shadow-[2px_2px_8px_rgba(0,0,0,0.25)] relative cursor-pointer hover:scale-105 active:scale-95 xs:scale-100" onClick={() => showDialog("Region")}>
          <h1 className="font-body text-[1.3125rem] font-bold text-[#80A217]">
            Total Region
          </h1>
          <h1 className="font-body text-[3.5rem] font-bold text-[#80A217] absolute bottom-0 right-[0.625rem]">
            {countUrl.data.split(",").length}
          </h1>
        </div>
        <div className="w-[11.375rem] h-[11.5625rem] rounded-[1.25rem] py-[0.65rem] px-[0.75rem] bg-[#E9F3CA] scale-95 shadow-[2px_2px_8px_rgba(0,0,0,0.25)] relative cursor-pointer hover:scale-105 active:scale-95 xs:scale-100" onClick={() => showDialog("Produce")}>
          <h1 className="font-body text-[1.3125rem] font-bold text-[#80A217]">
            Total Produce
          </h1>
          <h1 className="font-body text-[3.5rem] font-bold text-[#80A217] absolute bottom-0 right-[0.625rem]">
            8
          </h1>
        </div>
      </div>
    </div>
  );
}
