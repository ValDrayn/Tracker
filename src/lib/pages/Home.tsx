import Card from "@/components/ui/Card";
// import data from "../../../public/data/db.json";
import dataAOL from "../../../public/data/databaseAOL.json";

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
      {dataAOL.data.slice(0, 3).map((item, index) => {
        return (
          <Card
            key={index}
            location={item.Provinsi}
            percentage={19}
            item={item.Komoditas}
            price={item.price}
          />
        );
      })}
    </div>
  );
}
