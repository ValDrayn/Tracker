import { cn } from "@/lib/utils";
import { Buttons } from "./Buttons";
import { HTMLAttributes, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { motion, useInView } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type itemPrices = {
  month: string;
  value: number;
};

type Props = {
  location?: string;
  percentage?: number;
  item: string;
  id?: number;
  price: itemPrices[];
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

  const onFormattedPrice = (price: itemPrices) => {
    return price.value !== null ? price.value.toLocaleString("id-ID") : 0;
  };

  const containerRef = useRef(null);

  const isInView = useInView(containerRef, { once: true });

  const formattedPrice = price ? onFormattedPrice(price[5]) : [];

  return (
    <div className={cn("flex justify-center w-full", props.className)}>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, x: -200 }}
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : -200,
          scale: 0.95,
        }}
        viewport={{ margin: "-140px" }}
        transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.3 }}
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
            <img
              src={`/data/item/${item}.png`}
              alt="sayur.png"
              className="w-[8rem] h-[8.25rem] rounded-[2.25rem] border-2 border-dark-green"
            />
            <div>
              <p
                className={cn(
                  `text-[1.5rem] font-body font-semibold ${
                    item?.length > 7 ? "text-[1.3rem]" : "text-[1.5rem]"
                  }`
                )}
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
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Detail
            </Buttons>
          </div>
        </div>
      </motion.div>

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
              `z-[150] w-full h-[60%] absolute bg-[#FFFEFA] rounded-t-[2.25rem] px-[1rem] transition-[bottom] duration-500 ease-in-out will-change-[bottom] flex flex-col overflow-y-auto pb-[5rem] `,
              isOpen ? "bottom-0" : "-bottom-[50%]"
            )}
          >
            <div className="h-[2.5rem]"></div>
            <div className="w-full h-auto flex gap-2">
              <img
                src={`/data/item/${item}.png`}
                alt="sayur.png"
                className="w-[8rem] h-[8.25rem] rounded-[2.25rem] border-2 border-dark-green"
              />

              <div className="w-full">
                <h1
                  className={cn(
                    `font-medium font-body text-[2rem] ${
                      item?.length > 7 ? "text-[1.7rem]" : "text-[2rem]"
                    }`
                  )}
                >
                  {item}
                </h1>
                <div className="flex gap-[1rem] relative overflow-hidden">
                  <div>
                    <h1 className="font-bold font-body text-[2.25rem]">
                      {percentage}%
                    </h1>
                    <h1 className="font-medium font-body text-[1.5rem]">
                      Rp. {formattedPrice}
                    </h1>
                  </div>
                  {/* <img
                    src={up}
                    alt=""
                    className="scale-[90%] rotate-12 w-auto h-auto "
                  /> */}
                  <div className="w-auto h-auto overflow-hidden">

                  {price[4].value > price[5].value ? (
                    <i className={cn(`bx bx-trending-down text-[5rem] !text-red-500 ${isOpen && "animate-slideLeftToRight"}`)}></i>
                  ) : price[4].value == price[5].value ? (
                    <i className="bx bx-minus text-[5rem] text-slate-500"></i>
                  ) : (
                    <i className={cn(`bx bx-trending-up text-[5rem] !text-green-500 mt-[1rem] ${isOpen && "animate-slideLeftToRight"}`)}></i>
                  )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-auto">
              {isOpen && (
                <Line
                  data={{
                    labels: price.map((item: itemPrices) => item.month),
                    datasets: [
                      {
                        label: "Price",
                        data: price.map((item: itemPrices) => item.value),
                        borderColor: "#9FBA42",
                        borderWidth: 2,
                        // backgroundColor: "rgba(159, 186, 66, 0.3)",
                        pointRadius: 4,
                        pointBorderColor: "#b3bf82",
                        pointBorderWidth: 0.5,
                        backgroundColor: (context) => {
                          const bgColor = ["#E9EDC9", "#f6fcc5","rgba(233, 237, 201, 0)"];
                          if (!context.chart.chartArea) {
                            return;
                          }
                          const {
                            ctx,
                            chartArea: { top, bottom },
                          } = context.chart;
                          const gradientBg = ctx.createLinearGradient(
                            0,
                            top,
                            0,
                            bottom
                          );
                          gradientBg.addColorStop(0, bgColor[0]);
                          gradientBg.addColorStop(0.4, bgColor[0]);
                          gradientBg.addColorStop(0.75, bgColor[2]);
                          gradientBg.addColorStop(1, bgColor[2]);

                          return gradientBg;
                        },
                        fill: true,
                      },
                    ],
                  }}
                  options={{
                    animation: {
                      duration: 800,
                      easing: "easeInOutQuad",
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true,
                        position: "top",
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                        },
                      },
                      y: {
                        grid: {
                          display: false,
                        },
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
