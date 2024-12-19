import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";

type ItemPrices = {
  month: string;
  value: number;
};

type Props = {
  index: number;
  komoditas: string;
  provinsi: string;
  price: ItemPrices[];
};

export default function DashboardList({
  index,
  komoditas,
  provinsi,
  price,
}: Props) {
  const [predicted, setPredicted] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const onFormattedPrice = (price: number | null) => {
    return price !== null ? price.toLocaleString("id-ID") : "0";
  };

  const formattedPrice = onFormattedPrice(predicted);

  const percentageComponent = predicted - price[5].value;
  const percentages = (percentageComponent / price[5].value) * 100;

  const formatPercentage = (percentages: number | null) => {
    if (percentages == null) return "0";
    const absoluteValue = Math.abs(percentages);
    return Math.floor(absoluteValue).toString();
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching data...");
        const response = await axios.post("https://api-tracker.bncc.net", {
          komoditas,
          provinsi,
          bulan: 1,
        });
        console.log("Response received:", response.data.predicted_price);
        setPredicted(response.data.predicted_price);
      } catch (error) {
        console.error("Error during API call:", error);
        setPredicted(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [komoditas, provinsi]);

  return (
    <div
      className="flex justify-between items-center hover:bg-[#fff1b9] rounded-lg py-[3.5px] cursor-ns-resize"
      key={`${komoditas}-${index}`}
    >
      <div className="flex items-baseline">
        <p className="text-[1rem] text-[#B09B82] font-body">
          {komoditas}&nbsp;
        </p>
        <p className="text-[0.625rem] text-[#B09B82] font-body">
          {" "}
          ({provinsi})
        </p>
      </div>

      <div className="flex relative items-center justify-center gap-[6px]">
        {loading ? (
          <p className="text-[1rem] text-gray-500 font-medium animate-popUpInfinite">
            Loading...
          </p>
        ) : (
          <>
            <p className="text-[1rem] font-body font-medium text-[#B09B82]">
              Rp.{formattedPrice}
            </p>
            <span className="flex h-auto relative">
              <div className="flex flex-col justify-end h-full absolute -bottom-2 ">
                <p className="items-baseline text-[0.65rem] font-body font-medium text-[#B09B82]">
                  ({formatPercentage(percentages)}%)
                </p>
              </div>
              {price[5]?.value > (predicted || 0) ? (
                <i
                  className={cn(
                    `bx bx-trending-down z-[4] text-[1.75rem] !text-red-500 ml-[3px]`
                  )}
                ></i>
              ) : price[5]?.value === (predicted || 0) ? (
                <i className="bx bx-minus text-[1.75rem] text-slate-500 ml-[3px]"></i>
              ) : (
                <i
                  className={cn(
                    `bx bx-trending-up z-[4] text-[1.75rem] !text-green-500 ml-[3px]`
                  )}
                ></i>
              )}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
