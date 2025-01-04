import { Buttons } from "./Buttons";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
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
import { motion } from "framer-motion";
// import { useInView } from "framer-motion";
import axios from "axios";
import dataDesc from "../../../public/data/description.json";
import { Skeleton } from "antd";
import { cn } from "../../lib/utils";

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
  item: string;
  id?: number;
  price: itemPrices[];
};

export default function Card({
  location,
  item,
  id,
  price,
  ...props
}: Props & HTMLAttributes<HTMLDivElement>) {
  const [isOpen, setIsOpen] = useState(false);
  const [predicted, setPredicted] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const onFormattedPrice = (price: number | null) => {
    return price !== null ? price.toLocaleString("id-ID") : "0";
  };

  const containerRef = useRef(null);

  // const isInView = useInView(containerRef, { once: true, margin: "50%" });

  const formattedPrice = predicted ? onFormattedPrice(predicted) : "0";

  const percentageComponent = predicted - price[5].value;
  const percentages = (percentageComponent / price[5].value) * 100;

  const [prices, setPrices] = useState(price);

  const addData = () => {
    const newMonth = `January 2025`;
    setPrices([...price, { month: newMonth, value: predicted }]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("https://api-tracker.bncc.net", {
          komoditas: item,
          provinsi: location,
          bulan: 1,
        });
        console.log("Response received:", response.data.predicted_price);
        setPredicted(response.data.predicted_price);
      } catch (error) {
        console.error("Error during API call:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [item, location]);

  const descriptions =
    price[5].value < predicted
      ? dataDesc.data.find((items) => {
          return item === items.Item;
        })
      : dataDesc.data.find((items) => {
          return item + "-desc" === items.Item;
        });

  const adjustDesc = descriptions?.["Paragraph-1"]?.replace(
    "12-18",
    percentages?.toFixed(2).toString() || "default-value"
  );

  // console.log(percentages?.toString());
  // console.log(percentage?.toString());

  const formatPercentage = (percentages: number | null) => {
    if (percentages == null) return "0";
    const absoluteValue = Math.abs(percentages);
    return Math.floor(absoluteValue).toString();
  };

  const formatPercentageOne = (percentages: number | null) => {
    if (percentages == null) return "0.0";
    const absoluteValue = Math.abs(percentages);
    return absoluteValue.toFixed(2);
  };

  return (
    <>
      {loading ? (
        <Skeleton.Input
          active
          className={cn(
            `flex justify-center w-[10rem] h-[4rem]`,
            props.className
          )}
        />
      ) : (
        <div className={cn("flex justify-center w-full", props.className)}>
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: -200 }}
            // animate={{
            //   opacity: isInView ? 1 : 0,
            //   x: isInView ? 0 : -200,
            //   scale: 0.95,
            // }}
            animate={{ opacity: 1, x: 0, scale: 0.95 }}
            viewport={{ margin: "-140px" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              delay: 0.3,
            }}
            className="z-[1] rounded-[1.5rem] overflow-hidden relative w-full shadow-xl"
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
                  <p
                    className="text-[2.5rem] font-body leading-3 mt-2"
                    style={{ color: "#989053" }}
                  >
                    {formatPercentage(percentages).length > 1
                      ? formatPercentage(percentages)
                      : formatPercentageOne(percentages)}
                    %
                    <span>
                      {price[5].value > predicted ? (
                        <i
                          className={cn(
                            `bx bx-trending-down z-[4] text-[3rem] !text-red-500 `
                          )}
                        ></i>
                      ) : price[5].value == predicted ? (
                        <i className="bx bx-minus text-[3rem] text-slate-500"></i>
                      ) : (
                        <i
                          className={cn(
                            `bx bx-trending-up z-[4] text-[3rem] !text-green-500 `
                          )}
                        ></i>
                      )}
                    </span>
                  </p>
                  <p
                    className="text-[0.9rem] font-body font-medium"
                    style={{ color: "#989053" }}
                  >
                    Rp. {onFormattedPrice(price[5].value)} {"->"}{" "}
                    {formattedPrice}
                  </p>
                </div>
              </div>

              <div className="flex items-center relative">
                <Buttons
                  variant="primary"
                  className="w-full font-body"
                  onClick={() => {
                    setIsOpen(!isOpen), addData();
                  }}
                >
                  Detail
                </Buttons>
              </div>
            </div>
          </motion.div>

          <div
            className={cn(
              `absolute z-[1]  opacity-0 top-0 w-full bg-black bg-opacity-40 h-full transition-all duration-200 ${
                isOpen ? "opacity-100 z-[100]" : "opacity-0 -z-[1]"
              }`
            )}
          >
            <div className="relative h-full w-full">
              <div
                className="z-[1] h-full w-full cursor-pointer"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              ></div>
              <div
                className={cn(
                  `z-[1] w-full h-[60%] absolute bg-[#FFFEFA] rounded-t-[2.25rem] px-[1rem] transition-[bottom] duration-500 ease-in-out will-change-[bottom] flex flex-col overflow-y-auto pb-[5rem] scrollbar-hide`,
                  isOpen ? "bottom-0" : "-bottom-[50%]"
                )}
              >
                <div className="min-h-[2.5rem] h-[2.5rem] w-full sticky top-0 z-[10] bg-[#FFFEFA]"></div>
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
                    <div className="flex gap-[0.75rem] relative overflow-hidden">
                      <div>
                        <h1 className="font-bold font-body text-[2.25rem]">
                          {formatPercentageOne(percentages)}%
                        </h1>
                        <h1 className="font-medium font-body text-[1.25rem]">
                          Rp. {formattedPrice}/Kg
                        </h1>
                      </div>
                      <div className="w-auto h-auto overflow-hidden relative">
                        <div
                          className={cn(
                            `w-full h-full z-[5] absolute bg-[#FFFEFA] delay-200   ${
                              isOpen && "animate-slideLeftToRight"
                            }`
                          )}
                        ></div>
                        {price[5].value > predicted ? (
                          <i
                            className={cn(
                              `bx bx-trending-down z-[4] text-[4.5rem] !text-red-500 `
                            )}
                          ></i>
                        ) : price[5].value == predicted ? (
                          <i className="bx bx-minus text-[4.5rem] text-slate-500"></i>
                        ) : (
                          <i
                            className={cn(
                              `bx bx-trending-up z-[4] text-[4.5rem] !text-green-500 mt-[1rem]`
                            )}
                          ></i>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-auto pb-">
                  {isOpen && (
                    <Line
                      data={{
                        labels: prices.map((item: itemPrices) => item.month),
                        datasets: [
                          {
                            label: "Price",
                            data: prices.map((item: itemPrices) => item.value),
                            borderColor: "#9FBA42",
                            borderWidth: 2,
                            pointRadius: 4,
                            pointBorderColor: "#b3bf82",
                            pointBorderWidth: 0.5,
                            backgroundColor: (context) => {
                              const bgColor = [
                                "#E9EDC9",
                                "#f6fcc5",
                                "rgba(233, 237, 201, 0)",
                              ];
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
                              gradientBg.addColorStop(0.5, bgColor[0]);
                              // gradientBg.addColorStop(0.75, bgColor[2]);
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
                <div className="mb-4">
                  <div className="h-0 w-full border-slate-300 border-[1px] mt-4 mb-2"></div>
                  <motion.p
                    className="text-[0.75rem] font-body font-medium mb-2"
                    animate={isOpen ? "visible" : "hidden"}
                    initial="hidden"
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: 200 },
                    }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {adjustDesc}
                  </motion.p>
                  <motion.p
                    className="text-[0.75rem] font-body font-medium mb-4"
                    animate={isOpen ? "visible" : "hidden"}
                    initial="hidden"
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: 200 },
                    }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {descriptions?.Tutorial}
                  </motion.p>

                  <motion.div
                    className="h-auto flex gap-2 ml-4"
                    animate={isOpen ? "visible" : "hidden"}
                    initial="hidden"
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: 200 },
                    }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <p className="text-[0.75rem] font-body mb-4 font-semibold">
                      1.
                    </p>{" "}
                    <span className="text-[0.75rem] font-body font-medium mb-4">
                      {descriptions?.["Point-1"]}
                    </span>
                  </motion.div>

                  <motion.div
                    className="h-auto flex gap-2 ml-4"
                    animate={isOpen ? "visible" : "hidden"}
                    initial="hidden"
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: 200 },
                    }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <p className="text-[0.75rem] font-body mb-4 font-semibold">
                      2.
                    </p>{" "}
                    <span className="text-[0.75rem] font-body font-medium mb-4">
                      {descriptions?.["Point-2"]}
                    </span>
                  </motion.div>

                  <motion.div
                    className="h-auto flex gap-2 ml-4"
                    animate={isOpen ? "visible" : "hidden"}
                    initial="hidden"
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: 200 },
                    }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <p className="text-[0.75rem] font-body mb-4 font-semibold">
                      3.
                    </p>{" "}
                    <span className="text-[0.75rem] font-body font-medium mb-4">
                      {descriptions?.["Point-3"]}
                    </span>
                  </motion.div>

                  <motion.p
                    className="text-[0.75rem] font-body font-medium mb-4"
                    animate={isOpen ? "visible" : "hidden"}
                    initial="hidden"
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: 200 },
                    }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {descriptions?.["Paragraph-2"]}
                  </motion.p>
                </div>

                <motion.div
                  className="text-sm font-body text-gray-600 space-y-1"
                  animate={isOpen ? "visible" : "hidden"}
                    initial="hidden"
                    variants={{
                      visible: { opacity: 1, y: 0 },
                      hidden: { opacity: 0, y: 200 },
                    }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <p>
                    <span className="font-medium text-gray-800">Source:</span>{" "}
                    <b>{descriptions?.Source || "Unknown"}</b>
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      Source Title:
                    </span>{" "}
                    <b>
                      {descriptions?.["Source Title"] || "No Title Provided"}
                    </b>
                  </p>
                </motion.div>
              </div>
              F
            </div>
          </div>
        </div>
      )}
    </>
  );
}
