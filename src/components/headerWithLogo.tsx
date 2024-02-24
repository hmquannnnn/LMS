import LogoSVG from "@/components/logo";

const HeaderWithLogo = () => {
    return (
        <div className="w-full py-10">
            <div className="flex font-vollkorn font-semibold text-3xl text-blue_3 justify-center gap-14 items-center mb-8">
                <div>THƯ VIỆN</div>
                <LogoSVG />
                <div>THÔNG TIN</div>
            </div>
            <div className="bg-blue_3 h-[1px] mx-[8vh] mb-1.5"></div>
            <div className="bg-blue_3 h-[1px] mx-[8vh]"></div>

        </div>
    );
}

export default HeaderWithLogo;