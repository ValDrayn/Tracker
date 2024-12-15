import Card from "@/components/ui/Card";
import { Navigate, useParams } from "react-router-dom";
import data from "../../../public/data/db.json";

// const data = [
//     {location:"Jakarta", percentage:19, item: "Kangkung"},
//     {location:"Sulawesi", percentage:16, item: "Apel"},
//     {location:"Bangka", percentage:13, item:"Wortel"},
// ]

const dummy = ["Jakarta", "Palembang", "Sulawesi", "Bangka", "Kalimantan"];

export default function Locations() {
    const params = useParams();
    const location = params.location;

    const isValidLocation = dummy.some(
        (city) => city.toLowerCase() === (location?.toLowerCase() || "")
      );
    
      if (!isValidLocation) {
        return <Navigate to="*" />;
      }
    
     const populate = new Array(10).fill("x").map((_, index) => {
            return data.data.length > index
              ? {
                  location: data.data[index].location,
                  percentage: data.data[index].percentage,
                  nama: data.data[index].nama,
                  price: data.data[index].price[3].value
                }
              : { location: "Unknown", percentage: 0, nama: "TBA", price: 0};
          });
    
        return <div className="overflow-y-auto scrollbar-hide w-full flex flex-col items-center gap-[1.25rem] pb-[4rem]" >
            {populate.map((item, key) => {
                return <Card className="w-[95%]" key={key} location={item.location} percentage={item.percentage} item={item.nama} price={item.price}/>
            })}
        </div>;
}