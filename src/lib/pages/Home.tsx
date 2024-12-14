import Card from "@/components/ui/Card";

const data = [
    {location:"Jakarta", percentage:19, item: "Kangkung"},
    {location:"Sulawesi", percentage:16, item: "Apel"},
    {location:"Bangka", percentage:13, item:"Wortel"},
]

export default function Home() {

    // const populate = new Array(3).fill("x").map((_, index) => {
    //     return data.length > index
    //       ? {
    //           location: data[index].location,
    //           percentage: data[index].percentage,
    //         }
    //       : { date: "", status: "" };
    //   });

    return <div className="overflow-y-auto scrollbar-hide w-full flex flex-col items-center gap-[1.25rem] pb-[4rem]" >
        {data.map((info, key) => {
            return <Card className="w-[95%]" key={key} location={info.location} percentage={info.percentage} item={info.item}/>
        })}
    </div>;
}