import Card from "@/components/ui/Card";
import { Navigate, useLocation, useParams } from "react-router-dom";
// import data from "../../../public/data/db.json";
import dataAOL from "../../../public/data/databaseAOL.json";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// const data = [
//     {location:"Jakarta", percentage:19, item: "Kangkung"},
//     {location:"Sulawesi", percentage:16, item: "Apel"},
//     {location:"Bangka", percentage:13, item:"Wortel"},
// ]

const url = [
  "Aceh",
  "Sumatera Utara",
  "Sumatera Barat",
  "Riau",
  "Jambi",
  "Sumatera Selatan",
  "Bengkulu",
  "Lampung",
  "Kepulauan Bangka Belitung",
  "Kepulauan Riau",
  "Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "Yogyakarta",
  "Jawa Timur",
  "Banten",
  "Bali",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
  "Kalimantan Barat",
  "Kalimantan Tengah",
  "Kalimantan Selatan",
  "Kalimantan Timur",
  "Kalimantan Utara",
  "Sulawesi Utara",
  "Sulawesi Tengah",
  "Sulawesi Selatan",
  "Sulawesi Tenggara",
  "Gorontalo",
  "Sulawesi Barat",
  "Maluku",
  "Maluku Utara",
  "Papua Barat",
  "Papua",
  "Papua Barat Daya",
  "Papua Pegunungan",
  "Papua Tengah",
  "Papua Selatan",
];
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
  const [borderAnimate, setBorderAnimate] = useState(window.location.pathname);

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

    useEffect(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    
      setBorderAnimate(window.location.pathname); 
    
      const timeout = setTimeout(() => {
        setBorderAnimate(formattedPath);
      }, 50); // Delay singkat untuk re-trigger animasi
    
      return () => clearTimeout(timeout); // Bersihkan timeout saat komponen unmount
    }, [currentLocation, formattedPath]);

  return (
    <div
      ref={scrollContainerRef}
      className="overflow-y-auto scrollbar-hide w-full flex flex-col items-center gap-[1.25rem] pb-[4rem] overflow-hidden"
    >
      <div className="flex w-full h-auto justify-around items-center sticky -top-1 z-[5] bg-[#FFFEFA]">
        <div className={cn(`w-[30%] h-0 border-dark-green border-2 rounded-lg transition-transform duration-500 ease-in-out ${borderAnimate === formattedPath ? "scale-100" : "scale-0"}`)}></div>
        <h1
          className={cn(
            `font-body text-dark-green text-center font-medium ${
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
        <div className={cn(`w-[30%] h-0 border-dark-green border-2 rounded-lg transition-transform duration-500 ease-in-out ${borderAnimate === formattedPath ? "scale-100" : "scale-0"}`)}></div>
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
