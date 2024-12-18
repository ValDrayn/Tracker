import Card from "@/components/ui/Card";
import { Navigate, useLocation, useParams } from "react-router-dom";
// import data from "../../../public/data/db.json";
import dataAOL from "../../public/data/databaseAOL.json";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { url } from "@/lib/data";

// const data = [
//     {location:"Jakarta", percentage:19, item: "Kangkung"},
//     {location:"Sulawesi", percentage:16, item: "Apel"},
//     {location:"Bangka", percentage:13, item:"Wortel"},
// ]

// const dummyData = [
//   { month: "Oct", value: 0 },
//   { month: "Nov", value: 0 },
//   { month: "Des", value: 0 },
//   { month: "Jan", value: 0 },
// ];

export default function Locations() {
  const params = useParams();
  const location = params.location;
  const currentLocation = useLocation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  
  const isValidLocation = url.some((city) => {
    const formattedCity = city.toLowerCase().replace(/\s+/g, "-");
    const formattedLocation = (location?.toLowerCase() || "").replace(
      /\s+/g,
      "-"
    );
    return formattedCity === formattedLocation;
  });
  
  if (!isValidLocation) {
    return <Navigate to="*" />;
  }
  
  const formattedPath = window.location.pathname
  .slice(1)
  .replace(/-/g, " ")
  .split(" ")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(" ");
  
  const [borderAnimate, setBorderAnimate] = useState(formattedPath);
  useEffect(() => {
    setBorderAnimate(""); // Reset animasi
  
    const timeout = setTimeout(() => {
      setBorderAnimate(formattedPath); // Set nilai baru untuk memicu animasi
    }, 50);
  
    return () => clearTimeout(timeout); // Bersihkan timeout
  }, [ currentLocation ,formattedPath]);
  

  return (
    <div
      ref={scrollContainerRef}
      key={currentLocation.pathname}
      className="overflow-y-auto scrollbar-hide w-full flex flex-col items-center gap-[1.25rem] pb-[4rem] overflow-hidden"
    >
      <div className="flex w-full h-auto justify-between items-center sticky -top-1 z-[5] bg-[#FFFEFA]">
        <div
          className={cn(
            `w-[30%] h-0 border-dark-green border-2 rounded-lg transition-transform duration-500 ease-in-out ${
              borderAnimate ? "scale-100" : "scale-0"
            }`
          )}
        ></div>
        <div>
          {borderAnimate && (
            <h1
              className={cn(
                `font-body text-dark-green text-center font-medium mx-3 animate-popUp ${
                  formattedPath.length >= 20
                    ? "text-[1rem]"
                    : formattedPath.length >= 13
                    ? "text-[1.2rem]"
                    : "text-[1.5rem]"
                }`
              )}
            >
              {formattedPath}
            </h1>
          )}
        </div>

        <div
          className={cn(
            `w-[30%] h-0 border-dark-green border-2 rounded-lg transition-transform duration-500 ease-in-out ${
              borderAnimate ? "scale-100" : "scale-0"
            }`
          )}
        ></div>
      </div>

      {dataAOL.data.map((item, key) => {
        const formattedPathname = window.location.pathname
          .slice(1)
          .replace(/-/g, " ")
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");

        if (item.Provinsi === formattedPathname) {
          return (
            <Card
              className="w-[95%]"
              key={key}
              location={item.Provinsi}
              percentage={5.6}
              item={item.Komoditas}
              price={item.price}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
