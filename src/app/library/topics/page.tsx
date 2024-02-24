'use client';
import React from 'react';
import Image from 'next/image';
import HeaderWithLogo from "@/components/headerWithLogo";
import { useState } from 'react';

const MenuItem = ({ label, imageSrc, href }) => (
    <a href={href} className="flex flex-col items-center cursor-pointer">
        <div className="flex flex-col items-center">
            <Image width={200} height={400} src={imageSrc} alt={label} className="w-full h-auto mb-2" />
            <div className="mt-2 text-xl font-semibold font-vollkorn text-blue_4 ">{label}</div>
        </div>
    </a>
);

const Menu = () => {
    const [startIndex, setStartIndex] = useState(0);
    const items = [
        { label: 'VĂN HÓA', imageSrc: 'https://placehold.co/200x400/png', href: "" },
        { label: 'THỂ THAO', imageSrc: 'https://placehold.co/200x400/png', href: "" },
        { label: 'XÃ HỘI', imageSrc: 'https://placehold.co/200x400/png', href: "" },
        { label: 'DU LỊCH', imageSrc: 'https://placehold.co/200x400/png', href: "" },
        { label: 'KINH DOANH', imageSrc: 'https://placehold.co/200x400/png', href: "" },
        { label: 'VIỆC LÀM', imageSrc: 'https://placehold.co/200x400/png', href: "" },
        { label: 'SỨC KHỎE', imageSrc: 'https://placehold.co/200x400/png', href: "" },
        { label: 'GIẢI TRÍ', imageSrc: 'https://placehold.co/200x400/png', href: "" },
        { label: 'GIẢI TRÍ', imageSrc: 'https://placehold.co/200x400/png', href: "" },
        { label: 'GIẢI TRÍ', imageSrc: 'https://placehold.co/200x400/png', href: "" },


    ];
    const maxIndex = items.length - 1;

    const handleNext = () => {
        if (startIndex < maxIndex) {
            setStartIndex(startIndex + Math.min(4, maxIndex - startIndex));
        }
    }

    const handlePrev = () => {
        if (startIndex - 4 >= 0) {
            setStartIndex(startIndex - 4);
        }
    }

    return (
        <>
            <HeaderWithLogo />
            <div className="flex items-center gap-10 justify-center h-[60vh]">
                <button className="p-2 " onClick={() => handlePrev()}>
                    <svg className="h-12 w-12 hover:h-[4rem] hover:w-[4rem] duration-300 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <div className="flex gap-10 overflow-x-auto">
                    {items.filter((item, index) => {
                        if (index >= startIndex && index <= startIndex + 3) return true;
                        return false;
                    }).map((item, index) => (
                        <MenuItem key={index} label={item.label} imageSrc={item.imageSrc} href={item.href} />
                    ))}
                </div>
                <button className="p-2" onClick={() => handleNext()}>
                    <svg className="h-12 w-12 hover:h-[4rem] hover:w-[4rem] duration-300 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </>
    );
};

export default Menu;
