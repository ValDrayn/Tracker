import { cn } from "@/lib/utils";
import kangkung from "/kangkung.png";
import up from "/Stonk.png";
import { Buttons } from "./Buttons";
import { HTMLAttributes, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Props = {
  location?: string;
  percentage?: number;
  item?: string;
  id?: number;
  price: number;
};

export default function Card({
  location,
  percentage,
  item,
  id,
  price,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setIsOpen] = useState(false);

  const onformattedPrice = (price: number) => {
    return price.toLocaleString('id-ID'); // Output: "10.000"
  };
  
  // Penggunaan
  const formattedPrice = onformattedPrice(price);

  return (
    <div className={cn("flex justify-center w-full", props.className)}>
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
              <p
                className="text-[1.5rem] font-body font-semibold"
                style={{ color: "#989053" }}
              >
                {item}
              </p>
              <p className="text-[4rem] font-body" style={{ color: "#989053" }}>
                {percentage}%
              </p>
            </div>
          </div>

          <div className="flex items-center relative">
            <Buttons
              variant="primary"
              className="w-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              Detail
            </Buttons>
          </div>
        </div>
      </div>

      <div
        className={cn(
          `absolute z-[100]  opacity-0 top-0 w-full bg-black bg-opacity-40 h-full transition-all duration-200 ${
            isOpen ? "opacity-100 z-[100]" : "opacity-0 -z-[1]"
          }`
        )}
      >
        <div className="relative h-full w-full">
          <div
            className="z-[10] h-full w-full cursor-pointer"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          ></div>
          <div
            className={cn(
              `z-[150] w-full h-[60%] absolute bg-[#FFFEFA] rounded-t-[2.25rem] px-[1rem] transition-[bottom] duration-500 ease-in-out will-change-[bottom] flex flex-col overflow-y-auto pb-[5rem]`,
              isOpen ? "bottom-0" : "-bottom-[50%]"
            )}
          >
            <div className="h-[2.5rem]"></div>
            <div className="w-full h-auto flex gap-2">
              <img
                src={kangkung}
                alt="sayur.png"
                className="w-[8rem] h-[8.25rem]"
              />
              <div className="w-full">
                <h1 className="font-medium font-body text-[2rem]">{item}</h1>
                <div className="flex gap-[2rem] relative">
                  <div>
                    <h1 className="font-bold font-body text-[2.25rem]">
                      {percentage}%
                    </h1>
                    <h1 className="font-medium font-body text-[1.5rem]">
                      Rp. {formattedPrice}
                    </h1>
                  </div>
                  <img src={up} alt="" className="scale-[90%] rotate-12 absolute w-auto h-auto right-[35%] top-[60%] -translate-y-1/2 translate-x-1/2"/>
                </div>
              </div>
            </div>
            <div className="w-full h-auto">
              <Line data={{
                labels: ["Oct 2024", "Nov 2024", "Des 2024", "Jan 2025"],
                datasets: [
                  {
                    label: "Price",
                    data: [14900, 16400,15500, 18000],
                    borderColor: "#9FBA42"
                  }
                ]
              }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
