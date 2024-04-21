"use client";

import { colors } from "@/utils/constant";


const TechniqueExample = ({ cardBgColorSub, cardBgColorMain, splitterColor, items, type }) => {
  return (
    <>
      <div className="flex flex-wrap justify-between">
        {items.map((item, index) =>
          <div className={"flex justify-center flex-wrap gap-5 sm:gap-[4%] flex-row my-10 rounded-3xl py-8 px-8 items-center relative shadow-lg " + ((index + 1 == items.length && index % 2 == 0) || type == "MANAGEMENT" ? " w-full" : " lg:w-[48%]") + " " + (type == "MANAGEMENT" && index % 2 == 1 ? "flex-row-reverse" : "")}
            style={{ backgroundColor: cardBgColorMain }}
            key={index}
          >
            <div className="absolute left-[-15px]">
              <img className={"object-contain mr-auto ml-auto w-[70%]"} src={"/xoan.svg"} height={"10px"} />
            </div>
            <div className="sm:w-[48%] flex justify-center max-h-[200px]">
              <img className={"object-contain"} src={item.image} height="200px" />
            </div>
            <div className="relative sm:w-[48%]">
              <div className="absolute h-[20px] w-full rounded-xl z-[0]" style={{ backgroundColor: cardBgColorSub }}></div>
              <div className={"text-lg font-bold ml-2 z-20 relative mt-2"}>{item.title}</div>
              <div className="h-[1.5px] mr-4 my-2" style={{ backgroundColor: splitterColor }}></div>
              <div className={"flex flex-row"}>
                {/* <FaRegHandPointRight
                  className={`h-[20px] w-[20px] text-[${color}] mr-2.5 col-span-1`}
                  style={{ color: `${color}` }}
                /> */}
                <p className={"text-xs"}>{item.content}</p>
              </div>
            </div>
          </div>
        )}

      </div>

    </>
  );
};

export default TechniqueExample;
