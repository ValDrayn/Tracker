import Card from "@/components/ui/Card";
import { Navigate, useLocation, useParams } from "react-router-dom";
// import data from "../../../public/data/db.json";
import dataAOL from "../../../public/data/databaseAOL.json";
import { useEffect, useRef } from "react";

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
  "DKI Jakarta",
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

  //  const populate = new Array(10).fill("x").map((_, index) => {
  //         return data.data.length > index
  //           ? {
  //               location: data.data[index].location,
  //               percentage: data.data[index].percentage,
  //               nama: data.data[index].nama,
  //               price: data.data[index].price
  //             }
  //           : { location: "Unknown", percentage: 0, nama: "TBA", price: dummyData};
  //       });

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentLocation]);

  return (
    <div ref={scrollContainerRef} className="overflow-y-auto scrollbar-hide w-full flex flex-col items-center gap-[1.25rem] pb-[4rem] ">
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
