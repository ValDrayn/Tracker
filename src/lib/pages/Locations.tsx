import Card from "@/components/ui/Card";
import { Navigate, useParams } from "react-router-dom";

const data = [
    {location:"Jakarta", percentage:19, item: "Kangkung"},
    {location:"Sulawesi", percentage:16, item: "Apel"},
    {location:"Bangka", percentage:13, item:"Wortel"},
]

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
            return data.length > index
              ? {
                  location: data[index].location,
                  percentage: data[index].percentage,
                  item: data[index].item
                }
              : { location: "Unknown", percentage: 0, item: "TBA"};
          });
    
        return <div className="overflow-y-auto scrollbar-hide w-full flex flex-col items-center gap-[1.25rem] pb-[4rem]" >
            {populate.map((info, key) => {
                return <Card className="w-[95%]" key={key} location={info.location} percentage={info.percentage} item={info.item}/>
            })}
        </div>;
}