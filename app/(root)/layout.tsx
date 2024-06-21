import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
        <main className="relative flex bg-black-3">
            <LeftSidebar/>
            <section className="flex min-h-screen flex-1 px-4">
              <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
                <div className="flex-between h-16 md:hidden">
                  <Image src={'/icons/logo.svg'} alt="menu icon" width={30} height={30}/>
                  <MobileNav />
                </div>
                <div>
                  Toaster (notification popups)
                  {children}
                </div>
              </div>
            </section>
            <RightSidebar />
        </main>
    </div>
  );
}
