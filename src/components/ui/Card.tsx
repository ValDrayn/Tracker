import { cn } from "@/lib/utils";
import kangkung from "/kangkung.png";
import { Buttons } from "./Buttons";
import { HTMLAttributes } from "react";

type Props = {
    location?: string,
    percentage?: number,
    item?: string
}

export default function Card({ location, percentage, item, ...props }: Props & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative flex justify-center w-full", props.className)}>
      <div
        className="z-[3] rounded-[1.5rem] overflow-hidden relative w-full shadow-xl"
        style={{ backgroundColor: "#EDF9CE" }}
      >
        <div className="w-[27.7rem] h-[5.1rem] absolute rounded-3xl top-[47%] left-[55%] -translate-y-[50%] -translate-x-[50%] -rotate-45 z-[0] bg-gradient-to-r from-transparent to-white opacity-70"></div>
        <div className="w-[27.6rem] h-[3.75rem] absolute rounded-3xl top-[69%] left-[79%] -translate-y-[50%] -translate-x-[50%] -rotate-45 z-[0] bg-gradient-to-r from-transparent to-white opacity-70"></div>
        <div className="w-[27.7rem] h-[0.4375rem] absolute rounded-3xl top-[90%] left-[86%] -translate-y-[50%] -translate-x-[50%] -rotate-45 z-[0] bg-gradient-to-r from-transparent to-white opacity-70"></div>

        <div
          className="flex justify-between py-[0.75rem] px-[1.25rem] relative"
          style={{ backgroundColor: "#DCFF92" }}
        >
          <p
            className="font-bold font-body text-[1.25rem]"
            style={{ color: "#79BD40" }}
          >
            {location}
          </p>
        </div>

        <div
          className="w-full h-full p-[1.25rem]"
          style={{ backgroundColor: "#EDF9CE" }}
        >
          <div className="mb-[0.875rem] flex gap-2 relative">
            <img src={kangkung} alt="" />
            <div>
              <p className="text-[1.5rem] font-body font-semibold" style={{color: "#989053"}}>
                {item}
              </p>
              <p className="text-[4rem] font-body" style={{color: "#989053"}}>{percentage}%</p>
            </div>
          </div>

          <div className="flex items-center relative">
            <Buttons variant="primary" className="w-full">Detail</Buttons>
          </div>
        </div>
      </div>
    </div>
  );
}
