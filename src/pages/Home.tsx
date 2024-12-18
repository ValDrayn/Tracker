import Card from "@/components/ui/Card";
// import data from "../../../public/data/db.json";
import dataAOL from "../../public/data/databaseAOL.json";

export default function Home() {

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
