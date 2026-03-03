import "./globals.css";

export const metadata = {
  title: "Start Vehicle Check - Auto Repair & Maintenance Reports",
  description:
    "Comprehensive vehicle history and diagnostics. Enter your VIN to get expert maintenance reports for your ride.",
  keywords:
    "vehicle check, car maintenance, auto repair, VIN report, vehicle history, diagnostics, car report",
  author: "Report My Vehicle",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
