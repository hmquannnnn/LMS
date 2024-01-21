import paths from "@/app/paths";
import Header from "@/components/header/header";
import Footer from "@/components/footer";
import {Inter} from "next/font/google";
import {usePathname} from "next/navigation";
import {useDispatch} from "react-redux";
import {callFetchUser} from "@/apis/userAPI";
import {doGetAccountAction} from "@/redux/slices/accountSlice";
import {useEffect} from "react";

const inter = Inter({subsets: ['latin']})

export const MyApp = ({children,}: { children: React.ReactNode }) => {
    const pathName = usePathname();
    const dispatch = useDispatch();
    const getAccount = async () => {
        const res = await callFetchUser();
        if (res?.id) {
            dispatch(doGetAccountAction(res));
        }
    }
    useEffect(() => {
        getAccount();
    }, []);
    return (
        <html lang="en">
        {/*{window.location.pathname === paths.logIn ? <></> : <Header></Header>}*/}

        <body className={inter.className}>
        {pathName !== paths.logIn && <Header/>}
        {/*<Header/>*/}
        {children}
        {pathName !== paths.logIn && <Footer/>}
        </body>

        </html>
    )

}