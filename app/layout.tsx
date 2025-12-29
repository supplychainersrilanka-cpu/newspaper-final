import "./globals.css";

export const metadata = {
  title: "Digital Citizen Gazette",
  description: "Premium News & Insights",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black font-serif">
        {children}
      </body>
    </html>
  );
}
