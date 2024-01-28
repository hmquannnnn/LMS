"use client"
import { useDispatch, useSelector } from "react-redux";
import { setRootPageId } from "@/redux/slices/documentSlice";
import { useState } from "react";
import { notion } from "@/notion";

// function getData(rootPageId: string) {
//     return notion.getPage(rootPageId);
// }

const InputId = () => {
    const [rootPageId, setRootPageIdState] = useState("hello");
    const dispatch = useDispatch();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newRootPageId = event.target.value;
        setRootPageIdState(newRootPageId); // Update rootPageId using setRootPageIdState
        dispatch(setRootPageId(newRootPageId)); // Update rootPageId using setRootPageId from documentSlice
        // props.data = getData(rootPageId);
    };

    return (
        <>
            <div className="w-1/2">
                Enter your notion page&apos;s id here:
                <input type="text" className="border-[5px]" onChange={handleInputChange} value={rootPageId}></input>
                rootPageId: {rootPageId}
            </div>
        </>
    );
};

export default InputId;