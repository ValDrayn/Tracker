import { produce } from "@/lib/data";
import { useDialog } from "../ui/Dialog";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";

export default function TotalProduce() {
  const { closeDialog } = useDialog();

  const containerRef = useRef(null);

  // const isInView = useInView(containerRef, { once: true, margin: "-140px" });

  return (
    <div className="bg-[#FFFEFA] p-8 rounded-[1.25rem] w-[370px]">
      <div className="flex flex-col relative">
        <div className="mb-[0.625rem]">
          <p className="font-body text-[0.875rem] text-dark-grey font-medium">
            Dashboard
          </p>
          <p className="font-body font-semibold text-dark-blue text-[2rem]">
            Produce List
          </p>
        </div>

        <div className="w-full max-h-[25rem] overflow-y-auto scrollbar-hide rounded-lg m-1  grid-cols-2 grid cursor-ns-resize">
          {produce.map((item, index) => {
            return (
              <motion.div
                key={index}
                ref={containerRef}
                // initial={{ opacity: 0, x: -200 }}
                // animate={{
                //   opacity: isInView ? 1 : 0,
                //   x: isInView ? 0 : -200,
                //   scale: 0.95,
                // }}
                // transition={{
                //   type: "spring",
                //   stiffness: 100,
                //   damping: 25,
                //   delay: index * 0.2,
                // }}
                className="items-center rounded-lg py-[0.1rem] m-[0.25rem] flex justify-center flex-col "
              >
                <img
                  src={`/data/item/${item}.png`}
                  alt="sayur.png"
                  className="w-[8rem] h-[8.25rem] rounded-[2.25rem] border-2 border-dark-green"
                />
                <p className="font-body text-[1rem] font-semibold text-center">
                  {item}
                </p>
              </motion.div>
            );
          })}
        </div>

        <button
          className="absolute -right-3 -top-4 cursor-pointer"
          onClick={() => closeDialog()}
        >
          <i className="bx bx-x text-dark-blue text-[2.6875rem] "></i>
        </button>
      </div>
    </div>
  );
}
