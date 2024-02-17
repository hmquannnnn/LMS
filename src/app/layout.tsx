"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import { usePathname, useRouter } from "next/navigation";
import { StoreProvider } from "@/redux/storeProvider";
import paths from "@/app/paths";
import Header from "@/components/header/header";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathName = usePathname();


    // console.log(pathName);
    return (
        <StoreProvider>
            {/*<MyApp></MyApp>*/}

            <html lang="en">

                {/*{window.location.pathname === paths.logIn ? <></> : <Header></Header>}*/}

                <body className={inter.className}>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap" rel="stylesheet"></link>
                    {pathName !== paths.logIn && <Header />}
                    {/*<Header/>*/}

                    {children}
                    {pathName !== paths.logIn && <Footer />}
                </body>

            </html>
        </StoreProvider>

    )
}
