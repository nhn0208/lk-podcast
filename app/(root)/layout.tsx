
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <main>
            LEFT SIDEBAR
            {children}
            RIGHT SIDEBAR
        </main>
    </div>
  );
}
