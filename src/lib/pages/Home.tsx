import Card from "@/components/ui/Card";
import data from "../../../public/data/db.json";

// const data = [
//     {location:"Jakarta", percentage:19, item: "Kangkung"},
//     {location:"Sulawesi", percentage:16, item: "Apel"},
//     {location:"Bangka", percentage:13, item:"Wortel"},
// ]

export default function Home() {
  // const populate = new Array(3).fill("x").map((_, index) => {
  //     return data.length > index
  //       ? {
  //           location: data[index].location,
  //           percentage: data[index].percentage,
  //         }
  //       : { date: "", status: "" };
  //   });

  return (
    <div className="overflow-y-auto scrollbar-hide w-full flex flex-col items-center gap-[1.25rem] pb-[4rem]">
      {data.data.map((item, index) => {
        return (
          <Card
            key={index}
            location={item.location}
            percentage={item.percentage}
            item={item.nama}
            price={item.price}
          />
        );
      })}
    </div>
  );
}
