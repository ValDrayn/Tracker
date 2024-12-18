import { url } from "@/lib/data";
import { useDialog } from "../ui/Dialog";
import { useInView, motion } from "framer-motion";
import { useRef } from "react";

export default function TotalRegion() {
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
            Region List
          </p>
        </div>

        <div className="w-full max-h-[25rem] overflow-y-auto scrollbar-hide bg-white border-dark-green border-2 rounded-lg shadow-lg p-1 cursor-default">
          {url.map((item, index) => {
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
                //   delay: index * 0.2, // Menambahkan delay
                // }}
                className="flex items-center gap-2 hover:bg-[#fff1b9] rounded-lg px-2 py-[0.1rem]"
              >
                <i className="bx bxs-map text-darker-blue text-[1rem]"></i>
                <p className="font-body text-[1rem] font-semibold">{item}</p>
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
