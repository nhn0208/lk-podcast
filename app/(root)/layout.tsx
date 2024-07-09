import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import PodcastPlayer from "@/components/PodcastPlayer";
import RightSidebar from "@/components/RightSidebar";
import Toaster from "@/components/Toaster";
import User from "@/components/User";
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
                  <div className="w-full flex justify-end p-4 gap-2">
                    <Toaster/>
                    <User/>
                  </div>
                  {children}
                </div>
              </div>
            </section>
            <RightSidebar />
        </main>
        <PodcastPlayer/>
    </div>
  );
}
