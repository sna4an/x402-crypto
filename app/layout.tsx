export const metadata = {
  title: "x402 Crypto APIs",
  description: "Paid cryptocurrency API endpoints via x402 micropayments",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
